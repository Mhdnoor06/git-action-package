import toast from "react-hot-toast";
import * as api from "../../../ClientApi-Calls/index";

export const ContactFormAction = (formData: any) => async () => {
  try {
    const { data } = await api.contactFormApi(formData);

    return data;
  } catch (error: any) {
    return error;
  }
};
