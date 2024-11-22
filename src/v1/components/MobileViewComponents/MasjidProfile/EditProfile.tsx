import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FC,
  useCallback,
} from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import proflePlaceholer from "../../../photos/Newuiphotos/home icon/profile_placeholder.png";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import toast from "react-hot-toast";
import { useAppThunkDispatch } from "../../../redux/hooks";
import default_home_img from "../../../photos/default-home-img.png";
import delete_icon from "../../../photos/Newuiphotos/Icons/DeleteIcon.svg";
import camera_icon from "../../../photos/Newuiphotos/Icons/cameraIcon.svg";
import { updateAdminMasjid } from "../../../redux/actions/MasjidActions/UpdatingMasjidByAdmin";
import { deleteMasjidMedia } from "../../../redux/actions/MasjidActions/DeletingMasjidMediaAction";
import { deleteMasjidProfile } from "../../../redux/actions/MasjidActions/DeletingMasjidProfileAction";
import ImageUploadModal from "./ImageUploadModal";
import DeleteConfirmation from "../Shared/DeleteConfirmation/DeleteConfirmation";
import UpdateConfirmation from "../Shared/UpdateConfirmation/UpdateConfirmation";
import { IExternalLinks, Masjid } from "../../../redux/Types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { styled } from "@mui/system";

const RoundedIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "50%",
  padding: 3, // Adjust padding to control the size of the button
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface EditMasjidProps {
  masjid: Masjid;
  openMasjidEdit: boolean;
  setOpenMasjidEdit: Dispatch<SetStateAction<boolean>>;
  masjidId: string;
  masjidReloader: () => void;
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.23)",
              borderRadius: "20px",
            },
            "&:hover fieldset": {
              borderColor: "#1976d2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
            },
          },
        },
      },
    },
  },
});

interface ImageData {
  src: string;
  offset: number;
}

const EditProfile: FC<EditMasjidProps> = ({
  masjid,
  openMasjidEdit,
  setOpenMasjidEdit,
  masjidId,
  masjidReloader,
}) => {
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [facebookError, setFacebookError] = useState("");
  const [latitudeError, setLatitudeError] = useState("");
  const [longitudeError, setLongitudeError] = useState("");

  const [isCarouselMediaVisible, setIsCarouselMediaVisible] =
    useState<boolean>(false);
  const [isUploadProfileVisible, setIsUploadProfileVisible] =
    useState<boolean>(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isUpdateConfirmationOpen, setIsUpdateConfirmationOpen] =
    useState(false);
  const [isProgressActive, setIsProgressActive] = useState(false);

  const [description, setDescription] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [carouselImgId, setCarouselImgId] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<string>(""); // New state for latitude
  const [longitude, setLongitude] = useState<string>(""); // New state for longitude
  const [masjidPhotos, setMasjidPhotos] = useState<string[]>([]);
  const [masjidProfilePhoto, setMasjidProfilePhoto] = useState<string>("");
  const [coverImages, setCoverImages] = useState<ImageData[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [masjidName, setMasjidName] = useState("");
  const [startOffset, setStartOffset] = useState<number>(50);
  const dispatch = useAppThunkDispatch();
  const isFormValid =
    masjidName &&
    address &&
    phoneNumber &&
    !phoneNumberError &&
    latitude &&
    !latitudeError && // Ensure latitude is not empty
    longitude &&
    !longitudeError && // Ensure latitude is not empty
    (!website || !websiteError) &&
    (!facebook || !facebookError);

  // Validation functions
  const validatePhoneNumber = (phone: string) => {
    const regex =
      /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(phone);
  };

  const validateWebsite = (url: string) => {
    const regex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
    return regex.test(url);
  };

  const validateFacebookURL = (url: string) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/[a-zA-Z0-9(\.\?)?]+/;
    return regex.test(url);
  };

  const validateLatitude = (latitude: string) => {
    const latNum = parseFloat(latitude);
    return !isNaN(latNum) && latNum >= -90 && latNum <= 90;
  };

  // Validator for Longitude
  const validateLongitude = (longitude: string) => {
    const longNum = parseFloat(longitude);
    return !isNaN(longNum) && longNum >= -180 && longNum <= 180;
  };

  const handleBlur = (
    value: string,
    validator: (val: string) => boolean,
    setError: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string
  ) => {
    if (value && !validator(value)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setValue(e.target.value);
    if (setError) setError("");
  };

  const socialLinksHandler = (key: string, links: IExternalLinks[]) => {
    if (!links) return "";
    const matchedItems = links.find((link) => link.name === key);
    return matchedItems ? matchedItems.url : "";
  };

  useEffect(() => {
    setMasjidName(masjid?.masjidName);
    setDescription(masjid?.description || "");
    setPhoneNumber(masjid?.contact || "");
    setWebsite(socialLinksHandler("Website", masjid?.externalLinks));
    setFacebook(socialLinksHandler("Facebook", masjid?.externalLinks));
    setAddress(masjid?.address || "");
    setLatitude(masjid?.location.coordinates?.[1] || ""); // Set latitude
    setLongitude(masjid?.location.coordinates?.[0] || ""); // Set longitude
    setMasjidPhotos(masjid?.masjidPhotos || []);
    setMasjidProfilePhoto(masjid?.masjidProfilePhoto || "");
  }, [masjid]);

  useEffect(() => {
    if (!isUploadProfileVisible && isCarouselMediaVisible) {
      setIsCarouselMediaVisible(false);
    }
  }, [isUploadProfileVisible]);

  const cancelEditMasjidHandler = () => {
    setOpenMasjidEdit(false);
  };

  const updateEditMasjidHandler = async () => {
    setIsProgressActive(true);
    const res = await dispatch(
      updateAdminMasjid(masjidId, {
        masjidName,
        description,
        contact: phoneNumber,
        externalLinks: [
          { name: "Facebook", url: facebook },
          { name: "Website", url: website },
        ],
        address,
        location: {
          type: "Point",
          coordinates: [longitude, latitude], // Save the coordinates
        },
      })
    );
    if (res?.message === "Success") {
      toast.success("Successfully Updated!");
      setIsUpdateConfirmationOpen(false);
      setIsProgressActive(false);
      setOpenMasjidEdit(false);
      masjidReloader();
    } else {
      toast.error(res.message);
      setIsProgressActive(false);
    }
  };

  const deleteProfileConfirmationModalHandler = async () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleRejection = () => {
    setIsDeleteConfirmationOpen(false);
    setIsUpdateConfirmationOpen(false);
  };

  const deleteProfilePhotoHandler = async () => {
    setIsProgressActive(true);
    const mediaDelReq = carouselImgId
      ? deleteMasjidMedia(carouselImgId, masjidId)
      : deleteMasjidProfile(masjidId);

    const res = await dispatch(mediaDelReq);

    if (res?.status === 200 || res?.status === 204) {
      toast.success("Successfully deleted!");
      setIsDeleteConfirmationOpen(false);
      setIsUploadProfileVisible(false);
      setCarouselImgId("");
      masjidReloader();
      setIsProgressActive(false);
    } else {
      toast.error(res.message);
      setIsProgressActive(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartOffset(coverImages[currentIndex]?.offset || 50);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newOffset = startOffset + ((startY - e.clientY) / 250) * 100; // Adjust sensitivity
        setCoverImages((images) =>
          images.map((img, index) =>
            index === currentIndex
              ? { ...img, offset: Math.max(0, Math.min(100, newOffset)) }
              : img
          )
        );
      }
    },
    [isDragging, startY, startOffset, currentIndex]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    if (coverImages.length > 0) {
      // Save the updated offset value to localStorage
      saveImageOffsetToLocalStorage(coverImages[0].offset);
    }
  };

  const saveImageOffsetToLocalStorage = (offset: number) => {
    localStorage.setItem("imageOffset", JSON.stringify(offset));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const texts = {
    main: "Are you sure you want to Delete this Masjid Profile?",
  };

  const handleMediaModal = (status: boolean) => {
    setIsUploadProfileVisible(true);
    setIsCarouselMediaVisible(status);
  };

  const handleCarouselMediaDelete = (imgId = "") => {
    // deleteMasjidImageHandler()
    setIsDeleteConfirmationOpen(true);
    if (imgId) setCarouselImgId(imgId);
    else setCarouselImgId("");
  };

  useEffect(() => {
    const savedOffset = JSON.parse(localStorage.getItem("imageOffset") || "50");
    const initialCoverImages = masjidPhotos.map((photo) => ({
      id: photo._id,
      src: photo.url,
      offset: savedOffset,
    }));
    setCoverImages(initialCoverImages);
  }, [masjidPhotos]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handlePrevClick = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + coverImages.length) % coverImages.length
    );
  }, [coverImages.length]);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % coverImages.length);
  }, [coverImages.length]);

  return (
    <>
      <DeleteConfirmation
        setDeleteDialogOpen={setIsDeleteConfirmationOpen}
        warningTexts={texts}
        isDeleteDialogOpen={isDeleteConfirmationOpen}
        isDeleteInProgress={isProgressActive}
        handleReject={handleRejection}
        handleDelete={deleteProfilePhotoHandler}
      />
      <UpdateConfirmation
        setOpen={setIsUpdateConfirmationOpen}
        texts={texts}
        open={isUpdateConfirmationOpen}
        progress={isProgressActive}
        handleReject={handleRejection}
        handleConfirm={updateEditMasjidHandler}
      />
      <ThemeProvider theme={customTheme}>
        <Card
          sx={{
            maxWidth: isLargeScreen ? "80%" : "95%",
            padding: "5px",
            boxShadow: "2px 2px 10px #ccc",
            margin: "auto",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              height: "250px",
              cursor: isDragging ? "grabbing" : "ns-resize",
            }}
            onMouseDown={handleMouseDown}
          >
            {coverImages.length > 0 ? (
              <img
                src={coverImages[currentIndex]?.src}
                alt={`Cover ${currentIndex + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `50% ${coverImages[currentIndex]?.offset}%`,
                  borderRadius: "20px",
                }}
              />
            ) : (
              <img
                src={proflePlaceholer}
                alt="Default Cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `50% 50%`,
                  borderRadius: "20px",
                }}
              />
            )}
            <IconButton
              color="primary"
              component="label"
              sx={{ position: "absolute", right: 16, bottom: 16 }}
              onClick={() => handleMediaModal(true)}
            >
              <img
                src={camera_icon}
                alt="camera-icon"
                style={{ width: "30px", height: "30px" }}
              />
            </IconButton>
            {coverImages.length > 0 && (
              <IconButton
                color="secondary"
                sx={{ position: "absolute", right: 60, bottom: 3 }}
                onClick={() => {
                  handleCarouselMediaDelete(coverImages[currentIndex]?.id);
                }}
              >
                <img
                  src={delete_icon}
                  alt="delete-icon"
                  style={{ width: "55px", height: "55px" }}
                />
              </IconButton>
            )}
            {coverImages.length > 1 && (
              <>
                <RoundedIconButton
                  onClick={handlePrevClick}
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  data-testid="prev-button"
                >
                  <ArrowBackIosIcon sx={{ fontSize: 10 }} />
                </RoundedIconButton>

                <RoundedIconButton
                  onClick={handleNextClick}
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  data-testid="next-button"
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                </RoundedIconButton>
              </>
            )}
          </Box>
          <Box
            sx={{
              position: "relative",
              left: 10,
              top: -150,
              transform: "translateY(100%)",
              display: "flex",
              flexDirection: isLargeScreen ? "" : "column",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              {masjidProfilePhoto ? (
                <img
                  src={masjidProfilePhoto}
                  alt="Profile"
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src={default_home_img}
                  alt="Profile"
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                  }}
                />
              )}

              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: "absolute",
                  top: 50,
                  left: 50,
                  transform: "translate(50%, 50%)",
                }}
                onClick={() => handleMediaModal(false)}
              >
                <img
                  src={camera_icon}
                  alt="camera-icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </IconButton>
            </div>
          </Box>

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Masjid Name"
                  value={masjidName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMasjidName(e.target.value)
                  }
                  variant="outlined"
                  margin="dense"
                  required
                  data-testid="edit-masjid-name"
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="dense"
                  data-testid="edit-description"
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={phoneNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, setPhoneNumber, setPhoneNumberError)
                  }
                  onBlur={() =>
                    handleBlur(
                      phoneNumber,
                      validatePhoneNumber,
                      setPhoneNumberError,
                      "Invalid phone number format"
                    )
                  }
                  variant="outlined"
                  margin="dense"
                  required
                  error={!!phoneNumberError}
                  helperText={phoneNumberError}
                  data-testid="edit-phone"
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  label="Website Links"
                  value={website}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, setWebsite, setWebsiteError)
                  }
                  onBlur={() =>
                    handleBlur(
                      website,
                      validateWebsite,
                      setWebsiteError,
                      "Invalid website URL"
                    )
                  }
                  variant="outlined"
                  margin="dense"
                  error={!!websiteError}
                  helperText={websiteError}
                  data-testid="edit-website"
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Facebook Links"
                  value={facebook}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, setFacebook, setFacebookError)
                  }
                  onBlur={() =>
                    handleBlur(
                      facebook,
                      validateFacebookURL,
                      setFacebookError,
                      "Invalid Facebook URL"
                    )
                  }
                  variant="outlined"
                  margin="dense"
                  error={!!facebookError}
                  helperText={facebookError}
                  data-testid="edit-facebook"
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color={"red"}
                  sx={{
                    textAlign: "center",
                    fontSize: {
                      xs: "11.5px", // small devices
                      sm: "14px", // medium devices
                      md: "15 px", // large devices
                      lg: "18px", // extra large devices
                    },
                  }}
                >
                  Latitude & Longitude Values Affect Salah Timings.
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  margin="normal"
                  label="Latitude"
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                  value={latitude}
                  error={!!latitudeError}
                  helperText={latitudeError}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, setLatitude, setLatitudeError)
                  }
                  onBlur={() =>
                    handleBlur(
                      latitude,
                      validateLatitude,
                      setLatitudeError,
                      "Latitude must be between -90 and 90."
                    )
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  margin="normal"
                  label="Longitude"
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                  error={!!longitudeError}
                  helperText={longitudeError}
                  value={longitude}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, setLongitude, setLongitudeError)
                  }
                  onBlur={() =>
                    handleBlur(
                      longitude,
                      validateLongitude,
                      setLongitudeError,
                      "Longitude must be between -180 and 180."
                    )
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                  }
                  variant="outlined"
                  margin="dense"
                  required
                  sx={{ "& label.Mui-focused": { color: "black" } }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={cancelEditMasjidHandler}
                sx={{
                  background: "#ff7272",
                  borderRadius: "20px",
                  width: "135px",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setIsUpdateConfirmationOpen(true)}
                disabled={!isFormValid}
                sx={{
                  background: "#1B8368",
                  borderRadius: "20px",
                  width: "135px",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Update
              </Button>
            </Box>
          </CardContent>
        </Card>
      </ThemeProvider>
      <div className="modal-container">
        <ImageUploadModal
          masjidId={masjidId}
          masjidReloader={masjidReloader}
          open={isUploadProfileVisible}
          isCarouselMedia={isCarouselMediaVisible}
          setOpen={setIsUploadProfileVisible}
          removeHandler={deleteProfileConfirmationModalHandler}
        />
      </div>
    </>
  );
};

export default EditProfile;
