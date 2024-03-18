import React from "react";
import "./DeleteWarningCard.css";
interface DeleteWarningCardProps {
    onClose: () => void;
    onConfirm: () => void;
    wariningType: string;
    warining: string;
    icon?: any;
    progress?: boolean;
}
declare const DeleteWarningCard: React.FC<DeleteWarningCardProps>;
export default DeleteWarningCard;
//# sourceMappingURL=DeleteWarningCard.d.ts.map