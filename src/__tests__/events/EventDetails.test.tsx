import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EventDetails from "../../v1/components/MobileViewComponents/Events/EventDetails/EventDetails";
import { useAppSelector, useAppThunkDispatch } from "../../v1/redux/hooks";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import {
  BrowserRouter,
  NavigateFunction,
  useNavigation,
} from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import * as API from "../../v1/ClientApi-Calls/index";
import toast from "react-hot-toast";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "styled-components";
import Theme from "../../v1/components/Theme/Theme";
import { useGetEvent } from "../../v1/graphql-api-calls/Events/query";
import { adminFromLocalStg } from "../../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import { mockEventDetailsData, mockRSVPData } from "../__mockData__/eventMock";
import { FetchRSVPByEventId } from "../../v1/redux/actions/EventActions/FetchingEventRsvp";
import * as api from "../../v1/api-calls/index";
import {
  customNavigatorTo,
  useCustomParams,
} from "../../v1/helpers/HelperFunction";
import { useCancelEvent } from "../../v1/graphql-api-calls/Events/mutation";
import MyProvider, { useNavigationprop } from "../../MyProvider";
import EventCarousel from "../../v1/components/MobileViewComponents/Events/Carousel/EventCarousel";
import tz_lookup from "tz-lookup";
import moment from "moment";

vi.mock("../../v1/helpers/AdminFromLocalStorage/AdminFromLocalStorage", () => ({
  adminFromLocalStg: vi.fn(),
}));

// Mock hooks and API calls
vi.mock("../../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppSelector: vi.fn(),
    //   useAppThunkDispatch: vi.fn(),
    // your mocked methods
  };
});

vi.mock("../../v1/helpers/HelperFunction", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    customNavigatorTo: vi.fn(),
    useCustomParams: vi.fn(), // Mocking useCustomParams

    //   useAppThunkDispatch: vi.fn(),
    // your mocked methods
  };
});

// vi.mock("../../MyProvider", () => ({
//   useNavigationprop: vi.fn(() => undefined),
// }));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));

vi.mock("../../v1/graphql-api-calls/Events/query", () => ({
  useGetEvent: vi.fn(),
}));

// vi.mock(
//   "../../v1/components/MobileViewComponents/Events/Carousel/EventCarousel",
//   async (importOriginal) => {
//     const actual = await importOriginal();
//     return {
//       ...actual,
//       default: () => (
//         <div data-testid="mock-event-carousel">Mocked EventCarousel</div>
//       ),
//     };
//   }
// );

vi.mock(
  "../../v1/components/MobileViewComponents/Events/Carousel/EventCarousel",
  () => ({
    __esModule: true,
    default: ({
      eventData,
      isEditing,
      handleToggleImage,
      setImgSrc,
      setAltSrc,
    }: any) => (
      <div data-testid="event-carousel">
        Mocked EventCarousel
        <button
          data-testid="toggle-image-btn"
          onClick={() => handleToggleImage()}
        >
          Toggle Image
        </button>
      </div>
    ),
  })
);

// Mock useCancelEvent globally with importOriginal
vi.mock(
  "../../v1/graphql-api-calls/Events/mutation",
  async (importOriginal) => {
    const originalModule = await importOriginal();

    // Create a mock implementation for useCancelEvent
    const mockCancelEvent = vi.fn().mockResolvedValue({
      data: {
        cancelEvent: true, // Mock success response
      },
    });

    return {
      ...originalModule,
      useCancelEvent: vi.fn(async () => ({
        cancelEvent: mockCancelEvent,
        data: { cancelEvent: true },
        cancelling: false,
        cnclerr: null,
      })),
    };
  }
);

vi.mock("../../v1/api-calls/index", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getRSVP: vi.fn(),
    // your mocked methods
  };
});

const mockAdmin = {
  masjids: ["testMasjidId"],
};

adminFromLocalStg.mockReturnValue(mockAdmin);

const renderWithProviders = (ui) => {
  return render(
    <Provider store={Store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>{ui}</BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

const mockNavigation = vi.fn(() => "str");

describe("EventDetails Component", () => {
  const mockNavigation = vi.fn() as unknown as NavigateFunction;

  beforeEach(() => {
    (useCustomParams as jest.Mock).mockReturnValue("670f9182db1b3c1258240118");

    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    // Set mock return value for the hook
    vi.mocked(useGetEvent).mockReturnValue({
      event: mockEventDetailsData,
      loading: false,
      error: null,
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        AdminMasjid: {},
        admin: { role: "admin" },
      })
    );

    api.getRSVP.mockResolvedValue({
      data: {
        data: mockRSVPData, // Mock your RSVP data structure here
      },
    });
  });
  afterEach(() => {
    vi.clearAllMocks(); // Reset mocks after each test
  });

  test("renders event details correctly", async () => {
    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Check that the event name and category are rendered
    await waitFor(() => {
      expect(screen.getByText("random event changed")).toBeInTheDocument();
      expect(screen.getByText("Charity Event")).toBeInTheDocument();
      expect(
        screen.getByText("3620 SH 121, Suite 200 Plano TX 75025")
      ).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("desc changed")).toBeInTheDocument();
      expect(screen.getByText("Start Date & Time")).toBeInTheDocument();
      expect(screen.getByText("16-Oct-2024 | 09:00 AM")).toBeInTheDocument();
      expect(screen.getByText("End Date & Time")).toBeInTheDocument();
      expect(screen.getByText("20-Oct-2024 | 07:30 PM")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(
        screen.getByText("3620 SH 121, Suite 200 Plano TX 75025")
      ).toBeInTheDocument();
    });
  });

  test("handles event cancellation and shows success toast", async () => {
    const mockCancelEvent = vi.fn().mockResolvedValue({
      data: {
        cancelEvent: true, // Different response to simulate failure
      },
    });

    // Override the mock for this specific test case
    (useCancelEvent as jest.Mock).mockReturnValue({
      cancelEvent: mockCancelEvent,
      data: { cancelEvent: true }, // Mock data response after mutation
      cancelling: false, // Mock loading state
      cnclerr: null, // Mock error state
    });

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Simulate clicking the cancel button
    const cancelButton = await screen.findByTestId("delete-event");
    fireEvent.click(cancelButton);

    // Simulate clicking the confirm button on the confirmation dialog
    const confirmButton = await screen.findByText("Yes");
    fireEvent.click(confirmButton);
    // Check that the toast success message was called
    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Please wait...!");

      expect(useCancelEvent().cancelEvent).toHaveBeenCalledWith({
        variables: {
          all: false,
          id: "670f9182db1b3c1258240118",
        },
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Cancelled Event Successfully"
      );
    });
  });

  test("handles event cancellation for recurrence and shows success toast", async () => {
    const mockCancelEvent = vi.fn().mockResolvedValue({
      data: {
        cancelEvent: true,
      },
    });

    // Override the mock for this specific test case
    (useCancelEvent as jest.Mock).mockReturnValue({
      cancelEvent: mockCancelEvent,
      data: { cancelEvent: true },
      cancelling: false,
      cnclerr: null,
    });

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Simulate clicking the cancel button
    const cancelButton = await screen.findByTestId("delete-event");
    fireEvent.click(cancelButton);

    // Simulate selecting the recurrence option
    const recurrenceOption = await screen.findByText(
      "Cancel All Event In This Series"
    );
    fireEvent.click(recurrenceOption);

    // Simulate clicking the confirm button on the confirmation dialog
    const confirmButton = await screen.findByText("Yes");
    fireEvent.click(confirmButton);

    // Check that the toast loading message was called
    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Please wait...!");
    });

    // Verify that the cancelEvent function was called with the correct variables
    await waitFor(() => {
      expect(useCancelEvent().cancelEvent).toHaveBeenCalledWith({
        variables: {
          all: true, // This should be true for recurrence
          id: "670f9182db1b3c1258240118",
        },
      });
    });

    // Check that the toast success message was called
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Cancelled Event Successfully"
      );
    });
  });

  test("shows error toast when event cancellation fails", async () => {
    // Mock the useCancelEvent hook to simulate a failure
    // vi.mocked(useCancelEvent).mockReturnValue({
    //   cancelEvent: vi.fn().mockRejectedValue(new Error("Cancellation failed")),
    //   data: null,
    //   cancelling: false,
    //   cnclerr: new Error("Cancellation failed"),
    // });

    (useCancelEvent as jest.Mock).mockReturnValue({
      cancelEvent: vi.fn().mockRejectedValue(new Error("Cancellation failed")),
      data: null,
      cancelling: false,
      cnclerr: new Error("Cancellation failed"),
    });

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Simulate clicking the cancel button
    const cancelButton = await screen.findByTestId("delete-event");
    fireEvent.click(cancelButton);

    // Simulate clicking the confirm button on the confirmation dialog
    const confirmButton = await screen.findByText("Yes");
    fireEvent.click(confirmButton);

    // Check that the toast error message was shown
    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Please wait...!");
      expect(useCancelEvent().cnclerr).toStrictEqual(
        new Error("Cancellation failed")
      );

      expect(useCancelEvent().cancelEvent).toHaveBeenCalledWith({
        variables: {
          all: false,
          id: "670f9182db1b3c1258240118",
        },
      });
      expect(toast.dismiss).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to Cancel Event: Cancellation failed"
      );
    });
  });

  test("handles edit functionality and switches to editing state", async () => {
    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    mockEventDetailsData.event.recurrence = "none";

    const editButton = await screen.findByTestId("edit-event");
    fireEvent.click(editButton);

    // Check if the component switches to editing state
    await waitFor(() => {
      // Verify that the editing fields or UI changes are visible
      expect(screen.getByTestId("event-title")).toBeInTheDocument();
      // Alternatively, you can check if certain input fields or editing options appear
      expect(screen.getByLabelText("Event Name *")).toBeInTheDocument();
      expect(screen.getByLabelText("Description *")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(mockEventDetailsData.event.eventName)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(mockEventDetailsData.event.description)
      ).toBeInTheDocument();
      if (mockEventDetailsData.event.cost !== 0) {
        expect(
          screen.getByDisplayValue(mockEventDetailsData.event.cost.toString())
        ).toBeInTheDocument();
      }
      if (mockEventDetailsData.event.capacity !== null) {
        expect(
          screen.getByDisplayValue(mockEventDetailsData.event.capacity)
        ).toBeInTheDocument();
      }
    });

    const backButton = await screen.findByTestId("backBtn"); // Adjust the test ID based on your actual component
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText("random event changed")).toBeInTheDocument();
      expect(screen.getByText("Charity Event")).toBeInTheDocument();
      expect(
        screen.getByText("3620 SH 121, Suite 200 Plano TX 75025")
      ).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("desc changed")).toBeInTheDocument();
      expect(screen.getByText("Start Date & Time")).toBeInTheDocument();
      expect(screen.getByText("16-Oct-2024 | 09:00 AM")).toBeInTheDocument();
      expect(screen.getByText("End Date & Time")).toBeInTheDocument();
      expect(screen.getByText("20-Oct-2024 | 07:30 PM")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(
        screen.getByText("3620 SH 121, Suite 200 Plano TX 75025")
      ).toBeInTheDocument();
    });
  });

  test("go back to the main events component", async () => {
    // vi.mock("../../MyProvider", () => ({
    //   useNavigationprop: () => mockNavigation,
    // }));

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    const backButton = await screen.findByTestId("backBtn"); // Adjust the test ID based on your actual component
    fireEvent.click(backButton);
    expect(customNavigatorTo).toHaveBeenLastCalledWith("/feed/4");
  });

  test("go back to the main events component using navigation prop", async () => {
    // vi.mock("../../MyProvider", () => ({
    //   useNavigationprop: () => mockNavigation,
    // }));
    renderWithProviders(
      <MockedProvider>
        <MyProvider navigation={mockNavigation}>
          <EventDetails />
        </MyProvider>
      </MockedProvider>
    );

    const backButton = await screen.findByTestId("backBtn"); // Adjust the test ID based on your actual component
    fireEvent.click(backButton);

    expect(mockNavigation).toHaveBeenLastCalledWith("/feed/4");
  });
  test("handles share button functionality", async () => {
    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Click the share button
    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    // Check if the share modal becomes visible
    await waitFor(() => {
      expect(screen.getByTestId("share-modal")).toBeInTheDocument();
    });

    // Simulate closing the modal
    fireEvent.click(screen.getByTestId("close-button"));

    // Check if the share modal is hidden
    await waitFor(() => {
      expect(screen.queryByTestId("share-modal")).not.toBeInTheDocument();
    });
  });

  test("carusal component", async () => {
    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );
  });

  test("displays fallback image when no eventPhotos are available", async () => {
    // Mock event data to have no eventPhotos
    mockEventDetailsData.event.eventPhotos = [];
    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Check if the fallback image is displayed
    const fallbackImages = screen.getAllByAltText(""); // Use getAllByAltText and check the number of elements
    expect(fallbackImages.length).toBeGreaterThan(0);
    expect(fallbackImages[0]).toHaveAttribute(
      "src",
      "/src/v1/photos/PLACEHOLDER-event.png"
    );
  });

  test("calls handleToggleImage when the carousel button is clicked", async () => {
    mockEventDetailsData.event.eventPhotos = [{ url: "test-photo.jpg" }];
    // Spy on the console.log for handleToggleImage to see if it gets called in the actual implementation
    const consoleLogSpy = vi.spyOn(console, "log");

    // Render the EventDetails component
    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Find the toggle button and simulate a click
    const toggleButton = await screen.findByTestId("toggle-image-btn");
    fireEvent.click(toggleButton);

    // Check if the log was output, indicating the function was actually called
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("handleToggleImage click");
    });

    // Clean up the spy
    consoleLogSpy.mockRestore();
  });

  test("renders ticket section when registration is required and event is not cancelled", async () => {
    // Modify the mock data to indicate registration is required and the event is not cancelled
    mockEventDetailsData.event.isRegistrationRequired = true;
    mockEventDetailsData.event.isCancelled = false;

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Check if the ticket section is rendered
    await waitFor(() => {
      expect(
        screen.getByText("Ticket will be issued to the user")
      ).toBeInTheDocument();
    });
  });

  test("does not render ticket section when event is cancelled", async () => {
    // Set event to be registration required but cancelled
    mockEventDetailsData.event.isRegistrationRequired = true;
    mockEventDetailsData.event.isCancelled = true;

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // The ticket section should not be rendered when the event is cancelled
    await waitFor(() => {
      expect(
        screen.queryByText("Ticket will be issued to the user")
      ).not.toBeInTheDocument();
    });
  });

  test("displays 'Free' for registration fees when cost is zero", async () => {
    // Set registration required and cost to zero
    mockEventDetailsData.event.isRegistrationRequired = true;
    mockEventDetailsData.event.cost = 0;

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Check that the registration fees are displayed as 'Free'
    await waitFor(() => {
      expect(screen.getByText("Registration Fees")).toBeInTheDocument();
      expect(screen.getByText("Free")).toBeInTheDocument();
    });
  });

  test("renders the registration fees correctly when cost is not zero", async () => {
    // Set registration required and a non-zero cost
    mockEventDetailsData.event.isRegistrationRequired = true;
    mockEventDetailsData.event.cost = 20;

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Check that the registration fees are displayed correctly
    await waitFor(() => {
      expect(screen.getByText("Registration Fees")).toBeInTheDocument();
      expect(screen.getByText("$20")).toBeInTheDocument();
    });
  });

  test("displays the event capacity correctly", async () => {
    // Set registration required and a capacity value
    mockEventDetailsData.event.isRegistrationRequired = true;
    mockEventDetailsData.event.capacity = 100;

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Check that the event capacity is displayed
    await waitFor(() => {
      expect(screen.getByText("Event Capacity")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });

  test("does not render capacity or fees if registration is not required", async () => {
    // Set registration not required
    mockEventDetailsData.event.isRegistrationRequired = false;

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // The registration fees and capacity sections should not be displayed
    await waitFor(() => {
      expect(screen.queryByText("Registration Fees")).not.toBeInTheDocument();
      expect(screen.queryByText("Event Capacity")).not.toBeInTheDocument();
    });
  });

  test("shows error when user is not 'subadmin' and event requires registration with non-zero cost", async () => {
    // Mock the admin role as not "subadmin"
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        AdminMasjid: {},
        admin: { role: "admin" },
      })
    );
    mockEventDetailsData.event.isRegistrationRequired = true;
    mockEventDetailsData.event.isCancelled = false;
    mockEventDetailsData.event.cost = 50;

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Find the delete button and simulate a click
    const deleteButton = await screen.findByTestId("delete-event");
    fireEvent.click(deleteButton);

    // Check that the error message was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Only masjid admin can delete paid events"
      );
    });
  });

  test("shows delete warning when conditions are met", async () => {
    // Mock the admin role as "subadmin" so it passes the condition
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        AdminMasjid: {},
        admin: { role: "subadmin" },
      })
    );

    renderWithProviders(
      <MockedProvider>
        <EventDetails />
      </MockedProvider>
    );

    // Find the delete button and simulate a click
    const deleteButton = await screen.findByTestId("delete-event");
    fireEvent.click(deleteButton);

    // Check that the delete warning is shown
    await waitFor(() => {
      const warning = screen.queryByText("Cancel All Event In This Series");
      expect(warning).toBeInTheDocument();
    });
  });
});
