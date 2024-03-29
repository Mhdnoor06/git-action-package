import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PrayerTypeDropdown from "./PrayerTypeDropdown";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { EnteredData } from "./NamazTImings";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

type propsType = {
  setEnteredData: Dispatch<SetStateAction<EnteredData>>;
  enteredData: EnteredData;
  timeSetter: Dispatch<SetStateAction<string>>;
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
  console.log(prayerTimeType);

  const statusHandler = (status: string) => {
    const { TimesByAzaan, TimesByJamaat, ...rest } = enteredData[prayerName];
    const updatedData = {
      ...enteredData,
      [prayerName]: {
        ...rest,
        TimesByAzaan: label === "Azan" ? status : TimesByAzaan,
        TimesByJamaat: label === "Azan" ? TimesByJamaat : status,
      },
    };

    setEnteredData(updatedData);

    setPrayerStatus(status);
  };

  // useEffect(() => {
  //   setPrayerStatus(prayerTimeType);
  // }, []);

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
              ? ExtendedJamaatMinutes
              : ExtendedJamaatMinutes + 1,
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
              ? ExtendedJamaatMinutes
              : ExtendedJamaatMinutes - 1,
        },
      };

      setEnteredData(updatedData);
    }
  };

  const iconBtnStyle = { color: "white", padding: 0 };
  return (
    <div className="Azan-solar-timings">
      <PrayerTypeDropdown
        statusHandler={statusHandler}
        timingStatus={prayerStatus}
      />
      <div className="clock">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <label style={{ marginTop: "-4.5vh", color: "#9F9E9E" }}>
            {label} Timing
            {/* <TimePicker
              readOnly={prayerStatus !== "manual"}
              value={timeValue ? dayjs(timeValue, "HH:mm") : null}
              onChange={handleTimeChange}
              slotProps={{ textField: { variant: "outlined" } }}
            /> */}
            <MobileTimePicker
              openTo="minutes"
              readOnly={prayerStatus !== "manual"}
              value={timeValue ? dayjs(timeValue, "HH:mm") : null}
              onChange={handleTimeChange}
              slotProps={{ textField: { variant: "outlined" } }}
              sx={{ width: "100px" }}
            />
          </label>
        </LocalizationProvider>
      </div>

      <div
        style={{ visibility: prayerStatus === "manual" ? "hidden" : "visible" }}
      >
        <Box
          className="plus-minus-container"
          height="32px"
          borderRadius="37px"
          border={`1px solid #1B8368`}
          display="flex"
          alignItems="center"
        >
          <Typography
            variant="body2"
            color="#1B8368"
            marginLeft="5px"
            marginRight="auto"
            fontSize={"11px"}
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
            bgcolor="#1B8368"
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
    </div>
  );
};

export default TimeSelector;
