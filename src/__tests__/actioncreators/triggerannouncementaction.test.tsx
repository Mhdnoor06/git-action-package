// TriggeringAnnouncementAction.test.ts
import { describe, it, expect, vi } from 'vitest';
import * as api from '../../v1/api-calls/index';
import { TriggeringAnnouncement } from '../../v1/redux/actions/AnnouncementActions/TriggeringAnnouncementAction';
import { ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from '../../v1/redux/Types';

vi.mock('../../v1/api-calls/index', () => ({
  triggeringAnnouncement: vi.fn(),
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


describe('TriggeringAnnouncement action creator', () => {
  it('should dispatch the correct actions on successful API call', async () => {
    const formData = {
      title: 'Test Title',
      body: 'Test Body',
      masjidIds: ['1', '2'],
      expiresAt: '2024-12-31',
      priorityType: 'High',
    };

    const mockResponse = {
      status: 200,
      data: {
        success: true,
        message: 'Announcement sent successfully',
      },
    };

    (api.triggeringAnnouncement as any).mockResolvedValue(mockResponse);

    const result = await Store.dispatch(TriggeringAnnouncement(formData));

    expect(api.triggeringAnnouncement).toHaveBeenCalledWith(formData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should return an error message on failed API call', async () => {
    const formData = {
      title: 'Test Title',
      body: 'Test Body',
      masjidIds: ['1', '2'],
      expiresAt: '2024-12-31',
      priorityType: 'High',
    };

    const mockError = {
      response: {
        data: {
          message: 'Failed To Send Notification',
        },
      },
    };

    (api.triggeringAnnouncement as any).mockRejectedValue(mockError);

    const result = await Store.dispatch(TriggeringAnnouncement(formData));

    expect(api.triggeringAnnouncement).toHaveBeenCalledWith(formData);
    expect(result).toEqual({
      success: false,
      message: 'Failed To Send Notification',
    });
  });

  it('should return a default error message if no specific message is provided', async () => {
    const formData = {
      title: 'Test Title',
      body: 'Test Body',
      masjidIds: ['1', '2'],
      expiresAt: '2024-12-31',
      priorityType: 'High',
    };

    const mockError = {
      response: {
        data: {},
      },
    };

    (api.triggeringAnnouncement as any).mockRejectedValue(mockError);

    const result = await Store.dispatch<any>(TriggeringAnnouncement(formData));

    expect(api.triggeringAnnouncement).toHaveBeenCalledWith(formData);
    expect(result).toEqual({
      success: false,
      message: 'Failed To Send Notification:SomeThing Went Wrong',
    });
  });
});
