import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { WarningAmber, Cancel } from "@mui/icons-material";
import CustomBtn from "../../Shared/CustomBtn";
import TermAndConditionsText from "../../Shared/TermAndConditionsText";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import TCwarning from "../../../../photos/Newuiphotos/Icons/T&Cwarning.svg";

interface DisclaimerModalProps {
  showDisclaimer: boolean;
  handleDisclaimerStatus: (val: boolean) => void;
  setDisclaimer: Dispatch<SetStateAction<boolean>>;
}

const EventDisclaimer: React.FC<DisclaimerModalProps> = ({
  setDisclaimer,
  showDisclaimer,
  handleDisclaimerStatus,
}) => {
  const containerStyle = {
    // backgroundImage: `repeating-linear-gradient(0deg, #333333, #333333 17px, transparent 17px, transparent 27px, #333333 27px),
    //                   repeating-linear-gradient(90deg, #333333, #333333 17px, transparent 17px, transparent 27px, #333333 27px),
    //                   repeating-linear-gradient(180deg, #333333, #333333 17px, transparent 17px, transparent 27px, #333333 27px),
    //                   repeating-linear-gradient(270deg, #333333, #333333 17px, transparent 17px, transparent 27px, #333333 27px)`,
    // backgroundSize: `2px 100%, 100% 2px, 2px 100%, 100% 2px`,
    // backgroundPosition: `0 0, 0 0, 100% 0, 0 100%`,
    // backgroundRepeat: `no-repeat`,
  };
  const [showTerm, setShowTerm] = useState(false);
  const handleDisclaimer = (sta: boolean) => {
    if (!sta) {
      setDisclaimer(false);
      handleDisclaimerStatus(false);
    } else {
      setDisclaimer(true);
      handleDisclaimerStatus(true);
    }
  };

  const handleToggle = () => {
    setShowTerm(!showTerm);
  };

  const scrollStyle = `
  .condition-text{
   
     border-radius :20px
  }
    .condition-text::-webkit-scrollbar {
      width: 4px !important;
 
    }
    
    .condition-text::-webkit-scrollbar-thumb {
      background: #00A860; 
     
    }
    .condition-text::-webkit-scrollbar-track {
      background: #f1f1f1;
      
    } 
    .term-condition>div>div{
      border-radius: 30px;
    }     
  `;
  return (
    <>
      {/* <style>{scrollStyle}</style> */}
      <Modal open={showDisclaimer} onClose={() => handleDisclaimer(false)}>
        <Card
          className="condition-text"
          sx={{
            maxWidth: 400,
            width: "85%",
            margin: "auto",
            maxHeight: "80vh",
            // overflowY: "scroll",

            mt: 8,
            mb: 10,
            p: 2,

            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <div style={containerStyle}>
            <CardContent sx={{ padding: "0px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "0px",
                }}
              >
                {/* <WarningAmber sx={{ color: "red", fontSize: 30 }} /> */}
                <img
                  src={TCwarning}
                  alt=""
                  style={{ width: "60px", height: "60px" }}
                />
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ ml: 1, color: "#FF7272" }}
                >
                  Warning
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#3D544E",
                  }}
                >
                  "By posting, You take full responsibility for the content of
                  your post and agree to comply with ConnectMazjid's terms and
                  conditions and privacy policy. ConnectMazjid reserves the
                  right to remove any inappropriate content."
                </Typography>
                <div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "#1D785A",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    Term & Conditions
                    <IconButton onClick={handleToggle}>
                      {showTerm ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </p>
                  <Collapse in={showTerm}>
                    <CardContent
                      sx={{
                        overflowY: "auto",
                        maxHeight: "20vh",
                        textAlign: "justify",
                        padding: "16px",
                      }}
                    >
                      <TermAndConditionsText />
                    </CardContent>
                  </Collapse>
                </div>
              </div>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "space-around", paddingBottom: "15px" }}
            >
              <CustomBtn
                eventHandler={() => handleDisclaimer(false)}
                label={"No"}
                size={"60px"}
                bgColor="#9F9E9E"
                showIcon={false}
              />
              <CustomBtn
                size={"60px"}
                eventHandler={() => handleDisclaimer(true)}
                label={"Yes"}
                showIcon={false}
              />
            </CardActions>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default EventDisclaimer;
