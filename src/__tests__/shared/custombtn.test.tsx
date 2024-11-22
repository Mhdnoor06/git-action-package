import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import CustomBtn from "../../v1/components/MobileViewComponents/Shared/CustomBtn";
import { CircularProgress } from "@mui/material";
import btnImg from "../../v1/photos/clockIcon.png";
import eventImg from "../../v1/photos/eventIcon.png";
import { vi } from "vitest";

describe("CustomBtn Component", () => {
  const mockEventHandler = vi.fn();

  beforeEach(() => {
    mockEventHandler.mockClear();
  });

  test("renders CustomBtn component", () => {
    render(<CustomBtn eventHandler={mockEventHandler} label="Test Button" />);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  test("calls eventHandler on button click", () => {
    render(<CustomBtn eventHandler={mockEventHandler} label="Test Button" />);
    fireEvent.click(screen.getByTestId("my-custom-btn"));
    expect(mockEventHandler).toHaveBeenCalled();
  });

  test("shows loading spinner when isLoading is true", () => {
    render(<CustomBtn eventHandler={mockEventHandler} label="Test Button" isLoading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("button is disabled when isLoading is true", () => {
    render(<CustomBtn eventHandler={mockEventHandler} label="Test Button" isLoading />);
    expect(screen.getByTestId("my-custom-btn")).toBeDisabled();
  });

  test("displays event icon based on label", () => {
    render(<CustomBtn eventHandler={mockEventHandler} label="Add Events" />);
    expect(screen.getByAltText("Button icon").getAttribute("src")).toBe(eventImg);
    cleanup();
    render(<CustomBtn eventHandler={mockEventHandler} label="Show Event" icon={btnImg}/>);
    expect(screen.getByAltText("Button icon").getAttribute("src")).toBe(btnImg);
  });

  test("applies custom styles", () => {
    render(
      <CustomBtn
        eventHandler={mockEventHandler}
        label="Styled Button"
        bgColor="red"
        borderClr="2px solid blue"
        TxColor="yellow"
        size="20vw"
        hightSize="40px"
        width="200px"
      />
    );
    const button = screen.getByTestId("my-custom-btn");
    expect(button).toHaveStyle({ background: "red" });
    expect(button).toHaveStyle({ border: "2px solid blue" });
    expect(button).toHaveStyle({ color: "yellow" });
    expect(button).toHaveStyle({ padding: "0px 20vw 0px 20vw" });
    expect(button).toHaveStyle({ height: "40px" });
    expect(button).toHaveStyle({ width: "200px" });
  });
});
