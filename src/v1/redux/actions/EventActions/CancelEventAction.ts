import * as api from "../../../api-calls/index";

export const CancelEvent =
  (masjidId: string, EventId: string, cancelType: string | null) =>
  async () => {
    try {
      const { data } = await api.cancelEvent(masjidId, EventId, cancelType);

      if (data.success) {
        return data;
      }
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  };
