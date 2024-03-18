import React, { Dispatch, SetStateAction } from "react";
interface DeleteConfirmationProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    progress: boolean;
    texts: {
        main: string;
        sub?: string;
    };
    handleReject: () => void;
    handleDelete: () => void;
}
declare const DeleteConfirmation: React.FC<DeleteConfirmationProps>;
export default DeleteConfirmation;
//# sourceMappingURL=DeleteConfirmation.d.ts.map