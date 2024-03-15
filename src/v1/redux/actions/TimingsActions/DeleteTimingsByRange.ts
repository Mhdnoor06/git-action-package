import * as api from '../../../api-calls/index';



export const DeletingTimingsByDateRange = (startDate:string,endDate:string,masjidId:string,namazNames:string) => async() => {


    try{

      const { data } = await api.deletingTimingsByDateRange(startDate,endDate,masjidId,namazNames);
   
    if(data.message === "Timings deleted")
    { 
       return data;
     }
     
      return data;

    }    
    catch(error:any)
   {
    
      let result = {
         success: false,
         message: error.response.data.message
           ? error.response.data.message
           : "Failed To Delete Timings:SomeThing Went Wrong",
       };
       return result;
       

   }
}