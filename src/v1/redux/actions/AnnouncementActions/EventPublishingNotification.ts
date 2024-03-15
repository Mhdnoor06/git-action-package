import * as api from "../../../api-calls/index";

export const EventPublishNotification =
  (masjidId: string, eventId: string, action: string, formData: any) =>
  async () => {
    try {
      const { data } = await api.triggeringEventAnnouncement(
        masjidId,
        eventId,
        action,
        formData
      );

      if (data.success) {
        return data;
      }
      return data;
    } catch (error) {
      return error;
    }
  };
