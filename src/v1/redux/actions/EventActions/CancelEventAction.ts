import * as api from "../../../api-calls/index";

export const CancelEvent = (masjidId: string, EventId: string) => async () => {
  try {
    const { data } = await api.cancelEvent(masjidId, EventId);

    if (data.success) {
      return data;
    }
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
