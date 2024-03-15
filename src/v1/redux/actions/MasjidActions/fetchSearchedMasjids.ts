import { Dispatch } from "react";
import * as API from "../../../ClientApi-Calls/index";
export const fetchSearchedMasjids =
  (name_or_address: string) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await API.fetchSearchedMasjids(name_or_address);

      if (response.data.message) {
        dispatch({ type: "FETCH_ADMIN_MASJID", payload: response.data.data });
        return response.data.data;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  };
