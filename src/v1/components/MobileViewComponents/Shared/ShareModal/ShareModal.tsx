import React from "react";
import { Popover, Box, Typography, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsApp from "../../../../photos/Newuiphotos/shareIcon/wapp.svg";
import Facebook from "../../../../photos/Newuiphotos/shareIcon/fb.svg";
import Instagram from "../../../../photos/Newuiphotos/shareIcon/insta.svg";
import Link from "../../../../photos/Newuiphotos/shareIcon/link.svg";
import Twitter from "../../../../photos/Newuiphotos/shareIcon/X.svg";
import Messenger from "../../../../photos/Newuiphotos/shareIcon/messenger.svg";
import toast from "react-hot-toast";

interface SharePopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  shareUrl: string;
}

const SharePopover: React.FC<SharePopoverProps> = ({
  anchorEl,
  onClose,
  shareUrl,
}) => {
  const open = Boolean(anchorEl);

  const handleShareClick = (platform: string) => {
    let shareLink = "";

    switch (platform) {
      case "WhatsApp":
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
        break;
      case "Facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "Messenger":
        shareLink = `fb-messenger://share/?link=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "X":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      default:
        shareLink = shareUrl;
    }

    window.open(shareLink, "_blank");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareUrl);
    console.log("ccc");
    toast.success("Link copied to clipboard!");
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ width: "400px" }}
      disableAutoFocus
      disableEnforceFocus
      data-testid="share-popover"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 2,
          minWidth: 200,
        }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          <img src={Link} alt="" style={{ width: "20px" }} />
          <Box></Box>

          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              border: "1px solid #9F9E9E",
              padding: "5px",
              marginLeft: "10px",
              borderRadius: "10px",
              color: "#9F9E9E",
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {shareUrl.slice(0, 30) + "....."}
            <IconButton
              sx={{ marginLeft: "10px", padding: "0px" }}
              onClick={handleCopyClick}
            >
              <ContentCopyIcon
                fontSize="small"
                sx={{ color: "#9F9E9E", width: "15px" }}
              />
            </IconButton>
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          sx={{ fontSize: "12px" }}
        >
          <IconButton
            sx={{ borderRadius: "0", width: "100%", justifyContent: "start" }}
            onClick={() => handleShareClick("WhatsApp")}
          >
            <img src={WhatsApp} alt="" style={{ width: "20px" }} />
            <Typography sx={{ marginLeft: 1, fontSize: "13px" }}>
              Share in WhatsApp
            </Typography>
          </IconButton>
          <IconButton
            sx={{ borderRadius: "0", width: "100%", justifyContent: "start" }}
            onClick={() => handleShareClick("Facebook")}
          >
            <img src={Facebook} alt="" style={{ width: "20px" }} />
            <Typography sx={{ marginLeft: 1, fontSize: "13px" }}>
              Share in Facebook
            </Typography>
          </IconButton>
          <IconButton
            sx={{ borderRadius: "0", width: "100%", justifyContent: "start" }}
            onClick={() => handleShareClick("Messenger")}
          >
            <img src={Messenger} alt="" style={{ width: "20px" }} />
            <Typography sx={{ marginLeft: 1, fontSize: "13px" }}>
              Share in Messenger
            </Typography>
          </IconButton>

          <IconButton
            sx={{ borderRadius: "0", width: "100%", justifyContent: "start" }}
            onClick={() => handleShareClick("X")}
          >
            <img src={Twitter} alt="" style={{ width: "20px" }} />
            <Typography sx={{ marginLeft: 1, fontSize: "13px" }}>
              Share in X
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </Popover>
  );
};

export default SharePopover;
