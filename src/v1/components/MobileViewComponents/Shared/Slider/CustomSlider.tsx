import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PreNextBtn from "../PreNextBtn";
import { debounce } from "@mui/material";
type propsType = {
  setIsMobileHandler: Dispatch<SetStateAction<boolean>>;
  setCurrentSliderIdx: Dispatch<SetStateAction<number>>;
  children: any;
  dots?: boolean;
  controllingBtn?: boolean;
  slidesToShow?: number;
  sliderRef: any;
  goNext: any;
  goPrev: any;
};
const PrayerTimingSlider = ({
  children,
  setIsMobileHandler,
  setCurrentSliderIdx,
  sliderRef,
  goNext,
  goPrev,
  dots = true,
  controllingBtn = true,
  slidesToShow = 1,
}: propsType) => {
  //Mobile View Check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      const isMobileSize = window.innerWidth <= 767;
      setIsMobile(isMobileSize);
      setIsMobileHandler(isMobileSize);
    }, 100); // Adjust debounce time as needed

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // function SampleNextArrow(props: any) {
  //   const { onClick, currentSlide } = props;
  //   if (currentSlide === 4) return null;
  //   return (
  //     <div
  //       className="slick-next-btn"
  //       style={{ display: controllingBtn ? "block" : "none" }}
  //     >
  //       <PreNextBtn isPre={false} btnHandler={onClick} />
  //     </div>
  //   );
  // }

  // function SamplePrevArrow(props: any) {
  //   const { onClick, currentSlide } = props;
  //   // console.log("currentSlide => ", currentSlide);
  //   if (currentSlide === 0) return null;

  //   return (
  //     <div
  //       className="slick-pre-btn"
  //       style={{ display: controllingBtn ? "block" : "none" }}
  //     >
  //       <PreNextBtn isPre={true} btnHandler={onClick} />
  //     </div>
  //   );
  // }
  const settings = {
    dots: dots,
    infinite: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    ref: sliderRef,
    arrows: false,
    beforeChange: (currentSlide: any, nextSlide: any) => {
      setCurrentSliderIdx(nextSlide);
      const isLastSlide = nextSlide === children[0].length - 1;
      document.querySelectorAll(".slick-dots")[0].style.display = isLastSlide
        ? "none"
        : "block";
    },
  };

  return (
    <>
      {isMobile ? (
        <div className="slider-container">
          <Slider {...settings}>{children}</Slider>;
        </div>
      ) : (
        <div className="tab-prayer-timing-card">{children}</div>
      )}
    </>
  );
};
export default PrayerTimingSlider;
