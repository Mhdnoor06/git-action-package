import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import "./EventPageCarouselComponent.css";
import DatePicker from "react-date-picker";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { DatePicker as SingleDatePicker } from "@material-ui/pickers";
import { Badge } from "@material-ui/core";
import { FetchingEventsByDateRange } from "../../../../redux/actions/EventActions/FetchingEventsByDateRange";
import { FetchingCancelledEvents } from "../../../../redux/actions/EventActions/FetchingCancelledEventsAction";
import { Link } from "react-router-dom";
import BackButton from "../../../../photos/BackButton.png";
import NoImgFound from "../../../../photos/NoImgFound.png";
import { fetchMasjidById } from "../../../../redux/actions/MasjidActions/fetchMasjidById";
import NoEventAvaliable from "../../../../photos/NoEventAvaliable.png";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { EventType, Masjid, ResponseType } from "../../../../redux/Types";
type EventDaysType = { date: string; end: string; id: string };
type propsType = {
  MasjidEventsData: ResponseType;
  EventDays: EventDaysType[];
  CurrentMonthEventDays: number[];
  setCancelledEvents:Dispatch<SetStateAction<never[]>>;
  setViewWingCancelledEvents:Dispatch<SetStateAction<boolean>>;
  ViewWingCancelledEvents:boolean;
  SetCurrentDayEvents:Dispatch<SetStateAction<EventType[]>>;
  setCurrentMonthEventDays:Dispatch<SetStateAction<number[]>>;
  setMasjidEventsData:Dispatch<SetStateAction<any>>;
  setEventDays:Dispatch<SetStateAction<EventDaysType[]>>;
};
const EventPageCarouselComponent = ({
  MasjidEventsData,
  EventDays,
  CurrentMonthEventDays,
  setCancelledEvents,
  setViewWingCancelledEvents,
  ViewWingCancelledEvents,
  SetCurrentDayEvents,
  setCurrentMonthEventDays,
  setMasjidEventsData,
  setEventDays,
}: propsType) => {
  const [mazjidId, setmazjidId] = useState();
  const [AdminMasjid, setAdminMasjid] = useState<any>();
  const [Value, setValue] = useState<MaterialUiPickersDate>(new Date());
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const LatestAdminEvents = useAppSelector((state) => state.latestAdminEvents);
  const [SelectedDayEvents, setSelectedDayEvents] = useState<EventType[]>([]);
  const [EventExists, setEventExists] = useState(false);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  // const Mazjid = JSON.parse(localStorage.getItem('admin'));
  let Mazjid = useAppSelector((state) => state.admin);

  useEffect(() => {
    let MazjidId = Mazjid.masjids[0];
    setmazjidId(MazjidId);
  }, [mazjidId]);

  useEffect(() => {
    if(Mazjid.masjids[0]){

      const response = dispatch(fetchMasjidById(Mazjid.masjids[0]));
      response.then((result) => {
        if (result.message === "Success") {
          setAdminMasjid(result.data);
        }
      });
    }
  }, [mazjidId]);
  // (date: MaterialUiPickersDate) => void | Promise<void>
  const handleMonthChange = (
    e: MaterialUiPickersDate
  ): void | Promise<void> => {
    const startDate = moment(e).startOf("month").format("YYYY-MM-DD");
    const endDate = moment(e).endOf("month").format("YYYY-MM-DD");
    const res = dispatch(
      FetchingEventsByDateRange(startDate, endDate, AdminMasjid?._id ?? "")
    );

    res.then((result: any) => {
      if (result.data.length > 0) {
        let CurrentMonthEventDay: number[] = [];
        let CurrentEventDays: any[] = [];
        const TodaysDate = moment(e).format("YYYY-MM-DD") + "T00:00:00.000Z";
        let TodaysEvents: EventType[] = [];
        result.data.map((value: EventType) => {
          value.timings.map((item) => {
            let startDay = new Date(item.startTime);
            let EndDay = new Date(item.endTime);
            if (
              startDay.toISOString() === TodaysDate ||
              EndDay.toISOString() === TodaysDate
            ) {
              TodaysEvents.push(value);
            }
            if (!CurrentEventDays.includes(item.startTime, item.endTime)) {
              let dataPush = {
                date: item.startTime,
                end: item.endTime,
                id: value._id,
              };
              CurrentEventDays.push(dataPush);
            }

            //previous logic

            // if (item.startTime === TodaysDate || item.endDate === TodaysDate) {
            //   TodaysEvents.push(value);
            // }
            // Day = new Date(item.startTime);
            // EndDay = new Date(item.endDate);

            // if (!CurrentEventDays.includes(item.startDate, item.endDate)) {
            //   let dataPush = {
            //     date: item.startDate,
            //     end: item.endDate,
            //     id: value._id,
            //   };
            //   CurrentEventDays.push(dataPush);
            // }

            if (
              !CurrentMonthEventDay.includes(startDay.getDate()) ||
              !CurrentMonthEventDay.includes(EndDay.getDate())
            ) {
              CurrentMonthEventDay.push(startDay.getDate());
              CurrentMonthEventDay.push(EndDay.getDate());
            }
          });

          SetCurrentDayEvents(TodaysEvents);
          setCurrentMonthEventDays(CurrentMonthEventDay);
        });
        setEventDays(CurrentEventDays);
        setMasjidEventsData(result.data);
      } else {
        setMasjidEventsData([]);
        setCurrentMonthEventDays([]);
        setCurrentMonthEventDays([]);
      }
    });

    const response = dispatch(
      FetchingCancelledEvents("updatedAt", "desc", AdminMasjid?._id ?? "")
    );
    response.then((result: ResponseType) => {
      if (result.success) {
        setCancelledEvents(result.data);
      } else {
        setCancelledEvents([]);
      }
    });
  };

  const handleEventCardClick = (item: EventType) => {
    navigate("/eventprofile/" + item._id);
  };

  useEffect(() => {
    if (MasjidEventsData?.status === 200) {
      let currentDateFormat =
        moment(Value).format("YYYY-MM-DD") + "T00:00:00.000Z";

      let filteredData = [];
      filteredData = EventDays.filter((item, key) => {
        return (
          item.date === currentDateFormat || item.end === currentDateFormat
        );
      });

      let Events: EventType[] = [];

      if (filteredData.length > 0) {
        for (let value of filteredData) {
          Events.push(
            MasjidEventsData.data.data.filter(
              (item: EventType) => item._id === value.id
            )
          );
        }
      }

      setSelectedDayEvents(Events);

      if (SelectedDayEvents?.length > 0) {
        setEventExists(true);
      } else {
        setEventExists(false);
      }
    }
  }, [EventDays, MasjidEventsData, Value]);

  // console.log(SelectedDayEvents)

  return (
    <>
      <div className="TopContainerForBackAndView">
        <div className="MazjidBackToMainPage">
          <Link to="/feed" style={{ textDecoration: "none", color: "white" }}>
            <img
              src={BackButton}
              alt="Profile Icon"
              className="BackBtnToHome"
            />
          </Link>
        </div>
        <div
          className="ViewFullEventsForMain"
          onClick={(e) => {
            setViewWingCancelledEvents(!ViewWingCancelledEvents);
          }}
        >
          <span className="FeedTimingsTitleViewAll">View Full Events</span>
        </div>
      </div>
      <div className="MasjidEventsContainerBottom">
        {/* <div className="MasjidEventsPageBottomTopContainer"> */}
        {/* <div className="EventsBottomTitleLeft">
            
          </div> */}
        {/* <div className="EventsBottomTitleRight"> */}
        {/*  */}
        {/* <button
              className="MasjidCancelledEvents"
              onClick={(e) => {
                setViewWingCancelledEvents(!ViewWingCancelledEvents);
              }}
            >
              <span className="MasjidAddEventSentenceCancelled">
                Cancelled Events
              </span>
            </button> */}
        {/* </div> */}

        <div className="MasjidEventsCarouselContainer">
          <span className="EventsPageTitle">Upcoming Events</span>
          <span className="CurrentTimings">
            {moment(Value).format("Do MMM,YYYY")}
          </span>
          <div className="EventCard">
            {SelectedDayEvents?.length > 0 ? (
              SelectedDayEvents?.map((item) => {
                return (
                  <>
                    <div
                      className="EventCarouselCard"
                      onClick={(e) => {
                        handleEventCardClick(item);
                      }}
                    >
                      <div className="PhotosofMazjid">
                        {AdminMasjid?.masjidPhotos?.length > 0 &&
                        AdminMasjid?.masjidPhotos[0]?.url ? (
                          <>
                            <span className="MazjidPhoto">
                              {/* <img src={AdminMasjid?.masjidPhotos[0]?.url}/> */}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="MazjidPhoto">
                              {/* <img src={NoImgFound}/> */}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="NameofMazjidandEvent">
                        <span className="EventCarouselCardTitle">
                          {item.eventName}
                        </span>
                        <span className="MazjidStartDate">
                          {moment(item?.metaData?.startDate).format(
                            "DD-MM-YYYY"
                          )}
                        </span>
                      </div>
                      <div className="MazjidnameAndTime">
                        <span className="EventCarouselCardTime">
                          {moment(item?.timings[0]?.startTime).format(
                            "hh:mm A"
                          )}{" "}
                          -{" "}
                          {moment(item?.timings[0]?.endTime).format("hh:mm A")}
                        </span>
                        <span className="mazjidName">
                          {AdminMasjid?.masjidName}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <div className="NoEventsAvailable">
                  <img src={NoEventAvaliable} className="NoEventAvaliable" />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="EventPageLeftContainer">
          <SingleDatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            format="dd/MM/yyyy"
            minDate={new Date()}
            // sx={{ marginTop: 1 }}
            label="Event Start Date "
            value={Value}
            onChange={setValue}
            onMonthChange={handleMonthChange}
            renderDay={(
              day,
              selectedDate: MaterialUiPickersDate,
              isInCurrentMonth: boolean,
              dayComponent: any
              // days
            ) => {
              const isSelected =
                isInCurrentMonth &&
                day &&
                CurrentMonthEventDays?.includes(day?.getDate());

              return (
                <Badge
                  key={day?.toString()}
                  overlap={"circle"}
                  badgeContent={
                    isSelected && (
                      <div
                        style={{
                          height: "5px",
                          width: "5px",
                          borderRadius: "100%",
                          background: "green",
                        }}
                      />
                    )
                  }
                >
                  {dayComponent}
                </Badge>
              );
            }}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default EventPageCarouselComponent;
