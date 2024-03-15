import React, { useState, useRef } from "react";
import "./UpdateProfileImageComponent.css";
import placeholder from "../../../photos/placeholder.png";
import Button from "@mui/material/Button";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import getJpegFromUrl from "../../../helpers/GetImageFromURLHelper/GetImageFromUrl";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import isValidHttpUrl from "../../../helpers/URLValidationHelper/URLValidationHelper";
import ImageCompression from "../../../helpers/ImageCompressorHelper/ImageCompressHelper";
import API from "../../../helpers/AuthenticationHelper/AuthInterceptorHelper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAdminMasjid } from "../../../redux/actions/MasjidActions/FetchingMasjidByAdminAction";
import { FetchEventById } from "../../../redux/actions/EventActions/FetchingEventDetailsById";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { ResponseType } from "../../../redux/Types";

type propsType = {
  ParentComponentType: string;
  OperationType: string;
  EventDetails?: any;
  setEventDetails?: any;
  setIsUpdating?: any;
  MazjidId: string;
};
const UpdateProfileImageComponent = ({
  ParentComponentType,
  OperationType,
  EventDetails,
  setEventDetails,
  setIsUpdating,
  MazjidId,
}: propsType) => {
  const [Open, setOpen] = useState(true);
  const [OpenBar, setOpenBar] = useState(false);
  const [ImageUploadMedium, setImageUploadMedium] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );
  let PlaceholderRef = useRef<HTMLInputElement | null>(null);
  let LinksRef = useRef<HTMLInputElement>(null);
  const [Percentage, setPercentage] = useState({ uploadPercentage: 0 });
  // let AdminMasjid = useSelector((state) => state.AdminMasjid[0]);
  const [displayImg, setDisplayImg] = useState<File | undefined>(undefined);
  let admin = useAppSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setDisplayImg(e.target.files[0]);
      setOpen(!Open);
    }
  };
  // console.log(displayImg);
  const handleUrlUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidHttpUrl(e.target.value)) {
      getJpegFromUrl(e.target.value, setSelectedImage);
    } else {
      handleSnackbar(true, "error", "The Entered Url Is Not Valid", dispatch);
    }
  };

  const handleEventImageAdd = (compressedFile: File) => {
    const formData = new FormData();
    formData.append("image", compressedFile);
    setOpenBar(true);

    const options = {
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setPercentage({ uploadPercentage: percent });
        }
      },
    };

    if (ParentComponentType === "Event") {
      API.post(
        "v1/admin/events/addEventMedia/" + EventDetails._id,
        formData,
        options
      )
        .then((res) => {
          setTimeout(() => {
            setPercentage({ uploadPercentage: 0 });
          }, 700);

          // setPercentage({ uploadPercentage: 100 }, () => {
          //   setTimeout(() => {
          //     setPercentage({ uploadPercentage: 0 });
          //   }, 700);
          // });

          setEventDetails(res.data.data);

          setTimeout(() => {
            // dispatch(FetchEventById(EventDetails._id))
            setIsUpdating(false);
            setOpenBar(false);
            setOpen(!Open);
            if (LinksRef?.current) LinksRef.current.value = "";
            setSelectedImage(undefined);
          }, 3000);
        })
        .catch((error: any) => {
          console.log(error);
          handleSnackbar(true, "error", "Adding Event Media Failed", dispatch);
        });
    } else {
      API.post("media/" + MazjidId + "/upload", formData, options)
        .then((res: any) => {
          setTimeout(() => {
            setPercentage({ uploadPercentage: 0 });
          }, 700);
          // setPercentage({ uploadPercentage: 100 }, () => {
          //   setTimeout(() => {
          //     setPercentage({ uploadPercentage: 0 });
          //   }, 700);
          // });

          dispatch(getAdminMasjid(MazjidId));
          setTimeout(() => {
            setOpenBar(false);
            setOpen(!Open);
            setSelectedImage(undefined);
            // LinksRef.current.value=""
            navigate("/masjidprofile");
          }, 3000);
        })
        .catch((error: any) => {
          console.log(error);
          handleSnackbar(true, "error", "Adding Masjid Media Failed", dispatch);
        });
    }
  };
  const handleImageUpload = () => {
    if (ParentComponentType === "Event") {
      if (OperationType === "Update") {
        let file = ImageCompression(selectedImage);
        file.then((image) => {
          if (image) handleEventImageAdd(image);
        });
      } else {
        let file = ImageCompression(selectedImage);
        file.then((image) => {
          if (image) handleEventImageAdd(image);
        });
      }
    } else {
      if (OperationType === "ADD") {
        let file = ImageCompression(selectedImage);
        file.then((image) => {
          if (image) handleEventImageAdd(image);
        });
      } else {
        let file = ImageCompression(selectedImage);
        file.then((image) => {
          if (image) handleEventImageAdd(image);
        });
      }
    }
  };

  return (
    <>
      <div className="UpdateProfileImageContainerMazjid">
        <div className="TopoFImage">
          <div className="ImageDisplayComponentMazjid">
            {selectedImage ? (
              <>
                <div className="ImagePreviewMazjid">
                  <div className="deleteImage">
                    <MdCancel
                      className="deleteiconImageUpload"
                      onClick={(e) => {
                        setSelectedImage(undefined);
                        if (LinksRef.current) LinksRef.current.value = "";
                      }}
                      // disabled={true}
                    />
                  </div>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    className="selectedImageMasjid"
                    alt="Thumb"
                  />
                </div>
              </>
            ) : (
              <>
                {displayImg ? (
                  <>
                    <img
                      src={URL.createObjectURL(displayImg)}
                      className="selectedImageMasjidDisplay"
                      alt="Thumb"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={placeholder}
                      alt="imageplaceholder"
                      className="placeholderImageMazjid"
                      onClick={(e) => {
                        if (PlaceholderRef.current)
                          PlaceholderRef.current.click();
                      }}
                    />
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      ref={PlaceholderRef}
                      onChange={imageChange}
                    />
                  </>
                )}
              </>
            )}
          </div>
          <div>
            {OpenBar && (
              <div className="progressbar-container-masjid">
                <div
                  className="progressbar-complete-masjid"
                  style={{ width: `${Percentage.uploadPercentage}%` }}
                >
                  <div className="progressbar-liquid-mazjid"></div>
                </div>
                <span className="progress-masjid">
                  {Percentage.uploadPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="BottomOfImage">
          <div className="ImageUploadOptionsMazjid">
            {!selectedImage ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  disabled={OpenBar}
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    ref={PlaceholderRef}
                    onChange={imageChange}
                  />
                  Choose Images
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  component="label"
                  onClick={(e) => setImageUploadMedium(true)}
                >
                  Add Links
                </Button>
              </>
            ) : (
              <>
                <div className="FinalUploadButtonMazjid">
                  <Button
                    variant="contained"
                    color="success"
                    disabled={OpenBar}
                    component="label"
                    onClick={handleImageUpload}
                  >
                    Upload Images
                  </Button>
                </div>
              </>
            )}
          </div>

          {ImageUploadMedium && (
            <>
              <div className="PasteBoxForLinkMasjid">
                <input
                  type="url"
                  id="url-field"
                  pattern="^https?://.*$"
                  autoFocus={true}
                  ref={LinksRef}
                  className="InputPasteLinkMazjid"
                  onChange={(e) => {
                    handleUrlUpload(e);
                  }}
                />
                <AiOutlineCloseCircle
                  className="TextBoxRightIconMazjid"
                  onClick={(e) => setImageUploadMedium(false)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateProfileImageComponent;
