import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConfirmationModal from "../../v1/components/MobileViewComponents/NamazTIming/ConfirmationModal";
import CustomBtn from "../../v1/components/MobileViewComponents/Shared/CustomBtn";
import { vi } from "vitest";
import toast from "react-hot-toast";

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn()
  }
}));

vi.mock("../Shared/CustomBtn", () => {
  return vi.fn(({ eventHandler, label }) => (
    <button onClick={eventHandler}>{label}</button>
  ));
});

describe("ConfirmationModal Component", () => {
  const setup = (props = {}) => {
    const initialProps = {
      isModalOpen: true,
      juristicMethod: "Hanafi",
      setModalOpen: vi.fn(),
      setParentModalOpen: vi.fn(),
      ...props
    };
    render(<ConfirmationModal {...initialProps} />);
    return {
      ...initialProps
    };
  };

  it("renders correctly when the modal is open", () => {
    setup();
    expect(
      screen.getByText(/Are you sure want to change Al-Asr Juristic Method to/i)
    ).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  it("calls setModalOpen with false when No button is clicked", () => {
    const { setModalOpen } = setup();
    fireEvent.click(screen.getByText("No"));
    expect(setModalOpen).toHaveBeenCalledWith(false);
  });

  it("saves the juristic method and closes modals when Yes button is clicked", async () => {
    const { setModalOpen, setParentModalOpen } = setup();
    fireEvent.click(screen.getByText("Yes"));
    expect(localStorage.getItem("JuristicMethod")).toBe("Hanafi");
    expect(setModalOpen).toHaveBeenCalledWith(false);
    expect(setParentModalOpen).toHaveBeenCalledWith(false);
    expect(toast.success).toHaveBeenCalledWith("Juristic Method has saved");
  });

  it("closes the modal when the onClose function is called", () => {
    const { setModalOpen } = setup();
    fireEvent.click(screen.getByText("No"));
    expect(setModalOpen).toHaveBeenCalledWith(false);
  });
});
