import * as api from '../../../api-calls/index';


export const AddingNamazRandomTimings = (formData) => async(dispatch) => {

    try{

      const data =await api.addingRandomDaysTimings(formData);
       
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
        message:error.response.data.message? error.response.data.message: "Failed To Add Namaz:SomeThing Went Wrong"
     }; 
     return result;

   }
}