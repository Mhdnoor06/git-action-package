import * as api from "../../../api-calls/index";
import { toast } from "react-hot-toast";
export const DeletingAllTimingsByDateRange =
  (startDate: string, endDate: string, masjidId: string) => async () => {
    const loading = toast.loading("Please wait...!");
    try {
      const { data } = await api.deletingAllTimingsByDateRange(
        startDate,
        endDate,
        masjidId
      );

      if (data.message === "Timings deleted") {
        toast.dismiss(loading);
        toast.success("Successfully deleted timing");
        return data;
      }
      toast.dismiss(loading);
      return data;
    } catch (error: any) {
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
