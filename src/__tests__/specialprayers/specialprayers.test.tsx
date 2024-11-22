import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import OtherSalahComponent from "../../v1/components/MobileViewComponents/OtherSalahComponents/OtherSalahComponent";
import { useAppSelector, useAppThunkDispatch } from "../../v1/redux/hooks";
// import { fetchMasjidById } from '../v1/redux/actions/MasjidActions/fetchMasjidById';
// import { GetSpecialTimingsByMasjidId } from '../v1/redux/actions/SpecialTimingsActions/specialTimingsByMasjidId';
import toast from "react-hot-toast";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Theme from "../../v1/components/Theme/Theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
// import { fetchMasjidById } from '../v1/redux/actions/MasjidActions/fetchMasjidById';
// import { GetSpecialTimingsByMasjidId } from '../v1/redux/actions/SpecialTimingsActions/specialTimingsByMasjidId';
import * as API from "../../v1/ClientApi-Calls/index";
import * as api from "../../v1/api-calls/index";

vi.mock("../../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppSelector: vi.fn()
    //   useAppThunkDispatch: vi.fn(),
    // your mocked methods
  };
});
vi.mock("../../v1/ClientApi-Calls/index", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchMasjidById: vi.fn(),
    specialTimingsByMasjidId: vi.fn()
    // your mocked methods
  };
});

vi.mock("react-hot-toast", () => ({
  error: vi.fn(),
  success: vi.fn(),
  loading: vi.fn(),
  dismiss: vi.fn()
}));

const renderWithProviders = (ui: any) => {
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

describe("OtherSalahComponent", () => {
  // let dispatchMock: any;
  const masjidData = {
    data: {
      data: {
        masjidName: "test Masjid Of  Chicago.",
        masjidProfilePhoto:
          "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg",
        masjidPhotos: [
          {
            _id: "66749174983db7598f07a34d",
            url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/080cf8a0-7c38-4c84-a327-b44aa3ecea89.jpg"
          },
          {
            _id: "6674917b983db7598f07a356",
            url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/48ca13d5-e507-4139-b4d7-c643727874a7.jpg"
          }
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
            _id: "667aa68dc49b5cc3e9402d8f"
          },
          {
            name: "Website",
            url: "www.test1.com",
            _id: "667aa68dc49b5cc3e9402d90"
          }
        ],
        updatedAt: "2024-06-27T12:05:25.534Z",
        isAssigned: true,
        updatedBy: null,
        lastEditor: {
          _id: "666076e60ad4a2ecf42c1be0",
          name: "Mirza Akeel",
          role: "musaliadmin"
        },
        assignedUser: { _id: "666076e60ad4a2ecf42c1be0", name: "Mirza Akeel" }
      },
      message: "Success",
      count: 1,
      success: true
    },
    status: 200,
    statusText: "OK",
    headers: {
      "content-length": "1682",
      "content-type": "application/json; charset=utf-8"
    },
    config: {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
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
        "X-Request-Origin": "connectmazjid-portal"
      },
      baseURL: "https://dev.api.connectmazjid.com/api/v2",
      method: "get",
      url: "/masjid/get-masjid-by-id/64df7804c2d7bcd9f0dac1e7"
    },
    request: {}
  };
  const specialPrayerData = {
    data: [
      {
        _id: "6681f07d372782b546e36ce4",
        name: "Jummah 1",
        masjid: "64df7804c2d7bcd9f0dac1e7",
        azaanTime: 1719900000,
        jamaatTime: 1719903600,
        startDate: "2024-07-02T05:00:00.000Z",
        endDate: "2024-07-04T05:00:00.000Z"
      }
    ],
    meta: { total: 1 },
    success: true,
    message: "Fetched"
  };
  beforeEach(() => {
    // (api.getEventsByDateRange as jest.Mock).mockResolvedValue(noEventsData);
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    (API.specialTimingsByMasjidId as jest.Mock).mockResolvedValue(
      specialPrayerData
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders initial state correctly", async () => {
    renderWithProviders(
      <OtherSalahComponent consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    expect(screen.getByText("Other Salah")).toBeInTheDocument();
    expect(screen.getByText("Add Timings")).toBeInTheDocument();

    await waitFor(() => {
      expect(API.fetchMasjidById).toHaveBeenCalled();
      expect(API.specialTimingsByMasjidId).toHaveBeenCalled();
    });
  });

  test("displays no prayer found message when no prayers are available", async () => {
    renderWithProviders(
      <OtherSalahComponent consumerMasjidId="6418878accb079ecb57173b2" />
    );

    await waitFor(() => {
      expect(screen.getByText("No other prayer found")).toBeInTheDocument();
    });
  });

  test("handles add timings button click", async () => {
    renderWithProviders(
      <OtherSalahComponent consumerMasjidId="6418878accb079ecb57173b2" />
    );

    const addButton = screen.getByText("Add Timings");
    fireEvent.click(addButton);

    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Prayer Name")).toBeInTheDocument();
    expect(screen.getByText("Azaan Time (Optional)")).toBeInTheDocument();
    expect(screen.getByText("Iqama Time")).toBeInTheDocument();
  });

  test("fetches and displays the correct number of special timings", async () => {
    renderWithProviders(
      <OtherSalahComponent consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />
    );

    await waitFor(() => {
      expect(screen.getByText("Other Salah")).toBeInTheDocument();
    });

    const OtherSalahCards = screen.getAllByTestId("special-card");
    expect(OtherSalahCards.length).toBe(1);
  });

  test("displays loader while fetching prayers", async () => {
    renderWithProviders(
      <OtherSalahComponent consumerMasjidId="6418878accb079ecb57173b2" />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
