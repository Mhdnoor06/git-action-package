import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { CircularProgress } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// import Placeholder from "../../../Photos/placeholder.png";
import Placeholder from "../../../Photos/default-home-img.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { deleteMasjidMedia } from "../../../redux/actions/MasjidActions/DeletingMasjidMediaAction";
import { useAppThunkDispatch } from "../../../redux/hooks";
type propsType = {
  MasjidPhotos: { url: string; _id: string }[];
  MasjidId: string;
  setUploadAllow: (val: boolean) => void;
};
const MasjidPicturesCarousel = ({
  MasjidPhotos,
  MasjidId,
  setUploadAllow,
}: propsType) => {
  const [EventPhotosState, setEventPhotosState] = useState(MasjidPhotos);
  const [slideIndex, setSlideIndex] = useState(1);
  let imagesLength = MasjidPhotos ? MasjidPhotos?.length : 3;
  const [isLoading, setisLoading] = useState(false);
  const [DeleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const dispatch = useAppThunkDispatch();
  const nextSlide = () => {
    if (slideIndex !== MasjidPhotos?.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === MasjidPhotos?.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(MasjidPhotos?.length);
    }
  };

  const moveDot = (index: number) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    setEventPhotosState(MasjidPhotos);
  }, [MasjidPhotos]);

  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteImage = () => {
    setisLoading(true);
    let MasjidImage = EventPhotosState[slideIndex - 1];
    const response = dispatch(deleteMasjidMedia(MasjidImage._id, MasjidId));
    response.then(function (result) {
      EventPhotosState.splice(slideIndex - 1, 1);
      setSlideIndex(slideIndex - 1);
      setisLoading(false);
      setDeleteModalOpen(false);
    });
    setisLoading(false);
  };

  if (EventPhotosState.length >= 3) {
    setUploadAllow(true);
  } else {
    setUploadAllow(false);
  }

  return (
    <div style={styles.containerSliderMasjid}>
      <Dialog
        open={DeleteModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete the Masjid Image ?`}
        </DialogTitle>
        <DialogActions style={{ justifyContent: "space-around" }}>
          <Button
            onClick={handleDeleteModal}
            variant="outlined"
            disabled={isLoading}
          >
            No
          </Button>
          <Button onClick={handleDeleteImage} variant="outlined">
            {" "}
            {isLoading ? (
              <CircularProgress size="15px" />
            ) : (
              <span> Yes </span>
            )}{" "}
          </Button>
        </DialogActions>
      </Dialog>
      {EventPhotosState.length > 0 ? (
        EventPhotosState.map((item, index: number) => {
          return (
            <div
              key={index}
              style={
                slideIndex === index + 1
                  ? { ...styles.slide, ...styles.activeAnim }
                  : styles.slide
              }
            >
              <LazyLoadImage
                effect="blur"
                src={item.url}
                alt="The Event "
                style={styles.eventImage2}
              />
              {EventPhotosState.length > 0 &&
                (isLoading ? (
                  <div style={styles.deleteIcon}>
                    <CircularProgress size="15px" className="loadingIcon" />
                  </div>
                ) : (
                  <MdDelete
                    style={styles.deleteIcon}
                    onClick={handleDeleteModalOpen}
                    // disabled={true}
                  />
                ))}
            </div>
          );
        })
      ) : (
        <>
          <LazyLoadImage
            effect="blur"
            src={Placeholder}
            alt="The Event "
            style={styles.eventImage2}
          />
        </>
      )}
      {/* {EventPhotosState.length > 1 && (
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
      )}
      {EventPhotosState.length > 1 && (
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      )} */}

      <div style={styles.containerDots}>
        {EventPhotosState.length > 1 &&
          Array.from({ length: imagesLength ? imagesLength : 3 }).map(
            (item, index) => (
              <div
                onClick={() => moveDot(index + 1)}
                style={
                  slideIndex === index + 1
                    ? { ...styles.dot, ...styles.activeDot }
                    : styles.dot
                }
              ></div>
            )
          )}
      </div>
    </div>
  );
};
const styles = {
  containerSliderMasjid: {
    position: "relative" as "relative",
    overflow: "hidden",
  },
  containerSlider: {
    margin: "100px 10px 0",
  },
  slide: {
    width: "100%",

    height: "100%",
    position: "absolute" as "absolute",
    opacity: 0,
    transition: "opacity ease-in-out 0.4s",
  },
  slideImg: {
    width: "100%",
    height: "100%",
  },
  activeAnim: {
    opacity: 1,
  },
  btnSlide: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#f1f1f1",
    opacity: "10",
    border: "1px solid rgba(34, 34, 34, 0.287)",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  btnSlideImg: {
    width: "20px",
    height: "20px",
    pointerEvents: "none",
  },
  prev: {
    top: "50%",
    left: "20px",
    transform: "translateY(-60%)",
  },
  next: {
    top: "50%",
    right: "20px",
    transform: "translateY(-60%)",
  },
  containerDots: {
    position: "absolute" as "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "3px solid #f1f1f1",
    margin: "0 5px",
    background: "#f1f1f1",
  },
  activeDot: {
    background: "rgb(32, 32, 32)",
  },
  eventImage: {
    objectFit: "cover",
  },
  eventImage2: {
    objectFit: "cover" as "cover",
    width: "100%",
    height: "206px",
    borderRadius:"30px"
 
  },
  deleteIcon: {
    position: "absolute" as "absolute",
    top: "10px",
    right: "10px",
    transform: "translateX(-50%)",
    display: "flex",
    color: "#1f1a1a",
    height: "2.1rem",
    width: "2.1rem",
    cursor: "pointer",
  },
};

export default MasjidPicturesCarousel;
