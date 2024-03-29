import axios from "axios";
import {
  Masjid,
  AuthDataType,
  EventType,
  AddingEvent,
  NamazTimings,
  NamajTiming,
  AuthTokens,
  optionalTimings,
} from "../redux/Types";

// export const rootURL = "https://admin-api.connectmazjid.com/api/v2";//prod API
// export const rootURL = "https://dev-admin-api.connectmazjid.com/api/v2";//test
// export const rootURL = import.meta.env.VITE_ADMIN_BASE_URL;
export const rootURL =
  window.location.hostname === "musali-admin.netlify.app"
    ? "https://dev-admin-api.connectmazjid.com/api/v2"
    : import.meta.env.VITE_ADMIN_BASE_URL; //test API

const API = axios.create({
  baseURL: rootURL,
});

const authTokensString = localStorage.getItem("authTokens");
const token: AuthTokens | null = authTokensString
  ? JSON.parse(authTokensString)
  : null;

const refreshToken = () => {
  // const token  = JSON.parse(localStorage.getItem('authTokens'));
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token?.refreshToken}`;

  return axios.post(`${rootURL}/auth/refresh-token`).then((response) => {
    localStorage.setItem("authTokens", JSON.stringify(response.data.data));
  });
};

API.interceptors.request.use(
  async (req) => {
    if (localStorage.getItem("authTokens")) {
      if (token?.accessToken) {
        req.headers.Authorization = `Bearer ${token.accessToken}`;
      } else {
        req.headers.Authorization = `Bearer ${token?.token}`;
      }
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return refreshToken().then(() => {
        const config = error.config;
        config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
        return axios.request(config);
      });
    } else if (error.response && error.response.status === 409) {
      localStorage.removeItem("authTokens");
      localStorage.removeItem("admin");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

//New Api's
//export const VerifyingTwoFactorAuth = (formData,id) => API.post(`v1/auth/two-factor-auth/verify`,formData);
type formDataType = {
  email: string;
  password: string;
};
export const LoginAdmin = (formData: formDataType, captcha: string) =>
  API.post(`/auth/login`, formData, {
    params: {
      "g-recaptcha-response": captcha,
    },
  });

//Masjid Network Calls

export const fetchAllMasjids = () => API.get(`/masjid/get-masjids`);

export const fetchAdminMasjid = (id: string) =>
  API.get(`/masjid/get-masjid-by-admin/` + id);
export const updateMasjid = (masjidId: string, formData: Masjid) =>
  API.put(`/masjid/${masjidId}/update-masjid`, formData);
type formData = {
  imageId: string;
  url?: string;
};
export const deleteMasjidMedia = (mediaId: string, masjidId: string) =>
  API.delete(`/media/${masjidId}/delete/` + mediaId);
export const uploadMasjidMedia = (masjidId: string, formData: string) =>
  API.post(`/media/${masjidId}/upload`, formData);

export const deleteMasjidProfile = (masjidId: string) =>
  API.delete(`/masjid/${masjidId}/profile/delete`);
export const uploadMasjidProfile = (masjidId: string, formData: string) =>
  API.post(`/masjid/${masjidId}/profile/upload`, formData);

// Auth Network Calls
// export const LoginAdmin = (formData) => API.post(`v1/auth/adminLogin`,formData);

export const ChangePassword = () => API.post(`/auth/password/change`);
export const ResetPassword = (formData: AuthDataType) =>
  API.post(`/auth/password/reset`, formData);
export const setPasswordNewUser = (formData: AuthDataType) =>
  API.post(`/auth/verify-new-user`, formData);
export const ActivatingTwoFactorAuth = () =>
  API.put(`/auth/two-factor-auth/activate`);
export const VerifyingTwoFactorAuth = (formData: AuthDataType) =>
  API.post(`/auth/two-factor-auth/verify`, formData);
type ForgotPassDataType = { email: string };
export const ForgotPassword = (formData: ForgotPassDataType) =>
  API.post(`/auth/password/forgot`, formData);

//Events Network Calls
export const fetchLatestUpdatedEventsByAdminId = (id: string, limit: string) =>
  API.get(`/events/getLatestEventsByUser/` + id, {
    params: {
      limit: `${limit}`,
    },
  });
export const addEvent = (masjidId: string, formData: AddingEvent) =>
  API.post(`/event/${masjidId}/create`, formData);
export const getRSVP = (eventId: string) => API.get(`/event/rsvp/${eventId}`);
export const updateEvent = (
  formData: AddingEvent,
  masjidId: string,
  eventId: string,
  updateType: string
) =>
  API.put(`/event/${masjidId}/update/` + eventId, formData, {
    params: {
      updateType: `${updateType}`,
    },
  });
export const deleteEventMedia = (id: string, formData: any) =>
  API.put(`/admin/events/deleteEventMedia/` + id, formData);
export const getEventsByDateRange = (
  startDate: string,
  endDate: string,
  masjidId: string
) =>
  API.get(
    `/event/${masjidId}/get-events-by-date-range/${startDate}/${endDate}?filterCancelled=false`,
    {
      params: {
        limit: `50`,
        page: `1`,
      },
    }
  );
export const getCancelledEvents = (
  sortBy: string,
  sortIn: string,
  masjidId: string
) =>
  API.get(`/events/getCancelledEvents/${masjidId}`, {
    params: {
      sortBy: `${sortBy}`,
      sortIn: `${sortIn}`,
    },
  });
export const cancelEvent = (masjidId: string, eventId: string) =>
  API.put(`/event/${masjidId}/cancel/` + eventId);

export const rsvpEvent = (eventId: string) => API.get(`/event/rsvp/${eventId}`);

// Timings Network Calls
export const getTimingsById = (id: string) =>
  API.get(`/timings/getTimingById/` + id);
export const deleteTiming = (id: string) =>
  API.delete(`/admin/timings/deleteTiming/` + id);

export const updateAllTimingsOfSingleDay = (
  Data: [{ prayerType: string; timings: optionalTimings<number>[] }],
  masjidId: string,
  TimingsId: string
) => API.put(`/timing/${masjidId}/update-one-day-timing/${TimingsId}`, Data);

export const deletingAllTimingsByDateRange = (
  startDate: string,
  endDate: string,
  masjidId: string
) =>
  API.delete(`/timing/${masjidId}/timing-by-range/delete`, {
    params: {
      startDate: `${startDate}`,
      endDate: `${endDate}`,
    },
  });

export const addTimingsByRange = (
  startDate: string,
  endDate: string,
  Data: NamajTiming<number>[],
  masjidId: string
) =>
  API.post(`/timing/${masjidId}/timing-by-range/add`, Data, {
    params: {
      startDate: `${startDate}`,
      endDate: `${endDate}`,
    },
  });
export const updateTimingsByRange = (
  startDate: string,
  endDate: string,
  Data: any,
  masjidId: string
) =>
  API.put(`/timing/${masjidId}/timing-by-range/update`, Data, {
    params: {
      startDate: `${startDate}`,
      endDate: `${endDate}`,
    },
  });

// Announcement Network Calls
type UploadDataType = {
  title: string;
  body: string;
  masjidIds: Array<string>;
  expiresAt: string;
  priorityType: string;
};

export const triggeringAnnouncement = (formData: UploadDataType) =>
  API.post(`/notification/announcement`, formData);

export const fetchingAnnouncement2 = () =>
  API.get(`/notification/announcement/get`);
export const addTimings = (formData: NamazTimings<number>, masjidId: string) =>
  API.post(`/timing/${masjidId}/add-timing`, formData);
export const addSolarTimings = (formData: any, masjidId: string) =>
  API.post(`/timing/${masjidId}/solar/range`, formData);
//not used api
export const deleteNamaz = (id: string, formData: any) =>
  API.put(`/admin/timings/deleteNamaz/` + id, formData);
export const deleteRandomDaysTiming = (formData: any) =>
  API.put(`/admin/timings/deleteRandomTiming`, formData);
export const updateBulkTiming = (formData: any, id: string) =>
  API.put(`/admin/timings/updateBulkTiming/` + id, formData);
export const updateRandomDaysTimings = (formData: any) =>
  API.put(`/admin/timings/updateRandomTiming`, formData);
export const addingRandomDaysTimings = (formData: any) =>
  API.post(`/admin/timings/addRandomTiming`, formData);
export const updateNamaz = (formData: any, id: string) =>
  API.put(`/admin/timings/updateNamaz/${id}`, formData);
export const updateMinimumTimingsOfSingleDay = (
  formData: any,
  masjidId: string
) => API.put(`/timing/${masjidId}/random-timing/update `, formData);
export const deleteMinimumTimingsOfSingleDay = (
  formData: any,
  masjidId: string
) => API.put(`/timing/${masjidId}/random-timing/delete `, formData);
export const deletingTimingsByDateRange = (
  startDate: string,
  endDate: string,
  masjidId: string,
  prayerNames: string
) =>
  API.delete(`/timing/${masjidId}/timing-by-range/delete`, {
    params: {
      startDate: `${startDate}`,
      endDate: `${endDate}`,
      prayerNames: `${prayerNames}`,
    },
  });

export const fetchingAnnouncement = (
  limit: string,
  page: string,
  sortBy: string
) =>
  API.get(`/notification/announcement/fetch`, {
    params: {
      limit: `${limit}`,
      page: `${page}`,
      sortBy: `${sortBy}`,
    },
  });

export const triggeringEventAnnouncement = (
  masjidId: string,
  eventId: string,
  action: any,
  formData: any
) => API.post(`/notification/event/${masjidId}/${eventId}/${action}`, formData);

export const fetchAdminDetails = () => API.get(`/admin/user-details`);
export const addSpecialTiming = (formData: any, masjidId: string) =>
  API.post(`/special-timing/${masjidId}/add-special-time`, formData);
export const updateSpecialTiming = (
  formData: any,
  masjidId: string,
  timingId: string
) =>
  API.put(
    `/special-timing/${masjidId}/update-special-time/${timingId}`,
    formData
  );
export const deleteSpecialTiming = (masjidId: string, timingId: string) =>
  API.delete(`/special-timing/${masjidId}/delete-special-time/${timingId}`);
export const fetchMasjidById = (masjidId: string) =>
  API.get(`/masjid/get-masjid-by-id/` + masjidId);

export const deleteUserAccount = () => API.delete(`/auth/delete-account`);

export const generateWidgetApiKey = (assetType: string, masjidId: string) =>
  API.get(`/auth/api-key/widget/${assetType}/${masjidId}`);
