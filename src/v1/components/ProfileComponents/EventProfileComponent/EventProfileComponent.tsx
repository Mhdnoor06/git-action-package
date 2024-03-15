import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import "./EventProfileComponent.css";
import { resources } from "../../../resources/resources";
import moment from "moment";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@material-ui/core";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CancelEvent } from "../../../redux/actions/EventActions/CancelEventAction";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import CalenderLogo from "../../../photos/CalenderLogo.png";
import ReadMoreReadLess from "../../ArchitectureCompoenents/ReadMoreComponent/ReadMoreReadLess";
import CANCEL from "../../../photos/CANCEL.png";
import { useNavigate } from "react-router-dom";
import { EventCompletionAction } from "../../../redux/actions/EventActions/EventCompletionAction";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { EventType } from "../../../redux/Types";

type propsType = {
  EventDetails: EventType;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  EventPhotos: { url: string }[];
  CurrentEventDetails: EventType | undefined;
  AdminMasjid: any;
};
const EventProfileComponent = ({
  EventDetails,
  setIsUpdating,
  EventPhotos,
  CurrentEventDetails,
  AdminMasjid,
}: propsType) => {
  const [CancelModalOpen, setCancelModalOpen] = React.useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [Popup, setPopup] = useState(false);
  const language = resources["en"];
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);

  let CompletionEvent = useAppSelector((state) => state.EventCompletion);

  const handleCancelEvent = () => {
    const response = dispatch(
      CancelEvent(EventDetails?.masjid?._id, EventDetails?._id)
    );
    response.then(function (result) {
      if (result.message === "Event updated successfully") {
        handleSnackbar(
          true,
          "success",
          "Cancelled Event Successfully",
          dispatch
        );
        navigate(`/events`);
        handleCanelModalOpen();
      } else {
        handleSnackbar(true, "error", "Failed to Cancel Event", dispatch);
        setCancelModalOpen(false);
      }
    });
  };

  const handleCompletionEvent = () => {
    const res = dispatch(EventCompletionAction(false));
  };
  const handleCancelModal = () => {
    setCancelModalOpen(false);
  };

  const handleCanelModalOpen = () => {
    setCancelModalOpen(true);
  };

  return (
    <>
      <div className="EventProfileComponentContainer">
        <div className="EventProfileEventNameSection">
          <span className="EventProfileNameWord">
            {EventDetails?.eventName}
          </span>
        </div>
        <Dialog
          open={CancelModalOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Are you sure you want to Cancel the  Event ?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCancelEvent} variant="outlined">
              {" "}
              {IsLoading ? (
                <CircularProgress size="15px" />
              ) : (
                <span> Yes </span>
              )}{" "}
            </Button>
            <Button
              onClick={handleCancelModal}
              variant="outlined"
              disabled={IsLoading}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <div className="EventProfileInformationSection">
          <div className="EventProfileInformationContainersMain">
            <span className="EventProfileInfomationKey">
              {language.EVENT_PROFILE_CARD.MASJID_NAME} :{" "}
            </span>
            <span className="EventProfileInfomationValueName">
              {" "}
              {AdminMasjidState?.masjidName}
            </span>
          </div>
          <div className="EventProfileInformationContainersDesc">
            <span className="EventProfileInfomationKey">
              {language.EVENT_PROFILE_CARD.EVENT_DESCRIPTION} :{" "}
            </span>

            <span className="EventProfileInfomationValueDesc">
              {EventDetails?.description?.length < 200 ? (
                <>{EventDetails?.description}</>
              ) : (
                <>
                  <ReadMoreReadLess Limit={200}>
                    {EventDetails?.description}
                  </ReadMoreReadLess>
                </>
              )}
            </span>
          </div>
          <div className="EventProfileInformationContainers">
            <span className="EventProfileInfomationKey">
              {language.EVENT_PROFILE_CARD.EVENT_ADDRESS} :{" "}
            </span>
            <span className="EventProfileInfomationValue">
              {" "}
              {EventDetails?.address}{" "}
            </span>
          </div>

          <div className="EventProfileTimingSection">
            <span className="EventProfileTimingSectionTitle">
              {language.EVENT_PROFILE_CARD.EVENT_TIMING_TITLE}
            </span>
            <div className="EventProfileTimingContainers">
              <img src={CalenderLogo} className="CalenderLogo" />
              <span className="EventProfileTimingValueDate">
                {EventDetails?.metaData?.startDate != null &&
                  moment(EventDetails?.metaData?.startDate).format(
                    "DD/MM/YYYY"
                  )}
                {" | "}
              </span>
              <span className="EventProfileTimingValueStart">
                {" "}
                {EventDetails?.timings?.length > 0 &&
                  moment(EventDetails?.timings[0]?.startTime * 1000).format(
                    "hh:mm A"
                  )}
                {" to"}
              </span>

              <span className="EventProfileTimingValueEnd">
                {" "}
                {EventDetails?.timings?.length > 0 &&
                  moment(EventDetails?.timings[0]?.endTime * 1000).format(
                    "hh:mm A"
                  )}
              </span>
            </div>

            {/* <div className="EventProfileTimingContainers">
              <img src={CalenderLogo} className="CalenderLogo" />
              <span className="EventProfileTimingValueDate">
                {EventDetails?.metaData?.endDate != null &&
                  moment(EventDetails?.metaData?.endDate).format("DD/MM/YYYY")}
                {" | "}
              </span>
              <span className="EventProfileTimingValueStart">
                {" "}
                {EventDetails?.timings?.length > 0 &&
                  moment(EventDetails?.timings[0]?.startTime * 1000).format(
                    "hh:mm A"
                  )}
                {" to"}
              </span>

              <span className="EventProfileTimingValueEnd">
                {" "}
                {EventDetails?.timings?.length > 0 &&
                  moment(EventDetails?.timings[0]?.endTime * 1000).format(
                    "hh:mm A"
                  )}
              </span>
            </div> */}
          </div>
          <div className="EventProfileButtonSection">
            {CompletionEvent && (
              <>
                <button className="DoneEvent">
                  <span
                    className="ButtonTitleEvent"
                    onClick={(e) => {
                      handleCompletionEvent();
                      setPopup(!Popup);
                      // navigate('/events')
                    }}
                  >
                    Done
                  </span>
                </button>
              </>
            )}
            <button className="AddGuestToEvent">
              <span
                className="ButtonTitleEvent"
                onClick={(e) => {
                  setIsUpdating(true);
                }}
              >
                Update Event
              </span>
            </button>
            {!EventDetails?.isCancelled && (
              <button className="CancelEvent" onClick={handleCanelModalOpen}>
                <span
                  className="ButtonTitleEvent"
                  // onClick={(e) => {
                  //   navigate("/")
                  // }}
                >
                  Cancel Event
                </span>
              </button>
            )}
          </div>
        </div>

        {Popup ? (
          <div className="PopupShare">
            <div className="OutsidePopup">
              <div className="InsidePopup">
                <div className="Shareclose">
                  <span className="Shareonto">Share On</span>
                  <div className="SharingButtons">
                    <div className="FacebookSharingButton">
                      <FacebookShareButton
                        url={
                          EventPhotos?.length > 0
                            ? EventPhotos[0]?.url
                            : "www.connectMazjid.com"
                        }
                        // description={"aiueo"}
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
                        title={`${EventDetails.eventName} will be happening at ${AdminMasjidState.masjidName}`}
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
                        title={`${EventDetails.eventName} will be happening at ${AdminMasjidState.masjidName}`}
                      >
                        <TwitterIcon size={32} round={true} />
                      </TwitterShareButton>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    setPopup(false);
                    navigate("/events");
                  }}
                  className="Buttonclose"
                >
                  <img src={CANCEL} className="PopupCancelMain" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EventProfileComponent;
