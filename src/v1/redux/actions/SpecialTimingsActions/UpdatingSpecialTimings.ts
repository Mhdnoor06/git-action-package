import toast from "react-hot-toast";
import * as API from "../../../api-calls/index";

export const updatingSpecialTimings =
  (formData: any, masjidId: string, timingId: string) => async () => {
    const loading = toast.loading("Please wait...!");
    try {
      const { data } = await API.updateSpecialTiming(
        formData,
        masjidId,
        timingId
      );
      if (data.message === "Success") {
        toast.dismiss(loading);
        toast.success("SpecialTimings Updated Successfully");
        return data;
      }
      toast.dismiss(loading);
      toast.success("SpecialTimings Updated Successfully");
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
