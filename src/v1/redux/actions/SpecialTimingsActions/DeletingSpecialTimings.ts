import * as API from "../../../api-calls/index";
import { toast } from "react-hot-toast";

export const deletingSpecialTimings =
  (masjidId: string, timingId: string) => async () => {
    try {
      const response = await API.deleteSpecialTiming(masjidId, timingId);

      if (response.status === 204) {
        return { success: true };
      }
      return response.data.data;
    } catch (error: any) {
      let result = {
        success: false,
        message: error.response.data.data.error
          ? error.response.data.data.error
          : " SomeThing Went Wrong",
      };
      return result;
    }
  };
