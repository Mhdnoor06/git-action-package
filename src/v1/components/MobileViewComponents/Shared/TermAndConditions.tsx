import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import CustomBtn from "./CustomBtn";
import TermAndConditionsText from "./TermAndConditionsText";
type propsType = {
  tmConOpener: boolean;
  setTmConOpener: Dispatch<SetStateAction<boolean>>;
};

const TermAndConditions = ({ tmConOpener, setTmConOpener }: propsType) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasUserSeenModal = localStorage.getItem("hasUserSeenModal");
    if (!hasUserSeenModal || tmConOpener) {
      setOpen(true);
    }
  }, [tmConOpener]);

  const handleClose = () => {
    if (!tmConOpener) localStorage.setItem("hasUserSeenModal", "true");
    setOpen(false);
    setTmConOpener(false);
  };
  const dialogTitle = {
    fontFamily: "Inter",
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "0em",

    color: " #3D5347",
  };
  const actionContainer = {
    display: "flex",
    justifyContent: "space-around",
  };
  const scrollStyole = `
  .condition-text{
     margin-right:10px
  }
    .condition-text::-webkit-scrollbar {
      width: 4px !important;
   
    }
    
    .condition-text::-webkit-scrollbar-thumb {
      background: #054635; 
      border-radius: 4px;
    }
    .condition-text::-webkit-scrollbar-track {
      background: #f1f1f1;
    } 
    .term-condition>div>div{
      border-radius: 30px !important;
      height: 60vh

    }     
  `;

  return (
    <Dialog open={open} onClose={handleClose} className="term-condition">
      <style>{scrollStyole}</style>
      <DialogTitle style={{ ...dialogTitle, textAlign: "center" }}>
        Terms and Conditions
      </DialogTitle>
      <DialogContent className="condition-text">
        <TermAndConditionsText />
      </DialogContent>
      <DialogActions style={{ ...actionContainer, padding: "25px" }}>
        <CustomBtn
          showIcon={false}
          eventHandler={handleClose}
          label={"Accept"}
          size={window.innerWidth >= 2000 ? "7vw" : "12vw"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default TermAndConditions;
