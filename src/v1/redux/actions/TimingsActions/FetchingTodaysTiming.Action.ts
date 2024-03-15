import { AUTH_LOGIN } from '../../actiontype';
import * as API from '../../../ClientApi-Calls/index';//src\v1\ClientApi-Calls
// import * as api from '../../../api-calls/index';

export const FetchingTimingsByDate = (masjidId:string,date:string) => async() => {

    try{

      let response = await API.getTimingsByDate(masjidId,date);
      let validResponse = response.data.data;
        return validResponse;

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