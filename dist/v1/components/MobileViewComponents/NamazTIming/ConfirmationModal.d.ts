import React, { Dispatch, SetStateAction } from "react";
interface JuristicMethodProps {
    isModalOpen: boolean;
    juristicMethod: string;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    setParentModalOpen: Dispatch<SetStateAction<boolean>>;
}
declare const ConfirmationModal: React.FC<JuristicMethodProps>;
export default ConfirmationModal;
//# sourceMappingURL=ConfirmationModal.d.ts.map