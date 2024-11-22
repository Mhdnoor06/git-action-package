// ImageUploader.tsx
import React, { useState, useEffect } from "react";
import { Box, CircularProgress, MobileStepper, useTheme } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import deleteEvntImg from "../../../../../photos/Newuiphotos/Icons/deletex.svg";
import AddEvntImg from "../../../../../photos/Newuiphotos/Icons/addEvntImg.svg";
import noEventImg from "../../../../../photos/Newuiphotos/Icons/noEvntphoto.svg";
import addImgIcon from "../../../../../photos/Newuiphotos/BoardMember/addImgIcon.webp";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type ImageUploaderProps = {
  images: File[];
  placeholderImg?: string;
  updateEventPhotos: { url: string; _id: string }[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: (index: number | string) => void;
  handleDeleteImage: (eventImgId: string) => void;

  hideController: boolean;

  componentName?: string;
  placeholderSize?: string;
  setActiveStep: (step: number) => void;
  setIsDeleteWarningVisible: any;
  setMaxSteps: any;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  placeholderImg,
  placeholderSize = "40px",
  updateEventPhotos,
  componentName,
  handleImageUpload,
  handleImageDelete,
  handleDeleteImage,
  hideController = false,
  openBar,
  activeStep,
  setActiveStep,
  setIsDeleteWarningVisible,
  setMaxSteps,
}) => {
  const theme = useTheme();

  useEffect(() => {
    setMaxSteps(images?.length);
    setActiveStep(0);
  }, [images]);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="image-preview">
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        {images?.length > 0 ||
        (updateEventPhotos && updateEventPhotos.length > 0) ? (
          <div style={{ position: "relative" }}>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {updateEventPhotos.length > 0
                ? updateEventPhotos.map((photo, index) => (
                    <div className="event-input-img-prev" key={index}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          className="event-input-img"
                          component="img"
                          src={photo.url}
                          alt={`Photo ${index}`}
                          sx={{
                            height: "auto",
                            maxHeight: 120,
                            display: "block",
                            overflow: "hidden",
                            width: "auto",
                            borderRadius: "20px",
                          }}
                        />
                      ) : null}
                    </div>
                  ))
                : images.map((photo, index) => (
                    <div className="event-input-img-prev" key={index}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          component="img"
                          sx={{
                            height: "auto",
                            maxHeight: 120,
                            display: "block",
                            overflow: "hidden",
                            width: "auto",
                            borderRadius: "20px",
                          }}
                          src={
                            typeof photo !== "string"
                              ? URL.createObjectURL(photo)
                              : photo
                          }
                          // src={URL.createObjectURL(photo)}
                          alt={`Photo ${index}`}
                        />
                      ) : null}
                    </div>
                  ))}
            </AutoPlaySwipeableViews>
            <div
              style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
                background: "white",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                data-testid="deleteFile"
                id="deleteFile"
                style={{ display: "none" }}
                onClick={() => {
                  updateEventPhotos.length > 0
                    ? setIsDeleteWarningVisible(true)
                    : handleImageDelete(activeStep);
                }}
              />
              <img
                src={deleteEvntImg}
                alt=""
                style={{ width: "15px", height: "15px" }}
                onClick={() => document.getElementById("deleteFile")?.click()}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: "50px",
                bottom: "10px",
                background: "white",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <input
                data-testid="upload-picture"
                type="file"
                id="fileInput"
                // data-testid="fileInput"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <img
                src={AddEvntImg}
                alt=""
                style={{ width: "100%", height: "auto" }}
                onClick={() => document.getElementById("fileInput")?.click()}
              />
            </div>
            {openBar && (
              <CircularProgress
                color="inherit"
                sx={{ position: "absolute", top: "40%", left: "45%" }}
              />
            )}
          </div>
        ) : (
          <Box
            component="div"
            sx={{
              height: 140,
              background: componentName ? "white" : "#E4FFF1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "relative",
              borderRadius: "20px",
            }}
          >
            {componentName ? (
              <img
                onClick={() => document.getElementById("fileInput")?.click()}
                src={addImgIcon}
                alt="no member "
              />
            ) : (
              <img
                src={placeholderImg ?? noEventImg}
                alt="no event "
                style={{ width: placeholderSize }}
              />
            )}

            <div
              style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
                background: "white",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                display: componentName ? "none" : "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <input
                data-testid="fileInput"
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <img
                src={AddEvntImg}
                alt=""
                style={{ width: "20px", height: "20px" }}
                onClick={() => document.getElementById("fileInput")?.click()}
              />
            </div>
          </Box>
        )}
        {images?.length > 1 && (
          <MobileStepper
            steps={images?.length}
            position="static"
            activeStep={activeStep}
            nextButton={null}
            backButton={null}
            sx={{ justifyContent: "center" }}
          />
        )}
      </Box>
    </div>
  );
};

export default ImageUploader;
