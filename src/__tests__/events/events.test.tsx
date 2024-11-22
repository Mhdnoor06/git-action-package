import React, { useState } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  prettyDOM,
  within,
} from "@testing-library/react";
import { vi } from "vitest";
import Events from "../../v1/components/MobileViewComponents/Events/Events";
import { useAppSelector, useAppThunkDispatch } from "../../v1/redux/hooks";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Theme from "../../v1/components/Theme/Theme";
import { TextField, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import * as API from "../../v1/ClientApi-Calls/index";
import * as api from "../../v1/api-calls/index";
import { customNavigatorTo } from "../../v1/helpers/HelperFunction";
import userEvent from "@testing-library/user-event";
import EventClockTimePicker from "../../v1/components/MobileViewComponents/Shared/EventClockTimePicker";
import MockEventClockTimePicker from "./MockEventClockTimePicker";
import toast from "react-hot-toast";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { MockedProvider } from "@apollo/client/testing";

// vi.mock("../../v1/components/MobileViewComponents/Shared/EventClockTimePicker", async (importOriginal) => {
//   return {
//     EventClockTimePicker: (props) => <MockMobileTimePicker {...props} />,
//   }
// })
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));
// Mock the EventClockTimePicker component
vi.mock(
  "../../v1/components/MobileViewComponents/Shared/EventClockTimePicker",
  () => ({
    __esModule: true,
    default: (props) => <MockEventClockTimePicker {...props} />,
  })
);

vi.mock("../../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppSelector: vi.fn(),
  };
});

vi.mock("../../v1/helpers/HelperFunction", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    customNavigatorTo: vi.fn(),
  };
});

vi.mock("../../v1/api-calls/index", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    updateEvent: vi.fn(),
    addEvent: vi.fn(),
    triggeringEventAnnouncement: vi.fn(),
    deleteMasjidMedia: vi.fn(),
    // your mocked methods
  };
});

vi.mock("../../v1/ClientApi-Calls/index", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchMasjidById: vi.fn(),
    // your mocked methods
  };
});

const renderWithProviders = (ui) => {
  return render(
    <Provider store={Store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={Theme}>
          <BrowserRouter>
            {" "}
            <MockedProvider>{ui}</MockedProvider>
          </BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

describe("Events Component", () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        AdminMasjid: {
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
          updatedAt: "2024-07-03T14:14:14.976Z",
          isAssigned: true,
          updatedBy: null,
          lastEditor: {
            _id: "666076e60ad4a2ecf42c1be0",
            name: "Mirza Akeel",
            role: "musaliadmin",
          },
          assignedUser: {
            _id: "666076e60ad4a2ecf42c1be0",
            name: "Mirza Akeel",
          },
        },
        admin: { role: "admin" },
      })
    );

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string): MediaQueryList => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
        matches: query === "(pointer: fine)",
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  afterEach(() => {
    // delete window.matchMedia;
    vi.clearAllMocks();
  });

  test("renders without crashing", () => {
    (API.fetchMasjidById as jest.Mock).mockResolvedValue({
      data: { data: { masjidName: "Test Masjid" } },
    });
    renderWithProviders(<Events consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />);
    expect(screen.getByText("Create New Event")).toBeInTheDocument();
  });

  // test('fetches masjid data on mount', async () => {
  //   (API.fetchMasjidById as jest.Mock).mockResolvedValue({ data: { data: { masjidName: 'Test Masjid' } } });

  //   renderWithProviders(<Events consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />);

  //   await waitFor(() => {
  //     expect(API.fetchMasjidById).toHaveBeenCalled();
  //   });
  // });

  // test("submits the form and updates the event", async () => {
  //   const formDataSetter = vi.fn();
  //   // check conditions in events.tsx. It only calls fetchMasjidById api if we don't have it in the reduc store but since we are mocking the useSelector we won't be calling fetchMasjidById
  //   // (API.fetchMasjidById as jest.Mock).mockResolvedValue({ data: { data: {"masjidName":"test Masjid Of  Chicago.","masjidProfilePhoto":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg","masjidPhotos":[{"_id":"66749174983db7598f07a34d","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/080cf8a0-7c38-4c84-a327-b44aa3ecea89.jpg"},{"_id":"6674917b983db7598f07a356","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/48ca13d5-e507-4139-b4d7-c643727874a7.jpg"}],"description":"this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ","address":"4700 14th St, Plano, TX 75074, USA","location":{"coordinates":[-96.6490745,33.010232]},"contact":"+0185252706","externalLinks":[{"name":"Facebook","url":"www.facebook1.com/testMasjidOfChicago","_id":"667aa68dc49b5cc3e9402d8f"},{"name":"Website","url":"www.test1.com","_id":"667aa68dc49b5cc3e9402d90"}],"updatedAt":"2024-07-03T14:14:14.976Z","isAssigned":true,"updatedBy":null,"lastEditor":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel","role":"musaliadmin"},"assignedUser":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel"}} } });
  //   (api.updateEvent as jest.Mock).mockResolvedValue({
  //     data: { message: "Event Updated Successfully" },
  //   });
  //   (api.addEvent as jest.Mock).mockResolvedValue({
  //     data: {
  //       data: {
  //         eventName: "wdwd",
  //         masjid: "64df7804c2d7bcd9f0dac1e7",
  //         description: "wsws",
  //         date: "2024-07-17T05:00:00.000Z",
  //         eventProfilePhoto: "",
  //         lastEditor: "666076e60ad4a2ecf42c1be0",
  //         timings: [
  //           {
  //             startTime: 1721196000,
  //             endTime: 1721199600,
  //             _id: "668696d9372782b546eca24f",
  //           },
  //         ],
  //         location: { type: "Point", coordinates: [-96.6490745, 33.010232] },
  //         address: "4700 14th St, Plano, TX 75074, USA",
  //         metaData: {
  //           startDate: "2024-07-17T05:00:00.000Z",
  //           endDate: "2024-07-17T05:00:00.000Z",
  //           recurrenceId: "668696d9372782b546eca24e",
  //           recurrenceType: "None",
  //           recurrenceInterval: 1,
  //         },
  //         isCancelled: false,
  //         capacity: 0,
  //         category: "Islamic Event",
  //         cost: 0,
  //         tickets: [],
  //         _id: "668696d9372782b546eca24e",
  //         createdAt: "2024-07-04T12:34:33.418Z",
  //         updatedAt: "2024-07-04T12:34:33.425Z",
  //         __v: 0,
  //       },
  //       message: "Success",
  //     },
  //     status: 201,
  //     statusText: "Created",
  //     headers: {
  //       "content-length": "786",
  //       "content-type": "application/json; charset=utf-8",
  //     },
  //     config: {
  //       transitional: {
  //         silentJSONParsing: true,
  //         forcedJSONParsing: true,
  //         clarifyTimeoutError: false,
  //       },
  //       adapter: ["xhr", "http"],
  //       transformRequest: [null],
  //       transformResponse: [null],
  //       timeout: 0,
  //       xsrfCookieName: "XSRF-TOKEN",
  //       xsrfHeaderName: "X-XSRF-TOKEN",
  //       maxContentLength: -1,
  //       maxBodyLength: -1,
  //       env: {},
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MjAwODM3MDIsImV4cCI6MTcyMDM0MjkwMn0.Ad2A6wTPXkmQECBKZvFtcmJ-ZumNZLeg3WddGICD4SVWJJ-XRzXzBvr0LOSPvoMj1TGGndh3traezQNqePirXWKP8csmsOCHXlRms_LqW8XG0ZZw5mOF0YaVecJi8ZuBnQJd5Zkl5WRSpfJvh41F_TxmCOTxDYk8tz3Aus6CAWNdr7sPst9vRW6OoNkhjbCNQmba7fapw1Nt1VOYdTmNMuAnkzhb_BqfftXiNb0zjbawXzFe1PNRnVvLWSCdWkISA_WXwFOrt3PuxUA8ao_OrIK3eYs1mIxLThohDyctf55lr9SaEqNyrxCIy4OefFhn339fN8a6jIpEiQhM9RAUcFzs1x8V_BLjPme2cRtjy4SDCOT64w8tKHh5uIx2QDPEPKwJ4hR9XviQAhSQrP0FJjQ9bZJ8Mk8Wpog5GvXoLedh6VOi7H_xMCkWuu6YM3PjrVAxQ19jsiZFCa-Gb78nrxsI-mSh_7xRjYXbfsB2_DTaUBU844aJ_9MC6HgRJ29nq3RqQ0L0c-1JNaTuwCfBsVkUbRKUkrnWVczBBtPF1PvvJ54vjj0jtwuYH0HLLdNxzKSeidl9mjNP0X62RwFFf-exoLu7yXUGgwO7aT6n7U4ScQkxWepW8zfk-fytQXE0MOHD9W5qZmi7AblmkVxvatbpL1nJFUmSTLTvB9PUpxo",
  //       },
  //       baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
  //       method: "post",
  //       url: "/event/64df7804c2d7bcd9f0dac1e7/create",
  //       data: '{"address":"4700 14th St, Plano, TX 75074, USA","description":"wsws","eventName":"wdwd","cost":"0","capacity":0,"category":"Islamic Event","location":{"type":"Point","coordinates":[-96.6490745,33.010232]},"masjidName":"test Masjid Of  Chicago.","metaData":{"startDate":"2024-07-17T05:00:00.000Z","endDate":"2024-07-17T05:00:00.000Z","recurrenceType":"None"},"timings":[{"startTime":1721196000,"endTime":1721199600}]}',
  //     },
  //     request: {},
  //   });
  //   (api.triggeringEventAnnouncement as jest.Mock).mockResolvedValue({
  //     data: {
  //       data: { message: "Notification sent successfully" },
  //       message: "Success",
  //     },
  //   });
  //   renderWithProviders(<Events consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />);

  //   fireEvent.change(screen.getByLabelText("Event Name *"), {
  //     target: { value: "New Event" },
  //   });
  //   fireEvent.change(screen.getByTestId("event-category-select"), {
  //     target: { value: "Islamic Event" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Description *"), {
  //     target: { value: "Event Description" },
  //   });
  //   // fireEvent.change(screen.getByPlaceholderText("Enter or select capacity"), {
  //   //   target: { value: 0 },
  //   // });
  //   // fireEvent.change(screen.getByTestId("event-recurrence-type"), {
  //   //   target: { value: "None" },
  //   // });//quick fix
  //   fireEvent.change(screen.getByLabelText("Start Date:"), {
  //     target: { value: "2024-06-29" },
  //   });
  //   fireEvent.change(screen.getByLabelText("End Date:"), {
  //     target: { value: "2024-06-29" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Start Time :"), {
  //     target: { value: "02:00 PM" },
  //   });
  //   expect(screen.getByLabelText("Start Time :")).toHaveValue("02:00 PM");
  //   fireEvent.change(screen.getByLabelText("End Time :"), {
  //     target: { value: "03:00 PM" },
  //   });
  //   expect(screen.getByLabelText("End Time :")).toHaveValue("03:00 PM");
  //   expect(screen.getByText("Add Event")).toBeInTheDocument();
  //   // expect(screen.getByText('Update Event')).toBeInTheDocument();
  //   fireEvent.click(screen.getByText("Add Event"));

  //   await waitFor(() => {
  //     expect(screen.getByText("Add Events")).toBeInTheDocument();
  //   });
  //   fireEvent.click(screen.getByText("Add Events"));
  //   await waitFor(() => {
  //     expect(screen.getByText("Yes")).toBeInTheDocument();
  //     fireEvent.click(screen.getByText("Yes"));
  //   });
  //   await waitFor(() => {
  //     expect(api.addEvent).toHaveBeenCalled();
  //     expect(toast.loading).toHaveBeenCalledWith("Please wait...!");
  //   });
  //   await waitFor(() => {
  //     expect(toast.dismiss).toHaveBeenCalled();
  //     // expect(toast.success).toHaveBeenCalledWith("Event added Successfully");
  //     expect(screen.getByText("Event Added Successfully")).toBeInTheDocument();
  //   });
  // });

  test("capacity is visible after registration is ticked", async () => {
    const formDataSetter = vi.fn();
    // check conditions in events.tsx. It only calls fetchMasjidById api if we don't have it in the reduc store but since we are mocking the useSelector we won't be calling fetchMasjidById
    // (API.fetchMasjidById as jest.Mock).mockResolvedValue({ data: { data: {"masjidName":"test Masjid Of  Chicago.","masjidProfilePhoto":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg","masjidPhotos":[{"_id":"66749174983db7598f07a34d","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/080cf8a0-7c38-4c84-a327-b44aa3ecea89.jpg"},{"_id":"6674917b983db7598f07a356","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/48ca13d5-e507-4139-b4d7-c643727874a7.jpg"}],"description":"this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ","address":"4700 14th St, Plano, TX 75074, USA","location":{"coordinates":[-96.6490745,33.010232]},"contact":"+0185252706","externalLinks":[{"name":"Facebook","url":"www.facebook1.com/testMasjidOfChicago","_id":"667aa68dc49b5cc3e9402d8f"},{"name":"Website","url":"www.test1.com","_id":"667aa68dc49b5cc3e9402d90"}],"updatedAt":"2024-07-03T14:14:14.976Z","isAssigned":true,"updatedBy":null,"lastEditor":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel","role":"musaliadmin"},"assignedUser":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel"}} } });
    (api.updateEvent as jest.Mock).mockResolvedValue({
      data: { message: "Event Updated Successfully" },
    });
    (api.addEvent as jest.Mock).mockResolvedValue({
      data: {
        data: {
          eventName: "wdwd",
          masjid: "64df7804c2d7bcd9f0dac1e7",
          description: "wsws",
          date: "2024-07-17T05:00:00.000Z",
          eventProfilePhoto: "",
          lastEditor: "666076e60ad4a2ecf42c1be0",
          timings: [
            {
              startTime: 1721196000,
              endTime: 1721199600,
              _id: "668696d9372782b546eca24f",
            },
          ],
          location: { type: "Point", coordinates: [-96.6490745, 33.010232] },
          address: "4700 14th St, Plano, TX 75074, USA",
          metaData: {
            startDate: "2024-07-17T05:00:00.000Z",
            endDate: "2024-07-17T05:00:00.000Z",
            recurrenceId: "668696d9372782b546eca24e",
            recurrenceType: "None",
            recurrenceInterval: 1,
          },
          isCancelled: false,
          capacity: 0,
          category: "Islamic Event",
          cost: 0,
          tickets: [],
          _id: "668696d9372782b546eca24e",
          createdAt: "2024-07-04T12:34:33.418Z",
          updatedAt: "2024-07-04T12:34:33.425Z",
          __v: 0,
        },
        message: "Success",
      },
      status: 201,
      statusText: "Created",
      headers: {
        "content-length": "786",
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
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MjAwODM3MDIsImV4cCI6MTcyMDM0MjkwMn0.Ad2A6wTPXkmQECBKZvFtcmJ-ZumNZLeg3WddGICD4SVWJJ-XRzXzBvr0LOSPvoMj1TGGndh3traezQNqePirXWKP8csmsOCHXlRms_LqW8XG0ZZw5mOF0YaVecJi8ZuBnQJd5Zkl5WRSpfJvh41F_TxmCOTxDYk8tz3Aus6CAWNdr7sPst9vRW6OoNkhjbCNQmba7fapw1Nt1VOYdTmNMuAnkzhb_BqfftXiNb0zjbawXzFe1PNRnVvLWSCdWkISA_WXwFOrt3PuxUA8ao_OrIK3eYs1mIxLThohDyctf55lr9SaEqNyrxCIy4OefFhn339fN8a6jIpEiQhM9RAUcFzs1x8V_BLjPme2cRtjy4SDCOT64w8tKHh5uIx2QDPEPKwJ4hR9XviQAhSQrP0FJjQ9bZJ8Mk8Wpog5GvXoLedh6VOi7H_xMCkWuu6YM3PjrVAxQ19jsiZFCa-Gb78nrxsI-mSh_7xRjYXbfsB2_DTaUBU844aJ_9MC6HgRJ29nq3RqQ0L0c-1JNaTuwCfBsVkUbRKUkrnWVczBBtPF1PvvJ54vjj0jtwuYH0HLLdNxzKSeidl9mjNP0X62RwFFf-exoLu7yXUGgwO7aT6n7U4ScQkxWepW8zfk-fytQXE0MOHD9W5qZmi7AblmkVxvatbpL1nJFUmSTLTvB9PUpxo",
        },
        baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
        method: "post",
        url: "/event/64df7804c2d7bcd9f0dac1e7/create",
        data: '{"address":"4700 14th St, Plano, TX 75074, USA","description":"wsws","eventName":"wdwd","cost":"0","capacity":0,"category":"Islamic Event","location":{"type":"Point","coordinates":[-96.6490745,33.010232]},"masjidName":"test Masjid Of  Chicago.","metaData":{"startDate":"2024-07-17T05:00:00.000Z","endDate":"2024-07-17T05:00:00.000Z","recurrenceType":"None"},"timings":[{"startTime":1721196000,"endTime":1721199600}]}',
      },
      request: {},
    });
    (api.triggeringEventAnnouncement as jest.Mock).mockResolvedValue({
      data: {
        data: { message: "Notification sent successfully" },
        message: "Success",
      },
    });
    renderWithProviders(<Events consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />);

    fireEvent.click(screen.getByTestId("reg_checkbox"));

    expect(screen.getByLabelText("Event Capacity:")).toBeInTheDocument();
  });

  test("doesnt submits the form on missing required field and doesnt go to preview page", async () => {
    const formDataSetter = vi.fn();
    const fieldSelectors = [
      { selectorValue: "Event Name *", selector: "label", value: "New Event" },
      // { selectorValue: 'event-category-select', selector:'testid', value: 'Islamic Event'},
      {
        selectorValue: "Description *",
        selector: "label",
        value: "Event Description",
      },
      {
        selectorValue: "Event Capacity:",
        selector: "label",
        value: 0,
      },
      // { selectorValue: 'event-recurrence-type', selector:'testid',value: 'None' },
      { selectorValue: "Start Date:", selector: "label", value: "2024-06-29" },
      { selectorValue: "End Date:", selector: "label", value: "2024-06-29" },
      { selectorValue: "Start Time :", selector: "label", value: "02:00 PM" },
      { selectorValue: "End Time :", selector: "label", value: "03:00 PM" },
    ];

    // check conditions in events.tsx. It only calls fetchMasjidById api if we don't have it in the reduc store but since we are mocking the useSelector we won't be calling fetchMasjidById
    // (API.fetchMasjidById as jest.Mock).mockResolvedValue({ data: { data: {"masjidName":"test Masjid Of  Chicago.","masjidProfilePhoto":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg","masjidPhotos":[{"_id":"66749174983db7598f07a34d","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/080cf8a0-7c38-4c84-a327-b44aa3ecea89.jpg"},{"_id":"6674917b983db7598f07a356","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/48ca13d5-e507-4139-b4d7-c643727874a7.jpg"}],"description":"this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ","address":"4700 14th St, Plano, TX 75074, USA","location":{"coordinates":[-96.6490745,33.010232]},"contact":"+0185252706","externalLinks":[{"name":"Facebook","url":"www.facebook1.com/testMasjidOfChicago","_id":"667aa68dc49b5cc3e9402d8f"},{"name":"Website","url":"www.test1.com","_id":"667aa68dc49b5cc3e9402d90"}],"updatedAt":"2024-07-03T14:14:14.976Z","isAssigned":true,"updatedBy":null,"lastEditor":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel","role":"musaliadmin"},"assignedUser":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel"}} } });
    (api.updateEvent as jest.Mock).mockResolvedValue({
      data: { message: "Event Updated Successfully" },
    });
    (api.addEvent as jest.Mock).mockResolvedValue({
      data: {
        data: {
          eventName: "wdwd",
          masjid: "64df7804c2d7bcd9f0dac1e7",
          description: "wsws",
          date: "2024-07-17T05:00:00.000Z",
          eventProfilePhoto: "",
          lastEditor: "666076e60ad4a2ecf42c1be0",
          timings: [
            {
              startTime: 1721196000,
              endTime: 1721199600,
              _id: "668696d9372782b546eca24f",
            },
          ],
          location: { type: "Point", coordinates: [-96.6490745, 33.010232] },
          address: "4700 14th St, Plano, TX 75074, USA",
          metaData: {
            startDate: "2024-07-17T05:00:00.000Z",
            endDate: "2024-07-17T05:00:00.000Z",
            recurrenceId: "668696d9372782b546eca24e",
            recurrenceType: "None",
            recurrenceInterval: 1,
          },
          isCancelled: false,
          capacity: 0,
          category: "Islamic Event",
          cost: 0,
          tickets: [],
          _id: "668696d9372782b546eca24e",
          createdAt: "2024-07-04T12:34:33.418Z",
          updatedAt: "2024-07-04T12:34:33.425Z",
          __v: 0,
        },
        message: "Success",
      },
      status: 201,
      statusText: "Created",
      headers: {
        "content-length": "786",
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
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MjAwODM3MDIsImV4cCI6MTcyMDM0MjkwMn0.Ad2A6wTPXkmQECBKZvFtcmJ-ZumNZLeg3WddGICD4SVWJJ-XRzXzBvr0LOSPvoMj1TGGndh3traezQNqePirXWKP8csmsOCHXlRms_LqW8XG0ZZw5mOF0YaVecJi8ZuBnQJd5Zkl5WRSpfJvh41F_TxmCOTxDYk8tz3Aus6CAWNdr7sPst9vRW6OoNkhjbCNQmba7fapw1Nt1VOYdTmNMuAnkzhb_BqfftXiNb0zjbawXzFe1PNRnVvLWSCdWkISA_WXwFOrt3PuxUA8ao_OrIK3eYs1mIxLThohDyctf55lr9SaEqNyrxCIy4OefFhn339fN8a6jIpEiQhM9RAUcFzs1x8V_BLjPme2cRtjy4SDCOT64w8tKHh5uIx2QDPEPKwJ4hR9XviQAhSQrP0FJjQ9bZJ8Mk8Wpog5GvXoLedh6VOi7H_xMCkWuu6YM3PjrVAxQ19jsiZFCa-Gb78nrxsI-mSh_7xRjYXbfsB2_DTaUBU844aJ_9MC6HgRJ29nq3RqQ0L0c-1JNaTuwCfBsVkUbRKUkrnWVczBBtPF1PvvJ54vjj0jtwuYH0HLLdNxzKSeidl9mjNP0X62RwFFf-exoLu7yXUGgwO7aT6n7U4ScQkxWepW8zfk-fytQXE0MOHD9W5qZmi7AblmkVxvatbpL1nJFUmSTLTvB9PUpxo",
        },
        baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
        method: "post",
        url: "/event/64df7804c2d7bcd9f0dac1e7/create",
        data: '{"address":"4700 14th St, Plano, TX 75074, USA","description":"wsws","eventName":"wdwd","cost":"0","capacity":0,"category":"Islamic Event","location":{"type":"Point","coordinates":[-96.6490745,33.010232]},"masjidName":"test Masjid Of  Chicago.","metaData":{"startDate":"2024-07-17T05:00:00.000Z","endDate":"2024-07-17T05:00:00.000Z","recurrenceType":"None"},"timings":[{"startTime":1721196000,"endTime":1721199600}]}',
      },
      request: {},
    });
    (api.triggeringEventAnnouncement as jest.Mock).mockResolvedValue({
      data: {
        data: { message: "Notification sent successfully" },
        message: "Success",
      },
    });
    renderWithProviders(<Events consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />);

    fireEvent.change(screen.getByLabelText("Event Name *"), {
      target: { value: "New Event" },
    });
    // fireEvent.change(screen.getByTestId('event-category-select'), { target: { value: 'Islamic Event' } });
    fireEvent.change(screen.getByLabelText("Description *"), {
      target: { value: "Event Description" },
    });
    fireEvent.click(screen.getByTestId("reg_checkbox"));

    await waitFor(() => {
      expect(screen.getByLabelText("Event Capacity:")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Event Capacity:"), {
        target: { value: 0 },
      });
    });

    // fireEvent.change(screen.getByTestId('event-recurrence-type'), { target: { value: 'None' } });
    fireEvent.change(screen.getByLabelText("Start Date:"), {
      target: { value: "2024-06-29" },
    });
    fireEvent.change(screen.getByLabelText("End Date:"), {
      target: { value: "2024-06-29" },
    });
    fireEvent.change(screen.getByLabelText("Start Time :"), {
      target: { value: "02:00 PM" },
    });
    fireEvent.change(screen.getByLabelText("End Time :"), {
      target: { value: "03:00 PM" },
    });

    for (const field of fieldSelectors) {
      // Clear the field
      console.log("field", field);
      let input =
        field.selector === "label"
          ? screen.getByLabelText(field.selectorValue)
          : field.selector === "placeholder"
          ? screen.getByPlaceholderText(field.selectorValue)
          : screen.getByTestId(field.selectorValue);
      fireEvent.change(input, { target: { value: "" } });

      // Attempt to submit the form
      fireEvent.click(screen.getByText("Add Event"));

      // Check for the toast error and absence of "Add Events" button
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          "Please fill in all required fields before previewing."
        );
        expect(screen.queryByText("Add Events")).not.toBeInTheDocument();
      });

      fireEvent.change(input, { target: { value: field.value } });
    }
  });

  // test("shows error message on update failure", async () => {
  //   const formDataSetter = vi.fn();
  //   // check conditions in events.tsx. It only calls fetchMasjidById api if we don't have it in the reduc store but since we are mocking the useSelector we won't be calling fetchMasjidById
  //   // (API.fetchMasjidById as jest.Mock).mockResolvedValue({ data: { data: {"masjidName":"test Masjid Of  Chicago.","masjidProfilePhoto":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg","masjidPhotos":[{"_id":"66749174983db7598f07a34d","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/080cf8a0-7c38-4c84-a327-b44aa3ecea89.jpg"},{"_id":"6674917b983db7598f07a356","url":"https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/48ca13d5-e507-4139-b4d7-c643727874a7.jpg"}],"description":"this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ","address":"4700 14th St, Plano, TX 75074, USA","location":{"coordinates":[-96.6490745,33.010232]},"contact":"+0185252706","externalLinks":[{"name":"Facebook","url":"www.facebook1.com/testMasjidOfChicago","_id":"667aa68dc49b5cc3e9402d8f"},{"name":"Website","url":"www.test1.com","_id":"667aa68dc49b5cc3e9402d90"}],"updatedAt":"2024-07-03T14:14:14.976Z","isAssigned":true,"updatedBy":null,"lastEditor":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel","role":"musaliadmin"},"assignedUser":{"_id":"666076e60ad4a2ecf42c1be0","name":"Mirza Akeel"}} } });
  //   // (api.updateEvent as jest.Mock).mockImplementation(()=>{})
  //   (api.addEvent as jest.Mock).mockResolvedValue({
  //     data: {
  //       data: {
  //         eventName: "wdwd",
  //         masjid: "64df7804c2d7bcd9f0dac1e7",
  //         description: "wsws",
  //         date: "2024-07-17T05:00:00.000Z",
  //         eventProfilePhoto: "",
  //         lastEditor: "666076e60ad4a2ecf42c1be0",
  //         timings: [
  //           {
  //             startTime: 1721196000,
  //             endTime: 1721199600,
  //             _id: "668696d9372782b546eca24f",
  //           },
  //         ],
  //         location: { type: "Point", coordinates: [-96.6490745, 33.010232] },
  //         address: "4700 14th St, Plano, TX 75074, USA",
  //         metaData: {
  //           startDate: "2024-07-17T05:00:00.000Z",
  //           endDate: "2024-07-17T05:00:00.000Z",
  //           recurrenceId: "668696d9372782b546eca24e",
  //           recurrenceType: "None",
  //           recurrenceInterval: 1,
  //         },
  //         isCancelled: false,
  //         capacity: 0,
  //         category: "Islamic Event",
  //         cost: 0,
  //         tickets: [],
  //         _id: "668696d9372782b546eca24e",
  //         createdAt: "2024-07-04T12:34:33.418Z",
  //         updatedAt: "2024-07-04T12:34:33.425Z",
  //         __v: 0,
  //       },
  //       message: "Success",
  //     },
  //     status: 201,
  //     statusText: "Created",
  //     headers: {
  //       "content-length": "786",
  //       "content-type": "application/json; charset=utf-8",
  //     },
  //     config: {
  //       transitional: {
  //         silentJSONParsing: true,
  //         forcedJSONParsing: true,
  //         clarifyTimeoutError: false,
  //       },
  //       adapter: ["xhr", "http"],
  //       transformRequest: [null],
  //       transformResponse: [null],
  //       timeout: 0,
  //       xsrfCookieName: "XSRF-TOKEN",
  //       xsrfHeaderName: "X-XSRF-TOKEN",
  //       maxContentLength: -1,
  //       maxBodyLength: -1,
  //       env: {},
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MjAwODM3MDIsImV4cCI6MTcyMDM0MjkwMn0.Ad2A6wTPXkmQECBKZvFtcmJ-ZumNZLeg3WddGICD4SVWJJ-XRzXzBvr0LOSPvoMj1TGGndh3traezQNqePirXWKP8csmsOCHXlRms_LqW8XG0ZZw5mOF0YaVecJi8ZuBnQJd5Zkl5WRSpfJvh41F_TxmCOTxDYk8tz3Aus6CAWNdr7sPst9vRW6OoNkhjbCNQmba7fapw1Nt1VOYdTmNMuAnkzhb_BqfftXiNb0zjbawXzFe1PNRnVvLWSCdWkISA_WXwFOrt3PuxUA8ao_OrIK3eYs1mIxLThohDyctf55lr9SaEqNyrxCIy4OefFhn339fN8a6jIpEiQhM9RAUcFzs1x8V_BLjPme2cRtjy4SDCOT64w8tKHh5uIx2QDPEPKwJ4hR9XviQAhSQrP0FJjQ9bZJ8Mk8Wpog5GvXoLedh6VOi7H_xMCkWuu6YM3PjrVAxQ19jsiZFCa-Gb78nrxsI-mSh_7xRjYXbfsB2_DTaUBU844aJ_9MC6HgRJ29nq3RqQ0L0c-1JNaTuwCfBsVkUbRKUkrnWVczBBtPF1PvvJ54vjj0jtwuYH0HLLdNxzKSeidl9mjNP0X62RwFFf-exoLu7yXUGgwO7aT6n7U4ScQkxWepW8zfk-fytQXE0MOHD9W5qZmi7AblmkVxvatbpL1nJFUmSTLTvB9PUpxo",
  //       },
  //       baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
  //       method: "post",
  //       url: "/event/64df7804c2d7bcd9f0dac1e7/create",
  //       data: '{"address":"4700 14th St, Plano, TX 75074, USA","description":"wsws","eventName":"wdwd","cost":"0","capacity":0,"category":"Islamic Event","location":{"type":"Point","coordinates":[-96.6490745,33.010232]},"masjidName":"test Masjid Of  Chicago.","metaData":{"startDate":"2024-07-17T05:00:00.000Z","endDate":"2024-07-17T05:00:00.000Z","recurrenceType":"None"},"timings":[{"startTime":1721196000,"endTime":1721199600}]}',
  //     },
  //     request: {},
  //   });
  //   (api.triggeringEventAnnouncement as jest.Mock).mockImplementation(() => {
  //     return new Error("mock error");
  //   });
  //   // (api.triggeringEventAnnouncement as jest.Mock).mockResolvedValue({"data":{"data":{"message":"Notification sent successfully"},"message":"Success"}});
  //   renderWithProviders(<Events consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />);

  //   fireEvent.change(screen.getByLabelText("Event Name *"), {
  //     target: { value: "New Event" },
  //   });
  //   fireEvent.change(screen.getByTestId("event-category-select"), {
  //     target: { value: "Islamic Event" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Description *"), {
  //     target: { value: "Event Description" },
  //   });
  //   fireEvent.click(screen.getByTestId("reg_checkbox"));

  //   fireEvent.change(screen.getByLabelText("Event Capacity:"), {
  //     target: { value: 0 },
  //   });
  //   // fireEvent.change(screen.getByTestId("event-recurrence-type"), {
  //   //   target: { value: "None" },
  //   // }); // quickfix
  //   fireEvent.change(screen.getByLabelText("Start Date:"), {
  //     target: { value: "2024-06-29" },
  //   });
  //   fireEvent.change(screen.getByLabelText("End Date:"), {
  //     target: { value: "2024-06-29" },
  //   });
  //   fireEvent.change(screen.getByLabelText("Start Time :"), {
  //     target: { value: "02:00 PM" },
  //   });
  //   expect(screen.getByLabelText("Start Time :")).toHaveValue("02:00 PM");
  //   fireEvent.change(screen.getByLabelText("End Time :"), {
  //     target: { value: "03:00 PM" },
  //   });
  //   expect(screen.getByLabelText("End Time :")).toHaveValue("03:00 PM");
  //   expect(screen.getByText("Add Event")).toBeInTheDocument();
  //   // expect(screen.getByText('Update Event')).toBeInTheDocument();
  //   fireEvent.click(screen.getByText("Add Event"));

  //   await waitFor(() => {
  //     expect(screen.getByText("Add Events")).toBeInTheDocument();
  //   });
  //   fireEvent.click(screen.getByText("Add Events"));
  //   await waitFor(() => {
  //     expect(screen.getByText("Yes")).toBeInTheDocument();
  //     fireEvent.click(screen.getByText("Yes"));
  //   });
  //   await waitFor(() => {
  //     expect(api.addEvent).toHaveBeenCalled();
  //     expect(toast.loading).toHaveBeenCalledWith("Please wait...!");
  //   });
  //   await waitFor(() => {
  //     // this is when publishing fails. The case for add Event api failing is not handled
  //     // expect(toast.dismiss).toHaveBeenCalled();
  //     expect(toast.error).toHaveBeenCalledWith("Something went wrong !");
  //   });
  // });

  // // test("doesn't submits the form to preview page when ", async () => {

  // // });
});
