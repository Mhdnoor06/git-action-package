import React, { SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SnackbarCloseReason } from "@material-ui/core";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";

const Alert = React.forwardRef(function Alert(
  props: AlertProps,
  ref: React.Ref<HTMLDivElement>
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const snackbarOpen = useAppSelector(
    (state) => state.snackBarState.snackbarOpen
  );
  const snackbarType: any = useAppSelector(
    (state) => state.snackBarState.snackbarType
  );
  const snackbarMessage = useAppSelector(
    (state) => state.snackBarState.snackbarMessage
  );

  const snackbarDetails = {
    snackbarOpen: false,
    snackbarMessage: snackbarMessage,
    snackbarType: snackbarType,
  };

  const handleClose = (
    event: Event | SyntheticEvent<any, Event>,
    reason: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(ChangeSnackbar(snackbarDetails));
  };

  const handleClose2 = (
    event: React.SyntheticEvent<Element, Event> | undefined
  ) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    dispatch(ChangeSnackbar(snackbarDetails));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1700}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose2}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
