import { Backdrop, Grow } from "@mui/material";
import React from "react";
import TickIcon from "../../photos/Newuiphotos/Icons/successTick.svg";

type modelProp = {
  open: boolean;
  message: string;
  response: string;
  onClose: () => void;
};

function SuccessMessageModelWithResponse({
  open,
  message,
  response,
  onClose,
}: modelProp) {
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        // onClick={onClose}
      >
        <Grow in={true}>
          <div
            style={{
              background: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "20px",
              width: "19rem",
              borderRadius: "20px",
            }}
          >
            <img src={TickIcon} alt="" style={{ width: "70px" }} />
            <p style={{ color: "#00A860", fontWeight: "500" }}>{message}</p>
            <p
              style={{
                color: "#838383",
                fontSize: "13px",
                textAlign: "center",
                margin: "0px",
              }}
            >
              {response}
            </p>
            <button
              style={{
                width: "90%",
                padding: "10px",
                borderRadius: "20px",
                border: "none",
                background: "#1B8368",
                color: "white",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={onClose}
            >
              Okay
            </button>
          </div>
        </Grow>
      </Backdrop>
    </div>
  );
}

export default SuccessMessageModelWithResponse;
