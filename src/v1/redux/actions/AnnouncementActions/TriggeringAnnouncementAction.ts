import * as api from "../../../api-calls/index";
type UploadDataType = {
  title: string;
  body: string;
  masjidIds: Array<string>;
  expiresAt: string;
  priorityType: string;
};
export const TriggeringAnnouncement =
  (formData: UploadDataType) => async () => {
    try {
      console.log(formData);
      const response = await api.triggeringAnnouncement(formData);

      // console.log(response);
      if (response.status === 200) {
        return response.data;
      }
      return response;
    } catch (error: any) {
      // console.log(error);
      let result = {
        success: false,
        message: error.response.data.message
          ? error.response.data.message
          : "Failed To Send Notification:SomeThing Went Wrong",
      };
      return result;
    }
  };
