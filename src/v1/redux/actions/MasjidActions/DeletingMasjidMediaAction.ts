import * as api from "../../../api-calls/index";

export const deleteMasjidMedia =
  (mediaId: string, masjidId: string) => async () => {
    try {
      const response = await api.deleteMasjidMedia(mediaId, masjidId);
      return response;
    } catch (error: any) {
      console.log(error);
      let result = {
        success: false,
        message: error.response.data.message
          ? error.response.data.message
          : "Failed To Delete Masjid Media : SomeThing Went Wrong",
      };
      return result;
    }
  };
