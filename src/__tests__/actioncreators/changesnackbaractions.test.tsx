// ChangeSnackbarAction.test.ts
import { describe, it, expect } from 'vitest';
import { ChangeSnackbar } from '../../v1/redux/actions/SnackbarActions/ChangeSnackbarAction';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import indexReducer from '../../v1/redux/reducers/IndexReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from '../../v1/redux/Types';

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

describe('ChangeSnackbar action creator', () => {
  it('should dispatch the correct action with given payload', async () => {
    const snackbarDetails = {
      snackbarOpen: true,
      snackbarType: 'success',
      snackbarMessage: 'Operation successful',
    };

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(ChangeSnackbar(snackbarDetails));

    const actions = Store.getState().snackBarState;
    
    expect(actions).toEqual(snackbarDetails);
    expect(result).toEqual(true);
  });
});
