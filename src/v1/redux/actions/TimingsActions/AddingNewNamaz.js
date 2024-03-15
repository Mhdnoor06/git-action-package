// import { UPDATE_NAMAAZ } from '../../ActionType';
import * as api from '../../../api-calls/index';

export const addNewNamaz = (formData) => async(dispatch) => {
   
    try{
        
    //   const { data } = await api.addingNewNamaz(formData);
     
    //   if(data.success)
    //   {
         
    //      return data;
    //   }
    //   return data;
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