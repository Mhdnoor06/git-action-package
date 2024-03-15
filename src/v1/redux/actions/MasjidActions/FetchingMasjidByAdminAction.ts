import { Dispatch } from 'redux';
import * as api from '../../../api-calls/index';
import { FETCH_ADMIN_MASJID } from '../../actiontype';


export const getAdminMasjid = (id:string) => async(dispatch:Dispatch) => {
    try{
    
      const response = await api.fetchAdminMasjid(id);
      console.log(response);
      if(response.status === 200)
      {
         dispatch({type:"FETCH_ADMIN_MASJID" , payload: response})
         return response;
       }
     return response;
    }    
     catch(error:any)
   {
     
    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Fetch Masjid : SomeThing Went Wrong"
     }; 
     return result;
  
   }
}