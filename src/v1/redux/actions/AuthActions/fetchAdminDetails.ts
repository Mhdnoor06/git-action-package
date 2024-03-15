import * as api from "../../../api-calls/index";

export const fetchAdminDetails = () => async () => {
  try {
    const response = await api.fetchAdminDetails();

    return response.data;
  } catch (error: any) {
    let result = {
      success: false,
      error: `Failed to Login`,
      message: `Failed to Send Email`,
    };

    return result;
  }
};
