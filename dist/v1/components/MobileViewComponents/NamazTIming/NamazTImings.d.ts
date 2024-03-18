import { Dispatch, SetStateAction } from "react";
import "./NamazTimings.css";
import { NamajTiming } from "../../../redux/Types";
export type EnteredData = Record<string, {
    azaanTime: string;
    namazName?: string;
    jamaatTime: string;
    ExtendedJamaatMinutes: number;
    ExtendedAzaanMinutes: number;
    TimesByAzaan: string;
    TimesByJamaat: string;
}>;
type propsType = {
    prayerType: string;
    setShowNamzTiming: Dispatch<SetStateAction<boolean>>;
    tims: NamajTiming<number>[] | undefined;
};
declare function NamajTimings({ setShowNamzTiming, tims, prayerType, }: propsType): JSX.Element;
export default NamajTimings;
//# sourceMappingURL=NamazTImings.d.ts.map