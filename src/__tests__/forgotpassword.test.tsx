import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@mui/material/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ForgotPassword from '../v1/pages/Authpages/ForgotPassword/ForgotPassword';
import { resources } from '../v1/resources/resources';
import { forgotPassword } from '../v1/redux/actions/AuthActions/ForgotPasswordAction';
import { useAppThunkDispatch } from '../v1/redux/hooks';
import indexReducer from '../v1/redux/reducers/IndexReducer';
import Theme from '../v1/components/Theme/Theme';
import { ChangeSnackbar } from '../v1/redux/actions/SnackbarActions/ChangeSnackbarAction';

vi.mock('../v1/redux/actions/AuthActions/ForgotPasswordAction', () => ({
  forgotPassword: vi.fn(),
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

describe('ForgotPassword Component', () => {
  let dispatchMock:any;

  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: true })); 
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui:any) => {
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

  test('renders logo, site name, and email input', async () => {

      renderWithProviders(<ForgotPassword />);

      // Check logo
      const logo = screen.getByAltText('mymasjidicon');
      expect(logo).toBeInTheDocument();

      // Check site name and site end name
      const siteName = screen.getByText(resources['en'].BANER.INPUT_PLACEHOLDER_FIRST_NAME);
      expect(siteName).toBeInTheDocument();

      const siteEndName = screen.getByText(resources['en'].BANER.INPUT_PLACEHOLDER_SECOND_NAME);
      expect(siteEndName).toBeInTheDocument();

      // Check email input and submit button
      const emailInput = screen.getByPlaceholderText(resources['en'].LOGIN.INPUT_PLACEHOLDER_EMAIL);
      expect(emailInput).toBeInTheDocument();

      const submitButton = screen.getByText(resources['en'].FORGOT_PASSWORD.BUTTON_SUBMIT);
      expect(submitButton).toBeInTheDocument();
  });

  test('submits form and dispatches forgotPassword action', async () => {

      renderWithProviders(<ForgotPassword />);

      const emailInput = screen.getByPlaceholderText(resources['en'].LOGIN.INPUT_PLACEHOLDER_EMAIL);
      const submitButton = screen.getByText(resources['en'].FORGOT_PASSWORD.BUTTON_SUBMIT);

      fireEvent.change(emailInput, { target: { value: 'akeelabbas29@gmail.com' } });

      fireEvent.click(submitButton);

      // Ensure forgotPassword is dispatched with correct email
      await waitFor(() => {
        expect(forgotPassword).toHaveBeenCalledWith({ email: 'akeelabbas29@gmail.com' });
      });

      // Ensure handleSnackbar is called with success message
      
      await waitFor(() => {
        expect(ChangeSnackbar).toHaveBeenCalledWith({
          "snackbarMessage": "Email Sent SuccessFully",
          "snackbarOpen": true,
          "snackbarType": "success",
        }
        );
      });
      // Debug the current DOM state
      expect(screen.getByTestId('reset-password-component')).toBeInTheDocument();

  });

  test('shows error message on failed password reset', async () => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: false }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

      renderWithProviders(<ForgotPassword />);

      const emailInput = screen.getByPlaceholderText(resources['en'].LOGIN.INPUT_PLACEHOLDER_EMAIL);
      const submitButton = screen.getByText(resources['en'].FORGOT_PASSWORD.BUTTON_SUBMIT);

      fireEvent.change(emailInput, { target: { value: 'akeelabbas29@gmail.com' } });

      fireEvent.click(submitButton);

      // Ensure forgotPassword is dispatched with correct email
      await waitFor(() => {
        expect(forgotPassword).toHaveBeenCalledWith({ email: 'akeelabbas29@gmail.com' });
      });

      // Ensure handleSnackbar is called with error message
      await waitFor(() => {
        expect(ChangeSnackbar).toHaveBeenCalledWith({
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Failed To Reset Password`,
        }
        );
      });
  });
});
