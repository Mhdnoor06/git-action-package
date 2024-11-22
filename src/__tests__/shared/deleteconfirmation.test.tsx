import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteConfirmation from "../../v1/components/MobileViewComponents/Shared/DeleteConfirmation/DeleteConfirmation";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("DeleteConfirmation", () => {
  const mockSetOpen = vi.fn();
  const mockHandleReject = vi.fn();
  const mockHandleDelete = vi.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      isDeleteDialogOpen: true,
      setDeleteDialogOpen: mockSetOpen,
      isDeleteInProgress: false,
      warningTexts: { main: "Are you sure?", sub: "This action cannot be undone." },
      handleReject: mockHandleReject,
      handleDelete: mockHandleDelete,
      ...props,
    };

    return render(
      <ThemeProvider theme={theme}>
        <DeleteConfirmation {...defaultProps} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("displays the main and sub texts correctly", () => {
    renderComponent();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText("This action cannot be undone.")
    ).toBeInTheDocument();
  });

  it("calls handleReject when the No button is clicked", () => {
    renderComponent();
    const noButton = screen.getByText("No");
    fireEvent.click(noButton);
    expect(mockHandleReject).toHaveBeenCalledTimes(1);
  });

  it("calls handleDelete when the Yes button is clicked", () => {
    renderComponent();
    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });

  it("shows the progress indicator when progress is true", () => {
    renderComponent({ isDeleteInProgress: true });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

});
