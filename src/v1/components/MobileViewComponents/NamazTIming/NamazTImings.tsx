import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./NamazTimings.css";
import PrayerTable from "./PrayerTable";
import moment from "moment-timezone";
import tz_lookup from "tz-lookup";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import {
  Masjid,
  NamajTiming,
  NamazTimings,
  PrayerTimings,
  ResponseType,
  optionalTimings,
} from "../../../redux/Types";
import calenderICon from "../../../photos/calenderIcon.png";
import { addTiming } from "../../../redux/actions/TimingsActions/AddTiming";
import { FetchingTimingsByDateRange } from "../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import { UpdateAllTimingsOfSingleDay } from "../../../redux/actions/TimingsActions/UpdateAllTimingsOfSingleDay";
import axios from "axios";
import { TimingsFetch } from "../TimingsFetch/TimingsFetch";
import { addSolarTimings } from "../../../api-calls";
import { toast } from "react-hot-toast";
import TimeSelector from "./TimeSelector";
import {
  UTCTimeConverter,
  UTCTimeReverter,
  UtcDateConverter,
} from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import PrayerBox, { icons } from "../Shared/PrayerBox/PrayerBox";
import { Card } from "@mui/material";
import TimeZone from "../Shared/TimeZone";
import CustomBtn from "../Shared/CustomBtn";
import PrayerTimingSlider from "./PrayerTimingSlider";
import JuristicMethod from "./JuristicMethod";
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
  // setSelectedDates?: Dispatch<SetStateAction<[Date | null, Date | null]>>;
};

function NamajTimings({
  setShowNamzTiming,
  tims,
  prayerType,
}: // setSelectedDates,
propsType) {
  const [selectedMethod, setSelectedMethod] = useState("Hanafi");
  const [step, setStep] = useState(0);
  const [currentSliderIdx, setCurrentSliderIdx] = useState(0);
  const carouselSteps = [0, 1, 2, 3, 4];
  const [inputtedTimings, setInputtedTimings] = useState<NamajTiming<string>[]>(
    []
  );
  const [prayerSteps, setPrayerSteps] = useState(defaultPrayerSteps);

  const [matchedItm, setMatchItem] = useState<PrayerTimings<string>>();
  const [tZone, setTZone] = useState<string>("");
  const [nonHanafyAsr, setNonHanafyAsr] = useState<string>("");
  const [solarHanafyAsr, setSolarHanafyAsr] = useState<string>("");
  const [masjid, setMasjid] = useState<Masjid>();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(0);
  const [showTimings, setShowTimings] = useState(false);
  let selectedDat = useAppSelector((state) => state.selectedDate);

  const [enteredData, setEnteredData] = useState<EnteredData>({});
  const [azanTim, setAzanTim] = useState<string>("");
  const [iqamaTim, setIqamaTim] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppThunkDispatch();
  let admin = useAppSelector((state) => state.admin);

  //to get the previous timings and Time Zone / to know if there timing already exist and to handle single update timing function
  //to fetch masjid info by user id  . masjid longitude and latitude number require for  Time Zone
  useEffect(() => {
    const endDt = moment(new Date()).add(45, "days").format("YYYY-MM-DD");
    const strDt = moment().startOf("month").format("YYYY-MM-DD");
    if (admin.masjids[0]) {
      const response = dispatch(
        FetchingTimingsByDateRange(strDt, endDt, admin.masjids[0])
      );
      response.then((result: ResponseType) => {
        if (result.status === 200) {
          const items = result.data.data;
          const selectedDate = moment(new Date(selectedDat[0])).format(
            "YYYY-MM-DD"
          );

          const isItemExist = items.find((item: NamazTimings<number>) => {
            return (
              item.date.split("T")[0] ===
              UtcDateConverter(selectedDate, tZone).split("T")[0]
            );
          });
          setMatchItem(isItemExist);
        }
      });
      const res = dispatch(fetchMasjidById(admin.masjids[0]));
      res.then((result) => {
        setMasjid(result);
        const lon = result.location.coordinates[0];
        const lat = result.location.coordinates[1];
        if (lat && lon) {
          let location = tz_lookup(lat, lon);
          setTZone(location);
        }
      });
    }
  }, []);

  //to set previously added prayer timing extended minutes(default is 5min)
  const getMagribExtraMin = (azaanTim: number, jamaatTim: number) => {
    const azaanTime = moment.unix(azaanTim);
    const jamaatTime = moment.unix(jamaatTim);

    const duration = moment.duration(jamaatTime.diff(azaanTime));

    return duration.minutes();
  };
  // if tzone receive by  line -109 useeffect and if Tims has value then modifying(keeping default according to tims order) default prayerSteps and setting the data as a setEnteredData
  // tims  has value if user selected date in mobile view Calender component has time or last 3 month has anytime
  useEffect(() => {
    if (tZone && tims) {
      let updateObj: any = {};
      let newPrayerSteps: any[] = [];

      for (let item of tims) {
        const currentType = prayerSteps.find(
          (prayerStep) => prayerStep.name === item.namazName
        );
        newPrayerSteps.push(currentType);

        const newPrayerObj = {
          type: currentType?.type,
          azaanTime: UTCTimeReverter(item.azaanTime, tZone),
          jamaatTime: UTCTimeReverter(item.jamaatTime, tZone),
          TimesByAzaan:
            item.namazName === "Asar" && prayerType === "Maliki/Shafi'i/Hanbali"
              ? "nonHanafy"
              : "solar",
          TimesByJamaat: item.namazName === "Maghrib" ? "solar" : "manual",
          ExtendedAzaanMinutes: 0,
          ExtendedJamaatMinutes:
            item.namazName === "Maghrib"
              ? getMagribExtraMin(item.azaanTime, item.jamaatTime)
              : 0,
        };
        updateObj = {
          ...updateObj,
          [item.namazName]: newPrayerObj,
        };
        // const objWithName = { ...newPrayerObj, namazName: item.namazName };
        // setPrayerTimingInfo((preVal: any) => [...preVal, objWithName]);
      }
      setPrayerSteps(newPrayerSteps);

      setEnteredData(updateObj);
    }
  }, [tZone]);

  const fetchData = async (date = new Date()) => {
    let selectedStartDate = moment(date).format("DD-MM-YYYY");
    const request0 = axios.get(
      `https://api.aladhan.com/v1/timingsByAddress/${selectedStartDate}`,
      {
        params: {
          address: masjid?.address,
          school: 0,
        },
      }
    );
    try {
      const res0 = await request0;
      const AsrOfNonHanafy = res0.data.data.timings.Asr;
      // let utcAsrOfNonHanafy = manageTime(AsrOfNonHanafy);

      setNonHanafyAsr(AsrOfNonHanafy);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
  };

  // To get the solar(hanafy/school=1) Prayer Timing based on masjid?.address
  useEffect(() => {
    let selectedStartDate = moment(new Date(selectedDat[0])).format(
      "DD-MM-YYYY"
    );

    if (masjid?.address) {
      fetchData(new Date(selectedDat[0]));
      axios
        .get(
          `https://api.aladhan.com/v1/timingsByAddress/${selectedStartDate}`,
          {
            params: {
              address: masjid?.address,
              school: 1,
            },
          }
        )
        .then((res) => {
          const AsrOfHanafy = res.data.data.timings.Asr;

          setSolarHanafyAsr(AsrOfHanafy);
          const timings = res.data.data.timings;
          const modifiedPrayerTimes = {
            ...timings,
            Dhur: timings.Dhuhr,
            Asar: timings.Asr,
          };

          delete modifiedPrayerTimes.Dhuhr;
          delete modifiedPrayerTimes.Asr;
          let updateObj = {};
          prayerSteps.map((item) => {
            const newPrayerObj = {
              type: item.type,
              azaanTime: modifiedPrayerTimes[item.name],
              jamaatTime: modifiedPrayerTimes[item.name],
              TimesByAzaan: "solar",
              TimesByJamaat: "solar",
              ExtendedAzaanMinutes: 0,
              ExtendedJamaatMinutes: 0,
            };
            updateObj = {
              ...updateObj,
              [item.name]: newPrayerObj,
            };
          });
          if (!tims) setEnteredData(updateObj);
        });
    }
  }, [masjid]);
  //render when showTimings state change,if showTimings true it's show timing preview

  const showTimingHandler = () => {
    const val = Object.entries(enteredData).map(([namazName, info]) => ({
      namazName,
      ...info,
    }));
    setInputtedTimings(val);
    setShowTimings(true);
  };

  //for single namaz timing adding API calling function
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
        ExtendedJamaatMinutes,
        type,
        false,
        selectedDat[0],
        true
      );
      if (modifiedAzanTim && modifiedJamaatTim) {
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
    };

    console.log(fromData);

    const res = dispatch(addTiming(fromData, admin.masjids[0]));
    res.then((result) => {
      if (result.message === "Success") {
        toast.success("Timing added Successfully");
        setInputtedTimings([]);
        setShowNamzTiming(false);
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
          ExtendedJamaatMinutes,
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
    // const fromData = processedTimings;

    // const fromData = [
    //   {
    //     date: date,
    //     timings: processedTimings,
    //     prayerType: isNonHanfyExist ? "Maliki/Shafi'i/Hanbali" : "Manual",
    //   },
    // ];
    const fromData = {
      timings: processedTimings,
      prayerType: isNonHanfyExist ? "Maliki/Shafi'i/Hanbali" : "Manual",
    };

    console.log(fromData);

    const res = dispatch(
      UpdateAllTimingsOfSingleDay(
        fromData,
        admin.masjids[0],
        matchedItm?._id ?? ""
      )
    );
    res.then((result) => {
      if (result.message === "Data updated") {
        setInputtedTimings([]);
        setShowNamzTiming(false);
      }
      setIsLoading(false);
    });
  };

  //to add min in azan
  // const handleAzanIncrement = () => {
  //   if (azanCounter < 60) {
  //     setAzanCounter((prevValue) => prevValue + 1);
  //     // setAzanCounter(azanCounter + 1);
  //   }
  // };
  //to decrement min in azan
  // const handleAzanDecrement = () => {
  //   setAzanCounter((prevValue) => Math.max(0, prevValue - 1));
  // };
  // //to add min in azan
  // const handleIqamaIncrement = () => {
  //   if (iqamaCounter < 60) {
  //     setIqamaCounter((prevValue) => prevValue + 1);
  //   }
  // };
  // //to decrement min in azan
  // const handleIqamaDecrement = () => {
  //   setIqamaCounter((prevValue) => Math.max(0, prevValue - 1));
  // };
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
      if (timeStatus !== "manual") {
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
        // let NamazData = inputtedTimings.filter((item) => item.type === type);
        let NamazData = mergedTimings.filter((item) => item.type === type);
        const tm = isAzn ? NamazData[0].azaanTime : NamazData[0].jamaatTime;
        const unixVal = UTCTimeConverter(tm, date, tZone);
        return unixVal;
      }
    }
  };
  //for Range namaz timing adding API calling function
  const handleAddRangeTimings = async () => {
    setIsLoading(true);
    let selectedStartDate = moment(selectedDat[0]);
    let selectedEndDate = moment(selectedDat[1]);
    let EndDate = moment(selectedEndDate).format("YYYY-MM-DD");
    let StartDate = moment(selectedStartDate).format("YYYY-MM-DD");
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;

    let TimingsUploadData = [];

    for (let i = 0; i < difference; i++) {
      let date = moment(selectedStartDate).add("days", i).format("DD-MM-YYYY");

      let TimingsIncreasing: any[] = [];
      const mergedTiming = [...inputtedTimings];
      let Data = await TimingsFetch(
        masjid?.address ?? "",
        date,
        mergedTiming,
        tZone
      );
      const savedMethod = localStorage.getItem("JuristicMethod");
      for (let Namaaz of Data) {
        const { TimesByAzaan, azaanTime, ExtendedAzaanMinutes, type } = Namaaz;
        const { TimesByJamaat, jamaatTime, ExtendedJamaatMinutes } = Namaaz;

        let namaazAzaanTime = UTCExtendedTiming(
          TimesByAzaan,
          azaanTime,
          ExtendedAzaanMinutes,
          type,
          true,
          date
        );

        let namaazJamaatTime = UTCExtendedTiming(
          TimesByJamaat,
          jamaatTime,
          ExtendedJamaatMinutes,
          type,
          false,
          date
        );

        let namazObj = {
          namazName: Namaaz.namazName,
          type: Namaaz.type,
          azaanTime: namaazAzaanTime,
          jamaatTime: namaazJamaatTime,
        };

        TimingsIncreasing.push(namazObj);
      }

      TimingsIncreasing.sort((a, b) => a.type - b.type);
      const prayerInfo = {
        prayerTiming: TimingsIncreasing,
        prayerType:
          savedMethod === "Hanafi" ? "Manual" : "Maliki/Shafi'i/Hanbali",
      };

      TimingsUploadData.push(prayerInfo);
    }

    let Data = [...TimingsUploadData];
    handleAddRangeNetworkCall(difference, StartDate, EndDate, Data);
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
        .add("days", key)
        .format("YYYY-MM-DD");
      let timingstoupload = {
        date: UtcDateConverter(date, tZone),
        timings: timings.prayerTiming,
        prayerType: timings.prayerType,
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
      const responses = await addSolarTimings(
        TimingDataToUpload,
        admin.masjids[0]
      );
      const results = responses.data;
      setIsLoading(false);
      toast.dismiss(loading);
      toast.success("Successfully added range timing");
      // setSelectedDates([new Date(), null]);
      setShowNamzTiming(false);
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Something went wrong, please try again");
      setIsLoading(false);
    }
    // setManageTimings(false);
  };
  const handleBackBtn = () => {
    setShowNamzTiming(false);
  };
  const handleBottomBackBtn = () => {
    if (!prayerSteps.length) {
      setShowNamzTiming(false);
      return;
    }
    setShowTimings(false);
  };

  const handleButtonClick = (isNext: boolean) => {
    setIsVisible(isNext ? 1 : 2);
    setTimeout(() => {
      setIsVisible(0);
    }, 400); // Adjust the delay as needed (500 milliseconds in this example)
  };
  const condCls = `${
    isVisible === 1 ? "next-step" : isVisible === 2 ? "back-step" : ""
  }`;
  const prayerBoxConditionalCls = showTimings
    ? " prayer-d-block time-preview"
    : " prayer-d-none time-preview";
  const sliderConditionalCls = showTimings
    ? "prayer-d-none "
    : "prayer-d-block ";

  return (
    <>
      {showTimings && (
        <div className="selected-date-box">
          <div className="selectedDateRange">
            <img src={calenderICon} alt="" />
            <p>
              {moment(selectedDat[0]).format("MMMM D")}
              {selectedDat[1]
                ? " - " + moment(selectedDat[1]).format("MMMM D")
                : null}
            </p>
          </div>
        </div>
      )}
      <div className="mainNamazTablePreview">
        <div className="namaz-top-box">
          <BackButton handleBackBtn={handleBackBtn} />
          <h3 className="page-title">Prayer Timing</h3>
        </div>

        {(!showTimings && step < prayerSteps.length) || showTimings ? (
          <div className="Azan-Container-timings ">
            <div className={prayerBoxConditionalCls}>
              <PrayerBox tZone={tZone} prayer={inputtedTimings}>
                <TimeZone tZone={tZone} />
              </PrayerBox>
            </div>

            <div className={sliderConditionalCls}>
              <div className="selected-date-with-backbtn">
                <BackButton handleBackBtn={handleBackBtn} />

                <div className="selected-date-box">
                  <div className="selectedDateRange">
                    <img src={calenderICon} alt="" />
                    <p>
                      {moment(selectedDat[0]).format("MMMM D")}
                      {selectedDat[1]
                        ? " - " + moment(selectedDat[1]).format("MMMM D")
                        : null}
                    </p>
                  </div>
                </div>
              </div>

              <div className="namazConatinerMain">
                <div className="namazConatiner">
                  <JuristicMethod
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                  />
                  <PrayerTimingSlider
                    setCurrentSliderIdx={setCurrentSliderIdx}
                    setIsMobileHandler={setIsMobile}
                  >
                    {carouselSteps.map((carouselStep) =>
                      isMobile ? (
                        <div
                          key={carouselStep}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Card className={`namaz-card ${condCls}`}>
                            <div className="Azan-Btn-Div">
                              <p className="prayer-icn-title">
                                <img
                                  src={icons[prayerSteps[carouselStep].name]}
                                  alt=""
                                />
                                {showTimings
                                  ? ""
                                  : prayerSteps[carouselStep].name}
                              </p>
                            </div>

                            <div style={{ padding: "0px 9px 9px 9px" }}>
                              {" "}
                              <TimeSelector
                                enteredData={enteredData}
                                setEnteredData={setEnteredData}
                                timeSetter={setAzanTim}
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
                                timeSetter={setIqamaTim}
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
                        <div key={carouselStep} className="tablet-timing-card">
                          <p className="prayer-icn-title">
                            <img
                              src={icons[prayerSteps[carouselStep].name]}
                              alt=""
                            />
                            {showTimings ? "" : prayerSteps[carouselStep].name}
                          </p>
                          <TimeSelector
                            enteredData={enteredData}
                            setEnteredData={setEnteredData}
                            timeSetter={setAzanTim}
                            prayerName={prayerSteps[carouselStep].name}
                            label="Azan"
                            nonHanafyAsr={
                              selectedMethod !== "Hanafi" ? nonHanafyAsr : ""
                            }
                            solarHanafyAsr={
                              selectedMethod === "Hanafi" ? solarHanafyAsr : ""
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
                            timeSetter={setIqamaTim}
                            label="Iqama"
                            nonHanafyAsr={
                              selectedMethod !== "Hanafi" ? nonHanafyAsr : ""
                            }
                            solarHanafyAsr={
                              selectedMethod === "Hanafi" ? solarHanafyAsr : ""
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
                        />
                      </div>
                    )}
                  </PrayerTimingSlider>
                </div>
              </div>

              {currentSliderIdx === 4 && isMobile ? (
                <div className="done-btn-container">
                  <CustomBtn
                    size={"15vw"}
                    eventHandler={showTimingHandler}
                    label={"Done"}
                    showIcon={false}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <PrayerTable timings={inputtedTimings} tZone={tZone} />
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
                label={"Confirm"}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default NamajTimings;
