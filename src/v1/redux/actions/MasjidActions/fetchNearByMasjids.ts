import { Dispatch } from "react";
import * as API from "../../../ClientApi-Calls/index";
export const fetchNearByMasjids =
  (requestBody: any) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await API.fetchNearByMasjids(requestBody);

      if (response.data.message) {
        dispatch({ type: "FETCH_NEARBY_MASJIDS", payload: response.data.data });
        return response.data.data;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  };
