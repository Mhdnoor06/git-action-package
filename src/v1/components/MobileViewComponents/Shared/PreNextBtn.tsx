import React from "react";
import { Card, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
type propsType = {
  btnHandler: () => void;
  isPre: boolean;
};
const PreNextBtn = ({ btnHandler, isPre }: propsType) => {
  const btnStyle = `
    .next-previous-btn{
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3), 0px 4px 20px rgba(0, 0, 0, 0.2);
     background:white;
    font-size: 8px;
    width: 28px;
    height: 28px;
    display: flex;
    border-radius:50%;
    justify-content: center;
    align-items: center;
    }`;
  return (
    <>
      <style>{btnStyle}</style>
      <IconButton
        onClick={btnHandler}
        className="next-previous-btn"
        aria-label="delete"
      >
        <div style={isPre ? { marginLeft: "5px" } : {}}>
          {isPre ? (
            <ArrowBackIosIcon fontSize="small" style={{ fontSize: "13px" }} />
          ) : (
            <ArrowForwardIosIcon
              fontSize="small"
              style={{ fontSize: "13px" }}
            />
          )}
        </div>
      </IconButton>
    </>
  );
};

export default PreNextBtn;
