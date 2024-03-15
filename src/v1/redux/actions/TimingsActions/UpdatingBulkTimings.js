import * as api from '../../../api-calls/index';


export const UpdateBulkTiming = (formData,id) => async(dispatch) => {

    try{

      const { data } = await api.updateBulkTiming(formData,id);

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
        message:error.response.data.message? error.response.data.message: "Failed To Update :SomeThing Went Wrong"
     }; 
     return result;

   }
}