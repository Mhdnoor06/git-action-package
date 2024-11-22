import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import toast from "react-hot-toast";
import { MockedProvider } from "@apollo/client/testing";

import ImageUploader from "../../v1/components/MobileViewComponents/Events/Helpers/eventImageUploader/ImageUploader";
import { useMutation } from "@apollo/client";
import ProgramForm from "../../v1/components/MobileViewComponents/Programs/Main/ProgramForm/ProgramForm";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import moment from "moment";
import { validateForm } from "../../v1/helpers/HelperFunction";
import ProgramView from "../../v1/components/MobileViewComponents/Programs/Main/ProgramForm/ProgramView";
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

// vi.mock("moment", async () => {
//   const actualMoment = await vi.importActual<typeof moment>("moment");
//   return {
//     default: actualMoment, // Return moment as the default export
//   };
// });

describe("Program Form Component", () => {
  const mockCreateProgram = vi.fn();
  const mockUpdateProgram = vi.fn();
  const setup = (formDataOverrides = {}) => {
    const formData = {
      startTime: "10:00",
      endTime: "11:00",
      startDate: "2024-10-01",
      endDate: "2024-10-01",
      programName: "programName",
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
          <ProgramForm
            detailsFormData={formData}
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
      mockCreateProgram, // the mutation function
      { data: undefined, loading: false, error: undefined }, // the mutation state
    ]);
    (useMutation as Mock).mockReturnValue([
      mockUpdateProgram, // the mutation function
      { data: undefined, loading: false, error: undefined }, // the mutation state
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  const initialComponent = (majsidId = "some-masjid-id") => (
    <Provider store={Store}>
      <MockedProvider>
        <ProgramForm masjidId={majsidId} />
      </MockedProvider>
    </Provider>
  );
  test("renders the Program form with initial values", () => {
    render(initialComponent());

    // Verify that the form title is rendered
    expect(screen.getByText("Create an Program")).toBeInTheDocument();
    expect(screen.getByLabelText(/Program Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Time/i)).toBeInTheDocument();
  });

  it("updates form fields on input change", () => {
    render(initialComponent("123"));

    const nameInput = screen.getByLabelText(/Program Name/i);
    const capacityInput = screen.getByLabelText(/Capacity/i);
    const startTimInput = screen.getByLabelText(/Start Time/i);
    const endInput = screen.getByLabelText(/End Time/i);
    const endDteInput = screen.getByLabelText(/End Date/i);
    const startDateInput = screen.getByLabelText(/Start Date/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(capacityInput, { target: { value: 50 } });
    fireEvent.change(startDateInput, { target: { value: "10-Oct-2024" } });
    fireEvent.change(endDteInput, { target: { value: "11-Oct-2024" } });
    fireEvent.change(startTimInput, { target: { value: "02:09" } });
    fireEvent.change(endInput, { target: { value: "03:09 AM" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(capacityInput).toHaveValue(50);
    // expect(startDateInput).toHaveValue("9-Oct-2024");
    const categorySelect = screen.getByTestId("category"); // Adjust if necessary
    fireEvent.mouseDown(categorySelect); // Open the dropdown

    // Select a category from the menu
    const categoryOption = screen.getByText("Quran Programs"); // Adjust to the desired category
    fireEvent.click(categoryOption); // Select the option
    expect(screen.getByLabelText(/Quran Programs/i)).toBeInTheDocument();
    // Check if the selected value is reflected in the formData

    // expect(endDteInput).toHaveValue("11-Oct-2024");
    // expect(startTimInput).toHaveValue("02:09 AM");
    // expect(endInput).toHaveValue("03:09 AM");
  });

  it("validates form and shows validation error", () => {
    setup({
      startTime: "12:00",
      endTime: "10:00", // Invalid times
    });

    // Simulate button click
    const nextButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextButton);

    // Check if the error message was called
    expect(toast.error).toHaveBeenCalledWith(
      expect.stringContaining("programName is Required")
    );
  });
  it("should show error when start time is greater than end time on the same date", () => {
    setup({
      startTime: "12:00",
      endTime: "10:00", // Invalid times
    });
    const nameInput = screen.getByLabelText(/Program Name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe");
    const categorySelect = screen.getByTestId("category"); // Adjust if necessary
    fireEvent.mouseDown(categorySelect); // Open the dropdown

    // Select a category from the menu
    const categoryOption = screen.getByText("Quran Programs"); // Adjust to the desired category
    fireEvent.click(categoryOption); // Select the option
    expect(screen.getByLabelText(/Quran Programs/i)).toBeInTheDocument();
    // Simulate button click
    const nextButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(nextButton);

    // Check if the error message was called
    expect(toast.error).toHaveBeenCalledWith(" startTime is Required");
  });

  it("should validate required fields correctly", () => {
    const validData = {
      programName: "Test Program",
      programCategory: "Category 1",
      startTime: "10:00",
      endTime: "12:00",
      capacity: 100,
      description: "This is a test description",
    };

    const invalidData = {
      programName: "",
      programCategory: "",
      startTime: "",
      endTime: "",
      capacity: null,
      description: "",
    };

    const partiallyValidData = {
      programName: "Test Program",
      startTime: "10:00",
      endTime: "12:00",
      capacity: 100,
    };

    const requiredItems = [
      "programName",
      "programCategory",
      "startTime",
      "endTime",
      "capacity",
      "description",
    ];

    // Test valid data
    const validResult = validateForm(validData, requiredItems);
    expect(validResult).toEqual({
      programName: true,
      programCategory: true,
      startTime: true,
      endTime: true,
      capacity: true,
      description: true,
      all: true,
    });

    // Test invalid data
    const invalidResult = validateForm(invalidData, requiredItems);
    expect(invalidResult).toEqual({
      programName: false,
      programCategory: false,
      startTime: false,
      endTime: false,
      capacity: false,
      description: false,
      all: false,
    });

    // Test partially valid data
    const partiallyValidResult = validateForm(
      partiallyValidData,
      requiredItems
    );
    expect(partiallyValidResult).toEqual({
      programName: true,
      programCategory: false,
      startTime: true,
      endTime: true,
      capacity: true,
      description: false,
      all: false,
    });
  });

  it("should handle array values and valid primitive values", () => {
    const dataWithEmptyArray = {
      programName: "Test Program",
      programCategory: "Category 1",
      startTime: "10:00",
      endTime: "12:00",
      capacity: [],
      description: "Test",
    };

    const validPrimitiveData = {
      programName: "Program",
      programCategory: "Category",
      startTime: "08:00",
      endTime: "10:00",
      capacity: "50",
      description: "Some description",
    };

    const requiredItems = [
      "programName",
      "programCategory",
      "startTime",
      "endTime",
      "capacity",
      "description",
    ];

    // Test data with empty array
    const arrayResult = validateForm(dataWithEmptyArray, requiredItems);
    expect(arrayResult).toEqual({
      programName: true,
      programCategory: true,
      startTime: true,
      endTime: true,
      capacity: false, // since it's an empty array
      description: true,
      all: false,
    });

    // Test valid primitive values
    const primitiveResult = validateForm(validPrimitiveData, requiredItems);
    expect(primitiveResult).toEqual({
      programName: true,
      programCategory: true,
      startTime: true,
      endTime: true,
      capacity: true,
      description: true,
      all: true,
    });
  });
  test("triggers handleFinalSubmit when Yes is clicked in the disclaimer modal", async () => {
    // Mock the formData and any necessary props
    const mockFormData = {
      programName: "Mock Program",
      programCategory: "Education",
      isRegistrationRequired: true,
      startTime: "10:00",
      startDate: "2023-10-01",
      endTime: "12:00",
      endDate: "2023-10-01",
      address: "123 Test Street",
      ageOption: "range",
      startRange: 10,
      endRange: 50,
      capacity: 100,
      cost: 20,
      description: "This is a mock program description.",
      active: true,
      images: [],
    };

    render(
      <Provider store={Store}>
        <ProgramView
          formData={mockFormData}
          isPreviewMode={true}
          setShowCheckIn={() => {}}
          handleEditButton={() => {}}
          masjidId={"masjid123"}
          handleDisclaimerStatus={mockHandleFinalSubmitting} // Pass the mock function
        />
      </Provider>
    );

    // Open the disclaimer modal (simulate whatever action opens it)
    fireEvent.click(screen.getByText(/confirm & add program/i)); // Adjust based on your button's text
    const yesButton = screen.getByRole("button", { name: /yes/i }); // Adjust based on the actual button text
    fireEvent.click(yesButton);

    // Assert that the handleFinalSubmit function was called
    await waitFor(() => {
      expect(mockHandleFinalSubmitting).toHaveBeenCalled();
    });
  });
});
