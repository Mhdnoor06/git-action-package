import React from "react";
import "./PrayerBox.css";
import { NamajTiming } from "../../../../redux/Types";
import "../../../Widgets/PrayerTimgeWidgets.css";
export declare const icons: {
    [key: string]: string;
};
type propsType = {
    tZone: string;
    prayer: NamajTiming<number | string>[];
    children: React.ReactNode;
    timingId?: string;
    masjidId?: string;
    reloader?: () => void;
    date?: string;
};
declare const PrayerBox: ({ tZone, prayer, children, reloader, date }: propsType) => JSX.Element;
export default PrayerBox;
//# sourceMappingURL=PrayerBox.d.ts.map