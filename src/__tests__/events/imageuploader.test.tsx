import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageUploader from "../../v1/components/MobileViewComponents/Events/Helpers/eventImageUploader/ImageUploader";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("ImageUploader", () => {
  const mockHandleImageUpload = vi.fn();
  const mockHandleImageDelete = vi.fn();
  const mockHandleDeleteImage = vi.fn();
  const mockSetActiveStep = vi.fn();
  const mockSetWillDelete = vi.fn();
  const mockSetMaxSteps = vi.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      images: [],
      updateEventPhotos: [],
      handleImageUpload: mockHandleImageUpload,
      handleImageDelete: mockHandleImageDelete,
      handleDeleteImage: mockHandleDeleteImage,
      openBar: false,
      activeStep: 0,
      setActiveStep: mockSetActiveStep,
      setWillDelete: mockSetWillDelete,
      setMaxSteps: mockSetMaxSteps,
      ...props,
    };

    return render(
      <ThemeProvider theme={theme}>
        <ImageUploader {...defaultProps} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "mocked-url");
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByAltText("no event")).toBeInTheDocument();
  });

  it("renders images correctly", () => {
    const images = [new File([], "image1.png"), new File([], "image2.png")];
    renderComponent({ images });
    // images.forEach((image, index) => {
    expect(screen.getByAltText(`Photo 0`)).toBeInTheDocument();
    // });
  });

  it("renders update event photos correctly", () => {
    const updateEventPhotos = [
      { url: "photo1.png", _id: "1" },
      { url: "photo2.png", _id: "2" },
    ];
    renderComponent({ updateEventPhotos });
    updateEventPhotos.forEach((photo, index) => {
      expect(screen.getByAltText(`Photo 0`)).toBeInTheDocument();
    });
  });

  it("calls handleImageUpload when add image button is clicked", () => {
    renderComponent();
    // const addButton = screen.getByTestId("add-event");
    // fireEvent.click(addButton);
    const fileInput = screen.getByTestId("fileInput");
    fireEvent.change(fileInput, {
      target: { files: [new File([], "test.png")] },
    });
    expect(mockHandleImageUpload).toHaveBeenCalled();
  });

  it("calls handleImageDelete when delete image button is clicked", () => {
    const images = [new File([], "image1.png")];
    renderComponent({ images });
    const deleteButton = screen.getByTestId("deleteFile");
    fireEvent.click(deleteButton);
    expect(mockHandleImageDelete).toHaveBeenCalledWith(0);
  });

  it("shows progress bar when openBar is true", () => {
    const updateEventPhotos = [
      { url: "photo1.png", _id: "1" },
      { url: "photo2.png", _id: "2" },
    ];

    renderComponent({ openBar: true, updateEventPhotos });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets max steps and active step on initial load", () => {
    const images = [new File([], "image1.png")];
    renderComponent({ images });
    expect(mockSetMaxSteps).toHaveBeenCalledWith(images.length);
    expect(mockSetActiveStep).toHaveBeenCalledWith(0);
  });
});
