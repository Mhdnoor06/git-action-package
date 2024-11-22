import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DonationForm from "../../v1/components/MobileViewComponents/Donation/Form/DonationForm";
import { Mock, vi } from "vitest";
import toast from "react-hot-toast";
import { MockedProvider } from "@apollo/client/testing";

import BoardMemberForm from "../../v1/components/MobileViewComponents/BoardMember/BoardMemberForm/BoardMemberForm";
import ImageUploader from "../../v1/components/MobileViewComponents/Events/Helpers/eventImageUploader/ImageUploader";
import { useMutation } from "@apollo/client";
import { uploadImage } from "../../v1/helpers/imageUpload/imageUpload";

// Mock necessary modules and functions
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

describe("DonationForm Component", () => {
  const mockCreateBoardMember = vi.fn();
  const mockUpdateBoardMember = vi.fn();

  beforeEach(() => {
    (useMutation as Mock).mockReturnValue([
      mockCreateBoardMember, // the mutation function
      { data: undefined, loading: false, error: undefined }, // the mutation state
    ]);
    (useMutation as Mock).mockReturnValue([
      mockUpdateBoardMember, // the mutation function
      { data: undefined, loading: false, error: undefined }, // the mutation state
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the donation form with initial values", () => {
    render(
      <MockedProvider>
        <BoardMemberForm
          // boardMemberData={[]}
          // setIsFormVisible={mockSetIsFormVisible}
          // setIsEditing={mockSetIsEditing}
          // id="some-masjid-id"
          masjidId="some-masjid-id"
          // handleToggleEditForm={handleToggleEditForm}
          // isEditing={false}
        />
      </MockedProvider>
    );

    // Verify that the form title is rendered
    expect(screen.getByText("Add Board Member")).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/about/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
  });

  it("updates form fields on input change", () => {
    render(<BoardMemberForm masjidId="123" />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john.doe@example.com");
  });

  // it("handles image upload", async () => {
  //   const mockFile = new File(["dummy content"], "example.png", {
  //     type: "image/png",
  //   });
  //   const mockUploadImage = vi.fn().mockResolvedValue("image-url");

  //   // Set up the mocked implementation of the uploadImage function
  //   (uploadImage as Mock).mockImplementation(mockUploadImage);

  //   render(<BoardMemberForm masjidId="123" />);

  //   const imageInput = screen.getByLabelText(
  //     "upload image"
  //   ) as HTMLInputElement;

  //   fireEvent.change(imageInput, {
  //     target: { files: [mockFile] },
  //   });

  //   await waitFor(() => {
  //     expect(uploadImage).toHaveBeenCalledWith(mockFile);
  //   });
  // });

  // test("handles image upload correctly", () => {
  //   render(
  //     <MockedProvider>
  //       <BoardMemberForm masjidId="123" />
  //     </MockedProvider>
  //   );

  //   const file = new File(["dummy content"], "example.png", {
  //     type: "image/png",
  //   });
  //   const input = screen.getByLabelText("upload image");
  //   fireEvent.change(input, { target: { files: [file] } });

  //   expect(screen.getByText("example.png")).toBeInTheDocument();
  // });
  it("validates form and shows validation error", async () => {
    render(<BoardMemberForm masjidId="123" />);

    const submitButton = screen.getByRole("button", { name: /Next/i });

    fireEvent.click(submitButton);
    setTimeout(() => {
      expect(screen.getByText("name is Required")).toBeInTheDocument();
    }, 2000);
  });

  it("submits form data using `updateBoardMember` when updating", async () => {
    const existingBoardMember = {
      id: "1",
      name: "Existing Member",
      email: "existing@example.com",
      role: "Treasurer",
    };

    render(
      <MockedProvider mocks={[]}>
        <BoardMemberForm boardMemberData={existingBoardMember} masjidId="123" />
      </MockedProvider>
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const positionInput = screen.getByLabelText(/Role/i);
    const aboutInput = screen.getByLabelText(/About /i);
    const submitButton = screen.getByRole("button", { name: /Next/i });

    fireEvent.change(nameInput, { target: { value: "Updated Member" } });
    fireEvent.change(emailInput, { target: { value: "updated@example.com" } });
    fireEvent.change(positionInput, { target: { value: "Secretary" } });
    fireEvent.change(aboutInput, { target: { value: "about text" } });

    fireEvent.click(submitButton);
    await waitFor(() => {
      // expect(toast.loading).toHaveBeenCalledWith("Please wait...");
      expect(screen.getByText("Board Members Details")).toBeInTheDocument(); // Form should no longer be visible
    });
    setTimeout(() => {
      expect(
        screen.getByText("Submitting your BoardMember...")
      ).toBeInTheDocument();
    },2000);
    
  });

  //   test("submits the form successfully when all fields are filled", async () => {
  //     render(
  //       <MockedProvider mocks={[]}>
  //         <DonationForm
  //           setIsFormVisible={mockSetIsFormVisible}
  //           consumerMasjidId="some-masjid-id"
  //           handleReload={mockHandleReload}
  //           availableDonationTypes={mockAvailableDonationTypes}
  //         />
  //       </MockedProvider>
  //     );

  //     fireEvent.change(screen.getByTestId("donation-purpose-select"), {
  //       target: { value: "Zakat" },
  //     });

  //     fireEvent.change(screen.getByLabelText("Description *"), {
  //       target: { value: "This is a test donation description." },
  //     });

  //     const amountInputs = screen.getAllByRole("textbox");
  //     fireEvent.change(amountInputs[0], {
  //       target: { value: "100.00" },
  //     });

  //     const nextButton = screen.getByText("Next");
  //     fireEvent.click(nextButton);

  //     await waitFor(() => {
  //       expect(toast.loading).toHaveBeenCalledWith("Please wait...");
  //       expect(screen.getByText("Add Donation")).not.toBeInTheDocument(); // Form should no longer be visible
  //     });
  //   });
});
