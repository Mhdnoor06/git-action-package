import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  prettyDOM,
  within,
} from "@testing-library/react";
import { vi } from "vitest";
import MobileViewCalender from "../../v1/components/MobileViewComponents/MobileViewCalender/MobileViewCalender";
import { useAppSelector, useAppThunkDispatch } from "../../v1/redux/hooks";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Theme from "../../v1/components/Theme/Theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import * as API from "../../v1/ClientApi-Calls/index";
import * as actions from "../../v1/redux/actions/MasjidActions/fetchMasjidById";
import * as timingActions from "../../v1/redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import moment from "moment";

// Mock the API calls
vi.mock("../../v1/ClientApi-Calls/index", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchMasjidById: vi.fn(),
    getTimingByDateRange: vi.fn(),
  };
});

//   vi.mock('../../v1/helpers/HelperFunction', async (importOriginal) => {
//     const actual = await importOriginal();
//     return {
//       ...actual,
//       UtcDateConverter: vi.fn(),
//       LocationBasedToday: vi.fn(),
//     };
//   });

vi.mock("../../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppSelector: vi.fn(),
  };
});

const renderWithProviders = (ui) => {
  return render(
    <Provider store={Store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>{ui}</BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};
const generateFutureDate = (daysToAdd) => {
  const datePart = moment().add(daysToAdd, "days").format("YYYY-MM-DD");
  return `${datePart}`;
};
describe("MobileViewCalender Component", () => {
  const masjidData = {
    data: {
      data: {
        masjidName: "test Masjid Of  Chicago.",
        masjidProfilePhoto:
          "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg",
        masjidPhotos: [
          {
            _id: "66749174983db7598f07a34d",
            url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/080cf8a0-7c38-4c84-a327-b44aa3ecea89.jpg",
          },
          {
            _id: "6674917b983db7598f07a356",
            url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/48ca13d5-e507-4139-b4d7-c643727874a7.jpg",
          },
        ],
        description:
          "this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ",
        address: "4700 14th St, Plano, TX 75074, USA",
        location: { coordinates: [-96.6490745, 33.010232] },
        contact: "+0185252706",
        externalLinks: [
          {
            name: "Facebook",
            url: "www.facebook1.com/testMasjidOfChicago",
            _id: "667aa68dc49b5cc3e9402d8f",
          },
          {
            name: "Website",
            url: "www.test1.com",
            _id: "667aa68dc49b5cc3e9402d90",
          },
        ],
        updatedAt: "2024-06-27T12:05:25.534Z",
        isAssigned: true,
        updatedBy: null,
        lastEditor: {
          _id: "666076e60ad4a2ecf42c1be0",
          name: "Mirza Akeel",
          role: "musaliadmin",
        },
        assignedUser: { _id: "666076e60ad4a2ecf42c1be0", name: "Mirza Akeel" },
      },
      message: "Success",
      count: 1,
      success: true,
    },
    status: 200,
    statusText: "OK",
    headers: {
      "content-length": "1682",
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
          "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTk0ODk2MjcsImV4cCI6MTcxOTc0ODgyN30.k0z4cSv4EcO8B934WziuVRPc85HgUJUH3RzQqglKXuOX6cp7RvJmSQ133jfqdMaiciKOvaoKIt0HGUgo1-dNtxmOurWt074dssOhelaNtrfpVXTQutoukXTbqUaKP2Kk0uOQwIdHeeltHNowUIRsRTb1b3CbRSs2ll9ZQ-ZtjvR115Mxcp3rO4E7gCyj9ArPKqav--KV-dBsNFJuDkpSn86BxAMhTLDMhvrvC-fjz1UdRqYjGtI7-HQaI4F61W0u8ZpGmk4OEqrA2BAcbrbC7vSC8r0zk-TSErM45BP-QgL1cPmNMAFqy9Bjo3cVD0irnvEWoAxwhaqqKuhFlGMZfwuVOklXSdGbk0BRC3_wA47VBLKEVLujFXUG3BvmfCvUxGdxnKQh2UkbeOxHWaJFncRz61fWBXcCAyMJ3Vy4jh6AVsAItg_eSuAuiPan_kaYG7xwce-Kc_3DxT1mwHnJKJkr3TnNCFZbLi4y4cLNnFOpkml0WXoWp2znOr3-9bohOq-UqUF7vigN1fls3lvqzJ2hhPiTFY85GkAgfFkcH7zZz6Kj_VGHQPlE_M5p7fZfSgOP8_2EvumhOMRSJlVB4cIMG1oOFxsDDYUf_f05tohstFHIwQvkjkbF3ae1IlFMuSc-AWvflClaIvOP7IDVARAlULrQ0RstksTBeCy043U",
        "X-Request-Origin": "connectmazjid-portal",
      },
      baseURL: "https://dev.api.connectmazjid.com/api/v2",
      method: "get",
      url: "/masjid/get-masjid-by-id/64df7804c2d7bcd9f0dac1e7",
    },
    request: {},
  };

  const timingsData = {
    data: {
      data: [
        {
          _id: "66826f9a372782b546e3bcb1",
          date: generateFutureDate(4) + "T05:00:00.000Z",
          timings: [
            {
              namazName: "Fajr",
              type: 1,
              azaanTime: 1720173600,
              jamaatTime: 1720173600,
              _id: "66826f9a372782b546e3bcb2",
            },
            {
              namazName: "Dhur",
              type: 2,
              azaanTime: 1720204260,
              jamaatTime: 1720204260,
              _id: "66826f9a372782b546e3bcb3",
            },
            {
              namazName: "Asar",
              type: 3,
              azaanTime: 1720222140,
              jamaatTime: 1720222140,
              _id: "66826f9a372782b546e3bcb4",
            },
            {
              namazName: "Maghrib",
              type: 4,
              azaanTime: 1720229940,
              jamaatTime: 1720229940,
              _id: "66826f9a372782b546e3bcb5",
            },
            {
              namazName: "Isha",
              type: 5,
              azaanTime: 1720234860,
              jamaatTime: 1720234860,
              _id: "66826f9a372782b546e3bcb6",
            },
          ],
          prayerType: "Manual",
          prayerMethod: "2",
        },
        {
          _id: "66826fe8372782b546e3bcf5",
          date: generateFutureDate(8) + "T05:00:00.000Z",
          timings: [
            {
              namazName: "Fajr",
              type: 1,
              azaanTime: 1720086120,
              jamaatTime: 1720087200,
              _id: "66826fe8372782b546e3bcf6",
            },
            {
              namazName: "Dhur",
              type: 2,
              azaanTime: 1720117860,
              jamaatTime: 1720117860,
              _id: "66826fe8372782b546e3bcf7",
            },
            {
              namazName: "Asar",
              type: 3,
              azaanTime: 1720135740,
              jamaatTime: 1720135740,
              _id: "66826fe8372782b546e3bcf8",
            },
            {
              namazName: "Maghrib",
              type: 4,
              azaanTime: 1720143540,
              jamaatTime: 1720143540,
              _id: "66826fe8372782b546e3bcf9",
            },
            {
              namazName: "Isha",
              type: 5,
              azaanTime: 1720149420,
              jamaatTime: 1720148460,
              _id: "66826fe8372782b546e3bcfa",
            },
          ],
          prayerType: "Maliki/Shafi'i/Hanbali",
          prayerMethod: "2",
        },
        {
          _id: "66826fe8372782b546e3bcfc",
          date: generateFutureDate(5) + "T05:00:00.000Z",
          timings: [
            {
              namazName: "Fajr",
              type: 1,
              azaanTime: 1720172580,
              jamaatTime: 1720173600,
              _id: "66826fe8372782b546e3bcfd",
            },
            {
              namazName: "Dhur",
              type: 2,
              azaanTime: 1720204260,
              jamaatTime: 1720204260,
              _id: "66826fe8372782b546e3bcfe",
            },
            {
              namazName: "Asar",
              type: 3,
              azaanTime: 1720222200,
              jamaatTime: 1720222140,
              _id: "66826fe8372782b546e3bcff",
            },
            {
              namazName: "Maghrib",
              type: 4,
              azaanTime: 1720229940,
              jamaatTime: 1720229940,
              _id: "66826fe8372782b546e3bd00",
            },
            {
              namazName: "Isha",
              type: 5,
              azaanTime: 1720235820,
              jamaatTime: 1720234860,
              _id: "66826fe8372782b546e3bd01",
            },
          ],
          prayerType: "Maliki/Shafi'i/Hanbali",
          prayerMethod: "2",
        },
      ],
      meta: { total: 3 },
      success: true,
      message: "Fetched",
    },
    status: 200,
    statusText: "OK",
    headers: {
      "content-length": "2121",
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
          "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTk3NTAyNDQsImV4cCI6MTcyMDAwOTQ0NH0.N0NksBDTM-9N9cVZdhkEHIFBU9o7AU5Nvd7_18Pyj5N8yxzr2qUIpJyQJuhEeeQID5s3II-ELnk4_N3rKTtLGJBjbtZJDnqz-kr_VesY1PUkKwdNdt-Hi2Zwr1eKNnxQBBL4xuZcFLN3CxADXeZoTjwUEqRivv8Ocnsv9kvXxHtnMayzttPNeFb6kcrUJ8OMTAVW0oeccMDAVLaNFrsCQ1kyq5vA0DLZ0F4Xu--rr4mRJ2-I1TYNyDcDdCmnKzuzmeW1Sb1iRWe798N8PPqO16LNET2sDg7ykWnzi6Nvv4eFeMnC2kz2KbRWGZKgyAzAJHgiNRgnqSS2mORX8CgfUYP7-bjOxr2gQd-fQhHuxURInj8OukcdXZsqYmORR55EOqkG1fLlmxAR01nvJRnIJ5YKaBBkou88W_lVbUToiuf_jWVb4MOn_mfJea-caUd_lC0pAZx6aQ2c0Ac1utPOVIlhzlo2GN72iOVVKngvHHOcgG6mAReBkBYpKNZeyFTUn93p6Iye4AY4gQHdF3O5Rgys9P5gokHREWzcd0_oNJnoz-XYQINLkKI_9Ay7PHtWrRnYMpuX69sqMUTnseao8F8fitQeZo5GFS2ZVvPyR6ttcTPX2f6hUuK3dE2L9cpHvTpwQ5MauJumrWdf1mkeSqA1WEjX8casjW8leVIOW2o",
        "X-Request-Origin": "connectmazjid-portal",
      },
      baseURL: "https://dev.api.connectmazjid.com/api/v2",
      params: {
        startDate: "2024-07-01T00:00:00.000Z",
        endDate: "2024-12-31T23:59:59.999Z",
      },
      method: "get",
      url: "/timing/get-timing-by-date-range/64df7804c2d7bcd9f0dac1e7",
    },
    request: {},
  };
  const noTimingsData = { data: { data: [] }, status: 200 };
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        AdminMasjid: {},
        admin: { role: "admin", masjids: ["64df7804c2d7bcd9f0dac1e7"] },
        selectedDate: ["2024-07-01"],
      })
    );

    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    (API.getTimingByDateRange as jest.Mock).mockResolvedValue(timingsData);
    //   (HelperFunction.UtcDateConverter as jest.Mock).mockImplementation((date, timezone) => date);
    //   (HelperFunction.LocationBasedToday as jest.Mock).mockImplementation((timezone) => new Date());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders without crashing", () => {
    renderWithProviders(
      <MobileViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );
    expect(screen.getByText("Salah Timings")).toBeInTheDocument();
  });

  test("fetches masjid data on mount", async () => {
    renderWithProviders(
      <MobileViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      expect(API.fetchMasjidById).toHaveBeenCalledWith(
        "64df7804c2d7bcd9f0dac1e7"
      );
    });
  });

  test("fetches timings data on mount", async () => {
    renderWithProviders(
      <MobileViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      expect(API.getTimingByDateRange).toHaveBeenCalled();
    });
  });

  test("displays loader while fetching data", async () => {
    renderWithProviders(
      <MobileViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );
    await waitFor(() => {
      expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
    });
  });

  test("displays calendar after data is loaded", async () => {
    renderWithProviders(
      <MobileViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      expect(screen.getByText("Salah Timings")).toBeInTheDocument();
      expect(screen.getByTestId("right-calendar")).toBeInTheDocument();
      expect(screen.getAllByText("Fajr").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Dhur").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Asar").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Maghrib").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Isha").length).toBeGreaterThan(0);
    });
  });

  test("handles single date click correctly", async () => {
    renderWithProviders(
      <MobileViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      expect(API.getTimingByDateRange).toHaveBeenCalled();
    });

    expect(screen.getByTestId("circular-progress")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("circular-progress")).not.toBeInTheDocument();

      // Assuming 15th is available in the calendar
    });
    //using 5th date because a date which doesnt have prayers cannot be selected.
    let selectingDay = parseInt(generateFutureDate(5).split("-")[2]).toString();
    let dateCell = screen.getAllByText(selectingDay)[0]; //quick fix
    fireEvent.click(dateCell);
    const dateRegex = new RegExp(`\\b\\w{3}, ${selectingDay} \\w+, \\d{4}\\b`);
    await waitFor(() => {
      expect(screen.getByText(dateRegex)).toBeInTheDocument();
    });
    //   console.log(prettyDOM(screen.getByTestId('root'), 30000));
  });

  test('displays the NamajTimings component when "Add Salah Timings" button is clicked', async () => {
    renderWithProviders(
      <MobileViewCalender consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      expect(API.getTimingByDateRange).toHaveBeenCalled();
    });
    let addButton;

    await waitFor(() => {
      addButton = screen.getByText("Add Salah Timings");
    });

    fireEvent.click(addButton);

    //   await waitFor(() => {
    expect(
      screen.getAllByText(/Please Select Date for Salah Timing/i).length
    ).toBeGreaterThan(0); // Assuming this text appears in NamajTimings component
    //   });
  });
});
