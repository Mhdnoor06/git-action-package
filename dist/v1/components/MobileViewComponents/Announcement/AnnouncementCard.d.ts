/// <reference types="react" />
type announcement = {
    id: string | undefined;
    title: string | undefined;
    body: string | undefined;
    createdAt: string | undefined;
};
type PropsType = {
    handleAnnouncement: () => void;
    detailView?: boolean;
    title?: string;
    description?: string;
    announcementData?: announcement | undefined;
};
declare function AnnouncementCard({ handleAnnouncement, detailView, title, description, announcementData, }: PropsType): JSX.Element;
export default AnnouncementCard;
//# sourceMappingURL=AnnouncementCard.d.ts.map