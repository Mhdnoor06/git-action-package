import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material";

interface EventDataWithPhotos {
  _id: string;
  eventName: string;
  // other properties...
  eventPhotos: { url: string }[];
  handleToggleImage: () => void;
  setImgSrc: any;
  setAltSrc: any;
}

function isEventDataWithPhotos(data: any): data is EventDataWithPhotos {
  return (
    data &&
    data.eventPhotos &&
    Array.isArray(data.eventPhotos) &&
    data.eventPhotos.length > 0 &&
    typeof data.eventPhotos[0]?.url === "string"
  );
}

interface EventDataWithFiles {
  _id: string;
  eventName: string;
  eventPhotos: File[];
}

function isEventDataWithFiles(data: any): data is EventDataWithFiles {
  return (
    data &&
    data.eventPhotos &&
    Array.isArray(data.eventPhotos) &&
    data.eventPhotos.length > 0 &&
    data.eventPhotos[0] instanceof File
  );
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// Used in all event pages for images
const EventCarousel: React.FC<{
  eventData: EventDataWithPhotos | EventDataWithFiles | File[];
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
  const handleImageClick = (src, alt) => {
    setImgSrc(src);
    setAltSrc(alt);
    handleToggleImage();
  };
  let maxSteps = 0;

  if (isEventDataWithPhotos(eventData)) {
    maxSteps = eventData.eventPhotos.length;
  } else if (isEventDataWithFiles(eventData)) {
    maxSteps = eventData.eventPhotos.length;
  } else if (Array.isArray(eventData)) {
    maxSteps = eventData.length;
  }

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
      >
        {Array.isArray(eventData)
          ? eventData.map((photo, index) => (
              <div key={index} className="event-input-img-prev">
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 220,
                      display: "block",
                      overflow: "hidden",
                      width: "auto",
                      borderRadius: "20px",
                      objectFit: "contain",
                    }}
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index}`}
                    onClick={() => {
                      handleImageClick(
                        URL.createObjectURL(photo),
                        `Photo ${index}`
                      );
                    }}
                  />
                ) : null}
              </div>
            ))
          : eventData.eventPhotos?.map((photo, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={
                      isEditing
                        ? {
                            height: 220,
                            display: "block",
                            // maxWidth: 400,
                            overflow: "hidden",
                            width: "100%",
                            borderRadius: "20px",
                            objectFit: "contain",
                          }
                        : {
                            height: 300,
                            display: "block",
                            // maxWidth: 400,
                            overflow: "hidden",
                            width: "100%",
                            borderRadius: "0 0 30px 30px",
                            objectFit: "contain",
                          }
                    }
                    src={photo.url}
                    alt={`Photo ${index}`}
                    onClick={() => {
                      handleImageClick(photo.url, `Photo ${index}`);
                    }}
                  />
                ) : null}
              </div>
            ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps > 1 ? maxSteps : 0}
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
    </Box>
  );
};

export default EventCarousel;
