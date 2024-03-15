import React, { FC, useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CustomBtn from "../Shared/CustomBtn";
interface dropdownProps {
  statusHandler: (val: string) => void;
  timingStatus: string;
}
const PrayerTypeDropdown: FC<dropdownProps> = ({
  statusHandler,
  timingStatus,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonText, setButtonText] = useState(
    timingStatus === "manual" ? "Manual" : "Autofill"
  );
  useEffect(() => {
    setButtonText(timingStatus === "manual" ? "Manual" : "Autofill");
  }, [timingStatus]);

  const handleToggle = (tx = "") => {
    setIsExpanded((prevExpanded) => !prevExpanded);
    //if we click after opening dropdown then there will be tx
    // if click on initial drop button there will be no tx
    const incomingTx = tx ? tx : buttonText;
    setButtonText(incomingTx);

    const valueToKey = incomingTx === "Manual" ? "manual" : "solar";
    statusHandler(valueToKey);
  };
  const contentTx = buttonText === "Autofill" ? "Manual" : "Autofill";
  return (
    <div className="prayer-type-dropdown-container">
      <Card
        style={{
          height: isExpanded ? "60px" : "33px",
          position: "absolute",
          top: "-16px",
          // width: "126px",
          borderRadius: "17px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "height 0.3s",
          overflow: "hidden",
        }}
      >
        <CustomBtn
          label={buttonText}
          size={"3vw"}
          showIcon={false}
          eventHandler={() => handleToggle()}
        >
          {isExpanded ? (
            <ExpandLessIcon style={{ marginLeft: "2vw" }} />
          ) : (
            <ExpandMoreIcon style={{ marginLeft: "2vw" }} />
          )}
        </CustomBtn>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
          }}
        >
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggle(contentTx)}
          >
            {contentTx}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrayerTypeDropdown;
