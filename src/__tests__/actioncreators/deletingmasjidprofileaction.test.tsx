import { describe, it, expect, vi } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { deleteMasjidProfile } from '../../v1/redux/actions/MasjidActions/DeletingMasjidProfileAction';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  deleteMasjidProfile: vi.fn(),
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

describe('deleteMasjidProfile action creator', () => {
  it('should handle successful API call correctly', async () => {
    const id = 'masjid123';

    const mockResponse = {
      success: true,
      message: 'Masjid profile deleted successfully',
    };

    (api.deleteMasjidProfile as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(deleteMasjidProfile(id));

    expect(api.deleteMasjidProfile).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockResponse);
  });

  it('should handle API call failure correctly', async () => {
    const id = 'masjid123';

    const mockError = {
      response: {
        data: {
          message: 'Failed to delete masjid profile',
        },
      },
    };

    (api.deleteMasjidProfile as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(deleteMasjidProfile(id));

    expect(api.deleteMasjidProfile).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      success: false,
      message: 'Failed to delete masjid profile',
    });
  });

  it('should handle API call failure with a default error message', async () => {
    const id = 'masjid123';

    const mockError = {
      response: {
        data: {},
      },
    };

    (api.deleteMasjidProfile as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(deleteMasjidProfile(id));

    expect(api.deleteMasjidProfile).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      success: false,
      message: 'Failed To Delete Masjid Profile : SomeThing Went Wrong',
    });
  });
});
