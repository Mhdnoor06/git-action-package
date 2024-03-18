import React, { SetStateAction, Dispatch } from "react";
import "./events.css";
import { EventType } from "../../../redux/Types";
import "react-datepicker/dist/react-datepicker.css";
type propsType = {
    setIsEditing?: Dispatch<SetStateAction<boolean>>;
    isFormDetailsPage?: boolean;
    eventData?: EventType;
    setUpload?: React.Dispatch<React.SetStateAction<boolean>>;
};
declare const Events: ({ setIsEditing, isFormDetailsPage, eventData, setUpload, }: propsType) => JSX.Element;
export default Events;
//# sourceMappingURL=Events.d.ts.map