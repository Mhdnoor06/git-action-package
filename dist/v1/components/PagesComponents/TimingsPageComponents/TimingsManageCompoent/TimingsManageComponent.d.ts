import { SetStateAction, Dispatch } from "react";
import "./TimingsManageComponent.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { PrayerTimings } from "../../../../redux/Types";
type MasjidTm = {
    namazName: string;
    azaanTime: number;
    jamaatTime: number;
    type?: number;
};
type propsType = {
    CurrentMonthTimings: PrayerTimings<number>[];
    TodaysTimings: PrayerTimings<number>[];
    APITimings: any;
    setAPITimings: Dispatch<SetStateAction<MasjidTm[]>>;
};
declare const TimingsManageComponent: ({ CurrentMonthTimings, TodaysTimings, APITimings, setAPITimings, }: propsType) => JSX.Element;
export default TimingsManageComponent;
//# sourceMappingURL=TimingsManageComponent.d.ts.map