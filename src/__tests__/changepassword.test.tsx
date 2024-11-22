import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ChangePassword from '../v1/pages/Authpages/ChangePassword/ChangePassword';
import { resources } from '../v1/resources/resources';
import { resetPassword } from '../v1/redux/actions/AuthActions/ResetPasswordAction';
import { ChangeSnackbar } from '../v1/redux/actions/SnackbarActions/ChangeSnackbarAction';
import { useAppThunkDispatch } from '../v1/redux/hooks';
import indexReducer from '../v1/redux/reducers/IndexReducer';
import { ThemeProvider } from '@mui/material/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Theme from '../v1/components/Theme/Theme';

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

const renderWithProviders = (ui:any) => {
  return render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            {ui}
          </BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

describe('ChangePassword Component', () => {
  let dispatchMock;

  beforeEach(() => {
    localStorage.clear();
    dispatchMock = vi.fn(() => Promise.resolve({ success: true }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the component and its elements', async () => {

      renderWithProviders(<ChangePassword />);
      
      expect(screen.getByText('Change Password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter OTP')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter new password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
      expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('toggles password visibility', async () => {
      renderWithProviders(<ChangePassword />);

      const passwordInput = screen.getByPlaceholderText('Enter new password');
      const toggleIconShow = screen.getByTestId('toggle-password-visibility-show');
      

      expect(passwordInput).toHaveAttribute('type', 'password');

      fireEvent.click(toggleIconShow);
      expect(passwordInput).toHaveAttribute('type', 'text');
      const toggleIconHide = screen.getByTestId('toggle-password-visibility-hide');

      fireEvent.click(toggleIconHide);
      expect(passwordInput).toHaveAttribute('type', 'password');

  });

  test('shows error if passwords do not match', async () => {
      renderWithProviders(<ChangePassword />);

      const passwordInput = screen.getByPlaceholderText('Enter new password');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
      const submitButton = screen.getByText('Reset');

      fireEvent.change(passwordInput, { target: { value: 'password1' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(ChangeSnackbar).toHaveBeenCalledWith({
          snackbarOpen: true,
          snackbarType: 'error',
          snackbarMessage: 'Password and Confirmed Password does not match',
        });
      });
  });
  

  test('submits form and dispatches resetPassword action on success', async () => {
    
    const admin = { email: 'admin@example.com' };
    localStorage.setItem('admin', JSON.stringify(admin));

      renderWithProviders(<ChangePassword />);

      const passwordInput = screen.getByPlaceholderText('Enter new password');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
      const otpInput = screen.getByPlaceholderText('Enter OTP');
      const submitButton = screen.getByText('Reset');

      fireEvent.change(otpInput, { target: { value: '123456' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(resetPassword).toHaveBeenCalledWith({
          password: 'password',
          token: '123456',
          email: admin.email,
          type: 'otp',
        });
        expect(ChangeSnackbar).toHaveBeenCalledWith({
          snackbarOpen: true,
          snackbarType: 'success',
          snackbarMessage: 'Password Changed',
        });
      });
  });

  test('shows error if password reset fails', async () => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: false }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

    const admin = { email: 'admin@example.com' };
    localStorage.setItem('admin', JSON.stringify(admin));

      renderWithProviders(<ChangePassword />);

      const passwordInput = screen.getByPlaceholderText('Enter new password');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirm password');
      const otpInput = screen.getByPlaceholderText('Enter OTP');
      const submitButton = screen.getByText('Reset');

      fireEvent.change(otpInput, { target: { value: '123456' } });
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(resetPassword).toHaveBeenCalledWith({
          password: 'password',
          token: '123456',
          email: admin.email,
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
