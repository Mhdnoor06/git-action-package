import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./otherPrayer.css";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { addingSpecialTimings } from "../../../redux/actions/SpecialTimingsActions/AddingSpecialTimings";
import { ResponseType, SpecialPrayer } from "../../../redux/Types";
import tz_lookup from "tz-lookup";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import toast from "react-hot-toast";
import { GetSpecialTimingsByMasjidId } from "../../../redux/actions/SpecialTimingsActions/specialTimingsByMasjidId";
import { deletingSpecialTimings } from "../../../redux/actions/SpecialTimingsActions/DeletingSpecialTimings";
import { updatingSpecialTimings } from "../../../redux/actions/SpecialTimingsActions/UpdatingSpecialTimings";
import noPrayer from "../../../photos/prayerIcon/noPrayer.svg";
import btnImg from "../../../photos/clockIcon.png";
import {
  LocationBasedToday,
  UTCTimeConverter,
  UTCTimeReverter,
  UtcDateConverter,
  customNavigatorTo,
  dateFormatter,
  dateReverter,
  formatConvertDate,
} from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import OtherSalahCard from "./OtherSalahCard";
import { Backdrop, Card, CircularProgress } from "@mui/material";
import CustomBtn from "../Shared/CustomBtn";
import ClockTimeInput from "../Shared/ClockTimeInput";
import CustomCalender from "../Shared/calendar/CustomCalender";
import calender from "../../../photos/Newuiphotos/Icons/calender.svg";
import { parseISO } from "date-fns";
import { useNavigationprop } from "../../../../MyProvider";
import SuccessMessageModel from "../../../helpers/SuccessMessageModel/SuccessMessageModel";
import { SalahType } from "../MobileViewCalender/SalahTimings/SalahTimings";

interface FormData {
  name: string;
  azaanTime: number | string;
  jamaatTime: number | string;
  startDate: string;
  endDate: string;
}

type OtherSalahComponentProps = {
  consumerMasjidId?: string;
  setSelectedType: Dispatch<SetStateAction<SalahType>>;
};

function OtherSalahComponent({
  consumerMasjidId = "6418878accb079ecb57173b2",
  setSelectedType,
}: OtherSalahComponentProps) {
  const navigation = useNavigationprop();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [modalMessage, setModalmessage] = useState("");

  // Admin
  let admin = useAppSelector((state) => state.admin);
  const [prayers, setPrayers] = useState<SpecialPrayer<number>[]>([]); // All Prayers Loaded
  const [tZone, setTZone] = useState<string>("");

  // Form States
  const [currentSpecialPrayerId, setCurrentSpecialPrayerId] = useState("");
  const [prayerName, setPrayerName] = useState("");
  const [azaanTiming, setAzaanTiming] = useState("");
  const [jamaatTiming, setJamaatTiming] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Other States
  const [showTable, setShowTable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [reloadTimings, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarDateType, setCalendarDateType] = useState<"start" | "end">(
    "start"
  );
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    azaanTime: "",
    jamaatTime: "",
    startDate: "",
    endDate: "",
  });
  const [isValidTiming, setIsValidTiming] = useState(true);

  const dispatch = useAppThunkDispatch();

  console.log(admin);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const defaultValue = new Date();
  const [value, setValue] = useState<Date>(defaultValue);

  // Toggles the visibility of the calendar and sets the calendar type (start or end date).
  const toggleCalendarVisibility = (dateType: "start" | "end") => {
    setIsCalendarVisible(!isCalendarVisible);
    setCalendarDateType(dateType);
    console.log(isCalendarVisible);

    if (dateType === "start" && (startDate || endDate)) {
      const parsedStartDate = parseISO(startDate);
      setValue(parsedStartDate);
    } else {
      const parsedEndDate = parseISO(endDate);
      setValue(parsedEndDate);
    }
  };

  // Validates the selected dates to ensure the start date is not greater than the end date.
  const handleDateValidation = (dateType: "start" | "end", newDate: string) => {
    const startDateValue = dateType === "start" ? newDate : startDate;
    const endDateValue = dateType === "end" ? newDate : endDate;

    if (startDateValue && endDateValue) {
      const startDateObj = new Date(startDateValue);
      const endDateObj = new Date(endDateValue);
      if (startDateObj > endDateObj) {
        dateType === "start" ? setEndDate(newDate) : setStartDate(newDate);
      }
    }
  };

  // Handles the date selection from the calendar and updates the start or end date accordingly.
  const handleDateSelect = (selectedDate: Date) => {
    const newDate = formatConvertDate(selectedDate); // format using moment to YYYY-MM-DD

    if (calendarDateType === "start") {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }

    handleDateValidation(calendarDateType, newDate); // validate and adjust one date based on other

    setTimeout(() => {
      setIsCalendarVisible(false);
    }, 300);
  };

  // Fetches the Masjid data and sets the timezone based on the coordinates.
  useEffect(() => {
    if (consumerMasjidId) {
      const res = dispatch(fetchMasjidById(consumerMasjidId));
      res.then((result) => {
        const lon = result.location.coordinates[0];
        const lat = result.location.coordinates[1];
        if (lat && lon) {
          let location = tz_lookup(lat, lon);
          setTZone(location);
        }
      });
    }
  }, []);

  // Fetches special prayer timings and updates the state whenever reloadTimings or showTable changes.
  // setPrayers setIsLoading
  useEffect(() => {
    if (consumerMasjidId) {
      setIsLoading(true);
      const res = dispatch(GetSpecialTimingsByMasjidId(consumerMasjidId));
      res.then((result: ResponseType) => {
        if (result.success) {
          setPrayers(result.data);
        }
        setIsLoading(false);
      });
    }
  }, [reloadTimings, showTable]);

  // Validates that Azaan timing is not later than Jamaat timing and updates the validation state.
  const validateAzaanJamaatTimes = (azaan: any, jamaat: any) => {
    // only validate when both timing are filled
    if (azaan && jamaat) {
      const azaanTime = new Date(`1970-01-01T${azaan}:00Z`).getTime();
      const jamaatTime = new Date(`1970-01-01T${jamaat}:00Z`).getTime();

      if (azaanTime > jamaatTime) {
        toast.error(`Azaan timing cannot be later than Jamaat timing`);
        setIsValidTiming(false); // Set validation state to false
        return false;
      }
    }
    setIsValidTiming(true); // Set validation state to true
    return true;
  };

  // Handles the confirmation of the prayer form, validates input fields, and sets the preview state, also sets FORM DATA
  const handleConfirmAddPrayer = (e: any) => {
    e.preventDefault();
    if (!jamaatTiming) {
      toast.error(`Jammat Timing is missing`);
      return;
    }
    if (!startDate || !endDate) {
      toast.error(`${!startDate ? "Start" : "End "} Date  is missing`);
      return;
    } else if (new Date(startDate) > new Date(endDate)) {
      toast.error(`Start date cannot be greater then End date`);
      return;
    } else if (!prayerName) {
      toast.error(`Prayer Name is missing`);
      return;
    }

    setIsPreviewVisible(true);
    // set all the form data
    setFormData({
      name: prayerName,
      azaanTime: UTCTimeConverter(azaanTiming, startDate, tZone),
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: startDate,
      endDate: endDate,
    });
  };
  // Adds new prayer timing by dispatching an action with the form data and handles loading state. cleans data on failure
  const handleAddPrayer = () => {
    setIsPreviewVisible(false);
    let newTimings: SpecialPrayer<number> = {
      name: prayerName,
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: UtcDateConverter(startDate, tZone),
      endDate: UtcDateConverter(endDate, tZone),
    };
    if (azaanTiming)
      newTimings.azaanTime = UTCTimeConverter(azaanTiming, startDate, tZone);
    const res = dispatch(addingSpecialTimings(newTimings, consumerMasjidId));
    res.then((result: ResponseType) => {
      setOpenSuccessModal(true);
      setModalmessage("Other Salah added Successfully");
      if (result.success !== false) {
        dataCleaner();
      }
    });
  };

  // Deletes a specific prayer timing and updates the state upon success and reloads timings on success
  const handleDelete = async (id: string) => {
    const loading = toast.loading("Please wait...!");
    const res = dispatch(deletingSpecialTimings(consumerMasjidId, id));
    res.then((result) => {
      toast.dismiss(loading);
      if (result.success) {
        toast.success("SuccessFully Deleted Special Timings");
        setReload(!reloadTimings);
      }
    });
    // toast.dismiss(loading);
  };

  // Sets form fields with prayer data for editing mode and shows the form. setIsEditing, Set All details and set showTable false.
  const handleEditButtonClick = (time: SpecialPrayer<any>) => {
    if (time._id) setCurrentSpecialPrayerId(time._id);
    if (time.azaanTime) setAzaanTiming(UTCTimeReverter(time.azaanTime, tZone));
    setShowTable(false);
    setPrayerName(time.name);
    setStartDate(dateReverter(time.startDate, tZone));
    setEndDate(dateReverter(time.endDate, tZone));
    setJamaatTiming(UTCTimeReverter(time.jamaatTime, tZone));
    setIsEditing(true);
  };

  // Resets form fields and state for either showing the table or not.
  const dataCleaner = (showingTable = true) => {
    setPrayerName("");
    setAzaanTiming("");
    setJamaatTiming("");
    setStartDate("");
    setEndDate("");
    setIsEditing(false);
    setShowTable(showingTable);
  };

  // Opens Preview/Confirmation for update of prayer timing and sets FormData and validates azan timing.
  const handleConfirmUpdatePrayer = async (e: any) => {
    e.preventDefault();

    if (azaanTiming && azaanTiming > jamaatTiming) {
      toast.error(`Azaan timing is greater than Jamaat timing`);
      return;
    } else if (!prayerName) {
      toast.error(`Prayer Name is missing`);
      return;
    }

    setIsPreviewVisible(true);
    setFormData({
      name: prayerName,
      azaanTime: UTCTimeConverter(azaanTiming, startDate, tZone),
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: startDate,
      endDate: endDate,
    });
  };

  console.log(startDate, endDate);

  // Hides Preview shows loader and Updates an existing prayer timing, cleans data on failure
  const handleUpdatePrayer = () => {
    setIsPreviewVisible(false);
    let newTimings: SpecialPrayer<number> = {
      name: prayerName,
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: UtcDateConverter(startDate, tZone),
      endDate: UtcDateConverter(endDate, tZone),
    };
    if (azaanTiming)
      newTimings.azaanTime = UTCTimeConverter(azaanTiming, startDate, tZone);
    const res = dispatch(
      updatingSpecialTimings(
        newTimings,
        consumerMasjidId,
        currentSpecialPrayerId
      )
    );
    res.then((result: ResponseType) => {
      setOpenSuccessModal(true);
      setModalmessage("Other Salah Updated Successfully");
      if (result.success !== false) {
        dataCleaner();
      }
    });
  };

  // Shows the form and hides the prayer table.
  const handleShowTable = () => {
    dataCleaner(false);
  };
  // Navigates back to the prayer table view.
  const handleBackBtn = () => {
    setShowTable(true);
  };

  // Disables dates before the current date in the calendar.
  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = LocationBasedToday(tZone);
    currentDate.setHours(0, 0, 0, 0);

    // Set the provided date's time component to 00:00:00
    const providedDate = new Date(date);
    providedDate.setHours(0, 0, 0, 0);

    // Disable if the date is before the current date (but not if it's the current date)
    return providedDate < currentDate;
  };

  // Function to determine next available Jummah
  const getNextJummahOption = () => {
    const jummahCount = prayers.filter((prayer) =>
      prayer.name.startsWith("Jummah")
    ).length;
    return jummahCount < 4
      ? jummahCount === 0
        ? "Jummah"
        : `Jummah ${jummahCount + 1}`
      : null;
  };

  // Function to determine next available Eid ul Duha
  const getNextEidDuhaOption = () => {
    const eidDuhaCount = prayers.filter((prayer) =>
      prayer.name.startsWith("Eid ul Duha")
    ).length;
    return eidDuhaCount < 4
      ? eidDuhaCount === 0
        ? "Eid ul Duha"
        : `Eid ul Duha ${eidDuhaCount + 1}`
      : null;
  };

  // Function to determine next available Eid ul Fitr
  const getNextEidFitrOption = () => {
    const eidFitrCount = prayers.filter((prayer) =>
      prayer.name.startsWith("Eid ul Fitr")
    ).length;
    return eidFitrCount < 3
      ? eidFitrCount === 0
        ? "Eid ul Fitr"
        : `Eid ul Fitr ${eidFitrCount + 1}`
      : null;
  };

  const availablePrayers = ["Taraweeh", "Qiyam", "Salat al-Kusuf"];

  const nextJummah = getNextJummahOption();
  if (nextJummah) {
    availablePrayers.unshift(nextJummah); // Add Jummah at the start if available
  }

  const nextEidDuha = getNextEidDuhaOption();
  if (nextEidDuha) {
    availablePrayers.splice(1, 0, nextEidDuha); // Add Eid ul Duha after Jummah if available
  }

  const nextEidFitr = getNextEidFitrOption();
  if (nextEidFitr) {
    availablePrayers.splice(1 + (nextEidDuha ? 1 : 0), 0, nextEidFitr); // Add Eid ul Fitr after Eid ul Duha or Jummah if available
  }

  // Include the current prayer being edited if not in list
  if (isEditing && prayerName && !availablePrayers.includes(prayerName)) {
    availablePrayers.unshift(prayerName);
  }

  return (
    <div className="special-main">
      <SuccessMessageModel
        message={modalMessage}
        open={openSuccessModal}
        onClose={() => {
          setOpenSuccessModal(false);
        }}
      />
      {!showTable ? (
        <div className="showform">
          <div className="special-title">
            <div
              className="event-backBtn"
              style={showTable ? { visibility: "hidden" } : {}}
              onClick={() => setShowTable(true)}
            >
              <BackButton handleBackBtn={handleBackBtn} />
            </div>
            <h3 className="page-title" style={{ marginRight: "100px" }}>
              Other Salah
            </h3>
            <div></div>
          </div>
          <Card className="special-card">
            <div className="event-container">
              <form>
                <div className="otherPrayerForm" style={{ padding: "20px" }}>
                  <div className="grid-1">
                    <label>Start Date</label>
                    <div
                      className="date-picker-container"
                      style={{ position: "relative" }}
                      onClick={() => toggleCalendarVisibility("start")}
                    >
                      <input
                        type="text"
                        placeholder="dd-mm-yyyy"
                        value={dateFormatter(startDate)}
                        readOnly
                      />
                      <span
                        className="calendar-icon"
                        style={{
                          position: "absolute",
                          top: "40%",
                          right: "5px",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <img src={calender} alt="" width={"14px"} />
                      </span>
                    </div>
                  </div>

                  <div className="grid-2">
                    <label>End Date</label>
                    <div
                      className="date-picker-container"
                      style={{ position: "relative" }}
                      onClick={() => toggleCalendarVisibility("end")}
                    >
                      <input
                        type="text"
                        placeholder="dd-mm-yyyy"
                        value={dateFormatter(endDate)}
                        readOnly
                        // onClick={() => {
                        //   toggleCalendarVisibility;
                        // }}
                      />
                      <span
                        className="calendar-icon"
                        style={{
                          position: "absolute",
                          top: "40%",
                          right: "5px",
                          transform: "translateY(-50%)",
                        }}
                        // onClick={() => toggleCalendarVisibility}
                      >
                        <img src={calender} alt="" width={"14px"} />
                      </span>
                    </div>
                  </div>
                  <div className="grid-3">
                    <label>Prayer Name</label>
                    <select
                      value={prayerName}
                      onChange={(e) => setPrayerName(e.target.value)}
                      required
                    >
                      <option value="">Select Prayer</option>
                      {availablePrayers.map((prayer, index) => (
                        <option key={index} value={prayer}>
                          {prayer}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="azan-iqama-box grid-4">
                    <ClockTimeInput
                      label={"Azaan Time (Optional)"}
                      id={"azan"}
                      tim={azaanTiming}
                      setTime={(time) => {
                        setAzaanTiming(time);
                        validateAzaanJamaatTimes(time, jamaatTiming); // Validate on Azaan time change
                      }}
                    />
                    <ClockTimeInput
                      label={"Iqama Time"}
                      id={"iqama"}
                      tim={jamaatTiming}
                      setTime={(time) => {
                        console.log("time", time);
                        setJamaatTiming(time);
                        validateAzaanJamaatTimes(azaanTiming, time); // Validate on Jamaat time change
                      }}
                    />
                  </div>
                  <div className="btn-container">
                    <CustomBtn
                      eventHandler={
                        isEditing
                          ? handleConfirmUpdatePrayer
                          : handleConfirmAddPrayer
                      }
                      icon={btnImg}
                      label={isEditing ? "Update Timings" : "Add Timings"}
                      isDisabled={!isValidTiming}
                    />
                  </div>
                </div>
              </form>
            </div>
          </Card>
          {isCalendarVisible && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isCalendarVisible}
              onClick={() => setIsCalendarVisible((prev) => !prev)}
            >
              <div
                className="CalendarContainer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <CustomCalender
                  onDateSelect={handleDateSelect}
                  // selectedDt={selectedDt}
                  minDate={LocationBasedToday(tZone)}
                  value={value}
                  setValue={setValue}
                  tileDisabled={tileDisabled}
                />
              </div>
            </Backdrop>
          )}

          {isPreviewVisible && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isPreviewVisible}
              // onClick={toggleCalendarVisibility}
            >
              <div className="special-table">
                <OtherSalahCard
                  handleEdit={handleEditButtonClick}
                  prayer={formData}
                  handleDelete={handleDelete}
                  hasPrayers={prayers.length ? true : false}
                  tZone={tZone}
                >
                  <div className="confirmation">
                    <p
                      style={{
                        width: "250px",
                        margin: "0",
                        textAlign: "center",
                      }}
                    >
                      Are you sure you want to {isEditing ? "update" : "add"}{" "}
                      other prayer timing ?
                    </p>
                    <div className="spltimbtn">
                      <button
                        className="spltimbtnno"
                        style={{ background: "#FF7272", color: "white" }}
                        onClick={() => {
                          setIsPreviewVisible(false);
                        }}
                      >
                        No
                      </button>
                      <button
                        className="spltimbtnyes"
                        style={{ background: "#1B8368", color: "white" }}
                        onClick={
                          isEditing ? handleUpdatePrayer : handleAddPrayer
                        }
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </OtherSalahCard>
              </div>
            </Backdrop>
          )}
        </div>
      ) : (
        <>
          <div className="otherprayercards">
            <div className="special-title">
              <div className="goback" style={{ margin: "0" }}>
                <BackButton
                  handleBackBtn={() => {
                    setSelectedType(null);
                  }}
                />
              </div>
              <h3 className="page-title">Other Salah</h3>
              <div></div>
            </div>
            <div className="center-block">
              <CustomBtn
                eventHandler={handleShowTable}
                label={"Add Timings"}
                icon={btnImg}
              />
            </div>

            <div className="special-table" data-testid="special-card">
              <>
                {prayers.map((prayer, index) => (
                  <OtherSalahCard
                    key={index}
                    handleEdit={handleEditButtonClick}
                    prayer={prayer}
                    handleDelete={handleDelete}
                    hasPrayers={prayers.length ? true : false}
                    tZone={tZone}
                  ></OtherSalahCard>
                ))}
                {!prayers.length ? (
                  <>
                    {isLoading ? (
                      <CircularProgress color="success" className="loader" />
                    ) : (
                      <div
                        className="noprayer"
                        style={{ margin: "60px", textAlign: "center" }}
                      >
                        <img src={noPrayer} alt="" />
                        <p>No other prayer found</p>
                      </div>
                    )}
                  </>
                ) : null}
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OtherSalahComponent;
