import { Dialog } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import rejectedIcon from "../../../../photos/Newuiphotos/Payments/rejected.webp";
import "./StripeErrorModal.css";
const cardStyle = {
  borderRadius: "16px",
  margin: "auto 10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",

  display: "flex",
  flexDirection: "column",
  padding: "15px",
  minHeight: "225px",
  marginTop: "20px",
  justifyContent: "flex-start",
};

interface StripeErrorModalProps {
  isOpen: boolean;
  isMainAdmin?: boolean;
  handleClose: () => void;
  handleButtonClick: () => void;
  feature: string;
}
const StripeErrorModal = ({
  isOpen,
  handleClose,
  handleButtonClick,
  feature,
  isMainAdmin = false,
}: StripeErrorModalProps) => {
  return (
    <Dialog
      PaperProps={{ sx: cardStyle }}
      open={isOpen}
      className="noaccountDialogBox"
    >
      <CloseIcon
        onClick={handleClose}
        sx={{
          width: "30px",
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      />
      {/* <Paper sx={cardStyle}> */}
      <div className="donation-iconContainer">
        <img src={rejectedIcon} style={{ width: "65px" }} alt="" />
      </div>
      <h5 className="donation-payments-title">Account Not Linked</h5>
      <div
        className="donation-payment-content"
        style={{
          alignItems: status === "hasaccount" ? "flex-start" : "center",
        }}
      >
        <p>
          It seems that you don't have a linked Stripe account {feature} through
          ConnectMazjid. Please connect your Stripe account to start accepting
          payments.
        </p>
      </div>
      {isMainAdmin ? null : (
        <button
          data-testid="account-not-link"
          style={{
            background: "#1B8368",
            boxShadow: "none",
            border: "none",
            // padding: "10px 5px",
            width: "90%",
            height: "40px",
            color: "white",
            fontWeight: "500",
            borderRadius: "22px",
            margin: "20px auto",
            cursor: "pointer",
          }}
          onClick={handleButtonClick}
        >
          Link My Account
        </button>
      )}
      {/* </Paper> */}
    </Dialog>
  );
};

export default StripeErrorModal;
