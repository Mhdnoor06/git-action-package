// updatingSpecialTimingsAction.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { updatingSpecialTimings } from '../../v1/redux/actions/SpecialTimingsActions/UpdatingSpecialTimings';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from '../../v1/redux/Types';
import * as API from '../../v1/api-calls/index';
import toast from 'react-hot-toast';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';

vi.mock('../../v1/api-calls/index', () => ({
  updateSpecialTiming: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
    __esModule: true,
    default: {
      error: vi.fn(),
      success: vi.fn(),
      loading:vi.fn(),
      dismiss:vi.fn(),
    },
  }));

const initialState = {};

const Store = configureStore({
  reducer: indexReducer,
});

type RootState = ReturnType<typeof Store.getState>;
type AppDispatch = typeof Store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

let originalLocalStorage: any;

beforeEach(() => {
  originalLocalStorage = { ...global.localStorage };

  global.localStorage.setItem = vi.fn();
  global.localStorage.getItem = vi.fn();
  global.localStorage.removeItem = vi.fn();
  global.localStorage.clear = vi.fn();
});

afterEach(() => {
  global.localStorage = originalLocalStorage;
});

describe('updatingSpecialTimings action creator', () => {
  it('should handle successful API call', async () => {
    const formData = { name: 'Special Timing' };
    const masjidId = '1';
    const timingId = '2';

    const mockResponse = {
      data: {
        message: 'Success',
      },
    };

    (API.updateSpecialTiming as any).mockResolvedValue(mockResponse);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(updatingSpecialTimings(formData, masjidId, timingId) as any);

    expect(API.updateSpecialTiming).toHaveBeenCalledWith(formData, masjidId, timingId);
    expect(toast.loading).toHaveBeenCalledWith('Please wait...!');
    expect(toast.dismiss).toHaveBeenCalled();
    // expect(toast.success).toHaveBeenCalledWith('SpecialTimings Updated Successfully');
    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors correctly on failed API call', async () => {
    const formData = { name: 'Special Timing' };
    const masjidId = '1';
    const timingId = '2';

    const mockError = {
      response: {
        data: {
          data: {
            error: 'Failed to update special timings',
          },
        },
      },
    };

    (API.updateSpecialTiming as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(updatingSpecialTimings(formData, masjidId, timingId) as any);

    const expectedErrorResult = {
      success: false,
      message: 'Failed to update special timings',
    };

    expect(API.updateSpecialTiming).toHaveBeenCalledWith(formData, masjidId, timingId);
    expect(toast.loading).toHaveBeenCalledWith('Please wait...!');
    expect(toast.dismiss).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('Failed to update special timings');
    expect(result).toEqual(expectedErrorResult);
  });
});
