import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlusMinusBtn from "../../v1/components/MobileViewComponents/NamazTIming/PlusMinusBtn";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("PlusMinusBtn", () => {
  const mockHandleCountIncrement = vi.fn();
  const mockHandleCountDecrement = vi.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      handleCountIncrement: mockHandleCountIncrement,
      handleCountDecrement: mockHandleCountDecrement,
      count: 0,
      ...props
    };

    return render(
      <ThemeProvider theme={theme}>
        <PlusMinusBtn {...defaultProps} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByText("+ 0 min")).toBeInTheDocument();
  });

  it("displays the correct count", () => {
    renderComponent({ count: 5 });
    expect(screen.getByText("+ 5 min")).toBeInTheDocument();
  });

  it("calls handleCountIncrement when the increment button is clicked", () => {
    renderComponent();
    const incrementButton = screen.getByRole("button", {
      name: /increment-btn/i
    });
    fireEvent.click(incrementButton);
    expect(mockHandleCountIncrement).toHaveBeenCalledTimes(1);
  });

  it("calls handleCountDecrement when the decrement button is clicked", () => {
    renderComponent();
    const decrementButton = screen.getByRole("button", {
      name: /decrement-btn/i
    });
    fireEvent.click(decrementButton);
    expect(mockHandleCountDecrement).toHaveBeenCalledTimes(1);
  });
});
