import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import Login from "../v1/pages/Authpages/Login/Login";
import { resources } from "../v1/resources/resources";
import { authLogin } from "../v1/redux/actions/AuthActions/LoginAction";
import { VerifyingTwoFactorAuth } from "../v1/redux/actions/AuthActions/VerifyingTwoFactorAuthAction";
import { handleSnackbar } from "../v1/helpers/SnackbarHelper/SnackbarHelper";
import { useAppThunkDispatch } from "../v1/redux/hooks";
import { Provider } from "react-redux";
import Store from "../v1/redux/store";
import indexReducer from "../v1/redux/reducers/IndexReducer";
import { configureStore } from "@reduxjs/toolkit";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import Theme from "../v1/components/Theme/Theme";

// const render= (component:any) => rtlRender(

//     <Provider store={Store}>
//         {component}
//     </Provider>
// )
vi.mock("react-google-recaptcha", () => ({
  default: () => <div data-testid="recaptcha"></div>,
}));

vi.mock("../v1/redux/actions/AuthActions/LoginAction");
vi.mock("../v1/redux/actions/AuthActions/VerifyingTwoFactorAuthAction");
vi.mock("../v1/helpers/SnackbarHelper/SnackbarHelper", () => ({
  handleSnackbar: vi.fn(),
}));
vi.mock("../v1/redux/hooks", () => ({
  useAppThunkDispatch: vi.fn(),
}));

const store = configureStore({
  reducer: indexReducer,
});

describe("Login Component", () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({ success: true, TwoFAUser: false, adminId: "1" })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
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
  test("renders login form", () => {
    renderWithProviders(<Login />);
    expect(
      screen.getByPlaceholderText(resources["en"].LOGIN.INPUT_PLACEHOLDER_EMAIL)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByText(resources["en"].LOGIN.BUTTON_SUBMIT)
    ).toBeInTheDocument();
  });

  test("shows loading spinner when submitting the form", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText(
      resources["en"].LOGIN.INPUT_PLACEHOLDER_EMAIL
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText(resources["en"].LOGIN.BUTTON_SUBMIT);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    expect(await screen.findByRole("progressbar")).toBeInTheDocument();
  });

  test("calls authLogin with correct parameters", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText(
      resources["en"].LOGIN.INPUT_PLACEHOLDER_EMAIL
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText(resources["en"].LOGIN.BUTTON_SUBMIT);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(submitButton);

    expect(dispatchMock).toHaveBeenCalledWith(
      authLogin({ email: "test@example.com", password: "password" }, "")
    );
  });

  test("shows snackbar on successful login", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText(
      resources["en"].LOGIN.INPUT_PLACEHOLDER_EMAIL
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText(resources["en"].LOGIN.BUTTON_SUBMIT);

    fireEvent.change(emailInput, {
      target: { value: "akeelabbas29@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "mirza1234" } });

    fireEvent.click(submitButton);

    // expect(await screen.findByText('Logged In Successfully')).toBeInTheDocument();
    // screen.findByText("Logged In Successfully");
    await waitFor(() => {
      expect(handleSnackbar).toHaveBeenCalledWith(
        true,
        "success",
        "Logged in successfully",
        dispatchMock
      );
    });
  });

  test("shows snackbar on login failure", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({ success: false, message: "Invalid credentials" })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText(
      resources["en"].LOGIN.INPUT_PLACEHOLDER_EMAIL
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText(resources["en"].LOGIN.BUTTON_SUBMIT);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.click(submitButton);

    // screen.findByText("Failed to Login Invalid credentials");
    await waitFor(() => {
      expect(handleSnackbar).toHaveBeenCalledWith(
        true,
        "error",
        "Failed to Login: Invalid credentials",
        dispatchMock
      );
    });
  });
  test("Request a new user link is visible and has correct URL", () => {
    renderWithProviders(<Login />);
    const requestNewUserLink = screen.getByText(
      resources["en"].REQUEST_AS_NEW_USER.BUTTON_REDIRECT
    );
    expect(requestNewUserLink).toBeInTheDocument();
    expect(requestNewUserLink.closest("a")).toHaveAttribute(
      "href",
      "/Request_new_user"
    );
  });

  test("Forgot password link is visible and has correct URL", () => {
    renderWithProviders(<Login />);
    const forgotPasswordLink = screen.getByText(
      resources["en"].LOGIN.BUTTON_REDIRECT
    );
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.closest("a")).toHaveAttribute(
      "href",
      "/forgotpassword"
    );
  });
  test("Logo is visible", () => {
    renderWithProviders(<Login />);
    const logo = screen.getByAltText("mymasjidicon");
    expect(logo).toBeInTheDocument();
  });

  test("Site name is visible", () => {
    renderWithProviders(<Login />);
    const siteName = screen.getByText(
      resources["en"].BANER.INPUT_PLACEHOLDER_FIRST_NAME
    );
    expect(siteName).toBeInTheDocument();
  });

  test("Site end name is visible", () => {
    renderWithProviders(<Login />);
    const siteEndName = screen.getByText(
      resources["en"].BANER.INPUT_PLACEHOLDER_SECOND_NAME
    );
    expect(siteEndName).toBeInTheDocument();
  });
});
