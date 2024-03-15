import React, { useState, useRef, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
// import UpdateForEvents from "../../../../../components/EditProfileComponents/UpdateProfileImageComponent/UpdateForEvents";
import EventPageFormComponent from "../../../../../components/PagesComponents/EventPageComponents/EventPageFormCompoenents/EventPageFormComponent";
import EventProfileComponent from "../../../../../components/ProfileComponents/EventProfileComponent/EventProfileComponent";
import { handleSnackbar } from "../../../../../helpers/SnackbarHelper/SnackbarHelper";
import { FetchEventById } from "../../../../../redux/actions/EventActions/FetchingEventDetailsById";
import "./EventProfile.css";
import { fetchMasjidById } from "../../../../../redux/actions/MasjidActions/fetchMasjidById";
import { FetchRSVPByEventId } from "../../../../../redux/actions/EventActions/FetchingEventRsvp";
import { Pie } from "react-chartjs-2";
import PieChartComponent from "../../../../../helpers/PieChartComponent/PieChartComponent";
import PictureCarouselComponent from "../../../../../components/ProfileComponents/PictureCarouselComponent/PictureCarouselComponent";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { EventType, ResponseType } from "../../../../../redux/Types";
type EventRSVP = {
  _id: string;
  eventId: string;
  status: string;
};
const EventProfile = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [EventDetails, setEventDetails] = useState<EventType>();
  const [IsUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const [AdminMasjid, setAdminMasjid] = useState(false);
  const [mazjidId, setmazjidId] = useState();
  const [EventPhotos, setEventPhotos] = useState<{ url: string }[]>([]);
  const [CurrentEventDetails, setCurrentEventDetails] = useState<EventType>();

  const [EventsRSVP, setEventsRSVP] = useState<EventRSVP>();
  let EventId = id;
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  let rsvp = [];
  // const Mazjid = JSON.parse(localStorage.getItem("admin"));
  let Mazjid = useAppSelector((state) => state.admin);
  useEffect(() => {
    if (id) {
      const TimingResponse = dispatch(FetchEventById(id));
      TimingResponse.then((result) => {
        if (result.message === "Success") {
          console.log(result);
          setEventDetails(result.data);
          setEventPhotos(result.data.eventPhotos);
          setCurrentEventDetails(result.data);
          handleGetRSVP(result.data._id);
        } else {
          handleSnackbar(
            true,
            "error",
            `Failed To Fetch :${result.message}`,
            dispatch
          );
        }
      });
    }
  }, [id]);

  const handleGetRSVP = (id: string) => {
    const RSVPresponse = dispatch(FetchRSVPByEventId(id));
    RSVPresponse.then((result: any) => {
      let piedata = [result.data.data];

      const filteredData = Object.fromEntries(
        Object.entries(result.data.data).filter(([key, value]) => value !== 0)
      );

      let data = [];
      setEventsRSVP(result.data.data);
    });
  };

  useEffect(() => {
    let MazjidId = Mazjid.masjids[0];
    setmazjidId(MazjidId);
  }, [mazjidId]);

  useEffect(() => {
    if (Mazjid?.masjids[0]) {
      const response = dispatch(fetchMasjidById(Mazjid.masjids[0]));
      response.then((result) => {
        if (result.message == "Success") {
          setAdminMasjid(result.data);
        }
      });
    }
  }, [Mazjid?.masjids[0]]);

  const labelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
    fill: "#fff",
  };

  return (
    <div className="EventProfileContainer">
      <div className="EventProfileMainContainer">
        <div className="EventProfileTopContainer">
          <div className="EventProfileCancelBoxContainer">
            <MdCancel
              className="MasjidEventsCancelIcon"
              onClick={(e) => {
                if (IsUpdating) {
                  setIsUpdating(false);
                } else {
                  navigate("/feed");
                }
              }}
            />
          </div>
        </div>
        <div className="EventProfileBottomContaienr">
          {IsUpdating ? (
            <EventPageFormComponent
              ComponentPurpose={"Update"}
              EventDetails={EventDetails}
              setEventDetails={setEventDetails}
              setIsUpdating={setIsUpdating}
              setEventPhotos={setEventPhotos}
              EventPhotos={EventPhotos}
              // EventIds={EventId}
            />
          ) : (
            <>
              <div className="EventProfileInforContainer">
                {EventDetails && (
                  <EventProfileComponent
                    EventDetails={EventDetails}
                    EventPhotos={EventPhotos}
                    setIsUpdating={setIsUpdating}
                    CurrentEventDetails={CurrentEventDetails}
                    AdminMasjid={AdminMasjid}
                  />
                )}
              </div>

              <div className="EventProfilePictureMainContainer">
                <div className="SharingButton">
                  <div className="ShareOn">Share On</div>
                  <div className="SharingButtons">
                    <div className="FacebookSharingButton">
                      <FacebookShareButton
                        url={
                          EventPhotos?.length > 0
                            ? EventPhotos[0]?.url
                            : "www.connectMazjid.com"
                        }
                        //  description={"aiueo"}
                      >
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                    </div>
                    <div className="FacebookSharingButton">
                      <WhatsappShareButton
                        url={
                          EventPhotos?.length > 0
                            ? EventPhotos[0]?.url
                            : "www.connectMazjid.com"
                        }
                        title={`${EventDetails?.eventName} will be happening at ${AdminMasjidState.masjidName}`}
                      >
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                    </div>
                    <div className="FacebookSharingButton">
                      <TwitterShareButton
                        url={
                          EventPhotos?.length > 0
                            ? EventPhotos[0]?.url
                            : "www.connectMazjid.com"
                        }
                        title={`${EventDetails?.eventName} will be happening at ${AdminMasjidState.masjidName}`}
                      >
                        <TwitterIcon size={32} round={true} />
                      </TwitterShareButton>
                    </div>
                  </div>
                </div>
                <div className="EventProfilePictureContainer">
                  <PictureCarouselComponent
                    ParentComponentType={"Event"}
                    Event={EventDetails}
                    EventPhotos={EventPhotos}
                    // MazjidDetails={AdminMasjidState}
                  />
                </div>

                <div className="EvetRSVP">
                  {EventsRSVP && (
                    <>
                      <PieChartComponent EventRSVP={EventsRSVP} />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventProfile;
