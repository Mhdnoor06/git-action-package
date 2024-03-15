import imageCompression from "browser-image-compression";
import { handleSnackbar } from "../SnackbarHelper/SnackbarHelper";
import { useAppThunkDispatch } from "../../redux/hooks";

const ImageCompression = async (selectedImage: File | undefined) => {
  const dispatch = useAppThunkDispatch();
  const imageFile = selectedImage;
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    if (imageFile) {
      const compressedFile = await imageCompression(imageFile, options);

      return compressedFile;
    }
  } catch (error: any) {
    handleSnackbar(
      true,
      "warning",
      "Failed to Compress the Uploaded Image:Try again",
      dispatch
    );
  }
};

export default ImageCompression;
