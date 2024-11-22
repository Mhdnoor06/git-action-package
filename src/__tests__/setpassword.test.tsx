import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Setpassword from '../v1/pages/Authpages/ResetPassword/SetPassword/Setpassword';
import { resources } from '../v1/resources/resources';
import { resetPasswordInitial } from '../v1/redux/actions/AuthActions/ResetPasswordInitial';
import { authLogin } from '../v1/redux/actions/AuthActions/LoginAction';
import { ChangeSnackbar } from '../v1/redux/actions/SnackbarActions/ChangeSnackbarAction';
import { useAppThunkDispatch } from '../v1/redux/hooks';
import indexReducer from '../v1/redux/reducers/IndexReducer';
import Theme from '../v1/components/Theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import jwt_decode from 'jwt-decode';

vi.mock('../v1/redux/actions/AuthActions/ResetPasswordInitial', () => ({
  resetPasswordInitial: vi.fn(),
}));

vi.mock('../v1/redux/actions/AuthActions/LoginAction', () => ({
  authLogin: vi.fn(),
}));

vi.mock('../v1/redux/actions/SnackbarActions/ChangeSnackbarAction', () => ({
  ChangeSnackbar: vi.fn(),
}));

vi.mock('jwt-decode', () => ({
  default: vi.fn(() => ({
    email: 'test@example.com',
  })),
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

describe('Setpassword Component', () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: true }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  test('renders initial form', () => {
    renderWithProviders(<Setpassword />);

    expect(screen.getByText('Welcome on board !')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD)).toBeInTheDocument();
  });

  test('toggles password visibility', async () => {
    renderWithProviders(<Setpassword />);

    const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
    const toggleIcon = screen.getByTestId('password-toggle-icon');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleIcon);

    expect(passwordInput).toHaveAttribute('type', 'text');

    const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
    const confirmToggleIcon = screen.getByTestId('confirm-password-toggle-icon');

    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    fireEvent.click(confirmToggleIcon);

    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  test('shows error if passwords do not match', async () => {
    renderWithProviders(<Setpassword />);

    const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
    const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
    const submitButton = screen.getByText('Set password');

    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
    
    fireEvent.click(submitButton);

    act(() => {
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(ChangeSnackbar).toHaveBeenCalledWith({
        snackbarOpen: true,
        snackbarType: 'error',
        snackbarMessage: 'Password and Confirmed Password does not match',
      });
    });
  });

  test('submits form and dispatches resetPasswordInitial action on success', async () => {
    renderWithProviders(<Setpassword />);

    const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
    const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
    const submitButton = screen.getByText('Set password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);
    act(() => {
      vi.runAllTimers();
    });
    await waitFor(() => {
      expect(resetPasswordInitial).toHaveBeenCalledWith({
        password: 'password',
        token: expect.any(String),
      });
      expect(ChangeSnackbar).toHaveBeenCalledWith({
        snackbarOpen: true,
        snackbarType: 'success',
        snackbarMessage: 'Password set successfully',
      });
    });
  });

  test('shows loading spinner when isFetching is true', async () => {
    renderWithProviders(<Setpassword />);

    const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
    const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
    const submitButton = screen.getByText('Set password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  test('logs in user after successful password reset', async () => {
    renderWithProviders(<Setpassword />);

    const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
    const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
    const submitButton = screen.getByText('Set password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);
    act(() => {
        vi.runAllTimers();
    });
    await waitFor(() => {
      expect(authLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      }, expect.any(String));
    });
  });

  test('shows success message after logging in', async () => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: true }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    vi.useRealTimers();
    renderWithProviders(<Setpassword />);

    const passwordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD);
    const confirmPasswordInput = screen.getByPlaceholderText(resources['en'].RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD);
    const submitButton = screen.getByText('Set password');

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    fireEvent.click(submitButton);
    // act(()=>{
    //     vi.useRealTimers();
    // })
    await waitFor(() => {
      expect(ChangeSnackbar).toHaveBeenCalledWith({
        snackbarOpen: true,
        snackbarType: 'success',
        snackbarMessage: 'Logged In Successfully',
      });
    },{ timeout: 3000 });
  });
});
