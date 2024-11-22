import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect, vi } from "vitest";
import moment from "moment";
import { GET_USERS_FOR_SERVICE } from "../../v1/graphql-api-calls/query";
import RegistrationsTable from "../../v1/components/MobileViewComponents/Services/Table/RegistrationsTable";

// Mock data for the query
const mockData = {
  getUsersForService: [
    {
      name: "John Doe",
      email: "john@example.com",
      contact: "123-456-7890",
      details: {
        time: "10:00 AM",
        date: "2023-12-12",
      },
      attributes: [],
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      contact: "987-654-3210",
      attributes: [],
      details: {
        time: "11:00 AM",
        date: "2023-12-13",
      },
    },
  ],
};

// Mock for `useCustomParams` and `useNavigationprop`
vi.mock("../../v1/helpers/HelperFunction", () => ({
  useCustomParams: vi.fn().mockReturnValue("test-service-id"),
  customNavigatorTo: vi.fn(),
}));

vi.mock("../../MyProvider", () => ({
  useNavigationprop: vi.fn(),
}));

const mockFormData = {
  serviceName: "Consultation",
};

// Mock GraphQL query response
const mocks = [
  {
    request: {
      query: GET_USERS_FOR_SERVICE,
      variables: { serviceId: "1" },
    },
    result: {
      data: {
        getUsersForService: [
          {
            name: "John Doe",
            email: "john@example.com",
            contact: "1234567890",
            details: {
              time: "10:00 AM",
              date: "2024-10-12",
            },

            attributes: [
              {
                attributeName: "questions",
                attributeValues:
                  '[{"question": "What is your need?", "answer": "Consultation Support"}]',
              },
              {
                attributeName: "practitioner",
                attributeValues: ["Dr. Smith"],
              },
            ],
          },
        ],
      },
    },
  },
];

describe("RegistrationsTable component", () => {
  test("renders the table and fetches users for service", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegistrationsTable
          handleToggleRegistrationTable={vi.fn()}
          id="1"
          formData={mockFormData}
        />
      </MockedProvider>
    );


    // Wait for the data to be loaded and the table to render
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  test("renders the 'Financial Assistance' header correctly", async () => {
    const mockFinancialFormData = {
      serviceName: "Financial Assistance",
    };

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegistrationsTable
          handleToggleRegistrationTable={vi.fn()}
          id="1"
          formData={mockFinancialFormData}
        />
      </MockedProvider>
    );

    // Wait for the data and check the headers
    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("Appointment")).not.toBeInTheDocument();
    });
  });

  test("opens user details when 'Details' button is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegistrationsTable
          handleToggleRegistrationTable={vi.fn()}
          id="1"
          formData={mockFormData}
        />
      </MockedProvider>
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Click the 'Details' button
    const detailsButton = screen.getByText("Details");
    fireEvent.click(detailsButton);

    // Check if user details are shown (you can adjust this based on actual component behavior)
    await waitFor(() => {
      expect(screen.getByText("User’s Details")).toBeInTheDocument();
    });
  });
});
