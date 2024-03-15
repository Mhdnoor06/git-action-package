import React, { ReactChild } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
type propsType = {
  handleNext: (val: boolean) => void;
  handlePrev: (val: boolean) => void;
  children: any;
};
const TimeFlipbox = ({ children, handleNext, handlePrev }: propsType) => {
  const settings = {
    className: "center",
    dots: true,
    infinite: false,
    centerPadding: "60px",
    background: "red",
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    beforeChange: (cur: number, next: number) =>
      cur < next ? handleNext(false) : cur > next ? handlePrev(false) : null,
  };

  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default TimeFlipbox;
