import React, { useState } from "react";
import "../Announcement.css";
import CustomBtn from "../../Shared/CustomBtn";
import Addannouncemetn from "../.././../../photos/Newuiphotos/nav bar/navicons/navactiveicons/Announcementactive.svg";
import editIcon from "../../../../photos/Newuiphotos/Icons/Edit.svg";
import MoreBtn from "../../Shared/MoreBtn";
import { useAppThunkDispatch } from "../../../../redux/hooks";
import { TriggeringAnnouncement } from "../../../../redux/actions/AnnouncementActions/TriggeringAnnouncementAction";
import { handleSnackbar } from "../../../../helpers/SnackbarHelper/SnackbarHelper";
import DeleteWarningCard from "../../Shared/DeleteWarningCard/DeleteWarningCard";
import Warning from "../../../../photos/Newuiphotos/Icons/warning.svg";
import { AdminInterFace } from "../../../../redux/Types";
import AnnouncementCard from "../Card/AnnouncementCard";
import BackButton from "../../Shared/BackButton";
import SuccessMessageModel from "../../../../helpers/SuccessMessageModel/SuccessMessageModel";

function AnnouncementForm({
  toggleAnnouncementForm,
  setFetchAnnouncementData,
  masjidId,
}: any) {
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [isAddingAnnouncement, setIsAddingAnnouncement] =
    useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isTriggering, setisTriggering] = useState(false);
  const [isConfirmWarningVisible, setIsConfirmWarningVisible] = useState(false);
  const [isAnnouncementViewVisible, setIsAnnouncementViewVisible] =
    useState(false);

  const dispatch = useAppThunkDispatch();

  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

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
          masjidIds: [masjidId],
          expiresAt: "",
          priorityType: "normal",
        };

        const data = dispatch(TriggeringAnnouncement(uploadData));

        data.then(function (result: ResponseType) {
          if (result.message === "Notification sent successfully") {
            setIsAnnouncementViewVisible(true);
            setisTriggering(false);
            setIsConfirmWarningVisible(false);
            setFetchAnnouncementData((prev) => !prev);

            // handleSnackbar(
            //   true,
            //   "success",
            //   `Announcement Sent SuccessFully`,
            //   dispatch
            // );
            setOpenSuccessModal(true);
          } else {
            handleSnackbar(
              true,
              "error",
              `Failed to Send the Announcement : ${result.message}`,
              dispatch
            );
            setIsConfirmWarningVisible(false);
            setisTriggering(false);
          }
        });
      }
    }, 2000);
  };

  return (
    <>
      <SuccessMessageModel
        message="Announcement Sent Successfully"
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
      />
      {!isAnnouncementViewVisible ? (
        <div>
          ;
          {isAddingAnnouncement ? (
            <>
              <div
                className="announcement"
                // style={
                //   announcementForm ? {} : { justifyContent: "center", gap: "0" }
                // }
              >
                <BackButton handleBackBtn={toggleAnnouncementForm} />

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
                    setIsAddingAnnouncement((prev) => !prev);
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
                    <label htmlFor="title">Title</label>
                    <input
                      id="title"
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
                    <label htmlFor="description">Description</label>
                    <textarea
                      name=""
                      id="description"
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
                <BackButton handleBackBtn={toggleAnnouncementForm} />

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
                      onClick={() => setIsAddingAnnouncement((prev) => !prev)}
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
                      setIsConfirmWarningVisible(true);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <AnnouncementCard
          handleBack={toggleAnnouncementForm}
          isDetailView={true}
          title={title}
          description={description}
        />
      )}

      <div className="announceconfirm">
        {isConfirmWarningVisible && (
          <DeleteWarningCard
            wariningType=""
            warining="By posting, you take full responsibility for the content of your post and agree to comply with ConnectMazjid's terms and conditions and privacy policy.  ConnectMazjid reserves the right to remove any inappropriate content. ?"
            onClose={() => setIsConfirmWarningVisible(false)}
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
