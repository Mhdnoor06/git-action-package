import React, { useEffect, useState } from "react";
import "./specialPrayer.css";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { addingSpecialTimings } from "../../../redux/actions/SpecialTimingsActions/AddingSpecialTimings";
import { ResponseType, SpecialPrayer } from "../../../redux/Types";
// import moment, { tz } from "moment-timezone";
import tz_lookup from "tz-lookup";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import toast from "react-hot-toast";
import { GetSpecialTimingsByMasjidId } from "../../../redux/actions/SpecialTimingsActions/specialTimingsByMasjidId";
// import FormattedTimeTd from "./FormatedTimeTd";
import { deletingSpecialTimings } from "../../../redux/actions/SpecialTimingsActions/DeletingSpecialTimings";
import { updatingSpecialTimings } from "../../../redux/actions/SpecialTimingsActions/UpdatingSpecialTimings";
import noPrayer from "../../../photos/prayerIcon/noPrayer.svg";
import btnImg from "../../../photos/clockIcon.png";
import {
  LocationBasedToday,
  UTCTimeConverter,
  UTCTimeReverter,
  UtcDateConverter,
  dateFormatter,
  dateReverter,
  formatConvertDate,
} from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import SpecialPrayerCard from "./SpecialPrayerCard";
import { Backdrop, Card, CircularProgress } from "@mui/material";
import CustomBtn from "../Shared/CustomBtn";
import ClockTimeInput from "../Shared/ClockTimeInput";
import CustomCalender from "../Shared/calendar/CustomCalender";
import calender from "../../../photos/Newuiphotos/Icons/calender.svg";
import { parseISO } from "date-fns";

interface FormData {
  name: string;
  azaanTime: number;
  jamaatTime: number;
  startDate: string;
  endDate: string;
}

function SpecialPrayersComponent() {
  const [prayers, setPrayers] = useState<SpecialPrayer<number>[]>([]);
  const [tZone, setTZone] = useState<string>("");
  let admin = useAppSelector((state) => state.admin);
  const [prayerName, setPrayerName] = useState("");
  const [azaanTiming, setAzaanTiming] = useState("");
  const [jamaatTiming, setJamaatTiming] = useState("");
  const [specialId, setSpecialId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showTable, setShowTable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [reloadTimings, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [calendarDateType, setCalendarDateType] = useState<"start" | "end">(
    "start"
  );
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    azaanTime: "",
    jamaatTime: "",
    startDate: "",
    endDate: "",
  });
  const dispatch = useAppThunkDispatch();

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const defaultValue = new Date();
  const [value, setValue] = useState<Date>(defaultValue);
  // const [selectedDt, setSelectedDt] = useState<String>("");

  const handleToggleCalendar = (dateType: "start" | "end") => {
    setIsCalendarVisible(!isCalendarVisible);
    setCalendarDateType(dateType);

    if (dateType === "start" && (startDate || endDate)) {
      console.log(startDate);

      const parsedStartDate = parseISO(startDate);
      setValue(parsedStartDate);
      console.log(Boolean(startDate));
    } else {
      const parsedEndDate = parseISO(endDate);
      setValue(parsedEndDate);
    }
  };

  const handleDateValidation = (dateType: "start" | "end", newDate: string) => {
    const startDateValue = dateType === "start" ? newDate : startDate;
    const endDateValue = dateType === "end" ? newDate : endDate;

    if (startDateValue && endDateValue) {
      const startDateObj = new Date(startDateValue);
      const endDateObj = new Date(endDateValue);
      if (startDateObj > endDateObj) {
        // toast.error(
        //   dateType === "start"
        //     ? "Start date cannot be greater than Ed date"
        //     : "End date cannot be lesser than tart date"
        // );
        dateType === "start" ? setEndDate(newDate) : setStartDate(newDate);
      }
    }
  };

  const handleCalendarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleDateSelect = (selectedDate: Date) => {
    const newDate = formatConvertDate(selectedDate);

    if (calendarDateType === "start") {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }

    handleDateValidation(calendarDateType, newDate);

    setTimeout(() => {
      setIsCalendarVisible(false);
    }, 300);
  };

  useEffect(() => {
    if (admin.masjids[0]) {
      const res = dispatch(fetchMasjidById(admin.masjids[0]));
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

  useEffect(() => {
    if (admin.masjids[0]) {
      setIsInitialLoaded(true);
      const res = dispatch(GetSpecialTimingsByMasjidId(admin.masjids[0]));
      res.then((result: ResponseType) => {
        if (result.success) {
          setPrayers(result.data);
        }
        setIsInitialLoaded(false);
      });
    }
  }, [reloadTimings, showTable]);

  const handleConfirmPrayer = (e: any) => {
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
    }

    // if (azaanTiming && azaanTiming > jamaatTiming) {
    //   toast.error(`Azaan timing is grater then Jamaat timing`);
    //   return;
    // }
    setPreview(true);
    setFormData({
      name: prayerName,
      azaanTime: UTCTimeConverter(azaanTiming, startDate, tZone),
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: startDate,
      endDate: endDate,
    });
  };

  const handleAddPrayer = () => {
    setIsLoading(true);
    setPreview(false);
    let newTimings: SpecialPrayer<number> = {
      name: prayerName,
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: UtcDateConverter(startDate, tZone),
      endDate: UtcDateConverter(endDate, tZone),
    };
    if (azaanTiming)
      newTimings.azaanTime = UTCTimeConverter(azaanTiming, startDate, tZone);
    const res = dispatch(addingSpecialTimings(newTimings, admin.masjids[0]));
    res.then((result: ResponseType) => {
      if (result.success !== false) {
        dataCleaner();
      }
      setIsLoading(false);
    });
  };

  const handleDelete = async (id: string) => {
    // const message = "Are you sure you want delete Jummah prayer ?";
    // const willDel = await confirmation(message);

    // if (!willDel) return;
    const loading = toast.loading("Please wait...!");
    const res = dispatch(deletingSpecialTimings(admin.masjids[0], id));
    res.then((result) => {
      toast.dismiss(loading);
      if (result.success) {
        toast.success("SuccessFully Deleted Special Timings");
        setReload(!reloadTimings);
      }
    });
    // toast.dismiss(loading);
  };

  const handleEdit = (time: SpecialPrayer<any>) => {
    if (time._id) setSpecialId(time._id);
    setShowTable(false);
    setIsEditing(true);
    setPrayerName(time.name);
    if (time.azaanTime) setAzaanTiming(UTCTimeReverter(time.azaanTime, tZone));
    setJamaatTiming(UTCTimeReverter(time.jamaatTime, tZone));
    setStartDate(dateReverter(time.startDate, tZone));
    setEndDate(dateReverter(time.endDate, tZone));
  };

  const dataCleaner = (showTab = true) => {
    setPrayerName("");
    setAzaanTiming("");
    setJamaatTiming("");
    setStartDate("");
    setEndDate("");
    setIsEditing(false);
    setShowTable(showTab);
  };

  const handleConfirmUpdatePrayer = async (e: any) => {
    e.preventDefault();
    // const message = "Are you sure you want to update special timing ?";
    // const isConfirmed = await confirmation(message);
    // if (!isConfirmed) return;
    setPreview(true);
    setFormData({
      name: prayerName,
      azaanTime: UTCTimeConverter(azaanTiming, startDate, tZone),
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: startDate,
      endDate: endDate,
    });

    if (azaanTiming && azaanTiming > jamaatTiming) {
      toast.error(`Azaan timing is grater then Jamaat timing`);
      return;
    }
  };

  console.log(isInitialLoaded);

  const handleUpdatePrayer = () => {
    setIsLoading(true);
    setPreview(false);
    let newTimings: SpecialPrayer<number> = {
      name: prayerName,
      jamaatTime: UTCTimeConverter(jamaatTiming, startDate, tZone),
      startDate: UtcDateConverter(startDate, tZone),
      endDate: UtcDateConverter(endDate, tZone),
    };
    if (azaanTiming)
      newTimings.azaanTime = UTCTimeConverter(azaanTiming, startDate, tZone);
    const res = dispatch(
      updatingSpecialTimings(newTimings, admin.masjids[0], specialId)
    );
    res.then((result: ResponseType) => {
      if (result.success !== false) {
        dataCleaner();
      }
      setIsLoading(false);
    });
  };
  const handleShowTable = () => {
    dataCleaner(false);
  };
  const handleBackBtn = () => {
    setShowTable(true);
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

  return (
    <div className="special-main">
      {/* <div className="special-title">
        <div
          className="event-backBtn"
          style={showTable ? { visibility: "hidden" } : {}}
          onClick={() => setShowTable(true)}
        >
          <BackButton handleBackBtn={handleBackBtn} />
        </div>
        <h3 className="page-title">Other Prayers</h3>
        <div></div>
      </div> */}

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
              Other Prayers
            </h3>
            <div></div>
          </div>
          <Card className="special-card">
            {/* <div className="special-top">
              <h2>Special Prayers</h2>
              {showTable ? (
                <img
                  onClick={handleShowTable}
                  className="plus-icon"
                  src={plusIcon}
                  alt=""
                />
              ) : (
                <button
                  className="special-Btn"
                  onClick={() => setShowTable(true)}
                >
                All Special Prayer
                </button>
              )}
            </div> */}
            <div className="event-container">
              <form>
                <div className="otherPrayerForm" style={{ padding: "20px" }}>
                  {" "}
                  <label>Prayer Name</label>
                  <input
                    type="text"
                    value={prayerName}
                    onChange={(e) => setPrayerName(e.target.value)}
                    required
                    placeholder="Enter name"
                  />
                  <label>Start Date</label>
                  <div
                    className="date-picker-container"
                    style={{ position: "relative" }}
                    onClick={() => handleToggleCalendar("start")}
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
                        right: "15px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <img src={calender} alt="" width={"14px"} />
                    </span>
                  </div>
                  <label>End Date</label>
                  <div
                    className="date-picker-container"
                    style={{ position: "relative" }}
                    onClick={() => handleToggleCalendar("end")}
                  >
                    <input
                      type="text"
                      placeholder="dd-mm-yyyy"
                      value={dateFormatter(endDate)}
                      readOnly
                      // onClick={() => {
                      //   handleToggleCalendar;
                      // }}
                    />
                    <span
                      className="calendar-icon"
                      style={{
                        position: "absolute",
                        top: "40%",
                        right: "15px",
                        transform: "translateY(-50%)",
                      }}
                      // onClick={() => handleToggleCalendar}
                    >
                      <img src={calender} alt="" width={"14px"} />
                    </span>
                  </div>
                  <div className="azan-iqama-box">
                    <ClockTimeInput
                      label={"Azaan Time(Optional)"}
                      tim={azaanTiming}
                      setTime={setAzaanTiming}
                    />
                    <ClockTimeInput
                      label={"Iqama Time"}
                      tim={jamaatTiming}
                      setTime={setJamaatTiming}
                    />
                  </div>
                  <div className="btn-container">
                    <CustomBtn
                      eventHandler={
                        isEditing
                          ? handleConfirmUpdatePrayer
                          : handleConfirmPrayer
                      }
                      icon={btnImg}
                      label={isEditing ? "Update Timings" : "Add Timings"}
                      isDisabled={isLoading}
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
              onClick={handleToggleCalendar}
            >
              <div className="CalendarContainer" onClick={handleCalendarClick}>
                <CustomCalender
                  onDateSelect={handleDateSelect}
                  // selectedDt={selectedDt}
                  minDate={new Date()}
                  value={value}
                  setValue={setValue}
                  tileDisabled={tileDisabled}
                />
              </div>
            </Backdrop>
          )}

          {preview && (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={preview}
              // onClick={handleToggleCalendar}
            >
              <div className="special-table">
                <SpecialPrayerCard
                  isInitialLoaded={isInitialLoaded}
                  handleEdit={handleEdit}
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
                      Are you sure you want to update other prayer timing ?
                    </p>
                    <div className="spltimbtn">
                      <button
                        className="spltimbtnno"
                        style={{ background: "#FF7272", color: "white" }}
                        onClick={() => {
                          setPreview(false);
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
                </SpecialPrayerCard>
              </div>
            </Backdrop>
          )}
        </div>
      ) : (
        <>
          <div className="otherprayercards">
            <div className="special-title">
              <h3 className="page-title">Other Prayers</h3>
              <div></div>
            </div>
            <div className="center-block">
              <CustomBtn
                eventHandler={handleShowTable}
                label={"Add Timings"}
                icon={btnImg}
              />
            </div>

            <div className="special-table">
              <>
                {prayers.map((prayer, index) => (
                  <SpecialPrayerCard
                    key={index}
                    isInitialLoaded={isInitialLoaded}
                    handleEdit={handleEdit}
                    prayer={prayer}
                    handleDelete={handleDelete}
                    hasPrayers={prayers.length ? true : false}
                    tZone={tZone}
                  ></SpecialPrayerCard>
                ))}
                {!prayers.length ? (
                  <>
                    {isInitialLoaded ? (
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

export default SpecialPrayersComponent;
