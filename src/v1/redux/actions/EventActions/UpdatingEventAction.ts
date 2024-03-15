import * as api from "../../../api-calls/index";
import { AddingEvent } from "../../Types";
import toast from "react-hot-toast";
export const UpdateEventById =
  (formData: any, masjidId: string, eventId: string) => async () => {
    const loading = toast.loading("Please wait...!");
    try {
      let updateType = "single";
      const response = await api.updateEvent(
        formData,
        masjidId,
        eventId,
        updateType
      );

      if (response) {
        toast.dismiss(loading);
        toast.success("Event  Updated Successfully");
        return response.data;
      }
      toast.dismiss(loading);
      toast.success("Event  Updated Successfully");
      return response;
    } catch (error: any) {
      let result = {
        success: false,
        message: error.response.data.message
          ? error.response.data.message
          : "Failed To Fetch Event : SomeThing Went Wrong",
      };
      toast.dismiss(loading);
      toast.error(result.message);
      return result;
    }
  };
