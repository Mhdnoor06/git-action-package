import React, { useRef, useContext, useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { resetPassword } from "../../../Redux/Actions/AuthActions/ResetPasswordAction.js";
// import { resetPasswordInitial } from "../../../Redux/Actions/AuthActions/ResetPasswordInitial.js";
// import { ChangeSnackbar } from "../../../Redux/Actions/SnackbarActions/SnackbarActions.js";
import { useDispatch } from "react-redux";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { resetPasswordInitial } from "../../../redux/actions/AuthActions/ResetPasswordInitial";
import { ActivatingTwoFactorAuth } from "../../../redux/actions/AuthActions/ActivatingTwoFactorAuth";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { VerifyingTwoFactorAuth } from "../../../redux/actions/AuthActions/VerifyingTwoFactorAuthAction";
// import { ActivatingTwoFactorAuth } from "../../../Redux/Actions/AuthActions/ActivateTwoFactorAuth.js";
// import { VerifyingTwoFactorAuth } from "../../../Redux/Actions/AuthActions/VerifyTwoFactorAuth.js";
// import {handleSnackbar} from '../../../helpers/SnackbarHelper/SnackbarHelper';



const ResetPasswordInitial = () => {

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const LoginCode = useRef();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [ConfirmPasswordType, setConfirmPasswordType] = useState("password");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("token");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [AllowCancel, setAllowCancel] = useState(false);
  const [QRCode, setQRCode] = useState("");
  const [UserID, setUserId] = useState("");
  // const [UserEmail, setUserEmail] = useState("");

  console.log(QRCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.current.value === confirmPassword.current.value) {
      const formData = {
        password: password.current.value,
        token: id,
      };

      setIsSubmitting(true);
      const res = dispatch(resetPasswordInitial(formData));

      res.then((result) => {
        if (result.success) {
          handleSnackbar(true,"success", ` Password Setup Successful`,dispatch);

          setIsSubmitting(false);
          
          const response = dispatch(ActivatingTwoFactorAuth());
          response.then(function (result) {
            if(result.success) {
              console.log(result.QR)
              setQRCode(result.QR);
              setIsQRModalOpen(true);
              setUserId(result.data._id);
              setIsSubmitting(false);
              // setUserEmail(result.data.email)
            } else {
              handleSnackbar(true,"error", result.message ? "Failed : " + result.message : "Failed : Internet or Server Issue ",dispatch);
            }
          });
        } else {

          handleSnackbar(true,"error", `Failed To Setup the Password : ` + result.message,dispatch);
          setIsSubmitting(false);
        }
      });
    } else {
      const snackbarDetails = {
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: `Password and Confirmed Password does not match`,
      };
      dispatch(ChangeSnackbar(snackbarDetails));
      setIsSubmitting(false);
    }
    setIsSubmitting(false);

  };
  const handleQRModalClose = () => {
    let formData = {
      password: password.current.value,
      token: LoginCode.current.value,
      userId: UserID,
      isInitial: true,
    };
    const res = dispatch(VerifyingTwoFactorAuth(formData));
    res.then((result) => {
      if (result.success) {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `Verified Successfully`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
       
        setIsSubmitting(false);
        setIsQRModalOpen(false);
      } else {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Request Failed :Invalid token`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        setIsSubmitting(false);
      }
    });
  };

  const handleQRCloseButtonAction = () => {
    setIsQRModalOpen(false);
  };

  const handleCodeChange  = () => {
    if (LoginCode.current?.value?.length > 5) {
      setAllowCancel(true);
    } else if (LoginCode.current?.value?.length === 0) {
      setAllowCancel(false);
    }
  };

  return (
    <div className="ForgotPassword">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ConnectMazjid Portal</h3>
          <span className="loginDesc">
            The Admin Portal of Masjid App to work with masjid's and Events.
          </span>
        </div>
        <div className="loginRight">
          <div className="ModalContainerTwoFactor">
            <Dialog open={isQRModalOpen} style={{ height:'10rem'}} >
              <DialogTitle>
                Scan this QR CODE with Google Authenticator App
              </DialogTitle>
              <DialogContent>
                <Box
                  component="img"
                  sx={{ height: 260, width: 270, marginLeft: 10 }}
                  alt="Qr Code"
                  src={QRCode}
                  />
                <TextField
                  autoFocus
                  margin="dense"
                  label="TOTP"
                  sx={{ marginLeft: 15, marginTop: 2 }}
                  type="number"
                  onChange={handleCodeChange}
                  inputRef={LoginCode}
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <p>Enter the TOTP from Google Authenticator App to Submit </p>
                {AllowCancel && (
                  <Button onClick={handleQRModalClose} style={{ color: "grey" }}>
                    Verify
                  </Button>
                )}
                {AllowCancel && (
                  <Button
                  onClick={handleQRCloseButtonAction}
                    style={{ color: "grey" }}
                    >
                    Close
                  </Button>
                )}
              </DialogActions>
            </Dialog>
           </div>
          <div className="loginBox">
            <form onSubmit={handleSubmit} className="ForgotPasswordBox">
              <div class="InputFields">
                <input
                  placeholder="Password"
                  type={passwordType}
                  ref={password}
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                  className="ResetPasswordInput"
                />
                {isPasswordVisible ? (
                  <AiFillEye
                    onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
                    className="ShowPasswordLogin"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
                    className="ShowPasswordLogin"
                  />
                )}
              </div>
              <div class="InputFields">
                <input
                  placeholder="Confirm Password"
                  type={ConfirmPasswordType}
                  ref={confirmPassword}
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                  className="ResetPasswordInput"
                />
                {isConfirmPasswordVisible ? (
                  <AiFillEye
                    onClick={()=>setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    className="ShowPasswordLogin"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={()=>setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    className="ShowPasswordLogin"
                  />
                )}
              </div>
              <span className="PasswordDetails">
                Password must has at least 8 characters, that include at least 1
                lowercase character, 1 uppercase characters, 1 number and 1
                speical character in (!@#$%^&*)
              </span>
              <button
                className="ForgotPasswordBtn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Reset Password"
                )}
              </button>
              <span className="BackToLogin">
                <Link to="/login">Back to Login</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordInitial;
