import { Dispatch } from "react";
import * as API from "../../../ClientApi-Calls/index";
export const fetchUserLocationByIp = () => async (dispatch: Dispatch<any>) => {
  try {
    const response = await API.fetchUserLocationByIp();

    if (response.data.message) {
      dispatch({ type: "FETCH_LOCATION", payload: response.data.data });
      return response.data.data;
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
