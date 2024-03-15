import * as API from "../../../ClientApi-Calls/index";

export const FetchEventByMasjidId = (eventId: string) => async () => {
  try {
    const response = await API.fetchEventWithMasjidId(eventId);

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
