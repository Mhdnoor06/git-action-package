import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PrayerTypeDropdown from "./PrayerTypeDropdown";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { EnteredData } from "./NamazTImings";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

type propsType = {
  setEnteredData: Dispatch<SetStateAction<EnteredData>>;
  enteredData: EnteredData;
  label: string;
  nonHanafyAsr: string;
  prayerName: string;
  solarHanafyAsr: string;
  prayerTimeType?: string;
};
const TimeSelector = ({
  setEnteredData,
  enteredData,
  label,
  nonHanafyAsr,
  solarHanafyAsr,
  prayerName,
  prayerTimeType,
}: propsType) => {
  const [prayerStatus, setPrayerStatus] = useState(prayerTimeType);
  const initialTimesByJamaat = useRef(prayerTimeType);

  const customStyles = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "11px",
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
    color: prayerStatus === "No Iqama" ? "#9F9E9E" : "#1B8368",
    marginLeft: "5px",
    marginRight: "auto",
  };
  const isMobile = useMediaQuery("(max-width:768px)");
  // Effect to check if jamaatTime is empty and set prayerStatus to "skip"
  useEffect(() => {
    // console.log(
    //   "----------------------the method is changing",
    //   enteredData[prayerName]
    // );
    const currentPrayer = enteredData[prayerName];
    if (currentPrayer && label == "Iqama") {
      setPrayerStatus(currentPrayer.TimesByJamaat);
    }
  }, [enteredData, prayerName]);

  useEffect(() => {
    const currentPrayer = enteredData[prayerName];
    if (
      currentPrayer &&
      currentPrayer.TimesByJamaat !== "No Iqama" &&
      currentPrayer.jamaatTime === "" &&
      label === "Iqama"
    ) {
      const updatedData = {
        ...enteredData,
        [prayerName]: {
          ...currentPrayer,
          jamaatTime: currentPrayer.azaanTime, // autofill jamaatTime with azaanTime
        },
      };
      setEnteredData(updatedData);
    }
  }, [enteredData, prayerName, label, setEnteredData]);

  const statusHandler = (status: string) => {
    const {
      TimesByAzaan,
      TimesByJamaat,
      ExtendedAzaanMinutes,
      ExtendedJamaatMinutes,
      jamaatTime,
      azaanTime,
      ...rest
    } = enteredData[prayerName];
    const updatedData = {
      ...enteredData,
      [prayerName]: {
        ...rest,
        TimesByAzaan: label === "Azan" ? status : TimesByAzaan,
        TimesByJamaat: label === "Azan" ? TimesByJamaat : status,
        ExtendedJamaatMinutes:
          label === "Iqama" && status === "solar"
            ? 5 + ExtendedAzaanMinutes
            : ExtendedJamaatMinutes,
        jamaatTime:
          label === "Iqama" && status === "solar" ? azaanTime : jamaatTime,
        azaanTime: azaanTime,
        ExtendedAzaanMinutes: ExtendedAzaanMinutes,
      },
    };

    setEnteredData(updatedData);
    setPrayerStatus(status);
  };

  useEffect(() => {
    if (nonHanafyAsr && prayerName === "Asar" && prayerStatus === "solar") {
      timeSetter(nonHanafyAsr);
    } else if (
      solarHanafyAsr &&
      prayerName === "Asar" &&
      prayerStatus === "solar"
    ) {
      timeSetter(solarHanafyAsr);
    }
  }, [nonHanafyAsr, prayerName]);

  const timeSetter = (tim: string) => {
    const { azaanTime, jamaatTime, ...rest } = enteredData[prayerName];
    const updatedData = {
      ...enteredData,
      [prayerName]: {
        ...rest,
        azaanTime: label === "Azan" ? tim : azaanTime,
        jamaatTime: label === "Azan" ? jamaatTime : tim,
      },
    };
    setEnteredData(updatedData);
  };

  // Convert your time string to a Dayjs object for the TimePicker
  const timeValue =
    label === "Azan"
      ? enteredData[prayerName]?.azaanTime
      : enteredData[prayerName]?.jamaatTime;

  const handleTimeChange = (newValue) => {
    // setIsSubmitBtnDisabled(false);
    console.log(newValue);
    if (newValue) {
      const formattedTime = newValue.format("HH:mm"); // Format back to string
      timeSetter(formattedTime);
    }
  };

  const handleCountPlusMins = (isIncrease: boolean) => {
    if (isIncrease) {
      // if (count < 60) {
      const { ExtendedAzaanMinutes, ExtendedJamaatMinutes, ...rest } =
        enteredData[prayerName];
      const updatedData = {
        ...enteredData,
        [prayerName]: {
          ...rest,
          ExtendedAzaanMinutes:
            label === "Azan" ? ExtendedAzaanMinutes + 1 : ExtendedAzaanMinutes,
          ExtendedJamaatMinutes:
            label === "Azan"
              ? ExtendedJamaatMinutes + 1
              : ExtendedJamaatMinutes + 1,

          // jamaatTime:
          //   prayerName === "Maghrib" && label === "Azan"
          //     ? dayjs(jamaatTime, "HH:mm").add(1, "minute").format("HH:mm")
          //     : jamaatTime,
        },
      };

      setEnteredData(updatedData);
      // }
    } else {
      const { ExtendedAzaanMinutes, ExtendedJamaatMinutes, ...rest } =
        enteredData[prayerName];
      const updatedData = {
        ...enteredData,
        [prayerName]: {
          ...rest,
          ExtendedAzaanMinutes:
            label === "Azan" ? ExtendedAzaanMinutes - 1 : ExtendedAzaanMinutes,
          ExtendedJamaatMinutes:
            label === "Azan"
              ? ExtendedJamaatMinutes - 1
              : ExtendedJamaatMinutes - 1,
          // jamaatTime:
          //   prayerName === "Maghrib" && label === "Azan"
          //     ? dayjs(jamaatTime, "HH:mm").add(-1, "minute").format("HH:mm")
          //     : jamaatTime,
        },
      };

      setEnteredData(updatedData);
    }
  };
  // // perfect
  // const minTime =
  //   label === "Iqama"
  //     ? dayjs(enteredData[prayerName]?.azaanTime, "HH:mm")
  //         .add(enteredData[prayerName]?.ExtendedAzaanMinutes, "minutes")
  //         .add(-enteredData[prayerName]?.ExtendedJamaatMinutes, "minutes")
  //     : null;
  // // need to change
  // const maxTime =
  //   label === "Azan"
  //     ? //check if the iqama is manual autofill or skipp

  //       // if it is manual then don't add extended. if it is autofill add

  //       dayjs(enteredData[prayerName]?.jamaatTime, "HH:mm").add(
  //         -enteredData[prayerName]?.ExtendedAzaanMinutes,
  //         "minutes"
  //       )
  //     : null;

  const minTime = () => {
    if (label === "Iqama") {
      if (enteredData[prayerName]?.TimesByJamaat === "manual") {
        return dayjs(enteredData[prayerName]?.azaanTime, "HH:mm").add(
          enteredData[prayerName]?.ExtendedAzaanMinutes,
          "minutes"
        );
      } else if (enteredData[prayerName]?.TimesByJamaat === "solar") {
        return dayjs(enteredData[prayerName]?.azaanTime, "HH:mm")
          .add(enteredData[prayerName]?.ExtendedAzaanMinutes, "minutes")
          .add(-enteredData[prayerName]?.ExtendedJamaatMinutes, "minutes");
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  const maxTime = () => {
    if (label === "Azan") {
      if (enteredData[prayerName]?.TimesByJamaat === "manual") {
        return dayjs(enteredData[prayerName]?.jamaatTime, "HH:mm").add(
          -enteredData[prayerName]?.ExtendedAzaanMinutes,
          "minutes"
        );
      } else if (enteredData[prayerName]?.TimesByJamaat === "solar") {
        return dayjs(enteredData[prayerName]?.jamaatTime, "HH:mm")
          .add(enteredData[prayerName]?.ExtendedJamaatMinutes, "minutes")
          .add(-enteredData[prayerName]?.ExtendedAzaanMinutes, "minutes");
      } else {
        return null;
      }
    }
  };
  const iconBtnStyle = { color: "white", padding: 0 };

  return (
    <div className="Azan-solar-timings">
      <PrayerTypeDropdown
        prayerName={prayerName}
        statusHandler={statusHandler}
        timingStatus={prayerStatus}
        label={label}
      />

      {/* time picker clock option div ------------------------------------------------------------------------ */}
      <div
        className="clock"
        style={
          prayerStatus === "No Iqama"
            ? { visibility: "hidden" }
            : label === "Iqama" && prayerStatus === "solar"
            ? { display: "none" }
            : {}
        }
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label style={{ marginTop: "-4.5vh", color: "#9F9E9E" }}>
            {label} Timing
            <MobileTimePicker
              onChange={handleTimeChange}
              openTo="minutes"
              {...(prayerStatus === "solar" || prayerStatus === "No Iqama"
                ? { readOnly: true }
                : {})}
              value={timeValue ? dayjs(timeValue, "HH:mm") : null}
              minTime={minTime()}
              maxTime={maxTime()}
              slotProps={{
                textField: {
                  variant: "outlined",
                },
              }}
              sx={{
                width: "100px",
                border: "1px solid #ccc",
                // dayjs(enteredData[prayerName]?.azaanTime, "HH:mm")
                //   .add(enteredData[prayerName].ExtendedAzaanMinutes)
                //   .isAfter(dayjs(enteredData[prayerName]?.jamaatTime, "HH:mm"))
                //   ? "1px solid red"
                //   : "1px solid #ccc",
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  padding: "3px",
                  color: prayerStatus === "No Iqama" ? "grey" : "",
                },
                textDecorationLine:
                  prayerStatus === "No Iqama" ? "line-through" : "",
              }}
            />
          </label>
        </LocalizationProvider>
      </div>
      {/* ))} */}

      {/* time picker clock option div close------------------------------------  ------------------------------------ */}

      {/* offset option div ------------------------------------  ------------------------------------ */}
      {/* {prayerStatus !== "No Iqama" && ( */}
      <div
        style={{
          visibility:
            prayerStatus === "manual" || prayerStatus === "No Iqama"
              ? "hidden"
              : "visible",
          position: "relative",
          paddingLeft:
            label === "Iqama" && prayerStatus === "solar" && isMobile
              ? "10px"
              : label === "Iqama" && prayerStatus === "solar" && !isMobile
              ? "20px"
              : "",
        }}
      >
        <Box
          className="plus-minus-container"
          height="32px"
          borderRadius="37px"
          border={`1px solid #1B8368`}
          display="flex"
          alignItems="center"
        >
          <Typography style={customStyles}>
            {label === "Azan"
              ? enteredData[prayerName]?.ExtendedAzaanMinutes >= 0
                ? "+"
                : ""
              : enteredData[prayerName]?.ExtendedJamaatMinutes >= 0
              ? "+"
              : ""}
            {label === "Azan"
              ? enteredData[prayerName]?.ExtendedAzaanMinutes
              : enteredData[prayerName]?.ExtendedJamaatMinutes}{" "}
            min
          </Typography>
          <Box
            className="plus-minus-box"
            width="40%"
            height="32px"
            borderRadius="0 37px 37px 0"
            bgcolor={prayerStatus === "No Iqama" ? "#9F9E9E" : "#1B8368"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <IconButton
              size="small"
              style={iconBtnStyle}
              onClick={() => handleCountPlusMins(true)}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton
              size="small"
              style={iconBtnStyle}
              onClick={() => handleCountPlusMins(false)}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </Box>
      </div>
      {/* )} */}

      {/* offset option div  ------------------------------------  ------------------------------------  */}
    </div>
  );
};

export default TimeSelector;
