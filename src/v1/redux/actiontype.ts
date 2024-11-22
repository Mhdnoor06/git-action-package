export const MASJID_ID_SETTER = "MASJID_ID_SETTER";
export const MASJID_ID_REMOVER = "MASJID_ID_REMOVER";
export const MASJID_STATE_UNMOUNT = "MASJID_STATE_UNMOUNT";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const CHANGE_SNACKBAR = "CHANGE_SNACKBAR";

export const FETCH_LATEST_UPDATED_EVENTS_BY_ADMIN =
  "FETCH_LATEST_UPDATED_EVENTS_BY_ADMIN";

export const FETCH_LATEST_UPDATED_ANNOUNCEMENTS_BY_ADMIN =
  "FETCH_LATEST_UPDATED_ANNOUNCEMENTS_BY_ADMIN";

export const FETCH_ADMIN_MASJID = "FETCH_ADMIN_MASJID";

export const FETCH_ALL_MASJID = "FETCH_ALL_MASJID";

export const GET_TIMINGS_BY_DATE_RANGE = "GET_TIMINGS_BY_DATE_RANGE";

export const COMPLETE_EVENT_EDITING = "COMPLETE_EVENT_EDITING";

// ActionTypes.ts
export const FETCH_LOCATION = "FETCH_LOCATION";
export const FETCH_NEARBY_MASJIDS = "FETCH_NEARBY_MASJIDS";

//ActionTv

// types.ts
export const GET_ALL_TV_REQUEST = "GET_ALL_TV_REQUEST";
export const GET_ALL_TV_SUCCESS = "GET_ALL_TV_SUCCESS";
export const GET_ALL_TV_FAILURE = "GET_ALL_TV_FAILURE";

export const PAIRING_TV_REQUEST = "PAIRING_TV_REQUEST";
export const PAIRING_TV_SUCCESS = "PAIRING_TV_SUCCESS";
export const PAIRING_TV_FAILURE = "PAIRING_TV_FAILURE";

export const UNPAIR_TV_REQUEST = "UNPAIR_TV_REQUEST";
export const UNPAIR_TV_SUCCESS = "UNPAIR_TV_SUCCESS";
export const UNPAIR_TV_FAILURE = "UNPAIR_TV_FAILURE";

export const RESET_PAIRING_STATE = "RESET_PAIRING_STATE";

export const ASSIGN_PERMISSIONS_REQUEST = "ASSIGN_PERMISSIONS_REQUEST";
export const ASSIGN_PERMISSIONS_SUCCESS = "ASSIGN_PERMISSIONS_SUCCESS";
export const ASSIGN_PERMISSIONS_FAILURE = "ASSIGN_PERMISSIONS_FAILURE";
export const RESET_ASSIGN_PERMISSIONS_STATE = "RESET_ASSIGN_PERMISSIONS_STATE";

export const RESET_UNPAIRING_STATUS = "RESET_UNPAIRING_STATUS";

interface GetAllTvRequestAction {
  type: typeof GET_ALL_TV_REQUEST;
}

interface GetAllTvSuccessAction {
  type: typeof GET_ALL_TV_SUCCESS;
  payload: any; // Adjust the payload type based on your data structure
}

interface GetAllTvFailureAction {
  type: typeof GET_ALL_TV_FAILURE;
  payload: Error;
}

interface PairingTvRequestAction {
  type: typeof PAIRING_TV_REQUEST;
}

interface PairingTvSuccessAction {
  type: typeof PAIRING_TV_SUCCESS;
  payload: any; // Adjust the payload type based on your data structure
}

interface PairingTvFailureAction {
  type: typeof PAIRING_TV_FAILURE;
  payload: any;
}

interface UnpairTvRequestAction {
  type: typeof UNPAIR_TV_REQUEST;
}

interface UnpairTvSuccessAction {
  type: typeof UNPAIR_TV_SUCCESS;
  payload: any; // Adjust the payload type based on your data structure
}

interface UnpairTvFailureAction {
  type: typeof UNPAIR_TV_FAILURE;
  payload: Error;
}

interface ResetPairingStateAction {
  type: typeof RESET_PAIRING_STATE;
}

interface ResetUnpairingStatusAction {
  type: typeof RESET_UNPAIRING_STATUS;
}

interface AssignPermissionsSuccessAction {
  type: typeof ASSIGN_PERMISSIONS_SUCCESS;
  payload: any;
}

interface ResetAssignPermissionsStateAction {
  type: typeof RESET_ASSIGN_PERMISSIONS_STATE;
}

export type TvActionTypes =
  | GetAllTvRequestAction
  | GetAllTvSuccessAction
  | GetAllTvFailureAction
  | PairingTvRequestAction
  | PairingTvSuccessAction
  | PairingTvFailureAction
  | UnpairTvRequestAction
  | UnpairTvSuccessAction
  | UnpairTvFailureAction
  | ResetPairingStateAction
  | ResetUnpairingStatusAction
  | AssignPermissionsSuccessAction
  | ResetAssignPermissionsStateAction;

export interface TvState {
  tvs: any[]; // Adjust the type based on your data structure
  loading: boolean;
  error: Error | null;
  pairingStatus: any; // Adjust the type based on your data structure
  unpairingStatus: any; // Adjust the type based on your data structure
  permissions: any[];
}
