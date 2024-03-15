import React, { useState, useEffect } from "react";
import "./EventsViewCalender.css";
import "react-calendar/dist/Calendar.css";
import tz_lookup from "tz-lookup";
import moment from "moment";
import noEventFound from "../../../../photos/Newuiphotos/BG/no events.svg";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";
import EventCard from "../EventCard/EventCard";
import { FetchingEventsByDateRange } from "../../../../redux/actions/EventActions/FetchingEventsByDateRange";
import { EventType, Masjid } from "../../../../redux/Types";
import { UtcDateConverter } from "../../../../helpers/HelperFunction";
import { fetchMasjidById } from "../../../../redux/actions/MasjidActions/fetchMasjidById";
import Events from "../Events";
import CustomCalender from "../../Shared/calendar/CustomCalender";
import CustomBtn from "../../Shared/CustomBtn";
import { FetchEventByMasjidId } from "../../../../redux/actions/EventActions/fetchEventByMasjidId";

const EventsViewCalender = () => {
  const dispatch = useAppThunkDispatch();
  const [showEventInput, setEventInput] = useState<boolean>(false);
  const [tZone, setTZone] = useState("");
  const [masjidName, setMasjidName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const defaultValue = new Date();
  const [value, setValue] = useState<Date>(defaultValue);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  let admin = useAppSelector((state) => state.admin);

  const handleSingleDateClick = (date: Date) => {
    let selectedDate = moment(date);
    const matchedEvent = events.filter(
      (item) =>
        item.date.split("T")[0] ===
        UtcDateConverter(selectedDate.format("YYYY-MM-DD"), tZone).split("T")[0]
    );
    if (matchedEvent.length > 0) {
      setSelectedEvents(matchedEvent);
    } else {
      setSelectedEvents([]);
    }
  };

  const tmZoneHandler = (masjid: Masjid) => {
    setMasjidName(masjid.masjidName);

    const lon = masjid.location.coordinates[0];
    const lat = masjid.location.coordinates[1];

    if (lat && lon) {
      let location = tz_lookup(lat, lon);
      setTZone(location);
    }
  };

  useEffect(() => {
    if (Object.keys(AdminMasjidState).length === 0 && admin.masjids[0]) {
      const res = dispatch(fetchMasjidById(admin.masjids[0]));
      res.then((result) => {
        tmZoneHandler(result);
      });
    } else if (Object.keys(AdminMasjidState).length !== 0) {
      tmZoneHandler(AdminMasjidState);
    }
  }, [admin]);
  const handleRoute = () => {
    setEventInput(true);
    // navigate("/event/add");
  };

  //to fetch 3 months Event data
  useEffect(() => {
    if (admin.masjids[0]) {
      const startDate = moment()
        .startOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const endDate = moment()
        .add(1, "month")
        .endOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      // const res1 = dispatch(FetchEventByMasjidId(admin.masjids[0]));
      // res1.then((result: any) => {
      //   console.log("result of FetchEventByMasjidId  => ", result);
      // });
      const res = dispatch(
        FetchingEventsByDateRange(startDate, endDate, admin.masjids[0])
      );

      res.then((result: any) => {
        if (result.data.message === "Success") {
          const currentDate = moment().startOf("day");

          const matchedEvents = result.data.data.filter((item: EventType) => {
            const eventDate = moment(item.date).startOf("day");

            return eventDate.isSameOrAfter(currentDate);
          });

          matchedEvents.sort((a: any, b: any) => {
            if (a.isCancelled !== b.isCancelled) {
              return a.isCancelled ? 1 : -1;
            }

            return moment(a.date).valueOf() - moment(b.date).valueOf();
          });

          setSelectedEvents(matchedEvents);
          setEvents(result.data.data);
        }
      });
    }
  }, []);

  const tileContent = ({ date }: { date: any }) => {
    if (date) {
      const dateHasData = events.some(
        (item) =>
          item.date.split("T")[0] ===
          UtcDateConverter(moment(date).format("YYYY-MM-DD"), tZone).split(
            "T"
          )[0]
      );
      if (dateHasData) {
        return <div className="green-dot" />;
      }

      return null;
    }

    return null;
  };

  if (showEventInput)
    return (
      <>
        <Events setIsEditing={setEventInput} />
      </>
    );

  const handleDateSelect = (selectedDate: Date) => {
    // if (calendarDateType === "start") {
    //   setStartDate(formatDate(selectedDate));
    // } else {
    //   setEndDate(formatDate(selectedDate));
    // }

    // setTimeout(() => {
    //   setIsCalendarVisible(false);
    // }, 300);
    handleSingleDateClick(selectedDate);
  };

  return (
    <div className="MobileViewContainer">
      <h3 className="page-title">Events</h3>
      <div className="eventContainer">
        <div className="calbtn">
          <div className="CalendarContainer">
            <CustomCalender
              value={value}
              setValue={setValue}
              onDateSelect={handleDateSelect}
              tileContent={tileContent}
            />
          </div>
          <div className="evntbtn">
            <CustomBtn eventHandler={handleRoute} label="Add Events" />
          </div>
        </div>
        <div className="eventcards-container">
          <div className="eventcards">
            {selectedEvents.length ? (
              selectedEvents.map((event) => (
                <EventCard
                  event={event}
                  key={event._id}
                  masjidName={masjidName}
                  tZone={tZone}
                />
              ))
            ) : (
              <div
                style={{
                  marginTop: "20px",
                }}
              >
                <img src={noEventFound} alt=" No Event Found" />
                <p style={{ textAlign: "center" }}>No Upcoming Events</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsViewCalender;
