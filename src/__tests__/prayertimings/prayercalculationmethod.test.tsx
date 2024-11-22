import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  prettyDOM,
} from "@testing-library/react";
import { vi } from "vitest";
import PrayerCalculationMethod from "../../v1/components/MobileViewComponents/NamazTIming/PrayerCalculationMethod";
import * as API from "../../v1/api-calls/index";
import ConfirmationModal from "../../v1/components/MobileViewComponents/NamazTIming/ConfirmationModal";
import * as helper from "../../v1/PrayerCalculation/Adhan";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@mui/material";
import Theme from "../../v1/components/Theme/Theme";
import Store from "../../v1/redux/store";
import DateFnsUtils from "@date-io/date-fns";
import toast from "react-hot-toast";
vi.mock("react-hot-toast", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    error: vi.fn(),
    success: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  };
});
// vi.mock("react-hot-toast", () => ({
//   __esModule: true,
//   default: {

//   },
// }));

const mockPrayerMethods = [
  { id: 1, name: "Method 1" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 3, name: "Method 3" },
];

const mockMasjid = {
  masjidName: "test Masjid Of  Chicago.",
  masjidProfilePhoto:
    "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/11e68f2b-2d1f-4999-8b05-ebc0b8659a7d.jpg",
  masjidPhotos: [
    {
      _id: "66912ec3372782b54609ab6b",
      url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/fe40514a-1571-4d53-a9bd-18d17c1b4cc4.jpg",
    },
    {
      _id: "66951cb6372782b54609fc5e",
      url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/b207ed25-c885-43b6-84d0-4f579e2852d7.jpg",
    },
  ],
  description:
    "this is the description of test masjid1. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ",
  address: "4700 14th St, Plano, TX 75074, USA",
  location: { coordinates: [-96.6490745, 33.010232] },
  contact: "+018525270621",
  externalLinks: [
    {
      name: "Facebook",
      url: "www.facebook.com/testMasjid1OfChicago1",
      _id: "669e9b61f98fb0fa50bfbf99",
    },
    { name: "Website", url: "www.test1.com", _id: "669e9b61f98fb0fa50bfbf9a" },
  ],
  updatedAt: "2024-08-07T13:12:47.334Z",
  isAssigned: true,
  updatedBy: null,
  lastEditor: {
    _id: "666076e60ad4a2ecf42c1be0",
    name: "Mirza Akeel",
    role: "musaliadmin",
  },
  assignedUser: { _id: "666076e60ad4a2ecf42c1be0", name: "Mirza Akeel" },
};

describe("PrayerCalculationMethod", () => {
  let originalLocalStorage: any;

  let selectedMethod = {
    id: 2,
    name: "Islamic Society of North America (ISNA)",
  };
  const setSelectedMethod = vi.fn().mockImplementation((selected) => {
    console.log("selecting the method", selected);
    selectedMethod = selected;
  });
  const setIsMethodChanged = vi.fn();
  const setSelectedAsrMethod = vi.fn();
  const selectedAsrMethod = "Hanafi";
  const selectedStartDate = "2024-01-01";
  const fajartiming = { azaanTime: "05:00" };

  const renderComponent = () =>
    render(
      <Provider store={Store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={Theme}>
            <PrayerCalculationMethod
              setSelectedMethod={setSelectedMethod}
              setIsMethodChanged={setIsMethodChanged}
              selectedMethod={selectedMethod}
              setSelectedAsrMethod={setSelectedAsrMethod}
              selectedAsrMethod={selectedAsrMethod}
              masjid={mockMasjid}
              selectedStartDate={selectedStartDate}
              fajartiming={fajartiming}
              tZone="America/Chicago"
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    );

  // const July5th={"data":{"code":200,"status":"OK","data":{"timings":{"Fajr":"04:32","Sunrise":"06:23","Dhuhr":"13:31","Asr":"17:14","Sunset":"20:39","Maghrib":"20:39","Isha":"22:17","Imsak":"04:22","Midnight":"01:31","Firstthird":"23:54","Lastthird":"03:09"},"date":{"readable":"05 Jul 2005","timestamp":"1120564800","hijri":{"date":"28-05-1426","format":"DD-MM-YYYY","day":"28","weekday":{"en":"Al Thalaata","ar":"الثلاثاء"},"month":{"number":5,"en":"Jumādá al-ūlá","ar":"جُمادى الأولى"},"year":"1426","designation":{"abbreviated":"AH","expanded":"Anno Hegirae"},"holidays":[]},"gregorian":{"date":"05-07-2005","format":"DD-MM-YYYY","day":"05","weekday":{"en":"Tuesday"},"month":{"number":7,"en":"July"},"year":"2005","designation":{"abbreviated":"AD","expanded":"Anno Domini"}}},"meta":{"latitude":33.012537,"longitude":-96.647386,"timezone":"America/Chicago","method":{"id":5,"name":"Egyptian General Authority of Survey","params":{"Fajr":19.5,"Isha":17.5},"location":{"latitude":30.0444196,"longitude":31.2357116}},"latitudeAdjustmentMethod":"ANGLE_BASED","midnightMode":"STANDARD","school":"STANDARD","offset":{"Imsak":0,"Fajr":0,"Sunrise":0,"Dhuhr":0,"Asr":0,"Maghrib":0,"Sunset":0,"Isha":0,"Midnight":0}}}},"status":200,"statusText":"","headers":{"access-control-allow-credentials":"true","access-control-allow-headers":"Authorization, origin, if-none-match","access-control-allow-methods":"GET, POST, PUT, DELETE, PATCH, OPTIONS","access-control-allow-origin":"*","access-control-expose-headers":"*","cache-control":"public,max-age=3600","content-type":"application/json","date":"Fri, 05 Jul 2024 08:48:28 GMT","etag":"cb4d4f417823972f4a597953b86083f9","ratelimit-limit":"24","ratelimit-remaining":"23","ratelimit-reset":"1","server":"Unit/1.32.1","via":"kong/3.4.2","x-cache-key":"f5999318e67507e73a1f8b8eb9a21836eac1e9ae1b0894cf23678376fedc4029","x-cache-status":"Miss","x-kong-proxy-latency":"0","x-kong-upstream-latency":"13","x-ratelimit-limit-second":"24","x-ratelimit-remaining-second":"23"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"adapter":["xhr","http"],"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{},"headers":{"Accept":"application/json, text/plain, */*"},"params":{"address":"4700 14th St, Plano, TX 75074, USA","school":0,"method":5},"method":"get","url":"https://api.aladhan.com/v1/timingsByAddress/2024-07-05"},"request":{}}
  // const july={
  //   ok: true,
  //   json: async () => ({
  //     data: {
  //       1: { id: 1, name: 'Method 1' },
  //       2: { id: 2, name: 'Islamic Society of North America (ISNA)' },
  //       3: { id: 3, name: 'Method 3' },
  //     },
  //   }),
  // };
  beforeEach(() => {
    vi.clearAllMocks();

    originalLocalStorage = { ...global.localStorage };

    global.localStorage.setItem = vi.fn();
    global.localStorage.getItem = vi.fn();
    global.localStorage.removeItem = vi.fn();
    global.localStorage.clear = vi.fn();
  });
  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });
  test("test1", () => {});
  //   test('renders the component', async () => {
  //     renderComponent();
  //     await waitFor(() => expect(screen.getByText('Prayer Calculation Methods')).toBeInTheDocument());
  //   });

  // test("fetches and displays prayer methods", async () => {
  //   const fetchPrayerMethodsWithTimeSpy = vi.spyOn(
  //     helper,
  //     "fetchPrayerMethodsWithTime"
  //   );
  //   renderComponent();

  //   expect(fetchPrayerMethodsWithTimeSpy).toHaveBeenCalled();

  //   // fireEvent.click(screen.getByTestId("my-custom-btn"));
  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/Islamic Society of North America \(ISNA\)/i)
  //     ).toBeInTheDocument();
  //   });

  //   // fireEvent.click(screen.getByTestId("editBtn"));
  //   await waitFor(() => {
  //     // expect(screen.getByText('Muslim World League')).toBeInTheDocument();
  //     expect(screen.getAllByTestId("method-card").length).toBe(12);
  //   });
  //   // expect(screen.getByText('Method 3')).toBeInTheDocument();
  // });

  // test("opens and closes the modal", async () => {
  //   renderComponent();
  //   fireEvent.click(screen.getByTestId("my-custom-btn"));
  //   expect(screen.getByText("Search by method name")).toBeInTheDocument();

  //   fireEvent.click(screen.getByText("Cancel"));
  //   await waitFor(() => {
  //     expect(
  //       screen.queryByText("Search by method name")
  //     ).not.toBeInTheDocument();
  //   });
  // });

  // test("selects a prayer method and opens confirmation modal", async () => {
  //   renderComponent();
  //   fireEvent.click(screen.getByTestId("my-custom-btn"));
  //   await waitFor(() =>
  //     expect(screen.getAllByTestId("method-card").length).toBe(12)
  //   );

  //   fireEvent.click(screen.getAllByTestId("method-card")[0]);
  //   expect(setSelectedMethod).toHaveBeenCalledWith(
  //     expect.objectContaining({ name: "Muslim World League" })
  //   );

  //   fireEvent.click(screen.getByText("Save"));
  //   await waitFor(() => {
  //     expect(screen.getByTestId("confmodal")).toBeInTheDocument();
  //   });
  // });

  // test("saves the selected method and updates state", async () => {
  //   const deleteAPI = vi.spyOn(API, "deletingAllTimingsByDateRange");
  //   renderComponent();
  //   fireEvent.click(screen.getByTestId("my-custom-btn"));
  //   await waitFor(() =>
  //     expect(screen.getAllByTestId("method-card").length).toBe(12)
  //   );

  //   fireEvent.click(screen.getAllByTestId("method-card")[0]);
  //   fireEvent.click(screen.getByText("Save"));
  //   await waitFor(() => fireEvent.click(screen.getByText("Yes")));
  //   await waitFor(() => fireEvent.click(screen.getByText("Yes")));

  //   await waitFor(() => {
  //     expect(deleteAPI).toHaveBeenCalled();
  //   });
  //   await waitFor(() => {
  //     expect(localStorage.setItem).toHaveBeenCalled();
  //   });

  //   expect(localStorage.setItem).toHaveBeenCalledWith(
  //     "JuristicMethod",
  //     "Hanafi"
  //   );
  //   expect(setIsMethodChanged).toHaveBeenCalledWith(true);
  // });
});
