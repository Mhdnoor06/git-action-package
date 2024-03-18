declare const indexReducer: import("redux").Reducer<import("redux").CombinedState<{
    admin: import("../Types").User;
    selectedDate: string[];
    latestAdminEvents: any;
    AdminMasjid: any;
    masjid: any;
    snackBarState: {
        snackbarOpen: boolean;
        snackbarType: string;
        snackbarMessage: string;
    };
    latestAnnouncements: any;
    EventCompletion: any;
    locationReducer: import("./MasjidReducers/FetchingNearByMasjids").LocationState;
    nearbyMasjidsReducer: import("./MasjidReducers/FetchingNearByMasjids").NearbyMasjidsState;
}>, import("../Types").Action | import("../Types").CommonActionType | import("../Types").UserActionType | import("../Types").SidebarTypeAction | import("../Types").EventActionType | {
    type: string;
    payload: string[];
}>;
export default indexReducer;
//# sourceMappingURL=IndexReducer.d.ts.map