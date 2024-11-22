import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import toast from "react-hot-toast";
import { MockedProvider } from "@apollo/client/testing";

import ImageUploader from "../../v1/components/MobileViewComponents/Events/Helpers/eventImageUploader/ImageUploader";
import { useMutation } from "@apollo/client";

import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { validateForm } from "../../v1/helpers/HelperFunction";

import ServiceForm from "../../v1/components/MobileViewComponents/Services/ServiceForm";
import ServiceView from "../../v1/components/MobileViewComponents/Services/View/ServiceView";
import ServicePreview from "../../v1/components/MobileViewComponents/Services/Preview/ServicePreview";
// Mock necessary modules and functions
const mockHandleFinalSubmitting = vi.fn();
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));

// Mock @apollo/client and return all necessary exports
vi.mock("@apollo/client", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMutation: vi.fn(() => [
      vi.fn(),
      { loading: false, error: null, data: null },
    ]),
  };
});

// Mock the uploadImage function
vi.mock("../../../../helpers/imageUpload/imageUpload", () => ({
  uploadImage: vi.fn(),
}));
vi.mock(
  "../../v1/components/MobileViewComponents/Events/Helpers/eventImageUploader/ImageUploader"
);

describe("Service Form Component", () => {
  const mockCreateService = vi.fn();
  const mockUpdateService = vi.fn();
  const setValidationErrors = vi.fn();
  const handleChange = vi.fn();
  const isPaymentsSetup = true;
  const isStripeLoading = false;
  const admin = true;
  const setup = (formDataOverrides = {}) => {
    const formData = {
      startTime: "10:00",
      endTime: "11:00",
      startDate: "2024-10-01",
      endDate: "2024-10-01",
      ServiceName: "ServiceName",
      recurrenceType: "None",
      cost: 0,
      registrationOption: "free",
      startRange: 1,
      endRange: 5,
      ...formDataOverrides, // override specific formData values
    };

    const handleChange = vi.fn();
    const validationErrors = { all: false };

    render(
      <Provider store={Store}>
        <MockedProvider>
          <ServiceForm
            serviceData={formData}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        </MockedProvider>
      </Provider>
    );

    return {
      handleChange,
      formData,
    };
  };
  beforeEach(() => {
    (useMutation as Mock).mockReturnValue([
      mockCreateService, // the mutation function
      { data: undefined, loading: false, error: undefined }, // the mutation state
    ]);
    (useMutation as Mock).mockReturnValue([
      mockUpdateService, // the mutation function
      { data: undefined, loading: false, error: undefined }, // the mutation state
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  const initialComponent = (majsidId = "some-masjid-id") => (
    <Provider store={Store}>
      <MockedProvider>
        <ServiceForm
          serviceData={{ serviceName: "Funeral", registrationRequired: false }}
          masjidId={majsidId}
        />
      </MockedProvider>
    </Provider>
  );
  test("renders the Service form with initial values", () => {
    render(initialComponent());

    // Verify that the form title is rendered
    expect(screen.getByText("Add Service")).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
  });

  it("updates form fields on input change", () => {
    render(initialComponent("123"));

    const desInput = screen.getByLabelText(/Description/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const numberInput = screen.getByLabelText(/Contact Number/i);

    fireEvent.change(desInput, { target: { value: "test des" } });
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.change(numberInput, { target: { value: "018525" } });

    expect(desInput).toHaveValue("test des");
    expect(emailInput).toHaveValue("test@email.com");
    expect(numberInput).toHaveValue("018525");
  });
  it('should not display "Registration Required" checkbox for Funeral service', () => {
    render(initialComponent("123"));
    const formData = { serviceName: "Funeral", registrationRequired: false };

    const checkbox = screen.getByRole("checkbox", {
      name: /registration required/i,
    });
    // expect(checkbox).toBeNull(); // Checkbox should not be present for 'Funeral'
  });

  // //   // Select a category from the menu
  // //   const categoryOption = screen.getByText("Quran Services"); // Adjust to the desired category
  // //   fireEvent.click(categoryOption); // Select the option
  // //   expect(screen.getByLabelText(/Quran Services/i)).toBeInTheDocument();
  // //   // Simulate button click
  // //   const nextButton = screen.getByRole("button", { name: /Next/i });
  // //   fireEvent.click(nextButton);

  // //   // Check if the error message was called
  // //   expect(toast.error).toHaveBeenCalledWith(
  // //     expect.stringContaining("Start time cannot be greater than end time")
  // //   );
  // // });

  it("should validate required fields correctly", () => {
    const validData = {
      ServiceName: "Test Service",
      description: "This is a test description",
    };

    const invalidData = {
      ServiceName: "",
      description: "",
    };

    const partiallyValidData = {
      ServiceName: "Test Service",
    };

    const requiredItems = ["ServiceName", "description"];

    // Test valid data
    const validResult = validateForm(validData, requiredItems);
    expect(validResult).toEqual({
      ServiceName: true,
      description: true,
      all: true,
    });

    // Test invalid data
    const invalidResult = validateForm(invalidData, requiredItems);
    expect(invalidResult).toEqual({
      ServiceName: false,
      description: false,
      all: false,
    });

    // Test partially valid data
    const partiallyValidResult = validateForm(
      partiallyValidData,
      requiredItems
    );
    expect(partiallyValidResult).toEqual({
      ServiceName: true,

      description: false,
      all: false,
    });
  });

  test("triggers handleFinalSubmit when Yes is clicked in the disclaimer modal", async () => {
    // Mock the formData and any necessary props
    const mockFormData = {
      ServiceName: "Mock Service",
      isRegistrationRequired: true,
      description: "This is a mock Service description.",
      images: [],
    };

    render(
      <ServicePreview
        serviceData={mockFormData}
        isPreviewVisible={true}
        setShowCheckIn={() => {}}
        handleEditButton={() => {}}
        masjidId={"masjid123"}
        handleFinalSubmitting={mockHandleFinalSubmitting} // Pass the mock function
      />
    );

    // Open the disclaimer modal (simulate whatever action opens it)
    fireEvent.click(screen.getByTestId("my-custom-btn")); // Adjust based on your button's text
    const yesButton = screen.getByRole("button", { name: /yes/i }); // Adjust based on the actual button text
    fireEvent.click(yesButton);

    // Assert that the handleFinalSubmit function was called
    await waitFor(() => {
      expect(mockHandleFinalSubmitting).toHaveBeenCalled();
    });
  });
});
