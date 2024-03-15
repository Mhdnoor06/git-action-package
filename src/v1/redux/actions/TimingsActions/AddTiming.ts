import { toast } from "react-hot-toast";
import * as api from "../../../api-calls/index";
import { NamazTimings } from "../../Types";

export const addTiming =
  (formData: NamazTimings<number>, masjidId: string) => async () => {
    const loading = toast.loading("Please wait...!");
    try {
      const { data } = await api.addTimings(formData, masjidId);
      // console.log(formData, "formData", data, "data");
      if (data.success) {
        toast.dismiss(loading);
        toast.success("Successfully added timing");
        return data;
      }
      toast.dismiss(loading);
 
      return data;
    } catch (error: any) {
      const message = error.response.data.message
        ? error.response.data.message
        : "Failed To Login:SomeThing Went Wrong";
      let result = {
        success: false,
        message: message,
      };
      toast.dismiss(loading);
      toast.error(message);
      return result;
    }
  };
