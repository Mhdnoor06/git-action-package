import { Backdrop, Box, CircularProgress, Grow } from "@mui/material";
import del from "../../../../photos/Newuiphotos/Icons/delete.svg";
import React from "react";
import "./DeleteWarningCard.css";

interface DeleteWarningCardProps {
  onClose: () => void;
  onConfirm: () => void;
  wariningType: string;
  warining?: string;
  icon?: any;
  iconsize?: string;
  color?: string;
  progress?: boolean;
  children?: React.ReactNode;
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
  iconsize,
  progress,
  color,
  children,
}: DeleteWarningCardProps) => {
  return (
    <Backdrop open={true} sx={{ zIndex: "1001" }}>
      <>
        {progress ? (
          <div style={containerStyle} data-testid="progressbar">
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
                          style={
                            iconsize ? { width: iconsize } : { width: "40px" }
                          }
                        />
                      </div>
                    </div>
                    <div className="warning">
                      <h5>{wariningType}</h5>
                      <p>{warining}</p>
                    </div>
                    {children}
                    <div className="btns">
                      <div className="no" onClick={onClose}>
                        <a>No</a>
                      </div>
                      <div
                        className="yes"
                        onClick={onConfirm}
                        style={color ? { background: color } : {}}
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
