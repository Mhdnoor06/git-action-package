import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./MobileViewComponent.css";
import moment from "moment-timezone";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { DeletingAllTimingsByDateRange } from "../../../redux/actions/TimingsActions/DeletingAllTimingsByRange";
import tz_lookup from "tz-lookup";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import toast from "react-hot-toast";
import {
  LocationBasedToday,
  UtcDateConverter,
} from "../../../helpers/HelperFunction";
import { FetchingTimingsByDateRange } from "../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import { PrayerTimings } from "../../../redux/Types";
import NamajTimings from "../NamazTIming/NamazTImings";
import PrayerBox from "../Shared/PrayerBox/PrayerBox";
import clockIcon from "../../../photos/clockIcon.png";
import SpecialCalendar from "../Shared/calendar/SpecialCalendar";
const MobileViewCalender = () => {
  const [tZone, setTZone] = useState("");
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const dispatch = useAppThunkDispatch();
  const [isDateSelected, setDateSelected] = useState<boolean>(false);
  const [reloadTiming, setReload] = useState<boolean>(false);
  const [allPrayers, setAllPrayer] = useState<PrayerTimings<number>[]>([]);
  const [showNamzTiming, setShowNamzTiming] = useState<boolean>(false);
  const [selectedPrayers, setSelectedPrayers] =
    useState<PrayerTimings<number>>();
  const [tmExist, setTmExist] = useState<boolean>(false);

  const [hasTiming, setRangeHasTimings] = useState<boolean>(false);
  let admin = useAppSelector((state) => state.admin);
  //Selected Date for Range or Single use this function
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const handleSingleDateClick = (date: Date) => {
    setSelectedDates([date, null]);
    setDateSelected(true);

    dispatch({
      type: "singleDate",
      payload: [moment(date).format("YYYY-MM-DD")],
    });
    setRangeHasTimings(false);
    let selectedDate = moment(date);

    const timings = allPrayers.filter(
      (item) =>
        item.date.split("T")[0] ===
        UtcDateConverter(selectedDate.format("YYYY-MM-DD"), tZone).split("T")[0]
    );
    if (timings.length > 0) {
      setSelectedPrayers(timings[0]);
      setTmExist(true);
    } else {
      setTmExist(false);
      setSelectedPrayers(undefined);
    }
  };

  const handleRangeDateChange = (date: any) => {
    const date1 = moment(date[0], "YYYY-MM-DD");
    const date2 = moment(date[1], "YYYY-MM-DD");

    if (date1.isSame(date2, "day")) return;
    setDateSelected(true);

    const processedData = [
      moment(date[0]).format("YYYY-MM-DD"),
      moment(date[1]).format("YYYY-MM-DD"),
    ];
    dispatch({ type: "rangeDate", payload: processedData });
    setSelectedDates([selectedDates[0], date[1]]);
    let selectedStartDate = moment(date[0]);
    let selectedEndDate = moment(date[1]);
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;
    let RangeContainTiming = false;
    for (let i = 0; i < difference; i++) {
      let date = moment(selectedStartDate).add("days", i);

      const timings = allPrayers.filter(
        (item) =>
          item.date.split("T")[0] ===
          UtcDateConverter(date.format("YYYY-MM-DD"), tZone).split("T")[0]
      );

      if (timings.length > 0) {
        RangeContainTiming = true;
        setSelectedPrayers(timings[0]);
        setTmExist(true);
        break;
      } else {
        RangeContainTiming = false;
      }
    }
    setRangeHasTimings(RangeContainTiming);
  };

  useEffect(() => {
    const today = new Date();
    if (selectedDates[1]) handleRangeDateChange(selectedDates);
    else if (selectedDates[0]) handleSingleDateClick(selectedDates[0]);
    else if (allPrayers.length > 0 && !selectedDates[0])
      handleSingleDateClick(today);
  }, [allPrayers]);
  useEffect(() => {
    if (Object.keys(AdminMasjidState).length === 0 && admin.masjids[0]) {
      const res = dispatch(fetchMasjidById(admin.masjids[0]));
      res.then((result) => {
        const lon = result.location.coordinates[0];
        const lat = result.location.coordinates[1];
        if (lat && lon) {
          let location = tz_lookup(lat, lon);
          setTZone(location);
        }
      });
    } else if (Object.keys(AdminMasjidState).length !== 0) {
      const lon = AdminMasjidState.location.coordinates[0];
      const lat = AdminMasjidState.location.coordinates[1];
      if (lat && lon) {
        let location = tz_lookup(lat, lon);
        setTZone(location);
      }
    }
  }, [admin]);
  const handleRoute = () => {
    if (!isDateSelected)
      handleSnackbar(true, "error", "Please, select a date", dispatch);
    else {
      setShowNamzTiming(true);
    }
  };

  //to fetch 3 months prayer data
  useEffect(() => {
    if (admin.masjids[0]) {
      const startMonth = moment()
        .startOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const endNextMonth = moment()
        .add(1, "M")
        .endOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const res2 = dispatch(
        FetchingTimingsByDateRange(startMonth, endNextMonth, admin.masjids[0])
      );
      res2.then((result) => {
        if (result.status === 200) setAllPrayer(result.data.data);
      });
    }
  }, [reloadTiming, showNamzTiming]);

  const tileContent = ({ date }: { date: any }) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    currentDate.setDate(currentDate.getDate() - 1);
    if (date) {
      const dateHasData = allPrayers.some(
        (item) =>
          item.date.split("T")[0] ===
          UtcDateConverter(moment(date).format("YYYY-MM-DD"), tZone).split(
            "T"
          )[0]
      );
      if (dateHasData && selectedDate >= currentDate) {
        return <div className="green-dot" />;
      }

      return null;
    }

    return null;
  };

  function isToday(date: Date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
  const tileClassName = ({ date }: { date: Date }) => {
    if (isToday(date)) {
      return "today-date";
    }
    return "";
  };

  const handleDeleteAllByRange = () => {
    // moment(selectedStartDate).add("days", i);
    let start = moment(selectedDates[0])
      .subtract("days", 1)
      .format("YYYY-MM-DD");
    let end = moment(selectedDates[1]).format("YYYY-MM-DD");
    const res = dispatch(
      DeletingAllTimingsByDateRange(start, end, admin.masjids[0])
    );
    res.then((result) => {
      if (result.message === "Timings deleted") {
        setReload(!reloadTiming);
        setRangeHasTimings(false);
      } else {
        toast.error("Failed to Delete Timings" + result.message);
      }
    });
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = LocationBasedToday(tZone);
    currentDate.setHours(0, 0, 0, 0);

    // Set the provided date's time component to 00:00:00
    const providedDate = new Date(date);
    providedDate.setHours(0, 0, 0, 0);

    // Disable if the date is before the current date (but not if it's the current date)
    return providedDate < currentDate;
  };

  const reloader = () => {
    setReload(!reloadTiming);
  };

  useEffect(() => {
    const navigationElement = document.querySelector(".react-calendar");

    if (navigationElement) {
      // Check if there is already a button
      const existingButton = document.querySelector(".customly-added-btn");

      // If there is an existing button, remove it
      existingButton && existingButton.remove();

      // Create a container div for the button
      const buttonContainer = document.createElement("div");
      buttonContainer.className = "customly-added-btn";

      // Create an img element
      const imgElement = document.createElement("img");
      imgElement.src = clockIcon;
      imgElement.alt = "Button Image";

      // Create a text element
      const textElement = document.createElement("span");
      textElement.textContent = "Add Timing"; // Replace with your desired text

      // Add event listener to the container div (or button if you prefer)
      buttonContainer.addEventListener("click", handleRoute);
      const buttonSubContainer = document.createElement("div");
      buttonSubContainer.appendChild(imgElement);
      buttonSubContainer.appendChild(textElement);
      // Append the img and text elements to the container div
      buttonContainer.appendChild(buttonSubContainer);

      // Append the container div to the navigation element
      navigationElement.appendChild(buttonContainer);

      // Return a cleanup function to remove the container div when conditions change or the component unmounts
      return () => {
        buttonContainer.remove();
      };
    }
  }, [tZone, showNamzTiming, selectedDates]);

  return (
    <>
      {showNamzTiming ? (
        <NamajTimings
          setShowNamzTiming={setShowNamzTiming}
          prayerType={selectedPrayers?.prayerType as string}
          tims={
            selectedPrayers?.timings
              ? selectedPrayers?.timings
              : allPrayers.length > 0
              ? allPrayers[allPrayers.length - 1].timings
              : undefined
          }
        />
      ) : (
        <div className="mainprayerconatiner">
          <div className="MobileView-main-container">
            <h3 className="page-title">Prayer Timings</h3>
            <div className="MobileView">
              <div className="MobileViewContainer">
                <div className="CalendarContainer">
                  {tZone ? (
                    <SpecialCalendar
                      value={
                        selectedDates[1] ? selectedDates : selectedDates[0]
                      }
                      onDateChange={handleRangeDateChange}
                      handleSingleDateClick={handleSingleDateClick}
                      tileContent={tileContent}
                      tileDisabled={tileDisabled}
                      tileClassName={tileClassName}
                    />
                  ) : null}
                  {/* {tZone ? (
                <div style={{ width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                      value={
                        selectedDates[1] ? selectedDates : selectedDates[0]
                      }
                      displayStaticWrapperAs="desktop"
                      openTo="day"
                      onChange={handleRangeDateChange}
                    />
                  </LocalizationProvider>
                  {/* <Calendar
                    onClickDay={handleSingleDateClick}
                    onChange={handleRangeDateChange}
                    selectRange={true}
                    value={selectedDates[1] ? selectedDates : selectedDates[0]}
                    tileContent={tileContent}
                    tileDisabled={tileDisabled}
                    tileClassName={tileClassName}
                    // calendarFocus="forwards"
                  /> */}
                </div>
              </div>

              <>
                <div className="prayer-right-calender">
                  <PrayerBox
                    prayer={selectedPrayers ? selectedPrayers.timings : []}
                    tZone={tZone}
                    timingId={selectedPrayers ? selectedPrayers?._id : ""}
                    masjidId={admin.masjids[0]}
                    reloader={reloader}
                  >
                    {/* <h3 className="page-title">Prayer Timing</h3> */}
                    <div style={{ margin: "10px auto" }}>
                      <p className="time-zone">Time Zone : {tZone}</p>
                    </div>
                  </PrayerBox>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileViewCalender;
