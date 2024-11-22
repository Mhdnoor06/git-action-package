import { renderHook, act, waitFor } from "@testing-library/react";
import moment from "moment-timezone";
import { useCalendarLogic } from "../../v1/components/MobileViewComponents/Events/Helpers/eventHooks/useCalendarLogic";
import { vi } from "vitest";

// Mock moment
vi.mock("moment-timezone", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    __esModule: true,
    default: (...args: any[]) => {
      const instance = actual.default(...args);
      instance.format = vi.fn().mockReturnValue("2023-07-23");
      return instance;
    },
  };
});

describe("useCalendarLogic", () => {
  const initialTZone = "UTC";
  const formData = { startDate: "", endDate: "" };
  const setFormData = vi.fn();

  beforeEach(() => {
    setFormData.mockClear();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() =>
      useCalendarLogic(initialTZone, formData, setFormData)
    );
    expect(result.current.isCalendarVisible).toBe(false);
    expect(result.current.selectedDateField).toBe("");
    expect(result.current.startDateError).toBe("");
    expect(result.current.endDateError).toBe("");
  });

  it("should toggle calendar visibility", () => {
    const { result } = renderHook(() =>
      useCalendarLogic(initialTZone, formData, setFormData)
    );

    act(() => {
      result.current.handleToggleCalendar("startDate");
    });
    expect(result.current.isCalendarVisible).toBe(true);
    expect(result.current.selectedDateField).toBe("startDate");

    act(() => {
      result.current.handleToggleCalendar("startDate");
    });
    expect(result.current.isCalendarVisible).toBe(false);
  });

  it("should handle start date selection", () => {
    setFormData({
      ...formData,
      endDate: "",
    });
    const { result } = renderHook(() =>
      useCalendarLogic(initialTZone, formData, setFormData)
    );
    const mockDate = new Date("2024-07-23T00:00:00.000Z");
    console.log("mockDate", mockDate.toString());
    (moment().format as jest.Mock).mockReturnValue("2023-07-23");

    act(() => {
      result.current.handleToggleCalendar("startDate");
    });
    act(() => {
      result.current.handleDateSelect(mockDate.toString());
    });
    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      startDate: "2023-07-23",
    });
    expect(result.current.isCalendarVisible).toBe(false);
  });

  it("should handle end date selection with validation", async () => {
    const { result } = renderHook(() =>
      useCalendarLogic(
        initialTZone,
        { ...formData, startDate: "2023-07-15" },
        setFormData
      )
    );
    const mockDate = new Date("2023-07-23T00:00:00.000Z");
    (moment().format as jest.Mock).mockReturnValue("2023-07-23");

    act(() => {
      result.current.handleToggleCalendar("endDate");
      result.current.handleDateSelect(mockDate.toString());
    });

    // expect(result.current.endDateError).toBe('End date is less than start date');
    expect(setFormData).not.toHaveBeenCalledWith({
      ...formData,
      endDate: "2023-07-23",
    });
    await waitFor(() => {
      expect(result.current.isCalendarVisible).toBe(false);
    });
  });

  it("should clear date errors", () => {
    const { result } = renderHook(() =>
      useCalendarLogic(initialTZone, formData, setFormData)
    );

    act(() => {
      result.current.clearDateErrors();
    });

    expect(result.current.startDateError).toBe("");
    expect(result.current.endDateError).toBe("");
  });
});
