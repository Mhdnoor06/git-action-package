import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./FullScreenImageModal.css";
// Styles for the modal and image
const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imgStyle = {
  width: "100%",
  height: "auto",
  maxHeight: "90vh",
  maxWidth: "90vw",
  objectFit: "contain",
};

const FullScreenImageModal = ({ isOpen, setIsOpen, imgSrc, imgAlt }: any) => {
  //   const [open, setOpen] = useState(false);

  //   const handleOpen = () => handleToggleImage;
  //   const handleClose = () => setOpen(false);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
      sx={modalStyle}
      data-testid="fullscreen-img-modal"
    >
      <Box sx={{ position: "relative" }} className="imageModalBox">
        {/* <IconButton
          onClick={() => {
            setIsOpen(false);
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton> */}

        <TransformWrapper
          // limitToBounds={true}
          alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
          centerZoomedOut={true}
          pinch={{ step: 10 }} // Fine-tune pinch sensitivity if needed
        >
          <TransformComponent>
            <img src={imgSrc} alt={imgAlt} style={imgStyle} />
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </Modal>
  );
};

export default FullScreenImageModal;
