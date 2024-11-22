import { describe, it, expect, vi } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { updateAdminMasjid } from '../../v1/redux/actions/MasjidActions/UpdatingMasjidByAdmin';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  updateMasjid: vi.fn(),
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

describe('updateAdminMasjid action creator', () => {
  it('should dispatch the correct actions on successful API call', async () => {
    const id = 'masjid123';
    const formData = { name: 'Updated Masjid Name' };

    const mockResponse = {
      success: true,
      data: { id, name: 'Updated Masjid Name' },
    };

    (api.updateMasjid as any).mockResolvedValue({ data: mockResponse });

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(updateAdminMasjid(id, formData));

    expect(api.updateMasjid).toHaveBeenCalledWith(id, formData);
    expect(Store.getState().AdminMasjid).toEqual(mockResponse.data);
    expect(result).toEqual(mockResponse);
  });

  it('should handle API call failure correctly', async () => {
    const id = 'masjid123';
    const formData = { name: 'Updated Masjid Name' };

    const mockError = {
      response: {
        data: {
          message: 'Failed to update masjid',
        },
      },
    };

    (api.updateMasjid as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(updateAdminMasjid(id, formData));

    expect(api.updateMasjid).toHaveBeenCalledWith(id, formData);
    expect(result).toEqual({
      success: false,
      message: 'Failed to update masjid',
    });
  });

  it('should handle API call failure with a default error message', async () => {
    const id = 'masjid123';
    const formData = { name: 'Updated Masjid Name' };

    const mockError = {
      response: {
        data: {},
      },
    };

    (api.updateMasjid as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(updateAdminMasjid(id, formData));

    expect(api.updateMasjid).toHaveBeenCalledWith(id, formData);
    expect(result).toEqual({
      success: false,
      message: 'Failed To Update Masjid : SomeThing Went Wrong',
    });
  });
});
