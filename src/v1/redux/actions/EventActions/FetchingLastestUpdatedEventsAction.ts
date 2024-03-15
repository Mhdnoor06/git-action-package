import * as api from '../../../api-calls/index';
import {ChangeSnackbar} from '../SnackbarActions/ChangeSnackbarAction.js'
import { FETCH_LATEST_UPDATED_EVENTS_BY_ADMIN } from '../../actiontype';


// export const FetchingLatestUpdatedEventsById = (id,limit) => async(dispatch) => {

//     try{
    
//       const { data } = await api.fetchLatestUpdatedEventsByAdminId(id,limit);

//       if(data.success)
//       {
//          dispatch({type:"FETCH_LATEST_UPDATED_EVENTS_BY_ADMIN" , payload: data.data})

//          return data;
//        }

//      return data;
//     }    
//     catch(error)
//    {
     
//     let result ={
//         success:false,
//         message:error.response.data.message? error.response.data.message: "Failed To Fetch Events : SomeThing Went Wrong"
//      }; 
//      return result;

//    }
// }