import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EventType } from "../../../redux/Types";
import previewMasjid from "../../../photos/PLACEHOLDER-event.png";
import "./EventDetails.css";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { CancelEvent } from "../../../redux/actions/EventActions/CancelEventAction";
import toast from "react-hot-toast";
import { FetchEventById } from "../../../redux/actions/EventActions/FetchingEventDetailsById";
import tz_lookup from "tz-lookup";
import moment from "moment";
import { dateFormatter, dateReverter } from "../../../helpers/HelperFunction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EventCarousel from "./EventCarousel";
import BackButton from "../Shared/BackButton";
import { Card } from "@material-ui/core";

import MoreBtn from "../Shared/MoreBtn";
import edit from "../../../photos/Newuiphotos/Icons/Edit.svg";
import del from "../../../photos/Newuiphotos/Icons/delete.svg";
//piechart lazy loading
const PieChartComponent = lazy(
  () => import("../../../helpers/EventPieChart/PieChartComponent")
);
import Events from "../EventsComponent/Events";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import { FetchRSVPByEventId } from "../../../redux/actions/EventActions/FetchingEventRsvp";

type EventRSVP = {
  attending: number;
  notAttending: number;
  maybe: number;
  subscribers: number;
};

type pieData = {
  name: string;
  value: number;
  color: string;
};

const EventDetails = () => {
  const navigate = useNavigate();
  let admin = useAppSelector((state) => state.admin);
  const [tZone, setZone] = useState("");
  const [eventData, setEventData] = useState<EventType>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [upload, setUpload] = useState(false);
  const [willDelete, setWillDelete] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppThunkDispatch();
  const [EventsRSVP, setEventsRSVP] = useState<EventRSVP>();
  const [pieData, setPieData] = useState<pieData[]>([]);

  useEffect(() => {
    if (id) {
      const response = dispatch(FetchEventById(id));
      response.then(function (result) {
        if (result.success) {
          setEventData(result.data);
          let lat: number | undefined = result.data.location.coordinates[1];
          let lon: number | undefined = result.data.location.coordinates[0];
          let tzone: string = lat && lon ? tz_lookup(lat, lon) : "";
          setZone(tzone);
        } else {
          toast.error("Unable to fetch event data");
        }
      });

      if (admin.role !== "musaliadmin") {
        const RSVPresponse = dispatch(FetchRSVPByEventId(id));
        RSVPresponse.then((result: any) => {
          setEventsRSVP(result.data.data);
          setPieData([
            {
              name: "Attending",
              value: result.data.data.attending,
              color: "#0EB77F",
            },
            {
              name: "Not Attending",
              value: result.data.data.notAttending,
              color: "#FF7272",
            },
            { name: "Maybe", value: result.data.data.maybe, color: "#FFB625" },
          ]);
        });
      }
    }
  }, [isEditing, upload]);

  const handleCancelEvent = async (eventId: string | undefined) => {
    if (eventId) {
      const loading = toast.loading("Please wait...!");
      const response = dispatch(CancelEvent(admin.masjids[0], eventId));
      response.then(function (result) {
        toast.dismiss(loading);
        if (result.message === "Event updated successfully") {
          toast.success("Cancelled Event Successfully");
          navigate(`/feed/3`);
        } else {
          toast.error("Failed to Cancel Event");
        }
      });
    }
  };

  const getTimeInTimeZone = (timestamp: number | undefined): string => {
    if (!eventData?.eventName) {
      return "";
    }
    let lat: number | undefined = eventData?.location.coordinates[1];
    let lon: number | undefined = eventData?.location.coordinates[0];
    let tzone: string = lat && lon ? tz_lookup(lat, lon) : "";
    if (!tzone || !timestamp) {
      toast.error("There is something wrong with Time Zone");
      return "";
    }

    if (timestamp) return moment.unix(timestamp).tz(tzone).format("hh:mm A");
    else return "00:00";
  };

  const handleBackBtn = () => {
    navigate(`/feed/3`);
  };

  const cardStyle = {
    borderRadius: "16px",
    margin: "auto 10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    Width: "360px",
  };

  let defaultPie = [
    {
      name: "Attending",
      value: 10,
      color: "grey",
    },
  ];

  return (
    <>
      {!isEditing ? (
        <div className="event-details">
          <div className="eventcontainer" style={{ position: "relative" }}>
            <div className="event-top-container">
              <BackButton handleBackBtn={handleBackBtn} />
            </div>

            <div className="eventMain">
              <div className="evntimg">
                {eventData?.eventPhotos?.length ? (
                  <EventCarousel eventData={eventData} isEditing={isEditing} />
                ) : (
                  <div className="event-preview-img">
                    <img src={previewMasjid} alt="" />
                  </div>
                )}
              </div>

              <div
                className="eventdetailcard"
                style={{
                  marginTop: "20px",
                  position: "absolute",
                  top: "80%",
                  width: "100%",
                }}
              >
                <Card style={cardStyle}>
                  <div className="evntDesc" style={{ padding: "0" }}>
                    <div
                      className="title"
                      style={{
                        fontSize: "20px",
                        padding: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #dcdbdb",
                      }}
                    >
                      <h3>
                        {eventData?.eventName || (
                          <Skeleton count={1} width={"100px"} />
                        )}
                      </h3>

                      {!eventData?.isCancelled && (
                        <div
                          className="action-icon"
                          style={{ display: "flex", gap: "15px" }}
                        >
                          <div onClick={() => setIsEditing(true)}>
                            <img src={edit} alt="" style={{ width: "12px" }} />
                          </div>

                          <div onClick={() => setWillDelete(true)}>
                            <img src={del} alt="" style={{ width: "10px" }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {admin.role !== "musaliadmin" && (
                      <Suspense fallback={<div>Loading...</div>}>
                        <PieChartComponent pieData={pieData} />
                      </Suspense>
                    )}
                    <div style={{ padding: "1px 15px 15px" }}>
                      <div className="evntStrtEnd">
                        <div className="datetiming">
                          <div>
                            <h5>Start Date & Time</h5>
                            <p>
                              {eventData ? (
                                `${dateFormatter(
                                  dateReverter(
                                    eventData?.metaData.startDate,
                                    tZone
                                  )
                                )} |
                    ${getTimeInTimeZone(eventData?.timings[0].startTime)}`
                              ) : (
                                <Skeleton count={1} width={"130px"} />
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="datetiming">
                          <div>
                            <h5>End Date & Time</h5>
                            <p>
                              {eventData ? (
                                `${dateFormatter(
                                  dateReverter(
                                    eventData?.metaData.endDate,
                                    tZone
                                  )
                                )}    |  
                    ${getTimeInTimeZone(eventData?.timings[0].endTime)}`
                              ) : (
                                <Skeleton count={1} width={"130px"} />
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <h5>Description</h5>
                      <div className="event-des-box">
                        {eventData ? (
                          eventData?.description ? (
                            <p>
                              <MoreBtn
                                tsx={eventData.description}
                                txLength={eventData.description.length}
                              />
                            </p>
                          ) : null
                        ) : (
                          <Skeleton count={3} width={"320px"} />
                        )}
                      </div>

                      <h5>Location</h5>
                      <p>
                        {eventData ? (
                          eventData?.address
                        ) : (
                          <Skeleton count={1} width={"320px"} />
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Events
          setIsEditing={setIsEditing}
          isFormDetailsPage={true}
          eventData={eventData}
          setUpload={setUpload}
        />
      )}
      {willDelete && (
        <DeleteWarningCard
          wariningType="Delete"
          warining="Are you sure you want to
        Delete this event Recovery not possible after deletion ?"
          onClose={() => setWillDelete(false)}
          onConfirm={() => {
            setWillDelete(false);
            handleCancelEvent(id);
          }}
        />
      )}
    </>
  );
};

export default EventDetails;
