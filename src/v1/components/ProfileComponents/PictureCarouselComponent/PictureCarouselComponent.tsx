import React, { useState, useEffect } from "react";
import "./PictureCarouselComponent.css";
import { CircularProgress } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import BtnSlider from "./ButtonSlider/ButtonSlider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { deleteMasjidMedia } from "../../../redux/actions/MasjidActions/DeletingMasjidMediaAction";
import { getAdminMasjid } from "../../../redux/actions/MasjidActions/FetchingMasjidByAdminAction";
import Placeholder from "../../../photos/placeholder.png";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { deleteEventMedia } from "../../../redux/actions/EventActions/DeletingEventMediaAction";
import { EventType } from "../../../redux/Types";

type propsType = {
  ParentComponentType: string;
  EventPhotos?: any;
  Event?: EventType;
  Photos?: string[];
};
const PictureCarouselComponent = ({
  ParentComponentType,
  EventPhotos,
  Event,
  Photos,
}: propsType) => {
  const [AdminMasjid, setAdminMasjid] = useState<any>();
  const Admin = useAppSelector((state) => state.admin);
  const [CarouselPhotos, setCarouselPhotos] = useState<string[]>([]);
  const [PhotosState, setPhotosState] = useState<string[]>([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [slideIndex, setSlideIndex] = useState(1);
  const [IsAdminPage, setIsAdminPage] = useState(false);
  let imagesLength = CarouselPhotos ? CarouselPhotos?.length : 3;
  const [DeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useAppThunkDispatch();

  const nextSlide = () => {
    if (slideIndex !== CarouselPhotos?.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === CarouselPhotos?.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(CarouselPhotos?.length);
    }
  };

  const moveDot = (index: number) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    if (ParentComponentType === "Masjid"&&Photos) {
      setCarouselPhotos(Photos);
      setPhotosState(Photos);
      if (window.location.pathname === "/masjidprofile") {
        setIsAdminPage(true);
      } else {
        setIsAdminPage(false);
      }
    } else if (ParentComponentType === "Event") {
      if (EventPhotos?.length > 0) {
        setPhotosState(EventPhotos);
        setCarouselPhotos(EventPhotos);
        setIsAdminPage(true);
      }
    }
  }, [ParentComponentType, EventPhotos]);

  const handleDeleteImage = () => {
    setisLoading(true);
    if (ParentComponentType === "Masjid") {
      let MasjidImage = PhotosState[slideIndex - 1];
      let start = MasjidImage.indexOf("Masjid");
      let string = MasjidImage.substr(start);
      let end = string.indexOf(".jpg");
      let Id = MasjidImage.substr(start, end);
      const formData = {
        imageId: Id,
        url: MasjidImage,
      };
      const response = dispatch(deleteMasjidMedia(AdminMasjid?._id, formData));
      response.then(function (result) {
        dispatch(getAdminMasjid(Admin._id));
        setSlideIndex(slideIndex - 1);
        setisLoading(false);
        setDeleteModalOpen(false);
      });
    } else {
      handleDeletemediaEvent();
    }
    setisLoading(false);
  };

  const handleDeletemediaEvent = () => {
    setisLoading(true);
    let EventImage: any = PhotosState[slideIndex - 1];

    const response = dispatch(
      deleteEventMedia(EventImage._id, Event?._id ?? "")
    );

    response.then(function (result) {
      PhotosState.splice(slideIndex - 1, 1);
      setSlideIndex(slideIndex - 1);
      setisLoading(false);
      setDeleteModalOpen(false);
    });
  };

  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  

  return (
    <div className="PictureCarouselContainer">
      <Dialog
        open={DeleteModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete the  Image ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteImage} variant="outlined">
            {" "}
            {isLoading ? (
              <CircularProgress size="15px" />
            ) : (
              <span> Yes </span>
            )}{" "}
          </Button>
          <Button
            onClick={handleDeleteModal}
            variant="outlined"
            disabled={isLoading}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <div className="container-slider-masjid">
        {PhotosState?.length > 0 ? (
          PhotosState.map((item: any, index) => {
            return (
              <div
                key={index}
                className={
                  slideIndex === index + 1 ? "slide active-anim" : "slide"
                }
              >
                <img src={item.url} alt="The Event " className="eventImage" />
                {CarouselPhotos?.length > 0 &&
                  IsAdminPage &&
                  (IsLoading ? (
                    <div className="delete-icon">
                      <CircularProgress size="15px" className="loadingIcon" />
                    </div>
                  ) : (
                    <MdDelete
                      className="delete-icon"
                      onClick={handleDeleteModalOpen}
                      // disabled={true}
                    />
                  ))}
              </div>
            );
          })
        ) : (
          <>
            <img src={Placeholder} alt="The Event " className="eventImage2" />
          </>
        )}
        {PhotosState?.length > 1 && (
          <BtnSlider moveSlide={nextSlide} direction={"next"} />
        )}
        {PhotosState?.length > 1 && (
          <BtnSlider moveSlide={prevSlide} direction={"prev"} />
        )}
        <div className="container-dots">
          {PhotosState?.length > 1 &&
            Array.from({ length: imagesLength ? imagesLength : 3 }).map(
              (item, index) => (
                <div
                  onClick={() => moveDot(index + 1)}
                  className={slideIndex === index + 1 ? "dot active" : "dot"}
                ></div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default PictureCarouselComponent;
