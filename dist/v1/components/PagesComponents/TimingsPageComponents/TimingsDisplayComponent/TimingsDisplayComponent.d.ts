import { PrayerTimings } from "../../../../redux/Types";
type propsType = {
    setManagingTimings: (val: boolean) => void;
    MonthTimings: PrayerTimings<string>[];
    TodaysTimings: PrayerTimings<string>[];
};
declare const TimingsDisplayComponent: ({ setManagingTimings, MonthTimings, TodaysTimings, }: propsType) => JSX.Element;
export default TimingsDisplayComponent;
//# sourceMappingURL=TimingsDisplayComponent.d.ts.map