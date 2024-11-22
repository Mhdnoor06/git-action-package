import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import PrayerMethodConfModal from "../../v1/components/MobileViewComponents/NamazTIming/PrayerMethodConfModal";
import CustomBtn from "../../v1/components/MobileViewComponents/Shared/CustomBtn";
import toast from "react-hot-toast";
import * as api from "../../v1/api-calls/index";
import { Provider } from "react-redux";
import Store from "../../v1/redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@mui/material";
import Theme from "../../v1/components/Theme/Theme";
// Mock the CustomBtn and toast components
import DateFnsUtils from "@date-io/date-fns";

vi.mock("../../v1/components/MobileViewComponents/Shared/CustomBtn", () => ({
  __esModule: true,
  default: vi.fn(({ eventHandler, label }) => (
    <button onClick={eventHandler}>{label}</button>
  )),
}));

vi.mock("../../v1/api-calls/index", () => ({
  deletingAllTimingsByDateRange: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("PrayerMethodConfModal", () => {
  const mockResponse = {
    data: {
      message: "Success",
    },
  };
  (api.deletingAllTimingsByDateRange as any).mockResolvedValue(mockResponse);

  const setup = (isModalOpen: boolean) => {
    const setModalOpen = vi.fn();
    const setParentModalOpen = vi.fn();
    const setIsMethodChanged = vi.fn();
    const method = { name: "Hanafi" };
    const juristicMethod = "Hanafi";

    render(
      <Provider store={Store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={Theme}>
            <PrayerMethodConfModal
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
              setParentModalOpen={setParentModalOpen}
              setIsMethodChanged={setIsMethodChanged}
              method={method}
              juristicMethod={juristicMethod}
              // masjidId={"2e2323243434"}
              // tZone={""}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    );

    return {
      setModalOpen,
      setParentModalOpen,
      setIsMethodChanged,
      method,
      juristicMethod,
    };
  };

  it("should render the modal when isModalOpen is true", async () => {
    setup(true);
    await waitFor(() => {
      expect(
        screen.getByText(
          /Are you sure you want to change Al-Asr Juristic Method/i
        )
      ).toBeInTheDocument();
    });
  });

  // it("should not render the modal when isModalOpen is false", () => {
  //   setup(false);
  //   expect(
  //     screen.queryByText(
  //       /Are you sure want to change Prayer Calculation Methods/i
  //     )
  //   ).not.toBeInTheDocument();
  // });

  // it("should call setModalOpen with false when No button is clicked", () => {
  //   const { setModalOpen } = setup(true);
  //   fireEvent.click(screen.getByText("No"));
  //   expect(setModalOpen).toHaveBeenCalledWith(false);
  // });

  // it("should save prayer method and close modals when Yes button is clicked", async () => {
  //   const localSetItem = vi.spyOn(localStorage, "setItem");
  //   const {
  //     setModalOpen,
  //     setParentModalOpen,
  //     setIsMethodChanged,
  //     method,
  //     juristicMethod,
  //   } = setup(true);
  //   fireEvent.click(screen.getByText("Yes"));
  //   expect(localStorage.getItem("PrayerMethod")).toBe(JSON.stringify(method));
  //   expect(localStorage.getItem("JuristicMethod")).toBe(juristicMethod);
  //   // expect().toHaveBeenCalledWith('PrayerMethod', JSON.stringify(method));
  //   // expect(localStorage.setItem).toHaveBeenCalledWith('JuristicMethod', juristicMethod);
  //   expect(toast.success).toHaveBeenCalledWith("Prayer Method has saved");
  //   expect(setModalOpen).toHaveBeenCalledWith(false);
  //   expect(setParentModalOpen).toHaveBeenCalledWith(false);
  //   expect(setIsMethodChanged).toHaveBeenCalledWith(true);
  // });
});
