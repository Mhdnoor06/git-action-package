import React, { Dispatch, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material";
import FullScreenImageModal from "./FullScreenImageModal ";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const DonationCarousel: React.FC<{
  eventData: File[] | { images: string[] };
  isEditing: boolean;
  handleToggleImage: () => void;
  setImgSrc: any;
  setAltSrc: any;
}> = ({ eventData, isEditing, handleToggleImage, setImgSrc, setAltSrc }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const images = Array.isArray(eventData)
    ? eventData.map((file) => URL.createObjectURL(file))
    : eventData.images;

  const maxSteps = images.length;

  const handleImageClick = (src, alt) => {
    setImgSrc(src);
    setAltSrc(alt);
    handleToggleImage();
  };
  return (
    <Box
      sx={{ width: "100%", flexGrow: 1, position: "relative" }}
      data-testid="swipable-box"
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ userSelect: "none" }}
      >
        {images.map((src, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 && (
              <Box
                component="img"
                sx={{
                  height: isEditing ? 220 : 300,
                  display: "block",
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: isEditing ? "20px" : "0 0 30px 30px",
                  userDrag: "none",
                  WebkitUserDrag: "none",
                  userSelect: "none",
                  MozUserSelect: "none",
                  WebkitUserSelect: "none",
                  msUserSelect: "none",
                  objectFit: "contain",
                }}
                data-testid="preview-img"
                src={src}
                alt={`Photo ${index}`}
                onClick={() => {
                  handleImageClick(src, `Photo ${index}`);
                }}
              />
            )}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      {maxSteps > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={null}
          backButton={null}
          sx={{
            justifyContent: "center",
            position: "absolute",
            top: "90%",
            left: "45%",
            background: "none",
          }}
        />
      )}
    </Box>
  );
};

export default DonationCarousel;
