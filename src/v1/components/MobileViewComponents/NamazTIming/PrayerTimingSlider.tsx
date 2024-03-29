import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PreNextBtn from "../Shared/PreNextBtn";
type propsType = {
  setIsMobileHandler: Dispatch<SetStateAction<boolean>>;
  setCurrentSliderIdx: Dispatch<SetStateAction<number>>;
  children: any;
};
const PrayerTimingSlider = ({
  children,
  setIsMobileHandler,
  setCurrentSliderIdx,
}: propsType) => {
  //Mobile View Check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
      setIsMobileHandler(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  interface SampleNextArrowProps {
    onClick: () => void;
    // You can include other props if needed
  }
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-next-btn">
        <PreNextBtn isPre={false} btnHandler={onClick} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;

    return (
      <div className="slick-pre-btn">
        <PreNextBtn isPre={true} btnHandler={onClick} />
      </div>
    );
  }
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
          <Slider {...settings}>{children}</Slider>
        </div>
      ) : (
        <div className="tab-prayer-timing-card">{children}</div>
      )}
    </>
  );
};
export default PrayerTimingSlider;
