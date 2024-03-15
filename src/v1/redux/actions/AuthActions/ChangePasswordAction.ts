import * as api from "../../../api-calls/index";

export const changePassword = () => async () => {
  try {
    const response = await api.ChangePassword();

    if (response.status === 200) {
      let result = {
        data: response.data,
        success: true,
        message: "Password changed successfully",
      };

      return result;
    }
    return response.data;
  } catch (error) {
    let result = {
      success: false,
      error: `Failed to change password`,
      message: `Failed to change password. Please try again.`,
    };

    return result;
  }
};
