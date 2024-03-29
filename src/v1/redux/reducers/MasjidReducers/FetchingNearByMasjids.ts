// reducers.ts
import { Action } from "../../Types";
import { FETCH_LOCATION, FETCH_NEARBY_MASJIDS } from "../../actiontype";

// Location Reducer
export interface LocationState {
  city: string;
  latitude: string;
  longitude: string;
}

const initialLocationState: LocationState = {
  city: "",
  latitude: "",
  longitude: "",
};

export const locationReducer = (
  state = initialLocationState,
  action: Action
): LocationState => {
  switch (action.type) {
    case FETCH_LOCATION:
      return action.payload;
    default:
      return state;
  }
};

// Nearby Masjids Reducer
export interface NearbyMasjidsState {
  nearbyMasjids: any[]; // Adjust the type based on your actual masjid data structure
}

export const initialNearbyMasjidsState: NearbyMasjidsState = {
  nearbyMasjids: [],
};

export const nearbyMasjidsReducer = (
  state = initialNearbyMasjidsState,
  action: Action
): NearbyMasjidsState => {
  switch (action.type) {
    case FETCH_NEARBY_MASJIDS:
      return { ...state, nearbyMasjids: action.payload };
    default:
      return state;
  }
};
