import { Dispatch } from "redux";
import { MASJID_ID_REMOVER } from "../../actiontype";

export const masjidIdRemover =
  () => async (dispatch: Dispatch<{ type: string }>) => {
    try {
      dispatch({
        type: MASJID_ID_REMOVER,
      });
      return "Masjid ID Removed successfully";
    } catch (error: any) {
      return null;
    }
  };
