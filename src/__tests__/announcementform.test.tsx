import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AnnouncementForm from "../v1/components/MobileViewComponents/Announcement/Form/AnnouncementForm";
import indexReducer from "../v1/redux/reducers/IndexReducer";
import { TriggeringAnnouncement } from "../v1/redux/actions/AnnouncementActions/TriggeringAnnouncementAction";
import { handleSnackbar } from "../v1/helpers/SnackbarHelper/SnackbarHelper";
import { vi } from "vitest";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Theme from "../v1/components/Theme/Theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { useAppThunkDispatch } from "../v1/redux/hooks";
vi.mock(
  "../v1/redux/actions/AnnouncementActions/TriggeringAnnouncementAction",
  () => ({
    TriggeringAnnouncement: vi.fn(),
  })
);

vi.mock("../v1/helpers/SnackbarHelper/SnackbarHelper", () => ({
  handleSnackbar: vi.fn(),
}));

vi.mock("../v1/redux/hooks", () => ({
  useAppThunkDispatch: vi.fn(),
}));
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

describe("AnnouncementForm Component", () => {
  let dispatchMock: any;
  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: true }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test("renders announcement form and allows input", () => {
    renderWithProviders(
      <AnnouncementForm
        toggleAnnouncementForm={vi.fn()}
        setFetchAnnouncementData={vi.fn()}
        masjidId="6418878accb079ecb57173b2"
      />
    );

    // Check if form elements are rendered
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByText("Trigger Announcement")).toBeInTheDocument();

    // Input title and description
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    // Check if the inputs are correctly updated
    expect(screen.getByLabelText("Title")).toHaveValue("Test Title");
    expect(screen.getByLabelText("Description")).toHaveValue(
      "Test Description"
    );
  });

  test("shows preview announcement after form submission", () => {
    renderWithProviders(
      <AnnouncementForm
        toggleAnnouncementForm={vi.fn()}
        setFetchAnnouncementData={vi.fn()}
        masjidId="6418878accb079ecb57173b2"
      />
    );

    // Input title and description
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Trigger Announcement"));

    // Check if preview is shown
    expect(screen.getByText("Preview Announcement")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("handles successful announcement trigger", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        message: "Notification sent successfully",
      })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    renderWithProviders(
      <AnnouncementForm
        toggleAnnouncementForm={vi.fn()}
        setFetchAnnouncementData={vi.fn()}
        masjidId="6418878accb079ecb57173b2"
      />
    );

    // Input title and description
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Trigger Announcement"));

    // Confirm the announcement
    fireEvent.click(screen.getByText("Confirm Announcement"));
    expect(
      screen.getByText(
        "By posting, you take full responsibility for the content of your post and agree to comply with ConnectMazjid's terms and conditions and privacy policy. ConnectMazjid reserves the right to remove any inappropriate content. ?"
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Yes"));

    vi.useFakeTimers();
    await waitFor(() => {
      expect(TriggeringAnnouncement).toHaveBeenCalled();
    });
    // await waitFor(() => {
    //   expect(handleSnackbar).toHaveBeenCalledWith(
    //     true,
    //     "success",
    //     "Announcement Sent SuccessFully",
    //     expect.any(Function)
    //   );
    // });
  });
  test("handles cancelling of confirm announcement trigger", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        message: "Notification sent successfully",
      })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    renderWithProviders(
      <AnnouncementForm
        toggleAnnouncementForm={vi.fn()}
        setFetchAnnouncementData={vi.fn()}
        masjidId="6418878accb079ecb57173b2"
      />
    );

    // Input title and description
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Trigger Announcement"));

    // Confirm the announcement
    fireEvent.click(screen.getByText("Confirm Announcement"));
    expect(
      screen.getByText(
        "By posting, you take full responsibility for the content of your post and agree to comply with ConnectMazjid's terms and conditions and privacy policy. ConnectMazjid reserves the right to remove any inappropriate content. ?"
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("No"));

    vi.useFakeTimers();
    await waitFor(() => {
      expect(TriggeringAnnouncement).not.toHaveBeenCalled();
    });
  });
  test("handles announcement trigger failure", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        message: "Failed to send notification",
      })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

    renderWithProviders(
      <AnnouncementForm
        toggleAnnouncementForm={vi.fn()}
        setFetchAnnouncementData={vi.fn()}
        masjidId="6418878accb079ecb57173b2"
      />
    );

    // Input title and description
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Trigger Announcement"));

    // Confirm the announcement
    fireEvent.click(screen.getByText("Confirm Announcement"));
    expect(
      screen.getByText(
        "By posting, you take full responsibility for the content of your post and agree to comply with ConnectMazjid's terms and conditions and privacy policy. ConnectMazjid reserves the right to remove any inappropriate content. ?"
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Yes"));

    vi.useFakeTimers();
    await waitFor(() => {
      expect(handleSnackbar).toHaveBeenCalledWith(
        true,
        "error",
        "Failed to Send the Announcement : Failed to send notification",
        expect.any(Function)
      );
    });
  });

  test("cancels announcement form", () => {
    const handleAnnouncement = vi.fn();

    renderWithProviders(
      <AnnouncementForm
        toggleAnnouncementForm={handleAnnouncement}
        setFetchAnnouncementData={vi.fn()}
        masjidId="6418878accb079ecb57173b2"
      />
    );

    // Click back button to cancel
    fireEvent.click(screen.getByTestId("backBtn"));

    // Ensure handleAnnouncement was called to cancel
    expect(handleAnnouncement).toHaveBeenCalled();
  });
});
