import { Action, Masjid } from "../../Types";
import { FETCH_ADMIN_MASJID, FETCH_ALL_MASJID } from "../../actiontype";
type initialRecordedMasjid = Record<string, Masjid>;
const initialState: initialRecordedMasjid = {};
const FetchMasjidsByAdminReducer = (
  state = initialState,
  // AdminMasjid: any,
  action: Action
): any => {
  switch (action.type) {
    case FETCH_ADMIN_MASJID:
      return action.payload;
    case FETCH_ALL_MASJID:
      return action.payload;
    default:
      return state;
  }
};

export default FetchMasjidsByAdminReducer;
