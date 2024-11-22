import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

SwiperCore.use([Navigation, Pagination]);

type propsType = {
  setIsMobileHandler: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSliderIdx: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  swiperRef: React.RefObject<SwiperCore>;
  goNext: () => void;
  goPrev: () => void;
};

const PrayerInputSlider = ({
  children,
  setIsMobileHandler,
  setCurrentSliderIdx,
  swiperRef,
  goNext,
  goPrev,
}: propsType) => {
  const [isMobile, setIsMobile] = useState(false);
  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth <= 767;
      setIsMobile(isMobileSize);
      setIsMobileHandler(isMobileSize);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="slider-container" role="presentation">
          <Swiper
            onSlideChange={(swiper) => setCurrentSliderIdx(swiper.activeIndex)}
            loop={false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            style={{ overflow: "visible" }}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
          >
            {isMobile
              ? validChildren.map((child, index) => (
                  <SwiperSlide key={index}>{child}</SwiperSlide>
                ))
              : validChildren}
          </Swiper>
        </div>
      ) : (
        <div
          className="tab-prayer-timing-card"
          data-testid="tab-prayer-timing-card"
        >
          {children}
        </div>
      )}
    </>
  );
};

export default PrayerInputSlider;
