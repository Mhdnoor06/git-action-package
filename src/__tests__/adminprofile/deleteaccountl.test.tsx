import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteAccount from "../../v1/components/MobileViewComponents/AdminProfile/DeleteAccount";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";

vi.mock("../../v1/helpers/HelperFunction", () => ({
  customNavigatorTo: vi.fn(),
}));

describe("DeleteAccount", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the DeleteAccount component correctly", () => {
    render(<DeleteAccount />);
    expect(screen.getByAltText("mymasjidicon")).toBeInTheDocument();
    expect(screen.getByText("Please Check Your Email")).toBeInTheDocument();
    expect(screen.getByText("confirm to delete your account permanently.")).toBeInTheDocument();
  });

  it("navigates to login page on Close button click", () => {
    render(<DeleteAccount />);
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(customNavigatorTo).toHaveBeenCalledWith("/login");
  });

  it("navigates to login page on Close icon click", () => {
    render(<DeleteAccount />);
    const closeIcon = screen.getByTestId("CloseIcon");
    fireEvent.click(closeIcon);
    expect(customNavigatorTo).toHaveBeenCalledWith("/login");
  });
});
