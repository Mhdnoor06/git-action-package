import { Dispatch, SetStateAction } from "react";
type propsType = {
    label?: string;
    timingStatus?: string;
    timeSetter: Dispatch<SetStateAction<string>>;
    timingRef: string;
    redOnly?: boolean;
};
declare const TimeInput: ({ label, timeSetter, timingRef, timingStatus, }: propsType) => JSX.Element;
export default TimeInput;
//# sourceMappingURL=TimeInput.d.ts.map