import * as api from "../../../api-calls/index";
import { Navigate } from "react-router-dom";
import { AddingEvent, ResponseType } from "../../Types";
import toast from "react-hot-toast";

export const addNewEvent =
  (formData: AddingEvent, masjidId: string) => async () => {
    // const loading = toast.loading("Please wait...!");
    try {
      const response: any = await api.addEvent(masjidId, formData);

      if (response?.success) {
        // toast.dismiss(loading);
        // toast.success("Event  added Successfully");
        return response;
      }
      // toast.dismiss(loading);
      // toast.success("Event  added Successfully");
      return response;
    } catch (error: any) {
      console.log(error);
      let result = {
        success: false,
        message: error.response.data.message
          ? error.response.data.message
          : "Failed To Add Events : SomeThing Went Wrong",
      };
      const loading = toast.loading("Please wait...!");
      toast.dismiss(loading);
      toast.error(result.message);
      return result;
    }
  };
