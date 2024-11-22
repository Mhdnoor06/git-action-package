import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AdminProfile from '../v1/components/MobileViewComponents/AdminProfile/AdminProfile';
import { fetchAdminDetails } from '../v1/redux/actions/AuthActions/fetchAdminDetails';
import { authLogout } from '../v1/redux/actions/AuthActions/LogoutAction';
import { deleteUserAction } from '../v1/redux/actions/AuthActions/DeleteUserAction';
import { changePassword } from '../v1/redux/actions/AuthActions/ChangePasswordAction';
import indexReducer from '../v1/redux/reducers/IndexReducer';
import { useAppThunkDispatch } from '../v1/redux/hooks';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../v1/components/Theme/Theme';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import toast from 'react-hot-toast';
import swal from 'sweetalert';

vi.mock('../v1/redux/actions/AuthActions/fetchAdminDetails', () => ({
  fetchAdminDetails: vi.fn(),
}));

vi.mock('../v1/redux/actions/AuthActions/LogoutAction', () => ({
  authLogout: vi.fn(),
}));

vi.mock('../v1/redux/actions/AuthActions/DeleteUserAction', () => ({
  deleteUserAction: vi.fn(),
}));

vi.mock('../v1/redux/actions/AuthActions/ChangePasswordAction', () => ({
  changePassword: vi.fn(),
}));

vi.mock('../v1/redux/hooks', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppThunkDispatch: vi.fn(),
  };
});

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('sweetalert', () => ({
  __esModule: true,
  default: vi.fn(),
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

describe('AdminProfile Component', () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ success: true }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
    localStorage.setItem('admin', JSON.stringify({ name: 'Test Admin', email: 'testadmin@gmail.com', role: 'musaliadmin' }));
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('renders initial state correctly', () => {
    renderWithProviders(<AdminProfile />);

    // expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Role :Musali Admin')).toBeInTheDocument();
    expect(screen.getByText('Test Admin')).toBeInTheDocument();
    expect(screen.getByText('testadmin@gmail.com')).toBeInTheDocument();
  });

  test('fetches admin details on mount', async () => {
    renderWithProviders(<AdminProfile />);

    await waitFor(() => {
      expect(fetchAdminDetails).toHaveBeenCalled();
    });
  });

  test('handles logout button click', async () => {
    renderWithProviders(<AdminProfile />);
    const setShowDeleteWarning=vi.fn();
    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);
    const confirmButton=screen.getByText('Yes');
    fireEvent.click(confirmButton);

    // expect(screen.getByTestId("showDeleteWarningAlert")).toBeInTheDocument();
    await waitFor(() => {
        // expect(setShowDeleteWarning).toHaveBeenCalled();
      expect(authLogout).toHaveBeenCalled();
    });
  });

  test('handles delete account button click', async () => {
    renderWithProviders(<AdminProfile />);

    const deleteButton = screen.getByText('Delete Account');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to Delete Your Account Permanently ?')).toBeInTheDocument();
    });

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteUserAction).toHaveBeenCalled();
    });
  });

  test('handles change password button click', async () => {
    renderWithProviders(<AdminProfile />);

    const changePasswordButton = screen.getByText('Change password');
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(screen.getByText('Do you want to change your password ?')).toBeInTheDocument();
    });

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(changePassword).toHaveBeenCalled();
    });
  });

  test('shows delete warning card when attempting to log out or change password', () => {
    renderWithProviders(<AdminProfile />);

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

    expect(screen.getByText('Do you want to Log out ?')).toBeInTheDocument();

    const changePasswordButton = screen.getByText('Change password');
    fireEvent.click(changePasswordButton);

    expect(screen.getByText('Do you want to change your password ?')).toBeInTheDocument();
  });

});
