import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";
import toast from "react-hot-toast";
import { useWidgetAuth } from "../../../../../graphql-api-calls/widgetAuth/widgetAuth";

const ShareModal = ({ id, assetType, isOpen, onClose, consumerMasjidId }) => {
  //   const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const isMobile = useMediaQuery("(max-width:768px)");
  const { authenticateWidget, data, loading, error } = useWidgetAuth();

  // Function to generate the share URL based on asset type
  const createShareLink = (token: string) => {
    let baseUrl = import.meta.env.VITE_WIDGET_BASE_URL;

    switch (assetType) {
      case "program":
        baseUrl += `/programDetails?id=${id}&token=${token}`;
        break;
      case "event":
        baseUrl += `/eventDetails?id=${id}&token=${token}`;
        break;
      case "service":
        baseUrl += `/serviceDetails?id=${id}&token=${token}`;
        break;
      default:
        baseUrl += `/details?id=${id}&token=${token}`;
        break;
    }

    return baseUrl;
  };

  // Authenticate and generate the share URL
  const handleAuthenticate = async () => {
    try {
      const response = await authenticateWidget(consumerMasjidId, assetType);
      const token = response.data.widgetAuth; // Assuming this is where the token is returned
      const generatedUrl = createShareLink(token);
      setShareUrl(generatedUrl); // Update the share URL with the generated one
    } catch (err) {
      console.error("Error during authentication:", err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      handleAuthenticate(); // Generate the share URL when the modal opens
    }
  }, [isOpen]);

  // console.log(handleAuthenticate());

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    // setCopied(true);
    // setTimeout(() => setCopied(false), 2000);
    toast.success("Copied!");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      //   maxWidth="xs"
      //   fullWidth
      //   sx={{
      //     "&.MuiDialog-container": { alignItems: isMobile ? "end" : "center" },
      //   }}
      PaperProps={{
        sx: {
          padding: "0px", // Custom padding
          margin: "0px",
          width: isMobile ? "100%" : "30%",
          borderRadius: "22px",
          //   backgroundColor: "#f0f0f0",
          //   borderRadius: "15px",
        },
      }}
      sx={{
        "& .MuiDialog-container": {
          alignItems: isMobile ? "flex-end" : "center",
        },
      }}
    >
      <DialogTitle>
        Share
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              "& .react-share__ShareButton svg path": {
                transform: "translate(-1%, 2%)",
              },
            }}
          >
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={45} round />
            </WhatsappShareButton>
          </Box>

          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={45} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={45} round />
          </TwitterShareButton>

          <RedditShareButton url={shareUrl}>
            <RedditIcon size={45} round />
          </RedditShareButton>

          <EmailShareButton url={shareUrl}>
            <EmailIcon size={45} round />
          </EmailShareButton>
        </div>
        <TextField
          fullWidth
          value={shareUrl}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy}>
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* {copied && <Button color="success">Link Copied!</Button>} */}
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
