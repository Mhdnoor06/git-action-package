import { Dispatch } from "redux";
import * as api from "../../../api-calls/index";
import { UserActionType } from "../../Types";

export const masjidIdSetter =
  (masjidId: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      dispatch({
        type: "MASJID_ID_SETTER",
        payload: { masjids: [masjidId] },
      });

      // Return whatever is relevant for your use case
      return "Masjid ID set successfully";
    } catch (error: any) {
      return null;
    }
  };
