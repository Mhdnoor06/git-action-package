import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grow,
  Modal,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import UpdateIcon from "../../../../photos/alert_icon.png";
import scannerError from "../../../../photos/Newuiphotos/events/ticket/scannerError.webp";
import "./TicketScanFailModal.css";
interface UpdateConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  texts: { main: string; sub?: string };
  handleClose: () => void;
}
const TicketScanFailModal: React.FC<UpdateConfirmationProps> = ({
  open,
  setOpen,
  texts,
  handleClose,
}) => {
  const onClose = () => {
    setOpen(!open);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              // padding: "20px",
              maxWidth: "325px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ padding: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  style={{ width: "35px" }}
                  src={scannerError}
                  alt="Invalid QR Code"
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "black", fontWeight: 700 }}
              >
                Invalid QR Code
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ margin: "10px 0 20px 0", color: "#555555" }}
              >
                The QR Code is not recognized.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={onClose}
                sx={{
                  fontSize: "13px",
                  width: "50%",
                  height: "50px",
                  backgroundColor: "#E0E0E0",
                  color: "#000000",
                  textTransform: "none",
                  borderRadius: "0px 0px 0px 8px",
                  "&:hover": {
                    backgroundColor: "#E0E0E0",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={()=>{onClose}}
                sx={{
                  fontSize: "13px",
                  width: "50%",
                  height: "50px",
                  backgroundColor: "#1D785A",
                  color: "#FFFFFF",
                  textTransform: "none",
                  borderRadius: "0px 0px 8px 0px",
                  "&:hover": {
                    backgroundColor: "#1D785A",
                  },
                }}
              >
                Manual Checked In
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    </Modal>
  );
};
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // You may adjust this based on your layout needs
};
export default TicketScanFailModal;
