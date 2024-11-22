import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DonationForm from "../../v1/components/MobileViewComponents/Donation/Form/DonationForm";
import { vi } from "vitest";
import toast from "react-hot-toast";
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_PRODUCT } from "../../v1/graphql-api-calls";
import { useMutation } from "@apollo/client";

// Mock necessary modules and functions
// vi.mock("react-hot-toast", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     success: vi.fn(),
//     error: vi.fn(),
//     loading: vi.fn(),
//     dismiss: vi.fn(),
//   };
// });
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));
vi.mock("@apollo/client", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMutation: vi.fn(),
  };
});

const mockSetIsFormVisible = vi.fn();
const mockHandleReload = vi.fn();

const mockAvailableDonationTypes = ["Zakat", "Sadaqah", "Masjid Maintenance"];

describe("DonationForm Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // test("renders the donation form with initial values", () => {
  //   render(
  //     <MockedProvider>
  //       <DonationForm
  //         setIsFormVisible={mockSetIsFormVisible}
  //         consumerMasjidId="some-masjid-id"
  //         handleReload={mockHandleReload}
  //         availableDonationTypes={mockAvailableDonationTypes}
  //       />
  //     </MockedProvider>
  //   );

  //   // Verify that the form title is rendered
  //   expect(screen.getByText("Add Donation")).toBeInTheDocument();

  //   // Verify that the default amount inputs are rendered
  //   expect(screen.getByTestId("donation-purpose-select")).toBeInTheDocument();

  //   // Verify that the description textarea is rendered
  //   expect(screen.getByLabelText("Description *")).toBeInTheDocument();
  // });

  // test("handles form field changes", () => {
  //   render(
  //     <MockedProvider>
  //       <DonationForm
  //         setIsFormVisible={mockSetIsFormVisible}
  //         consumerMasjidId="some-masjid-id"
  //         handleReload={mockHandleReload}
  //         availableDonationTypes={mockAvailableDonationTypes}
  //       />
  //     </MockedProvider>
  //   );

  //   // Change donation purpose
  //   fireEvent.change(screen.getByTestId("donation-purpose-select"), {
  //     target: { value: "Zakat" },
  //   });
  //   expect(screen.getByTestId("donation-purpose-select")).toHaveValue("Zakat");

  //   // Change description
  //   fireEvent.change(screen.getByLabelText("Description *"), {
  //     target: { value: "This is a test donation description." },
  //   });
  //   expect(screen.getByLabelText("Description *")).toHaveValue(
  //     "This is a test donation description."
  //   );

  //   // Change donation amount
  //   const amountInputs = screen.getAllByRole("textbox");
  //   fireEvent.change(amountInputs[0], {
  //     target: { value: "100.00" },
  //   });
  //   expect(amountInputs[0]).toHaveValue("100.00");
  // });

  // test("shows error toast when required fields are missing", async () => {
  //   render(
  //     <MockedProvider>
  //       <DonationForm
  //         setIsFormVisible={mockSetIsFormVisible}
  //         consumerMasjidId="some-masjid-id"
  //         handleReload={mockHandleReload}
  //         availableDonationTypes={mockAvailableDonationTypes}
  //       />
  //     </MockedProvider>
  //   );

  //   const nextButton = screen.getByText("Next");
  //   fireEvent.click(nextButton);

  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalledWith(
  //       "Please fill in all required fields before previewing."
  //     );
  //   });
  // });

  test("submits the form successfully when all fields are filled", async () => {
    // Mock the useMutation hook
    const mockCreateProduct = vi.fn().mockResolvedValue({
      data: {
        createProduct: {
          id: "123",
          name: "Test Donation",
        },
      },
    });

    (useMutation as jest.Mock).mockReturnValue([
      mockCreateProduct,
      { loading: false, error: null },
    ]);

    render(
      <DonationForm
        setIsFormVisible={mockSetIsFormVisible}
        consumerMasjidId="some-masjid-id"
        handleReload={mockHandleReload}
        availableDonationTypes={mockAvailableDonationTypes}
      />
    );

    // Fill out the form fields
    fireEvent.change(screen.getByTestId("donation-purpose-select"), {
      target: { value: "Zakat" },
    });
    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: "This is a test donation description." },
    });
    // const amountInputs = screen.getAllByRole("textbox");
    // fireEvent.change(amountInputs[0], { target: { value: "100.00" } });

    // Click 'Next' to open the DonationPreview
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.queryByText("Add Donation")).not.toBeInTheDocument(); // Form should no longer be visible
    });

    // Now in DonationPreview, click 'Confirm & Continue'
    const confirmAndContinueButton = screen.getByText("Confirm & Continue");
    fireEvent.click(confirmAndContinueButton);

    await waitFor(() => {
      // Verify the disclaimer is opened
      expect(
        screen.getByText(
          /ConnectMazjid provides donation options but does not handle payment processing/i
        )
      ).toBeInTheDocument();
    });

    // Click 'Yes' in the disclaimer modal to accept
    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);

    await waitFor(() => {
      // Ensure the toast loading is shown
      expect(toast.loading).toHaveBeenCalledWith("Please wait...");
    });

    await waitFor(() => {
      // Verify the API call was made and the mock resolved
      expect(mockCreateProduct).toHaveBeenCalledWith({
        variables: {
          input: {
            name: "Zakat",
            description: "This is a test donation description.",
            active: true,
            type: "DONATION",
            prices: [20.0, 50.0, 200.0],
          },
        },
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText("Donation Added Sucessfully")
      ).toBeInTheDocument();
    });
  });
});
