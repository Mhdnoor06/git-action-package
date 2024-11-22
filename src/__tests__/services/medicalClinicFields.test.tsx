import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { describe, it, expect, beforeEach, vi } from "vitest";
import MedicalClinicFields from "../../v1/components/MobileViewComponents/Services/ServicesRegFields/MedicalClinicFields";

const mockHandleChange = vi.fn();
const mockSetValidationErrors = vi.fn();
const mockFormData = {
  residentPhysicians: [],
  healthServices: [],
  visitingPhysicians:[],
  timing: {
    time: [],
    customStartEndTime: [],
  },
};

const renderComponent = (props = {}) => {
  render(
    <MedicalClinicFields
      formData={{ ...mockFormData, ...props.formData }}
      handleChange={mockHandleChange}
      setValidationErrors={mockSetValidationErrors}
      stripeFields={[false, false]}
      admin={{}}
    />
  );
};

describe("MedicalClinicFields Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mock function calls before each test
  });

  it("renders the component with initial state", () => {
    renderComponent();

    expect(
      screen.getByText(/Health Service In Medical Clinic/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Resident Physicians/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Add Resident Physician/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g Dr. Ahmed/i)).toBeInTheDocument();
  });

  it("adds a resident physician", () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/Add Resident Physician/i);
    const addButton = screen.getByTestId("AddCircleOutlineIcon");

    fireEvent.change(input, { target: { value: "Dr. Smith" } });
    fireEvent.click(addButton);

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: "residentPhysicians",
          value: ["Dr. Smith"],
        },
      })
    );
  });

  it("deletes a resident physician", () => {
    renderComponent({
      formData: {
        residentPhysicians: ["Dr. Smith"],
      },
    });

    const deleteButton = screen.getByTestId("CancelIcon");

    fireEvent.click(deleteButton);

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: "residentPhysicians",
          value: [],
        },
      })
    );
  });

  //   it("adds a health service", () => {
  //     renderComponent();

  //     const select = screen.getAllByTestId("ArrowDropDownIcon")[1];
  //     fireEvent.mouseDown(select);

  //     // Select a new service from the dropdown by clicking on it
  //     const menuItem = screen.getByText("Primary Care");
  //     fireEvent.click(menuItem);
  //     // fireEvent.change(select, { target: { value: "Primary Care" } });

  //     expect(mockHandleChange).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         target: {
  //           name: "healthServices",
  //           value: ["Primary Care"],
  //         },
  //       })
  //     );
  //   });

  it("deletes a health service", () => {
    renderComponent({
      formData: {
        healthServices: ["Primary Care"],
      },
    });

    const deleteButton = screen.getByTestId("CancelIcon");

    fireEvent.click(deleteButton);

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          name: "healthServices",
          value: [],
        },
      })
    );
  });

//   it("handles time selection", () => {
//     renderComponent();

//     const startTimeInput = screen.getByPlaceholderText(/Start Time/i);
//     const endTimeInput = screen.getByPlaceholderText(/End Time/i);

//     fireEvent.change(startTimeInput, { target: { value: "09:00" } });
//     fireEvent.change(endTimeInput, { target: { value: "17:00" } });

//     expect(mockHandleChange).toHaveBeenCalledTimes(2); // Ensure handleChange is called for both inputs
//   });
});
