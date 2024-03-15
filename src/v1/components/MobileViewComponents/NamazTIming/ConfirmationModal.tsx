import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal, Card, CardContent, Typography, Box } from "@material-ui/core";

import CustomBtn from "../Shared/CustomBtn";
import { modalCenterStyle } from "./JuristicMethod";
import toast from "react-hot-toast";

interface JuristicMethodProps {
  isModalOpen: boolean;
  juristicMethod: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setParentModalOpen: Dispatch<SetStateAction<boolean>>;
  // Add any additional props if needed
}

const ConfirmationModal: React.FC<JuristicMethodProps> = ({
  isModalOpen,
  setModalOpen,
  setParentModalOpen,
  juristicMethod,
}) => {
  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  const handleSaveClick = () => {
    localStorage.setItem("JuristicMethod", juristicMethod);
    toast.success("Juristic Method  has saved");
    setModalOpen(false);
    setParentModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleCancelClick}
        style={modalCenterStyle}
      >
        <Card style={CardStyle}>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              borderBottom: "2px solid #E7E7E7",
            }}
          >
            <Typography variant="h6" align="center" style={juristicTxStyle}>
              Al-Asr Juristic Method
            </Typography>
            <Typography variant="h6" align="center" style={juristicGreyTxStyle}>
              {juristicMethod}
            </Typography>
          </CardContent>
          <Typography variant="h6" align="center" style={confirmTxStyle}>
            Are you sure you want to change Al-Asr Juristic Method ?
          </Typography>

          <Box display="flex" justifyContent="space-around" mt={2}>
            <CustomBtn
              eventHandler={handleCancelClick}
              label={"No"}
              borderClr={"2px solid #FF7272"}
              bgColor={"#FF7272"}
              showIcon={false}
              size={"15vw"}
            />
            <CustomBtn
              eventHandler={handleSaveClick}
              label={"Yes"}
              size={"15vw"}
              showIcon={false}
            />
          </Box>
        </Card>
      </Modal>
    </div>
  );
};

const juristicTxStyle = {
  fontFamily: "Inter",
  color: "#1B8368",
  fontWeight: 600,
  fontSize: "14px",
};
const confirmTxStyle = {
  fontFamily: "Lato",
  color: "#3D544E",
  fontWeight: 600,
  fontSize: "16px",
  LineHeight: "19.2px",
};
const juristicGreyTxStyle = {
  fontFamily: "Inter",
  color: "#919191",
  fontWeight: 500,
  fontSize: "15px",
};
const CardStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "space-between",
  height: "210px",
  padding: "15px 0px 30px 0px",
  width: "85%",
  borderRadius: "30px",
};

export default ConfirmationModal;
