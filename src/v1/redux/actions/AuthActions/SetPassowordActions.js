import * as api from '../../../api-calls/index';
import { AUTH_LOGIN } from '../../actiontype';


export const setPasswordInitial = (formData) => async(dispatch) => {

    try{  

      const {data}  = await api.setPasswordNewUser(formData);

      if(data.success){

            let authTokens = {
               "accessToken":data.data.accessToken,
               "refreshToken":data.data.refreshToken
            }

        localStorage.setItem("authTokens", JSON.stringify(data.data));

        return data;

      }

      return data;
    }    
    catch(error)
   {

    let result ={
        success:false,
        message: error.response.data.message ? "Failed To Set Password : " + error.response.data.message: "Failed To Set Password : SomeThing Went Wrong"
     }; 
     return result;
   }
}