import { Backdrop, Box, CircularProgress, Grow } from "@mui/material";
import del from "../../../../photos/Newuiphotos/Icons/delete.svg";
import React from "react";
import "./DeleteWarningCard.css";

interface DeleteWarningCardProps {
  onClose: () => void;
  onConfirm: () => void;
  wariningType: string;
  warining: string;
  icon?: any;
  progress?: boolean;
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const DeleteWarningCard: React.FC<DeleteWarningCardProps> = ({
  onClose,
  onConfirm,
  wariningType,
  warining,
  icon,
  progress,
}: DeleteWarningCardProps) => {
  console.log(icon);
  return (
    <Backdrop open={true} sx={{ zIndex: "1" }}>
      <>
        {progress ? (
          <div style={containerStyle}>
            <CircularProgress color="success" className="loader" />
          </div>
        ) : (
          <div className="deleteCard">
            <Box sx={{ height: 180, width: "100%" }}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Grow in={true}>
                  <div className="delete" style={{ width: "100%" }}>
                    <div className="profileIcon">
                      <div className="deleteIcon">
                        <img
                          src={icon ? icon : del}
                          alt=""
                          style={icon ? { width: "60px" } : { width: "20px" }}
                        />
                      </div>
                    </div>
                    <div className="warning">
                      <h5>{wariningType}</h5>
                      <p>{warining}</p>
                    </div>
                    <div className="btns">
                      <div className="no" onClick={onClose}>
                        <a>No</a>
                      </div>
                      <div
                        className="yes"
                        onClick={onConfirm}
                        style={icon ? { background: "#1B8368" } : {}}
                      >
                        <a>Yes</a>
                      </div>
                    </div>
                  </div>
                </Grow>
              </Box>
            </Box>
          </div>
        )}
      </>
    </Backdrop>
  );
};

export default DeleteWarningCard;
