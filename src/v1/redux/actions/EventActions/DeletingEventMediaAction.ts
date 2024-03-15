import { Dispatch } from "redux";
import * as api from "../../../api-calls/index";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
// import {ChangeSnackbar} from '../../../Redux/Actions/SnackbarActions/SnackbarActions.js'

export const deleteEventMedia =
  (mediaId: string, masjidId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.deleteMasjidMedia(mediaId, masjidId);

      if (data.success) {
        handleSnackbar(
          true,
          "success",
          "Deleted Event Image Successfully",
          dispatch
        );

        return data;
      }

      return data;
    } catch (error: any) {
      handleSnackbar(
        true,
        "error",
        "Couldn't delete the event Image ",
        dispatch
      );

      return error.response.data;
    }
  };
