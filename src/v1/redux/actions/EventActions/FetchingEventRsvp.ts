import * as api from "../../../api-calls/index";

export const FetchRSVPByEventId = (eventId: string) => async () => {
  try {
    const response = await api.getRSVP(eventId);

    return response;
  } catch (error: any) {
    let result = {
      success: false,
      message: error.response.data.message
        ? error.response.data.message
        : "Failed To Login:SomeThing Went Wrong",
    };
    return result;
  }
};
