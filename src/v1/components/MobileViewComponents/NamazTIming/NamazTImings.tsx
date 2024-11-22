import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./NamazTimings.css";
import "./NamazTimingsFonts.css";
import PrayerTable from "./PrayerTable";
import moment from "moment-timezone";
import tz_lookup from "tz-lookup";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import {
  Masjid,
  NamajTiming,
  NamazTimingsType,
  PrayerMethod,
  PrayerTimings,
  ResponseType,
  optionalTimings,
} from "../../../redux/Types";
import { addTiming } from "../../../redux/actions/TimingsActions/AddTiming";
import { FetchingTimingsByDateRange } from "../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import { UpdateAllTimingsOfSingleDay } from "../../../redux/actions/TimingsActions/UpdateAllTimingsOfSingleDay";
import axios from "axios";
// import { TimingsFetch } from "../TimingsFetch/TimingsFetch";
import { addSolarTimings } from "../../../api-calls";
import { toast } from "react-hot-toast";
import TimeSelector from "./TimeSelector";
import {
  LocationBasedToday,
  UTCTimeConverter,
  UTCTimeReverter,
  UTCTimeReverter2,
  UtcDateConverter,
} from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import PrayerBox, { icons } from "../Shared/PrayerBox/PrayerBox";
import { Backdrop, Box, Card, Typography } from "@mui/material";
import TimeZone from "../Shared/TimeZone";
import CustomBtn from "../Shared/CustomBtn";
// import CustomSlider from "../Shared/Slider/CustomSlider";
import PrayerCalculationMethod from "./PrayerCalculationMethod";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import calender from "../../../photos/Newuiphotos/Icons/calender.svg";
import CustomCalender from "../Shared/calendar/CustomCalender";
import { format } from "date-fns";
import { useMediaQuery, useTheme } from "@material-ui/core";
// import PrayerTimingSlider from "../Shared/Slider/CustomSlider";
import PrayerInputSlider from "../Shared/Slider/PrayerInputSlider";
import prayercalender from "../../../photos/Newuiphotos/Icons/prayercalender.svg";
import { Madhab, CalculationMethod } from "adhan";
import {
  fetchAndFormatTimings,
  fetchPrayerMethods,
  getPrayerTimes,
  methodMapping,
  TimingsFetch,
} from "../../../PrayerCalculation/Adhan";
import dayjs from "dayjs";
import SuccessMessageModel from "../../../helpers/SuccessMessageModel/SuccessMessageModel";
import SalahMethodSettings from "./SalahMethodSettings/SalahMethodSettings";
import { useCreateOrUpdateTimings } from "../../../graphql-api-calls/Salah/mutation";
import { GET_TIMINGS_BY_MASJID_ID_WITH_ENDDATE } from "../../../graphql-api-calls/Salah/queries";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
export type EnteredData = Record<
  string,
  {
    azaanTime: string;
    namazName?: string;
    jamaatTime: string;
    ExtendedJamaatMinutes: number;
    ExtendedAzaanMinutes: number;
    TimesByAzaan: string;
    TimesByJamaat: string;
  }
>;

const defaultPrayerSteps = [
  { name: "Fajr", next: "Dhur", type: 1 },
  { name: "Dhur", next: "Asar", type: 2 },
  { name: "Asar", next: "Maghrib", type: 3 },
  { name: "Maghrib", next: "Isha", type: 4 },
  { name: "Isha", next: null, type: 5 },
];

type propsType = {
  prayerType: string;
  setShowNamzTiming: Dispatch<SetStateAction<boolean>>;
  tims: NamajTiming<number>[] | undefined;
  masjidId: string;
  prayerMethod: string | undefined;
  handleSingleDateClick: (date: Date) => void;
  handleRangeDateChange: (date: Date[]) => void;
};

function NamazTimings({
  setShowNamzTiming,
  tims,
  prayerType,
  masjidId,
  prayerMethod,
  handleSingleDateClick,
  handleRangeDateChange,
}: propsType) {
  let initialMethod = {
    id: 2,
    name: "Islamic Society of North America (ISNA)",
  };

  const dispatch = useAppThunkDispatch();
  let selectedDat = useAppSelector((state) => state.selectedDate);
  let admin = useAppSelector((state) => state.admin);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  let [isMethodChanged, setIsMethodChanged] = useState(false); // Tracks whether the prayer method has changed.
  const [selectedMethod, setSelectedMethod] = useState("Hanafi"); // Stores the selected prayer method type, e.g., "Hanafi".
  const [selectedPrayerMethod, setSelectedPrayerMethod] =
    useState<Partial<PrayerMethod>>(initialMethod); // Stores details of the selected prayer method.

  const [prayerMethodsList, setPrayerMethodsList] = useState<PrayerMethod[]>(
    []
  ); // Holds a list of all available prayer methods fetched from an API.

  const [matchedItm, setMatchItem] = useState<PrayerTimings<string>>(); //Holds the matched prayer timings item for the selected date.
  const [tZone, setTZone] = useState<string>("");

  const [nonHanafyAsr, setNonHanafyAsr] = useState<string>(""); // Stores the Asr timing for non-Hanafi method
  const [solarHanafyAsr, setSolarHanafyAsr] = useState<string>(""); // Stores the Asr timing for Hanafi method.

  const [inputtedTimings, setInputtedTimings] = useState<NamajTiming<string>[]>(
    []
  ); // Stores the timings inputted by the user.
  const [masjid, setMasjid] = useState<Masjid>(); // Contains details about the masjid.

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(0); // mobile view, prev next classname
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  const [showTimings, setShowTimings] = useState(false);

  const [activeDateField, setActiveDateField] = useState("startDate");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [dateArray, setDateArray] = useState<string[]>([]); // array has from, to date

  const [enteredData, setEnteredData] = useState<EnteredData>({});

  const [isMobile, setIsMobile] = useState(false);

  const swiperRef = useRef(null);
  const swiperPrayerBoxRef = useRef(null);
  const [currentSliderIdx, setCurrentSliderIdx] = useState(0); // Keeps track of the current index in the prayer steps slider.
  const [currentPrayerBoxSliderIdx, setCurrentPrayerBoxSliderIdx] = useState(0); // Keeps track of the current index in the prayer steps slider.

  const carouselSteps = [0, 1, 2, 3, 4]; // all steps
  const [prayerSteps, setPrayerSteps] = useState(defaultPrayerSteps); // Contains the default prayer steps.
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [modalMessage, setModalmessage] = useState("");

  const startDate = useMemo(() => {
    if (tZone) {
      return moment.tz(tZone).startOf("month").utc().toISOString();
    }
    return null; // or some default value
  }, [tZone]);

  const endDate = useMemo(() => {
    if (tZone) {
      return moment.tz(tZone).add(45, "days").utc().toISOString();
    }
    return null; // or some default value
  }, [tZone]);

  const {
    loading: loadingTimings1,
    error: errorTimings1,
    data: timingsData1,
    refetch: timingsRefetch1,
  } = useQuery(GET_TIMINGS_BY_MASJID_ID_WITH_ENDDATE, {
    variables: { masjidId: masjidId, startDate: startDate, endDate: endDate },
    skip: !masjidId, // Skip if masjidId is not available
  });
  const {
    createOrUpdate,
    loading: loadingMutation,
    error: mutationError,
  } = useCreateOrUpdateTimings();
  const [rangeTimings, setRangeTimings] = useState<NamajTiming<string>[][]>([]);

  const goNext = () => {
    swiperRef.current?.slideNext();
  };

  const goPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const slideNext = useCallback(() => {
    if (swiperPrayerBoxRef.current) {
      swiperPrayerBoxRef.current.slideNext();
    }
  }, []);
  const slidePrev = useCallback(() => {
    if (swiperPrayerBoxRef.current) {
      swiperPrayerBoxRef.current.slidePrev();
    }
  }, []);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (masjidId) {
      timingsRefetch1(); // Refetch timings if masjidId is valid
    }
  }, [masjidId, timingsRefetch1]); // Add dependencies for the refetch
  // Handle data processing
  useEffect(() => {
    if (!loadingTimings1 && timingsData1) {
      setIsLoading(false);
      const items = timingsData1?.getTimingsByMasjidId ?? []; // Adjust according to your GraphQL structure
      const selectedDate = moment(new Date(selectedDat[0])).format(
        "YYYY-MM-DD"
      );

      const isItemExist = items.find((item) => {
        return (
          item.date.split("T")[0] ===
          UtcDateConverter(selectedDate, tZone).split("T")[0]
        );
      });
      setMatchItem(isItemExist);
    }
  }, [loadingTimings1, timingsData1]); // Handle changes in loading, data, and selected date

  // Fetching masjid details and prayer methods (assumed existing logic)
  useEffect(() => {
    if (masjidId) {
      const fetchMasjidDetails = async () => {
        const res = await dispatch(fetchMasjidById(masjidId));
        setMasjid(res);
        const lon = res.location.coordinates[0];
        const lat = res.location.coordinates[1];
        if (lat && lon) {
          const location = tz_lookup(lat, lon);
          setTZone(location);
        }
      };

      fetchMasjidDetails();

      // Fetch prayer methods
      try {
        const methods = fetchPrayerMethods();
        setPrayerMethodsList(methods);
      } catch (error) {
        toast.error("Failed to fetch prayer methods");
        console.error("Error fetching prayer methods:", error);
      }
    }
  }, [masjidId]);
  // Sets the selected prayer method type based on prayerType.
  useEffect(() => {
    if (prayerType)
      if (prayerType === "Manual") setSelectedMethod("Hanafi");
      else setSelectedMethod(prayerType);
  }, [prayerType]);

  const autoTxStyle = {
    background: isLargeScreen ? "white" : "",
    fontFamily: "Inter",
    color: "#3D544E",
    fontWeight: 600,
    textAlign: "center" as "center",
    padding: "10px",
    fontSize: "9px",
    textTransform: "capitalize",
  };

  const selectTxt = {
    fontFamily: "Inter",
    color: "#3D544E",
    fontWeight: 600,
    textAlign: "center" as "center",
    width: "100%",
    fontSize: "9px",
    margin: "10px 0",
    display: isLargeScreen ? "none" : "",
  };
  // Initialize dates based on timezone
  useEffect(() => {
    if (tZone) {
      const todayInTZone = LocationBasedToday(tZone);
      const parsedTodayInTZone = moment(todayInTZone);

      setFromDate(parsedTodayInTZone.toDate());

      const toDate = parsedTodayInTZone.clone().add(30, "days");
      setToDate(toDate.toDate());
    }
  }, [tZone]);

  // Handle date changes
  useEffect(() => {
    const formattedFromDate: string = moment(fromDate).format("YYYY-MM-DD");
    const formattedToDate: string = moment(toDate).format("YYYY-MM-DD");

    if (formattedFromDate === formattedToDate) {
      handleSingleDateClick(fromDate);
      setDateArray([formattedFromDate]); // Correctly using string[] as defined in useState
    } else if (formattedFromDate > formattedToDate) {
      setToDate(fromDate);
      handleSingleDateClick(fromDate);
    } else {
      handleRangeDateChange([fromDate, toDate]);
      setDateArray([formattedFromDate, formattedToDate]);
    }
  }, [fromDate, toDate]);

  const handleToggleCalendar = (dateType) => {
    setIsCalendarVisible(!isCalendarVisible);
    setActiveDateField(dateType); // This now just sets which field we're editing
  };

  // to get the previous timings and Time Zone / to know if there timing already exist
  //to fetch masjid info by user id  . masjid longitude and latitude number require for  Time Zone

  // 45 days data is fetched and find matchedItem which is selectedDate from the MobileViewCalendar(stored in redux) component.
  // also a function is defined and called inside this useffect to fetched all the methods and load it in PrayerMethodsList
  // useEffect(() => {
  //   const endDt = moment(new Date()).add(45, "days").format("YYYY-MM-DD");
  //   const strDt = moment().startOf("month").format("YYYY-MM-DD");
  //   if (masjidId) {
  //     const response = dispatch(
  //       FetchingTimingsByDateRange(strDt, endDt, masjidId)
  //     );
  //     response.then((result: ResponseType) => {
  //       if (result.status === 200) {
  //         const items = result.data.data;
  //         const selectedDate = moment(new Date(selectedDat[0])).format(
  //           "YYYY-MM-DD"
  //         );

  //         const isItemExist = items.find((item: NamazTimingsType<number>) => {
  //           return (
  //             item.date.split("T")[0] ===
  //             UtcDateConverter(selectedDate, tZone).split("T")[0]
  //           );
  //         });
  //         setMatchItem(isItemExist);
  //       }
  //     });
  //     const res = dispatch(fetchMasjidById(masjidId));
  //     res.then((result) => {
  //       setMasjid(result);
  //       const lon = result.location.coordinates[0];
  //       const lat = result.location.coordinates[1];
  //       if (lat && lon) {
  //         let location = tz_lookup(lat, lon);
  //         console.log("+++", location);
  //         setTZone(location);
  //       }
  //     });
  //   }

  //   try {
  //     const methods = fetchPrayerMethods();
  //     setPrayerMethodsList(methods);
  //   } catch (error) {
  //     toast.error("Failed to fetch prayer methods");
  //     console.error("Error fetching prayer methods:", error);
  //   }
  // }, [tims]);

  // whenever "prayerMethod" or "prayerMethodsList" is chnaged, we set the setSelectedPrayerMethod
  useEffect(() => {
    if (prayerMethod !== null) {
      const selectedMethod = prayerMethodsList.find(
        (method) => method.id === Number(prayerMethod)
      );
      if (selectedMethod) {
        setSelectedPrayerMethod(selectedMethod);
      }
    }
  }, [prayerMethod, prayerMethodsList]);

  // to set previously added prayer timing extended minutes(default is 5min)
  const getMagribExtraMin = (
    azaanTim: number,
    extendedAzaanMinutes: number,
    jamaatTim: number
  ) => {
    const azaanTime = moment.unix(azaanTim);
    // .add(-extendedAzaanMinutes, "minutes");
    const jamaatTime = moment.unix(jamaatTim);

    const duration = moment.duration(jamaatTime.diff(azaanTime));

    return duration.minutes();
  };
  // if tzone receive by  line -109 useeffect and if Tims has value then modifying(keeping default according to tims order) default prayerSteps and setting the data as a setEnteredData
  // tims has value if user selected date in mobile view Calender component has time or last 3 month has anytime

  useEffect(() => {
    console.log("*****************tims******************");
    if (tZone && tims) {
      let updateObj: any = {};
      let newPrayerSteps: any[] = [];
      // console.log("tims", tims);
      // let selectedStartDate = new Date(selectedDat[0]);

      const startDate = moment(selectedDat[0]);

      const latitude = masjid?.location.coordinates[1];
      const longitude = masjid?.location.coordinates[0];

      const selectedMethodData = methodMapping.find(
        (method) => method.id === selectedPrayerMethod.id
      );
      // Define calculation method based on the selected prayer method
      const method = selectedMethodData?.method; // Assuming selectedPrayerMethod.id matches the method names
      // Fetch prayer times for both Shafi and Hanafi
      const prayerTimesHanafi = getPrayerTimes(
        latitude,
        longitude,
        startDate.toDate(),
        method,
        Madhab.Hanafi,
        tZone,
        "HH:mm"
      );

      const prayerTimesShafi = getPrayerTimes(
        latitude,
        longitude,
        startDate.toDate(),
        method,
        Madhab.Shafi,
        tZone,
        "HH:mm"
      );
      // Update the state with the new prayer times
      const selectedMethodTimes =
        selectedMethod === "Hanafi" ? prayerTimesHanafi : prayerTimesShafi;

      // console.log("selectedMethodTimes", JSON.stringify(selectedMethodTimes));
      // console.log("prayerSteps", prayerSteps);

      for (let item of tims) {
        console.log("db timing", item);
        const currentType = prayerSteps.find(
          (prayerStep) => prayerStep.name === item.namazName
        );
        newPrayerSteps.push(currentType);
        // Convert item.azaanTime to "HH:mm" format using UTCTimeReverter
        const revertedAzaanTime = UTCTimeReverter2(item.azaanTime, tZone);

        // Get the selected method time in "HH:mm A" format
        const selectedMethodAzaanTime =
          selectedMethodTimes[
            item.namazName == "Dhur"
              ? "dhuhr"
              : item.namazName == "Asar"
              ? "asr"
              : item.namazName.toLowerCase()
          ];
        // Convert the selected method time and the reverted azaan time to moment objects
        const selectedTime = moment(selectedMethodAzaanTime, "hh:mm A");
        const itemTime = moment(revertedAzaanTime, "hh:mm A");

        // Calculate the offset (difference in minutes)
        const extendedAzaanMinutes = itemTime.diff(selectedTime, "minutes");

        // Adjust the Azaan time based on the offset
        // const adjustedAzaanTime = selectedTime
        //   .add(extendedAzaanMinutes, "minutes")
        //   .format("HH:mm");

        // combination of the azaan time and offset
        const newPrayerObj = {
          type: currentType?.type,
          azaanTime: selectedMethodAzaanTime,
          jamaatTime:
            item?.iqamahType && item?.iqamahType === "solar"
              ? revertedAzaanTime
              : item.namazName === "Maghrib"
              ? revertedAzaanTime
              : // item.namazName === "Maghrib"
                UTCTimeReverter2(item.jamaatTime, tZone),
          // item.namazName === "Maghrib"
          //   ? selectedMethodAzaanTime
          //   : // item.namazName === "Maghrib"
          //     UTCTimeReverter2(item.jamaatTime, tZone),
          // UTCTimeReverter(item.azaanTime, tZone),
          TimesByAzaan:
            item.namazName === "Asar" && prayerType === "Maliki/Shafi'i/Hanbali"
              ? "nonHanafy"
              : "solar",
          TimesByJamaat:
            UTCTimeReverter2(item.jamaatTime, tZone) === "" ||
            item.iqamahType === "No Iqama"
              ? "No Iqama"
              : item?.iqamahType
              ? item?.iqamahType
              : item.namazName === "Maghrib"
              ? "solar"
              : "manual",
          ExtendedAzaanMinutes: item.offset?.azaan ?? extendedAzaanMinutes,
          ExtendedJamaatMinutes: !isNaN(item.offset?.iqamah)
            ? item.offset.iqamah
            : item.namazName === "Maghrib"
            ? getMagribExtraMin(
                item.azaanTime,
                extendedAzaanMinutes,
                item.jamaatTime
              )
            : 0,
        };

        updateObj = {
          ...updateObj,
          [item.namazName]: newPrayerObj,
        };
        // const objWithName = { ...newPrayerObj, namazName: item.namazName };
        // setPrayerTimingInfo((preVal: any) => [...preVal, objWithName]);
      }
      console.log("tims change");
      setPrayerSteps(newPrayerSteps);
      setEnteredData(updateObj);
    }
  }, [tZone, tims]);

  //called twice since dates are setting late
  useEffect(() => {
    // Format the selected date
    // let selectedStartDate = new Date(selectedDat[0]);
    const startDate = moment(selectedDat[0]);
    // Proceed only if masjid address exists
    console.log("----------somthing------------");
    if (masjid) {
      // Fetch coordinates based on the masjid address (assuming you have a way to get latitude and longitude)
      const latitude = masjid?.location.coordinates[1];
      const longitude = masjid?.location.coordinates[0];
      const selectedMethodData = methodMapping.find(
        (method) => method.id === selectedPrayerMethod.id
      );
      // Define calculation method based on the selected prayer method
      const method = selectedMethodData?.method; // Assuming selectedPrayerMethod.id matches the method names
      // Fetch prayer times for both Shafi and Hanafi
      const prayerTimesHanafi = getPrayerTimes(
        latitude,
        longitude,
        startDate.toDate(),
        method,
        Madhab.Hanafi,
        tZone,
        "HH:mm"
      );
      const prayerTimesShafi = getPrayerTimes(
        latitude,
        longitude,
        startDate.toDate(),
        method,
        Madhab.Shafi,
        tZone,
        "HH:mm"
      );
      // Update the state with the new prayer times
      const timings =
        selectedMethod === "Hanafi" ? prayerTimesHanafi : prayerTimesShafi;

      // Rename timings for consistency
      const modifiedPrayerTimes = {
        Fajr: timings.fajr,
        Dhur: timings.dhuhr,
        Asar: timings.asr,
        Maghrib: timings.maghrib,
        Isha: timings.isha,
      };

      // Initialize update object for prayer steps
      let updateObj = {};
      prayerSteps.forEach((item) => {
        const newPrayerObj = {
          type: item.type,
          azaanTime: modifiedPrayerTimes[item.name],
          jamaatTime: modifiedPrayerTimes[item.name],
          TimesByAzaan: "solar",
          TimesByJamaat: item.type === 4 ? "solar" : "manual",
          ExtendedAzaanMinutes: 0,
          ExtendedJamaatMinutes: 0,
        };
        updateObj = {
          ...updateObj,
          [item.name]: newPrayerObj,
        };
      });
      // console.log("updateObj", updateObj);
      // Update the state with the new prayer times
      // only called to set timings when there are no existing prayers
      if (isMethodChanged || (!tims && selectedDat[0])) {
        console.log("Field Change", updateObj);
        setEnteredData(updateObj);
        setIsMethodChanged(false);
      }
    }
  }, [masjid, selectedPrayerMethod.id, isMethodChanged, selectedDat[0]]);

  // validate to disable the submit button
  function validatePrayerTimings(enteredData) {
    let hasError = false;

    Object.keys(enteredData).forEach((prayerName) => {
      const prayer = enteredData[prayerName];

      // Calculate actual Azaan time
      let actualAzaanTime = dayjs(prayer.azaanTime, "HH:mm");
      // if (prayer.TimesByAzaan === "solar") {
      actualAzaanTime = actualAzaanTime.add(
        prayer.ExtendedAzaanMinutes,
        "minutes"
      );
      // }

      // Calculate actual Jamaat time
      let actualJamaatTime = dayjs(prayer.jamaatTime, "HH:mm");
      if (prayer.TimesByJamaat === "solar") {
        actualJamaatTime = actualJamaatTime.add(
          prayer.ExtendedJamaatMinutes,
          "minutes"
        );
      }

      // Check if Azaan time is greater than Jamaat time
      if (
        prayer.TimesByJamaat != "No Iqama" &&
        actualAzaanTime.isAfter(actualJamaatTime)
      ) {
        console.error(
          `Error: ${prayerName} Azaan time is greater than Jamaat time`
        );
        hasError = true;
      }
    });

    return hasError;
  }

  // useeffect to call the error checker everytime any data in the enteredData is changed
  useEffect(() => {
    const hasError = validatePrayerTimings(enteredData);
    if (hasError) {
      setIsSubmitBtnDisabled(true);
    } else {
      setIsSubmitBtnDisabled(false);
    }
  }, [enteredData]);

  // render when showTimings state change,if showTimings true it's show timing preview

  const showTimingHandler = async () => {
    const val = Object.entries(enteredData).map(([namazName, info]) => ({
      namazName,
      ...info,
    }));
    setInputtedTimings(val);
    setShowTimings(true);
    const masjidCoordinates = {
      latitude: masjid?.location?.coordinates[1],
      longitude: masjid?.location?.coordinates[0],
    }; // Replace with actual coordinates

    const selectedStartDate = moment(selectedDat[0]);
    const selectedEndDate = moment(selectedDat[1]);
    const EndDate = selectedEndDate.format("YYYY-MM-DD");
    const StartDate = selectedStartDate.format("YYYY-MM-DD");
    const difference = selectedEndDate.diff(selectedStartDate, "days") + 1;

    const mergedTiming1 = [...inputtedTimings];

    const formattedTimings = await fetchAndFormatTimings(
      masjidCoordinates,
      selectedDat,
      val,
      tZone, // Replace with your timezone
      selectedMethod, // Replace with your method
      selectedPrayerMethod // Replace with your prayer method
    );
    let resultantTimings = [];

    let dateCounter = moment(StartDate);

    for (let i = 0; i < difference; i++) {
      let currentDate = dateCounter.format("YYYY-MM-DD");
      let dailyTimings = formattedTimings.slice(i * 5, (i + 1) * 5);
      const dailyProcessedTimings = dailyTimings.map((Namaaz) => {
        const namaazAzaanTime = processFormattedTimings(
          Namaaz.TimesByAzaan,
          Namaaz.azaanTime,
          Namaaz.ExtendedAzaanMinutes,
          Namaaz.type,
          true,
          currentDate,
          val
        );

        const namaazJamaatTime = processFormattedTimings(
          Namaaz.TimesByJamaat,
          Namaaz.jamaatTime,
          Namaaz.ExtendedJamaatMinutes + Namaaz.ExtendedAzaanMinutes,
          Namaaz.type,
          false,
          currentDate,
          val
        );
        return {
          ExtendedAzaanMinutes: Namaaz.ExtendedAzaanMinutes,
          ExtendedJamaatMinutes: Namaaz.ExtendedJamaatMinutes,
          TimesByAzaan: Namaaz.TimesByAzaan,
          TimesByJamaat: Namaaz.TimesByJamaat,
          azaanTime: namaazAzaanTime,
          jamaatTime: namaazJamaatTime,
          namazName: Namaaz.namazName,
          type: Namaaz.type,

          // namazName: Namaaz.namazName,
          // type: Namaaz.type,
          // azaanTime: namaazAzaanTime,
          // jamaatTime: namaazJamaatTime,
        };
      });

      dailyProcessedTimings.sort((a, b) => a.type - b.type);

      const prayerInfo = {
        prayerTiming: dailyProcessedTimings,
        date: currentDate,
      };

      resultantTimings.push(prayerInfo);
      dateCounter.add(1, "days");
    }
    console.log(resultantTimings);
    setRangeTimings(resultantTimings);
  };

  // const processFormattedTimings = (
  // TimesByAzaan,
  //       azaanTime,
  //       ExtendedAzaanMinutes,
  //       type,
  //       true,
  //       selectedDat[0],
  //       true) => {};
  const processFormattedTimings = (
    timeStatus: string | undefined,
    prayerTime: any,
    ExtendedMinutes: number | undefined,
    type: number | undefined,
    isAzn: boolean,
    date: string,
    inputTimings: any,
    isSingle: boolean = false
  ) => {
    if (timeStatus && ExtendedMinutes !== undefined) {
      if (timeStatus === "solar" || timeStatus === "nonHanafy") {
        const updatedTime = moment
          .unix(prayerTime)
          .tz(tZone)
          .add(ExtendedMinutes, "minutes")
          .format("HH:mm");

        return updatedTime;
      } else if (timeStatus === "manual") {
        const mergedTimings = [...inputTimings]; //to fix the magrib namz issue
        let NamazData = mergedTimings.filter((item) => item.type === type);
        const tm = isAzn ? NamazData[0].azaanTime : NamazData[0].jamaatTime;
        return tm;
      } else if (timeStatus === "No Iqama") {
        return "";
      }
    }
  };

  const handleAddNamazTimings = () => {
    setIsLoading(true);
    let processedTimings: NamajTiming<number>[] = [];
    let isNonHanfyExist = false;
    for (let timing of inputtedTimings) {
      const { TimesByAzaan, azaanTime, ExtendedAzaanMinutes, type } = timing;
      const { TimesByJamaat, jamaatTime, ExtendedJamaatMinutes } = timing;
      if (TimesByAzaan === "nonHanafy" || TimesByAzaan === "nonHanafy")
        isNonHanfyExist = true;
      const modifiedAzanTim = UTCExtendedTiming(
        TimesByAzaan,
        azaanTime,
        ExtendedAzaanMinutes,
        type,
        true,
        selectedDat[0],
        true
      );
      const modifiedJamaatTim = UTCExtendedTiming(
        TimesByJamaat,
        jamaatTime,
        ExtendedJamaatMinutes + ExtendedAzaanMinutes,
        type,
        false,
        selectedDat[0],
        true
      );
      if (modifiedAzanTim && (modifiedJamaatTim || modifiedJamaatTim === 0)) {
        let newTimings: NamajTiming<number> = {
          namazName: timing.namazName,
          type: timing.type,
          azaanTime: modifiedAzanTim,
          jamaatTime: modifiedJamaatTim,
        };
        processedTimings.push(newTimings);
      }
    }
    const date = UtcDateConverter(selectedDat[0], tZone);

    const fromData = {
      date: date,
      timings: processedTimings,
      prayerType: isNonHanfyExist ? "Maliki/Shafi'i/Hanbali" : "Manual",
      prayerMethod: selectedPrayerMethod.id?.toString(),
    };

    const res = dispatch(addTiming(fromData, masjidId));
    res.then((result) => {
      if (result.message === "Success") {
        setModalmessage("Timing added Successfully");
        setOpenSuccessModal(true);
        setInputtedTimings([]);
      }
      setIsLoading(false);
    });
  };

  //for update single namaz timing API calling function
  const updateNamazTimings = () => {
    setIsLoading(true);

    let processedTimings: optionalTimings<number>[] = [];
    let isNonHanfyExist = false;
    for (let timing of inputtedTimings) {
      if (!timing.azaanTime && !timing.jamaatTime) {
        continue;
      } else if (timing.azaanTime || timing.jamaatTime) {
        const { TimesByAzaan, azaanTime, ExtendedAzaanMinutes, type } = timing;
        const { TimesByJamaat, jamaatTime, ExtendedJamaatMinutes } = timing;
        if (TimesByAzaan === "nonHanafy" || TimesByAzaan === "nonHanafy")
          isNonHanfyExist = true;
        const modifiedAzanTim = UTCExtendedTiming(
          TimesByAzaan,
          azaanTime,
          ExtendedAzaanMinutes,
          type,
          true,
          selectedDat[0],
          true
        );
        const modifiedJamaatTim = UTCExtendedTiming(
          TimesByJamaat,
          jamaatTime,
          ExtendedAzaanMinutes + ExtendedJamaatMinutes,
          type,
          false,
          selectedDat[0],
          true
        );
        let newTimings: optionalTimings<number> = {
          namazName: timing.namazName,
          type: timing.type,
          azaanTime: modifiedAzanTim,
          jamaatTime: modifiedJamaatTim,
        };
        if (timing.azaanTime && !timing.jamaatTime)
          delete newTimings.jamaatTime;
        else if (!timing.azaanTime && timing.jamaatTime) {
          delete newTimings.azaanTime;
        }
        processedTimings.push(newTimings);
      }
    }

    const date = UtcDateConverter(selectedDat[0], tZone);

    const fromData = {
      timings: processedTimings,
      prayerType: isNonHanfyExist ? "Maliki/Shafi'i/Hanbali" : "Manual",
      prayerMethod: selectedPrayerMethod.id?.toString(),
    };

    const res = dispatch(
      UpdateAllTimingsOfSingleDay(fromData, masjidId, matchedItm?._id ?? "")
    );
    res.then((result) => {
      if (result.message === "Data updated") {
        setInputtedTimings([]);
        setShowNamzTiming(false);
      }
      setIsLoading(false);
    });
  };
  // Converts and extends timings based on the type and prayer method.
  const UTCExtendedTiming = (
    timeStatus: string | undefined,
    prayerTime: any,
    ExtendedMinutes: number | undefined,
    type: number | undefined,
    isAzn: boolean,
    date: string,
    isSingle: boolean = false
  ) => {
    if (timeStatus && ExtendedMinutes !== undefined) {
      if (timeStatus === "solar" || timeStatus === "nonHanafy") {
        // console.log("timeStatus", timeStatus);
        // console.log("isSingle", isSingle);
        const localTime = moment
          .unix(
            isSingle ? UTCTimeConverter(prayerTime, date, tZone) : prayerTime
          )
          .tz(tZone);

        const updatedMoment = localTime.add(ExtendedMinutes, "minutes");
        const updatedTimestamp = updatedMoment.clone().tz("UTC").unix();
        return updatedTimestamp;
      } else if (timeStatus === "manual") {
        if (isSingle) {
          const unixVal = UTCTimeConverter(prayerTime, date, tZone);
          return unixVal;
        }
        const mergedTimings = [...inputtedTimings]; //to fix the magrib namz issue
        // console.log("mergedTimings", mergedTimings);
        // let NamazData = inputtedTimings.filter((item) => item.type === type);
        let NamazData = mergedTimings.filter((item) => item.type === type);
        // console.log("NamazData", NamazData);
        const tm = isAzn ? NamazData[0].azaanTime : NamazData[0].jamaatTime;
        const unixVal = UTCTimeConverter(tm, date, tZone);
        return unixVal;
      } else if (timeStatus === "No Iqama") {
        return 0;
      }
    }
  };

  const handleAddRangeTimings = async () => {
    setIsLoading(true);
    const selectedStartDate = moment(selectedDat[0]);
    const selectedEndDate = moment(selectedDat[1]);
    const EndDate = selectedEndDate.format("YYYY-MM-DD");
    const StartDate = selectedStartDate.format("YYYY-MM-DD");
    const difference = selectedEndDate.diff(selectedStartDate, "days") + 1;

    if (difference >= 5) {
      toast.loading(
        "We're updating Salah timing, Please don't close your browser or use the back button!"
      );
    }

    const mergedTiming1 = [...inputtedTimings];
    // Fetch all timings in the given date range at once
    // const allTimingsData = await TimingsFetch(
    //   masjid?.address ?? "",
    //   selectedDat,
    //   mergedTiming1,
    //   tZone,
    //   selectedMethod,
    //   selectedPrayerMethod
    // );

    const lon = AdminMasjidState.location.coordinates[0];
    const lat = AdminMasjidState.location.coordinates[1];
    const masjidCoordinates = { latitude: lat, longitude: lon };

    const allTimingsData = TimingsFetch(
      masjidCoordinates,
      selectedDat,
      mergedTiming1,
      tZone,
      selectedMethod,
      selectedPrayerMethod
    );
    // Prepare the structure for the uploaded data
    let TimingsUploadData = [];
    let dateCounter = moment(StartDate);

    for (let i = 0; i < difference; i++) {
      let currentDate = dateCounter.format("YYYY-MM-DD");
      let dailyTimings = allTimingsData.slice(i * 5, (i + 1) * 5);
      const dailyProcessedTimings = dailyTimings.map((Namaaz) => {
        const namaazAzaanTime = UTCExtendedTiming(
          Namaaz.TimesByAzaan,
          Namaaz.azaanTime,
          Namaaz.ExtendedAzaanMinutes,
          Namaaz.type,
          true,
          currentDate
        );

        const namaazJamaatTime = UTCExtendedTiming(
          Namaaz.TimesByJamaat,
          Namaaz.jamaatTime,
          Namaaz.ExtendedJamaatMinutes + Namaaz.ExtendedAzaanMinutes,
          Namaaz.type,
          false,
          currentDate
        );
        return {
          namazName: Namaaz.namazName,
          type: Namaaz.type,
          azaanTime: namaazAzaanTime,
          jamaatTime: namaazJamaatTime,
          offset: {
            iqamah: Namaaz.ExtendedJamaatMinutes,
            azaan: Namaaz.ExtendedAzaanMinutes,
          },
          iqamahType: Namaaz.TimesByJamaat,
        };
      });

      dailyProcessedTimings.sort((a, b) => a.type - b.type);

      const prayerInfo = {
        prayerTiming: dailyProcessedTimings,
        prayerType:
          selectedMethod === "Hanafi" ? "Manual" : "Maliki/Shafi'i/Hanbali",
      };

      TimingsUploadData.push(prayerInfo);
      dateCounter.add(1, "days");
    }

    toast.dismiss();
    handleAddRangeNetworkCall(
      difference,
      StartDate,
      EndDate,
      TimingsUploadData
    );
  };

  const handleAddRangeNetworkCall = (
    difference: number,
    startDate: string,
    endDate: string,
    Data: any
  ) => {
    let TimingDataToUpload: { date: string; timings: any }[] = [];
    let selectedStartDate = moment(startDate);
    Data?.map((timings: any, key: number) => {
      let date = moment(selectedStartDate)
        .add(key, "days")
        .format("YYYY-MM-DD");

      let timingstoupload = {
        date: UtcDateConverter(date, tZone),
        timings: timings.prayerTiming,
        prayerType: timings.prayerType,
        prayerMethod: selectedPrayerMethod.id?.toString(),
      };
      TimingDataToUpload.push(timingstoupload);
    });

    handleNetworkCalls(difference, TimingDataToUpload);
  };

  const handleNetworkCalls = async (
    difference: number,
    TimingDataToUpload: any[]
  ) => {
    const loading = toast.loading("Please wait...!");
    try {
      // Call the createOrUpdate mutation
      const results = await createOrUpdate(masjidId, TimingDataToUpload);

      if (results) {
        toast.dismiss(loading);
        setModalmessage("Successfully added range timing");
        setOpenSuccessModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.dismiss(loading);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
    // const loading = toast.loading("Please wait...!");
    // try {
    //   const responses = await addSolarTimings(TimingDataToUpload, masjidId);
    //   const results = responses.data;
    //   setIsLoading(false);
    //   toast.dismiss(loading);
    //   setModalmessage("Successfully added range timing");
    //   setOpenSuccessModal(true);
    //   // setSelectedDates([new Date(), null]);
    // } catch (error) {
    //   toast.dismiss(loading);
    //   toast.error("Something went wrong, please try again");
    //   setIsLoading(false);
    // }
  };
  const handleBackBtn = () => {
    setShowNamzTiming(false);
  };
  const handleBottomBackBtn = () => {
    if (swiperPrayerBoxRef.current) {
      swiperPrayerBoxRef.current.slideTo(0); // Set to the first slide
    }
    if (!prayerSteps.length) {
      setShowNamzTiming(false);
      return;
    }
    setShowTimings(false);
  };

  const condCls = `${
    isVisible === 1 ? "next-step" : isVisible === 2 ? "back-step" : ""
  }`;
  const prayerBoxConditionalCls = showTimings
    ? " prayer-d-block time-preview"
    : " prayer-d-none time-preview";
  const prayerBoxRangeConditionalCls = showTimings
    ? " prayer-d-block time-preview-range"
    : " prayer-d-none time-preview-range";
  const sliderConditionalCls = showTimings
    ? "prayer-d-none "
    : "prayer-d-block ";

  const handleDateSelect = (selectedDate) => {
    if (activeDateField === "endDate") {
      setToDate(selectedDate);
    } else {
      setFromDate(selectedDate);
    }

    setTimeout(() => {
      setIsCalendarVisible(false); // Close calendar after selection
    }, 300); // Close after 1 second
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
    <>
      <SuccessMessageModel
        message={modalMessage}
        open={openSuccessModal}
        onClose={() => {
          setOpenSuccessModal(false);
          setShowNamzTiming(false);
        }}
      />
      {isCalendarVisible && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isCalendarVisible}
          onClick={() => setIsCalendarVisible(false)}
        >
          <div
            className="CalendarContainer-1"
            onClick={(e) => e.stopPropagation()}
          >
            <CustomCalender
              minDate={
                activeDateField === "endDate"
                  ? fromDate
                  : LocationBasedToday(tZone)
              }
              tileDisabled={tileDisabled}
              onDateSelect={handleDateSelect}
              value={activeDateField === "endDate" ? toDate : fromDate}
              setValue={(value) => {
                // Ensure the value is a Date object
                const dateValue =
                  typeof value === "function"
                    ? value(LocationBasedToday(tZone))
                    : value;
              }}
            />
          </div>
        </Backdrop>
      )}

      {isSettingsOpen ? (
        <SalahMethodSettings setIsSettingsOpen={setIsSettingsOpen}>
          <PrayerCalculationMethod
            selectedMethod={selectedPrayerMethod}
            setSelectedMethod={setSelectedPrayerMethod}
            setIsMethodChanged={setIsMethodChanged}
            isMethodChanged={isMethodChanged}
            selectedAsrMethod={selectedMethod}
            setSelectedAsrMethod={setSelectedMethod}
            masjid={masjid}
            selectedStartDate={selectedDat[0]}
            fajartiming={enteredData.Fajr}
            masjidId={masjidId}
            tZone={tZone}
            prayerType={prayerType}
            prayerMthd={prayerMethod}
            setIsSettingsOpen={setIsSettingsOpen}
          />
        </SalahMethodSettings>
      ) : (
        <div className="mainNamazTablePreview">
          <div className="namaz-top-box">
            <BackButton handleBackBtn={handleBackBtn} />
            <h3 className="page-title">Salah Timing</h3>
          </div>

          {!showTimings || showTimings ? (
            <div
              className="Azan-Container-timings"
              data-testid="salah-container"
            >
              <div
                className={prayerBoxRangeConditionalCls}
                // className="time-preview-range"
                data-testid="preview-box"
              >
                <div className="salahdates-range">
                  <img src={prayercalender} alt="" style={{ width: "20px" }} />
                  {format(fromDate, "MMM, dd")} - {format(toDate, "MMM, dd")}
                </div>
              </div>
              <Swiper
                onSlideChange={(swiper) =>
                  setCurrentPrayerBoxSliderIdx(swiper.activeIndex)
                }
                onSwiper={(swiper) => {
                  swiperPrayerBoxRef.current = swiper;
                }}
                style={{
                  marginLeft: "0px",
                  marginRight: "0px",
                }}
              >
                {rangeTimings.map((timing, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={prayerBoxConditionalCls}
                      data-testid="preview-box"
                    >
                      <div className="salahdates">
                        <Box
                          data-testid="prevslide"
                          sx={{
                            borderRadius: "20px",
                            boxShadow: "0px 1px 5px -1px rgba(0, 0, 0, 0.3)",
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
                        <img
                          src={prayercalender}
                          alt=""
                          style={{ width: "20px" }}
                        />
                        (
                        {moment
                          .tz(timing.date, tZone)
                          .format("ddd, DD MMM, YYYY")}
                        )
                        <Box
                          data-testid="nextslide"
                          sx={{
                            borderRadius: "20px",
                            boxShadow: "0px 1px 5px -1px rgba(0, 0, 0, 0.3)",
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
                      </div>

                      <PrayerBox tZone={tZone} prayer={timing.prayerTiming}>
                        <TimeZone tZone={tZone} />
                      </PrayerBox>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={sliderConditionalCls} data-testid="slider-box">
                <div className="selected-date-with-backbtn">
                  <BackButton handleBackBtn={handleBackBtn} />
                </div>

                <div className="namazConatinerMain">
                  <div className="namazConatiner">
                    <div
                      style={{
                        margin: "10px auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CustomBtn
                        label="Salah Methods Settings"
                        showIcon={false}
                        eventHandler={() => setIsSettingsOpen(true)}
                        size="50px"
                      />
                    </div>

                    <Typography style={selectTxt}>
                      Please Select Date for Salah Timing
                    </Typography>
                    <div className="dateSelection">
                      <Typography
                        sx={{ display: isLargeScreen ? "block" : "none" }}
                      >
                        Please Select Date for Salah Timing
                      </Typography>

                      <Box
                        onClick={() => handleToggleCalendar("startDate")}
                        sx={{ position: "relative" }}
                      >
                        <label htmlFor="fromDate">From</label>
                        <input
                          id="fromDate"
                          type="text"
                          placeholder="DD MM YYYY"
                          value={format(fromDate, "dd MMM yyyy")}
                          readOnly
                        />

                        <span
                          className="calendar-ico"
                          style={{
                            position: "absolute",
                            top: "3px",
                            right: "10px",
                          }}
                        >
                          <img src={calender} alt="" width={"14px"} />
                        </span>
                      </Box>
                      <Box
                        onClick={() => handleToggleCalendar("endDate")}
                        sx={{ position: "relative" }}
                      >
                        <label htmlFor="toDate">To</label>
                        <input
                          id="toDate"
                          type="text"
                          value={format(toDate, "dd MMM yyyy")}
                          placeholder="DD MM YYYY"
                          readOnly
                        />
                        <span
                          className="calendar-ico"
                          style={{
                            position: "absolute",
                            top: "3px",
                            right: "10px",
                          }}
                        >
                          <img src={calender} alt="" width={"14px"} />
                        </span>
                      </Box>
                    </div>
                    <Box
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Typography className="Autofilldsc" style={autoTxStyle}>
                        <b style={{ color: "#1B8368" }}>Autofill: </b>
                        Azan Timings are dynamically generated. For any
                        calculation changes go to Salah Methods Settings above.
                      </Typography>
                    </Box>
                    <PrayerInputSlider
                      setCurrentSliderIdx={setCurrentSliderIdx}
                      setIsMobileHandler={setIsMobile}
                      swiperRef={swiperRef}
                      goNext={goNext}
                      goPrev={goPrev}
                    >
                      {carouselSteps.map((carouselStep) =>
                        isMobile ? (
                          <div
                            key={carouselStep}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Card
                              className={`namaz-card ${condCls}`}
                              sx={{ overflow: "visible !important" }}
                            >
                              <div className="Azan-Btn-Div">
                                <p onClick={() => goPrev()}>
                                  <KeyboardArrowLeftOutlinedIcon
                                    sx={
                                      currentSliderIdx === 0
                                        ? { visibility: "hidden" }
                                        : { width: "30px", color: "#1b8368" }
                                    }
                                  />
                                </p>
                                <p className="prayer-icn-title">
                                  <img
                                    src={icons[prayerSteps[carouselStep].name]}
                                    alt=""
                                  />
                                  {prayerSteps[carouselStep].name}
                                </p>
                                <p onClick={() => goNext()}>
                                  <KeyboardArrowRightOutlinedIcon
                                    sx={
                                      currentSliderIdx === 4
                                        ? { visibility: "hidden" }
                                        : { width: "30px", color: "#1b8368" }
                                    }
                                  />
                                </p>
                              </div>

                              <div style={{ padding: "0px 9px 24px 9px" }}>
                                <TimeSelector
                                  enteredData={enteredData}
                                  setEnteredData={setEnteredData}
                                  prayerName={prayerSteps[carouselStep].name}
                                  label="Azan"
                                  prayerTimeType="solar"
                                  nonHanafyAsr={
                                    selectedMethod !== "Hanafi"
                                      ? nonHanafyAsr
                                      : ""
                                  }
                                  solarHanafyAsr={
                                    selectedMethod === "Hanafi"
                                      ? solarHanafyAsr
                                      : ""
                                  }
                                />
                                <TimeSelector
                                  enteredData={enteredData}
                                  setEnteredData={setEnteredData}
                                  prayerName={prayerSteps[carouselStep].name}
                                  label="Iqama"
                                  prayerTimeType={
                                    prayerSteps[carouselStep].name === "Maghrib"
                                      ? "solar"
                                      : "manual"
                                  }
                                  nonHanafyAsr={
                                    selectedMethod !== "Hanafi"
                                      ? nonHanafyAsr
                                      : ""
                                  }
                                  solarHanafyAsr={
                                    selectedMethod === "Hanafi"
                                      ? solarHanafyAsr
                                      : ""
                                  }
                                />
                              </div>
                            </Card>
                          </div>
                        ) : (
                          <div
                            key={carouselStep}
                            className="tablet-timing-card"
                          >
                            <p className="prayer-icn-title">
                              <img
                                src={icons[prayerSteps[carouselStep].name]}
                                alt=""
                              />
                              {showTimings
                                ? ""
                                : prayerSteps[carouselStep].name}
                            </p>

                            <TimeSelector
                              enteredData={enteredData}
                              setEnteredData={setEnteredData}
                              prayerName={prayerSteps[carouselStep].name}
                              label="Azan"
                              prayerTimeType="solar"
                              nonHanafyAsr={
                                selectedMethod !== "Hanafi" ? nonHanafyAsr : ""
                              }
                              solarHanafyAsr={
                                selectedMethod === "Hanafi"
                                  ? solarHanafyAsr
                                  : ""
                              }
                            />
                            <TimeSelector
                              enteredData={enteredData}
                              setEnteredData={setEnteredData}
                              prayerName={prayerSteps[carouselStep].name}
                              prayerTimeType={
                                prayerSteps[carouselStep].name === "Maghrib"
                                  ? "solar"
                                  : "manual"
                              }
                              label="Iqama"
                              nonHanafyAsr={
                                selectedMethod !== "Hanafi" ? nonHanafyAsr : ""
                              }
                              solarHanafyAsr={
                                selectedMethod === "Hanafi"
                                  ? solarHanafyAsr
                                  : ""
                              }
                            />
                          </div>
                        )
                      )}
                      {!isMobile && (
                        <div className="done-btn-container">
                          <CustomBtn
                            size={"10vw"}
                            eventHandler={showTimingHandler}
                            label={"Done"}
                            showIcon={false}
                            isDisabled={isSubmitBtnDisabled}
                          />
                        </div>
                      )}
                    </PrayerInputSlider>
                  </div>
                </div>

                {currentSliderIdx === 4 && isMobile ? (
                  <div className="done-btn-container">
                    <CustomBtn
                      size={"15vw"}
                      eventHandler={showTimingHandler}
                      label={"Done"}
                      showIcon={false}
                      isDisabled={isSubmitBtnDisabled}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div>
              <PrayerTable timings={inputtedTimings} tZone={tZone} />
            </div>
          )}
          {/* show back and add btn if show timing clicked */}
          {showTimings && (
            <div className="Butoon-Azan">
              <CustomBtn
                showIcon={false}
                bgColor={"#FF7272"}
                eventHandler={handleBottomBackBtn}
                label={"Cancel"}
                size={window.innerWidth >= 1024 ? "8vw" : "10vw"}
              />
              {selectedDat[1] ? (
                <CustomBtn
                  showIcon={false}
                  eventHandler={handleAddRangeTimings}
                  label={"Confirm"}
                  isLoading={isLoading}
                  size={window.innerWidth >= 1024 ? "8vw" : "10vw"}
                />
              ) : matchedItm?._id ? (
                <CustomBtn
                  size={window.innerWidth >= 1024 ? "8vw" : "10vw"}
                  showIcon={false}
                  eventHandler={updateNamazTimings}
                  label={"Update Timings"}
                  isLoading={isLoading}
                />
              ) : (
                <CustomBtn
                  showIcon={false}
                  eventHandler={handleAddNamazTimings}
                  label={"Add timing"}
                  isLoading={isLoading}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default NamazTimings;
