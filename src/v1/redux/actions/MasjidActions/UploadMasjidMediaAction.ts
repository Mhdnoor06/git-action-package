import * as api from "../../../api-calls/index";

export const uploadMasjidMedia = (masjidId: string, formData: string) => async() => {
  try {
    const response = await api.uploadMasjidMedia(masjidId, formData);
    return response;
  } catch (error: any) {
    console.log(error);
    let result = {
      success: false,
      message: error.response.data.message
        ? error.response.data.message
        : "Failed To Upload Masjid Media : SomeThing Went Wrong",
    };
    return result;
  }
};
