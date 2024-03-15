import { Dispatch } from "redux";
import * as API from "../../../ClientApi-Calls/index";
export const fetchMasjidById =
  (id: string) => async (dispatch: Dispatch<any>) => {
    try {
      const response = await API.fetchMasjidById(id);
      // let accessToken =
      //   "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJhYWUxMzgzZjk2MzNiYjE3MWI4NjAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6InJpeWFkLmhhc2FuODI4MkBnbWFpbC5jb20iLCJpYXQiOjE3MDExODY3NDcsImV4cCI6MTcwMTE4NjgwN30.jyIGC5ZCk0xGPNZabSWLtkZYUg7qbjh9UqC-tBN-57gErl3dFQza271Pyc6vGI4Kamj4X6-wZhW0qnIIB15GLXMGAbneuL9KVpcLExr16oArQhiEingwDvUq9agk9KnJfBvkOvx5G5sfkeWB8uZPhAzlg0x3DQeVwAhi1KRNctQirfUDcS31XerUCs5qW13kxjNdmd-p6xttl1Kf4jCFC-dWFok6On_W2dqpa4CCRfYx-8wYQqJ6AR-NxY5kZFDlcaHfqJQPMo9LlhlaJhRklnG1dlTiCM2pYvt4InCqJP5cdr5xmMFQqgB--XjWsWaUQuaMRDsgxiIHEwZ9C2olToatFGyMu_v5rdnYJuF4uazPx2q7SEJxKAoAtzlsOlOGcBtLHVfqP7EV0gPpYotRXR6Gc6Ov1eUQHaoEDmnIHS5K3bD_JCG1BB7OTcEjae3ndIRaF5zljFzp5i6EZIhX0_1f9O6z6Jdfyh_ufX6oGLbf8fmSaoeLCQSJN7_Bg-wDWsJne09vHOCacFspQ14DKgsE24Mnqmyq9vbVoNfFJ4mRyiv4CeaUUUgbLtJzsWKeSvnt6Eeu-3ZypoI-FzQJjhtulNHxkV6XmP2isHjSlcdYTNeQkKtnvmTOcXCVYr5Dpmrgjn6474zx58wASrKBaviEpUrDRZ7EDWE6vvl7hEw";
      // let refreshToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJhYWUxMzgzZjk2MzNiYjE3MWI4NjAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6InJpeWFkLmhhc2FuODI4MkBnbWFpbC5jb20iLCJpYXQiOjE3MDExODY3NDcsImV4cCI6MTcwMTE4Njg2N30.i29XIMDtsvRm4_4aWrcBXWLDgPwTHeKip2dj-jCXFQc";

      // accessToken =
      //   "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJhYWUxMzgzZjk2MzNiYjE3MWI4NjAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6InJpeWFkLmhhc2FuODI4MkBnbWFpbC5jb20iLCJpYXQiOjE3MDExODY3NDcsImV4cCI6MTcwMTE4NjgwN30.jyIGC5ZCk0xGPNZabSWLtkZYUg7qbjh9UqC-tBN-57gErl3dFQza271Pyc6vGI4Kamj4X6-wZhW0qnIIB15GLXMGAbneuL9KVpcLExr16oArQhiEingwDvUq9agk9KnJfBvkOvx5G5sfkeWB8uZPhAzlg0x3DQeVwAhi1KRNctQirfUDcS31XerUCs5qW13kxjNdmd-p6xttl1Kf4jCFC-dWFok6On_W2dqpa4CCRfYx-8wYQqJ6AR-NxY5kZFDlcaHfqJQPMo9LlhlaJhRklnG1dlTiCM2pYvt4InCqJP5cdr5xmMFQqgB--XjWsWaUQuaMRDsgxiIHEwZ9C2olToatFGyMu_v5rdnYJuF4uazPx2q7SEJxKAoAtzlsOlOGcBtLHVfqP7EV0gPpYotRXR6Gc6Ov1eUQHaoEDmnIHS5K3bD_JCG1BB7OTcEjae3ndIRaF5zljFzp5i6EZIhX0_1f9O6z6Jdfyh_ufX6oGLbf8fmSaoeLCQSJN7_Bg-wDWsJne09vHOCacFspQ14DKgsE24Mnqmyq9vbVoNfFJ4mRyiv4CeaUUUgbLtJzsWKeSvnt6Eeu-3ZypoI-FzQJjhtulNHxkV6XmP2isHjSlcdYTNeQkKtnvmTOcXCVYr5Dpmrgjn6474zx58wASrKBaviEpUrDRZ7EDWE6vvl7hEw";
      // refreshToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJhYWUxMzgzZjk2MzNiYjE3MWI4NjAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6InJpeWFkLmhhc2FuODI4MkBnbWFpbC5jb20iLCJpYXQiOjE3MDExODY3NDcsImV4cCI6MTcwMTE4Njg2N30.i29XIMDtsvRm4_4aWrcBXWLDgPwTHeKip2dj-jCXFQc";
    
  
        if (response.data.message) {
        dispatch({ type: "FETCH_ADMIN_MASJID", payload: response.data.data });
        return response.data.data;
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  };
