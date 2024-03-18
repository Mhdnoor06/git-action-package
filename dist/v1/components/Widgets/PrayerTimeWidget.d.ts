import React from "react";
import "./PrayerTimgeWidgets.css";
import "swiper/swiper-bundle.css";
import { SpecialPrayer, WidgetNamazTiming } from "../../redux/Types";
interface PrayerTimeWidgetProps {
    widgetData: WidgetNamazTiming<number>[] | null;
    specialPrayerData: SpecialPrayer<number>[] | null;
    tZone: string;
    lat: string;
    lon: string;
}
declare const PrayerTimeWidget: React.FC<PrayerTimeWidgetProps>;
export default PrayerTimeWidget;
//# sourceMappingURL=PrayerTimeWidget.d.ts.map