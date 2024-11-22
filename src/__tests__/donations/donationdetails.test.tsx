import { render, screen } from "@testing-library/react";
import DonationDetails from "../../v1/components/MobileViewComponents/Donation/Details/DonationDetails";
import { vi } from "vitest";
import DonationPreview from "../../v1/components/MobileViewComponents/Donation/Preview/DonationPreview";
import { ApolloClient, InMemoryCache } from "@apollo/client";
// Mock the DonationPreview component
vi.mock(
  "../../v1/components/MobileViewComponents/Donation/Preview/DonationPreview",
  () => ({
    __esModule: true,
    default: vi.fn(() => <div data-testid="donation-preview" />),
  })
);
// Create a mock Apollo Client
const mockClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/mocked-uri", // Provide a mock URI
});

// Mock useWidgetAuth hook
vi.mock("../../v1/graphql-api-calls/widgetAuth/widgetAuth", () => ({
  useWidgetAuth: vi.fn(() => ({
    authenticateWidget: vi.fn(() =>
      Promise.resolve({
        data: {
          widgetAuth: {
            token: "mocked_token",
          },
        },
      })
    ),
    data: { widgetAuth: { token: "mocked_token" } },
    loading: false,
    error: null,
  })),
}));
const mockDonation = {
  name: "Test Donation",
  description: "This is a test donation description",
  prices: [50, 100, 200],
  active: true,
};

const mockHandleCloseDonationDetails = vi.fn();
const mockHandleReload = vi.fn();

describe("DonationDetails Component", () => {
  test("renders DonationPreview with sorted prices", () => {
    render(
      <DonationDetails
        donation={mockDonation}
        handleCloseDonationDetails={mockHandleCloseDonationDetails}
        handleReload={mockHandleReload}
      />
    );

    // Check if DonationPreview is rendered
    expect(screen.getByTestId("donation-preview")).toBeInTheDocument();

    // Verify that DonationPreview was called with sorted prices
    expect(DonationPreview).toHaveBeenCalledWith(
      expect.objectContaining({
        donation: expect.objectContaining({
          prices: [50, 100, 200],
        }),
      }),
      {}
    );
  });
});
