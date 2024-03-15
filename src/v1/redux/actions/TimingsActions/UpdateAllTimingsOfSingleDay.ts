import { toast } from "react-hot-toast";
import * as api from "../../../api-calls/index";
import { NamazTimings } from "../../Types";

export const UpdateAllTimingsOfSingleDay =
  (Data: any, MasjidId: string, TimingsId: string) => async () => {
    const loading = toast.loading("Please wait...!");
    try {
      toast.dismiss(loading);

      let UploadData = Data;

      console.log(UploadData);
      const { data } = await api.updateAllTimingsOfSingleDay(
        UploadData,
        MasjidId,
        TimingsId
      );
      toast.dismiss(loading);
      toast.success("Successfully updated timing");
      return data;
    } catch (error: any) {
      const message = error.response?.data?.message
        ? error.response?.data?.message
        : "Failed To updated  Timings:SomeThing Went Wrong";
      let result = {
        success: false,
        message: message,
      };
      toast.dismiss(loading);
      toast.success(message);
      return result;
    }
  };
