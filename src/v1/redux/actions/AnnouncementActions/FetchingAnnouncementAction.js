import * as api from '../../../api-calls/index';
import { FETCH_LATEST_UPDATED_ANNOUNCEMENTS_BY_ADMIN } from '../../actiontype';


export const FetchingAnnouncementNotification = (limit,page,sortBy) => async(dispatch) => {

    try{
      const { data } = await api.fetchingAnnouncement(limit,page,sortBy);
     
      if(data.success)
      {
        dispatch({type:"FETCH_LATEST_UPDATED_ANNOUNCEMENTS_BY_ADMIN" , payload: data.data})

        return data;
      }
      return data;
    }    
    catch(error)
     {
      
        let result ={
            success:false,
            message:error.response.data.message? error.response.data.message: "Failed To Send Notification:SomeThing Went Wrong"
         }; 
         return result;
   }
}