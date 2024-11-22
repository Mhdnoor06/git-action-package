import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Announcement from '../v1/components/MobileViewComponents/Announcement/Announcement';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import indexReducer from '../v1/redux/reducers/IndexReducer';
import { useAppDispatch, useAppThunkDispatch } from '../v1/redux/hooks';
import { FetchingAnnouncementNotificationByDate } from '../v1/redux/actions/AnnouncementActions/FetchingAnnouncementByDateAction';
import { handleSnackbar } from '../v1/helpers/SnackbarHelper/SnackbarHelper';
import { dateReverter } from '../v1/helpers/HelperFunction';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Theme from '../v1/components/Theme/Theme';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

vi.mock('moment', () => {
    const originalMoment = vi.fn(() => ({
      tz: vi.fn(() => ({
        format: vi.fn(() => '22 Jun 2024'),
      })),
      format: vi.fn(() => '22 Jun 2024'),
    }));
    originalMoment.tz = vi.fn(() => originalMoment);
    originalMoment.format = vi.fn(() => '22 Jun 2024');
    return { default: originalMoment };
  });


vi.mock('../v1/redux/actions/AnnouncementActions/FetchingAnnouncementByDateAction', () => ({
  FetchingAnnouncementNotificationByDate: vi.fn(),
}));

vi.mock('../v1/helpers/SnackbarHelper/SnackbarHelper', () => ({
  handleSnackbar: vi.fn(),
}));
vi.mock('../v1/redux/hooks', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useAppThunkDispatch: vi.fn(),
      useAppDispatch: vi.fn(),

    };
  });
const store = configureStore({
  reducer: indexReducer,
});

const renderWithProviders = (ui: any) => {
  return render(
    <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </Provider>
  );
};

describe('Announcement Component', () => {
    let dispatchMock:any;
    beforeEach(() => {
        dispatchMock = vi.fn(() => Promise.resolve({ success: true })); 
        (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
      });

   afterEach(() => {
    vi.clearAllMocks();
    });

  test('renders initial state correctly', async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        data: { data: [], message: "Success" },
        status: 200,
        statusText: "OK",
        headers: {
          "content-length": "31",
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
              "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTg5Nzk2NTksImV4cCI6MTcxOTIzODg1OX0.VV_i_eILlcucrTVg_FJH5tpLYDygtAFLSvmCVkB-b7VYgCi7u8A7zYnenYwJUwz-Fy8dS36oE954q3Lh671XIaxhCQdduysR_odXzCtowAgMT8B9Out17_jmkJe6j-R9ohn9DI3_8OPbCRtj-iSy1T69XxjD76nn26KBvCMlZ8KOev4Gk219QfF8y_wsY2fNfZsw97Ynz2bufOUsRhopqcnU0VTSlb4koREcYiT_AXYZmWCgDnFxKfzaRpaz9hMa2gxrhKb4WaG_K9V59piYU_1tm7kjuyihocz0bo5EJSkwODco6B8wn3ijV72uZUZZPkiQXcYm2hX2xfKLfjQouDHIBVyWmjD0CUYEAGMrYuF8hBt2eXZ2GBbWXamsN6lUUkVqSorYMVvz56EQfO4zD9kFrCP9c9iE7lVj3X_fKtjXZWbP1nBF6W8oEg79DxtEvA06txz2ZpDmktDvyXroXaTNqeJ89qhRPDwg6Ul1xcpqWQlmVv62p54hVzQur0FtxFClyEmFRRVJ_gfKD68a91dRF4mWBcBdGi_Y7go-Uq1j_nokS8DFhdfldejFCVJ0FDjYubbVZgP2ozrrhnWFBUVW-DB-rpLUZDUGSyvfBaXgZcnUTUJlMeg6g8Je6_wpEm6b1FyBAs3kuruLegJ_899zfxwqRgngsWAFWh15a5o"
          },
          baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
          method: "get",
          url: "/notification/announcement/get"
        },
        request: {}
      })
    );
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    
    renderWithProviders(<Announcement consumerMasjidId="6418878accb079ecb57173b2" />);
    expect(screen.getByText('Announcements')).toBeInTheDocument();
    expect(screen.getByText('Make Announcement')).toBeInTheDocument();
  });


  test('displays progress loader when announcements are being fetched', async () => {
       dispatchMock = vi.fn(() =>
        Promise.resolve({
          data: { data: [], message: "Success" },
          status: 200,
          statusText: "OK",
          headers: {
            "content-length": "31",
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
                "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTg5Nzk2NTksImV4cCI6MTcxOTIzODg1OX0.VV_i_eILlcucrTVg_FJH5tpLYDygtAFLSvmCVkB-b7VYgCi7u8A7zYnenYwJUwz-Fy8dS36oE954q3Lh671XIaxhCQdduysR_odXzCtowAgMT8B9Out17_jmkJe6j-R9ohn9DI3_8OPbCRtj-iSy1T69XxjD76nn26KBvCMlZ8KOev4Gk219QfF8y_wsY2fNfZsw97Ynz2bufOUsRhopqcnU0VTSlb4koREcYiT_AXYZmWCgDnFxKfzaRpaz9hMa2gxrhKb4WaG_K9V59piYU_1tm7kjuyihocz0bo5EJSkwODco6B8wn3ijV72uZUZZPkiQXcYm2hX2xfKLfjQouDHIBVyWmjD0CUYEAGMrYuF8hBt2eXZ2GBbWXamsN6lUUkVqSorYMVvz56EQfO4zD9kFrCP9c9iE7lVj3X_fKtjXZWbP1nBF6W8oEg79DxtEvA06txz2ZpDmktDvyXroXaTNqeJ89qhRPDwg6Ul1xcpqWQlmVv62p54hVzQur0FtxFClyEmFRRVJ_gfKD68a91dRF4mWBcBdGi_Y7go-Uq1j_nokS8DFhdfldejFCVJ0FDjYubbVZgP2ozrrhnWFBUVW-DB-rpLUZDUGSyvfBaXgZcnUTUJlMeg6g8Je6_wpEm6b1FyBAs3kuruLegJ_899zfxwqRgngsWAFWh15a5o"
            },
            baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
            method: "get",
            url: "/notification/announcement/get"
          },
          request: {}
        })
      );
      (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);

      
    renderWithProviders(<Announcement consumerMasjidId="6418878accb079ecb57173b2" />);
    
    expect(screen.getByText('Announcements')).toBeInTheDocument();
    expect(screen.getByText('Make Announcement')).toBeInTheDocument();
    
    // Loader should be displayed during fetch
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  test('displays "No Announcements Found" when there are no announcements', async () => {
    dispatchMock = vi.fn(() =>
        Promise.resolve({
          data: { data: [], message: "Success" },
          status: 200,
          statusText: "OK",
          headers: {
            "content-length": "31",
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
                "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTg5Nzk2NTksImV4cCI6MTcxOTIzODg1OX0.VV_i_eILlcucrTVg_FJH5tpLYDygtAFLSvmCVkB-b7VYgCi7u8A7zYnenYwJUwz-Fy8dS36oE954q3Lh671XIaxhCQdduysR_odXzCtowAgMT8B9Out17_jmkJe6j-R9ohn9DI3_8OPbCRtj-iSy1T69XxjD76nn26KBvCMlZ8KOev4Gk219QfF8y_wsY2fNfZsw97Ynz2bufOUsRhopqcnU0VTSlb4koREcYiT_AXYZmWCgDnFxKfzaRpaz9hMa2gxrhKb4WaG_K9V59piYU_1tm7kjuyihocz0bo5EJSkwODco6B8wn3ijV72uZUZZPkiQXcYm2hX2xfKLfjQouDHIBVyWmjD0CUYEAGMrYuF8hBt2eXZ2GBbWXamsN6lUUkVqSorYMVvz56EQfO4zD9kFrCP9c9iE7lVj3X_fKtjXZWbP1nBF6W8oEg79DxtEvA06txz2ZpDmktDvyXroXaTNqeJ89qhRPDwg6Ul1xcpqWQlmVv62p54hVzQur0FtxFClyEmFRRVJ_gfKD68a91dRF4mWBcBdGi_Y7go-Uq1j_nokS8DFhdfldejFCVJ0FDjYubbVZgP2ozrrhnWFBUVW-DB-rpLUZDUGSyvfBaXgZcnUTUJlMeg6g8Je6_wpEm6b1FyBAs3kuruLegJ_899zfxwqRgngsWAFWh15a5o"
            },
            baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
            method: "get",
            url: "/notification/announcement/get"
          },
          request: {}
        })
      );
      (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
      
    renderWithProviders(<Announcement consumerMasjidId="6418878accb079ecb57173b2" />);
    
    await waitFor(() => {
      expect(screen.getByText('No Annoucements Found')).toBeInTheDocument();
    });
  });

  test('toggles announcement form view on button click', async () => {
    dispatchMock = vi.fn(() =>
        Promise.resolve({
          data: { data: [], message: "Success" },
          status: 200,
          statusText: "OK",
          headers: {
            "content-length": "31",
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
                "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTg5Nzk2NTksImV4cCI6MTcxOTIzODg1OX0.VV_i_eILlcucrTVg_FJH5tpLYDygtAFLSvmCVkB-b7VYgCi7u8A7zYnenYwJUwz-Fy8dS36oE954q3Lh671XIaxhCQdduysR_odXzCtowAgMT8B9Out17_jmkJe6j-R9ohn9DI3_8OPbCRtj-iSy1T69XxjD76nn26KBvCMlZ8KOev4Gk219QfF8y_wsY2fNfZsw97Ynz2bufOUsRhopqcnU0VTSlb4koREcYiT_AXYZmWCgDnFxKfzaRpaz9hMa2gxrhKb4WaG_K9V59piYU_1tm7kjuyihocz0bo5EJSkwODco6B8wn3ijV72uZUZZPkiQXcYm2hX2xfKLfjQouDHIBVyWmjD0CUYEAGMrYuF8hBt2eXZ2GBbWXamsN6lUUkVqSorYMVvz56EQfO4zD9kFrCP9c9iE7lVj3X_fKtjXZWbP1nBF6W8oEg79DxtEvA06txz2ZpDmktDvyXroXaTNqeJ89qhRPDwg6Ul1xcpqWQlmVv62p54hVzQur0FtxFClyEmFRRVJ_gfKD68a91dRF4mWBcBdGi_Y7go-Uq1j_nokS8DFhdfldejFCVJ0FDjYubbVZgP2ozrrhnWFBUVW-DB-rpLUZDUGSyvfBaXgZcnUTUJlMeg6g8Je6_wpEm6b1FyBAs3kuruLegJ_899zfxwqRgngsWAFWh15a5o"
            },
            baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
            method: "get",
            url: "/notification/announcement/get"
          },
          request: {}
        })
      );
      (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
      
    renderWithProviders(<Announcement consumerMasjidId="6418878accb079ecb57173b2" />);
    
    fireEvent.click(screen.getByText('Make Announcement'));
    expect(screen.getByText('Trigger Announcement')).toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('backBtn'));
    expect(screen.getByText('Make Announcement')).toBeInTheDocument();
  });

  test('displays announcement cards when announcements are fetched', async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        data: {
          data: [
            {
              _id: "6677f7b3983db7598f0adfa9",
              title: "Test Announcement",
              body: "Test Announcement Description",
              type: 0,
              asset: ["64df7804c2d7bcd9f0dac1e7"],
              payload: {
                title: "Test Announcement",
                body: "Test Announcement Description"
              },
              masjidId: "6677f7b3983db7598f0adfa8",
              expiresAt: "2024-06-26T10:23:47.697Z",
              createdBy: "666076e60ad4a2ecf42c1be0",
              createdAt: "2024-06-23T10:23:47.702Z",
              updatedAt: "2024-06-23T10:23:47.702Z",
              __v: 0
            }
          ],
          message: "Success"
        },
        status: 200,
        statusText: "OK",
        headers: {
          "content-length": "459",
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
              "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTg5Nzk2NTksImV4cCI6MTcxOTIzODg1OX0.VV_i_eILlcucrTVg_FJH5tpLYDygtAFLSvmCVkB-b7VYgCi7u8A7zYnenYwJUwz-Fy8dS36oE954q3Lh671XIaxhCQdduysR_odXzCtowAgMT8B9Out17_jmkJe6j-R9ohn9DI3_8OPbCRtj-iSy1T69XxjD76nn26KBvCMlZ8KOev4Gk219QfF8y_wsY2fNfZsw97Ynz2bufOUsRhopqcnU0VTSlb4koREcYiT_AXYZmWCgDnFxKfzaRpaz9hMa2gxrhKb4WaG_K9V59piYU_1tm7kjuyihocz0bo5EJSkwODco6B8wn3ijV72uZUZZPkiQXcYm2hX2xfKLfjQouDHIBVyWmjD0CUYEAGMrYuF8hBt2eXZ2GBbWXamsN6lUUkVqSorYMVvz56EQfO4zD9kFrCP9c9iE7lVj3X_fKtjXZWbP1nBF6W8oEg79DxtEvA06txz2ZpDmktDvyXroXaTNqeJ89qhRPDwg6Ul1xcpqWQlmVv62p54hVzQur0FtxFClyEmFRRVJ_gfKD68a91dRF4mWBcBdGi_Y7go-Uq1j_nokS8DFhdfldejFCVJ0FDjYubbVZgP2ozrrhnWFBUVW-DB-rpLUZDUGSyvfBaXgZcnUTUJlMeg6g8Je6_wpEm6b1FyBAs3kuruLegJ_899zfxwqRgngsWAFWh15a5o"
          },
          baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
          method: "get",
          url: "/notification/announcement/get"
        },
        request: {}
      })
    );
      (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    
    renderWithProviders(<Announcement consumerMasjidId="64df7804c2d7bcd9f0dac1e7" />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Announcement')).toBeInTheDocument();
      expect(screen.getByText('Test Announcement Description')).toBeInTheDocument();
      expect(screen.getByText(moment(dateReverter('2024-06-22T14:36:06.957Z', localStorage.getItem("MasjidtZone")), 'YYYY-MM-DD').format('D MMM yyyy'))).toBeInTheDocument();
    });
  });

  test("handles individual announcement card click", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        data: {
          data: [
            {
              _id: "6677f7b3983db7598f0adfa9",
              title: "Test Announcement",
              body: "Test Announcement Description",
              type: 0,
              asset: ["64df7804c2d7bcd9f0dac1e7"],
              payload: {
                title: "Test Announcement",
                body: "Test Announcement Description"
              },
              masjidId: "6677f7b3983db7598f0adfa8",
              expiresAt: "2024-06-26T10:23:47.697Z",
              createdBy: "666076e60ad4a2ecf42c1be0",
              createdAt: "2024-06-23T10:23:47.702Z",
              updatedAt: "2024-06-23T10:23:47.702Z",
              __v: 0
            }
          ],
          message: "Success"
        },
        status: 200,
        statusText: "OK",
        headers: {
          "content-length": "459",
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
              "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTg5Nzk2NTksImV4cCI6MTcxOTIzODg1OX0.VV_i_eILlcucrTVg_FJH5tpLYDygtAFLSvmCVkB-b7VYgCi7u8A7zYnenYwJUwz-Fy8dS36oE954q3Lh671XIaxhCQdduysR_odXzCtowAgMT8B9Out17_jmkJe6j-R9ohn9DI3_8OPbCRtj-iSy1T69XxjD76nn26KBvCMlZ8KOev4Gk219QfF8y_wsY2fNfZsw97Ynz2bufOUsRhopqcnU0VTSlb4koREcYiT_AXYZmWCgDnFxKfzaRpaz9hMa2gxrhKb4WaG_K9V59piYU_1tm7kjuyihocz0bo5EJSkwODco6B8wn3ijV72uZUZZPkiQXcYm2hX2xfKLfjQouDHIBVyWmjD0CUYEAGMrYuF8hBt2eXZ2GBbWXamsN6lUUkVqSorYMVvz56EQfO4zD9kFrCP9c9iE7lVj3X_fKtjXZWbP1nBF6W8oEg79DxtEvA06txz2ZpDmktDvyXroXaTNqeJ89qhRPDwg6Ul1xcpqWQlmVv62p54hVzQur0FtxFClyEmFRRVJ_gfKD68a91dRF4mWBcBdGi_Y7go-Uq1j_nokS8DFhdfldejFCVJ0FDjYubbVZgP2ozrrhnWFBUVW-DB-rpLUZDUGSyvfBaXgZcnUTUJlMeg6g8Je6_wpEm6b1FyBAs3kuruLegJ_899zfxwqRgngsWAFWh15a5o"
          },
          baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
          method: "get",
          url: "/notification/announcement/get"
        },
        request: {}
      })
    );
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    renderWithProviders(
      <Announcement consumerMasjidId="6418878accb079ecb57173b2" />
    );

    await waitFor(() => {
      expect(screen.getByText("Test Announcement")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Test Announcement"));
    expect(screen.getByTestId('backBtn')).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Test Announcement Description")).toBeInTheDocument();
  });
  test('handles failure to fetch announcements', async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        data: {
          message: 'Failure',
        },
      })
    );
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    renderWithProviders(<Announcement consumerMasjidId="6418878accb079ecb57173b2" />);

    // Ensure the loader is displayed initially
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();

    // Wait for the snackbar to be called with the error message
    await waitFor(() => {
      expect(handleSnackbar).toHaveBeenCalledWith(
        true,
        'error',
        'Failed To Fetch:Something Went Wrong',
        expect.any(Function)
      );
    });

    // Ensure no announcements are displayed
    expect(screen.queryByText('Test Announcement')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Announcement Description')).not.toBeInTheDocument();
  });
});
