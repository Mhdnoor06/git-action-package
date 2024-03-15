import React, { useState } from "react";
import "./Announcement.css";
import CustomBtn from "../Shared/CustomBtn";
import Addannouncemetn from "../../../photos/Newuiphotos/nav bar/navicons/navactiveicons/Announcementactive.svg";
import editIcon from "../../../photos/Newuiphotos/Icons/Edit.svg";
import MoreBtn from "../Shared/MoreBtn";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { TriggeringAnnouncement } from "../../../redux/actions/AnnouncementActions/TriggeringAnnouncementAction";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import Warning from "../../../photos/Newuiphotos/Icons/warning.svg";
import { AdminInterFace } from "../../../redux/Types";
import AnnouncementCard from "./AnnouncementCard";
import BackButton from "../Shared/BackButton";

function AnnouncementForm({ handleAnnouncement, setFetchAnnouncementData }) {
  const [addAmmouncement, setAddAnnouncement] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isTriggering, setisTriggering] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [announcementView, setAnnouncementView] = useState(false);

  const dispatch = useAppThunkDispatch();

  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;
  console.log(admin?.masjids[0]);

  const handleTriggerNotification = () => {
    // e.preventDefault();
    setisTriggering(true);
    setTimeout(() => {
      //   if (!AnnouncementTitleRef.current?.value) {
      //     setAnnouncementTitleError(true);
      //     setPopupOn(false);
      //   } else if (AnnouncementTitleRef.current?.value) {
      //     setAnnouncementTitleError(false);
      //     setPopupOn(false);
      //   }

      //   if (!AnnouncementBodyRef.current?.value) {
      //     setAnnouncementBodyError(true);
      //   } else if (AnnouncementBodyRef.current?.value) {
      //     setAnnouncementBodyError(false);
      //   }

      if (title.length > 0 && description.length > 0) {
        let uploadData = {
          title: title,
          body: description,
          masjidIds: [admin?.masjids[0]],
          expiresAt: "",
          priorityType: "normal",
        };
        setAnnouncementView(true);
        const data = dispatch(TriggeringAnnouncement(uploadData));

        data.then(function (result: ResponseType) {
          if (result.message === "Notification sent successfully") {
            setisTriggering(false);
            setShowDeleteWarning(false);
            setFetchAnnouncementData((prev) => !prev);
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
            setShowDeleteWarning(false);
            setisTriggering(false);
          }
        });
      }
    }, 2000);
  };

  return (
    <>
      {!announcementView ? (
        <div>
          {addAmmouncement ? (
            <>
              <div
                className="announcement"
                // style={
                //   announcementForm ? {} : { justifyContent: "center", gap: "0" }
                // }
              >
                <BackButton handleBackBtn={handleAnnouncement} />

                <h3
                  className="page-title"
                  style={{ color: "#3D5347", marginRight: "70px" }}
                >
                  Announcements
                </h3>
              </div>
              <div className="announcementform">
                <form
                  action=""
                  onSubmit={() => {
                    setAddAnnouncement((prev) => !prev);
                  }}
                >
                  <p>
                    Fill in the Title and Body of the annoucement and press
                    send. People will recieve a notification on their phones
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor="">Title</label>
                    <input
                      style={{
                        marginBottom: "20px",
                        padding: "10px",
                        borderRadius: "10px",
                        border: "1px solid grey",
                      }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      style={{
                        marginBottom: "20px",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="AddAnnouncement">
                    <CustomBtn
                      label="Trigger Announcement"
                      icon={Addannouncemetn}
                    />
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div
                className="announcement"
                // style={
                //   announcementForm ? {} : { justifyContent: "center", gap: "0" }
                // }
              >
                <BackButton handleBackBtn={handleAnnouncement} />

                <h3
                  className="page-title"
                  style={{ color: "#3D5347", marginRight: "60px" }}
                >
                  Preview Announcement
                </h3>
              </div>
              <div className="announcementPreview">
                <div className="announcemenPreviewHeader">
                  <p>Title</p>
                  <span>
                    <h4 className="title" style={{ color: "#1D785A" }}>
                      {title}
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      onClick={() => setAddAnnouncement((prev) => !prev)}
                    >
                      <img src={editIcon} alt="" style={{ width: "13px" }} />
                      {/* <b style={{ color: "#154f30", fontSize: "10px" }}>Edit</b> */}
                    </div>
                  </span>
                </div>
                <p>Description</p>

                <p className="announcedes">
                  <MoreBtn
                    tsx={description}
                    txLength={description.length}
                    height="300px"
                  />
                </p>
                <div className="AddAnnouncement">
                  <CustomBtn
                    label="Confirm Announcement"
                    icon={Addannouncemetn}
                    eventHandler={() => {
                      setShowDeleteWarning(true);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <AnnouncementCard
          handleAnnouncement={handleAnnouncement}
          detailView={true}
          title={title}
          description={description}
        />
      )}

      <div className="announceconfirm">
        {showDeleteWarning && (
          <DeleteWarningCard
            wariningType=""
            warining="By posting, you take full responsibility for the content of your post and agree to comply with ConnectMazjid's terms and conditions and privacy policy.  ConnectMazjid reserves the right to remove any inappropriate content. ?"
            onClose={() => setShowDeleteWarning(false)}
            onConfirm={() => {
              handleTriggerNotification();
            }}
            icon={Warning}
            progress={isTriggering}
          />
        )}
      </div>
    </>
  );
}

export default AnnouncementForm;
