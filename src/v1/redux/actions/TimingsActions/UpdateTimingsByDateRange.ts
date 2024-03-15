import * as api from '../../../api-calls/index';
import { NamajTiming } from '../../Types';



export const UpdateTimingsByDateRange = (startDate:string,endDate:string,Data:NamajTiming<number>[],masjidId:string) => async() => {


    try{
      const { data } = await api.updateTimingsByRange(startDate,endDate,Data,masjidId);

    if(data.data.length>0)
    { 
      
       return data;
     }


      return data;

    }    
    catch(error:any)
   {
    
     if(error.message){
      
      return error.response.data;

   }
  }
}