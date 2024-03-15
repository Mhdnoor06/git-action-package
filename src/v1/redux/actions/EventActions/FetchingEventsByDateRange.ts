import { AUTH_LOGIN } from '../../actiontype';
import * as api from '../../../api-calls/index';

export const FetchingEventsByDateRange = (startDate:string,endDate:string,masjidId:string) => async() => {

    try{

      let response = await api.getEventsByDateRange(startDate,endDate,masjidId);
      // console.log(response)
    //   if(response=== null)
    //  {
     
    //     return response;
    //   }
      return response;

    }    
    catch(error:any)
   {
    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Login:SomeThing Went Wrong"
     }; 
     return result;
   }
}