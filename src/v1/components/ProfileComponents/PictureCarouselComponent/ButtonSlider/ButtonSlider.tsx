import React from "react";
import "../PictureCarouselComponent.css";
import leftArrow from "./icons/left-arrow.svg";
import rightArrow from "./icons/right-arrow.svg";
type propsType = {
  direction: string;
  moveSlide: () => void;
};
export default function BtnSlider({ direction, moveSlide }: propsType) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} alt="the icon" />
    </button>
  );
}
