import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import BottomNavigation from "../v1/components/MobileViewComponents/BottomNavigation/BottomNavigation";
import { adminFromLocalStg } from "../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import MasjidProfile from "../v1/components/MobileViewComponents/MasjidProfile/MasjidProfile";
import MobileViewCalender from "../v1/components/MobileViewComponents/MobileViewCalender/MobileViewCalender";
import OtherSalahComponent from "../v1/components/MobileViewComponents/OtherSalahComponents/OtherSalahComponent";
import EventsViewCalender from "../v1/components/MobileViewComponents/Events/EventsViewCalender/EventsViewCalender";
import Announcement from "../v1/components/MobileViewComponents/Announcement/Announcement";
import AdminProfile from "../v1/components/MobileViewComponents/AdminProfile/AdminProfile";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../v1/components/Theme/Theme";
import indexReducer from "../v1/redux/reducers/IndexReducer";
import { configureStore } from "@reduxjs/toolkit";
import DateFnsUtils from "@date-io/date-fns";
vi.mock("../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage", () => ({
  adminFromLocalStg: vi.fn(),
}));

vi.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="group">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="slideid">{children}</div>,
}));

vi.mock(
  "../v1/components/MobileViewComponents/MasjidProfile/MasjidProfile",
  () => ({
    __esModule: true,
    default: () => <div>MasjidProfile Component</div>,
  })
);

vi.mock(
  "../v1/components/MobileViewComponents/MobileViewCalender/MobileViewCalender",
  () => ({
    __esModule: true,
    default: () => <div>MobileViewCalender Component</div>,
  })
);

vi.mock(
  "../v1/components/MobileViewComponents/OtherSalahComponents/OtherSalahComponent",
  () => ({
    __esModule: true,
    default: () => <div>SpecialPrayersComponent Component</div>,
  })
);

vi.mock(
  "../v1/components/MobileViewComponents/Events/EventsViewCalender/EventsViewCalender",
  () => ({
    __esModule: true,
    default: () => <div>EventsViewCalender Component</div>,
  })
);

vi.mock(
  "../v1/components/MobileViewComponents/Announcement/Announcement",
  () => ({
    __esModule: true,
    default: () => <div>Announcement Component</div>,
  })
);

vi.mock(
  "../v1/components/MobileViewComponents/AdminProfile/AdminProfile",
  () => ({
    __esModule: true,
    default: () => <div>AdminProfile Component</div>,
  })
);

const store = configureStore({
  reducer: indexReducer,
});

const mockAdmin = {
  masjids: ["testMasjidId"],
};

adminFromLocalStg.mockReturnValue(mockAdmin);

const renderWithProviders = (ui, { route = "/feed/0" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

describe("BottomNavigation Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders initial state correctly", () => {
    renderWithProviders(<BottomNavigation />);

    expect(screen.getByText("MasjidProfile Component")).toBeInTheDocument();
  });

  test("handles tab change correctly", () => {
    renderWithProviders(<BottomNavigation />);

    const salahTimingTab = screen.getByText("Salah Timing");
    fireEvent.click(salahTimingTab);
    expect(
      screen.getByText("MobileViewCalender Component")
    ).toBeInTheDocument();
  });

  test("renders the correct content for each tab", () => {
    const { container } = renderWithProviders(<BottomNavigation />);

    const tabs = [
      { label: "Home", component: "MasjidProfile Component" },
      { label: "Salah Timing", component: "MobileViewCalender Component" },
      {
        label: "Other Prayers",
        component: "SpecialPrayersComponent Component",
      },
      { label: "Events", component: "EventsViewCalender Component" },
      { label: "Announcement", component: "Announcement Component" },
      { label: "Settings", component: "AdminProfile Component" },
    ];

    tabs.forEach(({ label, component }) => {
      const tab = screen.getByText(label);
      fireEvent.click(tab);
      expect(screen.getByText(component)).toBeInTheDocument();
    });
  });

  test("displays the correct active tab icon", () => {
    renderWithProviders(<BottomNavigation />);

    const salahTimingTab = screen.getByText("Salah Timing");
    fireEvent.click(salahTimingTab);

    expect(salahTimingTab.closest(".nav-item")).toHaveClass("active");
  });

  test("handles Terms and Conditions modal open", async () => {
    localStorage.setItem("hasUserSeenModal", "false");
    renderWithProviders(<BottomNavigation />);

    const termsAndConditions = screen.getByText("Term and Conditions");
    fireEvent.click(termsAndConditions);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Information We Collect")).toBeInTheDocument();
    expect(screen.getByText("Use of Information")).toBeInTheDocument();
    expect(screen.getByText("User-Generated Content")).toBeInTheDocument();
    expect(screen.getByText("Data Security")).toBeInTheDocument();
    expect(screen.getByText("Third-Party Links")).toBeInTheDocument();
    expect(
      screen.getByText("Changes to Our Privacy Policy")
    ).toBeInTheDocument();
    expect(screen.getByText("Terms of Use")).toBeInTheDocument();
    expect(screen.getByText("Content Guidelines")).toBeInTheDocument();
    expect(screen.getByText("Prohibited Content")).toBeInTheDocument();
    expect(screen.getByText("User Responsibility")).toBeInTheDocument();
    expect(screen.getByText("Acceptance of Terms")).toBeInTheDocument();

    expect(screen.getByTestId("dialog-box-custom")).toBeInTheDocument();
    const AcceptButton = screen.getByTestId("my-custom-btn");
    expect(AcceptButton).toBeInTheDocument();
  });

  test("initializes swiper correctly", () => {
    renderWithProviders(<BottomNavigation />);

    const swiper = screen.getByTestId("group"); // Assuming Swiper has a role of group

    expect(swiper).toBeInTheDocument();
  });
});
