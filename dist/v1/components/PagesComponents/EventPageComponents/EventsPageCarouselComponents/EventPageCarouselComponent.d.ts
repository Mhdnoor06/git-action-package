import { Dispatch, SetStateAction } from "react";
import "./EventPageCarouselComponent.css";
import { EventType, ResponseType } from "../../../../redux/Types";
type EventDaysType = {
    date: string;
    end: string;
    id: string;
};
type propsType = {
    MasjidEventsData: ResponseType;
    EventDays: EventDaysType[];
    CurrentMonthEventDays: number[];
    setCancelledEvents: Dispatch<SetStateAction<never[]>>;
    setViewWingCancelledEvents: Dispatch<SetStateAction<boolean>>;
    ViewWingCancelledEvents: boolean;
    SetCurrentDayEvents: Dispatch<SetStateAction<EventType[]>>;
    setCurrentMonthEventDays: Dispatch<SetStateAction<number[]>>;
    setMasjidEventsData: Dispatch<SetStateAction<any>>;
    setEventDays: Dispatch<SetStateAction<EventDaysType[]>>;
};
declare const EventPageCarouselComponent: ({ MasjidEventsData, EventDays, CurrentMonthEventDays, setCancelledEvents, setViewWingCancelledEvents, ViewWingCancelledEvents, SetCurrentDayEvents, setCurrentMonthEventDays, setMasjidEventsData, setEventDays, }: propsType) => JSX.Element;
export default EventPageCarouselComponent;
//# sourceMappingURL=EventPageCarouselComponent.d.ts.map