import { Dispatch, SetStateAction, FC } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EditMasjid.css";
import { Masjid } from "../../../redux/Types";
interface EditMasjidProps {
    masjid: Masjid;
    openMasjidEdit: boolean;
    setOpenMasjidEdit: Dispatch<SetStateAction<boolean>>;
    masjidId: string;
    masjidReloader: () => void;
}
declare const EditMasjid: FC<EditMasjidProps>;
export default EditMasjid;
//# sourceMappingURL=EditMasjid.d.ts.map