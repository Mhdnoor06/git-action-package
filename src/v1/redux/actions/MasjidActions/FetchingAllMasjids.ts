import { Dispatch } from "redux";
import * as API from "../../../api-calls/index";
import { Masjid } from "../../Types";

export const fetchAllMasjids = () => async (dispatch: Dispatch<any>) => {
  try {
    const response = await API.fetchAllMasjids();
console.log("console form action => ",response?.data?.data);
    if (response?.data?.message) {

      dispatch({ type: "FETCH_ALL_MASJID", payload: response.data.data.data });
      return response.data;
    }
    return response.data.data.data;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
