import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EventsViewCalender from "../../v1/components/MobileViewComponents/Events/EventsViewCalender/EventsViewCalender";
import { useAppSelector, useAppThunkDispatch } from "../../v1/redux/hooks";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Theme from "../../v1/components/Theme/Theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import * as API from "../../v1/ClientApi-Calls/index";
import * as api from "../../v1/api-calls/index";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
import { MockedProvider } from "@apollo/client/testing";
import {
  eventsData,
  noEventsData,
  recursiveSingleMock,
} from "../__mockData__/eventMock";
import { masjidData } from "../__mockData__/mockData";
// const mockStore = configureStore([thunk]);

// vi.mock('../v1/redux/hooks', () => ({

//     // useAppThunkDispatch: vi.fn(),
//   }));
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
    //   useAppThunkDispatch: vi.fn(),
    // your mocked methods
  };
});
// vi.mock('../v1/redux/actions/EventActions/FetchingEventsByDateRange', () => ({
//   FetchingEventsByDateRange: vi.fn(),
// }));

// vi.mock('../v1/redux/actions/MasjidActions/fetchMasjidById', () => ({
//   fetchMasjidById: vi.fn(),
// }));
// vi.mock('../v1/api-calls/index', () => ({
//     getEventsByDateRange: vi.fn(),
//     // FetchingEventsByDateRange: vi.fn(),
//   }));
// vi.mock('../../../ClientApi-Calls/index', () => ({
//     fetchMasjidById: vi.fn(),
//     // FetchingEventsByDateRange: vi.fn(),
//   }));

vi.mock("../../v1/api-calls/index", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getEventsByDateRange: vi.fn(),
    // your mocked methods
  };
});
vi.mock("../../v1/ClientApi-Calls/index", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchMasjidById: vi.fn(),
    // your mocked methods
  };
});

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

describe("EventsViewCalender Component", () => {
  // let dispatch: jest.Mock;

  beforeEach(() => {
    // dispatch = vi.fn().mockImplementation((action) => {
    //     console.log("action",action.toString())
    //     if (typeof action === 'function') {
    //       return action(dispatch);
    //     }
    //     return Promise.resolve();
    //   });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        AdminMasjid: {},
        admin: { role: "admin" },
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders without crashing", () => {
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(noEventsData);
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    renderWithProviders(
      <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );
    expect(screen.getByText("Events")).toBeInTheDocument();
  });

  test("fetches events on mount and displays them", async () => {
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(eventsData);
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);

    renderWithProviders(
      <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    // await waitFor(() => {
    expect(screen.getByText("Events")).toBeInTheDocument();
    await waitFor(() => {
      // expect(screen.getAllByText('Event Name Test').length).toBeGreaterThan(0);
      expect(screen.getAllByText("Capacity Test").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Capacity Test 2").length).toBeGreaterThan(0);
      expect(screen.getAllByText("New Event").length).toBeGreaterThan(0);
    });
    // });
  });
  test("displays no events message when no events are found", async () => {
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(noEventsData);
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    renderWithProviders(
      <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );
    await waitFor(() => {
      expect(screen.getByText("No Upcoming Events")).toBeInTheDocument();
    });
  });

  test("shows loader while fetching events", async () => {
    renderWithProviders(
      <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );
    await waitFor(
      () => {
        expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
  test("displays event input when Add Events button is clicked", async () => {
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(noEventsData);
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    renderWithProviders(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText("Add Events"));

    await waitFor(() => {
      expect(screen.getByText("Create New Event")).toBeInTheDocument();
      expect(screen.getByText("Event Name *")).toBeInTheDocument();
      expect(screen.getByText("Event Category:")).toBeInTheDocument();
      expect(screen.getByText("Description *")).toBeInTheDocument();
      expect(screen.getByText("Event Recurrence Type:")).toBeInTheDocument();
      expect(screen.getByText("Start Date:")).toBeInTheDocument();
      expect(screen.getByText("Start Time :")).toBeInTheDocument();
      expect(screen.getByText("End Date:")).toBeInTheDocument();
      expect(screen.getByText("End Time :")).toBeInTheDocument();
      expect(screen.getByText("Location Is Different")).toBeInTheDocument();
      expect(
        screen.getByText("User Required Registration")
      ).toBeInTheDocument();
      expect(screen.getByText("Add Event")).toBeInTheDocument();
    });
  });

  test("opens the event details when clicked on it", async () => {
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(eventsData);
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    // const navigation=vi.fn();
    renderWithProviders(
      <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    expect(screen.getByText("Events")).toBeInTheDocument();
    await waitFor(() => {
      const EventCard = screen.getAllByTestId("event-card")[0];
      fireEvent.click(EventCard);
      expect(customNavigatorTo).toHaveBeenCalledWith(
        expect.stringContaining("/event-details/")
      );
    });
  });

  // Mock data with recursive events based on the format you provided

  test("renders event cards for recursive events from combinedEvents", async () => {
    // Mock the API responses
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(
      recursiveSingleMock
    );
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);

    const { container } = renderWithProviders(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
      </MockedProvider>
    );
    screen.debug(container, 100000);

    // Simulate the API call completing and the component rendering event cards
    await waitFor(() => {
      // Check that the EventCard components are rendered
      expect(screen.getAllByTestId("event-card")).toHaveLength(2); // This checks for 1 event card
      expect(screen.getByText("weekly event")).toBeInTheDocument();
      expect(screen.getByText("Charity Event")).toBeInTheDocument();
    });
  });

  test("displays green dot on calendar for dates with events", async () => {
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(
      recursiveSingleMock
    );
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);

    const { container } = renderWithProviders(
      <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      // Ensure the calendar is rendered
      expect(screen.getByTestId("custom-calendar")).toBeInTheDocument();
    });

    screen.debug(container, 100000);

    await waitFor(() => {
      // Check if green dots are displayed for dates with events
      const greenDots = screen.getAllByTestId("green-dot"); // Use getAllByTestId to get an array of elements
      expect(greenDots.length).toBeGreaterThan(0); // Ensure there is at least one green dot

      // Optionally, you can check the exact number of green dots if you know how many should be rendered
      // expect(greenDots.length).toBe(expectedNumberOfGreenDots);

      // You can also check the properties of each green dot if needed
      greenDots.forEach((dot) => {
        expect(dot).toBeInTheDocument();
        // Add other assertions if needed (e.g., checking styles, positions, etc.)
      });
    });
  });

  test("filters and sets selectedEvents when a date is clicked", async () => {
    // Mock the API responses with events that match a specific date
    (api.getEventsByDateRange as jest.Mock).mockResolvedValue(eventsData);
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);

    renderWithProviders(
      <EventsViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      // Simulate a date click on October 16, 2024
      const dateButton = screen.getByLabelText("October 16, 2024");
      fireEvent.click(dateButton);

      // Check if the selectedEvents state is updated
      const eventCards = screen.getAllByTestId("event-card");
      expect(eventCards.length).toBeGreaterThan(0);
    });
  });
});
