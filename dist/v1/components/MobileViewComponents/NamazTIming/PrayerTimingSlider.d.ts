import { Dispatch, SetStateAction } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
type propsType = {
    setIsMobileHandler: Dispatch<SetStateAction<boolean>>;
    setCurrentSliderIdx: Dispatch<SetStateAction<number>>;
    children: any;
};
declare const PrayerTimingSlider: ({ children, setIsMobileHandler, setCurrentSliderIdx, }: propsType) => JSX.Element;
export default PrayerTimingSlider;
//# sourceMappingURL=PrayerTimingSlider.d.ts.map