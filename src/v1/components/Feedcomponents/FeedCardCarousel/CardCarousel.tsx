import React, { useEffect, useState } from "react";
import "./CardCarousel.css";
import { Link, useNavigate } from "react-router-dom";
import { resources } from "../../../resources/resources";
import image from "../../../photos/addevent.png";
import moment from "moment";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { FetchEventByMasjidId } from "../../../redux/actions/EventActions/fetchEventByMasjidId";
import NoImgFound from "../../../photos/NoImgFound.png";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import NoAnnouncementFound from "../../../photos/NoAnnouncementFound.png";
import NoEventAvaliable from "../../../photos/NoEventAvaliable.png";
import { FetchingAnnouncementNotificationByDate } from "../../../redux/actions/AnnouncementActions/FetchingAnnouncementByDateAction";
import { useAppThunkDispatch } from "../../../redux/hooks";
import {
  AddingEvent,
  AdminInterFace,
  AnnouncementType,
  Masjid,
  ResponseType,
} from "../../../redux/Types";

const EventsCarousel = ({ carouselName }: { carouselName: string }) => {
  // const latestAdminEvents = useSelector((state) => state.latestAdminEvents);
  const [latestAdminEvents, setlatestAdminEvents] = useState([]);
  // const latestAnnouncements = useSelector((state) => state.latestAnnouncements);
  const language = resources["en"];
  const [mazjidId, setmazjidId] = useState("");
  const dispatch = useAppThunkDispatch();
  const [AdminMasjid, setAdminMasjid] = useState<Masjid>();
  const [latestAnnouncements, setlatestAnnouncements] = useState([]);
  useEffect(() => {
    const adminString = localStorage.getItem("admin");
    const admin: AdminInterFace | null = adminString
      ? JSON.parse(adminString)
      : null;

    let MazjidId = admin?.masjids[0];

    setmazjidId(MazjidId);
  }, [mazjidId]);
  useEffect(() => {
  
    if (mazjidId) {
      const response = dispatch(FetchEventByMasjidId(mazjidId));
      response.then((result: any) => {
        if (!result?.timings === null) {
          handleSnackbar(
            true,
            "error",
            `Failed To Fetch :${result?.message}`,
            dispatch
          );
        } else {
          setlatestAdminEvents(result?.data?.data);
        }
      });
    }
  }, [mazjidId]);

  useEffect(() => {
    if (mazjidId) {
      const response = dispatch(fetchMasjidById(mazjidId));
      response.then((result: ResponseType) => {
        if (result.message === "Success") {
          setAdminMasjid(result.data);
        }
      });
    }
  }, [mazjidId]);

  useEffect(() => {
    const announcements = dispatch(FetchingAnnouncementNotificationByDate());
    announcements.then((result: any) => {
      console.log(result)
      if (!result.success) {
        handleSnackbar(
          true,
          "error",
          `Failed To Fetch:Something Went Wrong`,
          dispatch
        );
      } else {
        setlatestAnnouncements(result.data.data);
      }
    });
  }, [mazjidId]);

  return (
    <>
      <div className="FeedContainer">
        <div className="FeedTitle">
          <span className="TitleString">
            {carouselName === "Event"
              ? language.EVENTS_CAROUSEL.EVENTS_TITLE
              : language.ANNOUNCEMENTS_CAROUSEL.ANNOUNCEMENT_TITLE}
          </span>
          <div className="FeedIcon">
            <img src={image} alt="Profile Icon" className="feedTopImage" />
            {/* <Link>
            </Link> */}
          </div>
        </div>
        <div className="FeedBottom">
          <div className="Feed">
            {carouselName === "Event" ? (
              latestAdminEvents?.length > 0 ? (
                latestAdminEvents?.map((item: AddingEvent) => {
                  let timing = item.timings;
                  let startDate = item.metaData.startDate;
                  let DisplayDate = moment(startDate).format("DD-MM-YYYY");
                  return (
                    <>
                      <div className="CarouselCard">
                        {timing.map((item) => {
                          return (
                            <>
                              <div className="LeftSideCard">
                                {AdminMasjid?.masjidPhotos ? (
                                  <>
                                    <span className="MazjidPhoto">
                                      <img
                                        src={AdminMasjid?.masjidPhotos[0]?.url}
                                        alt="masjidPhotos"
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="MazjidPhoto">
                                      <img src={NoImgFound} alt="MazjidPhoto" />
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          );
                        })}
                        <div className="RightSideCard">
                          <span className="CardTitle">
                            {item.eventName.substr(0, 10)}..
                          </span>
                          <span className="CardTitleMazjid">
                            Date : {DisplayDate}
                          </span>
                        </div>
                        {timing.map((item) => {
                          let startDate = item.startTime;
                          let startTime = moment(startDate * 1000).format(
                            "hh:mm A"
                          );
                          let endDate = item.endTime;
                          let endTime = moment(endDate).format("h:mm a");
                          return (
                            <>
                              <div className="LefyConTainer">
                                <span className="TimingsViewSpan">
                                  Timings : {startTime}-{endTime}
                                </span>
                                <span className="MazjidName">
                                  {AdminMasjid?.masjidName}
                                </span>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })
              ) : (
                <img
                  src={NoEventAvaliable}
                  className="NoAnnouncementFound"
                  alt="NoAnnouncementFound"
                />
              )
            ) : (
              <>
                {latestAnnouncements?.length > 0 ? (
                  latestAnnouncements?.map((item: AnnouncementType) => {
                    return (
                      <>
                        <div className="CarouselCard">
                          <div className="AnnocementMain">
                            <span className="CardTitle">{item.title}</span>
                            <span className="CardBody">{item.body}</span>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <img
                    src={NoAnnouncementFound}
                    className="NoAnnouncementFound"
                    alt="NoAnnouncementFound"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="FeedViewAllEvents">
          {carouselName === "Event" ? (
            <>
              <Link
                to="/events"
                style={{ textDecoration: "none", color: "white" }}
              >
                <span className="ViewButton">View all</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/announcements"
                style={{ textDecoration: "none", color: "white" }}
              >
                <span className="ViewButton">View all</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsCarousel;
