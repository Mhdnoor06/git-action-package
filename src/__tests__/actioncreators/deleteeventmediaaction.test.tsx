import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { deleteEventMedia } from '../../v1/redux/actions/EventActions/DeletingEventMediaAction';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from '../../v1/redux/Types';
import { handleSnackbar } from '../../v1/helpers/SnackbarHelper/SnackbarHelper';

vi.mock('../../v1/api-calls/index', () => ({
  deleteMasjidMedia: vi.fn(),
}));

vi.mock("../../v1/helpers/SnackbarHelper/SnackbarHelper", () => ({
  handleSnackbar: vi.fn(),
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

describe('deleteEventMedia action creator', () => {
  it('should dispatch the correct actions on successful API call', async () => {
    const mediaId = 'media123';
    const masjidId = 'masjid456';

    const mockResponse = {
      data: {
        success: true,
        message: 'Deleted Event Image Successfully',
      },
    };

    (api.deleteMasjidMedia as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(deleteEventMedia(mediaId, masjidId));

    expect(api.deleteMasjidMedia).toHaveBeenCalledWith(mediaId, masjidId);
    expect(handleSnackbar).toHaveBeenCalledWith(
      true,
      "success",
      "Deleted Event Image Successfully",
      expect.any(Function)
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('should dispatch the correct actions on failed API call', async () => {
    const mediaId = 'media123';
    const masjidId = 'masjid456';

    const mockError = {
      response: {
        data: {
          success: false,
          message: "Couldn't delete the event Image",
        },
      },
    };

    (api.deleteMasjidMedia as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(deleteEventMedia(mediaId, masjidId));

    expect(api.deleteMasjidMedia).toHaveBeenCalledWith(mediaId, masjidId);
    expect(handleSnackbar).toHaveBeenCalledWith(
      true,
      "error",
      "Couldn't delete the event Image ",
      expect.any(Function)
    );
    expect(result).toEqual(mockError.response.data);
  });
});
