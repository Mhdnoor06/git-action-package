// GetSpecialTimingsByMasjidIdAction.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetSpecialTimingsByMasjidId } from '../../v1/redux/actions/SpecialTimingsActions/specialTimingsByMasjidId';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from '../../v1/redux/Types';
import * as API from "../../v1/ClientApi-Calls/index";

vi.mock("../../v1/ClientApi-Calls/index", () => ({
  specialTimingsByMasjidId: vi.fn(),
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

describe('GetSpecialTimingsByMasjidId action creator', () => {
  it('should handle successful API call', async () => {
    const masjidId = '1';

    const mockResponse = {
      data: {
        success: true,
        timings: [
          {
            _id: '1',
            name: 'Special Timing 1',
          },
          {
            _id: '2',
            name: 'Special Timing 2',
          },
        ],
      },
    };

    (API.specialTimingsByMasjidId as any).mockResolvedValue(mockResponse);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(GetSpecialTimingsByMasjidId(masjidId) as any);

    expect(API.specialTimingsByMasjidId).toHaveBeenCalledWith(masjidId);
    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors correctly on failed API call', async () => {
    const masjidId = '1';

    const mockError = {
      message: 'Failed to fetch special timings',
    };

    (API.specialTimingsByMasjidId as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(GetSpecialTimingsByMasjidId(masjidId) as any);

    const expectedErrorResult = {
      success: false,
      message: 'Failed to fetch special timings',
    };

    expect(API.specialTimingsByMasjidId).toHaveBeenCalledWith(masjidId);
    expect(result).toEqual(expectedErrorResult);
  });
});
