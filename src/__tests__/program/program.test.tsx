import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";

import { MockedProvider } from "@apollo/client/testing";

import { describe, it, expect, vi, Mock } from "vitest";
import Programs from "../../v1/components/MobileViewComponents/Programs/Main/Programs";
import { Get_PROGRAMS_BY_RANGE } from "../../v1/graphql-api-calls/query";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { useNavigationprop } from "../../MyProvider";
import moment from "moment-timezone";
import React from "react";
vi.mock("../../MyProvider");
vi.mock("../../v1/helpers/HelperFunction");
const customNavigatorTo = vi.fn();
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));

vi.mock("../../v1/helpers/HelperFunction", async () => {
  // Import the original module
  const actualModule = await vi.importActual("../../v1/helpers/HelperFunction");
  return {
    ...actualModule, // Spread original exports to keep everything intact
    LocationBasedToday: vi.fn(), // Mock only LocationBasedToday
  };
});
// Mock data for programs
const mockPrograms = [
  {
    metaData: {
      startDate: new Date().toISOString(),
    },
    id: "1",
    programName: "Program 1",
    programPhotos: ["some url"],
    timings: [{ startTime: "anytime" }],
  },
];

const startDate = moment()
  .startOf("month")
  .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const endDate = moment().endOf("year").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const rangeVariables = {
  masjidId: "123",
  startDate,
  endDate,
};
// Mock query responses
const mocks = [
  {
    request: {
      query: Get_PROGRAMS_BY_RANGE,
      variables: rangeVariables,
    },
    result: {
      data: {
        GetProgramsByRange: mockPrograms,
      },
    },
  },
];
const initialComponent = (mock: any) => (
  <Provider store={Store}>
    <MockedProvider mocks={mock} addTypename={false}>
      <Programs consumerMasjidId="123" />
    </MockedProvider>
  </Provider>
);
describe("Programs Component", () => {
  it("should render loading state", () => {
    render(initialComponent(mocks));

    // Assert that skeleton loaders are shown
    // const skeletons = screen.getAllByRole("img", { hidden: true });
    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBeGreaterThan(4);
  });

  it("should display an error message if query fails", async () => {
    const errorMocks = [
      {
        request: {
          query: Get_PROGRAMS_BY_RANGE,
          variables: rangeVariables,
        },
        error: new Error("An error occurred"),
      },
    ];

    render(initialComponent(errorMocks));

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText(/error:/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should display program cards if programs exist", async () => {
    render(initialComponent(mocks));

    // Wait for the program cards to appear
    await waitFor(() => {
      expect(screen.getByText("Program 1")).toBeInTheDocument();
    });
  });

  it("should display 'No Active Programs Yet' when no programs exist", async () => {
    const noProgramsMock = [
      {
        request: {
          query: Get_PROGRAMS_BY_RANGE,
          variables: rangeVariables,
        },
        result: {
          data: {
            GetPrograms: [],
          },
        },
      },
    ];

    render(initialComponent(noProgramsMock));

    // Wait for the 'No Active Programs Yet' message
    await waitFor(() => {
      const noProgramMessage = screen.getByText(/No Active Programs Yet/i);
      expect(noProgramMessage).toBeInTheDocument();
    });
  });

  it("should display the form when the add button is clicked", async () => {
    render(initialComponent(mocks));
    await waitFor(() => {
      expect(screen.getByText("Program 1")).toBeInTheDocument();
    });
    // Click the "Add Program" button
    const addButton = screen.getByAltText("add-program");
    fireEvent.click(addButton);

    // Check if the form is displayed
    await waitFor(() => {
      const formTitle = screen.getByText("Create an Program");
      expect(formTitle).toBeInTheDocument();
    });
  });

  it("should trigger the back button function", async () => {
    const mockNavigation = vi.fn();
    (useNavigationprop as Mock).mockReturnValue(mockNavigation);
    render(initialComponent(mocks));
    await waitFor(() => {
      expect(screen.getByText("Program 1")).toBeInTheDocument();
    });
    // Simulate back button click
    const backButton = screen.getByTestId("backBtn");
    fireEvent.click(backButton);
    expect(mockNavigation).toHaveBeenCalledTimes(1);
  });
  it("should update selected programs when a date is clicked", async () => {
    render(initialComponent(mocks));
    const mockSetTZone = vi.fn();

    // Spy on useState and mock the tZone state specifically
    vi.spyOn(React, "useState").mockImplementation((initialValue) => {
      if (initialValue === "") {
        return ["Chicago", mockSetTZone]; // Mock the initial value and set function for tZone
      }
      return [initialValue, vi.fn()];
    });

    // Find and simulate a date click (using a date that matches mock data)
    // const dateElement = screen.getByText(
    //   moment("2023-10-03").date().toString()
    // );
    await waitFor(() => {
      expect(screen.getByText("Program 1")).toBeInTheDocument();
    });
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const selectedDae = screen.getByRole("button", {
      name: formattedDate,
    });

    fireEvent.click(selectedDae);

    // Assert that selected programs are updated (you can extend this check)
    const programElements = screen.getAllByTestId("program-card");
    expect(programElements.length).toBeGreaterThan(0);
  });
});
