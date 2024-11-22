import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../../v1/components/MobileViewComponents/Shared/BackButton";
import '@testing-library/jest-dom';
import { vi } from "vitest";

describe("BackButton Component", () => {
  const mockHandleBackBtn = vi.fn();

  const renderComponent = () => {
    render(<BackButton handleBackBtn={mockHandleBackBtn} />);
  };

  test("renders the BackButton component", () => {
    renderComponent();
    expect(screen.getByTestId("backBtn")).toBeInTheDocument();
  });

  test("calls handleBackBtn function on click", () => {
    renderComponent();
    const backButton = screen.getByTestId("backBtn");
    fireEvent.click(backButton);
    expect(mockHandleBackBtn).toHaveBeenCalled();
  });
});
