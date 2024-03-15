// import { GET_TIMINGS_DATE } from "../../actiontype";
import * as API from "../../../ClientApi-Calls/index";
import { ChangeSnackbar } from "../SnackbarActions/ChangeSnackbarAction";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { Dispatch } from "redux";

export const FetchingTimingsByDateRange =
  (startDate: string, endDate: string, masjidId: string) =>
  async (dispatch: Dispatch) => {
    try {
      let response = await API.getTimingByDateRange(
        startDate,
        endDate,
        masjidId
      );
      // console.log(response)

      if (response.data.length > 0) {
        dispatch({ type: "GET_TIMINGS_DATE", payload: response.data });

        return response;
      }

      return response;
    } catch (error: any) {
      handleSnackbar(
        true,
        "error",
        `Fetching Timings Failed: ${error.response.data.message}`,
        dispatch
      );
      return error.response.data;
    }
  };
