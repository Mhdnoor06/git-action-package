import React, { Dispatch, SetStateAction } from "react";
interface ClockTimeInputProps {
    setTime: Dispatch<SetStateAction<string>>;
    tim: string;
    label: string;
    id?: string;
    formDataSetter?: (val: string, val2: string) => void;
    error?: string | null;
}
declare const ClockTimeInput: React.FC<ClockTimeInputProps>;
export default ClockTimeInput;
//# sourceMappingURL=ClockTimeInput.d.ts.map