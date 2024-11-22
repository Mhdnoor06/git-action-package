// actions.ts
import { Dispatch } from "redux";
import {
  TvActionTypes,
  GET_ALL_TV_REQUEST,
  GET_ALL_TV_SUCCESS,
  GET_ALL_TV_FAILURE,
  PAIRING_TV_REQUEST,
  PAIRING_TV_SUCCESS,
  PAIRING_TV_FAILURE,
  UNPAIR_TV_REQUEST,
  UNPAIR_TV_SUCCESS,
  UNPAIR_TV_FAILURE,
  RESET_PAIRING_STATE,
  ASSIGN_PERMISSIONS_REQUEST,
  ASSIGN_PERMISSIONS_SUCCESS,
  ASSIGN_PERMISSIONS_FAILURE,
} from "../../actiontype";
import {
  getAllTv,
  pairingTv,
  unpair,
  assignPermissions,
} from "../../../ClientApi-Calls/index";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";

export const resetPairingState = () => ({
  type: RESET_PAIRING_STATE,
});

export const fetchAllTv = () => (dispatch: Dispatch<TvActionTypes>) => {
  dispatch({ type: GET_ALL_TV_REQUEST });
  getAllTv()
    .then((response) =>
      dispatch({ type: GET_ALL_TV_SUCCESS, payload: response.data })
    )
    .catch((error) => dispatch({ type: GET_ALL_TV_FAILURE, payload: error }));
};

export const pairTv =
  (pairingCode: string, tvName: string) =>
  (dispatch: Dispatch<TvActionTypes>) => {
    const requestBody = {
      pairingCode: pairingCode,
      name: tvName,
    };

    dispatch({ type: PAIRING_TV_REQUEST });
    return pairingTv(requestBody)
      .then((response) => {
        dispatch({ type: PAIRING_TV_SUCCESS, payload: response.data });
        return response.data;
      })
      .catch((error) => {
        const errorMessage = error.response?.data.message || error.message;
        const errorStatus = error.response?.status;
        dispatch({
          type: PAIRING_TV_FAILURE,
          payload: { message: errorMessage, status: errorStatus },
        });
        throw error;
      });
  };

export const unpairTv =
  (tvId: string) => (dispatch: Dispatch<TvActionTypes>) => {
    dispatch({ type: UNPAIR_TV_REQUEST });
    unpair(tvId)
      .then((response) => {
        dispatch({ type: UNPAIR_TV_SUCCESS, payload: response.data });
        // Assuming handleSnackbar is a separate action creator that accepts serializable data
        handleSnackbar(true, "success", "Unlinked Successfully", dispatch);
      })
      .catch((error) => {
        // Extract serializable error information
        const errorInfo = {
          message: error.response?.data.message || error.message,
          statusCode: error.response?.status,
        };
        dispatch({ type: UNPAIR_TV_FAILURE, payload: errorInfo });
        // Pass only serializable data to handleSnackbar
        handleSnackbar(true, "error", "Failed to unlink", dispatch);
      });
  };

export const assignPermissionsTv =
  (permissionData: { tvId: string; permissions: string[] }) =>
  (dispatch: any) => {
    // dispatch({ type: ASSIGN_PERMISSIONS_REQUEST });

    return assignPermissions(permissionData)
      .then((response) => {
        dispatch({
          type: ASSIGN_PERMISSIONS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ASSIGN_PERMISSIONS_FAILURE,
          payload: error.response?.data.message || error.message,
        });
      });
  };
