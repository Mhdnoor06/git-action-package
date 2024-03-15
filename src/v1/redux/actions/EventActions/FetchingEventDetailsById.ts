import * as api from "../../../ClientApi-Calls/index";

export const FetchEventById = (eventId: string) => async () => {
  try {
    const { data } = await api.fetchEventId(eventId);

    if (data.success) {
      return data;
    }
    return data;
  } catch (error: any) {
    let result = {
      success: false,
      message: error.response.data.message
        ? error.response.data.message
        : "Failed To Fetch Event : SomeThing Went Wrong",
    };
    return result;
  }
};
