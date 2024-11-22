import { Backdrop, Grow } from "@mui/material";

import TickIcon from "../../photos/Newuiphotos/Icons/Tvimages/successTick.svg";

type modelProp = {
  open: boolean;
  message: string;
  onClose: () => void;
};

function SuccessMessageModel({ open, message, onClose }: modelProp) {
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
            <img src={TickIcon} alt="" style={{ width: "50px" }} />
            <p style={{ color: "#00A860", fontWeight: "500" }}>{message}</p>
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

export default SuccessMessageModel;
