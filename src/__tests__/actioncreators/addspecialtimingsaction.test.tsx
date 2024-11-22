// addingSpecialTimingsAction.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { addingSpecialTimings } from "../../v1/redux/actions/SpecialTimingsActions/AddingSpecialTimings";
import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import indexReducer from "../../v1/redux/reducers/IndexReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action } from "../../v1/redux/Types";
import * as API from "../../v1/api-calls/index";
import { toast } from "react-hot-toast";

vi.mock("../../v1/api-calls/index", () => ({
  addSpecialTiming: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  toast: {
    loading: vi.fn(),
    dismiss: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const initialState = {};

const Store = configureStore({
  reducer: indexReducer,
});

type RootState = ReturnType<typeof Store.getState>;
type AppDispatch = typeof Store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

let originalLocalStorage: any;

beforeEach(() => {
  originalLocalStorage = { ...global.localStorage };

  global.localStorage.setItem = vi.fn();
  global.localStorage.getItem = vi.fn();
  global.localStorage.removeItem = vi.fn();
  global.localStorage.clear = vi.fn();
});

afterEach(() => {
  global.localStorage = originalLocalStorage;
});

describe("addingSpecialTimings action creator", () => {
  it("should dispatch the correct actions on successful API call", async () => {
    const formData = { specialTiming: "Special Timing Data" };
    const masjidId = "1";

    const mockResponse = {
      data: { data: [], message: "Timings deleted" },
      status: 200,
      statusText: "OK",
      headers: {
        "content-length": "39",
        "content-type": "application/json; charset=utf-8",
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        adapter: ["xhr", "http"],
        transformRequest: [null],
        transformResponse: [null],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {},
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization:
            "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MjI5NTkzMTUsImV4cCI6MTcyMzIxODUxNX0.LOogIHCOCRxeu73slkYKoENPjbLrbS9UfoHsgjDUQwxMQT4lVnMFm9lwZix1quks42ete8avaDNdmQmCzN4O6JMsi5_2PmKUm9wE_DRR2_qV_KKXpSXaGkYrykaJdjRux_atlaw0gJR829NDCAZWc23hO5D0qJbJv2_xlHy6tMbQq4LzfL3_JIi9mbMFWx84-nsIJv5dmtvXiX8QQ74LKZRr7MLdvQvWB0cQL6ecz88ym_JmR9CQ8d41gEFLDalijkgeZkgqMtpsXyYdbQTmadPw-P8IPT_Qe8ReoKRjCwEHfP_h6UioJ5_FngWeS5tMdXkLf83NwNye9CZlaxddewueTcfngLaFPtrn8eCM734dZn9d1N-HBt1FUdTeS1o6S5o3BJyTqbU-zPLw715Yq2RxkwYF6cPsqoNIKshSg98_4hV4WKm_5NTDzztP_9eoeasU8e0Hzz-yUR-nymjiK1tO35UfR3Ds4h0TR5pIZDlebDz9w_iK0b5SIoLf37q78rmcKHaqT6zU06PNUelcP1iWdu2TPFCcRjXkdDxun0fjPJchgqYD7Plkwy93DUzmbEEcXueWaGpCZ9kt0n5iuTen3jhqSNKGXWxBfg9qjlGmO-33mM0AEPbHzW_ntkFbuxeN269fcNdfcQiFvl5DI5qaGKfGfkZf-7PLl5LSVAE",
        },
        baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
        params: {
          startDate: "2024-08-07T00:00:00",
          endDate: "2024-12-31T23:59:59",
        },
        method: "delete",
        url: "/timing/64df7804c2d7bcd9f0dac1e7/timing-by-range/delete",
      },
      request: {},
    };

    (API.addSpecialTiming as any).mockResolvedValue(mockResponse);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(
      addingSpecialTimings(formData, masjidId) as any
    );

    expect(API.addSpecialTiming).toHaveBeenCalledWith(formData, masjidId);
    expect(toast.loading).toHaveBeenCalledWith("Please wait...!");
    expect(toast.dismiss).toHaveBeenCalled();
    // expect(toast.success).toHaveBeenCalledWith(
    //   "SpecialTimings added Successfully"
    // );
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle errors correctly on failed API call", async () => {
    const formData = { specialTiming: "Special Timing Data" };
    const masjidId = "1";

    const mockError = {
      response: {
        data: {
          data: {
            error: "Failed to add special timings",
          },
        },
      },
    };

    (API.addSpecialTiming as any).mockRejectedValue(mockError);

    const dispatch = Store.dispatch as ThunkDispatch<RootState, void, Action>;
    const result = await dispatch(
      addingSpecialTimings(formData, masjidId) as any
    );

    const expectedErrorResult = {
      success: false,
      message: "Failed to add special timings",
    };

    expect(API.addSpecialTiming).toHaveBeenCalledWith(formData, masjidId);
    expect(toast.loading).toHaveBeenCalledWith("Please wait...!");
    expect(toast.dismiss).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Failed to add special timings");
    expect(result).toEqual(expectedErrorResult);
  });
});
