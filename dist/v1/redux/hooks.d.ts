import { TypedUseSelectorHook } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "./store";
export declare const useAppDispatch: () => ThunkDispatch<import("redux").CombinedState<{
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
}>, undefined, import("redux").AnyAction> & import("redux").Dispatch<import("./Types").Action | import("./Types").CommonActionType | import("./Types").UserActionType | import("./Types").SidebarTypeAction | import("./Types").EventActionType | {
    type: string;
    payload: string[];
}>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export declare const useAppThunkDispatch: () => ThunkAppDispatch;
//# sourceMappingURL=hooks.d.ts.map