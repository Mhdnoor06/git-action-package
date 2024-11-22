import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
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
import { AdminInterFace } from '../v1/redux/Types';
import ProtectedRoute from '../v1/pages/Authpages/ProtectedRoute/ProtectedRoute';
import Login from '../v1/pages/Authpages/Login/Login';

const ProtectedComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login</div>;

const store = configureStore({
  reducer: indexReducer,
});




const renderWithProviders = (ui:any) => {
  return render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={ui} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('renders the protected component if admin is verified', () => {
    const admin: AdminInterFace = {
      isVerified: true,
      autoPrefillingTiming: false,
      email: '',
      masjids: [],
      name: '',
      role: '',
      _id: ''
    };
    localStorage.setItem('admin', JSON.stringify(admin));

    renderWithProviders(
      <ProtectedRoute component={<ProtectedComponent />} />
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to login if admin is not verified', () => {
    const admin: AdminInterFace = {
      isVerified: false,
      autoPrefillingTiming: false,
      email: '',
      masjids: [],
      name: '',
      role: '',
      _id: ''
    };
    localStorage.setItem('admin', JSON.stringify(admin));

    renderWithProviders(
      <ProtectedRoute component={<ProtectedComponent />} />
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(resources['en'].LOGIN.INPUT_PLACEHOLDER_EMAIL)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText(resources['en'].LOGIN.BUTTON_SUBMIT)).toBeInTheDocument();
  });

  test('redirects to login if admin is not present', () => {
    renderWithProviders(
      <ProtectedRoute component={<ProtectedComponent />} />
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(resources['en'].LOGIN.INPUT_PLACEHOLDER_EMAIL)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText(resources['en'].LOGIN.BUTTON_SUBMIT)).toBeInTheDocument();
  });
});