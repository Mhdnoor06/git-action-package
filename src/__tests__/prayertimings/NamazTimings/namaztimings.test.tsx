import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NamazTimings from "../../../v1/components/MobileViewComponents/NamazTIming/NamazTImings";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import indexReducer from "../../../v1/redux/reducers/IndexReducer";
import Theme from "../../../v1/components/Theme/Theme";
import { format, addDays } from "date-fns"; // Import format and addDays for date manipulation
import {
  getTimingByDateRange,
  fetchMasjidById,
} from "../../../v1/ClientApi-Calls";
import { LocationBasedToday } from "../../../v1/helpers/HelperFunction";
import {
  convertTo12HourFormat,
  expectedDefaultprayerDetails,
  mapPrayerNameToCapitalized,
  masjidData,
  methodHanafiMockTimings,
  methodNameMapping,
  shafiAsrTimings,
  timingsData,
  updatedPrayerDetails,
} from "../../__mockData__/mockData";
import * as API from "../../../v1/ClientApi-Calls";
import * as api from "../../../v1/api-calls";
import { getPrayerTimes } from "../../../v1/PrayerCalculation/Adhan";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";
import { MuiPickersUtilsProviderProps } from "@material-ui/pickers/MuiPickersUtilsProvider";
import { act } from "react-dom/test-utils";
import { Madhab } from "adhan";
// import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

vi.mock("../../../v1/PrayerCalculation/Adhan", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getPrayerTimes: vi.fn(),
  };
});
import { toast } from "react-hot-toast";

// Mock the toast.success function independently
const mockToastSuccess = vi.fn();
const mockToastError = vi.fn();

// Replace the original toast methods with the mocks
toast.success = mockToastSuccess;
toast.error = mockToastError;
// vi.mock("react-hot-toast", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     toast: {
//       success: vi.fn(),
//       error: vi.fn(),
//       loading: vi.fn(),
//       dismiss: vi.fn(),
//     },
//   };
// });
vi.mock("@mui/x-date-pickers/MobileTimePicker", async (importOriginal) => {
  // Import the original module
  const actual = await importOriginal();

  return {
    // Spread the original exports so we don't lose them
    ...actual,
    // Mock the specific named export "MobileTimePicker"
    MobileTimePicker: ({ value, onChange, slotProps }) => (
      <input
        type="text"
        value={value ? value.format("hh:mm A") : ""}
        onChange={(e) => {
          const [hours, minutes] = e.target.value.split(":").map(Number);
          const newTime = dayjs().hour(hours).minute(minutes);
          onChange(newTime); // Format as AM/PM
        }}
        data-testid={slotProps.textField.inputProps["data-testid"]}
      />
    ),
  };
});
vi.mock("../../../v1/ClientApi-Calls", async (importOriginal: any) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchMasjidById: vi.fn(),
    getTimingByDateRange: vi.fn(),
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
const testNamazDropdowns = async () => {
  renderWithBlankData(); // Render with initial blank data

  // Verify initial state for all prayer details
  for (const details of expectedDefaultprayerDetails) {
    await assertPrayerDetails(details);
  }

  // Array of all prayer names to test
  const prayers = ["Fajr", "Dhur", "Asar", "Maghrib", "Isha"];

  for (const prayer of prayers) {
    // Locate the elements for the specific prayer
    const iqamaTimeInput = screen.getByTestId(`Iqama-${prayer}-time`);
    const iqamaOffset = screen.queryByTestId(`offset-Iqama-${prayer}`);
    const iqamaStatusDropdown = screen.getByTestId(
      `statusDropdown-Iqama-${prayer}`
    );
    const dropdownBtn =
      within(iqamaStatusDropdown).getByTestId("my-custom-btn");

    // Assert initial state based on default configuration
    if (prayer === "Maghrib") {
      await waitFor(() => {
        expect(iqamaStatusDropdown).toHaveTextContent("After Azan");
      });
      await waitFor(() => {
        expect(iqamaTimeInput).not.toBeVisible();
        expect(iqamaOffset).toBeVisible(); // Offset should be visible
      });
    } else {
      await waitFor(() => {
        expect(iqamaStatusDropdown).toHaveTextContent("Manual");
      });
      await waitFor(() => {
        expect(iqamaTimeInput).toBeVisible(); // Time should be visible
        expect(iqamaOffset).not.toBeVisible(); // Offset should not be visible
      });
    }

    // Change the status to "No Iqama"
    fireEvent.click(dropdownBtn);
    const noIqamaOption = within(iqamaStatusDropdown).getByText("No Iqama");
    fireEvent.click(noIqamaOption);

    // Assert "No Iqama" status
    await waitFor(() => {
      expect(iqamaStatusDropdown).toHaveTextContent("No Iqama");
      expect(iqamaStatusDropdown).not.toHaveTextContent("Manual");
      expect(iqamaStatusDropdown).not.toHaveTextContent("After Azan");
    });
    await waitFor(() => {
      expect(iqamaTimeInput).not.toBeVisible(); // Time should not be visible
      expect(iqamaOffset).not.toBeVisible(); // Offset should not be visible
    });

    // Change the status back to "Manual" for all prayers
    fireEvent.click(dropdownBtn);
    const manualOption = within(iqamaStatusDropdown).getByText("Manual");
    fireEvent.click(manualOption);

    // Assert "Manual" status
    await waitFor(() => {
      expect(iqamaStatusDropdown).toHaveTextContent("Manual");
      expect(iqamaStatusDropdown).not.toHaveTextContent("No Iqama");
      expect(iqamaStatusDropdown).not.toHaveTextContent("After Azan");
    });
    await waitFor(() => {
      expect(iqamaTimeInput).toBeVisible(); // Time should be visible
      expect(iqamaOffset).not.toBeVisible(); // Offset should not be visible
    });

    // Change the status to "After Azan" for all prayers
    fireEvent.click(dropdownBtn);
    const afterAzanOption = within(iqamaStatusDropdown).getByText("After Azan");
    fireEvent.click(afterAzanOption);

    // Assert "After Azan" status
    await waitFor(() => {
      expect(iqamaStatusDropdown).toHaveTextContent("After Azan");
      expect(iqamaStatusDropdown).not.toHaveTextContent("No Iqama");
      expect(iqamaStatusDropdown).not.toHaveTextContent("Manual");
    });
    await waitFor(() => {
      expect(iqamaTimeInput).not.toBeVisible(); // Time should not be visible
      expect(iqamaOffset).toBeVisible(); // Offset should be visible
    });
  }
};
const assertPrayerDetails = async ({
  prayerName,
  azanValue,
  iqamaValue,
  azanStatusDropdownValue,
  iqamaStatusDropdownValue,
  azanOffsetValue,
  iqamaOffsetValue,
}) => {
  // Azan elements
  const azanInput = screen.getByTestId(`Azan-${prayerName}-time`);
  const azanStatusDropdown = screen.getByTestId(
    `statusDropdown-Azan-${prayerName}`
  );
  const azanOffset = screen.getByTestId(`offset-Azan-${prayerName}`);

  // Iqama elements
  const iqamaInput = screen.getByTestId(`Iqama-${prayerName}-time`);
  const iqamaStatusDropdown = screen.getByTestId(
    `statusDropdown-Iqama-${prayerName}`
  );
  const iqamaOffset = screen.getByTestId(`offset-Iqama-${prayerName}`);

  // Assert Azan Time, Status, and Offset
  await waitFor(() => {
    expect(azanInput).toHaveValue(azanValue);
    expect(azanStatusDropdown).toHaveTextContent(azanStatusDropdownValue);
  });

  if (azanStatusDropdownValue === "solar") {
    await waitFor(() => {
      expect(azanOffset).toBeVisible();
      expect(azanOffset).toHaveTextContent(azanOffsetValue);
    });
  } else if (azanStatusDropdownValue === "manual") {
    await waitFor(() => {
      expect(azanOffset).not.toBeVisible();
    });
  }

  // Assert Iqama Time, Status, and Offset
  await waitFor(() => {
    expect(iqamaInput).toHaveValue(iqamaValue);
    expect(iqamaStatusDropdown).toHaveTextContent(iqamaStatusDropdownValue);
  });

  if (iqamaStatusDropdownValue === "After Azan") {
    await waitFor(() => {
      expect(iqamaInput).not.toBeVisible();
      expect(iqamaOffset).toBeVisible();
      expect(iqamaOffset).toHaveTextContent(iqamaOffsetValue);
    });
  } else if (iqamaStatusDropdownValue === "Manual") {
    await waitFor(() => {
      expect(iqamaOffset).not.toBeVisible();
      expect(iqamaInput).toBeVisible();
    });
  } else if (iqamaStatusDropdownValue === "No Iqama") {
    await waitFor(() => {
      expect(iqamaInput).not.toBeVisible();
      expect(iqamaOffset).not.toBeVisible();
    });
  }
};

const renderWithBlankData = () => {
  (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
  (API.getTimingByDateRange as jest.Mock).mockResolvedValue({
    data: { data: [] }, // Empty timings data
  });
  // (getPrayerTimes as jest.Mock)
  //   .mockImplementationOnce(() => ISNAadhanHanafiNewMockTiming) // First call (Hanafi)
  //   .mockImplementationOnce(() => ISNAdhanShafiMockTiming);
  renderWithProviders(
    <NamazTimings
      prayerType={undefined}
      setShowNamzTiming={() => {}}
      tims={undefined}
      masjidId="6418879cccb079ecb5717665"
      prayerMethod={undefined}
      handleSingleDateClick={() => {}}
      handleRangeDateChange={() => {}}
    />
  );
};
const adjustAsrTiming = (baseTimings, method, madhab) => {
  // console.log("+-+-+", madhab, method);
  const adjustedTimings = { ...baseTimings };
  if (madhab === Madhab.Shafi) {
    adjustedTimings.asr = shafiAsrTimings[method.method] || baseTimings.asr; // Use the method-specific Shafi timing
  }
  return adjustedTimings;
};
const mockGetPrayerTimes = vi.fn(
  (latitude, longitude, date, method, madhab) => {
    const baseTimings = methodHanafiMockTimings[method.method] || {};
    return adjustAsrTiming(baseTimings, method, madhab);
  }
);
describe("NamazTimings Initial State", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the getPrayerTimes function
    (getPrayerTimes as jest.Mock).mockImplementation(mockGetPrayerTimes);
  });

  it("should have initial state values set correctly", () => {
    // Render the component
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    (API.getTimingByDateRange as jest.Mock).mockResolvedValue(timingsData);
    renderWithProviders(
      <NamazTimings
        prayerType={undefined}
        setShowNamzTiming={() => {}}
        tims={undefined}
        masjidId="123"
        prayerMethod={undefined}
        handleSingleDateClick={() => {}}
        handleRangeDateChange={() => {}}
      />
    );
    // Assertions for initial state values
    expect(screen.getByTestId("salah-container")).toBeInTheDocument();
  });
  it("should set default start and end dates correctly", async () => {
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    (API.getTimingByDateRange as jest.Mock).mockResolvedValue({
      data: { data: [] }, // Empty timings data
    });
    // (getPrayerTimes as jest.Mock)
    //   .mockImplementationOnce(() => ISNAadhanHanafiNewMockTiming) // First call (Hanafi)
    //   .mockImplementationOnce(() => ISNAdhanShafiMockTiming);
    // const mockedDate = new Date("2024-09-22T00:00:00Z");
    // (LocationBasedToday as jest.Mock).mockReturnValue(mockedDate);
    // Check default `fromDate` and `toDate` values
    const mockedTimeZone = "America/Chicago"; // Example timezone
    const todayInTZone = LocationBasedToday(mockedTimeZone);
    const expectedFromDate = moment(todayInTZone).format("DD MMM yyyy");
    const expectedToDate = moment(todayInTZone)
      .add(30, "days")
      .format("DD MMM yyyy");
    renderWithProviders(
      <NamazTimings
        prayerType={undefined}
        setShowNamzTiming={() => {}}
        tims={undefined}
        masjidId="123"
        prayerMethod={undefined}
        handleSingleDateClick={() => {}}
        handleRangeDateChange={() => {}}
      />
    );
    // Check that the fromDate and toDate fields have the correct values
    const fromDateInput = screen.getByLabelText("From");
    const toDateInput = screen.getByLabelText("To");
    await waitFor(() => {
      expect(fromDateInput).toHaveValue(expectedFromDate);
    });
    await waitFor(
      () => {
        expect(toDateInput).toHaveValue(expectedToDate);
      },
      { timeout: 5000 }
    );
  });
  it("check if all methods load and correct method is selected by default", async () => {
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    (API.getTimingByDateRange as jest.Mock).mockResolvedValue({
      data: { data: [] }, // Empty timings data
    });
    // (getPrayerTimes as jest.Mock)
    //   .mockImplementationOnce(() => ISNAadhanHanafiNewMockTiming) // First call (Hanafi)
    //   .mockImplementationOnce(() => ISNAdhanShafiMockTiming);
    renderWithProviders(
      <NamazTimings
        prayerType={undefined}
        setShowNamzTiming={() => {}}
        tims={undefined}
        masjidId="123"
        prayerMethod={undefined}
        handleSingleDateClick={() => {}}
        handleRangeDateChange={() => {}}
      />
    );
    // Click on Salah Methods Settings button
    const settingsButton = screen.getByText("Salah Methods Settings");
    expect(settingsButton).toBeInTheDocument();
    fireEvent.click(settingsButton);
    const SalahCalcOption = screen.getByText("Salah Calculation Method");
    expect(SalahCalcOption).toBeInTheDocument();
    fireEvent.click(SalahCalcOption);
    await waitFor(() => {
      expect(screen.queryAllByTestId("method-card").length).toBe(12);
    });
    const defaultMethodCard = screen.getByText(
      "Islamic Society of North America (ISNA)"
    );
    expect(defaultMethodCard).toBeInTheDocument();
    // Check if the selected method has a check image
    const checkImg = screen.getByAltText("Check Img");
    expect(checkImg).toBeInTheDocument();
    // Ensure the check mark is on the correct method card
    expect(
      defaultMethodCard.closest('[data-testid="method-card"]')
    ).toContainElement(checkImg);
  });

  it("check if default Asr Juristic Method is Hanafi", async () => {
    // Mock the necessary API calls
    (API.fetchMasjidById as jest.Mock).mockResolvedValue(masjidData);
    (API.getTimingByDateRange as jest.Mock).mockResolvedValue({
      data: { data: [] }, // Empty timings data
    });
    // (getPrayerTimes as jest.Mock)
    //   .mockImplementationOnce(() => ISNAadhanHanafiNewMockTiming) // First call (Hanafi)
    //   .mockImplementationOnce(() => ISNAdhanShafiMockTiming);
    // Render the component with the necessary providers and props
    renderWithProviders(
      <NamazTimings
        prayerType={undefined}
        setShowNamzTiming={() => {}}
        tims={undefined}
        masjidId="123"
        prayerMethod={undefined}
        handleSingleDateClick={() => {}}
        handleRangeDateChange={() => {}}
      />
    );
    // Click on Salah Methods Settings button
    const settingsButton = screen.getByText("Salah Methods Settings");
    expect(settingsButton).toBeInTheDocument();
    fireEvent.click(settingsButton);
    // Click on the "Al-Asr Juristic Method" option
    const asrJuristicMethodOption = screen.getByText("Al-Asr Juristic Method");
    expect(asrJuristicMethodOption).toBeInTheDocument();
    fireEvent.click(asrJuristicMethodOption);
    // Wait for the juristic method options to appear
    await waitFor(() => {
      expect(screen.getByTestId("asr-jurisdiction-hanafi")).toBeInTheDocument();
      expect(screen.getByTestId("asr-jurisdiction-shafi")).toBeInTheDocument();
    });
    // Verify that Hanafi is selected by default
    const hanafiMethodCard = screen.getByTestId("asr-jurisdiction-hanafi");
    expect(hanafiMethodCard).toBeInTheDocument();
    await waitFor(() => {
      const hanfiCheck = within(hanafiMethodCard).getByAltText("Check Img");
      expect(hanfiCheck).toBeVisible();
    });
    // // Ensure that Shafi is present but not selected
    const shafiMethodCard = screen.getByTestId("asr-jurisdiction-shafi");
    expect(shafiMethodCard).toBeInTheDocument();
    await waitFor(() => {
      const hanfiCheck = within(shafiMethodCard).getByAltText("Check Img");
      expect(hanfiCheck).not.toBeVisible();
    });
  });

  it("check if mocked prayer timings are visible as expected when no prayers exists", async () => {
    renderWithBlankData();
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
  });
  it("increase and decrease in offset for Azan increases/decreases time in Iqama", async () => {
    renderWithBlankData();
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
    const azanIncreaseButton = within(
      screen.getByTestId("offset-container-Azan-Maghrib")
    ).getByTestId("increment-btn");
    fireEvent.click(azanIncreaseButton!);
    const azanOffsetValue = screen.getByTestId("offset-Azan-Maghrib");
    await waitFor(() => {
      expect(azanOffsetValue).toHaveTextContent("+1 min"); // Offset should now be +1 min
    });
    const iqamaTimeInput = screen.getByTestId("Iqama-Maghrib-time");
    await waitFor(() => {
      expect(iqamaTimeInput).not.toBeVisible();
      expect(iqamaTimeInput).toHaveValue("07:22 PM"); // Iqama time should now be 06:09 AM instead of 06:08 AM
    });
  });
  it("decrease in offset for Azan decreases time in Iqama", async () => {
    renderWithBlankData();
    // Verify initial state for all prayer details
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
    // Find the decrease button for Azan offset of Maghrib
    const azanDecreaseButton = within(
      screen.getByTestId("offset-container-Azan-Maghrib")
    ).getByTestId("decrement-btn");
    // Click the decrease button to decrement the offset
    fireEvent.click(azanDecreaseButton);
    // Assert the updated Azan offset value
    const azanOffsetValue = screen.getByTestId("offset-Azan-Maghrib");
    await waitFor(() => {
      expect(azanOffsetValue).toHaveTextContent("-1 min"); // Offset should now be -1 min
    });
    // Assert the updated Iqama time
    const iqamaTimeInput = screen.getByTestId("Iqama-Maghrib-time");
    await waitFor(() => {
      expect(iqamaTimeInput).not.toBeVisible(); // Iqama input should not be visible when "After Azan" is selected
      expect(iqamaTimeInput).toHaveValue("07:20 PM"); // Iqama time should now be 07:20 PM (decreased by 1 minute from 07:21 PM)
    });
  });
  it("increase and decrease in offset for Iqama does not affect Azan time", async () => {
    renderWithBlankData();
    // Verify initial state for all prayer details
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
    // Find the increase button for Iqama offset of Maghrib
    const iqamaIncreaseButton = within(
      screen.getByTestId("offset-container-Iqama-Maghrib")
    ).getByTestId("increment-btn");
    // Click the increase button to increment the offset
    fireEvent.click(iqamaIncreaseButton);
    // Assert the updated Iqama offset value
    const iqamaOffsetValue = screen.getByTestId("offset-Iqama-Maghrib");
    await waitFor(() => {
      expect(iqamaOffsetValue).toHaveTextContent("+1 min"); // Offset should now be +1 min
    });
    // Assert the unchanged Azan time
    const azanTimeInput = screen.getByTestId("Azan-Maghrib-time");
    await waitFor(() => {
      expect(azanTimeInput).toHaveValue("07:21 PM"); // Azan time should remain unaffected
    });
    // Decrease the Iqama offset back
    const iqamaDecreaseButton = within(
      screen.getByTestId("offset-container-Iqama-Maghrib")
    ).getByTestId("decrement-btn");
    fireEvent.click(iqamaDecreaseButton);
    // Assert the updated Iqama offset value back to the original
    await waitFor(() => {
      expect(iqamaOffsetValue).toHaveTextContent("+0 min"); // Offset should now be back to +0 min
    });
    // Assert the unchanged Azan time again
    await waitFor(() => {
      expect(azanTimeInput).toHaveValue("07:21 PM"); // Azan time should still remain unaffected
    });
  });
  it("should change the status dropdown correctly for a particular namaz, handling showing and hiding of time and offset", async () => {
    renderWithBlankData();
    // Verify initial state for all prayer details
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
    const iqamaTimeInput = screen.getByTestId("Iqama-Maghrib-time");
    const iqamaOffset = screen.queryByTestId("offset-Iqama-Maghrib");
    // Locate the dropdown for Iqama status of Maghrib
    const iqamaStatusDropdown = screen.getByTestId(
      "statusDropdown-Iqama-Maghrib"
    );
    const dropdownBtn =
      within(iqamaStatusDropdown).getByTestId("my-custom-btn");
    // Expand the dropdown
    fireEvent.click(dropdownBtn);
    // Use within to scope the search for dropdown options inside the expanded dropdown
    const dropdownOptions = within(iqamaStatusDropdown).getByText("Manual");
    // // Click on the "Manual" option to change the status to Manual
    fireEvent.click(dropdownOptions!);
    // // Assert that the dropdown now displays "Manual" as the selected option
    await waitFor(() => {
      expect(iqamaStatusDropdown).toHaveTextContent("Manual");
      expect(iqamaStatusDropdown).not.toHaveTextContent("No Iqama");
      expect(iqamaStatusDropdown).not.toHaveTextContent("After Azan");
    });
    // // Check that the Iqama time is visible and the offset is not visible
    await waitFor(() => {
      expect(iqamaTimeInput).toBeVisible();
      expect(iqamaOffset).not.toBeVisible();
    });
    // Expand the dropdown again to change the status to "No Iqama"
    fireEvent.click(dropdownBtn);
    // Use within to scope the search for "No Iqama" option
    const noIqamaOption = within(iqamaStatusDropdown).getByText("No Iqama");
    fireEvent.click(noIqamaOption);
    // // Assert that the dropdown now displays "No Iqama"
    await waitFor(() => {
      expect(iqamaStatusDropdown).toHaveTextContent("No Iqama");
      expect(iqamaStatusDropdown).not.toHaveTextContent("Manual");
      expect(iqamaStatusDropdown).not.toHaveTextContent("After Azan");
    });
    // // Check that the Iqama time and offset are not visible when status is "No Iqama"
    await waitFor(() => {
      expect(iqamaTimeInput).not.toBeVisible();
      expect(iqamaOffset).not.toBeVisible();
    });
    // Expand the dropdown again to change the status to "After Azan"
    fireEvent.click(dropdownBtn);
    await waitFor(() => {
      expect(
        within(iqamaStatusDropdown).getByText("After Azan")
      ).toBeInTheDocument();
    });
    // Use within to scope the search for "After Azan" option
    const afterAzanOption = within(iqamaStatusDropdown).getByText("After Azan");
    fireEvent.click(afterAzanOption);
    // Assert that the dropdown now displays "After Azan"
    await waitFor(() => {
      expect(iqamaStatusDropdown).toHaveTextContent("After Azan");
      expect(iqamaStatusDropdown).not.toHaveTextContent("No Iqama");
      expect(iqamaStatusDropdown).not.toHaveTextContent("Manual");
    });
    // Check that the Iqama time is not visible but offset is visible when status is "After Azan"
    await waitFor(() => {
      expect(iqamaTimeInput).not.toBeVisible();
      expect(iqamaOffset).toBeVisible();
    });
  });
  it("should correctly handle status changes for all namaz dropdowns", async () => {
    await testNamazDropdowns();
  });
  it("Manual dropdown whether time is changing", async () => {
    renderWithBlankData();
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
    const timePickerInput = screen.getByTestId("Iqama-Fajr-time");
    // Simulate changing the time in the mocked time picker
    fireEvent.change(timePickerInput, { target: { value: "07:00" } });
    await waitFor(() => {
      expect(timePickerInput).toHaveValue("07:00 AM");
    });
  });
  it("should update the time for all prayers with mock data, changing Maghrib status to manual first", async () => {
    renderWithBlankData();
    // Verify initial state for all prayer details
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
    const prayerNames = ["Fajr", "Dhur", "Asar", "Maghrib", "Isha"];
    for (let i = 0; i < prayerNames.length; i++) {
      const prayerName = prayerNames[i];
      const updatedDetails = updatedPrayerDetails[i];
      const iqamaStatusDropdown = screen.getByTestId(
        `statusDropdown-Iqama-${prayerName}`
      );
      // If the prayer is Maghrib, change its status to Manual first
      if (prayerName === "Maghrib") {
        const dropdownBtn =
          within(iqamaStatusDropdown).getByTestId("my-custom-btn");
        fireEvent.click(dropdownBtn);
        const manualOption = within(iqamaStatusDropdown).getByText("Manual");
        fireEvent.click(manualOption);
        // Verify that the status is now Manual
        await waitFor(() => {
          expect(iqamaStatusDropdown).toHaveTextContent("Manual");
        });
      }
      // Now, change the time for the prayer
      const timePickerInput = screen.getByTestId(`Iqama-${prayerName}-time`);
      // Convert the updated iqama value from 12-hour format to 24-hour format
      const [time, period] = updatedDetails.iqamaValue.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      // Convert to 24-hour format if necessary
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }
      // Create formatted value in 24-hour format (e.g., "13:20")
      const formattedValue = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
      // Simulate changing the time in the mocked time picker
      fireEvent.change(timePickerInput, { target: { value: formattedValue } });
      // Convert the formatted value back to 12-hour format to assert correctly
      const expectedValueIn12Hour = dayjs(
        `${formattedValue}:00`,
        "HH:mm:ss"
      ).format("hh:mm A");
      await waitFor(() => {
        expect(timePickerInput).toHaveValue(expectedValueIn12Hour);
      });
    }
  });
  it("should handle changing offsets, manual adjustments, and switching to 'After Azan' for all prayers", async () => {
    renderWithBlankData();
    // Verify initial state for all prayer details
    for (const details of expectedDefaultprayerDetails) {
      await assertPrayerDetails(details);
    }
    const prayerOffsets = {
      Fajr: 2,
      Dhur: 5,
      Asar: 3,
      Maghrib: 4,
      Isha: 6,
    };
    const manualIqamaAdjustments = {
      Fajr: "06:16", // Fajr increased by 5 minutes
      Dhur: "01:28", // Dhur increased by 8 minutes
      Asar: "04:51", // Asar increased by 7 minutes
      Maghrib: "07:28", // Maghrib increased by 7 minutes
      Isha: "08:35", // Isha increased by 6 minutes
    };
    // Step 1: Change Maghrib Iqama status to Manual
    const maghribIqamaStatusDropdown = screen.getByTestId(
      "statusDropdown-Iqama-Maghrib"
    );
    const maghribDropdownBtn = within(maghribIqamaStatusDropdown).getByTestId(
      "my-custom-btn"
    );
    fireEvent.click(maghribDropdownBtn);
    const manualOption = within(maghribIqamaStatusDropdown).getByText("Manual");
    fireEvent.click(manualOption);
    // Verify that Maghrib Iqama status has changed to Manual
    await waitFor(() => {
      expect(maghribIqamaStatusDropdown).toHaveTextContent("Manual");
    });
    // Step 2: Perform actions for each prayer
    for (const prayerName of Object.keys(prayerOffsets)) {
      const azanOffsetContainer = screen.getByTestId(
        `offset-container-Azan-${prayerName}`
      );
      const azanIncrementButton =
        within(azanOffsetContainer).getByTestId("increment-btn");
      // Increase Azan offset by specified minutes
      for (let i = 0; i < prayerOffsets[prayerName]; i++) {
        fireEvent.click(azanIncrementButton);
      }
      const expectedAzanOffset = `+${prayerOffsets[prayerName]} min`;
      // Verify the Azan time remains unchanged and the offset is updated
      await waitFor(() => {
        expect(screen.getByTestId(`Azan-${prayerName}-time`)).toHaveValue(
          expectedDefaultprayerDetails.find(
            (prayer) => prayer.prayerName === prayerName
          ).azanValue
        );
        expect(
          screen.getByTestId(`offset-Azan-${prayerName}`)
        ).toHaveTextContent(expectedAzanOffset);
      });
      // Manually change Iqama time to the specified value
      const iqamaTimeInput = screen.getByTestId(`Iqama-${prayerName}-time`);
      fireEvent.change(iqamaTimeInput, {
        target: { value: manualIqamaAdjustments[prayerName] },
      });
      await waitFor(() => {
        expect(iqamaTimeInput).toHaveValue(
          `${manualIqamaAdjustments[prayerName]} AM`
        );
      });
      // Change Iqama status to 'After Azan'
      const iqamaStatusDropdown = screen.getByTestId(
        `statusDropdown-Iqama-${prayerName}`
      );
      const dropdownBtn =
        within(iqamaStatusDropdown).getByTestId("my-custom-btn");
      fireEvent.click(dropdownBtn);
      const afterAzanOption =
        within(iqamaStatusDropdown).getByText("After Azan");
      fireEvent.click(afterAzanOption);
      // Verify that Iqama time resets to Azan time + Azan Offset
      const azanTimeValue = dayjs(
        expectedDefaultprayerDetails.find(
          (prayer) => prayer.prayerName === prayerName
        ).azanValue,
        "hh:mm A"
      )
        .add(prayerOffsets[prayerName], "minute")
        .format("hh:mm A");
      await waitFor(() => {
        expect(iqamaStatusDropdown).toHaveTextContent("After Azan");
        expect(screen.getByTestId(`Iqama-${prayerName}-time`)).toHaveValue(
          azanTimeValue
        );
        expect(
          screen.getByTestId(`offset-Iqama-${prayerName}`)
        ).toHaveTextContent("+5 min"); // Default Iqama offset
      });
    }
  });
});
