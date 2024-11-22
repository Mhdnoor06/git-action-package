import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteWarningCard from "../../v1/components/MobileViewComponents/Shared/DeleteWarningCard/DeleteWarningCard";
import { Backdrop, CircularProgress, Box, Grow } from "@mui/material";
import del from "../../v1/photos/Newuiphotos/Icons/delete.svg";

describe("DeleteWarningCard", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      onClose: mockOnClose,
      onConfirm: mockOnConfirm,
      wariningType: "Delete",
      warining: "Are you sure you want to delete this item?",
      icon: del,
      iconsize: "40px",
      progress: false,
      color: "red",
      ...props,
    };

    return render(<DeleteWarningCard {...defaultProps} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this item?")
    ).toBeInTheDocument();
  });

  it("calls onClose when the No button is clicked", () => {
    renderComponent();
    const noButton = screen.getByText("No");
    fireEvent.click(noButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when the Yes button is clicked", () => {
    renderComponent();
    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("shows the progress indicator when progress is true", async () => {
    renderComponent({ progress: true });
    await waitFor(() => {
      expect(screen.getByTestId("progressbar")).toBeInTheDocument();
    });
  });

  it("renders custom icon and size correctly", () => {
    renderComponent();
    const icon = screen.getByAltText("");
    expect(icon).toHaveAttribute("src", del);
    expect(icon).toHaveStyle({ width: "40px" });
  });

  it("applies custom color to Yes button", () => {
    renderComponent();
    const yesButton = screen.getByText("Yes").parentElement;
    expect(yesButton).toHaveStyle({ background: "red" });
  });

  it("renders children components", () => {
    renderComponent({ children: <div>Child Component</div> });
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
