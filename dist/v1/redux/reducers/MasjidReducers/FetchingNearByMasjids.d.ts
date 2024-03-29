import { Action } from "../../Types";
export interface LocationState {
    city: string;
    latitude: string;
    longitude: string;
}
export declare const locationReducer: (state: LocationState | undefined, action: Action) => LocationState;
export interface NearbyMasjidsState {
    nearbyMasjids: any[];
}
export declare const initialNearbyMasjidsState: NearbyMasjidsState;
export declare const nearbyMasjidsReducer: (state: NearbyMasjidsState | undefined, action: Action) => NearbyMasjidsState;
//# sourceMappingURL=FetchingNearByMasjids.d.ts.map