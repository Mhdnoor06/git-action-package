import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { vi } from "vitest";
import DonationPreview from "../../v1/components/MobileViewComponents/Donation/Preview/DonationPreview";
import { MockedProvider } from "@apollo/client/testing";
import toast from "react-hot-toast";

// Mock external dependencies
vi.mock("moment", async (importOriginal) => {
  const actual = await importOriginal(); // Import the original moment library

  const mockMoment = (timestamp) => {
    return {
      tz: vi.fn(() => ({
        format: vi.fn(() => {
          if (timestamp === 1720086120) return "04:42 AM";
          if (timestamp === 1720087200) return "05:00 AM";
          if (timestamp === 1720117860) return "01:31 PM";
          if (timestamp === 1720135740) return "06:29 PM";
          if (timestamp === 1720143540) return "08:39 PM";
          if (timestamp === 1720149420) return "10:17 PM";
          if (timestamp === 1720148460) return "10:01 PM";
          return "12:00 AM";
        }),
        utcOffset: vi.fn(() => -300),
      })),
      format: vi.fn(() => "01-Jul-2024"),
      utcOffset: vi.fn(() => -300),
    };
  };

  const mockTz = vi.fn(() => ({
    utcOffset: vi.fn(() => -300),
    isDST: vi.fn(() => false),
    format: vi.fn(() => "12:00 AM"),
  }));

  // Mock the moment.utc function
  mockMoment.utc = vi.fn(() => ({
    tz: mockTz,
    format: vi.fn(() => "01-Jul-2024"),
  }));

  // Return a modified moment object with the mocked functions
  return {
    ...actual,
    default: mockMoment,
  };
});

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));

const mockUpdateProduct = vi.fn();

vi.mock("@apollo/client", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMutation: vi.fn(() => [
      mockUpdateProduct,
      { loading: false, error: null, data: null },
    ]),
  };
});

// Mock data and functions
const mockHandleReload = vi.fn();
const mockDonation = {
  name: "Test Donation",
  description: "This is a test donation description",
  prices: [10, 20, 30],
  active: true,
  createdAt: "2023-08-16T00:00:00Z",
  images: [{ url: "test-image-url.jpg", id: "img1" }],
};

describe("DonationPreview Component", () => {
  it("renders the donation preview correctly", () => {
    render(
      <MockedProvider>
        <DonationPreview
          donation={mockDonation}
          isPreviewMode={false}
          handleReload={mockHandleReload}
          consumerMasjidId="123"
          tZone="America/Chicago"
        />
      </MockedProvider>
    );

    // Verify that the donation name and description are rendered
    expect(screen.getAllByText("Test Donation").length).toBeGreaterThan(0);
    expect(
      screen.getByText("This is a test donation description")
    ).toBeInTheDocument();

    // Verify that the prices are rendered
    mockDonation.prices.forEach((price) => {
      expect(
        screen.getByDisplayValue(price.toFixed(2).padStart(5, "0"))
      ).toBeInTheDocument();
    });

    // Verify the active status switch
    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();
  });

  it("calls the mutation when activating/deactivating the donation", async () => {
    render(
      <MockedProvider>
        <DonationPreview
          donation={mockDonation}
          isPreviewMode={false}
          handleReload={mockHandleReload}
          consumerMasjidId="123"
          tZone="America/Chicago"
        />
      </MockedProvider>
    );

    // Simulate toggling the active status
    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);

    // Verify that the warning modal appears
    await waitFor(() => {
      expect(
        screen.getByText(/Are you sure you want to deactivate/i)
      ).toBeInTheDocument();
    });

    // Confirm the action
    const confirmButton = screen.getByText("Yes");
    fireEvent.click(confirmButton);

    // Verify that the mutation is called with correct arguments
    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith({
        variables: {
          input: {
            name: mockDonation.name,
            active: false, // Deactivating
            description: mockDonation.description,
            prices: mockDonation.prices,
            type: "DONATION",
          },
          id: mockDonation.id,
        },
      });
    });

    // Verify that toast messages are shown
    await waitFor(() => {
      expect(toast.loading).toHaveBeenCalledWith("Please wait...");
    });
  });

  it("renders 'Confirm & Continue' button in preview mode", () => {
    render(
      <MockedProvider>
        <DonationPreview
          donation={mockDonation}
          isPreviewMode={true}
          handleReload={mockHandleReload}
          handleDisclaimerStatus={vi.fn()}
          consumerMasjidId="123"
          tZone="America/Chicago"
        />
      </MockedProvider>
    );

    // Check that the "Confirm & Continue" button is rendered
    expect(screen.getByText("Confirm & Continue")).toBeInTheDocument();
  });

  it("triggers handleBack on edit icon click in preview mode", () => {
    const mockSetIsPreviewVisible = vi.fn();
    render(
      <MockedProvider>
        <DonationPreview
          donation={mockDonation}
          isPreviewMode={true}
          setIsPreviewVisible={mockSetIsPreviewVisible}
          handleReload={mockHandleReload}
          consumerMasjidId="123"
          tZone="America/Chicago"
        />
      </MockedProvider>
    );

    // Click on the edit icon
    const editIcon = screen.getByAltText("edit");
    fireEvent.click(editIcon);

    // Verify that handleBack (setIsPreviewVisible) is called
    expect(mockSetIsPreviewVisible).toHaveBeenCalledWith(false);
  });

  it("opens image in full-screen modal when clicked", async () => {
    render(
      <MockedProvider>
        <DonationPreview
          donation={mockDonation}
          isPreviewMode={false}
          handleReload={mockHandleReload}
          consumerMasjidId="123"
          tZone="America/Chicago"
        />
      </MockedProvider>
    );

    // Click on the image to open it in full-screen modal
    const image = screen.getByTestId("preview-img");
    fireEvent.click(image);
    await waitFor(() => {
      const fullScreenModal = screen.getByTestId("fullscreen-img-modal");

      expect(
        within(fullScreenModal).getByAltText("Photo 0")
      ).toBeInTheDocument(); // Assuming the modal uses alt text for the image
    });
    // Check if the full-screen modal is displayed with the image
  });

  it("handles missing images gracefully", () => {
    const mockDonationNoImages = { ...mockDonation, images: [] };
    render(
      <MockedProvider>
        <DonationPreview
          donation={mockDonationNoImages}
          isPreviewMode={false}
          handleReload={mockHandleReload}
          consumerMasjidId="123"
          tZone="America/Chicago"
        />
      </MockedProvider>
    );

    // Check that the default no image is rendered
    const defaultImage = screen.getByAltText("No Event Image");
    expect(defaultImage).toBeInTheDocument();
  });
});
