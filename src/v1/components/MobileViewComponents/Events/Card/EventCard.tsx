import React, { useEffect, useState, useMemo } from "react";
import "./EventCard.css";
import { EventType } from "../../../../redux/Types";
import eventPlaceholder from "../../../../photos/placeholder.png";
import clockIcon from "../../../../photos/Newuiphotos/Icons/clock.svg";
import clockRedIcon from "../../../../photos/Newuiphotos/Icons/clockRed.png";
import clockBlackIcon from "../../../../photos/Newuiphotos/Icons/endevntclock.svg";
import recurrenceIcon from "../../../../photos/Newuiphotos/Icons/recurrence.png";
import {
  customNavigatorTo,
  dateReverter,
} from "../../../../helpers/HelperFunction";
import moment from "moment";
import { useMediaQuery } from "@mui/material";
import { fontSize } from "@mui/system";
import { useAppSelector } from "../../../../redux/hooks";
import { useNavigationprop } from "../../../../../MyProvider";

const EventCard = ({
  masjidId,
  event,
  masjidName,
  tZone,
  isRecurring,
}: {
  masjidId: string;
  event: EventType;
  masjidName: string;
  tZone: string;
  isRecurring?: boolean;
}) => {
  const navigation = useNavigationprop();
  const {
    eventName,
    date,
    dates,
    _id,
    timings,
    isCancelled,
    category,
    metaData,
  } = event;
  const [isReady, setIsReady] = useState(false);
  let admin = useAppSelector((state) => state.admin);
  const masjidIdQuery =
    admin.role == "admin" || admin.role === "superadmin"
      ? `?masjidId=${masjidId}`
      : "";

  useEffect(() => {
    if (tZone) {
      setIsReady(true);
    }
  }, [tZone]);

  const isMobile = useMediaQuery("(max-width:768px)");

  // Function to truncate event name for mobile view
  const truncateEventName = (name: string) => {
    if (isMobile && name.length > 20) {
      return `${name.substring(0, 20)}...`;
    }
    return name;
  };

  const truncatedEventName = truncateEventName(eventName);

  const convertedDate = dateReverter(metaData.endDate, tZone);
  const eventDate = moment.tz(convertedDate, "YYYY-MM-DD", tZone);
  const todayDate = moment.tz(tZone);
  const isEventPassed = eventDate.isBefore(todayDate, "day");

  const finalDates = useMemo(() => {
    if (!dates || dates.length === 0) {
      return moment(date, "YYYY-MM-DD").format("D MMM");
    }

    // Map through the dates and format them, adding month if necessary
    const formattedDates = dates.map((dateStr) => {
      const date = moment(dateStr);
      return date.format("Do MMM"); // Include month in the format for each date
    });

    const limitedDates = formattedDates.slice(0, 3);

    if (formattedDates.length > 3) {
      limitedDates.push("...");
    }

    return `(${limitedDates.join(", ")})`;
  }, [dates, convertedDate]);

  const eventIcon = isEventPassed ? clockBlackIcon : clockIcon;

  const handleCardClick = () => {
    if (navigation) {
      navigation(`/event-details/${_id}${masjidIdQuery}`);
    } else {
      customNavigatorTo(`/event-details/${_id}${masjidIdQuery}`);
    }
  };

  const tmFormatter = (tm?: number) => {
    if (!tm || !tZone) return "--:--";
    return moment.unix(tm).tz(tZone).format("hh:mm A");
  };

  return (
    <div
      className={`event-card 
      ${isCancelled ? "cancelled" : ""} 
      ${isEventPassed ? "passed" : ""}`}
      data-testid="event-card"
      onClick={handleCardClick}
    >
      <div className="event-card-image">
        <img src={event?.eventPhoto?.url || eventPlaceholder} alt={eventName} />
      </div>
      <div className="event-card-content">
        <p className="event-card-date">
          <span className="Datetime">
            <img
              src={isCancelled ? clockRedIcon : eventIcon}
              alt=""
              style={{ width: "15px" }}
            />
            <b
              style={{
                ...(isCancelled ? style.cancelledEventDate : {}),
                margin: "2px 0",
                color: "#2E382E",
              }}
            >{` ${tmFormatter(timings[0].startTime)} ${finalDates}`}</b>
          </span>
          {category && (
            <div className="Card_Category" style={{ width: "fit-content" }}>
              {category}
            </div>
          )}
          <div>
            <h3 style={isCancelled ? style.cancelledEvent : style.activeEvent}>
              {truncatedEventName}
            </h3>
          </div>
          {masjidName}
        </p>
      </div>
      {isRecurring && (
        <img
          src={recurrenceIcon}
          alt="Recurring Event"
          className="recurrence-icon"
        />
      )}
    </div>
  );
};

const style = {
  cancelledEvent: {
    color: "#FF7272",
    fontWeight: 700,
    fontFamily: "inter",
    textDecoration: "line-through",
  },
  cancelledEventDate: {
    color: "#FF7272",
  },
  activeEvent: {
    color: "#2E382E",
    fontWeight: 700,
    fontFamily: "inter",
  },
};

export default EventCard;
