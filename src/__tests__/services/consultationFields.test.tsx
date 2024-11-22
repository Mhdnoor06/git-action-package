// ConsultationFields.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import ConsultationFields from "../../v1/components/MobileViewComponents/Services/ServicesRegFields/ConsultationFields";
import userEvent from "@testing-library/user-event";

describe("ConsultationFields", () => {
  const mockHandleChange = vi.fn();
  const mockSetValidationErrors = vi.fn();

  const defaultProps = {
    formData: {
      consultants: [],
      timing: { time: [], customStartEndTime: [] },
      consultationType: "",
      sessionTime: "",
    },
    handleChange: mockHandleChange,
    setValidationErrors: mockSetValidationErrors,
    stripeFields: [false, false],
    admin: {},
  };

  beforeEach(() => {
    render(<ConsultationFields {...defaultProps} />);
  });

  test("renders without crashing", () => {
    expect(screen.getByText(/Available Practitioner’s/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add Consultant/i)).toBeInTheDocument();
  });

  test("adds a consultant", () => {
    const consultantInput = screen.getByPlaceholderText(/Add Consultant/i);
    const addButton = screen.getAllByTestId("AddCircleOutlineIcon")[0];

    fireEvent.change(consultantInput, { target: { value: "John Doe" } });
    fireEvent.click(addButton);

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { name: "consultants", value: ["John Doe"] },
      })
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("deletes a consultant", () => {
    const consultantInput = screen.getByPlaceholderText(/Add Consultant/i);
    const addButton = screen.getAllByTestId("AddCircleOutlineIcon")[0];

    fireEvent.change(consultantInput, { target: { value: "Jane Doe" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByTestId("CancelIcon");
    fireEvent.click(deleteButton);

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { name: "consultants", value: [] },
      })
    );
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
  });

  // test("handles service selection changes", () => {
  //   const serviceSelect = screen.getByLabelText(/Consultation Type/i);
  //   fireEvent.mouseDown(serviceSelect);

  //   // Select a new service from the dropdown by clicking on it
  //   const menuItem = screen.getByText("On Call");
  //   fireEvent.click(menuItem);

  //   expect(mockHandleChange).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       target: { name: "consultationType", value: "On Call" },
  //     })
  //   );
  // });

  // test("handles time per session selection changes", async () => {
  //   const sessionTimeSelect = screen.getByLabelText(/Time per session/i);
  //   // fireEvent.mouseDown(sessionTimeSelect);
  //   userEvent.click(sessionTimeSelect);
  //   const menuItem = screen.getByText("30 min/session");
  //   userEvent.click(menuItem);
  //   await  waitFor(() => {
  //     expect(mockHandleChange).toHaveBeenCalledWith(1);
  //   });
  // });

  // test("handles start and end time changes", async () => {
  //   const sessionTimeSelect = screen.getByLabelText(/Select Timing/i);
  //   // fireEvent.mouseDown(sessionTimeSelect);
  //   userEvent.click(sessionTimeSelect);
  //   const menuItem = screen.getByText("Custom Time");
  //   userEvent.click(menuItem);
  //   await  waitFor(() => {
  //     // const startTimeInput = screen.getByLabelText(/start time/i); // Update to the actual label used in DateTimeSelector
  //     const endTimeInput = screen.getByLabelText(/end time/i); // Update to the actual label used in DateTimeSelector

  //     // fireEvent.change(startTimeInput, { target: { value: "09:00 AM" } });
  //     fireEvent.change(endTimeInput, { target: { value: "10:00 AM" } });
  //     expect(mockHandleChange).toHaveBeenCalled(); // Additional assertions based on your logic
  //   });
  //   // Assuming handleTimeChange is called with the proper arguments

  //   // Verify if handleChange is called properly
  // });
});
