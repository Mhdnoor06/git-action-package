// deletingSpecialTimingsAction.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { deletingSpecialTimings } from '../../v1/redux/actions/SpecialTimingsActions/DeletingSpecialTimings';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from '../../v1/redux/Types';
import * as API from '../../v1/api-calls/index';

vi.mock('../../v1/api-calls/index', () => ({
  deleteSpecialTiming: vi.fn(),
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

describe('deletingSpecialTimings action creator', () => {
  it('should return success on successful API call', async () => {
    const masjidId = '1';
    const timingId = '2';

    const mockResponse = {
      status: 204,
    };

    (API.deleteSpecialTiming as any).mockResolvedValue(mockResponse);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(deletingSpecialTimings(masjidId, timingId) as any);

    expect(API.deleteSpecialTiming).toHaveBeenCalledWith(masjidId, timingId);
    expect(result).toEqual({ success: true });
  });

  it('should handle errors correctly on failed API call', async () => {
    const masjidId = '1';
    const timingId = '2';

    const mockError = {
      response: {
        data: {
          data: {
            error: 'Failed to delete special timings',
          },
        },
      },
    };

    (API.deleteSpecialTiming as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(deletingSpecialTimings(masjidId, timingId) as any);

    const expectedErrorResult = {
      success: false,
      message: 'Failed to delete special timings',
    };

    expect(API.deleteSpecialTiming).toHaveBeenCalledWith(masjidId, timingId);
    expect(result).toEqual(expectedErrorResult);
  });
});
