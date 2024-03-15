import { Dispatch } from "redux";
import * as api from "../../../api-calls/index";
import { CHANGE_SNACKBAR } from "../../actiontype";
type PayloadType = {
  snackbarOpen: boolean;
  snackbarType: string;
  snackbarMessage: string;
};
export type SnackbarAction = {
  type: string;
  payload: PayloadType;
};

export const ChangeSnackbar =
  (snackbarDetails: PayloadType) =>
  async (dispatch: Dispatch<SnackbarAction>) => {
    try {
      dispatch({ type: "CHANGE_SNACKBAR", payload: snackbarDetails });

      return true;
    } catch (error:any) {
      return error.message;
    }
  };
