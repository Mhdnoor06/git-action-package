import * as api from "../../../api-calls/index";

export const FetchingAnnouncementNotificationByDate = () => async () => {
  try {
    const response = await api.fetchingAnnouncement2();

    return response;
  } catch (error: any) {
    let result = {
      success: false,
      message: error.response.data.message
        ? error.response.data.message
        : "Failed To Send Notification:SomeThing Went Wrong",
    };
    return result;
  }
};
