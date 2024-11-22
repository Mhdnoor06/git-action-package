import { lazy, Suspense, useEffect, useState } from "react";
import { EventType } from "../../../../redux/Types";
import previewMasjid from "../../../../photos/PLACEHOLDER-event.png";
import "./EventDetails.css";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";
import { CancelEvent } from "../../../../redux/actions/EventActions/CancelEventAction";
import toast from "react-hot-toast";
import { FetchEventById } from "../../../../redux/actions/EventActions/FetchingEventDetailsById";
import tz_lookup from "tz-lookup";
import moment from "moment";
import {
  customNavigatorTo,
  dateFormatter,
  dateReverter,
  useCustomParams,
} from "../../../../helpers/HelperFunction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EventCarousel from "../Carousel/EventCarousel";
import BackButton from "../../Shared/BackButton";
import { Card } from "@material-ui/core";
import MoreBtn from "../../Shared/MoreBtn";
import edit from "../../../../photos/Newuiphotos/Icons/Edit.svg";
import del from "../../../../photos/Newuiphotos/Icons/delete.svg";
import eventcancle from "../../../../photos/Newuiphotos/Icons/eventcancle.svg";
import Events from "../Events";
import DeleteWarningCard from "../../Shared/DeleteWarningCard/DeleteWarningCard";
import { FetchRSVPByEventId } from "../../../../redux/actions/EventActions/FetchingEventRsvp";
import { adminFromLocalStg } from "../../../../helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import { Container, Button } from "@mui/material";
//piechart lazy loading
const PieChartComponent = lazy(
  () => import("../../../../helpers/EventPieChart/PieChartComponent")
);
import ShareIcon from "../../../../photos/Newuiphotos/ShareIcon.webp";
import { color, styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Ticket from "../../Shared/TicketModel/Ticket";
import TicketManagementTable from "../../Shared/TicketModel/TicketCheckin/TicketManagementTable";
import FullScreenImageModal from "../../Donation/Carousel/FullScreenImageModal ";
import { useNavigationprop } from "../../../../../MyProvider";
import ShareModal from "../../Services/Helpers/ShareButtons/ShareButtons";
import CustomBtn from "../../Shared/CustomBtn";
import { useGetEvent } from "../../../../graphql-api-calls/Events/query";
import { useCancelEvent } from "../../../../graphql-api-calls/Events/mutation";

const StyledButton = styled(Button)<{ selected: boolean }>(
  ({ selected, theme }) => ({
    justifyContent: "space-between",
    width: "100%",
    textTransform: "none",
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    borderRadius: "20px",
    boxShadow: "0px 3px 4px 3px rgba(0, 0, 0, 0.1)",
    border: selected ? `2px solid #1B8368` : "none",
    backgroundColor: selected ? "#FFFFFF  " : "transparent",
    color: selected ? "#1B8368" : "black",
    "&:hover": {
      backgroundColor: selected ? "#FFFFFF" : "transparent",
      border: selected ? `2px solid #1B8368` : `2px solid transparent`,
    },
  })
);

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
  const navigation = useNavigationprop();
  const [isShareVisible, setIsShareVisible] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const masjidIdQuery = queryParams.get("masjidId");

  let admin = useAppSelector((state) => state.admin);
  const consumerMasjidId = masjidIdQuery
    ? masjidIdQuery
    : adminFromLocalStg().masjids[0];

  const localAdmin = adminFromLocalStg();
  const conmasjidId = localStorage.getItem("consumerMasjid");
  // const consumerMasjidId = conmasjidId ? conmasjidId : localAdmin.masjids[0];
  const [tZone, setZone] = useState("");
  const [eventData, setEventData] = useState<EventType>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
  const [showCheckIn, setShowCheckIn] = useState<boolean>(false);

  const id = useCustomParams();

  const dispatch = useAppThunkDispatch();
  const [EventsRSVP, setEventsRSVP] = useState<EventRSVP>();
  const [pieData, setPieData] = useState<pieData[]>([]);
  const [cancellationType, setCancellationType] = useState<
    "single" | "recurrence" | null
  >("single");

  const [isImageOpenVisible, setIsImageOpenVisible] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [currentImageAlt, setCurrentImageAlt] = useState("");
  const [isInvalidRoleForPaidEvents, setIsInvalidRoleForPaidEvents] =
    useState(false);

  // handling selecting the single or recurrence
  const handleSelect = (option: "single" | "recurrence") => {
    setCancellationType(option);
  };

  const { cancelEvent, cancelling, cnclerr } = useCancelEvent();
  const { event, loading, error } = useGetEvent(id);
  // fetching event by Id
  useEffect(() => {
    if (event && !loading && !error) {
      setEventData(event.event);

      let lat: number | undefined = event.event.location.coordinates[1];
      let lon: number | undefined = event.event.location.coordinates[0];
      let tzone: string = lat && lon ? tz_lookup(lat, lon) : "";
      setZone(tzone);

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
  }, [isEditing, isUploading, loading]);

  // handling cancelling event
  // const handleCancelEvent = async (
  //   eventId: string | undefined,
  //   cancelType: string | null
  // ) => {
  //   if (eventId) {
  //     const loading = toast.loading("Please wait...!");
  //     const response = dispatch(
  //       CancelEvent(consumerMasjidId, eventId, cancelType)
  //     );
  //     response.then(function (result) {
  //       toast.dismiss(loading);
  //       if (result.message === "Event updated successfully") {
  //         toast.success("Cancelled Event Successfully");
  //         if (navigation) {
  //           navigation(`/feed/4`);
  //         } else {
  //           customNavigatorTo(`/feed/4`);
  //         }
  //       } else {
  //         toast.error("Failed to Cancel Event");
  //       }
  //     });
  //   }
  // };

  const handleCancelEvent = async (eventId: string | undefined) => {
    if (eventId) {
      const loadingToast = toast.loading("Please wait...!");
      try {
        const { data } = await cancelEvent({
          variables: {
            id: eventId,
            all: cancellationType === "recurrence",
          },
        });

        toast.dismiss(loadingToast);
        if (data.cancelEvent) {
          toast.success("Cancelled Event Successfully");
          if (navigation) {
            navigation(`/feed/4`);
          } else {
            customNavigatorTo(`/feed/4`);
          }
        } else {
          throw new Error("Cancellation failed");
        }
      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error("Failed to Cancel Event: " + err.message);
      }
    }
  };

  // get timezone from lat long of event
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

  // go back to the main events component
  const handleBackBtn = () => {
    if (navigation) {
      navigation(`/feed/4`);
    } else {
      customNavigatorTo(`/feed/4`);
    }
  };

  const cardStyle = {
    color: eventData?.isCancelled ? "gray" : "",
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
  const handleToggleImage = () => {
    setIsImageOpenVisible(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    if (
      admin.role !== "subadmin" &&
      eventData?.isRegistrationRequired &&
      eventData?.cost !== 0
    ) {
      setIsInvalidRoleForPaidEvents(true);
      toast.error("Only masjid admin can delete paid events");
    } else {
      setShowDeleteWarning(true);
    }
  };

  console.log(eventData);
  return (
    <>
      {!showCheckIn ? (
        !isEditing ? (
          <div className="event-details" data-testid="view-event-details">
            <div className="eventcontainer" style={{ position: "relative" }}>
              <div className="event-top-container">
                <BackButton handleBackBtn={handleBackBtn} />
              </div>

              <div className="eventMain">
                <div className="evntimg">
                  {eventData?.eventPhotos?.length ? (
                    <EventCarousel
                      eventData={eventData}
                      isEditing={isEditing}
                      handleToggleImage={handleToggleImage}
                      setImgSrc={setCurrentImageSrc}
                      setAltSrc={setCurrentImageAlt}
                    />
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
                        className="eventTitlecontainer"
                        style={{
                          padding: "15px",
                          borderBottom: "1px solid #dcdbdb",
                        }}
                      >
                        <div
                          className="title"
                          style={{
                            fontSize: "20px",
                            display: "flex",
                            justifyContent: "space-between",
                            // borderBottom: "1px solid #dcdbdb",
                          }}
                        >
                          <h3
                            style={
                              eventData?.isCancelled
                                ? {
                                    textDecoration: "line-through",
                                    color: "rgb(255, 114, 114)",
                                  }
                                : {}
                            }
                          >
                            {eventData?.eventName || (
                              <Skeleton count={1} width={"100px"} />
                            )}
                          </h3>

                          {!eventData?.isCancelled && !loading && (
                            <div
                              className="action-icon"
                              style={{ display: "flex", gap: "15px" }}
                            >
                              {eventData?.metaData.recurrenceType ===
                                "none" && (
                                // || eventData?.metaData.recurrenceType ===
                                //     "daily"
                                <div
                                  className="edit-delete-event"
                                  onClick={handleEditClick}
                                  data-testid="edit-event"
                                >
                                  <img src={edit} alt="" />
                                </div>
                              )}

                              <div
                                className="edit-delete-event"
                                onClick={handleDeleteClick}
                                data-testid="delete-event"
                              >
                                <img src={del} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                        {eventData?.category ? (
                          <div
                            className="Category"
                            style={{
                              marginTop: "10px",
                              ...(eventData?.isCancelled && {
                                background: "#FFD1D1",
                              }),
                            }}
                          >
                            {eventData?.category}
                          </div>
                        ) : (
                          <Skeleton count={1} width={"80px"} />
                        )}
                      </div>

                      {eventData &&
                        !eventData.isRegistrationRequired &&
                        admin?.role !== "musaliadmin" && (
                          <Suspense fallback={<div>Loading...</div>}>
                            <PieChartComponent pieData={pieData} />
                          </Suspense>
                        )}

                      <div style={{ padding: "1px 15px 15px" }}>
                        {eventData &&
                          eventData.isRegistrationRequired &&
                          !eventData.isCancelled && (
                            <div
                              onClick={() =>
                                !eventData?.isCancelled
                                  ? setShowCheckIn(true)
                                  : null
                              }
                            >
                              <h4 style={{ margin: "0", paddingTop: "20px" }}>
                                Ticket will be issued to the user
                              </h4>
                              <Ticket
                                title={eventData?.eventName}
                                time={getTimeInTimeZone(
                                  eventData?.timings[0].startTime
                                )}
                                date={dateFormatter(
                                  dateReverter(
                                    eventData?.metaData.startDate,
                                    tZone
                                  )
                                )}
                                seats={eventData?.capacity}
                                price={eventData?.cost}
                                color={
                                  eventData?.isCancelled ? "#FFD1D1" : "#C2E8D5"
                                }
                                totalSeatsBooked={
                                  eventData?.availableSeats
                                    ? eventData?.availableSeats < 0
                                      ? -eventData?.availableSeats
                                      : eventData?.capacity -
                                        eventData?.availableSeats
                                    : 0
                                }
                                isCancelled={eventData?.isCancelled}
                              />
                            </div>
                          )}

                        {eventData?.isRegistrationRequired && (
                          <div className="regfee">
                            <h5>Registration Fees</h5>
                            <h5 style={{ fontSize: "13px", color: "#1D785A" }}>
                              {eventData?.cost === undefined ? (
                                <Skeleton count={1} width={"50px"} />
                              ) : eventData?.cost === 0 ||
                                eventData?.cost === null ? (
                                "Free"
                              ) : (
                                `$${eventData?.cost}`
                              )}
                            </h5>
                          </div>
                        )}
                        {eventData?.isRegistrationRequired && (
                          <div className="capacity">
                            <h5>Event Capacity</h5>
                            <h5 style={{ fontSize: "13px", color: "#1D785A" }}>
                              {eventData?.capacity === null
                                ? 0
                                : eventData?.capacity}
                            </h5>
                          </div>
                        )}
                        <h5>Description</h5>
                        <div className="event-des-box">
                          {eventData ? (
                            eventData?.description ? (
                              <div>
                                <MoreBtn
                                  tsx={eventData.description}
                                  txLength={eventData.description.length}
                                />
                              </div>
                            ) : null
                          ) : (
                            <Skeleton count={3} width={"320px"} />
                          )}
                        </div>

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

                        <h5>Location</h5>
                        <p>
                          {eventData ? (
                            eventData?.address
                          ) : (
                            <Skeleton count={1} width={"320px"} />
                          )}
                        </p>
                      </div>

                      {eventData && !eventData?.isCancelled && (
                        <div
                          className="serviceShowRegistrationsBtn"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "12px",
                          }}
                        >
                          <div className="share-btn">
                            <CustomBtn
                              eventHandler={() => {
                                setIsShareVisible(true);
                              }}
                              label={"Share"}
                              isDisabled={false}
                              icon={ShareIcon}
                              bgColor="#1D785A"
                              size="0.5vw"
                              hightSize="26px"
                            />
                          </div>
                        </div>
                      )}
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
            consumerMasjidId={consumerMasjidId}
            eventData={eventData}
            setUpload={setIsUploading}
          />
        )
      ) : (
        <TicketManagementTable
          setShowCheckIn={setShowCheckIn}
          eventData={eventData}
          getTimeInTimeZone={getTimeInTimeZone}
          tZone={tZone}
          admin={admin}
        />
      )}
      {showDeleteWarning && (
        <DeleteWarningCard
          wariningType="Cancel Event"
          onClose={() => setShowDeleteWarning(false)}
          onConfirm={() => {
            setShowDeleteWarning(false);
            handleCancelEvent(id);
          }}
          icon={eventcancle}
          iconsize="20px"
          color="#ff7272"
        >
          {eventData?.metaData.recurrenceType === "none" ? (
            <>
              <p style={{ margin: "-17px 0px 14px" }}>
                Are you sure want to cancel this event?
              </p>
            </>
          ) : (
            <Container>
              <div>
                <StyledButton
                  selected={cancellationType === "single"}
                  onClick={() => handleSelect("single")}
                  endIcon={
                    cancellationType === "single" ? <CheckCircleIcon /> : null
                  }
                >
                  Cancel This Event {moment(eventData?.date).format("(D MMMM)")}
                </StyledButton>
                <StyledButton
                  selected={cancellationType === "recurrence"}
                  onClick={() => handleSelect("recurrence")}
                  endIcon={
                    cancellationType === "recurrence" ? (
                      <CheckCircleIcon />
                    ) : null
                  }
                >
                  Cancel All Event In This Series
                </StyledButton>
              </div>
            </Container>
          )}
        </DeleteWarningCard>
      )}
      <FullScreenImageModal
        isOpen={isImageOpenVisible}
        setIsOpen={setIsImageOpenVisible}
        imgSrc={currentImageSrc}
        imgAlt={currentImageAlt}
      />
      <ShareModal
        isOpen={isShareVisible}
        onClose={() => {
          setIsShareVisible(false);
        }}
        assetType="event"
        id={id}
        consumerMasjidId={consumerMasjidId}
      />
    </>
  );
};

export default EventDetails;
