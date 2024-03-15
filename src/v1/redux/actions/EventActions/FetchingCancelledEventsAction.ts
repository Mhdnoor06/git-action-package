import * as api from '../../../api-calls/index';

export const FetchingCancelledEvents = (sortBy:string,sortIn:string,masjidId:string) => async() => {

    try{

      let { data } = await api.getCancelledEvents(sortBy,sortIn,masjidId);

      if(data.success)
     {

        return data;
      }
      return data;

    }    
    catch(error:any)
   {
    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Fetch :SomeThing Went Wrong"
     }; 
     return result;
   }
}