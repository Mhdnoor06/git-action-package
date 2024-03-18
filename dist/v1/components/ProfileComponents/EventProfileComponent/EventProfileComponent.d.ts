import { Dispatch, SetStateAction } from "react";
import "./EventProfileComponent.css";
import { EventType } from "../../../redux/Types";
type propsType = {
    EventDetails: EventType;
    setIsUpdating: Dispatch<SetStateAction<boolean>>;
    EventPhotos: {
        url: string;
    }[];
    CurrentEventDetails: EventType | undefined;
    AdminMasjid: any;
};
declare const EventProfileComponent: ({ EventDetails, setIsUpdating, EventPhotos, CurrentEventDetails, AdminMasjid, }: propsType) => JSX.Element;
export default EventProfileComponent;
//# sourceMappingURL=EventProfileComponent.d.ts.map