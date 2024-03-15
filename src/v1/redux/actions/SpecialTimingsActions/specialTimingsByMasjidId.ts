import * as API from "../../../ClientApi-Calls/index";

export const GetSpecialTimingsByMasjidId = (masjidId: string) => async () => {
  try {
    let { data } = await API.specialTimingsByMasjidId(masjidId);
    if (data.success) {
      return data;
    }

    return data;
  } catch (error: any) {
    let result = {
      success: false,
      message: error?.message ? error.message : " SomeThing Went Wrong",
    };
    return result;
  }
};
