import { Dispatch } from 'redux';
import * as api from '../../../api-calls/index';
import { COMPLETE_EVENT_EDITING } from '../../actiontype';


export const EventCompletionAction = (value:boolean) => async(dispatch:Dispatch) => {

    try{

        let eventCompleted = value;

         dispatch({type:"COMPLETE_EVENT_EDITING" , payload: eventCompleted})

    }    
    catch(error:any)
   {

    let result ={
        success:false,
        message:error.response.data.message? error.response.data.message: "Failed To Fetch Events : SomeThing Went Wrong"
     }; 
     return result;

   }
}