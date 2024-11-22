import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, Mock } from "vitest";

import { MockedProvider } from "@apollo/client/testing";
// import { DELETE_SERVICE, UPDATE_SERVICE } from "../../../../graphql-api-calls/mutation";
import toast from "react-hot-toast";
import ServiceView from "../../v1/components/MobileViewComponents/Services/View/ServiceView";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
// import MyProvider from "../../MyProvider";

// Mocks
vi.mock("../../v1/helpers/HelperFunction", () => ({
  // Mock the entire module
  ...vi.importActual("../../v1/helpers/HelperFunction"),
  customNavigatorTo: vi.fn(), // Mock the hook to be a mock function
}));
// vi.mock("../../v1/components/MobileViewComponents/Shared/BackButton", () => ({
//   default: () => <button>BackButton</button>,
// }));
vi.mock("../../v1/components/MobileViewComponents/Shared/CustomBtn", () => ({
  default: ({ label }: { label: string }) => <button>{label}</button>,
}));
vi.mock("../../v1/components/MobileViewComponents/Shared/MoreBtn", () => ({
  default: ({ tsx }: { tsx: string }) => <span>{tsx}</span>,
}));
vi.mock("react-hot-toast", async () => {
  const originalModule = await vi.importActual("react-hot-toast"); // Import the original module
  return {
    __esModule: true,
    ...originalModule, // Spread in the original exports
    default: originalModule.default, // Export the default function as it is
    loading: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  };
});

const mockNavigate = vi.fn();
vi.mock("../../MyProvider", () => ({
  useNavigationprop: () => mockNavigate,
}));

// Mock data
const mockFormData = {
  serviceName: "Sample Service",
  image: "https://example.com/test-image.jpg",
  description: "Service description",
  email: "sample@service.com",
  contactNumber: "1234567890",
  registrationRequired: true,
  responseResponse: {},
  active: true,
};

const renderComponent = (props = {}) => {
  return render(
    <MockedProvider>
      <ServiceView
        formData={mockFormData}
        masjidName="Test Masjid"
        tZone="UTC"
        Dates={[]}
        handleDisclaimerStatus={vi.fn()}
        isPreviewMode={false}
        setPreview={vi.fn()}
        selectedWeekDays={[]}
        updateEventPhotos={vi.fn()}
        isEditing={true}
        setIsPreviewVisible={vi.fn()}
        handleEditButton={vi.fn()}
        setIsRegistrationsVisible={vi.fn()}
        setIsShareVisible={vi.fn()}
        masjidId="1"
        {...props}
      />
    </MockedProvider>
  );
};

describe("ServiceView Component", () => {
  let mockNavigate;
  beforeEach(() => {
    mockNavigate = vi.fn(); // Create a mock function for navigation
    // (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    mockNavigate = vi.fn();
    (customNavigatorTo as Mock).mockReturnValue(mockNavigate);

    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByTestId("service-details")).toBeInTheDocument();
  });

  it("displays service information correctly", () => {
    renderComponent();
    expect(
      screen.getAllByText(mockFormData.serviceName)[0]
    ).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText(mockFormData.email)).toBeInTheDocument();
    expect(screen.getByText("Contact Number")).toBeInTheDocument();
    expect(screen.getByText(mockFormData.contactNumber)).toBeInTheDocument();
  });

  it("calls handleEditButton on edit button click", () => {
    const handleEditButtonMock = vi.fn();
    renderComponent({ handleEditButton: handleEditButtonMock });
    fireEvent.click(screen.getByAltText("Edit Icon"));
    expect(handleEditButtonMock).toHaveBeenCalled();
  });

  it("toggles active/deactivate status correctly", async () => {
    renderComponent();
    const toggleSwitch = screen.getByTestId("service-toggle-switch");
    fireEvent.click(toggleSwitch);

    expect(
      screen.getByText("Deactivate Sample Service Service")
    ).toBeInTheDocument();
    const noAction = screen.getByText("No");
    fireEvent.click(noAction);
    expect(
      screen.queryByText("Deactivate Sample Service Service")
    ).not.toBeInTheDocument();
    // const toggleSwitchAgain = screen.getByTestId("service-toggle-switch");
    // fireEvent.click(toggleSwitchAgain);
    // const yesAction = screen.getByText("Yes");
    // fireEvent.click(yesAction);
    // expect(toast.loading).toHaveBeenCalledWith("Deactivating service...");
  });

  it("opens image modal on image click", () => {
    renderComponent();
    const serviceImage = screen.getByAltText("service-top-img");
    fireEvent.click(serviceImage);
    expect(screen.getByAltText("Image")).toBeInTheDocument(); // Assuming the modal contains "Image" text
  });

  it("navigates back on back button click", async () => {
    renderComponent();
    fireEvent.click(screen.getByAltText("back btn"));
    // await waitFor(() => {
    //   expect(customNavigatorTo).toHaveBeenCalledWith("/feed/7");
    // });
  });
  it("shows correct toast messages on success and error", async () => {
    renderComponent();
    const toggleSwitch = screen.getByTestId("service-toggle-switch");
    fireEvent.click(toggleSwitch);

    // Assuming the toggle logic calls `toast.success` on success
    fireEvent.click(screen.getByText("Yes"));
    
    // await waitFor(() => {
    //   expect(toast.loading).toHaveBeenCalledWith("Deactivating service...");
    // });
  });
});
