import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteBtn from "../../v1/components/MobileViewComponents/Shared/DeleteBtn";
import del from "../../v1/photos/small-del.png";
import { vi } from "vitest";

describe("DeleteBtn Component", () => {
  const mockBtnHandler = vi.fn();
  const testParam = "testParam";

  beforeEach(() => {
    mockBtnHandler.mockClear();
  });

  test("renders DeleteBtn component", () => {
    render(<DeleteBtn btnHandler={mockBtnHandler} param={testParam} />);
    expect(screen.getByAltText("Prayer icon")).toBeInTheDocument();
  });

  test("calls btnHandler on button click with correct parameter", () => {
    render(<DeleteBtn btnHandler={mockBtnHandler} param={testParam} />);
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(mockBtnHandler).toHaveBeenCalledWith(testParam);
  });

  test("applies custom styles", () => {
    render(<DeleteBtn btnHandler={mockBtnHandler} param={testParam} />);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveStyle({
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "50%",
      backgroundColor: "white",
      fontSize: "10px",
      width: "30px",
      marginLeft: "10px",
      height: "30px",
    });
  });
});
