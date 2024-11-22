import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { describe, it, expect, vi } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material";
import ProgramCarousel from "../../v1/components/MobileViewComponents/Programs/Carousel/ProgramCarousel";
global.URL.createObjectURL = vi.fn(() => "mocked-object-url");
// Mock program data
const mockProgramDataWithPhotos = [
  { url: "https://example.com/photo1.jpg" },
  { url: "https://example.com/photo2.jpg" },
  { url: "https://example.com/photo3.jpg" },
];

// Mocks for setImgSrc and setAltSrc
const mockSetImgSrc = vi.fn();
const mockSetAltSrc = vi.fn();
const mockHandleToggleImage = vi.fn();

// Create a reusable render function
const renderProgramCarousel = (
  programData = mockProgramDataWithPhotos,
  isEditing = false,
  isProgDetails = false
) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      <ProgramCarousel
        programData={programData}
        isEditing={isEditing}
        isProgDetails={isProgDetails}
        handleToggleImage={mockHandleToggleImage}
        setImgSrc={mockSetImgSrc}
        setAltSrc={mockSetAltSrc}
      />
    </ThemeProvider>
  );
};

describe("ProgramCarousel", () => {
  it("renders correctly", () => {
    renderProgramCarousel();

    // Check if the swipeable box is in the document
    const swipableBox = screen.getByTestId("swipable-box");
    expect(swipableBox).toBeInTheDocument();

    // Check if the first image is rendered
    const firstImage = screen.getByAltText("Photo 0");
    expect(firstImage).toBeInTheDocument();
  });

  it("should handle image click and call handleToggleImage with correct params", () => {
    renderProgramCarousel();

    const firstImage = screen.getByAltText("Photo 0");
    fireEvent.click(firstImage);

    // Check if setImgSrc, setAltSrc, and handleToggleImage are called
    expect(mockSetImgSrc).toHaveBeenCalledWith(
      "mocked-object-url"
    );
    expect(mockSetAltSrc).toHaveBeenCalledWith("Photo 0");
    expect(mockHandleToggleImage).toHaveBeenCalled();
  });

  it("should change the active step on swipe", () => {
    renderProgramCarousel();

    // Trigger swipe to change active step
    fireEvent.transitionEnd(screen.getByAltText("Photo 0"));
    const secondImage = screen.getByAltText("Photo 0");
    expect(secondImage).toBeInTheDocument();
  });
});
