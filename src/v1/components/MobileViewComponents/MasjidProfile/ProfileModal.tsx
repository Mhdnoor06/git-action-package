import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import RemoveIcon from "@mui/icons-material/Remove";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch } from "react-redux";
import { uploadMasjidProfile } from "../../../redux/actions/MasjidActions/UploadMasjidProfileAction";
import { useAppDispatch, useAppThunkDispatch } from "../../../redux/hooks";
import toast from "react-hot-toast";
import CustomBtn from "../Shared/CustomBtn";
import { uploadMasjidMedia } from "../../../redux/actions/MasjidActions/UploadMasjidMediaAction";
interface CustomModalProps {
  open: boolean;
  isCarouselMedia: boolean;
  masjidId: string;
  removeHandler: () => void;
  masjidReloader: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileModal: React.FC<CustomModalProps> = ({
  open,
  isCarouselMedia,
  setOpen,
  masjidId,
  removeHandler,
  masjidReloader,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | Blob | null>(
    null
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppThunkDispatch();
  const handleUploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowWidth);

  const handleUploadImgAPIRequest = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", uploadedImage as string);
    const uploadMedia = isCarouselMedia
      ? uploadMasjidMedia(masjidId, formData)
      : uploadMasjidProfile(masjidId, formData);

    const result = await dispatch(uploadMedia);

    if (result?.status === 200 || result.data?.message === "Created") {
      toast.success("Successfully uploaded!");
      setOpen(false);
      setLoading(false);
      masjidReloader();
      setUploadedImage(null);
    } else {
      toast.error(result?.message);
      setLoading(false);
    }
  };

  const handleRemoveProfile = () => {
    setUploadedImage(null);
    removeHandler();
    // Handle remove profile logic
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log("use effect running");
    setUploadedImage(null);
  }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: windowWidth >= 768 ? "30%" : "85%",
          height: 197,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
          borderRadius: "30px",
          boxShadow: 24,
          bgcolor: "background.paper",
          outline: "none",
        }}
      >
        <Button
          sx={{ position: "absolute", top: 10, right: 10, fontSize: 20 }}
          onClick={onClose}
        >
          <CloseIcon sx={{ fontSize: 30, color: "#9F9E9E" }} />
        </Button>

        {uploadedImage ? (
          <CustomBtn
            label="Start Uploading"
            isLoading={loading}
            eventHandler={handleUploadImgAPIRequest}
            showIcon={false}
          />
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-profile-input"
              onChange={handleUploadProfile}
            />
            <label htmlFor="upload-profile-input">
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{
                  width: 239,
                  height: 39,
                  borderRadius: 30,
                  bgcolor: "#1B8368",
                  mb: 1,
                }}
                startIcon={<FileUploadIcon />}
              >
                Upload {isCarouselMedia ? "Masjid Photos" : "Profile"}
              </Button>
            </label>
          </>
        )}
        {uploadedImage && (
          <img
            src={URL.createObjectURL(uploadedImage as File)}
            alt="Uploaded Profile"
            style={{
              width: 200,
              height: 100,
              borderRadius: 10,
              margin: "8px 0",
            }}
          />
        )}
        {!isCarouselMedia ? (
          <Button
            variant="outlined"
            sx={{
              width: 239,
              height: 39,
              borderRadius: 30,
              color: "#9F9E9E",
              borderColor: "#9F9E9E",
              borderStyle: "dotted",

              mt: 1,
            }}
            onClick={handleRemoveProfile}
          >
            Remove Profile
          </Button>
        ) : null}
      </Box>
    </Modal>
  );
};

export default ProfileModal;
