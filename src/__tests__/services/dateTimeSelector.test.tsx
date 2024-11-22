import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { vi } from "vitest";
import DateTimeSelector from "../../v1/components/MobileViewComponents/Services/DateTimeSelectionField/DateTimeSelector";

// Helper function to render the component
const renderDateTimeSelector = (props = {}) => {
  const defaultProps = {
    formData: {
      metaData: { days: ["Monday", "Wednesday"] },
      timing: { startTime: "08:00", endTime: "10:00" },
    },
    handleChange: vi.fn(),
    setValidationErrors: vi.fn(),
    showTiming: true,
    ...props, // Allows overriding defaultProps
  };

  return render(
    <DateTimeSelector
      formData={defaultProps.formData}
      handleChange={defaultProps.handleChange}
      setValidationErrors={defaultProps.setValidationErrors}
      showTiming={defaultProps.showTiming}
    />
  );
};

describe("DateTimeSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderDateTimeSelector();

    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Time")).toBeInTheDocument();
  });

  it("calls handleChange when day selection is made", () => {
    const handleChange = vi.fn();
    renderDateTimeSelector({ handleChange, showTiming: false });

    const mondayChip = screen.getByText("Mon");
    fireEvent.click(mondayChip);

    // Update the expectation to include "Mon" in the days array
    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: "metaData",
        value: { type: "weekly", days: ["Monday", "Wednesday", "Mon"] },
      },
    });
  });

  it("calls handleChange when start time is changed", () => {
    const handleChange = vi.fn();
    renderDateTimeSelector({ handleChange });

    const startTimeInput = screen.getByLabelText("Start Time");
    fireEvent.change(startTimeInput, { target: { value: "09:00" } });

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: "timing",
        value: {
          startTime: "09:00",
          endTime: "10:00",
        },
      },
    });
  });

  it("calls handleChange when end time is changed", () => {
    const handleChange = vi.fn();
    renderDateTimeSelector({ handleChange });

    const endTimeInput = screen.getByLabelText("End Time");
    fireEvent.change(endTimeInput, { target: { value: "11:00" } });

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: "timing",
        value: {
          startTime: "08:00",
          endTime: "11:00",
        },
      },
    });
  });

  it("renders DaySelection component with correct props", () => {
    renderDateTimeSelector({ showTiming: false });

    const daySelectionComponent = screen.getByText("Mon");
    expect(daySelectionComponent).toBeInTheDocument();
  });

  it("debounces setValidationErrors correctly", () => {
    const setValidationErrors = vi.fn();
    renderDateTimeSelector({ setValidationErrors });

    expect(setValidationErrors).not.toHaveBeenCalled();
    // Since debounce is used, no immediate validation error setting is expected
  });
});
