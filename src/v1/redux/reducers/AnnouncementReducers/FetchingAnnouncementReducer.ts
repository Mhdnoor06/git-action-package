
import { CommonActionType } from '../../Types';
import { FETCH_LATEST_UPDATED_ANNOUNCEMENTS_BY_ADMIN } from '../../actiontype';

const FetchingAnnouncementReducer =  (latestAdminEvents = [] , action:CommonActionType) => {
 
   switch (action.type) {
    case FETCH_LATEST_UPDATED_ANNOUNCEMENTS_BY_ADMIN:
      
      return action.payload;

    default:
      return latestAdminEvents;
  }
};

export default FetchingAnnouncementReducer;