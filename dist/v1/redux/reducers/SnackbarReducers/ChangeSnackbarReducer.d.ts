import { SidebarTypeAction } from "../../Types";
type InitialState = {
    snackbarOpen: boolean;
    snackbarType: string;
    snackbarMessage: string;
};
declare const ChangeSnackbarReducer: (sidebarState: InitialState | undefined, action: SidebarTypeAction) => InitialState;
export default ChangeSnackbarReducer;
//# sourceMappingURL=ChangeSnackbarReducer.d.ts.map