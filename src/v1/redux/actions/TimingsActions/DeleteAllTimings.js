import * as api from "../../../api-calls/index";
import { toast } from "react-hot-toast";

export const deleteAllTiming =
  (startDate, endDate, masjidId, LastEditor) => async (dispatch) => {
    const loading = toast.loading("Please wait...!");
    try {
      const data = await api.deletingTimingsByDateRange(
        startDate,
        endDate,
        masjidId,
        LastEditor
      );

      if (data.success) {
        toast.dismiss(loading);
        toast.success("Successfully deleted timing");
        return data.data;
      }
      toast.dismiss(loading);
      return data.data;
    } catch (error) {
      let result = {
        success: false,
        message: error.response.data.message
          ? error.response.data.message
          : "Failed To Delete Timings:SomeThing Went Wrong",
      };
      toast.dismiss(loading);
      toast.error(result.message);
      return result;
    }
  };
