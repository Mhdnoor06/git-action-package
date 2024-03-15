import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Stack } from "@mui/material";
import { LocationBasedToday } from "../../../helpers/HelperFunction";
import moment from "moment";
import calenderICon from "../../../photos/calenderIcon.png";
import PreNextBtn from "../Shared/PreNextBtn";
type propsType = {
  handleDateChange: (val: string) => void;
  tZone: string;
};
const DateChanger = ({ handleDateChange, tZone }: propsType) => {
  const [currentDate, setCurrentDate] = useState<Date | string>(
    LocationBasedToday(tZone)
  );
  const [data, setData] = useState([]);

  // Function to handle date change
  const handleDate = (val: boolean) => {
    if (val) {
      const nextDay = moment(currentDate)
        .clone()
        .add(1, "day")
        .format("YYYY-MM-DD");
      setCurrentDate(nextDay);
      handleDateChange(nextDay);
    } else {
      const preDay = moment(currentDate)
        .clone()
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      setCurrentDate(preDay);
      handleDateChange(preDay);
    }
  };
  const formattedDate = moment(currentDate).format("MMMM D, YYYY");
  const formattedDay = moment(currentDate).format("dddd");

  const btnStyle = {
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add shadow style
    borderRadius: "50%",
    fontSize: "10px",
    width: "30px",
    height: "30px",
  };
  const DateStyle = {
    color: "gray",
    fontWeight: 500,
    width: "70px",
    fontSize: "15px",
    margin: "auto 15px",
  };
  const dateBoxStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const dateHandler = () => {
    handleDate(false);
  };
  const dateNextHandler = () => {
    handleDate(true);
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        mx={3}
        pt={2}
        pb={2}
        alignItems="center"
        spacing={2}
      >
        <div style={dateBoxStyle}>
          <img
            style={{ width: "18px", marginRight: 8 }}
            src={calenderICon}
            alt="calender Icon"
          />
          <small>{formattedDate}</small>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PreNextBtn isPre={true} btnHandler={dateHandler} />
          {/* <IconButton
            onClick={() => handleDate(false)}
            style={btnStyle}
            aria-label="delete"
          >
            <ArrowBackIosIcon />
          </IconButton> */}

          <p style={DateStyle}>{formattedDay}</p>
          <PreNextBtn isPre={false} btnHandler={dateNextHandler} />
          {/* <IconButton
            onClick={() => handleDate(true)}
            style={btnStyle}
            aria-label="delete"
          >
            <ArrowForwardIosIcon />
          </IconButton> */}
        </div>
      </Stack>
    </>
  );
};

export default DateChanger;
