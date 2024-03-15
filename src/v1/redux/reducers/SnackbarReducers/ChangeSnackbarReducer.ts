
import { SidebarTypeAction } from "../../Types";
import { CHANGE_SNACKBAR } from "../../actiontype";

type InitialState = {
  snackbarOpen: boolean;
  snackbarType: string;
  snackbarMessage: string;
};

const initialState: InitialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
const ChangeSnackbarReducer = (
  sidebarState = initialState,
  action: SidebarTypeAction
): InitialState => {
  switch (action.type) {
    case CHANGE_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action.payload;
      return {
        ...sidebarState,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
      };

    default:
      return sidebarState;
  }
};

export default ChangeSnackbarReducer;
