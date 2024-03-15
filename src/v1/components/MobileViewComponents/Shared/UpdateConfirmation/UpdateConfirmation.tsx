import { Backdrop, Box, CircularProgress, Grow, Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import UpdateIcon from "../../../../photos/alert_icon.png";
interface UpdateConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  progress: boolean;
  texts: { main: string; sub?: string };
  handleReject: () => void;
  handleConfirm: () => void;
}
const UpdateConfirmation: React.FC<UpdateConfirmationProps> = ({
  open,
  setOpen,
  progress,
  texts,
  handleReject,
  handleConfirm,
}) => {
  const onClose = () => {
    setOpen(!open);
  };
  return (
    <Modal open={open} onClose={onClose}>
      {/* <Backdrop open={open} sx={{ zIndex: "1" }}> */}
      {progress ? (
        <Box style={containerStyle}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <div className="delete">
                <div className="profileIcon">
                  <div className="deleteIcon">
                    <img src={UpdateIcon} alt="" />
                  </div>
                </div>
                <p style={{ color: "#FF5050", fontWeight: 700 }}>Alert</p>
                <div>
                  <h5 style={{ margin: "5px 50px 10px 50px" }}>
                    Are you sure you want to update this masjid ?
                  </h5>
                </div>
                <div className="btns">
                  <div className="no" onClick={handleReject}>
                    <a>No</a>
                  </div>
                  <div className="update-yes" onClick={handleConfirm}>
                    <a>Yes</a>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </>
      )}
      {/* </Backdrop> */}
    </Modal>
  );
};
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // You may adjust this based on your layout needs
};
export default UpdateConfirmation;
