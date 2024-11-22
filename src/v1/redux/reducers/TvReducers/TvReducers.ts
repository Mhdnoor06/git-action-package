// reducer.ts
import {
  TvState,
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
  RESET_UNPAIRING_STATUS,
  ASSIGN_PERMISSIONS_SUCCESS,
  RESET_ASSIGN_PERMISSIONS_STATE,
} from "../../actiontype";

const initialState: TvState = {
  tvs: [],
  loading: false,
  error: null,
  pairingStatus: { loading: false, success: false },
  unpairingStatus: { loading: false, success: false },
  permissions: [],
};

export const tvReducer = (
  state = initialState,
  action: TvActionTypes
): TvState => {
  switch (action.type) {
    case GET_ALL_TV_REQUEST:
    case PAIRING_TV_REQUEST:
    case UNPAIR_TV_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case RESET_PAIRING_STATE:
      return {
        ...state,

        loading: false,
        pairingStatus: null,
      };
    case GET_ALL_TV_SUCCESS:
      return {
        ...state,
        loading: false,
        tvs: action.payload,
      };
    case PAIRING_TV_SUCCESS:
      return {
        ...state,
        loading: false,
        pairingStatus: action.payload,
      };
    case UNPAIR_TV_SUCCESS:
      return {
        ...state,
        unpairingStatus: {
          ...state.unpairingStatus,
          loading: false,
          success: true,
        },
      };
    case GET_ALL_TV_FAILURE:
    case PAIRING_TV_FAILURE:
    case UNPAIR_TV_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        unpairingStatus: {
          ...state.unpairingStatus,
          loading: false,
          success: false,
        },
      };
    case RESET_UNPAIRING_STATUS:
      return {
        ...state,
        unpairingStatus: { loading: false, success: false },
      };

    case ASSIGN_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        permissions: action.payload,
      };
    case RESET_ASSIGN_PERMISSIONS_STATE:
      return {
        ...state,
        permissions: [],
      };

    default:
      return state;
  }
};
