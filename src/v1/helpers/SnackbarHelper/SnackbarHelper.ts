// import { ChangeSnackbar } from '../../redux/actions/SnackbarActions/ChangeSnackbarAction';
// import { useDispatch } from 'react-redux';


// export const  handleSnackbar = (snackbarOpen,snackbarType,snackbarMessage,dispatch) => {

//     const snackbarDetails = {
//         snackbarOpen:snackbarOpen, 
//         snackbarType:snackbarType,
//         snackbarMessage:snackbarMessage
//       }  
//       dispatch(ChangeSnackbar(snackbarDetails))
// }

import { Dispatch } from "redux";
import { ChangeSnackbar } from "../../redux/actions/SnackbarActions/ChangeSnackbarAction";

export const handleSnackbar = (
  snackbarOpen: boolean,
  snackbarType: string,
  snackbarMessage: string,
  dispatch:Dispatch <any>
) => {
  const snackbarDetails = {
    snackbarOpen: snackbarOpen,
    snackbarType: snackbarType,
    snackbarMessage: snackbarMessage,
  };
  dispatch(ChangeSnackbar(snackbarDetails));
};
