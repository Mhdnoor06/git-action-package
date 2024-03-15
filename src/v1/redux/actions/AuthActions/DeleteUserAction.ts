import * as api from "../../../api-calls/index";

export const deleteUserAction = () => async () => {
  try {
    await api.deleteUserAccount();

    localStorage.removeItem("authTokens");
    localStorage.removeItem("admin");

    return "success";
  } catch (error) {
    let result = {
      success: false,
      error: `Failed to Delete Account`,
      message: `Failed to Delete Account`,
    };

    return result;
  }
};
