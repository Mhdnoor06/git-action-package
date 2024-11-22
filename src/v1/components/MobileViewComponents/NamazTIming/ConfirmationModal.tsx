import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  Card,
  CardContent,
  Typography,
  Box,
  makeStyles
} from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "210px",

    padding: "15px 0px 30px 0px",
    width: "85%",
    borderRadius: "30px"
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    borderBottom: "2px solid #E7E7E7"
  },
  juristicTxStyle: {
    fontFamily: "Inter",
    color: "#1B8368",
    fontWeight: 600,
    fontSize: "14px"
  },
  confirmTxStyle: {
    fontFamily: "Lato",
    color: "#3D544E",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "19.2px"
  },
  juristicGreyTxStyle: {
    fontFamily: "Inter",
    color: "#919191",
    fontWeight: 500,
    fontSize: "15px"
  }
}));

const ConfirmationModal: React.FC<JuristicMethodProps> = ({
  isModalOpen,
  setModalOpen,
  setParentModalOpen,
  juristicMethod
}) => {

  const classes = useStyles();

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  const handleSaveClick = () => {
    localStorage.setItem("JuristicMethod", juristicMethod);
    toast.success("Juristic Method has saved");
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
        <Card className={classes.card}>
          <Typography></Typography>
          <Typography
            variant="h6"
            align="center"
            className={classes.confirmTxStyle}
          >
            Are you sure want to change Al-Asr Juristic Method to{" "}
            <span style={{ color: "rgb(27, 131, 104)" }}>{juristicMethod}</span>{" "}
            ?
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

export default ConfirmationModal;
