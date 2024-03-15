import * as api from '../../../api-calls/index';
import { NamajTiming } from '../../Types';

export const addTimingByRange = (startDate:string,endDate:string,Data:NamajTiming<number>[],masjidId:string) => async() => {


    try{
   
      const { data } = await api.addTimingsByRange(startDate,endDate,Data,masjidId);

      if(data.message === "Timings added")
      {
         return data;
      }
      return data;

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