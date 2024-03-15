import { Dispatch } from "redux";
import * as api from "../../../api-calls/index";
import { Masjid } from "../../Types";
import { FETCH_ADMIN_MASJID } from "../../actiontype";

export const updateAdminMasjid =
  (id: string, formData: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.updateMasjid(id, formData);

      if (data.success) {
        dispatch({ type: "FETCH_ADMIN_MASJID", payload: data.data });
        return data;
      }
      return data;
    } catch (error: any) {
      let result = {
        success: false,
        message: error.response.data.message
          ? error.response.data.message
          : "Failed To Update Masjid : SomeThing Went Wrong",
      };
      return result;
    }
  };
