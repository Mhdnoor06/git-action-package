import axios from "axios";
import { AuthTokens } from "../../redux/Types";
import { rootURL } from "../../api-calls";
const t = rootURL;
const API = axios.create({
  baseURL: rootURL + "/",
  // baseURL: "https://squid-app-7wo7y.ondigitalocean.app/api/v1/",
});

const authTokensString = localStorage.getItem("authTokens");
const token: AuthTokens | null = authTokensString
  ? JSON.parse(authTokensString)
  : null;
API.interceptors.request.use(
  async (req) => {
    if (localStorage.getItem("authTokens")) {
      // const token  = JSON.parse(localStorage.getItem('authTokens'));
      if (token?.accessToken) {
        req.headers.Authorization = `Bearer ${token?.accessToken}`;
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
        // const data = JSON.parse(localStorage.getItem("authTokens"));
        config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
        return axios.request(config);
      });
    }
    return Promise.reject(error);
  }
);

const refreshToken = () => {
  // const token = JSON.parse(localStorage.getItem("authTokens"));
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token?.refreshToken}`;

  return axios.post(rootURL + "/auth/adminRefreshToken").then((response) => {
    localStorage.setItem("authTokens", JSON.stringify(response.data.data));
  });
};
// export const addSpecialTiming = (formData: any, masjidId: string) =>
// API.post(`special-timing/${masjidId}/add-special-time`,formData);

export default API;
