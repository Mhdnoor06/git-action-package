import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import RequestUserForm from "../v1/components/MobileViewComponents/RequestForm/RequestUserForm";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { signUpEmail } from "../v1/redux/actions/AuthActions/SignUpFormAction";
import { ChangeSnackbar } from "../v1/redux/actions/SnackbarActions/ChangeSnackbarAction";
import indexReducer from "../v1/redux/reducers/IndexReducer";
import Store from "../v1/redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@mui/material";
import Theme from "../v1/components/Theme/Theme";
import DateFnsUtils from "@date-io/date-fns";
import { vi } from "vitest";
import { useAppThunkDispatch } from "../v1/redux/hooks";
// jest.mock("../../../redux/actions/AuthActions/SignUpFormAction");
// jest.mock("../../../redux/actions/SnackbarActions/ChangeSnackbarAction");

vi.mock("../v1/redux/actions/AuthActions/SignUpFormAction", () => ({
  signUpEmail: vi.fn()
}));

vi.mock("../v1/redux/actions/SnackbarActions/ChangeSnackbarAction", () => ({
  ChangeSnackbar: vi.fn()
}));

vi.mock("../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppThunkDispatch: vi.fn()
  };
});

const store = configureStore({
  reducer: indexReducer
});
const renderWithProviders = (ui: any) => {
  return render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>{ui}</BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

describe("RequestUserForm Component", () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ message: "Success" }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form fields correctly", () => {
    renderWithProviders(<RequestUserForm />);

    expect(screen.getByTestId("whoiam")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Masjid Name*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Masjid Location*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number*")).toBeInTheDocument();
    expect(screen.getByText("Send Request")).toBeInTheDocument();
  });

  it("validates phone number correctly", () => {
    renderWithProviders(<RequestUserForm />);

    const phoneNumberInput = screen.getByPlaceholderText("Phone Number*");
    fireEvent.change(phoneNumberInput, { target: { value: "123" } });
    fireEvent.blur(phoneNumberInput);
    // fireEvent.blur(phoneNumberInput, { target: { value: "123" } });

    expect(
      screen.getByText("Please enter a valid phone number.")
    ).toBeInTheDocument();
  });

  it("validates email correctly", () => {
    renderWithProviders(<RequestUserForm />);

    const emailInput = screen.getByPlaceholderText("Email*");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    // signUpEmail.mockImplementation(() => ({ type: "SIGN_UP_EMAIL" }));
    // ChangeSnackbar.mockImplementation(() => ({ type: "CHANGE_SNACKBAR" }));

    renderWithProviders(<RequestUserForm />);

    fireEvent.change(screen.getByPlaceholderText("Masjid Name*"), {
      target: { value: "Test Masjid" }
    });
    fireEvent.change(screen.getByPlaceholderText("Masjid Location*"), {
      target: { value: "Test Location" }
    });
    fireEvent.change(screen.getByPlaceholderText("Masjid Contact Number"), {
      target: { value: "1234567890" }
    });
    fireEvent.change(screen.getByPlaceholderText("First Name*"), {
      target: { value: "John" }
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name*"), {
      target: { value: "Doe" }
    });
    fireEvent.change(screen.getByPlaceholderText("Email*"), {
      target: { value: "john.doe@example.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number*"), {
      target: { value: "0987654321" }
    });
    fireEvent.click(screen.getByLabelText("Terms & Conditions"));

    fireEvent.click(screen.getByText("Send Request"));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
      expect(ChangeSnackbar).toHaveBeenCalledWith({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: "Form has been submitted successfully"
      });
    });
  });

  it("displays error snackbar on invalid form submission", async () => {
    renderWithProviders(<RequestUserForm />);

    fireEvent.click(screen.getByText("Send Request"));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(
        ChangeSnackbar({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: "Please ensure all fields are valid"
        })
      );
    });
  });
});
