import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach, afterEach } from "vitest";
import Donations from "../../v1/components/MobileViewComponents/Donation/Donations";
import { useMutation, useQuery } from "@apollo/client";
import { useAppSelector, useAppThunkDispatch } from "../../v1/redux/hooks";
import { fetchMasjidById } from "../../v1/redux/actions/MasjidActions/fetchMasjidById";
import { GET_PRODUCTS } from "../../v1/graphql-api-calls";
import useStripeConnect from "../../v1/helpers/StripeConnectHelper/useStripeConnect";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
import DonationDetails from "../../v1/components/MobileViewComponents/Donation/Details/DonationDetails";
import StripeErrorModal from "../../v1/components/MobileViewComponents/Payments/StripeErrorModal/StripeErrorModal";
// Mock necessary modules
vi.mock("@apollo/client", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: vi.fn(),
  };
});
// Mocking external dependencies
vi.mock("../../v1/helpers/HelperFunction", () => ({
  // Mock the entire module
  ...vi.importActual("../../v1/helpers/HelperFunction"),
  customNavigatorTo: vi.fn(), // Mock the hook to be a mock function
}));
vi.mock(
  "../../v1/components/MobileViewComponents/Donation/Details/DonationDetails",
  () => ({
    __esModule: true,
    default: ({ handleCloseDonationDetails, handleReload }) => (
      <div data-testid="donation-details">
        Donation Details
        <button
          data-testid="close-details-btn"
          onClick={handleCloseDonationDetails}
        >
          Close
        </button>
        <button data-testid="reload-button" onClick={handleReload}>
          Reload
        </button>
      </div>
    ),
  })
);

vi.mock("../../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppThunkDispatch: vi.fn(),
    useAppSelector: vi.fn().mockImplementation((selector) =>
      selector({
        AdminMasjid: {
          masjidName: "Muhammad Mosque #14",
          masjidProfilePhoto:
            "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-6418363abd4d568fabfb5431/7a972364-c562-45e6-aacc-04cbf7d1e9bd.jpg",
          masjidPhotos: [],
          description: "Muhammad Mosque #14",
          address: "2550 Main St, Hartford, CT 06120, USA",
          location: { coordinates: [-72.6715188, 41.7887357] },
          contact: "",
          externalLinks: [],
          updatedAt: "2024-09-23T11:23:06.005Z",
          isAssigned: true,
          updatedBy: null,
          lastEditor: {
            _id: "66d1ccf5b30e4754304f1730",
            name: "Mirza",
            role: "subadmin",
          },
          assignedUser: { _id: "66d1ccf5b30e4754304f1730", name: "Mirza" },
        },
      })
    ),
  };
});

vi.mock("../../v1/redux/actions/MasjidActions/fetchMasjidById", () => ({
  fetchMasjidById: vi.fn(),
}));

const baseStripeConnectMock = {
  stripeConnect: vi.fn(async () => ({
    success: true,
    status: 202,
    data: {
      account: {
        status: "approved",
      },
    },
    error: null,
  })),
  isLoading: false,
  error: null,
};

vi.mock("../../v1/helpers/StripeConnectHelper/useStripeConnect", () => ({
  __esModule: true,
  default: vi.fn(() => baseStripeConnectMock),
}));
const mockHandleClose = vi.fn();
const mockHandleButtonClick = vi.fn();
const setupComponent = (isMainAdmin: boolean) => {
  return render(
    <StripeErrorModal
      isOpen={true} // Ensure the dialog is open
      handleClose={mockHandleClose}
      handleButtonClick={mockHandleButtonClick}
      feature="to receive donations"
      isMainAdmin={isMainAdmin} // You can test both true/false for admin state
    />
  );
};
describe("Donations Component", () => {
  let dispatchMock;
  let mockNavigate;

  beforeEach(() => {
    dispatchMock = vi.fn();
    mockNavigate = vi.fn(); // Create a mock function for navigation
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (customNavigatorTo as jest.Mock).mockReturnValue(mockNavigate);

    useMutation.mockReturnValue([
      vi.fn(async () => ({
        data: { createProduct: { id: "123", name: "Test Donation" } },
      })), // Mock mutation function
      { loading: false, error: null }, // Mutation state
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading spinner initially", () => {
    useQuery.mockReturnValue({
      loading: true,
      data: null,
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it('should show "No Donations Yet" message when there are no donations', () => {
    useQuery.mockReturnValue({
      loading: false,
      data: { getProducts: [] },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    expect(screen.getByText("No Donation Yet")).toBeInTheDocument();
  });

  it("should show donation cards when donations are available", async () => {
    useQuery.mockReturnValue({
      loading: false,
      data: {
        getProducts: [
          {
            id: "1",
            name: "Test1",
            description: "Test Donation 1",
            active: false,
          },
          {
            id: "2",
            name: "Test2",
            description: "Test Donation 2",
            active: true,
          },
        ],
      },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    await waitFor(
      () => {
        expect(
          screen.queryByText(/Account Not Linked/i)
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    expect(screen.getByText("Test1")).toBeInTheDocument();
    expect(screen.getByText("Test Donation 1")).toBeInTheDocument();
    expect(screen.getByText("Test2")).toBeInTheDocument();
    expect(screen.getByText("Test Donation 2")).toBeInTheDocument();
    expect(screen.getAllByTestId("greendot").length).toBe(1);
    expect(screen.getAllByTestId("reddot").length).toBe(1);
  });

  it('should open donation form when "Add Donation" button is clicked', async () => {
    useQuery.mockReturnValue({
      loading: false,
      data: { getProducts: [] },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    await waitFor(
      () => {
        expect(
          screen.queryByText(/Account Not Linked/i)
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const addButton = screen.getByTestId("AddDonation");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByText(/Add Donation/i)).toBeInTheDocument();
    });
  });

  it("should show Stripe error modal when there is no account connected", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 200,
      data: null,
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getByText(/Account Not Linked/i)).toBeInTheDocument();
    });
  });
  it("should show Stripe error modal when there is rejected account", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 200,
      data: { account: { status: "rejected" } },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getByText(/Account Not Linked/i)).toBeInTheDocument();
    });
  });
  it("should show Stripe error modal when there is inreview account", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 200,
      data: { account: { status: "inreview" } },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getByText(/Account Not Linked/i)).toBeInTheDocument();
    });
  });
  it("should go to payments page on click of Link My Account", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 200,
      data: { account: { status: "inreview" } },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    await waitFor(() => {
      expect(screen.getByText(/Account Not Linked/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /It seems that you don't have a linked Stripe account/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/to receive donations /i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /through ConnectMazjid. Please connect your Stripe account to start accepting payments./i
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Link My Account/i)).toBeInTheDocument();
    });
    const LinkAccountBtn = screen.getByText(/Link My Account/i);
    fireEvent.click(LinkAccountBtn);
    expect(customNavigatorTo).toHaveBeenCalledWith("/feed/12");
  });

  it("should navigate back when close button is clicked when no account exists", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 200,
      data: { account: { status: "inreview" } },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    await waitFor(() => {
      expect(screen.getByText(/Account Not Linked/i)).toBeInTheDocument();
    });
    const backButton = screen.getByTestId("CloseIcon");
    fireEvent.click(backButton);
    await waitFor(() => {
      expect(customNavigatorTo).toHaveBeenCalledWith("/feed/0");
    });
  });
  it("should navigate back when close button is clicked when there is an account exists", async () => {
    useQuery.mockReturnValue({
      loading: false,
      data: { getProducts: [] },
      error: null,
    });
    render(<Donations consumerMasjidId="123" />);
    await waitFor(
      () => {
        expect(
          screen.queryByText(/Account Not Linked/i)
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const backButton = screen.getByAltText("back btn");
    fireEvent.click(backButton);
    await waitFor(() => {
      expect(customNavigatorTo).toHaveBeenCalledWith("/feed/0");
    });
  });

  it("should handle Stripe account connection error", async () => {
    // Access the mock and set a specific return value
    // const mockUseStripeConnect = require("../../v1/helpers/StripeConnectHelper/useStripeConnect").default;
    (useStripeConnect as jest.Mock).mockReturnValue({
      stripeConnect: vi.fn(async () => ({
        success: false, // Simulate a failed connection
        status: 400,
        data: null,
        error: "Stripe connection error",
      })),
      isLoading: false,
      error: null,
    });

    render(<Donations consumerMasjidId="123" />);
    await waitFor(() => {
      expect(screen.getByText(/Account Not Linked/i)).toBeInTheDocument();
    });
  });

  it("should open donation details when a donation card is clicked", async () => {
    useQuery.mockReturnValue({
      loading: false,
      data: {
        getProducts: [
          {
            id: "1",
            name: "Test1",
            description: "Test Donation 1",
            active: false,
          },
          {
            id: "2",
            name: "Test2",
            description: "Test Donation 2",
            active: true,
          },
        ],
      },
      error: null,
    });

    render(<Donations consumerMasjidId="123" />);

    // Click on the first donation card
    const donationCard = screen.getByText("Test1");
    fireEvent.click(donationCard);

    // Wait for the DonationDetails component to appear
    await waitFor(() => {
      expect(screen.getByTestId("donation-details")).toBeInTheDocument();
    });
  });
  it("should close donation details when the close button is clicked", async () => {
    useQuery.mockReturnValue({
      loading: false,
      data: {
        getProducts: [
          {
            id: "1",
            name: "Test1",
            description: "Test Donation 1",
            active: false,
          },
          {
            id: "2",
            name: "Test2",
            description: "Test Donation 2",
            active: true,
          },
        ],
      },
      error: null,
    });

    render(<Donations consumerMasjidId="123" />);

    // Click on the first donation card
    const donationCard = screen.getByText("Test1");
    fireEvent.click(donationCard);

    // Wait for the DonationDetails component to appear
    await waitFor(() => {
      expect(screen.getByTestId("donation-details")).toBeInTheDocument();
    });

    // Simulate clicking the close button in the DonationDetails component
    const closeButton = screen.getByTestId("close-details-btn");
    fireEvent.click(closeButton);

    // Wait for the DonationDetails component to disappear
    await waitFor(() => {
      expect(screen.queryByTestId("donation-details")).not.toBeInTheDocument();
    });
  });

  it("should trigger handleReload and call refetch when triggered", async () => {
    const refetchMock = vi.fn(); // Mock the refetch function

    useQuery.mockReturnValue({
      loading: false,
      data: {
        getProducts: [
          {
            id: "1",
            name: "Test1",
            description: "Test Donation 1",
            active: false,
          },
        ],
      },
      refetch: refetchMock, // Use the mock refetch function
      error: null,
    });

    render(<Donations consumerMasjidId="123" />);

    // Click on the first donation card to open details
    const donationCard = screen.getByText("Test1");
    fireEvent.click(donationCard);

    // Wait for the DonationDetails component to appear
    await waitFor(() => {
      expect(screen.getByTestId("donation-details")).toBeInTheDocument();
    });

    // Simulate clicking the reload button inside DonationDetails (mocking button for this test)
    const reloadButton = screen.getByTestId("reload-button"); // Assuming there's a button to trigger reload
    fireEvent.click(reloadButton);

    // Check that refetch is called after reload is triggered
    expect(refetchMock).toHaveBeenCalled();
  });

  it("should render the StripeErrorModal dialog with Account Not Linked btn", () => {
    setupComponent(false);

    // Check if the modal title and description are displayed
    expect(screen.getByText("Account Not Linked")).toBeInTheDocument();
    expect(
      screen.getByText(/It seems that you don't have a linked Stripe account/)
    ).toBeInTheDocument();
  });
  it("should render the StripeErrorModal dialog without Account Not Linked btn", () => {
    setupComponent(true);

    // Check if the modal title and description are displayed
    expect(screen.queryByTestId("account-not-link")).not.toBeInTheDocument();
    expect(
      screen.getByText(/It seems that you don't have a linked Stripe account/)
    ).toBeInTheDocument();
  });
});
