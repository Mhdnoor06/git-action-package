import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Payments from "../../v1/components/MobileViewComponents/Payments/Payments";
import { useAppSelector } from "../../v1/redux/hooks";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
import useStripeConnect from "../../v1/helpers/StripeConnectHelper/useStripeConnect";
import axios from "axios";
import toast from "react-hot-toast";
import PaymentTransactions from "../../v1/components/MobileViewComponents/Payments/PaymentTransactions/PaymentTransactions";
// Mock external dependencies
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));

vi.mock("axios");
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));

vi.mock("../../v1/redux/hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock(
  "../../v1/components/MobileViewComponents/Payments/PaymentTransactions/PaymentTransactions",
  () => ({
    __esModule: true,
    default: () => <div>Mocked Transaction History</div>,
  })
);
// Base mock for useStripeConnect hook
const baseStripeConnectMock = {
  stripeConnect: vi.fn(async () => ({
    success: true,
    status: 202,
    data: {
      account: {
        status: "approved",
      },
      email: "akeelabbas29@gmail.com",
    },
    error: null,
  })),
  isLoading: false,
  error: null,
};

// Mock useStripeConnect
vi.mock("../../v1/helpers/StripeConnectHelper/useStripeConnect", () => ({
  __esModule: true,
  default: vi.fn(() => baseStripeConnectMock),
}));

describe("Payments Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear the mocks before each test case
    baseStripeConnectMock.stripeConnect.mockClear();
    (customNavigatorTo as jest.Mock).mockClear();
  });

  it("renders the Payments component correctly", () => {
    render(<Payments consumerMasjidId="123" />);

    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(
      screen.getByText("Link Your Account to Receive Payments")
    ).toBeInTheDocument();
  });

  it("shows loading spinner when Stripe connection is loading", () => {
    baseStripeConnectMock.isLoading = true;

    render(<Payments consumerMasjidId="123" />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("handles successful Stripe connection", async () => {
    baseStripeConnectMock.isLoading = false;

    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 202,
      data: {
        account: {
          status: "approved",
        },
        email: "admin@masjid.com",
      },
      error: null, // Explicitly adding error as null
    });

    render(<Payments consumerMasjidId="123" />);

    await waitFor(() => {
      expect(
        screen.getByText(/Email: ad\*\*\*@mas\*\*\*.com/i)
      ).toBeInTheDocument();
    });
  });

  it("handles OTP sending on 'Link My Account' click", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: "OTP Sent" },
    });

    render(<Payments consumerMasjidId="123" />);

    const linkButton = screen.getByText("Link My Account");
    fireEvent.click(linkButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/email/get-otp"),
        expect.any(Object),
        expect.any(Object)
      );
      expect(toast.loading).toHaveBeenCalledWith("Sending Otp...");
    });

    // Check if OTP status is displayed
    await waitFor(() => {
      expect(screen.getByText("Enter Your OTP")).toBeInTheDocument();
    });
  });

  it("handles OTP input and submits OTP to Stripe API on 'Verify' click", async () => {
    // Mock the initial stripeConnect call for 'Link My Account' click
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 202,
      data: {
        account: {
          status: "pending",
        },
        email: "admin@masjid.com",
      },
      error: null,
    });

    // Render the Payments component
    render(<Payments consumerMasjidId="123" />);

    // Simulate sending OTP (for the first call)
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: "OTP Sent" },
    });

    const linkButton = screen.getByText("Link My Account");
    fireEvent.click(linkButton);

    // Wait for the OTP input to appear
    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Sending Otp...");
      expect(screen.getByText("Enter Your OTP")).toBeInTheDocument();
    });

    // Simulate entering OTP
    const otpInput = screen.getByPlaceholderText("Enter OTP");
    fireEvent.change(otpInput, { target: { value: "123456" } });

    // Mock the second stripeConnect call for OTP verification
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 200,
      data: {
        link: "https://stripe.com/setup-link", // Mocking the link for redirection
      },
      error: null,
    });

    // Simulate clicking the 'Verify' button
    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    // Wait for the OTP submission to happen
    await waitFor(() => {
      // Ensure the stripeConnect function was called again with the entered OTP
      expect(baseStripeConnectMock.stripeConnect).toHaveBeenCalledWith(
        "", // Empty email
        "123456", // The entered OTP
        true // showErrors flag
      );
    });

    // Ensure the toast for successful verification/loading is shown
    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Redirecting to stripe...");
    });

    // Optionally check if window.location.href is set to the stripe link
    // This can be mocked if necessary in a more advanced setup.
  });

  it("handles Stripe connection error", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: false,
      status: 400,
      //   data: undefined,
      error: "Request failed with status code 400", // Error case scenario
    });

    render(<Payments consumerMasjidId="123" />);

    await waitFor(() => {
      expect(
        screen.getByText("Link Your Account to Receive Payments")
      ).toBeInTheDocument();
    });

    // Try connecting to Stripe
    const linkButton = screen.getByText("Link My Account");
    fireEvent.click(linkButton);
  });
  it("missing link error", async () => {
    baseStripeConnectMock.isLoading = false;
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 200,
      data: {
        link: "",
      },
      error: "Request failed with status code 400", // Error case scenario
    });

    render(<Payments consumerMasjidId="123" />);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("An unexpected error occured");
    });
  });

  it("shows 'Under Review' status if account is pending from connect mazjid", async () => {
    baseStripeConnectMock.isLoading = false;

    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 202,
      data: {
        account: {
          status: "inreview",
        },
      },
      error: null, // Explicitly adding error as null
    });

    render(<Payments consumerMasjidId="123" />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /Thank you for completing your account setup. Your account is currently under review by/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText("ConnectMazjid Team")).toBeInTheDocument();
      expect(
        screen.getByText(
          /We will notify you by email once the review process is complete/i
        )
      ).toBeInTheDocument();
    });
  });
  it("shows 'Under Review' status if account is pending from stripe", async () => {
    baseStripeConnectMock.isLoading = false;

    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 202,
      data: {
        account: {
          status: "pending",
          stripeStatus: "pending",
        },
      },
      error: null, // Explicitly adding error as null
    });

    render(<Payments consumerMasjidId="123" />);

    await waitFor(() => {
      expect(
        screen.getByText(
          /Thank you for completing your account setup. Your account is currently under review by/i
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Stripe")).toBeInTheDocument();
    });
  });
  it("shows rejected status if account is rejected and goes to contact form if support is clicked", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 202,
      data: {
        account: {
          status: "rejected",
        },
      },
      error: null, // Explicitly adding error as null
    });

    render(<Payments consumerMasjidId="123" />);

    await waitFor(() => {
      expect(screen.getByText(/Approval Status:/i)).toBeInTheDocument();
      expect(screen.getByText(/Rejected by/i)).toBeInTheDocument();
      expect(screen.getByText(/ConnectMazjid Team/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact Support/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Contact Support/i));

    await waitFor(() => {
      expect(customNavigatorTo).toHaveBeenCalledWith("/feed/13");
    });
  });

  it("navigates back when the back button is clicked", async () => {
    render(<Payments consumerMasjidId="123" />);

    const backButton = screen.getByAltText("back btn");
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(customNavigatorTo).toHaveBeenCalledWith("/feed/0");
    });
  });
  it("shows partial link status and redirects to Stripe on 'Complete Stripe Setup' click", async () => {
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 202,
      data: {
        account: {
          status: "pending",
          stripeStatus: "inactive",
          pendingActions: [{}], // Assuming there's a pending action
        },
        link: "https://stripe.com/setup-link", // Mock partial link URL
      },
      error: null,
    });

    render(<Payments consumerMasjidId="123" />);

    await waitFor(() => {
      // Verify that the partial link status is displayed
      expect(
        screen.getByText(/Complete Your Account setup to Receive Payments/i)
      ).toBeInTheDocument();

      // Verify the button text is "Complete Stripe Setup"
      expect(screen.getByText("Complete Stripe Set up")).toBeInTheDocument();
    });

    // Simulate clicking the "Complete Stripe Setup" button
    const completeSetupButton = screen.getByText("Complete Stripe Set up");
    fireEvent.click(completeSetupButton);
    expect(toast.loading).toHaveBeenCalledWith("Redirecting to stripe...");
    // Verify the redirection to the partial link URL
  });

  it("handles existing account with 'hasaccount' status and shows transactions on 'View Transactions' click", async () => {
    // Mock the stripeConnect call for existing account
    baseStripeConnectMock.stripeConnect.mockResolvedValueOnce({
      success: true,
      status: 202,
      data: {
        account: {
          status: "approved", // Existing account is approved
        },
        email: "admin@masjid.com", // Mocked email for obfuscation
      },
      error: null,
    });

    // Render the Payments component
    render(<Payments consumerMasjidId="123" />);

    // Wait for the account status to load
    await waitFor(() => {
      // Ensure the email is displayed (obfuscated)
      expect(screen.getByText(/Email:/i)).toBeInTheDocument();
      expect(screen.getByText(/ad\*\*\*@mas\*\*\*.com/i)).toBeInTheDocument();

      // Ensure the 'View Transactions' button is displayed
      expect(screen.getByText("View Transactions")).toBeInTheDocument();
    });

    // Simulate clicking the 'View Transactions' button
    const viewTransactionsButton = screen.getByText("View Transactions");
    fireEvent.click(viewTransactionsButton);

    // Wait for the mock PaymentTransactions component to be displayed
    await waitFor(() => {
      // Ensure the mock PaymentTransactions component is rendered
      expect(
        screen.getByText("Mocked Transaction History")
      ).toBeInTheDocument();
    });

    // Verify no additional API call is made after 'View Transactions' click (only for viewing transactions)
    expect(baseStripeConnectMock.stripeConnect).toHaveBeenCalledTimes(1); // Only initial call made
  });
  it("shows error when OTP is empty and 'Verify' is clicked", async () => {
    // Mock the response for OTP sending
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: "OTP Sent" },
    });

    // Render the Payments component
    render(<Payments consumerMasjidId="123" />);

    // Simulate sending OTP by clicking 'Link My Account'
    const linkButton = screen.getByText("Link My Account");
    fireEvent.click(linkButton);

    // Wait for the OTP input to appear
    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Sending Otp...");
      expect(screen.getByText("Enter Your OTP")).toBeInTheDocument();
    });

    // Simulate clicking the 'Verify' button without entering any OTP
    const verifyButton = screen.getByText("Verify");
    fireEvent.click(verifyButton);

    // Wait for the error toast to be triggered
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Otp is required!");
    });
  });
});
