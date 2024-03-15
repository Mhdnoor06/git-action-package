import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { TriggeringAnnouncement } from "../../../redux/actions/AnnouncementActions/TriggeringAnnouncementAction";
import { CircularProgress } from "@material-ui/core";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import "./AnnoucementFormComponent.css";
import AnnounceLogo from "../../../../v1/photos/Admin portal orange icon/Frame.png";
import AnnouncePopup from "../../../../v1/photos/AnnouncePopup.png";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { ResponseType } from "../../../redux/Types";

const AnnouncementFormComponent = () => {
  let AnnouncementTitleRef = useRef<HTMLInputElement>(null);
  let AnnouncementBodyRef = useRef<HTMLInputElement>(null);
  const [AnnouncementTitleError, setAnnouncementTitleError] = useState(false);
  const [AnnouncementBodyError, setAnnouncementBodyError] = useState(false);
  const [isTriggering, setisTriggering] = useState(false);
  const [popupon, setPopupOn] = useState(false);
  const dispatch = useAppThunkDispatch();
  const [closePopup, setclosePopup] = useState(false);
  // let AdminMasjid = useSelector((state) => state.AdminMasjid[0]);

  const handleTriggerNotification = () => {
    // e.preventDefault();
    setisTriggering(true);
    setTimeout(() => {
      if (!AnnouncementTitleRef.current?.value) {
        setAnnouncementTitleError(true);
        setPopupOn(false);
      } else if (AnnouncementTitleRef.current?.value) {
        setAnnouncementTitleError(false);
        setPopupOn(false);
      }

      if (!AnnouncementBodyRef.current?.value) {
        setAnnouncementBodyError(true);
      } else if (AnnouncementBodyRef.current?.value) {
        setAnnouncementBodyError(false);
      }

      if (
        AnnouncementTitleRef.current?.value &&
        AnnouncementBodyRef.current?.value
      ) {
        let uploadData = {
          title: AnnouncementTitleRef.current?.value,
          body: AnnouncementBodyRef.current.value,
        };

        const data = dispatch(TriggeringAnnouncement(uploadData));

        data.then(function (result: ResponseType) {
          if (result.message === "Notification sent successfully") {
            setclosePopup(true);
            setisTriggering(false);
            setPopupOn(false);
            handleSnackbar(
              true,
              "success",
              `Announcement Sent SuccessFully`,
              dispatch
            );
            setisTriggering(false);
          } else {
            handleSnackbar(
              true,
              "error",
              `Failed to Send the Announcement : ${result.message}`,
              dispatch
            );
            setisTriggering(false);
          }
        });
      }
    }, 2000);
  };

  const setPopup = () => {
    // e.preventDefault();
    setPopupOn(true);
    setisTriggering(false);
  };

  return (
    <>
      <div className="MazjidAnnoucementMainContainer">
        <div className="MasjidAnnounceImageContainer">
          <img src={AnnounceLogo} alt="" className="ANnounceLogoTop" />
        </div>
        <span className="TopDescription">
          Fill in the Title and Body of the annoucement and press send. People
          will recieve a notification on their phones
        </span>
        <TextField
          autoFocus
          margin="dense"
          className="TextFieldsAnnoucement"
          autoComplete="Off"
          error={AnnouncementTitleError}
          helperText={AnnouncementTitleError ? "Please Fill The title" : " "}
          label="Title"
          onChange={(e) => {
            if (AnnouncementTitleError) {
              if (!AnnouncementTitleRef.current?.value) {
                setAnnouncementTitleError(true);
              } else if (AnnouncementTitleRef.current?.value) {
                setAnnouncementTitleError(false);
              }
            }
          }}
          size="small"
          sx={{
            "& .MuiTextField-root": {
              width: 100,
            },
            "& .MuiInputLabel-root": {
              fontSize: 14,
              fontFamily: "lato",
              fontWeight: 500,
            },
            "& .MuiInputBase-colorPrimary": {
              color: "green",
            },
          }}
          inputRef={AnnouncementTitleRef}
          type="text"
          fullWidth
          variant="outlined"
          inputProps={{ style: { color: "green" } }}
        />

        <TextField
          id="outlined-required"
          error={AnnouncementBodyError}
          helperText={
            AnnouncementBodyError
              ? "Please Fill what you want to Announce"
              : " "
          }
          variant="outlined"
          className="TextFieldsAnnoucement"
          autoComplete="Off"
          onChange={(e) => {
            if (AnnouncementBodyError) {
              if (!AnnouncementBodyRef.current?.value) {
                setAnnouncementBodyError(true);
              } else if (AnnouncementBodyRef.current?.value) {
                setAnnouncementBodyError(false);
              }
            }
          }}
          label="Announcement Body"
          fullWidth
          inputRef={AnnouncementBodyRef}
          type="email"
          sx={{
            "& .MuiTextField-root": {
              width: 100,
            },
            "& .MuiInputLabel-root": {
              fontSize: 14,
              fontFamily: "lato",
              fontWeight: 500,
            },
            "& .MuiInputBase-colorPrimary": {
              color: "green",
            },
          }}
          multiline
          rows={13}
        />
        <button className="ButtonToggle" onClick={setPopup}>
          Triggering Announcement
        </button>
      </div>
      {popupon ? (
        <>
          <div className="CenterTheBody">
            <div className="BackgroundOfContainer">
              <div className="PopupBoddy">
                <div className="PopupImgForAnnounce">
                  <img
                    src={AnnouncePopup}
                    className="InsidePopupImgForAnnounce"
                  />
                </div>
                <span className="DescrpitionForTrigger">
                  "By posting, you take full responsibility for the content of
                  your post and agree to comply with ConnectMazjid's terms and
                  conditions and privacy policy. ConnectMazjid reserves the
                  right to remove any inappropriate content."
                </span>
                <div className="ButtonAdjusment">
                  <button className="Cancel" onClick={(e) => setPopupOn(false)}>
                    No
                  </button>
                  <button
                    className="YesButton"
                    onClick={handleTriggerNotification}
                  >
                    <span className="text">
                      {isTriggering ? (
                        <CircularProgress size="20px" color="inherit" />
                      ) : (
                        "Yes"
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {closePopup ? (
        <>
          <div className="CenterTheBody">
            <div className="BackgroundOfContainerClose">
              <div className="PopupBoddyForClose">
                <div className="PopupImgForAnnounceClose">
                  <img
                    src={AnnounceLogo}
                    className="InsidePopupImgForAnnounceClose"
                  />
                </div>
                <span className="DescrpitionForTriggerClose">
                  Annoucement Saved Successfully
                </span>

                <span className="closeForTrigger">
                  <button
                    onClick={(e) => {
                      setclosePopup(false);
                    }}
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AnnouncementFormComponent;
