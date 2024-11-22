import React from "react";
import btnImg from "../../../photos/clockIcon.png";
import eventImg from "../../../photos/eventIcon.png";
import { CircularProgress } from "@mui/material";
import AnnouncementIcon from "../../../photos/Newuiphotos/nav bar/navicons/navactiveicons/Announcementactive.svg";

type PropsType = {
  eventHandler: (val: any) => void;
  size?: string;
  label: string;
  TxColor?: string;
  showIcon?: boolean;
  isLoading?: boolean;
  bgColor?: string;
  hightSize?: string;
  borderClr?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
  icon?: any;
  width?: string;
  imgWidth?: string;
  fontSize?: string;
};

const CustomBtn = ({
  eventHandler,
  label,
  isLoading,
  bgColor = "",
  borderClr = "none",
  fontSize = "13px",
  TxColor = "white",
  showIcon = true,
  isDisabled = isLoading ? true : false,
  size = "12vw",
  hightSize = "32px",
  children,
  icon,
  width,
  imgWidth = "12%",
}: PropsType) => {
  const btnStyle = {
    // width: "100%",
    padding: `${size ? `0px ${size} 0px ${size}` : "0px 20vw 0px 24vw"}`,
    height: hightSize,
    border: borderClr,
    cursor: "pointer",
    color: isDisabled ? "#054635" : TxColor,
    width: width ? width : "",
    background: bgColor ? bgColor : !isDisabled ? "#1B8368" : "grey",
    // boxShadow:
    //   "0px 4px 10px rgba(0, 0, 0, 0.3), 0px 4px 20px rgba(0, 0, 0, 0.2)",
    borderRadius: "30px",
    fontFamily: "Lato",
    fontSize: fontSize,
    fontWeight: 600,
    textAligns: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: width ? "space-between" : "center",
  };

  let imgStyle = {
    width: imgWidth ? imgWidth : "12%",
    marginRight: "10px",
  };
  // .my-custom-btn {
  //   padding: 0px 66px 0px 76px !important;
  // }
  return (
    <>
      <button
        data-testid="my-custom-btn"
        className="my-custom-btn"
        onClick={eventHandler}
        style={btnStyle}
        disabled={isDisabled}
      >
        {showIcon ? (
          <img
            style={imgStyle}
            src={
              label == "Add Events" || label == "Update Event" ? eventImg : icon
            }
            alt="Button icon"
          />
        ) : null}
        {isLoading && (
          <CircularProgress
            size="20px"
            style={{ color: "white", marginRight: "8px" }}
          />
        )}
        {label} {children}
      </button>
    </>
  );
};

export default CustomBtn;
