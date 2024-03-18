import React, { Dispatch, SetStateAction } from "react";
interface CustomModalProps {
    open: boolean;
    isCarouselMedia: boolean;
    masjidId: string;
    removeHandler: () => void;
    masjidReloader: () => void;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
declare const ProfileModal: React.FC<CustomModalProps>;
export default ProfileModal;
//# sourceMappingURL=ProfileModal.d.ts.map