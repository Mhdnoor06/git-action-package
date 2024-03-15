import { toast } from "react-hot-toast";
import * as API from "../../../api-calls/index";

export const addingSpecialTimings =
  (formData: any, masjidId: string) => async () => {
    const loading = toast.loading("Please wait...!");
    try {
      const { data } = await API.addSpecialTiming(formData, masjidId);

      if (data.message === "Success") {
        toast.dismiss(loading);
        toast.success("SpecialTimings added Successfully");
        return data;
      }
      toast.dismiss(loading);
      toast.success("SpecialTimings added Successfully");
      return data;
    } catch (error: any) {
      const msg = error.response.data.data.error
        ? error.response.data.data.error
        : " SomeThing Went Wrong";
      let result = {
        success: false,
        message: msg,
      };
      toast.dismiss(loading);
      toast.error(msg);
      return result;
    }
  };
