import React, { useState, useRef } from "react";
import "./UpdateForEvents.css";
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

const UpdateForEvents = ({
  ParentComponentType,
  OperationType,
  EventDetails,
  setEventDetails,
  setIsUpdating,
  EventIds
}) => {
  const [Open, setOpen] = useState(true);
  const [OpenBar, setOpenBar] = useState(false);
  const [ImageUploadMedium, setImageUploadMedium] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  let PlaceholderRef = useRef();
  let LinksRef = useRef();
  const [Percentage, setPercentage] = useState({ uploadPercentage: 0 });
  let AdminMasjid = useSelector((state) => state.AdminMasjid[0]);
  let admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setOpen(!Open);
    }
  };

  const handleUrlUpload = (e) => {
    if (isValidHttpUrl(e.target.value)) {
      getJpegFromUrl(e.target.value, setSelectedImage);
    } else {
      handleSnackbar(true, "error", "The Entered Url Is Not Valid", dispatch);
    }
  };

   console.log(EventIds);


  const handleEventImageAdd = (compressedFile) => {
    const formData = new FormData();
    formData.append("image", compressedFile);
    setOpenBar(true);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setPercentage({ uploadPercentage: percent });
        }
      },
    };
    if (ParentComponentType === "Event") {
      
      API.post(
        "v1/admin/events/addEventMedia/" + EventIds,
        formData,
        options
      )
        .then((res) => {
          setPercentage({ uploadPercentage: 100 }, () => {
            setTimeout(() => {
              setPercentage({ uploadPercentage: 0 });
            }, 700);
          });

          setEventDetails(res.data.data);

          setTimeout(() => {
            dispatch(FetchEventById(EventIds))
            setIsUpdating(false);
            setOpenBar(false);
            setOpen(!Open);
            // LinksRef.current.value=""
            setSelectedImage();
          }, 3000);
        })
        .catch((error) => {
          handleSnackbar(true, "error", "Adding Event Media Failed", dispatch);
        });
    } else {
      API.post(
        "v1/admin/masjid/addMasjidMedia/" + AdminMasjid._id,
        formData,
        options
      )
        .then((res) => {
          setPercentage({ uploadPercentage: 100 }, () => {
            setTimeout(() => {
              setPercentage({ uploadPercentage: 0 });
            }, 700);
          });

          dispatch(getAdminMasjid(AdminMasjid?._id));
          setTimeout(() => {
            setOpenBar(false);
            setOpen(!Open);
            setSelectedImage();
            LinksRef.current.value=""
            navigate("/masjidprofile");
          }, 3000);
        })
        .catch((error) => {
          handleSnackbar(true, "error", "Adding Masjid Media Failed", dispatch);
        });
    }
  };

  const handleImageUpload = () => {
    if (ParentComponentType === "Event") {
        // console.log(OperationType);
      if (OperationType === "Update") {
        let file = ImageCompression(selectedImage);
        file.then((image) => {
          handleEventImageAdd(image);
        });
      } else {
        let file = ImageCompression(selectedImage);
        // console.log(file);
        file.then((image) => {
            // console.log(image)
          handleEventImageAdd(image);
        });
      }
    } else {
      if (OperationType === "ADD") {
        let file = ImageCompression(selectedImage);
        
        file.then((image) => {
            // console.log(image);
          handleEventImageAdd(image);
          
        });
      } else {
        let file = ImageCompression(selectedImage);
        file.then((image) => {
          handleEventImageAdd(image);
        });
      }
    }
  };


  return (
    <>
      <div className="UpdateProfileImageContainer">
        <div className="ImageDisplayComponent">
          {selectedImage ? (
            <>
              <div className="ImagePreview">
                <div className="deleteImage">
                  <MdCancel
                    className="deleteiconImageUpload"
                    onClick={(e) => {
                      setSelectedImage();
                      LinksRef.current.value=""
                    }}
                    disabled={true}
                  />
                </div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className="selectedImage"
                  alt="Thumb"
                />
              </div>
            </>
          ) : (
            <>
              <img
                src={placeholder}
                alt="imageplaceholder"
                className="placeholderImage"
                onClick={(e) => {
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
        </div>
        <div>
          {OpenBar && (
            <div className="progressbar-container">
              <div
                className="progressbar-complete"
                style={{ width: `${Percentage.uploadPercentage}%` }}
              >
                <div className="progressbar-liquid"></div>
              </div>
              <span className="progress">{Percentage.uploadPercentage}%</span>
            </div>
          )}
        </div>
        <div className="UploadImageButtons">
          <div className="ImageUploadOptions">
            {!selectedImage ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  style={{
                    width: "40%",
                    height: "40%",
                    fontSize: "10px",
                  }}
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
                  style={{
                    width: "40%",
                    height: "40%",
                    fontSize: "10px",
                  }}
                  component="label"
                  onClick={(e) => setImageUploadMedium(true)}
                >
                  Add Links
                </Button>
              </>
            ) : (
              <>
                <div className="FinalUploadButton">
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      width: "40%",
                      height: "40%",
                      fontSize: "10px",
                    }}
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
              <div className="PasteBoxForLink">
                <input
                  type="url"
                  id="url-field"
                  pattern="^https?://.*$"
                  autoFocus={true}
                  ref={LinksRef}
                  className="InputPasteLink"
                  onChange={(e) => {
                    handleUrlUpload(e);
                  }}
                />
                <AiOutlineCloseCircle
                  className="TextBoxRightIcon"
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

export default UpdateForEvents;
