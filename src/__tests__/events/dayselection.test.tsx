import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DaySelection from "../../v1/components/MobileViewComponents/Events/Helpers/DaySelection/DaySelection";

describe("DaySelection", () => {
  const setDates = vi.fn();
  const setRecurrenceType = vi.fn();
  const initialDates: string[] = [];

  const renderComponent = (dates = initialDates) => {
    render(
      <DaySelection
        setDays={setDates}
        currentDays={dates}
        setRecurrenceType={setRecurrenceType}
      />
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all days of the week", () => {
    renderComponent();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("toggles day selection on checkbox click", () => {
    renderComponent();
    const sunCheckbox = screen.getByLabelText("Sun");
    fireEvent.click(sunCheckbox);
    expect(setDates).toHaveBeenCalledWith(["Sun"]);
    fireEvent.click(sunCheckbox);
    expect(setDates).toHaveBeenCalledWith([]);
  });

  it("updates the selectedDays state correctly", () => {
    renderComponent(["Mon", "Wed"]);
    const monCheckbox = screen.getByLabelText("Mon");
    const wedCheckbox = screen.getByLabelText("Wed");
    expect(monCheckbox).toBeChecked();
    expect(wedCheckbox).toBeChecked();

    fireEvent.click(monCheckbox);
    expect(setDates).toHaveBeenCalledWith(["Wed"]);
  });

  it("sets recurrence type to Daily if all days are selected", () => {
    renderComponent(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]);
    const satCheckbox = screen.getByLabelText("Sat");
    fireEvent.click(satCheckbox);
    expect(setRecurrenceType).toHaveBeenCalledWith("Daily");
  });

  it("does not set recurrence type to Daily if not all days are selected", () => {
    renderComponent(["Sun", "Mon", "Tue", "Wed", "Thu"]);
    const satCheckbox = screen.getByLabelText("Sat");
    fireEvent.click(satCheckbox);
    expect(setRecurrenceType).not.toHaveBeenCalledWith("Daily");
  });
});
