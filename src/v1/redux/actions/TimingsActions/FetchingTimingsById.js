
import * as api from '../../../api-calls/index';

export const FetchingTimingsById = (id) => async(dispatch) => {

    try{

      let { data } = await api.getTimingsById(id);

      if(data.success)
     {
     
        return data;
      }
      return data;

    }    
    catch(error)
   {
    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Login:SomeThing Went Wrong"
     }; 
     return result;
   }
}