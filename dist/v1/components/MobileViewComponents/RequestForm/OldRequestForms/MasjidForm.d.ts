import React from "react";
import "./Masjidform.css";
interface MasjidFormProps {
    formSubmitted: boolean;
    userEmail: string;
    setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setCancelRequested: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const MasjidForm: React.FC<MasjidFormProps>;
export default MasjidForm;
//# sourceMappingURL=MasjidForm.d.ts.map