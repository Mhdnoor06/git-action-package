import * as api from "../../../api-calls/index";

export const uploadMasjidProfile = (masjidId: string, formData: string) => async() => {
  try {
    const response = await api.uploadMasjidProfile(masjidId, formData);
    return response;
  } catch (error: any) {
    console.log(error);
    let result = {
      success: false,
      message: error.response.data.message
        ? error.response.data.message
        : "Failed To Upload Masjid Profile : SomeThing Went Wrong",
    };
    return result;
  }
};
