// VerifyingTwoFactorAuthAction.test.ts
import { describe, it, expect, vi } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { VerifyingTwoFactorAuth } from '../../v1/redux/actions/AuthActions/VerifyingTwoFactorAuthAction';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  VerifyingTwoFactorAuth: vi.fn(),
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

describe('VerifyingTwoFactorAuth action creator', () => {
    let originalLocalStorage:any;
    
    beforeEach(()=>{
        originalLocalStorage = { ...global.localStorage };

        global.localStorage.setItem = vi.fn();
        global.localStorage.getItem = vi.fn();
        global.localStorage.removeItem = vi.fn();
        global.localStorage.clear = vi.fn();
    });
    afterEach(()=>{
        global.localStorage = originalLocalStorage;
    });

  it('should handle successful two-factor authentication', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      token: 'valid-2fa-token',
    };
    const mockResponse = {
      status: 200,
      data: {
        token: 'fake-auth-token',
        user: { id: '123', name: 'Test User' },
      },
    };

    (api.VerifyingTwoFactorAuth as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(VerifyingTwoFactorAuth(formData));

    expect(api.VerifyingTwoFactorAuth).toHaveBeenCalledWith(formData);
    
    // expect(localStorage.setItem).toHaveBeenCalledWith("authTokens", JSON.stringify(mockResponse.data.token));
    expect(result).toEqual({
      data: mockResponse.data.user,
      success: true,
      message: 'Logged In Successfully',
    });
  });

  it('should handle two-factor authentication failure', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
      token: 'invalid-2fa-token',
    };
    const mockError = {
      response: {
        data: {
          data: {
            error: 'Invalid token provided',
          },
        },
      },
    };

    (api.VerifyingTwoFactorAuth as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(VerifyingTwoFactorAuth(formData));

    expect(api.VerifyingTwoFactorAuth).toHaveBeenCalledWith(formData);
    expect(result).toEqual({
      success: false,
      TwoFAUser: false,
      error: 'Failed to Login',
      message: 'Invalid token provided',
    });
  });
});
