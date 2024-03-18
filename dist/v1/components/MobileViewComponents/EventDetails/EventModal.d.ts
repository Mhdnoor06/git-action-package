import { Dispatch, SetStateAction } from "react";
import { EventType } from "../../../redux/Types";
type propsType = {
    OpenOn: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    eventData: EventType;
};
declare const EventModal: ({ OpenOn, setIsEditing, eventData }: propsType) => JSX.Element;
export default EventModal;
//# sourceMappingURL=EventModal.d.ts.map