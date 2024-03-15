import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import "./TimingsManageComponent.css";
import { DefinedRange, RangeKeyDict } from "react-date-range";
import { DateRange } from "react-date-range";
import { CircularProgress } from "@material-ui/core";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { MasjidTimes } from "../../../../constants/MazjidDemoTimes/MazjidDemoTimes";
import { addDays } from "date-fns";
import moment from "moment";
import { defaultStaticRanges } from "../../../../constants/StaticRanges/defaultStaticRanges";
import { format, isWeekend } from "date-fns";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FetchingTimingsByDateRange } from "../../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import ManageTimingsMaterialTable from "./ManageTimingsMaterial Table/ManageTimingsMaterialTable";
import axios from "axios";
import { ChangeSnackbar } from "../../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";
import { PrayerTimings } from "../../../../redux/Types";

interface DateRangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
}
type MasjidTm = {
  namazName: string;
  azaanTime: number;
  jamaatTime: number;
  type?: number;
};
type propsType = {
  CurrentMonthTimings: PrayerTimings<number>[];
  TodaysTimings:  PrayerTimings<number>[];
  APITimings: any;
  setAPITimings: Dispatch<SetStateAction<MasjidTm[]>>;
};
const TimingsManageComponent = ({
  CurrentMonthTimings,
  TodaysTimings,
  APITimings,
  setAPITimings,
}: propsType) => {
  const today = new Date();
  let AdminMasjid = useAppSelector((state) => state.AdminMasjid);
  const [TwoMonthTimings, setTwoMonthTimings] = useState([]);
  const [FirstMonthSelectedDays, setFirstMonthSelectedDays] = useState<
    number[]
  >([]);
  const [FirstMonthIncompleteDays, setFirstMonthIncompleteDays] = useState<
    number[]
  >([]);
  const [SecondMonthSelectedDays, setSecondMonthSelectedDays] = useState<
    number[]
  >([]);
  const [SecondMonthIncompleteDays, setSecondMonthIncompleteDays] = useState<
    number[]
  >([]);
  const [ThirdMonthSelectedDays, setThirdMonthSelectedDays] = useState<
    number[]
  >([]);
  const [ThirdMonthIncompleteDays, setThirdMonthIncompleteDays] = useState<
    number[]
  >([]);
  const [CurrentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [NextMonth, setNextMonth] = useState(today.getMonth() + 2);
  const [ThreeMonthTimings, setThreeMonthTimings] = useState<PrayerTimings<number>[]>(
    []
  );
  const [CurrentSelectedDayTimings, setCurrentSelectedDayTimings] = useState(
    CurrentMonthTimings[0]?.timings
  );
  const startDate = moment().startOf("month").format("YYYY-MM-DD");
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  let RangeHasTimingsRef = useRef<any>();
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  let Mazjid = useAppSelector((state) => state.admin);
  // const Mazjid = JSON.parse(localStorage.getItem("admin"));
  const [ThirdMonth, setThirdMonth] = useState(today.getMonth() + 3);
  const [RangeHasTimings, setRangeHasTimings] = useState(false);
  const [state, setState] = useState<DateRangeItem[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleRangeAPITimings = (item: { selection: DateRangeItem }) => {
    let Timings: string[] = [];
    let selectedStartDate = moment(item.selection.startDate).format(
      "DD-MM-YYYY"
    );

    axios
      .get(`https://api.aladhan.com/v1/timingsByAddress/${selectedStartDate}`, {
        params: {
          address: AdminMasjidState?.address,
        },
      })
      .then((res) => {
        Timings.push(
          moment(res.data.data.timings.Fajr, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Dhur, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Asar, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Maghrib, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );
        Timings.push(
          moment(res.data.data.timings.Isha, "h:mm a").format(
            "YYYY-MM-DD  hh:mm a"
          )
        );

        let MasjidTimes = [
          {
            namazName: "Fajr",
            azaanTime: moment(Timings[0]).unix(),
            jamaatTime: moment(Timings[0]).unix(),
            type: 1,
          },
          {
            namazName: "Dhur",
            azaanTime: moment(Timings[1]).unix(),
            jamaatTime: moment(Timings[1]).unix(),
            type: 2,
          },
          {
            namazName: "Asar",
            azaanTime: moment(Timings[2]).unix(),
            jamaatTime: moment(Timings[2]).unix(),
            type: 3,
          },
          {
            namazName: "Maghrib",
            azaanTime: moment(Timings[3]).unix(),
            jamaatTime: moment(Timings[3]).unix(),
            type: 4,
          },
          {
            namazName: "Isha",
            azaanTime: moment(Timings[4]).unix(),
            jamaatTime: moment(Timings[4]).unix(),
            type: 5,
          },
        ];

        setAPITimings(MasjidTimes);
      })
      .catch((error) => {
        const snackbarFailureDetails = {
          snackbarOpen: true,
          snackbarType: "warning",
          snackbarMessage: "Couldn't Get Prefilled Timings for the location",
        };

        dispatch(ChangeSnackbar(snackbarFailureDetails));
        setAPITimings(MasjidTimes);
      });
  };

  const handleRangeChange = (item: any) => {
    setState([item.selection]);
    let selectedStartDate = moment(item.selection.startDate);
    let selectedEndDate = moment(item.selection.endDate);
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;
    let RangeContainTiming = false;

    handleRangeAPITimings(item);

    for (let i = 0; i < difference; i++) {
      let date = moment(selectedStartDate).add("days", i);
      const timings = ThreeMonthTimings.filter(
        (item) =>
          item.date === moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z"
      );

      if (timings.length > 0) {
        RangeContainTiming = true;
        break;
      } else {
        RangeContainTiming = false;
      }
    }
    setRangeHasTimings(RangeContainTiming);
    RangeHasTimingsRef.current = RangeContainTiming;
  };

  useEffect(() => {
    handleSettingUpCalendar();
  }, [ThreeMonthTimings]);

  // useEffect(() => {
  //   let currentDateFormat = moment(state[0].startDate).format("YYYY-MM-DD") + "T00:00:00.000Z";
  //   let timingDate = CurrentMonthTimings;

  //   if (timingDate.length > 0) {
  //     setCurrentSelectedDayTimings(timingDate[0]?.timings);
  //   } else {
  //     setCurrentSelectedDayTimings(APITimings);
  //   }
  // }, [state]);

  useEffect(() => {
    let currentDateFormat =
      moment(today).format("YYYY-MM-DD") + "T00:00:00.000Z";
    const endDate = moment(new Date()).add(45, "days").format("YYYY-MM-DD");

    const res = dispatch(
      FetchingTimingsByDateRange(startDate, endDate, Mazjid?.masjids[0])
    );

    res.then((result) => {
      if (result.status === 200) {
        setThreeMonthTimings(result.data.data);
        handleSettingUpCalendar();
      }
    });
  }, [Mazjid?.masjids[0]]);

  // console.log(APITimings);

  useEffect(() => {
    let currentDateFormat =
      moment(state[0]?.startDate).format("YYYY-MM-DD") + "T00:00:00.000Z";

    let timingDate = ThreeMonthTimings.filter(
      (item) => item.date === currentDateFormat
    );

    if (timingDate.length > 0) {
      setCurrentSelectedDayTimings(timingDate[0]?.timings);
    } else {
      setCurrentSelectedDayTimings(APITimings);
    }
  }, [state, ThreeMonthTimings]);

  const handleSettingUpCalendar = () => {
    let CurrentMonthDays: number[] = [];
    let CurrentMonthIncompleteDays: number[] = [];
    let NextMonthDays: number[] = [];
    let NextMonthIncompleteDays: number[] = [];
    let ThirdMonthDays: number[] = [];
    let ThirdMonthIncompleteDays: number[] = [];
    let Day;

    if (CurrentMonth === 12) {
      setCurrentMonth(1);
    }
    console.log(ThreeMonthTimings);

    ThreeMonthTimings?.map((item) => {
      Day = new Date(item.date);
      // console.log(item.timings)
      if (CurrentMonth < 12) {
        if (Day.getMonth() + 1 === CurrentMonth) {
          if (item.timings.length < 5) {
            CurrentMonthIncompleteDays.push(Day.getDate());
          }
          CurrentMonthDays.push(Day.getDate());
        } else if (Day.getMonth() + 1 === NextMonth) {
          if (item.timings.length < 5) {
            NextMonthIncompleteDays.push(Day.getDate());
          }
          NextMonthDays.push(Day.getDate());
        } else if (Day.getMonth() + 1 === ThirdMonth) {
          if (item.timings.length < 5) {
            ThirdMonthIncompleteDays.push(Day.getDate());
          }
          ThirdMonthDays.push(Day.getDate());
        }

        setFirstMonthSelectedDays(CurrentMonthDays);
        setSecondMonthSelectedDays(NextMonthDays);
        setThirdMonthSelectedDays(ThirdMonthDays);

        if (CurrentMonthIncompleteDays.length > 0) {
          setFirstMonthIncompleteDays(CurrentMonthIncompleteDays);
        }
        if (NextMonthIncompleteDays.length > 0) {
          setSecondMonthIncompleteDays(NextMonthIncompleteDays);
        }
        if (ThirdMonthIncompleteDays.length > 0) {
          setThirdMonthIncompleteDays(ThirdMonthIncompleteDays);
        }
      } else {
        if (Day.getMonth() + 1 === CurrentMonth) {
          if (item.timings.length < 5) {
            CurrentMonthIncompleteDays.push(Day.getDate());
          }
          CurrentMonthDays.push(Day.getDate());
        } else if (Day.getMonth() + 1 === 1) {
          if (item.timings.length < 5) {
            NextMonthIncompleteDays.push(Day.getDate());
          }
          NextMonthDays.push(Day.getDate());
        } else if (Day.getMonth() + 1 === 2) {
          if (item.timings.length < 5) {
            ThirdMonthIncompleteDays.push(Day.getDate());
          }
          ThirdMonthDays.push(Day.getDate());
        }
        setFirstMonthSelectedDays(CurrentMonthDays);
        setSecondMonthSelectedDays(NextMonthDays);
        setThirdMonthSelectedDays(ThirdMonthDays);

        if (CurrentMonthIncompleteDays.length > 0) {
          setFirstMonthIncompleteDays(CurrentMonthIncompleteDays);
        }
        if (NextMonthIncompleteDays.length > 0) {
          setSecondMonthIncompleteDays(NextMonthIncompleteDays);
        }
        if (ThirdMonthIncompleteDays.length > 0) {
          setThirdMonthIncompleteDays(ThirdMonthIncompleteDays);
        }
      }
    });
  };

  function customDayContent(day: Date) {
    let extraDot = null;
    if (
      (today.getMonth() + 1 === day.getMonth() + 1 && day >= today) ||
      day.toDateString() === today.toDateString()
    ) {
      if (FirstMonthSelectedDays?.includes(day.getDate())) {
        extraDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "green",
              position: "absolute",
              top: 1,
              right: 1,
            }}
          />
        );
      }
      if (FirstMonthIncompleteDays?.includes(day.getDate())) {
        extraDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "orange",
              position: "absolute",
              top: 1,
              right: 1,
            }}
          />
        );
      }
    } else if (day.getMonth() + 1 === NextMonth) {
      if (SecondMonthSelectedDays?.includes(day.getDate())) {
        extraDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "green",
              position: "absolute",
              top: 1,
              right: 1,
            }}
          />
        );
      }
      if (SecondMonthIncompleteDays?.includes(day.getDate())) {
        extraDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "orange",
              position: "absolute",
              top: 1,
              right: 1,
            }}
          />
        );
      }
    } else if (day.getMonth() + 1 === ThirdMonth) {
      if (ThirdMonthSelectedDays?.includes(day.getDate())) {
        extraDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "green",
              position: "absolute",
              top: 1,
              right: 1,
            }}
          />
        );
      }
      if (ThirdMonthIncompleteDays?.includes(day.getDate())) {
        extraDot = (
          <div
            style={{
              height: "5px",
              width: "5px",
              borderRadius: "100%",
              background: "orange",
              position: "absolute",
              top: 1,
              right: 1,
            }}
          />
        );
      }
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }

  return (
    <>
      <div className="ManageTimingsContainer">
        <div className="ManageTimingsCalendarContainer">
          <DefinedRange
            onChange={(item: RangeKeyDict) =>
              handleRangeChange(item)
            }
            ranges={state}
            staticRanges={defaultStaticRanges}
          />
          <DateRange
            onChange={(item) => handleRangeChange(item)}
            // showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            editableDateInputs={true}
            dayContentRenderer={customDayContent}
            minDate={new Date()}
            maxDate={new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000)}
            ranges={state}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="forwards"
            // style={{ width: "20vw", height: "10px", fontFamily: "Lato" }}
          />
        </div>
        <div className="Lines"></div>
        <div className="BottomContainerManageEvents">
          <ManageTimingsMaterialTable
            CurrentSelectedDayTimings={CurrentSelectedDayTimings}
            APITimings={APITimings}
            startDate={state[0].startDate}
            RangeHasTimings={RangeHasTimings}
            endDate={state[0].endDate}
            ThreeMonthTimings={ThreeMonthTimings}
            setCurrentSelectedDayTimings={setCurrentSelectedDayTimings}
            handleSettingUpCalendar={handleSettingUpCalendar}
            setThreeMonthTimings={setThreeMonthTimings}
          />
        </div>
      </div>
    </>
  );
};

export default TimingsManageComponent;
