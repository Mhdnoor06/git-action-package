import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MasjidProfile from "../v1/components/MobileViewComponents/MasjidProfile/MasjidProfile";
import { fetchMasjidById } from "../v1/redux/actions/MasjidActions/fetchMasjidById";
import { FetchingTimingsByDateRange } from "../v1/redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import { authLogout } from "../v1/redux/actions/AuthActions/LogoutAction";
import indexReducer from "../v1/redux/reducers/IndexReducer";
import { useAppSelector, useAppThunkDispatch } from "../v1/redux/hooks";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../v1/components/Theme/Theme";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import toast from "react-hot-toast";
import swal from "sweetalert";

vi.mock("../v1/redux/actions/MasjidActions/fetchMasjidById", () => ({
  fetchMasjidById: vi.fn(),
}));

vi.mock(
  "../v1/redux/actions/TimingsActions/FetchingTimingsByDateRangeAction",
  () => ({
    FetchingTimingsByDateRange: vi.fn(),
  })
);

vi.mock("../v1/redux/actions/AuthActions/LogoutAction", () => ({
  authLogout: vi.fn(),
}));

vi.mock("../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppThunkDispatch: vi.fn(),
    useAppSelector: vi.fn().mockImplementation((selector) =>
      selector({
        AdminMasjid: {
          masjidName: "Test Masjid",
          externalLinks: [
            { name: "Facebook", url: "http://facebook.com" },
            { name: "Website", url: "http://website.com" },
          ],
          masjidPhotos: [
            { _id: "1", url: "http://example.com/image1.jpg" },
            { _id: "2", url: "http://example.com/image2.jpg" },
          ],
          masjidProfilePhoto: "http://example.com/profile.jpg",
          address: "123 Main St",
          contact: "123-456-7890",
          assignedUser: { name: "Admin User" },
          description: "This is a description of the masjid.",
        },
        admin: { isVerified: true },
      })
    ),
  };
});

const store = configureStore({
  reducer: indexReducer,
});

const renderWithProviders = (ui: any) => {
  return render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>{ui}</BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

describe("MasjidProfile Component", () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: true }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  vi.mock("sweetalert", () => ({
    __esModule: true,
    default: vi.fn(),
  }));

  vi.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
      error: vi.fn(),
      success: vi.fn(),
    },
  }));

  test("renders initial state correctly", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        masjidName: "test Masjid Of  Chicago.",
        masjidProfilePhoto:
          "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg",
        masjidPhotos: [
          {
            _id: "6672ecd6983db7598f0210a0",
            url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/c33c4c61-13d3-43af-9430-a0688761dad5.jpg",
          },
        ],
        description:
          "this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ",
        address: "4700 14th St, Plano, TX 75074, USA",
        location: { coordinates: [-96.6490745, 33.010232] },
        contact: "+0185252707",
        externalLinks: [
          {
            name: "Facebook",
            url: "www.facebook.com/testMasjidOfChicago",
            _id: "666c788b478d5e479eddfb5d",
          },
          {
            name: "Website",
            url: "www.test.com",
            _id: "666c788b478d5e479eddfb5e",
          },
        ],
        updatedAt: "2024-06-19T14:36:06.957Z",
        isAssigned: true,
        updatedBy: null,
        lastEditor: {
          _id: "666076e60ad4a2ecf42c1be0",
          name: "Mirza Akeel",
          role: "musaliadmin",
        },
        assignedUser: { _id: "666076e60ad4a2ecf42c1be0", name: "Mirza Akeel" },
      })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

    renderWithProviders(
      <MasjidProfile consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    expect(screen.getByText("Description")).toBeInTheDocument();
    await waitFor(() => {
      const slides = screen.getAllByAltText("masjid-preview-img");
      expect(slides.length).toBe(1);
      expect(screen.getByAltText("masjid-img")).toBeInTheDocument();
      // expect(screen.getByTestId("masjid-preview-img")).toBeInTheDocument();
    });
    // expect(screen.getByAltText('masjid-preview-img')).toBeInTheDocument();

    // expect(screen.getByAltText('masjid-img')).toBeInTheDocument();
  });

  test("fetches masjid details on mount", async () => {
    renderWithProviders(
      <MasjidProfile consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      expect(fetchMasjidById).toHaveBeenCalledWith("64df7804c2d7bcd9f0dac1e7");
    });
  });

  test("handles edit button click", () => {
    renderWithProviders(<MasjidProfile consumerMasjidId="testId" />);

    const editButton = screen.getByAltText("edit img");
    fireEvent.click(editButton);

    //Edit Page Displayed and Fields Visible
    expect(screen.getByTestId("edit-description")).toBeInTheDocument();
    expect(screen.getByTestId("edit-phone")).toBeInTheDocument();
    expect(screen.getByTestId("edit-website")).toBeInTheDocument();
  });

  test("handles social links correctly", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        masjidName: "test Masjid Of  Chicago.",
        masjidProfilePhoto:
          "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg",
        masjidPhotos: [
          {
            _id: "6672ecd6983db7598f0210a0",
            url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/c33c4c61-13d3-43af-9430-a0688761dad5.jpg",
          },
        ],
        description:
          "this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ",
        address: "4700 14th St, Plano, TX 75074, USA",
        location: { coordinates: [-96.6490745, 33.010232] },
        contact: "+0185252707",
        externalLinks: [
          {
            name: "Facebook",
            url: "www.facebook.com/testMasjidOfChicago",
            _id: "666c788b478d5e479eddfb5d",
          },
          {
            name: "Website",
            url: "www.test.com",
            _id: "666c788b478d5e479eddfb5e",
          },
        ],
        updatedAt: "2024-06-19T14:36:06.957Z",
        isAssigned: true,
        updatedBy: null,
        lastEditor: {
          _id: "666076e60ad4a2ecf42c1be0",
          name: "Mirza Akeel",
          role: "musaliadmin",
        },
        assignedUser: { _id: "666076e60ad4a2ecf42c1be0", name: "Mirza Akeel" },
      })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    vi.clearAllMocks();
    renderWithProviders(
      <MasjidProfile consumerMasjidId="6672ecd6983db7598f0210a0" />
    );
    await waitFor(() => {
      expect(screen.getByTestId("facebook-testid")).toBeInTheDocument();
      expect(screen.getByTestId("website-testid")).toBeInTheDocument();
    });
    const fbLink = screen.getByTestId("facebook-testid").closest("a");
    const webLink = screen.getByTestId("website-testid").closest("a");
    await waitFor(() => {
      expect(fbLink).toHaveAttribute(
        "href",
        "www.facebook.com/testMasjidOfChicago"
      );
      expect(webLink).toHaveAttribute("href", "www.test.com");
    });
  });

  test("displays the correct number of slides", async () => {
    renderWithProviders(<MasjidProfile consumerMasjidId="testId" />);

    await waitFor(() => {
      const slides = screen.getAllByAltText("masjid-preview-img");
      expect(slides.length).toBe(2);
    });
  });

  test("logs out user if no masjid assigned", async () => {
    swal.mockResolvedValue("Logout");
    renderWithProviders(<MasjidProfile consumerMasjidId="" />);

    await waitFor(() => {
      expect(swal).toHaveBeenCalledWith({
        title: "Oops",
        text: "You have no masjid assigned. Contact Admin to assign masjid",
        icon: "error",
        buttons: {
          catch: {
            text: "Logout",
            value: "Logout",
          },
        },
      });
    });
    await waitFor(() => {
      expect(authLogout).toHaveBeenCalled();
    });
  });

  test("shows toast error if unable to fetch masjid data", async () => {
    fetchMasjidById.mockResolvedValueOnce(null);

    renderWithProviders(<MasjidProfile consumerMasjidId="testId" />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Unable to fetch Masjid data");
    });
  });
});
