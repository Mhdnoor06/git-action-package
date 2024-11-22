import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { toast } from 'react-hot-toast';
import * as api from '../../v1/api-calls/index';
import { UpdateAllTimingsOfSingleDay } from '../../v1/redux/actions/TimingsActions/UpdateAllTimingsOfSingleDay';
import { Action, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

vi.mock('react-hot-toast', () => ({
  toast: {
    loading: vi.fn(),
    dismiss: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('../../v1/api-calls/index', () => ({
  updateAllTimingsOfSingleDay: vi.fn(),
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

describe('UpdateAllTimingsOfSingleDay action creator', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call toast.loading when the function is invoked', async () => {
    const Data = { /* mock data */ };
    const MasjidId = 'mockMasjidId';
    const TimingsId = 'mockTimingsId';
    
    // const action = 
    // const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    // const result = await Store.dispatch(UpdateAllTimingsOfSingleDay(Data, MasjidId, TimingsId); as any);
    // await action()(mockDispatch);
    // const result = await dispatch(addingSpecialTimings(formData, masjidId) as any);
    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(UpdateAllTimingsOfSingleDay(Data, MasjidId, TimingsId) as any);
    expect(toast.loading).toHaveBeenCalledWith('Please wait...!');
  });

  it('should handle successful update', async () => {
    const Data = { /* mock data */ };
    const MasjidId = 'mockMasjidId';
    const TimingsId = 'mockTimingsId';
    const mockResponse = { data: { success: true, message: 'Successfully updated timing' } };

    (api.updateAllTimingsOfSingleDay as any).mockResolvedValue(mockResponse);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(UpdateAllTimingsOfSingleDay(Data, MasjidId, TimingsId) as any);

    expect(api.updateAllTimingsOfSingleDay).toHaveBeenCalledWith(Data, MasjidId, TimingsId);
    expect(toast.dismiss).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Successfully updated timing');
    expect(result).toEqual(mockResponse.data);
  });

  it('should handle failed update', async () => {
    const Data = { /* mock data */ };
    const MasjidId = 'mockMasjidId';
    const TimingsId = 'mockTimingsId';
    const mockError = { response: { data: { message: 'Failed To updated Timings' } } };

    (api.updateAllTimingsOfSingleDay as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(UpdateAllTimingsOfSingleDay(Data, MasjidId, TimingsId) as any);

    expect(api.updateAllTimingsOfSingleDay).toHaveBeenCalledWith(Data, MasjidId, TimingsId);
    expect(toast.dismiss).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Failed To updated Timings');
    expect(result).toEqual({
      success: false,
      message: 'Failed To updated Timings',
    });
  });

  it('should return default error message if no specific message is provided', async () => {
    const Data = { /* mock data */ };
    const MasjidId = 'mockMasjidId';
    const TimingsId = 'mockTimingsId';
    const mockError = { response: { data: {} } };

    (api.updateAllTimingsOfSingleDay as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(UpdateAllTimingsOfSingleDay(Data, MasjidId, TimingsId) as any);

    expect(api.updateAllTimingsOfSingleDay).toHaveBeenCalledWith(Data, MasjidId, TimingsId);
    expect(toast.dismiss).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Failed To updated Timings:SomeThing Went Wrong');
    expect(result).toEqual({
      success: false,
      message: 'Failed To updated Timings:SomeThing Went Wrong',
    });
  });
});
