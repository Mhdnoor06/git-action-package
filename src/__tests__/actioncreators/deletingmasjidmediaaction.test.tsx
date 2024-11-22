import { describe, it, expect, vi } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { deleteMasjidMedia } from '../../v1/redux/actions/MasjidActions/DeletingMasjidMediaAction';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  deleteMasjidMedia: vi.fn(),
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

describe('deleteMasjidMedia action creator', () => {
  it('should handle successful API call correctly', async () => {
    const mediaId = 'media123';
    const masjidId = 'masjid123';

    const mockResponse = {
      success: true,
      message: 'Masjid media deleted successfully',
    };

    (api.deleteMasjidMedia as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(deleteMasjidMedia(mediaId, masjidId));

    expect(api.deleteMasjidMedia).toHaveBeenCalledWith(mediaId, masjidId);
    expect(result).toEqual(mockResponse);
  });

  it('should handle API call failure correctly', async () => {
    const mediaId = 'media123';
    const masjidId = 'masjid123';

    const mockError = {
      response: {
        data: {
          message: 'Failed to delete masjid media',
        },
      },
    };

    (api.deleteMasjidMedia as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(deleteMasjidMedia(mediaId, masjidId));

    expect(api.deleteMasjidMedia).toHaveBeenCalledWith(mediaId, masjidId);
    expect(result).toEqual({
      success: false,
      message: 'Failed to delete masjid media',
    });
  });

  it('should handle API call failure with a default error message', async () => {
    const mediaId = 'media123';
    const masjidId = 'masjid123';

    const mockError = {
      response: {
        data: {},
      },
    };

    (api.deleteMasjidMedia as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(deleteMasjidMedia(mediaId, masjidId));

    expect(api.deleteMasjidMedia).toHaveBeenCalledWith(mediaId, masjidId);
    expect(result).toEqual({
      success: false,
      message: 'Failed To Delete Masjid Media : SomeThing Went Wrong',
    });
  });
});
