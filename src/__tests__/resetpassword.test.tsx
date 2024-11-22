import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ResetPassword from '../v1/pages/Authpages/ResetPassword/ResetPassword/ResetPassword';
import { resources } from '../v1/resources/resources';
import { resetPassword } from '../v1/redux/actions/AuthActions/ResetPasswordAction';
import { ChangeSnackbar } from '../v1/redux/actions/SnackbarActions/ChangeSnackbarAction';
import { useAppThunkDispatch } from '../v1/redux/hooks';
import indexReducer from '../v1/redux/reducers/IndexReducer';
import Theme from '../v1/components/Theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Login from '../v1/pages/Authpages/Login/Login';

vi.mock('../v1/redux/actions/AuthActions/ResetPasswordAction', () => ({
  resetPassword: vi.fn(),
}));

vi.mock('../v1/redux/actions/SnackbarActions/ChangeSnackbarAction', () => ({
  ChangeSnackbar: vi.fn(),
}));

vi.mock('../v1/redux/hooks', () => ({
  useAppThunkDispatch: vi.fn(),
}));

const store = configureStore({
  reducer: indexReducer,
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

const renderWithProvidersAndLogin = (ui: any) => {
    return render(
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={Theme}>
            <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                {ui}
            </Routes>
            
            
            </BrowserRouter>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    );
  };
describe('ResetPassword Component', () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: true }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders initial OTP form', async () => {
    renderWithProviders(<ResetPassword email="akeelabbas29@gmail.com" />);

    expect(screen.getByText('Enter Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(resources['en'].FORGOT_PASSWORD.ENTER_CODE)).toBeInTheDocument();
  });

  test('submits OTP and shows password reset form', async () => {
    renderWithProviders(<ResetPassword email="test@example.com" />);

    const otpInput = screen.getByPlaceholderText(resources['en'].FORGOT_PASSWORD.ENTER_CODE);
    const verifyButton = screen.getByText(resources['en'].FORGOT_PASSWORD.VERIFY);

    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(screen.getByText('Reset Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD)).toBeInTheDocument();
    });
  });

  test('shows error if passwords do not match', async () => {
    renderWithProviders(<ResetPassword email="test@example.com" />);

    const otpInput = screen.getByPlaceholderText(resources['en'].FORGOT_PASSWORD.ENTER_CODE);
    const verifyButton = screen.getByText(resources['en'].FORGOT_PASSWORD.VERIFY);

    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
      const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
      const submitButton = screen.getByText(resources['en'].FORGOT_PASSWORD.VERIFY);

      fireEvent.change(passwordInput, { target: { value: 'password1' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(ChangeSnackbar).toHaveBeenCalledWith({
        snackbarOpen: true,
        snackbarType: 'error',
        snackbarMessage: 'Password and Confirmed Password does not match',
      });
    });
  });

  test('submits form and dispatches resetPassword action on success and goes to login page on click of button', async () => {
    renderWithProvidersAndLogin(<Route path="/" element={<ResetPassword email="akeelabbas29@gmail.com" />}></Route>);

    const otpInput = screen.getByPlaceholderText(resources['en'].FORGOT_PASSWORD.ENTER_CODE);
    const verifyButton = screen.getByText(resources['en'].FORGOT_PASSWORD.VERIFY);

    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
      const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
      const submitButton = screen.getByText(resources['en'].FORGOT_PASSWORD.VERIFY);

      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith({
        password: 'password',
        token: '123456',
        email: 'akeelabbas29@gmail.com',
        type: 'otp',
      });
      expect(screen.getByTestId("reset-password-component-success")).toBeInTheDocument;
    });

    expect(screen.getByText("Your password has been reset")).toBeInTheDocument;
    expect(screen.getByText('“Successfully”')).toBeInTheDocument;
    const loginBtn=screen.getByRole("login-btn");
    expect(loginBtn).toBeInTheDocument;
    fireEvent.click(loginBtn);


    
    expect(screen.getByPlaceholderText(resources['en'].LOGIN.INPUT_PLACEHOLDER_EMAIL)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText(resources['en'].LOGIN.BUTTON_SUBMIT)).toBeInTheDocument();

    
  });

  test('shows error if password reset fails', async () => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: false }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

    renderWithProviders(<ResetPassword email="test@example.com" />);

    const otpInput = screen.getByPlaceholderText(resources['en'].FORGOT_PASSWORD.ENTER_CODE);
    const verifyButton = screen.getByText(resources['en'].FORGOT_PASSWORD.VERIFY);

    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(verifyButton);

    await waitFor(() => {
      const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
      const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
      const submitButton = screen.getByText(resources['en'].FORGOT_PASSWORD.VERIFY);

      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith({
        password: 'password',
        token: '123456',
        email: 'test@example.com',
        type: 'otp',
      });
      expect(ChangeSnackbar).toHaveBeenCalledWith({
        snackbarOpen: true,
        snackbarType: 'error',
        snackbarMessage: 'Failed To Setup the Password, check your OTP again',
      });
    });
  });
});
