import React from "react";
import {
  render,
  screen,
  fireEvent,
  prettyDOM,
  waitFor,
} from "@testing-library/react";
import ClockTimeInput from "../../v1/components/MobileViewComponents/Shared/ClockTimeInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("ClockTimeInput Component", () => {
  const mockSetTime = vi.fn();
  const mockFormDataSetter = vi.fn();

  const renderComponent = (props = {}) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ClockTimeInput
          setTime={mockSetTime}
          id={"azan"}
          tim=""
          label="Select Time"
          {...props}
        />
      </LocalizationProvider>
    );
  };

  beforeEach(() => {
    mockSetTime.mockClear();
    mockFormDataSetter.mockClear();
  });

  test("renders ClockTimeInput component", () => {
    renderComponent();
    expect(screen.getByLabelText("Select Time")).toBeInTheDocument();
  });

  test("displays the initial time correctly", () => {
    renderComponent({ tim: "10:30" });
    expect(screen.getByLabelText("Select Time")).toHaveValue("10:30 AM");
  });
});
