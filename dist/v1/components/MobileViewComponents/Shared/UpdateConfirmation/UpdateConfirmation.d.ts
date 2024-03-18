import React, { Dispatch, SetStateAction } from "react";
interface UpdateConfirmationProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    progress: boolean;
    texts: {
        main: string;
        sub?: string;
    };
    handleReject: () => void;
    handleConfirm: () => void;
}
declare const UpdateConfirmation: React.FC<UpdateConfirmationProps>;
export default UpdateConfirmation;
//# sourceMappingURL=UpdateConfirmation.d.ts.map