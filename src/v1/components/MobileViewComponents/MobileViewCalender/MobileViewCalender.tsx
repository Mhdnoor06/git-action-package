import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import "react-calendar/dist/Calendar.css";
import "./MobileViewComponent.css";
import moment from "moment-timezone";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import tz_lookup from "tz-lookup";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import {
  LocationBasedToday,
  UtcDateConverter,
} from "../../../helpers/HelperFunction";
import { FetchingTimingsByDateRange } from "../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import { PrayerTimings } from "../../../redux/Types";
import NamazTimings from "../NamazTIming/NamazTImings";
import PrayerBox from "../Shared/PrayerBox/PrayerBox";
import clockIcon from "../../../photos/clockIcon.png";
import SpecialCalendar from "../Shared/calendar/SpecialCalendar";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProgressLoader from "../Shared/Loader/Loader";
import CustomBtn from "../Shared/CustomBtn";
import { Box, Button, Typography } from "@mui/material";
import prayercalender from "../../../photos/Newuiphotos/Icons/prayercalender.svg";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import BackButton from "../Shared/BackButton";
import { SalahType } from "./SalahTimings/SalahTimings";
import { GET_TIMINGS_BY_MASJID_ID_WITH_ENDDATE } from "../../../graphql-api-calls/Salah/queries";
import SunCalc from "suncalc";
import { useQuery } from "@apollo/client";
import FullMonthCalendar from "./FullMonthCalendar/FullMonthCalendar";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import DownloadIcon from "@mui/icons-material/Download";

type MobileViewCalenderProps = {
  consumerMasjidId: string;
  setSelectedType: Dispatch<SetStateAction<SalahType>>;
};

async function fetchHijriCalendar(year: string, month: string) {
  const response = await fetch(
    `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
  );
  const data = await response.json();
  return data.data.map((day: any) => ({
    gregorianDate: day.gregorian.date,
    hijriDate: `${day.hijri.month.en} ${day.hijri.day}, ${day.hijri.year}`,
  }));
}

const MobileViewCalender = ({
  consumerMasjidId,
  setSelectedType,
}: MobileViewCalenderProps) => {
  const selectedDatesArray = useAppSelector((state) => state.selectedDate);

  const [tZone, setTZone] = useState("");
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const dispatch = useAppThunkDispatch();
  const [reloadTiming, setReload] = useState<boolean>(false);
  const [allPrayers, setAllPrayer] = useState<PrayerTimings<number>[]>([]);
  const [showNamzTiming, setShowNamzTiming] = useState<boolean>(false);
  const [hijriDatesMap, setHijriDatesMap] = useState<any>({});
  const [selectedPrayers, setSelectedPrayers] =
    useState<PrayerTimings<number>>();
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef<SwiperClass>();
  let admin = useAppSelector((state) => state.admin);
  //Selected Date for Range or Single use this function
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [loadedPrayers, setLoadedPrayers] = useState<PrayerTimings<number>[]>(
    []
  );
  const [currentMonthsPrayers, setCurrentMonthsPrayers] = useState<
    PrayerTimings<number>[]
  >([]);
  const [shouldPrint, setShouldPrint] = useState(false);

  const [masjid, setMasjid] = useState();
  const componentRef = useRef<HTMLDivElement>(null);
  const startMonth = tZone
    ? moment().tz(tZone).startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
    : moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"); // Use UTC or a default timezone
  const endOfYear = moment().endOf("year").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const {
    loading: loadingTimings,
    error: errorTimings,
    data: timingsData,
    refetch: timingsRefetch,
  } = useQuery(GET_TIMINGS_BY_MASJID_ID_WITH_ENDDATE, {
    variables: { masjidId: consumerMasjidId, startDate: startMonth },
    skip: !consumerMasjidId,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const INITIAL_LOAD_COUNT = 10;
  const LOAD_MORE_COUNT = 20;
  //to fetch from current date to end of the year prayer data

  useEffect(() => {
    if (Object.keys(AdminMasjidState).length === 0 && consumerMasjidId) {
      const res = dispatch(fetchMasjidById(consumerMasjidId));
      res.then((result) => {
        setMasjid(result);
        const lon = result.location.coordinates[0];
        const lat = result.location.coordinates[1];
        if (lat && lon) {
          let location = tz_lookup(lat, lon);
          setTZone(location);
        }
      });
    } else if (Object.keys(AdminMasjidState).length !== 0) {
      setMasjid(AdminMasjidState);

      const lon = AdminMasjidState.location.coordinates[0];
      const lat = AdminMasjidState.location.coordinates[1];
      if (lat && lon) {
        let location = tz_lookup(lat, lon);
        setTZone(location);
      }
    }
  }, [admin]);

  useEffect(() => {
    if (!loadingTimings && timingsData && tZone) {
      console.log("relaoding data in mobile view calendar");
      const today = moment().tz(tZone).format("YYYY-MM-DD");
      // console.log("today", today);
      // const filteredData = timingsData?.getTimingsByMasjidId.filter(
      //   (item: any) => {
      //     const itemDateInTimeZone = moment.tz(item.date, tZone);
      //     return itemDateInTimeZone.isSameOrAfter(today, "day");
      //   }
      // );
      // console.log("filteredData", filteredData);
      const filteredData = timingsData?.getTimingsByMasjidId.filter(
        (item: any) => moment(item.date).isSameOrAfter(today, "day")
      );
      setAllPrayer(filteredData);
      // Call your fetchHijriDates or any other function you need
      fetchHijriDates(filteredData);
      setIsLoading(false);
    }
  }, [loadingTimings, timingsData, tZone]); // Only depend on data and tZone for this effect
  useEffect(() => {
    if (consumerMasjidId && tZone && !showNamzTiming) {
      setIsLoading(true);
      timingsRefetch()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [reloadTiming, showNamzTiming, tZone]); // Add all conditions that should trigger a refetch
  useEffect(() => {
    if (!showNamzTiming && tZone) {
      const todayInTZone = LocationBasedToday(tZone);
      const parsedTodayInTZone = moment(todayInTZone);

      handleSingleDateClick(parsedTodayInTZone.toDate());
    }
  }, [showNamzTiming]);
  useEffect(() => {
    setLoadedPrayers(allPrayers.slice(0, INITIAL_LOAD_COUNT));
  }, [allPrayers]);

  const loadMorePrayers = useCallback(() => {
    setLoadedPrayers((prevLoadedPrayers) => {
      const currentCount = prevLoadedPrayers.length;
      const morePrayers = allPrayers.slice(
        currentCount,
        currentCount + LOAD_MORE_COUNT
      );
      return [...prevLoadedPrayers, ...morePrayers];
    });
  }, [allPrayers]);
  const handleSingleDateClick = (date: Date) => {
    setSelectedDates([date, null]);
    dispatch({
      type: "singleDate",
      payload: [moment(date).format("YYYY-MM-DD")],
    });
    let selectedDate = moment(date);

    const timings = allPrayers.filter(
      (item) =>
        item.date.split("T")[0] ===
        UtcDateConverter(selectedDate.format("YYYY-MM-DD"), tZone).split("T")[0]
    );

    if (timings.length > 0) {
      setSelectedPrayers(timings[0]);
      setIsLoading(false);
      const index = allPrayers.findIndex(
        (item) => item.date.split("T")[0] === timings[0].date.split("T")[0]
      );

      // Ensure swiperRef.current is not undefined
      if (swiperRef.current && !showNamzTiming) {
        swiperRef.current.slideTo(index);
      }
    } else {
      setIsLoading(false);
      setSelectedPrayers(undefined);
    }
  };

  const handleRangeDateChange = useCallback(
    (date) => {
      const date1 = moment(date[0], "YYYY-MM-DD");
      const date2 = moment(date[1], "YYYY-MM-DD");

      if (date1.isSame(date2, "day")) return;

      const processedData = [
        moment(date[0]).format("YYYY-MM-DD"),
        moment(date[1]).format("YYYY-MM-DD"),
      ];
      dispatch({ type: "rangeDate", payload: processedData });
      setSelectedDates([date[0], date[1]]);

      const selectedStartDate = moment(date[0]);
      const firstDay = selectedStartDate; // Get the first day

      // Check for a match on the first day
      const timings = allPrayers.filter(
        (item) =>
          item.date.split("T")[0] ===
          UtcDateConverter(firstDay.format("YYYY-MM-DD"), tZone).split("T")[0]
      );

      if (timings.length > 0) {
        setSelectedPrayers(timings[0]);
      } else {
        setSelectedPrayers(undefined);
      }
    },
    [allPrayers, selectedDates, tZone, dispatch]
  );

  const handlePrintCalendar = () => {
    if (
      timingsData?.getTimingsByMasjidId &&
      timingsData.getTimingsByMasjidId.length > 0
    ) {
      const startDate =
        selectedDatesArray.length > 0 && selectedDatesArray[0]
          ? moment(selectedDatesArray[0]) // Convert string date to moment object
          : moment(LocationBasedToday(tZone)); // Convert Date object to moment object

      const firstOfMonth = startDate.clone().startOf("month");
      const lastOfMonth = startDate.clone().endOf("month");

      const CurrentMonthData = timingsData.getTimingsByMasjidId.filter(
        (item: any) => {
          const itemDate = moment(item.date);
          return itemDate.isBetween(firstOfMonth, lastOfMonth, null, "[]");
        }
      );
      if (CurrentMonthData && CurrentMonthData.length > 0) {
        if (!masjid) {
          toast.error("Masjid Details Not Found");
          return;
        }
        const transformedData = CurrentMonthData.map((day: any) => {
          const { sunrise } = SunCalc.getTimes(
            new Date(day.date),
            masjid.location.coordinates[1],
            masjid.location.coordinates[0]
          );

          const ishraqTime = sunrise.getTime() / 1000; // Using sunrise as Ishraq for demonstration

          const timings = day.timings.reduce((acc: any, prayer: any) => {
            const azanTime =
              prayer.azaanTime === 0
                ? "-:-"
                : moment.unix(prayer.azaanTime).tz(tZone).format("hh:mm A");
            const iqamaTime =
              prayer.jamaatTime === 0
                ? "-:-"
                : moment.unix(prayer.jamaatTime).tz(tZone).format("hh:mm A");

            acc[prayer.namazName.toLowerCase() + "Azan"] = azanTime;
            acc[prayer.namazName.toLowerCase() + "Iqama"] = iqamaTime;
            return acc;
          }, {});

          return {
            date: moment(day.date).format("DD"),
            day: moment(day.date).format("ddd"),
            ishraq: moment.unix(ishraqTime).tz(tZone).format("hh:mm A"),
            ...timings,
          };
        });

        setCurrentMonthsPrayers(transformedData);
        setShouldPrint(true);
        toast.dismiss();
      } else {
        toast.error("No Data Available For The Selected Month");
      }
    } else {
      setCurrentMonthsPrayers([]);
      toast.error("No Data Available");
    }
  };
  useEffect(() => {
    if (shouldPrint && currentMonthsPrayers.length > 0) {
      handlePrint(); // Trigger print when data is available
      setShouldPrint(false); // Reset the print trigger
    }
  }, [shouldPrint, currentMonthsPrayers]); // Depend on both states if needed
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Masjid Calender - ${
      selectedDates[0] ? moment(selectedDates[0]).format("MMMM YYYY") : ""
    }`,
  });
  // useEffect(() => {
  //   const today = LocationBasedToday(tZone);
  //   const todayInTZone = LocationBasedToday(tZone);
  //   const parsedTodayInTZone = moment(todayInTZone);

  //   const from = parsedTodayInTZone.toDate();
  //   const toDate = parsedTodayInTZone.clone().add(30, "days");
  //   if (selectedDates[1]) handleRangeDateChange(selectedDates);
  //   else if (selectedDates[0]) {
  //     handleSingleDateClick(selectedDates[0]);
  //   } else if (allPrayers.length > 0 && !selectedDates[0])
  //     handleRangeDateChange([from, toDate]);
  // }, [allPrayers]);

  const handleRoute = () => {
    // if (!isDateSelected)
    //   handleSnackbar(true, "error", "Please, select a date", dispatch);
    // else {
    setShowNamzTiming(true);
    // }
  };

  // useEffect(() => {
  //   if (consumerMasjidId && tZone) {
  //     const startMonth = moment()
  //       .tz(tZone)
  //       .startOf("month")
  //       .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  //     const endNextMonth = moment()
  //       .endOf("year")
  //       .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  //     setIsLoading(true);
  //     const res2 = dispatch(
  //       FetchingTimingsByDateRange(startMonth, endNextMonth, consumerMasjidId)
  //     );

  //     res2.then((result) => {
  //       if (result.status === 200) {
  //         const today = moment().tz(tZone).format("YYYY-MM-DD");

  //         const filteredData = result.data.data.filter((item: any) =>
  //           moment(item.date).isSameOrAfter(today, "day")
  //         );

  //         setAllPrayer(filteredData);
  //         fetchHijriDates(filteredData);
  //         setIsLoading(false);
  //       }
  //     });
  //   }
  // }, [reloadTiming, showNamzTiming, tZone]);

  const fetchHijriDates = useCallback(
    async (prayers: PrayerTimings<number>[]) => {
      const uniqueMonths = new Set(
        prayers.map((prayer) => moment(prayer.date).format("YYYY-MM"))
      );
      const hijriCalendarPromises = Array.from(uniqueMonths).map(
        (monthYear) => {
          const [year, month] = monthYear.split("-");
          return fetchHijriCalendar(year, month);
        }
      );

      const calendars = await Promise.all(hijriCalendarPromises);
      const hijriMap = {};
      calendars.flat().forEach((day) => {
        hijriMap[day.gregorianDate] = day.hijriDate;
      });
      setHijriDatesMap(hijriMap);
      setIsLoading(false);
    },
    []
  );

  const tileContent = ({ date }: { date: any }) => {
    const currentDate = LocationBasedToday(tZone);
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
    const today = LocationBasedToday(tZone);
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

  const handleSlideChange = (swiper) => {
    // Get the active index
    const activeIndex = swiper.activeIndex;
    // Get the date from allPrayers based on active index
    if (allPrayers[activeIndex]) {
      const newDate = allPrayers[activeIndex].date;

      // Convert date to a moment object and set the state
      const selectedDate = moment(newDate);
      // Update selected dates
      setSelectedDates([selectedDate.toDate(), null]);

      // Dispatch the new date
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      // const newDate = allPrayers[activeIndex].date;
      // const date = new Date(newDate);
      // const year = date.getUTCFullYear();
      // const month = date.getUTCMonth(); // Month is zero-indexed (0 = January, 10 = November)
      // const day = date.getUTCDate();

      // const selectedDate = new Date(Date.UTC(year, month, day, 12, 0, 0));
      // setSelectedDates([selectedDate, null]);
      // console.log(selectedDate);
      // const formattedDate = newDate.split("T")[0];
      dispatch({
        type: "singleDate",
        payload: [formattedDate],
      });

      // Optionally, if you need to fetch timings or do additional logic:
      // handleSingleDateClick(selectedDate.toDate());
      if (swiper.activeIndex >= loadedPrayers.length - 5) {
        loadMorePrayers();
      }
    }
  };

  const slidePrev = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const slideNext = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  return (
    <>
      {showNamzTiming ? (
        <NamazTimings
          masjidId={consumerMasjidId}
          setShowNamzTiming={setShowNamzTiming}
          prayerType={selectedPrayers?.prayerType as string}
          prayerMethod={selectedPrayers?.prayerMethod}
          handleSingleDateClick={handleSingleDateClick}
          handleRangeDateChange={handleRangeDateChange}
          tims={selectedPrayers?.timings}
        />
      ) : (
        <div className="mainprayerconatiner" data-testid="root">
          <div className="MobileView-main-container">
            <div className="goback" style={{ margin: "0" }}>
              <BackButton
                handleBackBtn={() => {
                  setSelectedType(null);
                }}
              />
            </div>
            <h3 className="page-title">Salah Timings</h3>
            <div className="MobileView">
              <div className="MobileViewContainer">
                <div className="CalendarContainer">
                  {tZone ? (
                    <SpecialCalendar
                      tZone={tZone}
                      minDate={LocationBasedToday(tZone)}
                      value={selectedDates[0]}
                      // onDateChange={handleRangeDateChange}
                      handleSingleDateClick={handleSingleDateClick}
                      tileContent={tileContent}
                      tileDisabled={tileDisabled}
                      tileClassName={tileClassName}
                    />
                  ) : null}
                </div>
              </div>

              <>
                {loadingTimings ? (
                  <ProgressLoader />
                ) : allPrayers.length === 0 ? (
                  <div
                    className="prayer-right-calender"
                    data-testid="right-calendar"
                  >
                    <PrayerBox
                      prayer={[]}
                      tZone={tZone}
                      timingId={selectedPrayers ? selectedPrayers?._id : ""}
                      masjidId={consumerMasjidId}
                      reloader={reloader}
                      handlePrint={handlePrintCalendar}
                    >
                      <div style={{ margin: "10px auto" }}>
                        <p className="time-zone">Time Zone : {tZone}</p>
                      </div>
                    </PrayerBox>
                    <CustomBtn
                      label="Add Salah Timings"
                      icon={clockIcon}
                      size="16vw"
                      eventHandler={handleRoute}
                    />
                  </div>
                ) : (
                  <div
                    className="prayer-right-calender"
                    data-testid="right-calendar"
                  >
                    <div className="swiper-download-btn-conatiner">
                      <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        ref={swiperRef}
                        // onSlideChange={handleSlideChange}
                        onSlideChange={(swiper) => handleSlideChange(swiper)}
                        onSwiper={(swiper) => {
                          swiperRef.current = swiper;
                        }}
                      >
                        {loadedPrayers.map((times, index) => (
                          <SwiperSlide key={index}>
                            <PrayerBox
                              prayer={times ? times.timings : []}
                              tZone={tZone}
                              timingId={
                                selectedPrayers ? selectedPrayers?._id : ""
                              }
                              masjidId={consumerMasjidId}
                              reloader={reloader}
                              handlePrint={handlePrintCalendar}
                            >
                              <Box
                                sx={{
                                  padding: 2,
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  component="div"
                                  variant="body2"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  {allPrayers.length > 1 && (
                                    <Box
                                      data-testid="prevslide"
                                      sx={{
                                        borderRadius: "20px",
                                        boxShadow:
                                          "0px 1px 5px -1px rgba(0, 0, 0, 0.3)",
                                        height: "20px",
                                        width: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                      onClick={() => slidePrev()}
                                    >
                                      <KeyboardArrowLeftOutlinedIcon />
                                    </Box>
                                  )}

                                  <img src={prayercalender} alt="" />
                                  <div style={{ textAlign: "center" }}>
                                    {" "}
                                    <p
                                      style={{
                                        textAlign: "center",
                                        margin: "0",
                                        color: "#154F30",
                                      }}
                                    >
                                      {
                                        hijriDatesMap[
                                          moment(times.date).format(
                                            "DD-MM-YYYY"
                                          )
                                        ]
                                      }
                                    </p>
                                    <Typography
                                      color="#154F30"
                                      variant="body2"
                                      data-test-id="date-selected"
                                    >
                                      {moment(times.date).format(
                                        "ddd, D MMMM, YYYY"
                                      )}
                                    </Typography>
                                  </div>

                                  {allPrayers.length > 1 && (
                                    <Box
                                      data-testid="nextslide"
                                      sx={{
                                        borderRadius: "20px",
                                        boxShadow:
                                          "0px 1px 5px -1px rgba(0, 0, 0, 0.3)",
                                        height: "20px",
                                        width: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                      onClick={() => slideNext()}
                                    >
                                      <KeyboardArrowRightOutlinedIcon />
                                    </Box>
                                  )}
                                </Typography>

                                <Box sx={{ marginTop: 2, width: "100%" }}>
                                  <Typography
                                    variant="body2"
                                    color="text.primary"
                                    className="time-zone"
                                  >
                                    Time Zone: {tZone}
                                  </Typography>
                                </Box>
                              </Box>
                            </PrayerBox>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <Button
                        sx={{
                          textTransform: "none",
                          color: "#686868;",
                          fontSize: "12px",
                          width: "100%",
                          marginBottom: "15px",
                        }}
                        onClick={handlePrintCalendar}
                      >
                        <DownloadIcon fontSize="small" /> Download PDF For
                        Entire Month
                      </Button>
                    </div>
                    <CustomBtn
                      label="Add Salah Timings"
                      icon={clockIcon}
                      eventHandler={handleRoute}
                    />
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      )}

      <FullMonthCalendar
        componentRef={componentRef}
        selectedDate={selectedDates[0]}
        tZone={tZone}
        timings={currentMonthsPrayers}
        handlePrint={handlePrint}
        masjid={masjid}
      />
    </>
  );
};

export default MobileViewCalender;
