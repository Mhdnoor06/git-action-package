import * as api from "../../../api-calls/index";
import { AuthDataType } from "../../Types";
import { AUTH_LOGIN } from "../../actiontype";

export const resetPassword = (formData: AuthDataType) => async () => {
  try {
    const response = await api.ResetPassword(formData);

    if (response.status === 200) {
      let result = {
        data: response.data,
        success: true,
        message: "Password Reset Successfully",
      };
      return result;
    }
    return response.data;
  } catch (error: any) {
    let result = {
      success: false,
      error: `Failed to Login`,
      message: `Password Reset Failed : Invalid Token`,
    };

    return result;
  }
};
