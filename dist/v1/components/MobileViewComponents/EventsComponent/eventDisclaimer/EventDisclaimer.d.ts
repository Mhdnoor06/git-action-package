import React, { Dispatch, SetStateAction } from "react";
interface DisclaimerModalProps {
    showDisclaimer: boolean;
    handleDisclaimerStatus: (val: boolean) => void;
    setDisclaimer: Dispatch<SetStateAction<boolean>>;
}
declare const EventDisclaimer: React.FC<DisclaimerModalProps>;
export default EventDisclaimer;
//# sourceMappingURL=EventDisclaimer.d.ts.map