import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Card, CardContent, Typography, Box } from "@material-ui/core";
import checkImg from "../../../photos/checkmark.png";
import CustomBtn from "../Shared/CustomBtn";
import ConfirmationModal from "./ConfirmationModal";

interface JuristicMethodProps {
  setSelectedMethod: Dispatch<SetStateAction<string>>;
  selectedMethod: string;
}

const JuristicMethod: React.FC<JuristicMethodProps> = ({
  selectedMethod,
  setSelectedMethod,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConModalOpen, setConModalOpen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);
  const [initialSelectedMethod, setInitialSelectedMethod] =
    useState<string>("Hanafi");

  // const savedMethod = localStorage.getItem("JuristicMethod");
  const savedMethod = selectedMethod;

  useEffect(() => {
    setSelectedMethod(savedMethod ?? "Hanafi");
    setInitialSelectedMethod(savedMethod ?? "Hanafi");
  }, [isModalOpen]);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCancelClick = () => {
    setModalOpen(false);
    setSelectedMethod(savedMethod ?? "Hanafi");
  };

  const handleSaveClick = () => {
    setConModalOpen(true);
  };

  useEffect(() => {
    if (selectedMethod !== initialSelectedMethod) {
      setIsSaveButtonVisible(true);
    } else setIsSaveButtonVisible(false);
  }, [selectedMethod, isModalOpen]);

  const selectedStyle = { ...nonSelectionCardStyle, ...selectedCard };
  const isHanafy = selectedMethod === "Hanafi" ? true : false;

  return (
    <>
      <div className="juristic-main-container" style={juristicConainer}>
        {/* <div className="juristic-container">
          <Typography style={juristicTxStyle}>
            {" "}
            Al-Asr Juristic Method
          </Typography>
          <div className="JuristicEdit" onClick={handleEditClick}>
            <Typography
              style={{
                cursor: "pointer",
                margin: "auto 10px",
                fontSize: "13px",
                display: "inline",
              }}
            >
              {selectedMethod}
            </Typography>
            <img src={editImg} alt="Icon img" />
          </div>
        </div> */}

        {/* <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography className="Autofilldsc" style={autoTxStyle}>
            <b style={{ color: "#1B8368" }}>Autofill: </b>
            Timings are dynamically adjusted for each day,
            <span style={{ color: "#1B8368" }}>(+/-)</span> of minutes will also
            be affected for each day
          </Typography>
        </Box> */}

        {/* <Modal
          open={isModalOpen}
          onClose={handleCancelClick}
          style={modalCenterStyle}
        > */}
        <Card style={CardStyle}>
          <CardContent style={{ padding: "10px 0" }}>
            <Typography align="center" style={{ marginBottom: "15px" }}>
              Al-Asr Juristic Method
            </Typography>

            <Card
              style={isHanafy ? selectedStyle : nonSelectionCardStyle}
              onClick={() => setSelectedMethod("Hanafi")}
              data-testid="asr-jurisdiction-hanafi"
            >
              <Typography style={isHanafy ? juristicTxStyle : undefined}>
                Hanafi
              </Typography>
              <img
                src={checkImg}
                alt="Check Img"
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  display: !isHanafy ? "none" : "block",
                }}
              />
            </Card>
            <Card
              style={!isHanafy ? selectedStyle : nonSelectionCardStyle}
              onClick={() => setSelectedMethod("Maliki/Shafi'i/Hanbali")}
              data-testid="asr-jurisdiction-shafi"
            >
              <Typography style={!isHanafy ? juristicTxStyle : undefined}>
                Maliki/Shafi'i/Hanbali
              </Typography>
              <img
                src={checkImg}
                alt="Check Img"
                style={{
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  display: isHanafy ? "none" : "block",
                }}
              />
            </Card>
          </CardContent>
          {/* <Box display="flex" justifyContent="space-around" mt={2}>
            <CustomBtn
              size={window.innerWidth >= 1024 ? "5vw" : "10vw"}
              eventHandler={handleCancelClick}
              label={"Cancel"}
              borderClr={"2px solid red"}
              TxColor={"red"}
              bgColor={"#ffff"}
              showIcon={false}
            />
            {isSaveButtonVisible && (
              <CustomBtn
                size={window.innerWidth >= 1024 ? "5vw" : "10vw"}
                eventHandler={handleSaveClick}
                label={"Save"}
                showIcon={false}
              />
            )}
          </Box> */}
        </Card>
        {/* </Modal> */}
        {isConModalOpen ? (
          <ConfirmationModal
            isModalOpen={isConModalOpen}
            setModalOpen={setConModalOpen}
            setParentModalOpen={setModalOpen}
            juristicMethod={selectedMethod}
          />
        ) : null}
      </div>
    </>
  );
};

const juristicTxStyle = {
  fontFamily: "Inter",
  color: "#1B8368",
  fontWeight: 600,
  fontSize: "12px",
  textAlign: "center" as "center",
};
const autoTxStyle = {
  fontFamily: "Inter",
  color: "#3D544E",
  fontWeight: 600,
  textAlign: "center" as "center",
  width: "90%",
  fontSize: "11px",
  marginBottom: "15px",
};
export const modalCenterStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const CardStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "space-between",
  // height: "300px",
  // padding: "15px 15px 30px 15px",
  width: window.innerWidth >= 1024 ? "40%" : "85%",
  borderRadius: "16px",
  boxShadow: "none",
};
const nonSelectionCardStyle = {
  padding: "10px",
  height: " 30px",
  display: "flex",
  alignItems: "center",
  margin: "10px 0",
  borderRadius: "16px",
  justifyContent: "space-between",
  boxShadow: "0px 0px 25px 0px #0000000D",
};
const selectedCard = {
  border: "2px solid green",
};

const juristicConainer = {
  display: "flex",
  justifyContent: "center",
};

export default JuristicMethod;
