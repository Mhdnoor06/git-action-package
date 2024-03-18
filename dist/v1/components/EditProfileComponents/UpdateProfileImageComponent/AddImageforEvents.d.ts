import { Dispatch, SetStateAction } from "react";
import "./FileUploadEvent.scss";
type propsType = {
    EventId: string;
    MasjidId: string;
    eventPhotos: any;
    setEventsPhotos: any;
    DraggedImage: File | undefined;
    UploadAllow?: boolean;
    setEventUploadPhoto: Dispatch<SetStateAction<File | undefined>>;
    setMasjidUploadPhoto: Dispatch<SetStateAction<File | undefined>>;
};
declare const FileUploadEvent: ({ EventId, MasjidId, eventPhotos, setEventsPhotos, DraggedImage, UploadAllow, setEventUploadPhoto, setMasjidUploadPhoto, }: propsType) => JSX.Element;
export default FileUploadEvent;
//# sourceMappingURL=AddImageforEvents.d.ts.map