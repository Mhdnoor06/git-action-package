import { Dispatch, SetStateAction } from "react";
import "./EventPageFormComponent.css";
import { EventType } from "../../../../redux/Types";
type propsType = {
    ComponentPurpose: string;
    EventDetails: EventType | undefined;
    setEventDetails?: Dispatch<SetStateAction<EventType | undefined>>;
    setIsUpdating?: Dispatch<SetStateAction<boolean>>;
    setAddingEvent?: Dispatch<SetStateAction<boolean>>;
    setEventPhotos?: any;
    EventPhotos?: any;
    AddingEvent?: boolean;
};
declare const EventPageFormComponent: ({ ComponentPurpose, EventDetails, setAddingEvent, AddingEvent, setEventDetails, setIsUpdating, setEventPhotos, EventPhotos, }: propsType) => JSX.Element;
export default EventPageFormComponent;
//# sourceMappingURL=EventPageFormComponent.d.ts.map