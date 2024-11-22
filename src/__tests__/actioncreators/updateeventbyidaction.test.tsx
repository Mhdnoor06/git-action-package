import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { UpdateEventById } from '../../v1/redux/actions/EventActions/UpdatingEventAction';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from '../../v1/redux/Types';
import toast from 'react-hot-toast';

vi.mock('../../v1/api-calls/index', () => ({
  updateEvent: vi.fn(),
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

describe('UpdateEventById action creator', () => {
  it('should dispatch the correct actions on successful API call', async () => {
    const formData = { title: 'Updated Event' };
    const masjidId = 'masjid123';
    const eventId = 'event123';

    const mockResponse = {
      data: {
        success: true,
        message: 'Event Updated Successfully',
      },
    };

    (api.updateEvent as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(UpdateEventById(formData, masjidId, eventId));

    expect(api.updateEvent).toHaveBeenCalledWith(formData, masjidId, eventId, 'single');
    expect(toast.dismiss).toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });

  it('should handle API call failure correctly', async () => {
    const formData = { title: 'Updated Event' };
    const masjidId = 'masjid123';
    const eventId = 'event123';

    const mockError = {
      response: {
        data: {
          message: "Failed To Fetch Event : SomeThing Went Wrong",
        },
      },
    };

    (api.updateEvent as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(UpdateEventById(formData, masjidId, eventId));

    expect(api.updateEvent).toHaveBeenCalledWith(formData, masjidId, eventId, 'single');
    expect(toast.dismiss).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Failed To Fetch Event : SomeThing Went Wrong");
    expect(result).toEqual({
      success: false,
      message: "Failed To Fetch Event : SomeThing Went Wrong",
    });
  });
});
