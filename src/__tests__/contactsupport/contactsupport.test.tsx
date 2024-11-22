import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ContactForm from "../../v1/components/MobileViewComponents/ContactForm/ContactForm"; // Adjust the import path as necessary
import { useAppThunkDispatch } from "../../v1/redux/hooks";
import toast from "react-hot-toast";
import { generateVideoThumbnail } from "../../v1/components/MobileViewComponents/ContactForm/helper";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
// Mock the necessary dependencies
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));
vi.mock("../../v1/redux/hooks", () => ({
  useAppThunkDispatch: vi.fn(),
}));
vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));
vi.mock("../../v1/components/MobileViewComponents/ContactForm/helper", () => ({
  generateVideoThumbnail: vi
    .fn()
    .mockResolvedValue("http://mock.url/video-thumbnail.png"), // Mocked thumbnail URL
}));
vi.mock("compressorjs", () => {
  return {
    default: vi.fn().mockImplementation((file, { success }) => {
      // Call the success callback immediately with the original file
      success(file);
    }),
  };
});
const mockDispatch = vi.fn();

beforeEach(() => {
  useAppThunkDispatch.mockReturnValue(mockDispatch);

  URL.createObjectURL = vi.fn().mockReturnValue("http://mock.url/image.png");
  vi.clearAllMocks();
});

describe("ContactForm Component", () => {
  it("renders all fields including reason, message and video input field", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);
    screen.debug();
    await waitFor(() => {
      expect(screen.getByTestId("reason-id")).toBeInTheDocument();
      expect(screen.getByTestId("message-id")).toBeInTheDocument();
      expect(screen.getByTestId("uploaded-input")).toBeInTheDocument();
    });
  });

  it("modifies the fields reason and message", () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const reasonSelect = screen.getByTestId("reason-id");
    const messageInput = screen.getByTestId("message-id");

    screen.debug(reasonSelect);
    screen.debug(messageInput);
    fireEvent.change(reasonSelect, { target: { value: "Feedback" } });
    fireEvent.change(messageInput, { target: { value: "This is a message" } });

    expect(reasonSelect.value).toBe("Feedback");
    expect(messageInput.value).toBe("This is a message");
  });

  it("adds images and videos if they are less than 9 MB", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const file = new File(["test image"], "test-image.jpg", {
      type: "image/jpeg",
      size: 8 * 1024 * 1024,
    });
    const videoFile = new File(["test video"], "test-video.mp4", {
      type: "video/mp4",
      size: 7 * 1024 * 1024,
    });

    fireEvent.change(fileInput, { target: { files: [file, videoFile] } });

    const imageUrl = URL.createObjectURL(file);
    const videoThumbnailUrl = await generateVideoThumbnail(videoFile);
    await waitFor(
      () => {
        expect(screen.getByAltText(imageUrl)).toHaveAttribute("src", imageUrl);
        expect(screen.getByAltText(videoThumbnailUrl)).toHaveAttribute(
          "src",
          videoThumbnailUrl
        );
        // expect(screen.getByRole("img", { name: /test-video/i })).toHaveAttribute(
        //   "src",
        //   videoThumbnailUrl
        // );
      },
      { timeout: 3000 }
    );
  });

  it("rejects images if they are more than 9 MB", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const largeFile = new Blob([new Uint8Array(10 * 1024 * 1024)], {
      type: "image/jpeg",
    });
    const file = new File([largeFile], "test-image.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "File too large after compression: test-image.jpg. Max size is 9 MB."
      );
    });
  });
  it("rejects videos if they are more than 9 MB", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const largeVideoFile = new Blob([new Uint8Array(10 * 1024 * 1024)], {
      type: "video/mp4",
    });
    const videoFile = new File([largeVideoFile], "test-video.mp4", {
      type: "video/mp4",
    });

    fireEvent.change(fileInput, { target: { files: [videoFile] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Video too large: test-video.mp4. Max original size is 9 MB."
      );
    });
  });

  it("shows invalid file error for unsupported file types", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const invalidFile = new File(["invalid file"], "invalid-file.txt", {
      type: "text/plain",
    });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "File type not supported: invalid-file.txt. Please upload only png, jpg, or jpeg images or videos only."
      );
    });
  });

  it("shows loader while images are being uploaded", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const file = new File(["test image"], "test-image.jpg", {
      type: "image/jpeg",
      size: 8 * 1024 * 1024,
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByTestId("my-custom-btn")).toBeDisabled();
    const SubmitButton = screen.getByTestId("my-custom-btn");
    const loader = within(SubmitButton).getByRole("progressbar");
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("my-custom-btn")).not.toBeDisabled();
      expect(loader).not.toBeInTheDocument();
    });
  });

  it("removes images/videos correctly", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const file = new File(["test image"], "test-image.jpg", {
      type: "image/jpeg",
      size: 8 * 1024 * 1024,
    });
    fireEvent.change(fileInput, { target: { files: [file] } });
    const imageUrl = URL.createObjectURL(file);

    await waitFor(() => {
      expect(screen.getByAltText(imageUrl)).toBeInTheDocument();
      expect(screen.getByAltText(imageUrl)).toHaveAttribute("src", imageUrl);
    });
    screen.debug();
    const removeButton = screen.getByRole("button", { name: /×/i });
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByAltText(/test-image.jpg/i)).not.toBeInTheDocument();
    });
  });

  it("calls customNavigatorTo with feed/0 when back button is clicked", () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const backButton = screen.getByTestId("backBtn");
    fireEvent.click(backButton);

    expect(customNavigatorTo).toHaveBeenCalledWith("/feed/0");
  });

  it("submits images and videos properly to the API call", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const file = new File(["test image"], "test-image.jpg", {
      type: "image/jpeg",
      size: 8 * 1024 * 1024,
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const reasonSelect = screen.getByTestId("reason-id");
    const messageInput = screen.getByTestId("message-id");
    fireEvent.change(reasonSelect, { target: { value: "Feedback" } });
    fireEvent.change(messageInput, { target: { value: "This is a message" } });
    const SubmitButton = screen.getByTestId("my-custom-btn");
    const loader = within(SubmitButton).getByRole("progressbar");
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("my-custom-btn")).not.toBeDisabled();
      expect(loader).not.toBeInTheDocument();
    });

    fireEvent.click(SubmitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled(); // Ensure dispatch was called
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); // Assuming it dispatches a thunk
    });
  });
  it("handles compression errors and falls back to the original file", async () => {
    vi.mock("compressorjs", () => {
      return {
        default: vi.fn().mockImplementation((file, { success, error }) => {
          // Simulate an error condition for testing
          if (file.name === "error-file.jpg") {
            error(new Error("Compression failed")); // Call the error callback
          } else {
            success(file); // Call the success callback for other files
          }
        }),
      };
    });
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");

    const errorFile = new Blob([new Uint8Array(10 * 1024 * 1024)], {
      type: "image/jpeg",
    });
    const file = new File([errorFile], "error-file.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });
    // Check if the error handling logic is executed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "File too large after compression: error-file.jpg. Max size is 9 MB."
      );
    });
  });
  it("closes the success modal and resets the form fields after submission", async () => {
    render(<ContactForm consumerMasjidId="test-id" />);

    const fileInput = screen.getByTestId("uploaded-input");
    const file = new File(["test image"], "test-image.jpg", {
      type: "image/jpeg",
      size: 8 * 1024 * 1024,
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const reasonSelect = screen.getByTestId("reason-id");
    const messageInput = screen.getByTestId("message-id");
    fireEvent.change(reasonSelect, { target: { value: "Feedback" } });
    fireEvent.change(messageInput, { target: { value: "This is a message" } });

    const submitButton = screen.getByTestId("my-custom-btn");
    fireEvent.click(submitButton);

    // Wait for the success modal to appear
    await waitFor(() => {
      expect(screen.getByText("Thank You!")).toBeInTheDocument(); // Adjust this based on your success message
      // expect(screen.getByRole("button", { name: /Okay/i })).toBeInTheDocument(); // Adjust this based on your success message
    });

    // Close the success modal

    const closeButton = screen.getByText(/Okay/); // Adjust the name if needed
    fireEvent.click(closeButton);

    // Verify the form fields are reset
    expect(screen.getByTestId("reason-id").value).toBe(""); // Reason select should be reset
    expect(screen.getByTestId("message-id").value).toBe(""); // Message input should be reset
    // await waitFor(() => {
    // expect(screen.getByTestId("uploaded-input").files).toHaveLength(0); // Uploaded files should be cleared
    // });
  });
});
