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

const EventCarousel: React.FC<{
  eventData: EventDataWithPhotos | EventDataWithFiles | File[];
  isEditing: boolean;
}> = ({ eventData, isEditing }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  console.log(eventData);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
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
    <Box sx={{ width: "100%", flexGrow: 1, position: "relative" }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {Array.isArray(eventData)
          ? eventData.map((photo, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 220,
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      borderRadius: "20px",
                    }}
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index}`}
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
                          }
                        : {
                            height: 300,
                            display: "block",
                            // maxWidth: 400,
                            overflow: "hidden",
                            width: "100%",
                            borderRadius: "0 0 30px 30px",
                          }
                    }
                    src={photo.url}
                    alt={`Photo ${index}`}
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
