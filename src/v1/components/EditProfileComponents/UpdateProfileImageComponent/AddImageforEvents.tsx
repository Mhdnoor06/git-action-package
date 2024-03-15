import React, { Dispatch, SetStateAction, useState } from "react";
import "./FileUploadEvent.scss";
import axios from "axios";
import { GoPlus } from "react-icons/go";
import Button from "@mui/material/Button";
// import { addEventMedia } from "../../../../Redux/Actions/EventsActions/AddingEventMedia.js";
import { useDispatch } from "react-redux";
// import { ChangeSnackbar } from "../../../../Redux/Actions/SnackbarActions/SnackbarActions.js";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import imageCompression from "browser-image-compression";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { handleSnackbar } from "../../../../helpers/SnackbarHelper/SnackbarHelper";
import { useEffect } from "react";
import { AuthTokens } from "../../../redux/Types";

const API = axios.create({
  baseURL: "https://squid-app-7wo7y.ondigitalocean.app/api/",
});

API.interceptors.request.use(
  async (req) => {
    if (localStorage.getItem("authTokens")) {
      const authTokensString = localStorage.getItem("authTokens");
      const token: AuthTokens | null = authTokensString
        ? JSON.parse(authTokensString)
        : null;
      // const token = JSON.parse(localStorage.getItem("authTokens"));
      if (token?.accessToken) {
        req.headers.Authorization = `Bearer ${token?.accessToken}`;
      } else {
        req.headers.Authorization = `Bearer ${token?.token}`;
      }
    }
    // const data = JSON.parse(localStorage.getItem("authTokens"));
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
type propsType = {
  EventId: string;
  MasjidId:string;
  eventPhotos:any;
  setEventsPhotos:any;
  DraggedImage:File|undefined;
  UploadAllow?:boolean;
  setEventUploadPhoto:Dispatch<SetStateAction<File|undefined>>;
  setMasjidUploadPhoto:Dispatch<SetStateAction<File|undefined>>;
};
const FileUploadEvent = ({
  EventId,
  MasjidId,
  eventPhotos,
  setEventsPhotos,
  DraggedImage,
  UploadAllow,
  setEventUploadPhoto,
  setMasjidUploadPhoto,
}: propsType) => {
  const [Open, setOpen] = useState(true);
  const [OpenBar, setOpenBar] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File>();
  const dispatch = useDispatch();
  const [State, setState] = useState({ uploadPercentage: 0 });
  const [ImageUploadMedium, setImageUploadMedium] = useState(false);

  useEffect(() => {
    setSelectedImage(DraggedImage);
    setMasjidUploadPhoto(DraggedImage);
    setEventUploadPhoto(DraggedImage);
  }, [DraggedImage]);

  const uploadHandler = () => {
    setMasjidUploadPhoto(selectedImage);
    // const formData = new FormData();
    // formData.append("image", selectedImage);
    // setOpenBar(true);
    // const options = {
    //   onUploadProgress: (progressEvent) => {
    //     const { loaded, total } = progressEvent;
    //     let percent = Math.floor((loaded * 100) / total);

    //     if (percent < 100) {
    //       setState({ uploadPercentage: percent });
    //     }
    //   },
    // };

    // API.post(`v1/media/${MasjidId}/upload/${EventId}`, formData, options)
    //   .then((res) => {
    //     setState({ uploadPercentage: 100 }, () => {
    //       setTimeout(() => {
    //         setState({ uploadPercentage: 0 });
    //       }, 700);
    //     });

    //     setTimeout(() => {
    //       let data = {
    //         _id: res.data.data._id,
    //         url: res.data.data.url,
    //       };
    //       setEventsPhotos([...eventPhotos, data]);
    //       setOpenBar(false);
    //       setOpen(!Open);
    //       setSelectedImage();
    //     }, 3000);
    //   })
    //   .catch((error) => {
    //     const snackbarFailureDetails = {
    //       snackbarOpen: true,
    //       snackbarType: "error",
    //       snackbarMessage: error.response.data
    //         ? error.response.data.message
    //         : "Adding Masjid Media Failed",
    //     };
    //     setOpenBar(false);
    //     dispatch(ChangeSnackbar(snackbarFailureDetails));
    //   });
  };

  const imageChange = (e: React.FormEvent<HTMLLabelElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      setSelectedImage(inputElement.files[0]);
      setMasjidUploadPhoto(inputElement.files[0]);
      setEventUploadPhoto(inputElement.files[0]);
      setOpen(!Open);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(undefined);
    setMasjidUploadPhoto(undefined);
    setEventUploadPhoto(undefined);
    setOpen(!Open);
  };

  const getJpegFromUrl = async (url: string) => {
    const fetchUrl = url;
    const fileName = "myFile.jpeg";
    fetch(fetchUrl).then(async (response) => {
      const contentType = response.headers.get("content-type") ?? "";
      const blob = await response.blob();
      const file = new File(
        [blob],
        fileName,
        {
          type: contentType,
        }
        // type: blob.type,
        // { contentType }
      );
      setSelectedImage(file);
      setMasjidUploadPhoto(file);
      setEventUploadPhoto(file);
      setOpen(!Open);
    });
  };

  function isValidHttpUrl(string: string) {
    return fetch(string)
      .then((response) => response.blob())
      .then((blob) => {
        const type = blob.type.split("/")[0];
        return type === "image";
      })
      .catch(() => false);
  }

  const handleUrlUpload = (value: string) => {
    isValidHttpUrl(value)
      .then((res) => {
        setTimeout(() => {
          if (res) {
            getJpegFromUrl(value);
          } else {
            // handleSnackbar(
            //   true,
            //   "warning",
            //   "Invalid URL : Please Paste a valid URL",
            //   dispatch
            // );
          }
        }, 1000);
      })
      .catch((res) => {
        console.log(res);
        // handleSnackbar(
        //   true,
        //   "error",
        //   "Invalid URL : Please Paste a valid URL",
        //   dispatch
        // );
      });
  };

  return (
    <>
      {Open ? (
        <div className="file-card">
          <div className="file-inputs">
            {!ImageUploadMedium ? (
              <>
                <div className="ImageUploadButtonsEvents">
                  <Button
                    variant="outlined"
                    disabled={UploadAllow}
                    style={{
                      marginBottom: "5px",
                      marginTop: "5px",
                      width: "70%",
                      height: "40px",
                      fontSize: "13px",
                    }}
                    component="label"
                    startIcon={<PhotoCamera />}
                    onChange={(e) => imageChange(e)}
                  >
                    Choose New Image
                    <input
                      hidden
                      accept="image/jpeg,image/png,image/jpg"
                      type="file"
                    />
                  </Button>
                  <span className="Separator">OR</span>
                  <Button
                    variant="contained"
                    disabled={UploadAllow}
                    style={{
                      marginBottom: "5px",
                      marginTop: "5px",
                      width: "70%",
                      height: "30px",
                      fontSize: "10px",
                    }}
                    component="label"
                    onClick={(e) => setImageUploadMedium(true)}
                  >
                    Paste Link
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="PasteBoxForLink">
                  <input
                    type="url"
                    id="url-field"
                    disabled={UploadAllow}
                    pattern="^https?://.*$"
                    autoFocus={true}
                    className="InputPasteLinkEvents"
                    onChange={(e) => {
                      handleUrlUpload(e.target.value);
                    }}
                  />{" "}
                  <AiOutlineCloseCircle
                    className="TextBoxRightIcon"
                    onClick={(e) => setImageUploadMedium(false)}
                  />
                </div>
              </>
            )}
            <div className="ImageUploadBottomDetails">
              {UploadAllow ? (
                <>
                  <p className="info">
                    {" "}
                    The Masjid has reached Maximum File Upload Limit
                  </p>
                </>
              ) : (
                <>
                  <p className="main">Supported files</p>
                  <p className="info"> JPG, PNG,JPEG less than 5MB</p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        selectedImage && (
          <>
            {" "}
            {OpenBar && (
              <div className="progressbar-container">
                <div
                  className="progressbar-complete"
                  style={{ width: `${State.uploadPercentage}%` }}
                >
                  <div className="progressbar-liquid"></div>
                </div>
                <span className="progress">{State.uploadPercentage}%</span>
              </div>
            )}
            <div className="ImageContainer">
              <div className="EventImagePreview">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className="EventImage"
                  alt="Thumb"
                />
              </div>
            </div>
            <div className="ImageButtons">
              <Button
                variant="outlined"
                onClick={removeSelectedImage}
                className="EventImageDelete"
              >
                Remove Image
              </Button>
              {/* <Button
                variant="outlined"
                onClick={uploadHandler}
                disabled={OpenBar}
                className="EventImageDelete"
              >
                Upload Image
              </Button> */}
            </div>
          </>
        )
      )}
    </>
  );
};

export default FileUploadEvent;
