import React, { useState } from "react";
import "./EventPreview.css";
import { Card } from "@mui/material";
import MoreBtn from "../../Shared/MoreBtn";
import EventCarousel from "../Carousel/EventCarousel";
import {
  dateFormatter,
  dateReverter,
} from "../../../../helpers/HelperFunction";
import CustomBtn from "../../Shared/CustomBtn";
import EventDisclaimer from "../Disclaimer/EventDisclaimer";
import BackButton from "../../Shared/BackButton";
import noEventImg from "../../../../photos/Newuiphotos/Icons/noEvntphoto.svg";
import eventImg from "../../../../photos/eventIcon.png";

import { FormData } from "../Events";
import CustomSlider from "../../Shared/Slider/CustomSlider";
import MasjidsList from "../../../../pages/Shared/MasjidsList/MasjidsList";
import { Masjid } from "../../../../redux/Types";
import Ticket from "../../Shared/TicketModel/Ticket";
import edit from "../../../../photos/Newuiphotos/Icons/Edit.svg";
import FullScreenImageModal from "../../Donation/Carousel/FullScreenImageModal ";

type propsType = {
  handleDisclaimerStatus: any;
  masjidName: string;
  isEditing: boolean;
  formData: FormData;
  Dates: { Random: string[]; Daily: string[]; None: any; Weekly: string[] };
  tZone: string;
  setPreview: any;
  selectedWeekDays: string[];
  updateEventPhotos: any;
  images: any;
};
function EventPreview({
  formData,
  masjidName,
  tZone,
  images,
  Dates,
  handleDisclaimerStatus,
  setPreview,
  selectedWeekDays,
  updateEventPhotos,
  isEditing,
}: propsType) {
  const [showDisclaimer, setDisclaimer] = useState(false);
  const [currentSliderIdx, setCurrentSliderIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isImageOpenVisible, setIsImageOpenVisible] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [currentImageAlt, setCurrentImageAlt] = useState("");

  const cardStyle = {
    borderRadius: "16px",
    margin: "auto 10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
  };

  function convertTo12HourFormat(time24hr: string) {
    // Parse the time string as a Date
    const timeArray = time24hr.split(":");
    const hours = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
    const time = new Date(0, 0, 0, hours, minutes);

    // Format the time in 12-hour format
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return time.toLocaleTimeString("en-US", options);
  }

  const handleShowDisclaimer = () => {
    setDisclaimer(true);
  };
  const startEndContainer = () => {
    return (
      <>
        <h5>Event Start Time On Each Day</h5>
        <div className="strtEndContainer">
          <p>{convertTo12HourFormat(formData.startTime)}</p>
        </div>
        <h5>Event End Time On Each Day</h5>
        <div className="strtEndContainer">
          <p>{convertTo12HourFormat(formData.endTime)}</p>
        </div>
      </>
    );
  };
  const handleToggleImage = () => {
    setIsImageOpenVisible(true);
  };

  console.log(formData);
  return (
    <>
      <div className="previewContainer">
        <div className="topPreview">
          <div className="">
            <BackButton
              handleBackBtn={() => {
                setPreview(false);
              }}
            />
          </div>
          <h3
            style={{ width: "100%", textAlign: "center", marginRight: "30px" }}
          >
            Preview Event
          </h3>
        </div>
        <div className="previewMainContainer">
          <Card style={cardStyle} className="previewMainCard">
            <div className="event-details-body">
              {images.length !== 0 ||
              (updateEventPhotos &&
                updateEventPhotos.eventPhotos.length > 0) ? (
                <EventCarousel
                  eventData={images.length !== 0 ? images : updateEventPhotos}
                  isEditing={isEditing}
                  handleToggleImage={handleToggleImage}
                  setImgSrc={setCurrentImageSrc}
                  setAltSrc={setCurrentImageAlt}
                />
              ) : (
                <div className="event-preview-img">
                  <img src={noEventImg} alt="" />
                </div>
              )}

              <div className="evntDesc">
                <div
                  className="title"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3
                    style={{
                      fontSize: "20px",
                      color: "#1D785A",
                      margin: "10px 0",
                    }}
                  >
                    {formData?.eventName}
                  </h3>
                  <div
                    className="action-icon"
                    style={{ display: "flex", gap: "15px" }}
                  >
                    <div
                      className="edit-delete-service"
                      onClick={() => {
                        setPreview(false);
                      }}
                    >
                      <img src={edit} alt="" style={{ width: "15px" }} />
                    </div>
                  </div>
                </div>
                <div className="Category">{formData?.category}</div>
                {formData.isRegistrationRequired &&
                  (typeof formData?.cost === "object" || formData?.cost) && (
                    <>
                      <h4 style={{ margin: "0", paddingTop: "20px" }}>
                        Ticket will be issued to the user
                      </h4>
                      <Ticket
                        title={formData?.eventName}
                        time={convertTo12HourFormat(formData.startTime)}
                        date={dateFormatter(
                          dateReverter(formData.startDate, tZone)
                        )}
                        seats={formData?.capacity}
                        price={formData?.cost}
                        totalSeatsBooked={
                          0
                          // eventData.availableSeats
                        }
                      />
                      <div className="regfee">
                        <h5>Registration Fees</h5>
                        <h5 style={{ fontSize: "13px", color: "#1D785A" }}>
                          {formData?.cost === null ||
                          formData?.cost.toString() === "0"
                            ? "Free"
                            : `$${formData?.cost} `}
                        </h5>
                      </div>
                    </>
                  )}

                <div className="capacity">
                  <h5>Event Capacity</h5>
                  <h5 style={{ fontSize: "13px", color: "#1D785A" }}>
                    {formData?.capacity === 0 || null
                      ? "No Limit"
                      : formData?.capacity}
                  </h5>
                </div>

                <h5>Description</h5>
                <div className="event-des-box">
                  {formData?.description ? (
                    <p>
                      <MoreBtn
                        tsx={formData.description}
                        txLength={formData.description.length}
                      />
                    </p>
                  ) : null}
                </div>

                {formData?.recurrenceType === "Random" ? (
                  <>
                    <h5>Event Dates</h5>
                    <CustomSlider
                      setCurrentSliderIdx={setCurrentSliderIdx}
                      setIsMobileHandler={setIsMobile}
                      dots={false}
                      controllingBtn={false}
                      slidesToShow={3.5}
                    >
                      {Dates[formData?.recurrenceType].map((date, index) => (
                        <p key={index}>
                          {dateFormatter(
                            dateReverter(date?.format("YYYY-MM-DD"), tZone)
                          )}
                          {index !==
                            Dates[formData?.recurrenceType]?.length - 1 && ","}
                        </p>
                      ))}
                    </CustomSlider>

                    {startEndContainer()}
                  </>
                ) : formData?.recurrenceType === "Daily" ||
                  formData?.recurrenceType === "Weekly" ? (
                  <>
                    <h5>Start Date & End Date</h5>

                    <p>
                      {formData?.recurrenceType === "Weekly" ? (
                        <>
                          Repeated Weekly On <br />
                          {selectedWeekDays?.map((day, index) => (
                            <React.Fragment key={day}>
                              <span>{day}</span>
                              {index < selectedWeekDays.length - 1 && (
                                <span
                                  style={{
                                    display: "inline-block",
                                    marginLeft: "2px",
                                  }}
                                >
                                  ,{" "}
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </>
                      ) : null}
                    </p>

                    <div className="dates-scroll-view-daily">
                      {Dates[formData?.recurrenceType].map((date, index) => (
                        <p key={index}>
                          {dateFormatter(
                            dateReverter(date?.format("YYYY-MM-DD"), tZone)
                          )}
                          {index === 0 ? "                  ---" : ""}
                        </p>
                      ))}
                    </div>

                    {startEndContainer()}
                  </>
                ) : (
                  <div className="strtEndContainer">
                    <div className="datetiming">
                      <div>
                        <h5>Start Date & Time</h5>
                        <p>
                          {`${dateFormatter(
                            dateReverter(formData.startDate, tZone)
                          )}  |
  ${convertTo12HourFormat(formData.startTime)}`}
                        </p>
                      </div>
                    </div>
                    <div className="datetiming">
                      <div>
                        <h5> End Date & Time</h5>
                        <p>
                          {`${dateFormatter(
                            dateReverter(formData.endDate, tZone)
                          )}    |  
  ${convertTo12HourFormat(formData.endTime)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <h5>Location</h5>
                <p>{masjidName ? masjidName : formData?.address}</p>
                <div
                  className="previewBtn"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <CustomBtn
                    icon={eventImg}
                    eventHandler={handleShowDisclaimer}
                    label={
                      isEditing
                        ? "Confirm and Update Event"
                        : "Confirm and Add Events"
                    }
                    isDisabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </Card>
          <EventDisclaimer
            showDisclaimer={showDisclaimer}
            handleDisclaimerStatus={handleDisclaimerStatus}
            setDisclaimer={setDisclaimer}
            setIsSubmitting={setIsSubmitting}
          />
        </div>
      </div>
      <FullScreenImageModal
        isOpen={isImageOpenVisible}
        setIsOpen={setIsImageOpenVisible}
        imgSrc={currentImageSrc}
        imgAlt={currentImageAlt}
      />
    </>
  );
}

export default EventPreview;
