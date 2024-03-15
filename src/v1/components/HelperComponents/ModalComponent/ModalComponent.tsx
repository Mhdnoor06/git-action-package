import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";

type propsType = {
  OpenOn: boolean;
  Message: string;
  OnAcceptedByUser: () => void;
  OnDeclinedByuser: () => void;
  Loading: boolean;
};
const ModalComponent = ({
  OpenOn,
  Message,
  OnAcceptedByUser,
  OnDeclinedByuser,
  Loading,
}: propsType) => {
  return (
    <>
      <Dialog
        open={OpenOn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{Message}</DialogTitle>
        <DialogActions>
          <Button
            onClick={OnDeclinedByuser}
            variant="outlined"
            disabled={Loading}
          >
            No
          </Button>
          <Button onClick={OnAcceptedByUser} variant="outlined">
            {" "}
            {Loading ? (
              <CircularProgress size="15px" />
            ) : (
              <span> Yes </span>
            )}{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalComponent;
