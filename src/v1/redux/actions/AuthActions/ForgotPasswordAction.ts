import * as api from "../../../api-calls/index";
import { AUTH_LOGIN } from "../../actiontype";

type formDataType = { email: string };
export const forgotPassword = (formData: formDataType) => async () => {
  try {
    const response = await api.ForgotPassword(formData);

    if (response.status === 200) {
      let result = {
        data: response.data,
        success: true,
        message: "Email Sent Successfully",
      };

      return result;
    }
    return response.data;
  } catch (error) {
    let result = {
      success: false,
      error: `Failed to Login`,
      message: `Failed to Send Email`,
    };

    return result;
  }
};
