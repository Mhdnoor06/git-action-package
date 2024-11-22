import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { Mock, vi } from "vitest";
import ProgramDetails from "../../v1/components/MobileViewComponents/Programs/ProgramDetails/ProgramDetails";
import {
  RSVP_STATUS,
  GET_PROGRAM_BY_ID,
} from "../../v1/graphql-api-calls/query";
import { useAppSelector, useAppDispatch } from "../../v1/redux/hooks";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";

// Mock Redux hooks
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
vi.mock("../../v1/redux/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock GraphQL queries
const mocks = [
  {
    request: {
      query: GET_PROGRAM_BY_ID,
      variables: { id: "123" },
    },
    result: {
      data: {
        GetProgram: {
          _id: "123",
          programName: "Sample Program",
          category: "Education",
          address: "123 Main St",
          description: "This is a sample program.",
          availableSeats: 50,
          isPaid: false,
          capacity: 100,
          metaData: {
            startDate: "2024-10-24",
            endDate: "2024-10-25",
            recurrenceType: "None",
          },
          timings: [
            {
              startTime: "10:00 AM",
              endTime: "12:00 PM",
            },
          ],
          ageRange: {
            minimumAge: 18,
            maximumAge: 50,
          },
          programPhotos: [],
          isRegistrationRequired: true,
        },
      },
    },
  },
  {
    request: {
      query: RSVP_STATUS,
      variables: { id: "123", type: "program" },
    },
    result: {
      data: {
        rsvpAnalytics: {
          attending: 10,
          notAttending: 5,
          maybe: 2,
        },
      },
    },
  },
];

// Basic test case
describe("ProgramDetails Component", () => {
  it("renders without crashing", async () => {
    // Mock useAppSelector to return some default data
    (useAppSelector as Mock).mockReturnValue({
      admin: { name: "Admin" },
      AdminMasjid: { masjidName: "Sample Masjid" },
    });

    // Mock useAppDispatch
    (useAppDispatch as Mock).mockReturnValue(() => vi.fn());

    // Render the component
    render(
      <Provider store={Store}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ProgramDetails />
        </MockedProvider>
      </Provider>
    );

    // Check if loading fallback is displayed initially
    expect(screen.getByText("Age Ranges")).toBeInTheDocument();

    // Check if the ProgramView renders after data is loaded
    // Since we're using mock data, you can wait for the elements to be rendered
    expect(await screen.findByText("Registration Fees")).toBeInTheDocument();
    expect(
      await screen.findByText("Location")
    ).toBeInTheDocument();
  });
});
