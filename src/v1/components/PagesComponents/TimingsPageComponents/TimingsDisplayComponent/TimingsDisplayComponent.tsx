import React, { useState, useRef, useEffect, ElementType } from "react";
import "./TimingsDisplayComponent.css";
import TextField from "@mui/material/TextField";
import { DatePicker as SingleDatePicker } from "@material-ui/pickers";
import { TimePicker as SingleTimePicker } from "@material-ui/pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FetchingTimingsByDateRange } from "../../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import { useNavigate } from "react-router";
import UploadPdf from "../../../../photos/UploadPdf.png";
import TimingsNew from "../../../../photos/TimingsNew.png";
import Badge from "@mui/material/Badge";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { PrayerTimings } from "../../../../redux/Types";

type propsType = {
  setManagingTimings: (val: boolean) => void;
  MonthTimings: PrayerTimings<string>[];
  TodaysTimings: PrayerTimings<string>[];
};
const TimingsDisplayComponent = ({
  setManagingTimings,
  MonthTimings,
  TodaysTimings,
}: propsType) => {
  const [SelectedDays, setSelectedDays] = useState<number[]>([]);
  const [SelectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    new Date()
  );
  const [CurrentMonthTimings, setCurrentMonthTimings] = useState([]);
  const [CurrentDayTimings, setCurrentDayTimings] =
    useState<PrayerTimings<string>[]>(TodaysTimings);
  const [ThisMonthTimings, setThisMonthTimings] = useState<PrayerTimings<string>[]>([]);
  const [FirstMonthIncompleteDays, setFirstMonthIncompleteDays] = useState<
    number[]
  >([]);
  const [SecondMonthIncompleteDays, setSecondMonthIncompleteDays] = useState(
    []
  );

  const today = new Date();
  const [selectedMonth, setselectedMonth] = useState(today.getMonth() + 1);
  const dispatch = useAppThunkDispatch();
  const [AdminMasjid, setAdminMasjid] = useState();
  let d1 = moment(today).format("DD/MM/yyyy");
  let d2 = moment(SelectedDate).format("DD/MM/yyyy");
  const [TimeExists, setTimeExists] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = React.useState(new Date());
  const [startDate, setstartDate] = useState(
    moment(new Date()).startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEnddate] = useState(
    moment(new Date()).endOf("month").format("YYYY-MM-DD")
  );
  const [TimingsDetails, setTimingsDetails] = useState();
  let Masjid = useAppSelector((state) => state.AdminMasjid);
  const Mazjid = useAppSelector((state) => state.admin);
  // const Mazjid = JSON.parse(localStorage.getItem("admin"));

  const handleManageTimings = () => {
    setManagingTimings(true);
  };

  const handleUploading = () => {
    navigate("/masjidtimingsupload");
  };

  useEffect(() => {
    let days: number[] = [];
    let Day;
    let CurrentMonthIncompleteDays: number[] = [];
    setThisMonthTimings(MonthTimings);

    MonthTimings.map((item) => {
      Day = new Date(item.date);
      if (Day.getMonth() + 1 === selectedMonth) {
        if (item.timings.length < 5) {
          CurrentMonthIncompleteDays.push(Day.getDate());
        }
        days.push(Day.getDate());
      }
    });

    if (CurrentMonthIncompleteDays.length > 0) {
      setFirstMonthIncompleteDays(CurrentMonthIncompleteDays);
    }

    setSelectedDays(days);
  }, [MonthTimings]);

  useEffect(() => {
    let currentDateFormat =
      moment(SelectedDate).format("YYYY-MM-DD") + "T00:00:00.000Z";
    setCurrentDayTimings(
      MonthTimings.filter((item) => item.date === currentDateFormat)
    );

    if (CurrentDayTimings.length > 0) {
      // if (CurrentDayTimings[0]?.length > 0) {
      setTimeExists(true);
    } else {
      setTimeExists(false);
    }
  }, [SelectedDate]);

  const handleMonthChange = (e: any) => {
    const startDate = moment(e).startOf("month").format("YYYY-MM-DD");
    const endDate = moment(e).endOf("month").format("YYYY-MM-DD");

    setselectedMonth(e.getMonth() + 1);

    if (Mazjid.masjids[0]) {
      const res = dispatch(
        FetchingTimingsByDateRange(startDate, endDate, Mazjid.masjids[0])
      );

      res.then((result) => {
        if (result.status === 200) {
          setThisMonthTimings(result.data.data);

          let days: number[] = [];
          let Day;
          let CurrentMonthIncompleteDays: number[] = [];

          result.data.data.map((item: PrayerTimings<number>) => {
            Day = new Date(item.date);

            if (Day.getMonth() + 1 === e.getMonth() + 1) {
              if (item.timings.length < 5) {
                CurrentMonthIncompleteDays.push(Day.getDate());
              }
              days.push(Day.getDate());
            }
          });

          if (CurrentMonthIncompleteDays.length > 0) {
            setFirstMonthIncompleteDays(CurrentMonthIncompleteDays);
          }
          setSelectedDays(days);
        } else {
          SelectedDays.length > 0 && setSelectedDays([]);
        }
      });
    }
  };

  return (
    <>
      <div className="TimingsDisplayComponent">
        <div className="TimingsDisplayBottomContainerTable">
          <table className="table">
            <thead>
              <span className="PrayertimingsHead">Prayer Timings</span>
              <tr className="tableHead">
                <th className="tableHeaderPrayerName">
                  <span className="tableHeaderContent">Prayer Name</span>
                </th>
                <th className="tableHeaderAzaan">
                  <span className="tableHeaderContent">Azaan Time</span>
                </th>
                <th className="tableHeaderJamaat">
                  <span className="tableHeaderContent">Jamaat Time</span>
                </th>
              </tr>
            </thead>

            {CurrentDayTimings.length > 0 ? (
              CurrentDayTimings[0]?.timings?.map((item: any) => {
                let azaan = new Date(item.azaanTime * 1000);

                let jamaat = new Date(item.jamaatTime * 1000);
                return (
                  <>
                    <tbody className="tableBody">
                      <tr className="tableRadius">
                        <td className="tableRow">
                          <span className="tableHeaderContentBodyName">
                            {item?.namazName}
                          </span>
                        </td>
                        <td className="tableRow">
                          <span className="tableHeaderContentBody">
                            {item?.azaanTime &&
                              azaan?.toLocaleString([], { timeStyle: "short" })}
                          </span>
                        </td>
                        <td className="tableRow">
                          <span className="tableHeaderContentBody">
                            {item?.jamaatTime &&
                              jamaat?.toLocaleString([], {
                                timeStyle: "short",
                              })}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })
            ) : d1 === d2 && TodaysTimings[0]?.timings.length > 0 ? (
              TodaysTimings[0]?.timings.map((item: any) => {
                let azaan = new Date(item.azaanTime * 1000);

                let jamaat = new Date(item.jamaatTime * 1000);
                return (
                  <>
                    <tbody className="tableBody">
                      <tr>
                        <td className="tableRow">
                          <span className="tableHeaderContentBodyName">
                            {item?.namazName}
                          </span>
                        </td>
                        <td className="tableRow">
                          <span className="tableHeaderContentBody">
                            {item?.azaanTime &&
                              azaan?.toLocaleString([], { timeStyle: "short" })}
                          </span>
                        </td>
                        <td className="tableRow">
                          <span className="tableHeaderContentBody">
                            {item?.jamaatTime &&
                              jamaat?.toLocaleString([], {
                                timeStyle: "short",
                              })}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })
            ) : (
              <>
                <div className="NoTimingsAvailable">No Timings Data Found</div>
              </>
            )}
          </table>
        </div>
        <div className="TimingsDisplayTopContainer">
          <div className="DatePickerMUI">
            <SingleDatePicker
              autoOk
              orientation="landscape"
              variant="static"
              openTo="date"
              minDate={new Date()}
              // sx={{ marginTop: "1vh", width: "30vw", height: "20vh" }}
              label="Date"
              value={SelectedDate}
              onChange={setSelectedDate}
              onMonthChange={handleMonthChange}
             
              renderDay={(
                day: any,
                selectedDate: MaterialUiPickersDate,
                isInCurrentMonth: boolean,
                dayComponent: any
              ) => {
                const isSelected =
                  isInCurrentMonth && SelectedDays?.includes(day.getDate());
                const isIncompleteSelected =
                  isInCurrentMonth &&
                  FirstMonthIncompleteDays?.includes(day.getDate());
                return (
                  <Badge
                    key={day.toString()}
                    // overlap="'circular'"
                    badgeContent={
                      isSelected ? (
                        isIncompleteSelected ? (
                          <div
                            style={{
                              height: "5px",
                              width: "5px",
                              borderRadius: "100%",
                              background: "orange",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              height: "5px",
                              width: "5px",
                              borderRadius: "100%",
                              background: "green",
                            }}
                          />
                        )
                      ) : undefined
                    }
                  >
                    {dayComponent}
                  </Badge>
                );
              }}
            />
          </div>
          <div className="MasjidTimingsButtonComponent">
            <div className="UploadTimings">
              <img src={TimingsNew} className="imgUpload" />

              <button
                className="MasjidManageTimingsButton"
                onClick={handleManageTimings}
              >
                Manage Timings
              </button>
            </div>
            {/* <div className="UploadTimingsWithSubHeading">
              <div className="UploadTimings">
                <img src={UploadPdf} className="imgUpload" />
                <button
                  className="MasjidManageTimingsButton"
                  onClick={handleUploading}
                >
                  Upload Timings
                </button>
              </div>
              <div className="SubContainerForPdf">
                Upload Csv, Pdf, Excel Files
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimingsDisplayComponent;
