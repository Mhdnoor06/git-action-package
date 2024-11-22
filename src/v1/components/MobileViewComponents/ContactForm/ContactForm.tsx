import React, { useRef } from "react";
import BackButton from "../Shared/BackButton";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../MyProvider";
import "./ContactForm.css";
import {
  Card,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import SuccessMessageModelWithResponse from "../../../helpers/SuccessModalWithResponse/SuccessModalWithResponse";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { AdminInterFace } from "../../../redux/Types";
import { ContactFormAction } from "../../../redux/actions/ContactFormAction/ContactFormAction";
import Compressor from "compressorjs"; // For image compression
import CustomBtn from "../Shared/CustomBtn";
import { generateVideoThumbnail } from "./helper";

const ContactForm: React.FC<{ consumerMasjidId: string }> = ({
  consumerMasjidId,
}) => {
  const navigation = useNavigationprop();
  const dispatch = useAppThunkDispatch();
  const [reason, setReason] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [fileThumbnails, setFileThumbnails] = React.useState<string[]>([]);
  const [showSuccessMessageModal, setShowSuccessMessageModal] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false); // Loading state
  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleReasonChange = (event: SelectChangeEvent<string>) => {
    setReason(event.target.value);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  // Handle file selection with compression
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const validFiles: File[] = [];
      const acceptedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

      // const images: File[] = [];
      // const videos: File[] = [];

      setLoading(true); // Set loading state to true
      console.log(filesArray);
      // Process the uploaded files
      for (const file of filesArray) {
        // Check if the file is an image
        if (
          file.type.startsWith("image/") &&
          acceptedImageTypes.includes(file.type)
        ) {
          // Compress the image file
          const compressedFile = await new Promise<File>((resolve) => {
            new Compressor(file, {
              quality: 0.5, // Set the desired quality (50%)
              success(result) {
                const newFile = new File([result], file.name, {
                  type: file.type,
                });
                resolve(newFile);
              },
              error(err) {
                console.error(err);
                resolve(file); // Fallback to original file if compression fails
              },
            });
          });
          console.log(compressedFile.size);
          // Check if the compressed file size is under 9 MB
          if (compressedFile.size <= 9 * 1024 * 1024) {
            console.log("handle file change", file.name);

            validFiles.push(compressedFile);
            // Generate thumbnail for the image
            const thumbnail = URL.createObjectURL(compressedFile);
            setFileThumbnails((prevThumbnails) => [
              ...prevThumbnails,
              thumbnail,
            ]);
          } else {
            toast.error(
              `File too large after compression: ${file.name}. Max size is 9 MB.`
            );
          }
        } else if (file.type.startsWith("video/")) {
          // Check if the video size is under 10 MB
          if (file.size <= 9 * 1024 * 1024) {
            validFiles.push(file);

            // Generate thumbnail for the video
            const thumbnail = await generateVideoThumbnail(file);

            setFileThumbnails((prevThumbnails) => [
              ...prevThumbnails,
              thumbnail,
            ]);
          } else {
            toast.error(
              `Video too large: ${file.name}. Max original size is 9 MB..`
            );
          }
        } else {
          toast.error(
            `File type not supported: ${file.name}.Please upload only png, jpg, or jpeg images or videos only...`
          );
        }
      }

      // Sort files: Images first, then Videos by size
      // const sortedFiles = [
      //   ...images,
      //   ...videos.sort((a, b) => a.size - b.size),
      // ];

      if (validFiles.length > 0) {
        setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      }

      setLoading(false); // Reset loading state after processing files
    }
  };
  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedThumbnails = fileThumbnails.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setFileThumbnails(updatedThumbnails);
  };
  // Upload video chunks
  // const uploadVideoChunks = async (video: File) => {
  //   const chunks = Math.ceil(video.size / (10 * 1024 * 1024)); // Max chunk size is 10 MB
  //   for (let i = 0; i < chunks; i++) {
  //     const start = i * 10 * 1024 * 1024;
  //     const end = Math.min(start + 10 * 1024 * 1024, video.size);
  //     const chunk = video.slice(start, end);
  //     const chunkName = `chunk_${video.name.split(".")[0]}-${i + 1}.mp4`;

  //     const formData = new FormData();
  //     formData.append("video", chunk, chunkName);
  //     // formData.append("name", admin?.name || ""); // Handle cases where admin is null
  //     formData.append("name", ""); // Handle cases where admin is null
  //     formData.append("subject", "");
  //     formData.append("email", ""); // Handle cases where admin is null
  //     formData.append("message", "");
  //     console.log("uploading chunk", chunk, chunkName);
  //     try {
  //       await dispatch(ContactFormAction(formData)); // Upload chunk
  //     } catch (error) {
  //       toast.error("Failed to upload video chunk.");
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Reason is required!");
    } else if (!message) {
      toast.error("Message is required!");
    } else {
      setLoading(true); // Set loading state to true during submit
      const formData = new FormData();
      // Append all normal files to FormData
      selectedFiles.forEach((file) => {
        if (file.size <= 10 * 1024 * 1024) {
          formData.append("files", file);
        }
      });

      // Append other form data
      formData.append("name", admin?.name || "");
      formData.append("subject", reason);
      formData.append("email", admin?.email || "");
      formData.append(
        "message",
        `
        <h1>New Support Request:</h1>
        <div>Message: ${message}</div>
      `
      );

      // Log FormData contents
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name}`); // Log the file name
        } else {
          console.log(`${key}: ${value}`); // Log the other values
        }
      }

      try {
        const result = await dispatch(ContactFormAction(formData));
        if (result.message === "Email sent successfully") {
          // if (true) {
          setShowSuccessMessageModal(true);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }

      // Now handle video chunks
      // for (const file of selectedFiles) {
      //   if (file.size > 10 * 1024 * 1024) {
      //     await uploadVideoChunks(file);
      //   }
      // }

      setLoading(false); // Reset loading state after submit
    }
  };

  const handleClose = () => {
    setReason("");
    setMessage("");
    setSelectedFiles([]);
    setFileThumbnails([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowSuccessMessageModal(false);
  };

  return (
    <div className="contact-form-container">
      <div style={{ width: "100%" }}>
        <div className="goback">
          <BackButton
            handleBackBtn={() => {
              navigation ? navigation("/feed/0") : customNavigatorTo("/feed/0");
            }}
          />
        </div>
        <h3 className="page-title">Contact & Support</h3>
      </div>
      <div className="contact-main-form-container">
        <Card
          style={{
            width: "100%",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            padding: "20px",
          }}
          className="contact-support-form-card"
        >
          <Typography
            variant="subtitle2"
            textAlign={"center"}
            mb={3}
            gutterBottom
          >
            Please Tell Us Reason About Your Query
          </Typography>

          {/* Reason Label */}
          <Typography variant="body2" mb={1}>
            Reason
          </Typography>
          <FormControl
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
          >
            <Select
              value={reason}
              onChange={handleReasonChange}
              displayEmpty
              sx={{
                borderRadius: "12px",
              }}
              inputProps={{ "data-testid": "reason-id" }}
            >
              <MenuItem value="">Select Reason</MenuItem>
              <MenuItem sx={{ minHeight: "32px" }} value="Feedback">
                Feedback
              </MenuItem>
              <MenuItem value="Report Bug">Report Bug</MenuItem>
              <MenuItem value="Payment Issue">Payment Issue</MenuItem>
            </Select>
          </FormControl>

          {/* File Upload Section */}
          <div className="file-upload-section">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*,video/*" // Allow images and videos
              style={{ display: "none" }}
              ref={fileInputRef}
              data-testid="uploaded-input"
            />
            <div
              className="upload-container"
              style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
            >
              {fileThumbnails.map((thumbnail, index) => (
                <div
                  key={index}
                  className="thumbnail-container"
                  style={{ position: "relative" }}
                >
                  <img
                    src={thumbnail}
                    alt={thumbnail}
                    className="thumbnail"
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px dotted black",
                      borderRadius: "10px",
                    }}
                  />
                  <button
                    className="remove-button"
                    onClick={() => removeFile(index)}
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "-10px",
                      background: "black",
                      borderRadius: "50%",
                      color: "white",
                      width: "16px",
                      height: "16px",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    &times; {/* Cross mark to remove the file */}
                  </button>
                </div>
              ))}
              {/* Add more files section */}
              <div
                className="upload-area"
                onClick={() =>
                  !loading ? fileInputRef.current?.click() : null
                }
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px dotted black",
                  borderRadius: "10px",
                }}
              >
                <div className="upload-icon">+</div>
              </div>
            </div>
          </div>
          <Typography variant="body2" mb={1} mt={1}>
            Attach Video/Image
          </Typography>
          {/* Message Label */}
          <Typography variant="body2" mb={1}>
            Message
          </Typography>
          <TextField
            multiline
            rows={6}
            placeholder="Your message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={handleMessageChange}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            inputProps={{ "data-testid": "message-id" }}
          />

          <div className="form-submit-btn-container">
            <CustomBtn
              eventHandler={handleSubmit}
              label={loading ? "" : "Send"}
              isDisabled={loading}
              imgWidth="0px"
              isLoading={loading}
            />
          </div>
        </Card>
      </div>
      <SuccessMessageModelWithResponse
        open={showSuccessMessageModal}
        message={"Thank You!"}
        response={
          "Your query has been received. We will be in touch and contact you soon."
        }
        onClose={() => {
          handleClose();
        }}
      />
    </div>
  );
};

export default ContactForm;
