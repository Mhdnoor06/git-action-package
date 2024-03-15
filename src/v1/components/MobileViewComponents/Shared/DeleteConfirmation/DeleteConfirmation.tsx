import { Backdrop, Box, CircularProgress, Grow, Modal } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import DeleteProfileIcon from "../../../../photos/Newuiphotos/Icons/delete.svg";
interface DeleteConfirmationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  progress: boolean;
  texts: { main: string; sub?: string };
  handleReject: () => void;
  handleDelete: () => void;
}
const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  open,
  setOpen,
  progress,
  texts,
  handleReject,
  handleDelete,
}) => {
  const onClose = () => {
    console.log("onClose function trigered");
    setOpen(!open);
  };
  return (
    <Modal open={open} onClose={onClose}>
      {/* <Backdrop open={open} sx={{ zIndex: "1" }}> */}
      {progress ? (
        <div style={containerStyle}>
          <CircularProgress color="success" className="loader" />
        </div>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <div className="deleteCard">
              <Box sx={{ display: "flex" }}>
                <div className="delete">
                  <div className="profileIcon">
                    <div className="deleteIcon">
                      <img src={DeleteProfileIcon} alt="" />
                    </div>
                  </div>
                  <div className="content">
                    <h5 style={{ margin: "auto 30px" }}>{texts.main}</h5>
                    <p>{texts.sub}</p>
                  </div>
                  <div className="btns">
                    <div className="no" onClick={handleReject}>
                      <a>No</a>
                    </div>
                    <div className="yes" onClick={handleDelete}>
                      <a>Yes</a>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </Box>
        </>
      )}
      {/* </Backdrop> */}
    </Modal>
  );
};
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};
export default DeleteConfirmation;
