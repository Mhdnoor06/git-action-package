import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import toast from "react-hot-toast";
import EditProfile from "../v1/components/MobileViewComponents/MasjidProfile/EditProfile";
import indexReducer from "../v1/redux/reducers/IndexReducer";
import { useAppThunkDispatch } from "../v1/redux/hooks";
import Theme from "../v1/components/Theme/Theme";
import { updateAdminMasjid } from "../v1/redux/actions/MasjidActions/UpdatingMasjidByAdmin";
import { deleteMasjidMedia } from "../v1/redux/actions/MasjidActions/DeletingMasjidMediaAction";
import { deleteMasjidProfile } from "../v1/redux/actions/MasjidActions/DeletingMasjidProfileAction";

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),   
  },
}));

vi.mock("../v1/redux/actions/MasjidActions/UpdatingMasjidByAdmin", () => ({
  updateAdminMasjid: vi.fn(),
}));

vi.mock("../v1/redux/actions/MasjidActions/DeletingMasjidMediaAction", () => ({
  deleteMasjidMedia: vi.fn(),
}));

vi.mock(
  "../v1/redux/actions/MasjidActions/DeletingMasjidProfileAction",
  () => ({
    deleteMasjidProfile: vi.fn(),
  })
);

vi.mock("../v1/redux/hooks", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppThunkDispatch: vi.fn(),
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
          <BrowserRouter>{ui}</BrowserRouter>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

describe("EditProfile Component", () => {
  let dispatchMock: any;

  beforeEach(() => {
    dispatchMock = vi.fn(() => Promise.resolve({ message: "Success" }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockMasjid = {
    masjidName: "test Masjid Of  Chicago.",
    masjidProfilePhoto:
      "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/9312d0e0-8720-487a-8404-a8d196ae1714.jpg",
    masjidPhotos: [
      {
        _id: "66741370983db7598f05afad",
        url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/6f948223-1948-4ff3-b4af-925a1b37419c.jpg",
      },
      {
        _id: "6674138c983db7598f05afbe",
        url: "https://connect-mazjid.sfo3.digitaloceanspaces.com/masjid-64df7804c2d7bcd9f0dac1e7/cb668426-eb9d-49ed-ae97-1922fa724f22.jpg",
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
        _id: "667438f6983db7598f074807",
      },
      {
        name: "Website",
        url: "www.test1.com",
        _id: "667438f6983db7598f074808",
      },
    ],
    updatedAt: "2024-06-20T14:13:10.222Z",
    isAssigned: true,
    updatedBy: null,
    lastEditor: {
      _id: "666076e60ad4a2ecf42c1be0",
      name: "Mirza Akeel",
      role: "musaliadmin",
    },
    assignedUser: { _id: "666076e60ad4a2ecf42c1be0", name: "Mirza Akeel" },
  };

  test("renders initial state correctly", () => {
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="testId"
        masjidReloader={vi.fn()}
      />
    );

    expect(screen.getByLabelText("Description")).toHaveValue(
      "this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. "
    );
    expect(screen.getByLabelText("Phone *")).toHaveValue("+0185252706");
    expect(screen.getByLabelText("Website Links")).toHaveValue("www.test1.com");
    expect(screen.getByLabelText("Facebook Links")).toHaveValue(
      "www.facebook1.com/testMasjidOfChicago"
    );
    expect(screen.getByLabelText("Longitude")).toHaveValue(-96.6490745);
    expect(screen.getByLabelText("Latitude")).toHaveValue(33.010232);
    expect(screen.getByLabelText("Address *")).toHaveValue(
      "4700 14th St, Plano, TX 75074, USA"
    );
    expect(screen.getByAltText("Profile")).toBeInTheDocument();
  });

  test("handles input changes and validation", () => {
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="testId"
        masjidReloader={vi.fn()}
      />
    );

    const phoneInput = screen.getByLabelText("Phone *");
    fireEvent.change(phoneInput, { target: { value: "invalid-phone" } });
    fireEvent.blur(phoneInput);
    expect(screen.getByText("Invalid phone number format")).toBeInTheDocument();

    const websiteInput = screen.getByLabelText("Website Links");
    fireEvent.change(websiteInput, { target: { value: "invalid-url" } });
    fireEvent.blur(websiteInput);
    expect(screen.getByText("Invalid website URL")).toBeInTheDocument();

    const facebookInput = screen.getByLabelText("Facebook Links");
    fireEvent.change(facebookInput, { target: { value: "invalid-url" } });
    fireEvent.blur(facebookInput);
    expect(screen.getByText("Invalid Facebook URL")).toBeInTheDocument();
    const longitudeInput = screen.getByLabelText("Longitude");
    fireEvent.change(longitudeInput, {
      target: { value: "-181.87" },
    });
    fireEvent.blur(longitudeInput);
    expect(screen.getByText("Longitude must be between -180 and 180.")).toBeInTheDocument();
    const latitudeInput = screen.getByLabelText("Latitude");
    fireEvent.change(latitudeInput, {
      target: { value: "180.00" },
    });
    fireEvent.blur(latitudeInput);
    expect(screen.getByText("Latitude must be between -90 and 90.")).toBeInTheDocument();
  });

  test("handles cancel button click", () => {
    const setOpenMasjidEdit = vi.fn();

    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={setOpenMasjidEdit}
        masjidId="testId"
        masjidReloader={vi.fn()}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(setOpenMasjidEdit).toHaveBeenCalledWith(false);
  });

  test("handles update button click", async () => {
    const setOpenMasjidEdit = vi.fn();
    const masjidReloader = vi.fn();

    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={setOpenMasjidEdit}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={masjidReloader}
      />
    );

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);
    const updateConfirmButton = screen.getByTestId("update-yes");
    fireEvent.click(updateConfirmButton);

    await waitFor(() => {
      expect(updateAdminMasjid).toHaveBeenCalledWith(
        "64df7804c2d7bcd9f0dac1e7",
        {
          address: "4700 14th St, Plano, TX 75074, USA",
          contact: "+0185252706",
          description:
            "this is the description of test masjid. this is the description of test masjiaad. \nthis is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. this is the description of test masjid. ",
          externalLinks: [
            { name: "Facebook", url: "www.facebook1.com/testMasjidOfChicago" },
            { name: "Website", url: "www.test1.com" },
          ],
          masjidName: "test Masjid Of  Chicago.",
          location: {
            type: "Point",
            coordinates: [-96.6490745, 33.010232], // Save the coordinates
          },
        }
      );
      expect(toast.success).toHaveBeenCalledWith("Successfully Updated!");
      expect(setOpenMasjidEdit).toHaveBeenCalledWith(false);
      expect(masjidReloader).toHaveBeenCalled();
    });
  });

  test("shows error toast if update fails", async () => {
    dispatchMock = vi.fn(() => Promise.resolve({ message: "Update failed" }));
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);
    const updateConfirmButton = screen.getByTestId("update-yes");
    fireEvent.click(updateConfirmButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Update failed");
    });
  });

  test("calls cancelEditMasjidHandler on Cancel button click while cancelling edit", () => {
    const setOpenMasjidEdit = vi.fn();

    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={setOpenMasjidEdit}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(setOpenMasjidEdit).toHaveBeenCalledWith(false);
  });

  test("calls deleteProfilePhotoHandler while deleting the cover images", () => {
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );

    const deleteButton = screen.getByAltText("delete-icon");
    fireEvent.click(deleteButton);
    expect(
      screen.getByText("Are you sure you want to Delete this Masjid Profile?")
    ).toBeInTheDocument();
  });

  test("calls handleRejection on rejection of delete confirmation while deleting the cover images", () => {
    const setOpen = vi.fn();
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );

    const deleteButton = screen.getByAltText("delete-icon");
    fireEvent.click(deleteButton);
    const cancelButton = screen.getByText("No");
    fireEvent.click(cancelButton);
    expect(
      screen.queryByText("Are you sure you want to Delete this Masjid Profile?")
    ).not.toBeInTheDocument();
  });

  test("calls DeleteProfileHandler and shows success toast on success", async () => {
    dispatchMock = vi.fn(() =>
      Promise.resolve({
        data: "",
        status: 204,
        statusText: "No Content",
        headers: {},
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
              "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYwNzZlNjBhZDRhMmVjZjQyYzFiZTAiLCJyb2xlIjoibXVzYWxpYWRtaW4iLCJlbWFpbCI6ImFrZWVsYWJiYXMyOUBnbWFpbC5jb20iLCJpYXQiOjE3MTg4MjI5NDYsImV4cCI6MTcxOTA4MjE0Nn0.kGnd4usbsT-Zw0MxGpW46FZ9N8-IgyH3tTCKvmSz84QQNGoc342Nftm29bN0qiv7STE2HjaVjqLomIu7G76diUDWz0c3sq6Uj22pxih5cYbr5vHKiMifL0NRs23YyCuyucTd7h-vYNCfd2MKjsqMk-9saEquw4nTh7frE1COuRInR4iCsREwlV5EZYk4ycZl1hQDQ6-D-_Lyp8xKMogOmnV_VljTcT6yesvtBsToU6MZlugxKWycyl1wBbaLwqJ9zprLdkRnCLWEC2A5zLxHiPbklqLby0IwG_Sex689VgKYWqimEiFIcvuGKQ8NIt7h59ZMU9gdrJQyUMuEqFZntit6Iu7DXViyFFFX17-5p3dHZgAS12iG7dP_RYgkTtu0Z3gEY2hm8PhSahqfyFClGM1VKg65qdFbkHB7nTs7lZ-aFBOvL4_0BA8ea0JFNKKIMXTrk-njcRLLqMDln5Hq3eNAXYM73yszsODrQlf4I4Z7Z-Gi00r2CMpPhKO3A3k-jSIE1ioHFa6q6loisrNW6paagpnTuZc3QOFK5mL40oQ297W_cfk1-kE-bUAubH8BdBRrVBICIAC0SIh5xo7qeCC6yrQ-UBgfgnkUg4WfnH7kc8In5bbuDgXKJdr0wF8Z7KpmuNHM9KvHn_yY8MWpENFyzbycH179SB1nCSr8AlU",
          },
          baseURL: "https://dev.admin.api.connectmazjid.com/api/v2",
          method: "delete",
          url: "/media/64df7804c2d7bcd9f0dac1e7/delete/6674790b983db7598f07a339",
        },
        request: {},
      })
    );
    (useAppThunkDispatch as jest.Mock).mockReturnValue(dispatchMock);

    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );

    // deleteMasjidMedia.mockResolvedValueOnce({"status":200});
    const deleteButton = screen.getByAltText("delete-icon");
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByText("Yes");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteMasjidMedia).toHaveBeenCalledWith(
        "66741370983db7598f05afad",
        "64df7804c2d7bcd9f0dac1e7"
      );
      expect(toast.success).toHaveBeenCalledWith("Successfully deleted!");
    });
    // await waitFor(() => {
    // });
  });
  test("handles mouse events for dragging cover image", () => {
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );
    const coverImage = screen.getByAltText("Cover 1");
    const initialOffset = 50; // Assuming initial offset is 50%

    fireEvent.mouseDown(coverImage, { clientY: 100 });
    fireEvent.mouseMove(window, { clientY: 200 });
    fireEvent.mouseUp(window);

    // Calculate the expected offset change
    const expectedOffsetChange = ((100 - 200) / 250) * 100;
    const expectedOffset = Math.max(
      0,
      Math.min(100, initialOffset + expectedOffsetChange)
    );

    // Check the updated object position style
    expect(screen.getByAltText("Cover 1").style.objectPosition).toContain(
      `50% ${expectedOffset}%`
    );
  });

  test("saves image offset to localStorage", () => {
    localStorage.clear();
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );

    const coverImage = screen.getByAltText("Cover 1");
    fireEvent.mouseDown(coverImage, { clientY: 100 });
    fireEvent.mouseMove(window, { clientY: 200 });
    fireEvent.mouseUp(window);

    expect(localStorage.getItem("imageOffset")).toBe("10");
  });
  test("calls handleMediaModal and shows upload modal", () => {
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="64df7804c2d7bcd9f0dac1e7"
        masjidReloader={vi.fn()}
      />
    );

    const cameraButton = screen.getAllByAltText("camera-icon")[0];
    fireEvent.click(cameraButton);
    expect(screen.getByText("Upload Masjid Photos")).toBeInTheDocument();
  });

  test("handles carousel navigation", () => {
    renderWithProviders(
      <EditProfile
        masjid={mockMasjid}
        openMasjidEdit={true}
        setOpenMasjidEdit={vi.fn()}
        masjidId="testId"
        masjidReloader={vi.fn()}
      />
    );
    const nextButton = screen.getByTestId("next-button");
    const prevButton = screen.getByTestId("prev-button");

    fireEvent.click(nextButton);
    expect(screen.getByAltText("Cover 2")).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(screen.getByAltText("Cover 1")).toBeInTheDocument();
  });
});
