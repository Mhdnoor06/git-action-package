import React from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./EventCard.css";
import { EventType } from "../../../../redux/Types";
import eventImg from "../../../../photos/realMasjid.png";
import eventPlaceholer from "../../../../photos/placeholder.png";
import eventLocationImg from "../../../../photos/card_location.png";
import { dateReverter } from "../../../../helpers/HelperFunction";
import moment from "moment";
import clockIcon from "../../../../photos/Newuiphotos/Icons/clock.svg";
import clockRedIcon from "../../../../photos/Newuiphotos/Icons/clockRed.png";
import clockBlackIcon from "../../../../photos/Newuiphotos/Icons/endevntclock.svg";

type propsType = {
  eventName: string;
  description: string;
  date: string;
  imgSrc: string;
  eventId: string;
  address: string;
};
const EventCard = ({
  event,
  masjidName,
  tZone,
}: {
  event: EventType;
  masjidName: string;
  tZone: string;
}) => {
  const { eventName, description, date, _id, address, timings, isCancelled } =
    event;

  const navigate = useNavigate();
  const convertedDate = dateReverter(date, tZone);
  const finalDate = moment(convertedDate, "YYYY-MM-DD").format("D MMM");

  const eventDate = moment(convertedDate, "YYYY-MM-DD");
  const todayDate = moment();
  const isEventPassed = eventDate.isBefore(todayDate, "day");

  const eventCardStyle = isEventPassed ? { backgroundColor: "#B7B7B7" } : {};
  const eventIcon = isEventPassed ? clockBlackIcon : clockIcon;

  const handleCardClick = () => {
    navigate(`/event-details/${_id}`);
  };

  const tmFormatter = (tm: number | undefined) => {
    if (tm && tZone) return moment.unix(tm).tz(tZone).format("hh:mm A");
    else return "--:--";
  };

  return (
    <div
      className="event-card"
      onClick={handleCardClick}
      style={eventCardStyle}
    >
      <div className="event-card-image">
        <img src={event?.eventPhoto?.url || eventPlaceholer} alt={eventName} />
      </div>
      <div className="event-card-content">
        <h3 style={isCancelled ? style.cancelledEvent : style.activeEvent}>
          {eventName}
        </h3>
        {/* {address ? (
          <p className="event-card-description">
            <img style={{ marginRight: "5px" }} src={eventLocationImg} alt="" />
            {address.length > 70
              ? address.substring(0, 70) + "......."
              : address}
          </p>
        ) : null} */}

        <p className="event-card-date">
          {masjidName} <br />
          <span className="Datetime">
            <img
              src={isCancelled ? clockRedIcon : eventIcon}
              alt=""
              style={{ width: "15px" }}
            />
            <strong
              style={isCancelled ? style.cancelledEventDate : {}}
            >{` ${tmFormatter(timings[0].startTime)} (${finalDate})`}</strong>
          </span>
        </p>
      </div>
    </div>
  );
};

const style = {
  cancelledEvent: {
    color: "#FF7272",
    weight: 700,
    font: "inter",
    textDecoration: "line-through",
  },
  cancelledEventDate: {
    color: "#FF7272",
  },
  activeEvent: { color: "#2E382E", weight: 700, font: "inter" },
};

export default EventCard;
