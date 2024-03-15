import { combineReducers } from "redux";

import LoginReducer from "./AuthReducers/LoginReducer";
import FetchingLatestUpdatedEventsReducer from "./EventReducers/FetchingLatestUpdatedEventsReducer";
import FetchMasjidsByAdminReducer from "./MasjidReducers/FetchingMasjidReducer";
import FetchingAnnouncementReducer from "./AnnouncementReducers/FetchingAnnouncementReducer";
import CompletionEventReducer from "./EventReducers/EventCompletionReducer";
import ChangeSnackbarReducer from "./SnackbarReducers/ChangeSnackbarReducer";
import TimingReducer from "./TimingReducer/TimingReducer";
import masjidReducer from "./MasjidReducers/FetchingMasjidReducer";
import {
  locationReducer,
  nearbyMasjidsReducer,
} from "./MasjidReducers/FetchingNearByMasjids";

const indexReducer = combineReducers({
  admin: LoginReducer,
  selectedDate: TimingReducer,
  latestAdminEvents: FetchingLatestUpdatedEventsReducer,
  AdminMasjid: FetchMasjidsByAdminReducer,
  masjid: masjidReducer,
  snackBarState: ChangeSnackbarReducer,
  latestAnnouncements: FetchingAnnouncementReducer,
  EventCompletion: CompletionEventReducer,
  locationReducer: locationReducer,
  nearbyMasjidsReducer: nearbyMasjidsReducer,
});

export default indexReducer;
