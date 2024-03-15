import React, { useState, useEffect, useRef } from "react";
import "./MasjidAnnouncement.css";
// import TextField from "@mui/material/TextField";
// import { CircularProgress } from "@material-ui/core";
// import { TriggeringAnnouncement } from "../../../../../redux/actions/AnnouncementActions/TriggeringAnnouncementAction";
// import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import AnnouncementFormComponent from "../../../../../components/PagesComponents/AnnoucementPageComponent/AnnouncementFormComponent";
import AnnouncementHistoryComponent from "../../../../../components/PagesComponents/AnnoucementPageComponent/AnnouncementHistoryComponent";

const MasjidAnnouncementPage = () => {
  const [ViewHistory, setViewHistory] = useState(false);

  return (
    <>
      <div className="MasjidAnnouceContainer">
        <div className="MasjidAnnounceContainer">
          <div className="MasjidAnnounceTopContainer">
            <div className="MasjidAnnounceTopMainContainer"></div>
            <div className="MasjidAnnounceTopRightContainer"></div>
          </div>
          <div className="MasjidAnnouceBottomContainer">
            {ViewHistory ? (
              <AnnouncementHistoryComponent />
            ) : (
              <AnnouncementFormComponent />
            )}
          </div>
          <div className="MasjidAnnouncementHistoryContainer">
            {!ViewHistory ? (
              <button
                className="MasjdAnnouncementHistoryBtn"
                onClick={(e) => setViewHistory(true)}
              >
                History
              </button>
            ) : (
              <MdCancel
                className="EditAnnounceCancelIcon"
                onClick={(e) => {
                  setViewHistory(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MasjidAnnouncementPage;
