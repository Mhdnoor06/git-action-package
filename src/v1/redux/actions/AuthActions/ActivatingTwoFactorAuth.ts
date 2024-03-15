import * as api from '../../../api-calls/index';
import { AUTH_LOGIN } from '../../actiontype';


export const ActivatingTwoFactorAuth = () => async() => {

    try{
      const { data } = await api.ActivatingTwoFactorAuth();

      if(data.success){

         return data;
      }
      return data;
    }    
    catch(error:any)
   {
    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Activate Two Factor Auth: SomeThing Went Wrong"
     }; 
     return result;

   }
}