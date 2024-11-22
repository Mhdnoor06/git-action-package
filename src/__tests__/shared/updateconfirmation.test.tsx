import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateConfirmation from "../../v1/components/MobileViewComponents/Shared/UpdateConfirmation/UpdateConfirmation";
import '@testing-library/jest-dom';
import { vi } from "vitest";

describe("UpdateConfirmation Component", () => {
  const mockSetOpen = vi.fn();
  const mockHandleReject = vi.fn();
  const mockHandleConfirm = vi.fn();

  const defaultProps = {
    open: true,
    setOpen: mockSetOpen,
    progress: false,
    texts: { main: "Are you sure you want to update this masjid ?", sub: "Additional info here" },
    handleReject: mockHandleReject,
    handleConfirm: mockHandleConfirm,
  };

  const renderComponent = (props = defaultProps) => {
    render(<UpdateConfirmation {...props} />);
  };

  test("renders the modal when open is true", () => {
    renderComponent();
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  test("displays loading indicator when progress is true", () => {
    renderComponent({ ...defaultProps, progress: true });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders texts correctly", () => {
    renderComponent();
    expect(screen.getByText("Are you sure you want to update this masjid ?")).toBeInTheDocument();
  });

  test("handles reject button click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("No"));
    expect(mockHandleReject).toHaveBeenCalled();
  });

  test("handles confirm button click", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("update-yes"));
    expect(mockHandleConfirm).toHaveBeenCalled();
  });
});