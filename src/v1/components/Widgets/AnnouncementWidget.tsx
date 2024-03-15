import React, { useState } from "react";
import announcementIcon from "./Icons/announcement.svg";
import { Backdrop, Box, Paper, Typography } from "@mui/material";
import noannouncement from "../../photos/Newuiphotos/BG/noannouncement.svg";
import "./Announcement.css";
import styles from "./Widgets.module.css";
import CloseIcon from "@mui/icons-material/Close";

interface AnnouncementWidgetProps {
  widgetData: any;
}

const AnnouncementWidget: React.FC<AnnouncementWidgetProps> = ({
  widgetData,
}) => {
  console.log(widgetData);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleCloseCard = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div style={{ height: "100%" }}>
      {widgetData.length != 0 ? (
        <div
          className={`${styles["custom-scrollbar"]} announcementContainer`}
          style={{
            position: "relative",
            height: "100%",
            overflow: "auto",
            margin: "10px 0",
          }}
        >
          {widgetData.map((announcement, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                border: "0.1px solid #047756",
                borderRadius: "10px",
                margin: "10px",
                gap: "10px",
                justifyContent: "center",
                padding: "10px",
                boxShadow: "2px 2px 5px 0px rgba(0, 0, 0, 0.2 )",
              }}
              onClick={() => handleAnnouncementClick(announcement)}
            >
              <Box sx={{ flex: 0 }}>
                <img src={announcementIcon} alt="" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  fontSize={"15px"}
                  fontWeight={"700"}
                  gutterBottom
                >
                  {announcement.title}
                </Typography>
                <Typography variant="body1" fontSize={"12px"}>
                  {announcement.body.length > 100
                    ? `${announcement.body.substring(0, 100)}...`
                    : announcement.body}
                </Typography>
              </Box>
            </Paper>
          ))}
          {selectedAnnouncement && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                // display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2, // Ensure this is above your other content
              }}
            >
              <Paper
                elevation={5}
                className="larger-card"
                style={{
                  padding: "20px",
                  border: "0.1px solid #047756",
                  borderRadius: "10px",
                  width: "82%",
                  margin: "0 auto", // This centers the card horizontally
                  position: "relative", // Adjust if necessary for your layout
                  zIndex: 3, // Ensure this is above the backdrop
                }}
                onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the modal if you implement close on backdrop click
              >
                <div onClick={handleCloseCard} style={{ float: "right" }}>
                  <CloseIcon />
                </div>
                <Box>
                  <Typography
                    variant="h6"
                    fontSize={"15px"}
                    fontWeight={"700"}
                    textAlign={"center"}
                    gutterBottom
                  >
                    {selectedAnnouncement.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={"12px"}
                    textAlign={"justify"}
                  >
                    {selectedAnnouncement.body}
                  </Typography>
                </Box>
              </Paper>
            </div>
          )}
        </div>
      ) : (
        <div className="noannouncement">
          <div className="notavailable">
            <img src={noannouncement} alt="" />
            <p style={{ textAlign: "center" }}>"There are no announcement"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementWidget;
