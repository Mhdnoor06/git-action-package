import { Dispatch } from "redux";
import { MASJID_STATE_UNMOUNT } from "../../actiontype";

export const masjidStateUnmount =
  () => async (dispatch: Dispatch<{ type: string }>) => {
    try {
      dispatch({
        type: MASJID_STATE_UNMOUNT,
      });
      return "Masjid  State Unmounted successfully";
    } catch (error: any) {
      return null;
    }
  };
