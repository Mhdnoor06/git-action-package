import * as api from '../../../api-calls/index';

export const deleteMasjidProfile = (id:string) => async() => {
    try{
     const response = await api.deleteMasjidProfile(id);
    return response;    
   }    
   catch(error:any)
   {
    console.log(error)
    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Delete Masjid Profile : SomeThing Went Wrong"
     }; 
     return result;
   }

}