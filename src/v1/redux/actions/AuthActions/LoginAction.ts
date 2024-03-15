
import { Dispatch } from "redux";
import * as api from "../../../api-calls/index";
import { UserActionType } from "../../Types";
import { AUTH_LOGIN } from "../../actiontype";
type formDataType = {
  email: string;
  password: string;
};
export const authLogin =
  (formData: formDataType, CaptchaValue: string) =>
  async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await api.LoginAdmin(formData, CaptchaValue);

      if (response.status === 200) {
        if (response.data.data.isTwoFactorAuthentication) {
          let isTwoFAUser = {
            success: true,
            TwoFAUser: true,
            adminId: response.data.data.id,
          };

          return isTwoFAUser;
        } else {
          let isTwoFAUser = {
            success: true,
            TwoFAUser: false,
            adminId: response.data.data.id,
          };
          localStorage.setItem(
            "authTokens",
            JSON.stringify(response.data.data.token)
          );

          dispatch({ type: "AUTH_LOGIN", payload: response.data.data.user });

         window.location.reload();
          return isTwoFAUser;
        }
      }

      return response.data;
    } catch (error:any) {
      let isTwoFAUser = {
        success: false,
        TwoFAUser: false,
        error: `Failed to Login`,
        message: error.response.data.data.error,
      };
      return isTwoFAUser;
    }
  };
