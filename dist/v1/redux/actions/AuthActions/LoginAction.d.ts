import { Dispatch } from "redux";
import { UserActionType } from "../../Types";
type formDataType = {
    email: string;
    password: string;
};
export declare const authLogin: (formData: formDataType, CaptchaValue: string) => (dispatch: Dispatch<UserActionType>) => Promise<any>;
export {};
//# sourceMappingURL=LoginAction.d.ts.map