import React, { useState, useEffect } from "react";
import "./CarouselForMainMazjidComponent.css";
import { CircularProgress } from "@material-ui/core";
import BtnSlider from "../PictureCarouselComponent/ButtonSlider/ButtonSlider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { deleteMasjidMedia } from "../../../redux/actions/MasjidActions/DeletingMasjidMediaAction";
import { getAdminMasjid } from "../../../redux/actions/MasjidActions/FetchingMasjidByAdminAction";
import { deleteEventMedia } from "../../../redux/actions/EventActions/DeletingEventMediaAction";
import { FetchEventById } from "../../../redux/actions/EventActions/FetchingEventDetailsById";
import Placeholder from "../../../photos/placeholder.png";
import EditButton from "../../../photos/EditButton.png";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { EventType, ResponseType } from "../../../redux/Types";
type propsType = {
  ParentComponentType: string;
  Photos: any;
  Event?: EventType;
  setEventDetails?: any;
  mazjidId: any;
};
const CarouselForMainMazjidComponent = ({
  ParentComponentType,
  Photos,
  Event,
  setEventDetails,
  mazjidId,
}: propsType) => {
  const Admin = useAppSelector((state) => state.admin);
  const [CarouselPhotos, setCarouselPhotos] = useState([]);
  const [PhotosState, setPhotosState] = useState<string[]>([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [slideIndex, setSlideIndex] = useState(1);
  const [IsAdminPage, setIsAdminPage] = useState(false);
  let imagesLength = CarouselPhotos ? CarouselPhotos?.length : 3;
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
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
    if (ParentComponentType === "Masjid") {
      setCarouselPhotos(Photos);
      setPhotosState(Photos);
      if (window.location.pathname === "/masjidprofile") {
        setIsAdminPage(true);
      } else {
        setIsAdminPage(false);
      }
    } else if (ParentComponentType === "Event") {
      if (Photos?.length > 0) {
        setPhotosState(Photos);
        setCarouselPhotos(Photos);
        setIsAdminPage(true);
      }
    }
  }, [ParentComponentType, Photos]);

  const handleDeleteImage = () => {
    setisLoading(true);
    if (ParentComponentType === "Masjid") {
      let MasjidImage = PhotosState[slideIndex - 1];
      let start = MasjidImage.indexOf("Masjid");
      let string = MasjidImage.substr(start);
      let end = string.indexOf(".jpg");
      let Id = MasjidImage.substr(start, end);
      console.log(MasjidImage.substr(start, end));
      const formData = {
        imageId: Id,
      };

      const response = dispatch(deleteMasjidMedia(mazjidId, formData));
      response.then(function (result) {
        dispatch(getAdminMasjid(Admin._id));
        setSlideIndex(slideIndex - 1);
        setisLoading(false);
        setDeleteModalOpen(false);
       window.location.reload();
      });
    } else {
      setisLoading(true);
      let EventImage = PhotosState[slideIndex - 1];

      let start = EventImage.indexOf("Event");
      let string = EventImage.substr(start);
      let end = string.indexOf(".jpg");
      let Id = EventImage.substr(start, end);

      const formData = {
        imageId: Id,
        url: EventImage,
      };
      if (Event?._id) {
        const response = dispatch(deleteEventMedia(Event._id, formData));
        const res = dispatch(FetchEventById(Event._id));
        response.then(function (result) {
          if (result.success) {
            res.then((result: ResponseType) => {
              setEventDetails(result.data);
            });
            setSlideIndex(slideIndex - 1);
            setisLoading(false);
            setDeleteModalOpen(false);
          } else {
            setisLoading(false);
            setDeleteModalOpen(false);
          }
        });
      }
    }
  };

  const handleDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className="PictureCarouselContainerMain">
      <div className="DeleteButton">
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
      </div>
      {PhotosState?.length > 0 ? (
        PhotosState.map((item: any, index) => {
          return (
            <div
              key={index}
              className={
                slideIndex === index + 1 ? "slideMain active-anim" : "slide"
              }
            >
              <img src={item.url} alt="The Event " className="eventImageMain" />
              {CarouselPhotos?.length > 0 &&
                IsAdminPage &&
                (IsLoading ? (
                  <div className="delete-icon">
                    <CircularProgress size="15px" className="loadingIcon" />
                  </div>
                ) : (
                  <>
                    {/* <MdDelete
                       className="delete-icon"
                      onClick={handleDeleteModalOpen}
                       disabled={true}
                    /> */}
                    <button className="DeteleButton">
                      <img
                        src={EditButton}
                        onClick={handleDeleteModalOpen}
                        className="DeletePhotodButton"
                      />
                    </button>
                  </>
                ))}
            </div>
          );
        })
      ) : (
        <>
          <img src={Placeholder} alt="The Event " className="eventImage2Main" />
        </>
      )}
      {CarouselPhotos?.length > 1 && (
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
      )}
      {CarouselPhotos?.length > 1 && (
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      )}

      <div className="container-dots">
        {CarouselPhotos?.length > 1 &&
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
  );
};

export default CarouselForMainMazjidComponent;
