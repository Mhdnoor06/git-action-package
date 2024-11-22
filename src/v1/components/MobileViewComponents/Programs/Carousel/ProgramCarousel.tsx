import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material";

interface ProgramDataWithPhotos {
  _id: string;
  programName: string;
  // other properties...
  programPhotos: { url: string }[];
  handleToggleImage: () => void;
  setImgSrc: any;
  setAltSrc: any;
}

function isProgramDataWithPhotos(data: any): data is ProgramDataWithPhotos {
  return (
    data &&
    Array.isArray(data) &&
    data.length > 0 &&
    typeof data[0] === "string"
  );
}

interface ProgramDataWithFiles {
  _id: string;
  programName: string;
  programPhotos: File[];
}

function isProgramDataWithFiles(data: any): data is ProgramDataWithFiles {
  return (
    data && Array.isArray(data) && data.length > 0 && data[0] instanceof File
  );
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// Used in all program pages for images
const ProgramCarousel: React.FC<{
  programData: ProgramDataWithPhotos | ProgramDataWithFiles | File[];
  isEditing: boolean;
  isProgDetails?: boolean;
  handleToggleImage: () => void;
  setImgSrc: any;
  setAltSrc: any;
}> = ({
  programData,
  isEditing,
  isProgDetails = false,
  handleToggleImage,
  setImgSrc,
  setAltSrc,
}) => {
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

  if (isProgramDataWithPhotos(programData)) {
    maxSteps = programData.length;
  } else if (isProgramDataWithFiles(programData)) {
    maxSteps = programData.length;
  } else if (Array.isArray(programData)) {
    maxSteps = programData.length;
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
        {Array.isArray(programData) && typeof programData[0] !== "string"
          ? programData.map((photo, index) => (
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
                    src={URL?.createObjectURL(photo)}
                    alt={`Photo ${index}`}
                    onClick={() => {
                      handleImageClick(
                        URL?.createObjectURL(photo),
                        `Photo ${index}`
                      );
                    }}
                  />
                ) : null}
              </div>
            ))
          : programData?.map((photo, index) => (
              <div
                key={index}
                className={isProgDetails ? "top-img-container" : ""}
              >
                {Math.abs(activeStep - index) <= 2 ? (
                  <>
                    {isProgDetails ? (
                      <Box
                        component="img"
                        className="responsive-img-top"
                        src={photo}
                        alt={`Photo ${index}`}
                        onClick={() => {
                          handleImageClick(photo, `Photo ${index}`);
                        }}
                      />
                    ) : (
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
                        src={photo}
                        alt={`Photo ${index}`}
                        onClick={() => {
                          handleImageClick(photo, `Photo ${index}`);
                        }}
                      />
                    )}
                  </>
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

export default ProgramCarousel;
