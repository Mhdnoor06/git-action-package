import React from "react";
interface EventDataWithPhotos {
    _id: string;
    eventName: string;
    eventPhotos: {
        url: string;
    }[];
}
interface EventDataWithFiles {
    _id: string;
    eventName: string;
    eventPhotos: File[];
}
declare const EventCarousel: React.FC<{
    eventData: EventDataWithPhotos | EventDataWithFiles | File[];
    isEditing: boolean;
}>;
export default EventCarousel;
//# sourceMappingURL=EventCarousel.d.ts.map