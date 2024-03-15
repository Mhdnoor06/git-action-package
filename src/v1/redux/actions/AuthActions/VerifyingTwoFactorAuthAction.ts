import { Dispatch } from 'redux';
import * as api from '../../../api-calls/index';
import { AuthDataType } from '../../Types';
import { AUTH_LOGIN } from '../../actiontype';

export const VerifyingTwoFactorAuth = (formData:AuthDataType) => async(dispatch:Dispatch) => {

   try{
     const response = await api.VerifyingTwoFactorAuth(formData);


     if (response.status === 200) {


        localStorage.setItem("authTokens", JSON.stringify(response.data.token));
      
        dispatch({type:"AUTH_LOGIN" , payload:response.data.user});
         
       window.location.reload();

        let result = {
           data:response.data.user,
           success:true,
           message:'Logged In Successfully'
        }
   
        return result;
     }
     return response.data;

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