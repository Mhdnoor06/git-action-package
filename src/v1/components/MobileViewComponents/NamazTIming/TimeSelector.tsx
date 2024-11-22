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
    // fontSize: "11px",
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
            ? 5
            : label === "Iqama" && status === "No Iqama"
            ? 0
            : ExtendedJamaatMinutes,
        jamaatTime:
          label === "Iqama" && (status === "solar" || status === "manual")
            ? dayjs(azaanTime, "HH:mm")
                .add(ExtendedAzaanMinutes, "minutes")
                .format("HH:mm")
            : label === "Iqama" && status === "No Iqama"
            ? ""
            : jamaatTime,
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
      const {
        ExtendedAzaanMinutes,
        ExtendedJamaatMinutes,
        jamaatTime,
        azaanTime,
        // TimesByJamaat,
        ...rest
      } = enteredData[prayerName];

      const updatedData = {
        ...enteredData,
        [prayerName]: {
          ...rest,
          ExtendedAzaanMinutes:
            label === "Azan" ? ExtendedAzaanMinutes + 1 : ExtendedAzaanMinutes,
          ExtendedJamaatMinutes:
            label === "Azan"
              ? ExtendedJamaatMinutes
              : ExtendedJamaatMinutes + 1,
          // jamaatTime: jamaatTime,
          jamaatTime:
            label === "Azan" &&
            dayjs(azaanTime, "HH:mm")
              .add(ExtendedAzaanMinutes, "minute")
              .isSame(dayjs(jamaatTime, "HH:mm"))
              ? dayjs(jamaatTime, "HH:mm").add(1, "minute").format("HH:mm")
              : jamaatTime,
          azaanTime: azaanTime,
          // TimesByJamaat: TimesByJamaat,
        },
      };

      setEnteredData(updatedData);
      // }
    } else {
      const {
        ExtendedAzaanMinutes,
        ExtendedJamaatMinutes,
        jamaatTime,
        TimesByJamaat,
        ...rest
      } = enteredData[prayerName];
      const updatedData = {
        ...enteredData,
        [prayerName]: {
          ...rest,
          ExtendedAzaanMinutes:
            label === "Azan" ? ExtendedAzaanMinutes - 1 : ExtendedAzaanMinutes,
          ExtendedJamaatMinutes:
            label === "Azan"
              ? ExtendedJamaatMinutes
              : ExtendedJamaatMinutes - 1,
          jamaatTime:
            label === "Azan" && TimesByJamaat === "solar"
              ? dayjs(jamaatTime, "HH:mm").add(-1, "minute").format("HH:mm")
              : jamaatTime,
          TimesByJamaat: TimesByJamaat,
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

  // .clock .clock-input input[type="text"] {
  //   margin-bottom: 0;
  //   box-sizing: content-box;
  // }

  // .clock-input .css-60amat-MuiInputBase-root-MuiOutlinedInput-root {
  //   padding-right: 0;
  // }

  // .clock .MuiInputBase-root {
  //   border-radius: 20px;
  // }

  return (
    <div
      className="Azan-solar-timings"
      data-testid={`timings-div-${prayerName}-${label}`}
    >
      <PrayerTypeDropdown
        prayerName={prayerName}
        statusHandler={statusHandler}
        timingStatus={prayerStatus}
        label={label}
      />

      {/* time picker clock option div ------------------------------------------------------------------------ */}
      <div
        data-testid="each-clock"
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
          <label style={{ color: "#9F9E9E" }} data-testid="clock-label">
            {label}
            <MobileTimePicker
              className="mobileTimePicker"
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
                  inputProps: {
                    "data-testid": `${label}-${prayerName}-time`,
                    readOnly: false, // Add your test ID here
                    "aria-readonly": false,
                  },
                },
              }}
              sx={{
                width: "95px",
                border:
                  label === "Iqama" ? "1px solid #1B8368" : "1px solid #ccc",
                // dayjs(enteredData[prayerName]?.azaanTime, "HH:mm")
                //   .add(enteredData[prayerName].ExtendedAzaanMinutes)
                //   .isAfter(dayjs(enteredData[prayerName]?.jamaatTime, "HH:mm"))
                //   ? "1px solid red"
                //   : "1px solid #ccc",
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",

                  padding: "5px",
                  color: prayerStatus === "No Iqama" ? "grey" : "",

                  // fontSize: "14px",
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
        className="offset-container"
        data-testid={`offset-container-${label}-${prayerName}`}
        style={{
          visibility:
            prayerStatus === "manual" || prayerStatus === "No Iqama"
              ? "hidden"
              : "visible",
          position: "relative",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
          // paddingLeft:
          //   label === "Iqama" && prayerStatus === "solar" && isMobile
          //     ? "10px"
          //     : label === "Iqama" && prayerStatus === "solar" && !isMobile
          //     ? "20px"
          //     : "",
        }}
      >
        {label === "Iqama" && (
          <Typography
            textAlign="center"
            position="absolute"
            top={5}
            fontSize={13}
            color="#9F9E9E"
          >
            Iqama
          </Typography>
        )}
        <Box
          className="plus-minus-container"
          height="32px"
          borderRadius="37px"
          border={`1px solid #1B8368`}
          display="flex"
          alignItems="center"
        >
          <Typography
            style={customStyles}
            className="offset-value"
            data-testid={`offset-${label}-${prayerName}`}
          >
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
              data-testid="increment-btn"
            >
              <KeyboardArrowUpIcon sx={{ width: "15px", height: "15px" }} />
            </IconButton>
            <IconButton
              size="small"
              style={iconBtnStyle}
              onClick={() => handleCountPlusMins(false)}
              data-testid="decrement-btn"
            >
              <KeyboardArrowDownIcon sx={{ width: "15px", height: "15px" }} />
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
