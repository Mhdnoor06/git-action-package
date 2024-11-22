import { render, screen, fireEvent } from "@testing-library/react";

import { describe, it, vi } from "vitest";
import ServiceTimingSelector from "../../v1/components/MobileViewComponents/Shared/ServiceTimingSelector/ServiceTimingSelector";

// Reusable render function
const renderServiceTimingSelector = (props = {}) => {
  const defaultProps = {
    selectedServices: ["After Fajr", "After Maghrib"],
    handleDeleteService: vi.fn((service) => () => {}),
    handleServiceChange: vi.fn(),
    formData: {
      timing: {
        time: ["Custom Time"],
        customStartEndTime: ["08:00 AM - 10:00 AM"],
      },
    },
    handleDeleteTimings: vi.fn((service) => () => {}),
    startTime: "08:00",
    endTime: "10:00",
    handleTimeChange: vi.fn(),
    setEndTime: vi.fn(),
  };

  // Combine default and custom props
  return render(<ServiceTimingSelector {...defaultProps} {...props} />);
};

describe("ServiceTimingSelector Component", () => {
  it("renders selected services as chips", () => {
    renderServiceTimingSelector();

    // Check if selected services are displayed as chips
    expect(screen.getByText("After Fajr")).toBeInTheDocument();
    expect(screen.getByText("After Maghrib")).toBeInTheDocument();
  });

  it("calls handleServiceChange when a new service is selected", () => {
    const handleServiceChange = vi.fn();
    renderServiceTimingSelector({ handleServiceChange });

    // Find the Select element (trigger element for the dropdown)
    const selectElement = screen.getByLabelText(/select timing/i);

    // Open the dropdown
    fireEvent.mouseDown(selectElement);

    // Select a new service from the dropdown by clicking on it
    const menuItem = screen.getByText("After Dhuhr");
    fireEvent.click(menuItem);

    // Assert that handleServiceChange was called
    expect(handleServiceChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleDeleteService when a service chip is deleted", () => {
    const handleDeleteService = vi.fn((service) => () => {});
    renderServiceTimingSelector({ handleDeleteService, selectedServices: ["After Fajr"] });
  
    // Find the delete icon using the `data-testid`
    const deleteIcon = screen.getAllByTestId("CancelIcon")[0];
    
    // Simulate the click on the delete icon
    fireEvent.click(deleteIcon);
  
    // Assert that handleDeleteService was called once
    expect(handleDeleteService).toHaveBeenCalledTimes(1);
  });

  it("renders custom timing inputs when 'Custom Time' is selected", () => {
    renderServiceTimingSelector();

    // Check if custom timing input fields are rendered
    expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Time")).toBeInTheDocument();
  });

  it("calls handleTimeChange when start time is changed", () => {
    const handleTimeChange = vi.fn();
    renderServiceTimingSelector({ handleTimeChange });

    const startTimeInput = screen.getByLabelText("Start Time");
    fireEvent.change(startTimeInput, { target: { value: "09:00" } });

    expect(handleTimeChange).toHaveBeenCalledWith(expect.anything(), true);
  });

  it("calls setEndTime when end time is changed", () => {
    const setEndTime = vi.fn();
    renderServiceTimingSelector({ setEndTime });

    const endTimeInput = screen.getByLabelText("End Time");
    fireEvent.change(endTimeInput, { target: { value: "11:00" } });

    expect(setEndTime).toHaveBeenCalledWith("11:00");
  });
});
