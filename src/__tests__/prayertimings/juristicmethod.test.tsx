import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JuristicMethod from "../../v1/components/MobileViewComponents/NamazTIming/JuristicMethod";
import ConfirmationModal from "../../v1/components/MobileViewComponents/NamazTIming/ConfirmationModal";
import CustomBtn from "../../v1/components/MobileViewComponents/Shared/CustomBtn";
import { vi } from "vitest";

vi.mock("../../v1/components/MobileViewComponents/Shared/CustomBtn", () => ({
  __esModule: true,
  default: vi.fn(({ eventHandler, label }) => (
    <button onClick={eventHandler}>{label}</button>
  ))
}));

vi.mock(
  "../../v1/components/MobileViewComponents/NamazTIming/ConfirmationModal",
  () => ({
    __esModule: true,
    default: vi.fn(() => <div data-testid="confirmation-modal" />)
  })
);

// const renderWithProviders = (ui) => {
//   return render(
//     <ToastProvider>{ui}</ToastProvider>
//   );
// };

describe("JuristicMethod Component", () => {
  const setup = (props = {}) => {
    const initialProps = {
      selectedMethod: "Hanafi",
      setSelectedMethod: vi.fn(),
      setModalOpen: vi.fn(),
      ...props
    };
    render(<JuristicMethod {...initialProps} />);
    return {
      ...initialProps
    };
  };

  it("renders correctly with initial selected method", () => {
    setup();
    expect(screen.getByText("Al-Asr Juristic Method")).toBeInTheDocument();
    expect(screen.getByText("Hanafi")).toBeInTheDocument();
  });

  it("changes the selected method when a different method is clicked", () => {
    const { setSelectedMethod } = setup();
    fireEvent.click(screen.getByText("Shafi/Maliki/Hanbali"));
    expect(setSelectedMethod).toHaveBeenCalledWith("Shafi/Maliki/Hanbali");
  });
});
