import { Dispatch } from "redux";
type PayloadType = {
    snackbarOpen: boolean;
    snackbarType: string;
    snackbarMessage: string;
};
export type SnackbarAction = {
    type: string;
    payload: PayloadType;
};
export declare const ChangeSnackbar: (snackbarDetails: PayloadType) => (dispatch: Dispatch<SnackbarAction>) => Promise<any>;
export {};
//# sourceMappingURL=ChangeSnackbarAction.d.ts.map