import axios from "axios";

// const APIBaseUrl = "https://api.connectmazjid.com/api/v2"; //prod
// const APIBaseUrl = import.meta.env.VITE_CLIENT_BASE_URL;

// const APIBaseUrl = "https://dev-api.connectmazjid.com/api/v2"; //test

const APIBaseUrl =
  window.location.hostname === "musali-admin.netlify.app"
    ? "https://dev-api.connectmazjid.com/api/v2"
    : import.meta.env.VITE_CLIENT_BASE_URL;

const widgetAPI = axios.create({
  baseURL: APIBaseUrl,
});

export const fetchPrayerTimings = (apiKey: any) => {
  return widgetAPI.get(`/widget/prayer-timetable`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
};

export const fetchSpecialPrayerTimings = (apiKey: any) => {
  return widgetAPI.get(`/widget/special-timetable`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
};

export const fetchEventsData = (apiKey: any) => {
  return widgetAPI.get(`/widget/events`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
};

export const fetchAnnouncementData = (apiKey: any) => {
  return widgetAPI.get(`/widget/notification`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
