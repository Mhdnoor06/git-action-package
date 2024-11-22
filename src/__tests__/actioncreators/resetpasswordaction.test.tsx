// resetPasswordAction.test.ts
import { describe, it, expect, vi } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { resetPassword } from '../../v1/redux/actions/AuthActions/ResetPasswordAction';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  ResetPassword: vi.fn(),
}));

const initialState = {}

const Store = configureStore({ 
  reducer: indexReducer,
});

type RootState = ReturnType<typeof Store.getState>;
type AppDispatch = typeof Store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

describe('resetPassword action creator', () => {
  it('should handle successful password reset', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'newpassword123',
      token: 'valid-token',
    };
    const mockResponse = {
      status: 200,
      data: {
        success: true,
        message: 'Password Reset Successfully',
      },
    };

    (api.ResetPassword as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(resetPassword(formData));

    expect(api.ResetPassword).toHaveBeenCalledWith(formData);
    expect(result).toEqual({
      data: mockResponse.data,
      success: true,
      message: 'Password Reset Successfully',
    });
  });

  it('should handle password reset failure', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'newpassword123',
      token: 'invalid-token',
    };
    const mockError = {
      response: {
        data: {
          message: 'Password Reset Failed : Invalid Token',
        },
      },
    };

    (api.ResetPassword as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(resetPassword(formData));

    expect(api.ResetPassword).toHaveBeenCalledWith(formData);
    expect(result).toEqual({
      success: false,
      error: 'Failed to Login',
      message: 'Password Reset Failed : Invalid Token',
    });
  });
});
