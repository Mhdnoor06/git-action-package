import * as api from '../../../api-calls/index';


export const updateRandomTiming = (formData) => async(dispatch) => {

    try{

      const data =await api.updateRandomDaysTimings(formData);
       
      if(data.success)
     {
        return data.data;
      }
      return data.data;
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