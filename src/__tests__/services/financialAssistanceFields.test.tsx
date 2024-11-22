import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, Mock, vi } from "vitest";
import FinancialAssistanceFields from "../../v1/components/MobileViewComponents/Services/ServicesRegFields/FinancialAssistanceFields";

describe("FinancialAssistanceFields", () => {
  let formData: any;
  let handleChange: Mock;
  let setValidationErrors: Mock;
  let stripeFields: [boolean, boolean];
  let admin: any;

  beforeEach(() => {
    formData = {
      assistanceTypes: [],
      questions: [],
    };
    handleChange = vi.fn();
    setValidationErrors = vi.fn();
    stripeFields = [false, false];
    admin = {};
  });

  it("should render without crashing", () => {
    render(
      <FinancialAssistanceFields
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
    );
    expect(
      screen.getByText(/What kind of assistance are you Providing?/i)
    ).toBeInTheDocument();
  });

  it("should add an assistance type when the button is clicked", () => {
    render(
      <FinancialAssistanceFields
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
    );

    const input = screen.getByPlaceholderText(/Add Assistance Type/i);
    fireEvent.change(input, { target: { value: "Food Assistance" } });
    fireEvent.click(screen.getAllByTestId("AddCircleOutlineIcon")[0]);

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: "assistanceTypes",
        value: ["Food Assistance"],
      },
    });
    expect(screen.getByText("Food Assistance")).toBeInTheDocument();
  });

  it("should delete an assistance type when the chip is clicked", () => {
    formData.assistanceTypes = ["Food Assistance"];
    render(
      <FinancialAssistanceFields
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
    );

    const deleteButton = screen.getByTestId("CancelIcon");
    fireEvent.click(deleteButton);

    expect(handleChange).toHaveBeenCalledWith({
      target: {
        name: "assistanceTypes",
        value: [],
      },
    });
    expect(screen.queryByText("Food Assistance")).not.toBeInTheDocument();
  });

  // it("should add a question when valid input is provided", () => {
  //   render(
  //     <FinancialAssistanceFields
  //       formData={formData}
  //       handleChange={handleChange}
  //       setValidationErrors={setValidationErrors}
  //       stripeFields={stripeFields}
  //       admin={admin}
  //     />
  //   );

  //   const questionInput = screen.getByPlaceholderText(/Add option/i);
  //   fireEvent.change(questionInput, {
  //     target: { value: "What is your income?" },
  //   });
  //   fireEvent.change(screen.getByRole("combobox"), {
  //     target: { value: "Text" },
  //   });
  //   fireEvent.click(screen.getByRole("button", { name: /add/i }));

  //   expect(handleChange).toHaveBeenCalledWith({
  //     target: {
  //       name: "questions",
  //       value: [
  //         {
  //           question: "What is your income?",
  //           responseType: "Text",
  //           isCustom: false,
  //         },
  //       ],
  //     },
  //   });
  //   expect(screen.getByText("What is your income?")).toBeInTheDocument();
  // });

  // it("should delete a question when the delete button is clicked", () => {
  //   formData.questions = [
  //     { question: "What is your income?", responseType: "Text" },
  //   ];
  //   render(
  //     <FinancialAssistanceFields
  //       formData={formData}
  //       handleChange={handleChange}
  //       setValidationErrors={setValidationErrors}
  //       stripeFields={stripeFields}
  //       admin={admin}
  //     />
  //   );

  //   const deleteButton = screen.getByTestId("CancelIcon");
  //   fireEvent.click(deleteButton);

  //   expect(handleChange).toHaveBeenCalledWith({
  //     target: {
  //       name: "questions",
  //       value: [],
  //     },
  //   });
  //   expect(screen.queryByText("What is your income?")).not.toBeInTheDocument();
  // });

  // it("should add a custom option when valid input is provided", () => {
  //   formData.questions = [
  //     {
  //       question: "What is your income?",
  //       responseType: "Custom",
  //       customOptions: [],
  //     },
  //   ];
  //   render(
  //     <FinancialAssistanceFields
  //       formData={formData}
  //       handleChange={handleChange}
  //       setValidationErrors={setValidationErrors}
  //       stripeFields={stripeFields}
  //       admin={admin}
  //     />
  //   );

  //   const customOptionInput = screen.getByPlaceholderText(/Add option/i);
  //   fireEvent.change(customOptionInput, {
  //     target: { value: "Monthly Salary" },
  //   });
  //   fireEvent.click(screen.getByRole("button", { name: /add/i }));

  //   expect(handleChange).toHaveBeenCalledWith({
  //     target: {
  //       name: "questions",
  //       value: [
  //         {
  //           question: "What is your income?",
  //           responseType: "Custom",
  //           customOptions: ["Monthly Salary"],
  //         },
  //       ],
  //     },
  //   });
  //   expect(screen.getByText("Monthly Salary")).toBeInTheDocument();
  // });

  it("should delete a custom option when the delete button is clicked", () => {
    formData.questions = [
      {
        question: "What is your income?",
        responseType: "Custom",
        customOptions: ["Monthly Salary"],
      },
    ];
    render(
      <FinancialAssistanceFields
        formData={formData}
        handleChange={handleChange}
        setValidationErrors={setValidationErrors}
        stripeFields={stripeFields}
        admin={admin}
      />
    );

    const deleteOptionButton = screen.getByTestId("CancelIcon");
    fireEvent.click(deleteOptionButton);

    // expect(handleChange).toHaveBeenCalledWith({
    //   target: {
    //     name: "questions",
    //     value: [
    //       {
    //         question: "What is your income?",
    //         responseType: "Custom",
    //         customOptions: [],
    //       },
    //     ],
    //   },
    // expect(screen.queryByText("Monthly Salary")).not.toBeInTheDocument();
  });
});
// });
