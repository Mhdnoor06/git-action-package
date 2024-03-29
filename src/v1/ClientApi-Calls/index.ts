import axios from "axios";
import { AddingEvent, AuthTokens } from "../redux/Types";
import { rootURL } from "../api-calls";
import { getAccessToken, getRefreshToken } from "../helpers/HelperFunction";

// const APIBaseUrl = "https://api.connectmazjid.com/api/v2"; //prod
// const APIBaseUrl = "https://dev-api.connectmazjid.com/api/v2"; //test
// const APIBaseUrl = import.meta.env.VITE_CLIENT_BASE_URL;
// console.log(import.meta.env.VITE_CLIENT_BASE_URL);

const APIBaseUrl =
  window.location.hostname === "musali-admin.netlify.app"
    ? "https://dev-api.connectmazjid.com/api/v2"
    : import.meta.env.VITE_CLIENT_BASE_URL;

console.log("API Base URL:", window.location.hostname);

const authTokensString = localStorage.getItem("authTokens");
const token: AuthTokens | null = authTokensString
  ? JSON.parse(authTokensString)
  : null;

const API = axios.create({
  baseURL: APIBaseUrl,
});

const refreshToken = () => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getRefreshToken()}`;

  return axios.post(rootURL + "/auth/refresh-token").then((response) => {
    localStorage.setItem("authTokens", JSON.stringify(response.data.data));
  });
};

API.interceptors.request.use(
  async (req) => {
    if (localStorage.getItem("authTokens")) {
      if (getAccessToken()) {
        req.headers.Authorization = `Bearer ${getAccessToken()}`;
      } else {
        req.headers.Authorization = `Bearer ${token?.token}`;
      }
    }
    req.headers["X-Request-Origin"] = `connectmazjid-portal`;

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
        const newAuth = localStorage.getItem("authTokens");
        const newToken: AuthTokens | null = newAuth
          ? JSON.parse(newAuth)
          : null;

        const config = error.config;
        config.headers["Authorization"] = `Bearer ${newToken?.accessToken}`;
        config.headers["X-Request-Origin"] = `connectmazjid-portal`;
        return axios.request(config);
      });
    } else if (error.response && error.response.status === 409) {
      localStorage.removeItem("authTokens");
      localStorage.removeItem("admin");
      window.location.reload();
    }
    // Return the error as is
    return Promise.reject(error);
  }
);

export const SignUpEmail = (requestBody: any) =>
  API.post(`/app/email/send`, requestBody);

export const fetchUserLocationByIp = () => API.get(`/app/get-location-from-ip`);
export const fetchSearchedMasjids = (name_or_address: string) =>
  API.get(`/masjid/search-masjid/${name_or_address}`);

export const fetchNearByMasjids = (requestBody: any) =>
  API.post(`/masjid/get-nearby-masjids`, requestBody);

export const getTimingsByDate = (masjidId: string, date: string) =>
  API.get(`/timing/get-timing-by-date/` + masjidId, {
    params: {
      date: `${date}`,
    },
  });

export const fetchMasjidById = (masjidId: string) =>
  API.get(`/masjid/get-masjid-by-id/` + masjidId);
export const fetchEventWithMasjidId = (masjidId: string) =>
  API.get(`/event/get-events-by-masjid-id/` + masjidId);

export const getTimingByDateRange = (
  startDate: string,
  endDate: string,
  masjidId: string
) =>
  API.get(`/timing/get-timing-by-date-range/` + masjidId, {
    params: {
      startDate: `${startDate}`,
      endDate: `${endDate}`,
    },
  });
export const getDatesByDateRange = (masjidId: string, startDate: string) =>
  API.get(`/timing/get-dates-by-range/` + masjidId, {
    params: {
      startDate: `${startDate}`,
    },
  });

export const fetchEventId = (id: string) =>
  API.get(`/event/get-event-by-id/` + id);
export const specialTimingsByMasjidId = (masjidId: string) =>
  API.get(`/special-timing/${masjidId}/get-all`);
export const addEvent = (masjidId: string, formData: AddingEvent) =>
  API.post(`/event/${masjidId}/create`, formData);

// export const addSpecialTiming = (formData: any, masjidId: string) =>
// API.post(`v1/special-timing/${masjidId}/add-special-time`, formData);

// export const fetchMasjidById = (masjidId) => API.get(`v1/masjid/get-masjid-by-id/`+ masjidId);
// export const fetchEventsById = (EventId) => API.get(`v1/event/get-event-by-id/`+ EventId);

// export const fetchEventWithMasjidId = (masjidId) => API.get(`v1/event/get-events-by-masjid-id/`+ masjidId);

// export const getTimingByDateRange = (startDate,endDate,masjidId) => API.get(`v1/timing/get-timing-by-date-range/` + masjidId,{
//   params:{
//       startDate:`${new Date(startDate)}`,
//       endDate:`${new Date(endDate)}`,
//   }
// });
