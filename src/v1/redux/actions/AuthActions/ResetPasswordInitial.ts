import * as api from '../../../api-calls/index';
import { AuthDataType } from '../../Types';



export const resetPasswordInitial = (formData:AuthDataType) => async() => {

    try{  

      const response = await api.setPasswordNewUser(formData);

      if (response.status === 200) {
        
         let token = {
            accessToken:response.data.data.accessToken,
            refreshToken:response.data.data.refreshToken,
         }

         localStorage.setItem("authTokens", JSON.stringify(token));
         
         let result = {
            data : response.data.data,
            success:true,
         }
         return result;
      }
      return response.data.data;

    }    
    catch(error:any)
   {
      if(error.response.data){
         let result = {
            success: false,
            TwoFAUser: false,
            error: `Failed to Login`,
            message: error.response.data.data.error,
          };
          return result;
      }
      return error.response

   }
}