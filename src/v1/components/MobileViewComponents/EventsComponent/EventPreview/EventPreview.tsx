import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./EventPreview.css";
import { Card } from "@mui/material";
// import EventModal from "../../EventDetails/EventModal";
import MoreBtn from "../../Shared/MoreBtn";
import previewMasjid from "../../../../photos/placeholder.png";
import EventCarousel from "../../EventDetails/EventCarousel";
import {
  dateFormatter,
  dateReverter,
} from "../../../../helpers/HelperFunction";
import tz_lookup from "tz-lookup";
import toast from "react-hot-toast";
import moment from "moment";
import CustomBtn from "../../Shared/CustomBtn";
import EventDisclaimer from "../eventDisclaimer/EventDisclaimer";
import BackButton from "../../Shared/BackButton";

function EventPreview({
  formData,
  tZone,
  images,
  handleDisclaimerStatus,
  setPreview,
  updateEventPhotos,
  isEditing,
}) {
  const [showDisclaimer, setDisclaimer] = useState(false);

  const cardStyle = {
    borderRadius: "16px",
    margin: "auto 10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
  };

  const getTimeInTimeZone = (timestamp: number | undefined): string => {
    if (!formData?.eventName) {
      return "";
    }
    let lat: number | undefined = formData.latitude;
    let lon: number | undefined = formData.longitude;
    let tzone: string = lat && lon ? tz_lookup(lat, lon) : "";
    if (!tzone || !timestamp) {
      toast.error("There is something wrong with Time Zone");
      return "";
    }

    if (timestamp) return moment.unix(timestamp).tz(tzone).format("hh:mm A");
    else return "00:00";
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
          <Card style={cardStyle}>
            <div className="event-details-body">
              {images.length !== 0 ||
              (updateEventPhotos &&
                updateEventPhotos.eventPhotos.length > 0) ? (
                <EventCarousel
                  eventData={images.length !== 0 ? images : updateEventPhotos}
                  isEditing={isEditing}
                />
              ) : (
                <div className="event-preview-img">
                  <img src={previewMasjid} alt="" />
                </div>
              )}

              <div className="evntDesc">
                <div className="title">
                  <h3 style={{ fontSize: "20px" }}> {formData?.eventName}</h3>
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

                <h5>Location</h5>
                <p>{formData?.address}</p>

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
                      <h5>End Date & Time</h5>
                      <p>
                        {`${dateFormatter(
                          dateReverter(formData.endDate, tZone)
                        )}    |  
                    ${convertTo12HourFormat(formData.endTime)}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="previewBtn"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <CustomBtn
                    eventHandler={handleShowDisclaimer}
                    label={isEditing ? "Update Event" : "Add Events"}
                  />
                </div>
              </div>
            </div>
          </Card>
          <EventDisclaimer
            showDisclaimer={showDisclaimer}
            handleDisclaimerStatus={handleDisclaimerStatus}
            setDisclaimer={setDisclaimer}
          />
        </div>
      </div>
    </>
  );
}

export default EventPreview;
