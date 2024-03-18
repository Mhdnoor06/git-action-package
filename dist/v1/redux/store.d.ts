declare const Store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").CombinedState<{
    admin: import("./Types").User;
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
    locationReducer: import("./reducers/MasjidReducers/FetchingNearByMasjids").LocationState;
    nearbyMasjidsReducer: import("./reducers/MasjidReducers/FetchingNearByMasjids").NearbyMasjidsState;
}>, import("./Types").Action | import("./Types").CommonActionType | import("./Types").UserActionType | import("./Types").SidebarTypeAction | import("./Types").EventActionType | {
    type: string;
    payload: string[];
}, [import("@reduxjs/toolkit").ThunkMiddleware<import("redux").CombinedState<{
    admin: import("./Types").User;
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
    locationReducer: import("./reducers/MasjidReducers/FetchingNearByMasjids").LocationState;
    nearbyMasjidsReducer: import("./reducers/MasjidReducers/FetchingNearByMasjids").NearbyMasjidsState;
}>, import("redux").AnyAction>]>;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
//# sourceMappingURL=store.d.ts.map