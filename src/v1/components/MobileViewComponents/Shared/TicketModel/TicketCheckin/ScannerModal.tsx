import React, { useRef, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import QRScanner from "qr-scanner"; // Assuming you're using the qr-scanner library
import QrScanner from "qr-scanner";
import ImageWithBorder from "./ImageWithBorder";
import squareFrameIcon from "../../../../../photos/Newuiphotos/square.webp";
import CloseIcon from "@mui/icons-material/Close";

const ScannerModal = ({
  open,
  videoRef,
  handleModalClose,
  setShowTicketDetails,
  setIsScanFailModalVisible,
  tickets,
  handleOpenScannedTicket,
}: any) => {
  const qrScannerRef = useRef();
  const [isScanning, setIsScanning] = useState(false);

  const handleStopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
    handleModalClose();
  };

  const handleSuccessfulScan = (bookingId: string) => {
   // console.log(bookingId);
    handleStopScanning();

    const scannerTicket = tickets.find(
      (ticket: any) => ticket.bookingId === bookingId
    );
    if (scannerTicket) {
      handleOpenScannedTicket(scannerTicket);
    } else {
      setIsScanFailModalVisible(true);
    }
    // if (data == "Failure") {
    //   setIsScanFailModalVisible(true);
    // } else {
    //   setShowTicketDetails(true);
    // }
  };

  const handleStartScan = () => {
    setIsScanning(true);

    if (videoRef.current) {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          handleSuccessfulScan(result.data);
          // console.log("QR Code detected:", result.data);
          // Handle the scanned data (e.g., navigate, store data, etc.)
        },
        {
          onDecodeError: (error) => {
            // console.error("QR Code decode error:", error);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScannerRef.current.start().catch(console.error);
    } else {
      console.log("qrScannerRef", qrScannerRef.current);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleStopScanning}
      aria-labelledby="scanner-modal-title"
      aria-describedby="scanner-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxWidth: "320px",
          height: "80%",
          maxHeight: "500px",
          bgcolor: "#051F18",
          borderRadius: "9px",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          id="scanner-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontFamily: "Lato", color: "white" }}
        >
          Scan Ticket
        </Typography>

        <Box
          sx={{
            display: isScanning ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            // height: "320px",
            // width: "320px",
            bgcolor: "grey.200",
            mt: 2,
            borderRadius: "22px",
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              //borderRadius: "22px",
            }}
          />
        </Box>

        <ImageWithBorder isScanning={isScanning} />

        <Button
          //   variant="contained"
          //   color="primary"
          onClick={() => {
            isScanning ? handleStopScanning() : handleStartScan();
          }}
          sx={{
            mt: 2,
            bgcolor: "#1B8368",
            color: "white",
            border: "none",
            borderRadius: "22px",
            padding: "5px 50px",
            textTransform: "none",
          }}
        >
          {/* <img
            src={squareFrameIcon}
            alt=""
            style={{ width: "15px", marginRight: "7px" }}
          /> */}
          {isScanning ? "Stop Scanning" : "Scan to Check In"}
        </Button>
        {/* <Button
          //   variant="outlined"
          //   color="secondary"
          sx={{
            mt: 2,
            ml: 2,
            position: "absolute",
            top: "6px",
            right: "6px",
            color: "white",
            background: "transparent",
            border: "none",
          }}
        > */}
        <CloseIcon
          sx={{
            // mt: 2,
            // ml: 2,
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "white",
          }}
          onClick={handleStopScanning}
          fontSize="small"
        />
        {/* </Button> */}
      </Box>
    </Modal>
  );
};

export default ScannerModal;
