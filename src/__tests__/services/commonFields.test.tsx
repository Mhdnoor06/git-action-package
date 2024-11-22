import React from "react";




import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import CommonFields from "../../v1/components/MobileViewComponents/Services/CommonFileds/CommonFields";
// Mock the StripeErrorModal and other necessary components
vi.mock("../../Payments/StripeErrorModal/StripeErrorModal", () => ({
  __esModule: true,
  default: ({ isOpen, handleClose }: any) => (
    <div>
      {isOpen && <div data-testid="stripe-error-modal">Stripe Error Modal</div>}
      <button onClick={handleClose}>Close Modal</button>
    </div>
  ),
}));

describe("CommonFields Component", () => {
  const mockHandleChange = vi.fn();
  const mockSetValidationErrors = vi.fn();
  const formData = {
    registrationOption: "free",
    cost: "0",
    registrationRequired: true,
  };
  const admin = { role: "superadmin" };

  const renderComponent = (stripeFields = [true, false]) => {
    render(
      <CommonFields
        formData={formData}
        handleChange={mockHandleChange}
        setValidationErrors={mockSetValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
    );
  };

  it("renders free registration option by default", () => {
    renderComponent();
    const freeOption = screen.getByText(/Free/i);
    expect(freeOption).toBeInTheDocument();
    const paidOption = screen.getByText(/Paid/i);
    expect(paidOption).toBeInTheDocument();
  });

  it("calls handleChange and switches to paid option", () => {
    renderComponent();
    const paidOptionBox = screen.getByText(/Paid/i).closest("div");

    fireEvent.click(paidOptionBox!);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: { name: "registrationOption", value: "paid" },
    });
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: { name: "cost", value: "0" },
    });
  });

  it("opens fee breakdown modal when clicked", async () => {
    renderComponent();
    const paidOptionBox = screen.getByText(/Paid/i).closest("div");

    fireEvent.click(paidOptionBox!);
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: { name: "registrationOption", value: "paid" },
    });
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: { name: "cost", value: "0" },
    });

    const feeBreakdownLink = screen.getByTestId("fee-breakdown");

    fireEvent.click(feeBreakdownLink);

    expect(screen.getByTestId("modal-fee-breakdown")).toBeInTheDocument();
  });

  it("shows the Stripe error modal if payments setup is not complete", async () => {
    renderComponent([false, false]); // Simulating payments setup not complete

    const paidOptionBox = screen.getByText(/Paid/i).closest("div");
    fireEvent.click(paidOptionBox!);

    expect(screen.getByText("Account Not Linked")).toBeInTheDocument();
  });

  it("displays a loading indicator when Stripe is loading", () => {
    renderComponent([true, true]); // Simulating loading state

    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
  });

  it("validates form fields and sets errors for paid registration without cost", () => {
    const invalidFormData = { registrationOption: "paid", cost: "" };

    render(
      <CommonFields
        formData={invalidFormData}
        handleChange={mockHandleChange}
        setValidationErrors={mockSetValidationErrors}
        stripeFields={[true, false]}
        admin={admin}
      />
    );

    expect(mockSetValidationErrors).toHaveBeenCalledWith({
      cost: "Cost is required for paid registration",
    });
  });
});
