type UploadDataType = {
    title: string;
    body: string;
    masjidIds: Array<string>;
    expiresAt: string;
    priorityType: string;
};
export declare const TriggeringAnnouncement: (formData: UploadDataType) => () => Promise<any>;
export {};
//# sourceMappingURL=TriggeringAnnouncementAction.d.ts.map