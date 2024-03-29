import React, { useEffect, useState } from "react";
import "./Announcement.css";
import CustomBtn from "../Shared/CustomBtn";
import AnnouncementIcon from "../../../photos/Newuiphotos/nav bar/navicons/navactiveicons/Announcementactive.svg";
import NoAnnouncment from "../../../photos/Newuiphotos/Icons/noAnnouncemetn.svg";
import AnnouncementForm from "./AnnouncementForm";
import AnnouncementCard from "./AnnouncementCard";
import { useAppDispatch } from "../../../redux/hooks";
import { FetchingAnnouncementNotificationByDate } from "../../../redux/actions/AnnouncementActions/FetchingAnnouncementByDateAction";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { dateReverter } from "../../../helpers/HelperFunction";
import moment from "moment";
import { CircularProgress } from "@mui/material";

type announcement = {
  id: string | undefined;
  title: string | undefined;
  body: string | undefined;
  createdAt: string | undefined;
};
function Announcement() {
  const [announcementForm, setAnnouncementForm] = useState(false);
  const [announcementCardview, setAnnouncementCardView] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<announcement>();
  const dispatch = useAppDispatch();
  const [Announcements, setAnnouncements] = useState([]);
  const [fetchAnnouncementData, setFetchAnnouncementData] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  let tZone = localStorage.getItem("MasjidtZone");
  useEffect(() => {
    const announcements = dispatch(FetchingAnnouncementNotificationByDate());
    announcements.then((result: any) => {
      if (result.data.message !== "Success") {
        handleSnackbar(
          true,
          "error",
          `Failed To Fetch:Something Went Wrong`,
          dispatch
        );
      } else {
        setAnnouncements(result.data.data);
      }
    });
  }, [fetchAnnouncementData]);

  const handleAnnouncement = () => {
    setAnnouncementForm((prev) => !prev);
  };

  return (
    <>
      {announcementCardview ? (
        <AnnouncementCard
          handleAnnouncement={() => setAnnouncementCardView((prev) => !prev)}
          announcementData={selectedAnnouncement}
        />
      ) : (
        <div>
          {!announcementForm ? (
            <div className="announcebody">
              <div
                className="announcement"
                style={
                  announcementForm ? {} : { justifyContent: "center", gap: "0" }
                }
              >
                {/* {announcementForm && (
                  <BackButton handleBackBtn={handleAnnouncement} />
                )} */}
                <h3 className="page-title" style={{ color: "#3D5347" }}>
                  Announcements
                </h3>
                <p></p>
              </div>
              <CustomBtn
                label="Make Announcement"
                icon={AnnouncementIcon}
                size="16vw"
                eventHandler={handleAnnouncement}
              />
              {Announcements.length > 0 ? (
                <div className="announcementCards">
                  {Announcements.map((item, index) => (
                    <div
                      className="announceCards"
                      style={{ width: "100%" }}
                      key={index}
                    >
                      <div
                        className="announcecard"
                        onClick={() => {
                          setAnnouncementCardView((prev) => !prev);
                          setSelectedAnnouncement(item);
                        }}
                      >
                        <span>
                          <h4 style={{ color: "#3D5347" }}>{item.title}</h4>
                          <p>
                            {moment(
                              dateReverter(item.createdAt, tZone),
                              "YYYY-MM-DD"
                            ).format("D MMM yyyy")}
                          </p>
                        </span>
                        <p className="announcement-body">
                          {item.body.length > 100
                            ? item.body.substring(0, 100) + "....."
                            : item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // {isInitialLoaded && !Announcements.length && (
                //   <div className="loader">
                //     {" "}
                //     <CircularProgress color="success" className="loader" />
                //   </div>
                // )}
                <div className="noannouncement">
                  <img src={NoAnnouncment} alt="" />
                  <p>No Annoucements Found</p>
                </div>
              )}
            </div>
          ) : (
            <AnnouncementForm
              handleAnnouncement={handleAnnouncement}
              setFetchAnnouncementData={setFetchAnnouncementData}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Announcement;
