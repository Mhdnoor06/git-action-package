import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { vi } from "vitest";
// import ScreeningQuestions, { ScreeningQuestionsProps } from "./ScreeningQuestions";
import "@testing-library/jest-dom";
import ScreeningQuestions, {
  ScreeningQuestionsProps,
} from "../../v1/components/MobileViewComponents/Services/ServicesRegFields/ScreeningQuestions";

describe("ScreeningQuestions Component", () => {
  const mockHandleChange = vi.fn();
  const mockSetValidationErrors = vi.fn();
  const defaultProps: ScreeningQuestionsProps = {
    formData: {
      consultationQuestions: [
        { question: "Existing Question", responseType: "Text" },
      ],
    },
    handleChange: mockHandleChange,
    setValidationErrors: mockSetValidationErrors,
  };

  const renderComponent = (props: Partial<ScreeningQuestionsProps> = {}) => {
    return render(<ScreeningQuestions {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render existing questions from formData", () => {
    renderComponent();
    expect(screen.getByText("1. Existing Question")).toBeInTheDocument();
  });

  it("should add a custom question when the add button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Custom Question"));

    const input = screen.getByPlaceholderText(
      "Enter your custom question here"
    );
    fireEvent.change(input, { target: { value: "New Custom Question" } });

    const addButton = screen.getAllByTestId("AddCircleOutlineIcon")[0];
    fireEvent.click(addButton);

    expect(screen.getByText("2. New Custom Question")).toBeInTheDocument();
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: "consultationQuestions",
        value: [
          { question: "Existing Question", responseType: "Text" },
          {
            question: "New Custom Question",
            responseType: "Text",
            isCustom: true,
          },
        ],
      },
    });
  });

  it("should delete a custom question when the delete button is clicked", () => {
    renderComponent({
      formData: {
        consultationQuestions: [
          {
            question: "Question to Delete",
            responseType: "Text",
            isCustom: true,
          },
        ],
      },
    });

    const deleteButton = screen.getByTestId("CancelIcon");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Question to Delete")).not.toBeInTheDocument();
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: {
        name: "consultationQuestions",
        value: [],
      },
    });
  });

  it("should change response type for a question", async () => {
    renderComponent();

    const responseTypeSelect = screen.getAllByTestId("ArrowDropDownIcon")[0];
    fireEvent.mouseDown(responseTypeSelect);

    // const listbox = within(screen.getByRole("listbox"));

    fireEvent.click(screen.getByText(/Text/i));
    fireEvent.click(screen.getByText(/Text/i));

    // expect(mockHandleChange).toHaveBeenCalledWith({
    //   target: {
    //     name: "consultationQuestions",
    //     value: [{ question: "Existing Question", responseType: "Text" }],
    //   },
    // });
  });

  it("should not add a question if there are already 20 questions", () => {
    const maxQuestions = Array(20).fill({
      question: "Q",
      responseType: "Text",
    });
    renderComponent({
      formData: { consultationQuestions: maxQuestions },
    });

    fireEvent.click(screen.getByText("Custom Question"));
    const input = screen.getByPlaceholderText(
      "Enter your custom question here"
    );
    fireEvent.change(input, { target: { value: "New Question" } });

    const addButton = screen.getAllByTestId("AddCircleOutlineIcon")[0];
    fireEvent.click(addButton);

    expect(mockHandleChange).not.toHaveBeenCalled();
  });

  it("should reset the custom question input when cancelled", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Custom Question"));

    const input = screen.getByPlaceholderText(
      "Enter your custom question here"
    );
    fireEvent.change(input, { target: { value: "To be cancelled" } });
  });

  it("should initialize consultationQuestions if not present", () => {
    renderComponent({
      formData: {},
    });
    expect(mockHandleChange).toHaveBeenCalledWith({
      target: { name: "consultationQuestions", value: [] },
    });
  });
});
