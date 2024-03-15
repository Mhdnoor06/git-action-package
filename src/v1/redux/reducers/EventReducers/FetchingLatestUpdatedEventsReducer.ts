import { FETCH_LATEST_UPDATED_EVENTS_BY_ADMIN } from '../../actiontype';
import { EventActionType } from "../../Types";
const FetchingLatestUpdatedEventsReducer =  (latestAdminEvents = [] , action:EventActionType) => {
 
   switch (action.type) {
    case FETCH_LATEST_UPDATED_EVENTS_BY_ADMIN:
      
      return action.payload;

    default:
      return latestAdminEvents;
  }
};

export default FetchingLatestUpdatedEventsReducer;