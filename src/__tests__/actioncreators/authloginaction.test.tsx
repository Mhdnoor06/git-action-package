// authLoginAction.test.ts
import { describe, it, expect, vi } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { authLogin } from '../../v1/redux/actions/AuthActions/LoginAction';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  LoginAdmin: vi.fn(),
}));

const initialState = {}

const Store = configureStore({ 
  reducer:indexReducer,
})

type RootState = ReturnType<typeof Store.getState>;
type AppDispatch = typeof Store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

describe('authLogin action creator', () => {
    let originalLocalStorage:any;
    
    beforeEach(()=>{
        originalLocalStorage = { ...global.localStorage };
    
        global.localStorage.setItem = vi.fn();
        global.localStorage.getItem = vi.fn();
        global.localStorage.removeItem = vi.fn();
        global.localStorage.clear = vi.fn();
    })
    afterEach(()=>{
        global.localStorage = originalLocalStorage;
    })
  it('should handle successful login with two-factor authentication', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
    };
    const CaptchaValue = 'captcha';
    const mockResponse = {
      status: 200,
      data: {
        data: {
          isTwoFactorAuthentication: true,
          id: '123',
        },
      },
    };

    (api.LoginAdmin as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(authLogin(formData, CaptchaValue));

    expect(api.LoginAdmin).toHaveBeenCalledWith(formData, CaptchaValue);
    expect(result).toEqual({
      success: true,
      TwoFAUser: true,
      adminId: '123',
    });
  });

  it('should handle successful login without two-factor authentication', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
    };
    const CaptchaValue = 'captcha';
    const mockResponse = {
      status: 200,
      data: {
        data: {
          isTwoFactorAuthentication: false,
          id: '123',
          token: 'test-token',
          user: { id: '123', name: 'Test User' },
        },
      },
    };

    (api.LoginAdmin as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(authLogin(formData, CaptchaValue));

    expect(api.LoginAdmin).toHaveBeenCalledWith(formData, CaptchaValue);
    expect(localStorage.setItem).toHaveBeenCalledWith('authTokens', JSON.stringify('test-token'));
    expect(result).toEqual({
      success: true,
      TwoFAUser: false,
      adminId: '123',
    });
  });

  it('should handle login failure', async () => {
    const formData = {
      email: 'test@example.com',
      password: 'password123',
    };
    const CaptchaValue = 'captcha';
    const mockError = {
      response: {
        data: {
          data: {
            error: 'Invalid credentials',
          },
        },
      },
    };

    (api.LoginAdmin as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(authLogin(formData, CaptchaValue));

    expect(api.LoginAdmin).toHaveBeenCalledWith(formData, CaptchaValue);
    expect(result).toEqual({
      success: false,
      TwoFAUser: false,
      error: 'Failed to Login',
      message: 'Invalid credentials',
    });
  });
});
