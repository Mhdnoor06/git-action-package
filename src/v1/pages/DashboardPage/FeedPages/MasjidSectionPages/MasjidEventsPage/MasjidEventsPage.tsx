import React, { useState, useEffect, useRef } from "react";
import "./MasjidEventPage.css";
import EventPageCarouselComponent from "../../../../../components/PagesComponents/EventPageComponents/EventsPageCarouselComponents/EventPageCarouselComponent";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router";
import EventPageFormComponent from "../../../../../components/PagesComponents/EventPageComponents/EventPageFormCompoenents/EventPageFormComponent";
import EventLogo from "../../../../../photos/Admin portal orange icon/Mask group.png";
import { useDispatch, useSelector } from "react-redux";
import { FetchingEventsByDateRange } from "../../../../../redux/actions/EventActions/FetchingEventsByDateRange";
import moment from "moment";
import CancelledPageCarouselComponent from "../../../../../components/PagesComponents/EventPageComponents/CancelledPageCarouselComponents/CancelledPageCarouselComponent";
// import { FetchingCancelledEvents } from "../../../../../redux/actions/EventActions/FetchingCancelledEventsAction";

import CardCarousel from "../../../../../components/Feedcomponents/FeedCardCarousel/CardCarousel.js";
import {
  useAppSelector,
  useAppThunkDispatch,
} from "../../../../../redux/hooks";
import { EventType, ResponseType } from "../../../../../redux/Types";

const MasjidEventsPage = () => {
  let admin = useAppSelector((state) => state.admin);
  const [AddingEvent, setAddingEvent] = useState(false);
  const [ViewWingCancelledEvents, setViewWingCancelledEvents] = useState(false);
  const [CancelledEvents, setCancelledEvents] = useState([]);
  const [Events, setEvents] = useState([]);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  const today = new Date();
  const startDate = moment(today).startOf("month").format("YYYY-MM-DD");
  const endDate = moment(today).endOf("month").format("YYYY-MM-DD");
  const [MasjidEventsData, setMasjidEventsData] = useState<any>();
  const [CurrentMonthEventDays, setCurrentMonthEventDays] = useState<number[]>(
    []
  );
  type EventDaysType = { date: string; end: string; id: string };
  const [EventDays, setEventDays] = useState<EventDaysType[]>([]);
  const [CurrentDayEvents, SetCurrentDayEvents] = useState<EventType[]>([]);
  const [AdminMasjid, setAdminMasjid] = useState();

  useEffect(() => {
    let MazjidId = admin.masjids[0];
    setAdminMasjid(MazjidId);
  }, [AdminMasjid, admin]);

  useEffect(() => {
    if (AdminMasjid) {
      console.log(AdminMasjid);
      const res = dispatch(
        FetchingEventsByDateRange(startDate, endDate, AdminMasjid)
      );

      res.then((result: any) => {
        if (result.status === 200) {
          let CurrentMonthEventDay: number[] = [];
          let CurrentEventDays:
            | any
            | { date: string; end: string; id: string }[] = [];
          const TodaysDate =
            moment(today).format("YYYY-MM-DD") + "T00:00:00.000Z";
          let TodaysEvents: EventType[] = [];
          result.data.data.map((value: EventType) => {
            // console.log(value.metaData.startDate)
            let Day;
            let EndDay;
            // value.metaData.map((item, key) => {
            //   console.log(item)
            // let startDate = moment(item?.startTime).format("T00:00:00.000Z");
            // console.log(startDate,TodaysDate)
            if (
              value.metaData.startDate === TodaysDate ||
              value.metaData.endDate === TodaysDate
            ) {
              TodaysEvents.push(value);
            }
            Day = new Date(value.metaData.startDate);
            EndDay = new Date(value.metaData.endDate);

            // console.log(item);

            if (
              !CurrentEventDays.includes(
                value.metaData.startDate,
                value.metaData.endDate
              )
            ) {
              let dataPush = {
                date: value.metaData.startDate,
                end: value.metaData.endDate,
                id: value._id,
              };
              CurrentEventDays.push(dataPush);
            }

            if (
              !CurrentMonthEventDay.includes(Day.getDate()) ||
              !CurrentMonthEventDay.includes(EndDay.getDate())
            ) {
              CurrentMonthEventDay.push(Day.getDate());
              CurrentMonthEventDay.push(EndDay.getDate());
            }

            SetCurrentDayEvents(TodaysEvents);
            setCurrentMonthEventDays(CurrentMonthEventDay);
          });
          setEventDays(CurrentEventDays);
          setMasjidEventsData(result);
        } else {
          setMasjidEventsData(undefined);
        }
      });
    }
  }, [AdminMasjid]);

  return (
    <>
      <div className="MasjidEventsContainer">
        <div className="MasjidEventParentContainer">
          <div className="MasjidEventsPageBottomContainer">
            {!ViewWingCancelledEvents ? (
              <EventPageCarouselComponent
                MasjidEventsData={MasjidEventsData}
                EventDays={EventDays}
                CurrentMonthEventDays={CurrentMonthEventDays}
                // CurrentDayEvents={CurrentDayEvents}
                setViewWingCancelledEvents={setViewWingCancelledEvents}
                ViewWingCancelledEvents={ViewWingCancelledEvents}
                setCancelledEvents={setCancelledEvents}
                SetCurrentDayEvents={SetCurrentDayEvents}
                setCurrentMonthEventDays={setCurrentMonthEventDays}
                setEventDays={setEventDays}
                setMasjidEventsData={setMasjidEventsData}
              />
            ) : (
              <CancelledPageCarouselComponent
                CancelledEvents={CancelledEvents}
                setViewWingCancelledEvents={setViewWingCancelledEvents}
                MasjidEventsData={MasjidEventsData}
              />
            )}

            {AddingEvent ? (
              <div className="AddingEventPopup">
                <EventPageFormComponent
                  ComponentPurpose={"Add"}
                  setAddingEvent={setAddingEvent}
                  AddingEvent={AddingEvent}
                  EventDetails={MasjidEventsData}
                />
              </div>
            ) : null}
            {!ViewWingCancelledEvents ? (
              <div className="MasjidEventsContainerAddSection">
                <button
                  className="MasjidAddEventContainer"
                  onClick={(e) => {
                    setAddingEvent(true);
                  }}
                >
                  <span className="MasjidAddEventSentence">Add Events</span>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MasjidEventsPage;
