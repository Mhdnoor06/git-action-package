import React, { useState, useEffect } from "react";
import "./EventsViewCalender.css";
import "react-calendar/dist/Calendar.css";
import tz_lookup from "tz-lookup";
import moment from "moment";
import noEventFound from "../../../../photos/Newuiphotos/BG/no events.svg";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";
import EventCard from "../Card/EventCard";
import { FetchingEventsByDateRange } from "../../../../redux/actions/EventActions/FetchingEventsByDateRange";
import { EventType, Masjid } from "../../../../redux/Types";
import {
  customNavigatorTo,
  LocationBasedToday,
  UtcDateConverter,
} from "../../../../helpers/HelperFunction";
import { fetchMasjidById } from "../../../../redux/actions/MasjidActions/fetchMasjidById";
import Events from "../Events";
import CustomCalender from "../../Shared/calendar/CustomCalender";
import CustomBtn from "../../Shared/CustomBtn";
import ProgressLoader from "../../Shared/Loader/Loader";
import BackButton from "../../Shared/BackButton";
import { useNavigationprop } from "../../../../../MyProvider";

type EventsViewCalenderProps = {
  consumerMasjidId: string;
  isMainAdmin?: boolean;
};

interface CombinedEvents {
  recursive: { [key: string]: EventType[] };
  single: EventType[];
}

const EventsViewCalender = ({
  consumerMasjidId,
  isMainAdmin = false,
}: EventsViewCalenderProps) => {
  const navigation = useNavigationprop();

  const dispatch = useAppThunkDispatch();
  const [showNewEventForm, setShowNewEventForm] = useState<boolean>(false);
  const [tZone, setTZone] = useState("");
  const [masjidName, setMasjidName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
  const [allEvents, setAllEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const initialDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [combinedEvents, setCombinedEvents] = useState<CombinedEvents>();

  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);

  let admin = useAppSelector((state) => state.admin);

  const handleSingleDateClick = (date: Date) => {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    const matchedEvents: any = [];

    // Check single events
    combinedEvents?.single.forEach((event) => {
      if (
        event.date.split("T")[0] ===
        UtcDateConverter(formattedDate, tZone).split("T")[0]
      ) {
        matchedEvents.push(event);
      }
    });

    // Check recurring events
    Object.values(combinedEvents?.recursive || {}).forEach(
      (recurrenceGroup) => {
        recurrenceGroup.forEach((event) => {
          if (
            event.date.split("T")[0] ===
            UtcDateConverter(formattedDate, tZone).split("T")[0]
          ) {
            matchedEvents.push(event);
          }
        });
      }
    );

    setSelectedEvents(matchedEvents.length > 0 ? matchedEvents : []);
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
    if (tZone) {
      const todayInTZone = LocationBasedToday(tZone);
      setSelectedDate(todayInTZone);
    }
  }, [tZone]);

  useEffect(() => {
    if (Object.keys(AdminMasjidState).length === 0 && consumerMasjidId) {
      const res = dispatch(fetchMasjidById(consumerMasjidId));
      res.then((result) => {
        tmZoneHandler(result);
      });
    } else if (Object.keys(AdminMasjidState).length !== 0) {
      tmZoneHandler(AdminMasjidState);
    }
  }, [admin]);

  // to fetch 3 months Event data
  useEffect(() => {
    if (consumerMasjidId && tZone) {
      const startDate = moment()
        .startOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const endDate = moment()
        .endOf("year")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      const res = dispatch(
        FetchingEventsByDateRange(startDate, endDate, consumerMasjidId)
      );
      setIsLoading(true);

      res.then((result: any) => {
        if (result.data.message === "Success") {
          const currentDate = moment().tz(tZone).startOf("day");

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

          // setSelectedEvents(matchedEvents);
          setAllEvents(result.data.data);
          setIsLoading(false);

          let fetchedEvents = result.data.data;
          let combinedEvents: CombinedEvents = {
            recursive: {},
            single: [],
          };

          fetchedEvents.forEach((event) => {
            const eventEndDate = moment(event.metaData.endDate);
            if (eventEndDate.isSameOrAfter(currentDate)) {
              if (event.metaData.recurrenceType === "none") {
                combinedEvents.single.push(event);
              } else {
                let recurrenceId = event.metaData.recurrenceId || "unknown";
                if (!combinedEvents.recursive[recurrenceId]) {
                  combinedEvents.recursive[recurrenceId] = [];
                }
                combinedEvents.recursive[recurrenceId].push(event);
              }
            }
          });
          setCombinedEvents(combinedEvents);

          Object.keys(combinedEvents.recursive).forEach((recurrenceId) => {
            let dates = combinedEvents.recursive[recurrenceId].map(
              (event) => event.date
            ); // Collect all dates
            combinedEvents.recursive[recurrenceId][0].dates = dates;
          });
        }
      });
    }
  }, [consumerMasjidId, tZone]);

  const tileContent = ({ date }: { date: any }) => {
    if (date) {
      const dateHasData = allEvents.some(
        (item) =>
          item.date.split("T")[0] ===
          UtcDateConverter(moment(date).format("YYYY-MM-DD"), tZone).split(
            "T"
          )[0]
      );

      if (dateHasData) {
        return <div className="green-dot" data-testid="green-dot" />;
      }

      return null;
    }

    return null;
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = LocationBasedToday(tZone);
    currentDate.setHours(0, 0, 0, 0);

    // Set the provided date's time component to 00:00:00
    const providedDate = new Date(date);
    providedDate.setHours(0, 0, 0, 0);

    // Disable if the date is before the current date (but not if it's the current date)
    return providedDate < currentDate;
  };

  if (showNewEventForm)
    return (
      <>
        <Events
          isMainAdmin={isMainAdmin}
          setIsEditing={setShowNewEventForm}
          consumerMasjidId={consumerMasjidId}
        />
      </>
    );

  const handleDateSelect = (selectedDate: Date) => {
    handleSingleDateClick(selectedDate);
  };

  const renderEvents = () => {
    if (selectedEvents.length > 0) {
      return selectedEvents.map((event) => (
        <EventCard
          masjidId={consumerMasjidId}
          event={event}
          key={event._id}
          masjidName={masjidName}
          tZone={tZone}
          isRecurring={event.metaData.recurrenceType !== "none"}
        />
      ));
    } else if (
      combinedEvents &&
      (Object.keys(combinedEvents.recursive).length > 0 ||
        combinedEvents.single.length > 0)
    ) {
      return (
        <>
          {Object.keys(combinedEvents.recursive).map((recurrenceId) => (
            <EventCard
              masjidId={consumerMasjidId}
              event={combinedEvents.recursive[recurrenceId][0]}
              key={recurrenceId}
              masjidName={masjidName}
              tZone={tZone}
              isRecurring={true}
            />
          ))}
          {combinedEvents.single.map((event) => (
            <EventCard
              masjidId={consumerMasjidId}
              event={event}
              key={event._id}
              masjidName={masjidName}
              tZone={tZone}
              isRecurring={false}
            />
          ))}
        </>
      );
    }
    return (
      <div style={{ marginTop: "20px" }}>
        <img src={noEventFound} alt="No Event Found" />
        <p style={{ textAlign: "center" }}>No Upcoming Events</p>
      </div>
    );
  };

  return (
    <div className="MobileViewContainer">
      <div>
        <div className="goback">
          <BackButton
            handleBackBtn={navigation ? navigation : customNavigatorTo}
          />
        </div>
        <h3 className="page-title">Events</h3>
      </div>

      <div className="eventContainer">
        <div className="calbtn">
          <div className="CalendarContainer">
            <CustomCalender
              value={selectedDate}
              setValue={setSelectedDate}
              onDateSelect={handleDateSelect}
              tileContent={tileContent}
              minDate={LocationBasedToday(tZone)}
              tileDisabled={tileDisabled}
            />
          </div>
          <div className="evntbtn">
            <CustomBtn
              eventHandler={() => {
                setShowNewEventForm(true);
              }}
              label="Add Events"
            />
          </div>
        </div>

        {isLoading ? (
          <ProgressLoader />
        ) : (
          <div className="eventcards-container custom-scrollbar">
            <div className="eventcards">{renderEvents()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsViewCalender;
