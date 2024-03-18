import React from "react";
import { SpecialPrayer } from "../../../redux/Types";
type propsType = {
    tZone: string;
    isInitialLoaded: boolean;
    hasPrayers: boolean;
    prayer: SpecialPrayer<number>;
    handleEdit: (val: SpecialPrayer<number>) => void;
    handleDelete: (val: string) => void;
    children?: React.ReactNode;
};
declare const SpecialPrayerCard: ({ hasPrayers, prayer, tZone, handleEdit, isInitialLoaded, handleDelete, children, }: propsType) => JSX.Element;
export default SpecialPrayerCard;
//# sourceMappingURL=SpecialPrayerCard.d.ts.map