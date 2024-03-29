import React, { useRef, useState } from "react";
import "./Login.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { resources } from "../../../resources/resources";
import { authLogin } from "../../../redux/actions/AuthActions/LoginAction";
import { VerifyingTwoFactorAuth } from "../../../redux/actions/AuthActions/VerifyingTwoFactorAuthAction";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";

import LogoMain from "../../../photos/Newuiphotos/CM Logo/CM Logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordInput from "../../Shared/PasswordInput/PasswordInput";
import { useAppThunkDispatch } from "../../../redux/hooks";
// import { Box, FormControlLabel, Grow, Slide, Switch } from "@mui/material";
interface ResultType {
  success: boolean;
  TwoFAUser: boolean;
  adminId: string;
  message: string;
}
const Login = () => {
  const [OpenModal, setOpenModal] = useState(false);
  const [isFetching, setisFetching] = useState(false);
  const recaptcha = useRef<ReCAPTCHA>(null);
  const email = useRef<HTMLInputElement>(null);
  const token = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const dispatch = useAppThunkDispatch();
  const [adminId, setadminId] = useState("");
  const [CaptchaValue, setCaptchaValue] = useState(false);
  const [Captcha, setCaptcha] = useState("");
  const language = resources["en"];
  const [showPas, setShowPas] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function onChange(value: string | null) {
    if (value && !CaptchaValue) {
      setCaptchaValue(true);
    }
    if (value) setCaptcha(value);
  }

  const handleModalUpdate = () => {
    setOpenModal(false);
    setisFetching(false);
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setisFetching(true);
    e.preventDefault();
    if (email.current?.value && password.current?.value) {
      const res = dispatch(
        authLogin(
          { email: email.current.value, password: password.current.value },
          Captcha
        )
      );
      res.then((result: ResultType) => {
        if (result.success) {
          if (result.TwoFAUser) {
            setOpenModal(true);
            setadminId(result?.adminId);
          } else {
            setadminId(result.adminId);
            handleSnackbar(true, "success", "Logged In Successfully", dispatch);
          }
          setisFetching(false);
        } else {
          handleSnackbar(
            true,
            "error",
            `Failed to Login` + result.message,
            dispatch
          );
          setisFetching(false);
        }
      });
    } else {
      handleSnackbar(
        true,
        "warning",
        "Please Provide the Credentials to login",
        dispatch
      );
      setisFetching(false);
    }
  };

  const handleTwoFactorAuthCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    setisFetching(true);
    e.preventDefault();
    let formData = {
      // token: token.current.value,
      // password: password.current.value,
      // userId: adminId,
      userId: adminId,
      token: token.current?.value ?? "",
      password: password.current?.value ?? "",
    };

    const res = dispatch(VerifyingTwoFactorAuth(formData)); //,navigate
    res.then((result: ResultType) => {
      if (result.success) {
        // console.log(result.success)
        handleSnackbar(true, "success", "Logged In Successfully", dispatch);
        setisFetching(false);
        setOpenModal(false);
      } else {
        handleSnackbar(
          true,
          "error",
          `Failed To LogIn :Invalid token`,
          dispatch
        );
        setisFetching(false);
      }
    });
  };

  return (
    <div className="LoginMainContainer">
      <div className="LoginHeadContainer">
        <div className="LoginLeftContainer">
          <div className="BannerPoppupMain">
            <Dialog open={OpenModal}>
              <DialogTitle> {language.MODAL.MODAL_TITLE}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="OTP"
                  sx={{ marginLeft: 10, marginTop: 2 }}
                  type="number"
                  inputRef={token}
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalUpdate} style={{ color: "grey" }}>
                  {language.MODAL.MODAL_CANCEL}
                </Button>
                <Button onClick={handleTwoFactorAuthCheck}>
                  {language.MODAL.MODAL_SUBMIT}{" "}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="LoginLogoHeadContainer">
            <img
              src={LogoMain}
              alt="mymasjidicon"
              // className="LogoMainIcon"
              style={{ width: "120px" }}
            />
          </div>
          <div className="LoginLogoBottomContainer">
            <span className="SiteName">
              <p style={{ fontSize: "18px" }}>
                {language.BANER.INPUT_PLACEHOLDER_FIRST_NAME}
              </p>
            </span>
            <span className="SiteNameEnd" style={{ marginLeft: "3px" }}>
              <p style={{ fontSize: "18px" }}>
                {language.BANER.INPUT_PLACEHOLDER_SECOND_NAME}
              </p>
            </span>
          </div>
          {/* <div className="LoginLogoDescContainer">
            <span className="siteNamebottom">
              {" "}
              {language.BANER.INPUT_PLACEHOLDER_DESCRIPTION}{" "}
            </span>
          </div> */}
        </div>
        <div className="LoginrightContainer">
          <form onSubmit={(e) => handleLoginSubmit(e)} className="loginBox">
            <input
              placeholder={language.LOGIN.INPUT_PLACEHOLDER_EMAIL}
              type="email"
              ref={email}
              required
              className="loginInput"
            />

            <PasswordInput
              reference={password}
              pHolder={"Password"}
              showPas={showPas}
              setShowPas={setShowPas}
              belowTx={false}
            />
            {/* <div className="RecapchaBtn">
              <ReCAPTCHA
                ref={recaptcha}
                sitekey="6LfZT40kAAAAAACn61_xFm5Tp580i2RF9Jfmuesa"
                onChange={onChange}
              />
            </div> */}

            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size="20px" style={{ color: "white" }} />
              ) : (
                <>{language.LOGIN.BUTTON_SUBMIT}</>
              )}
            </button>
            <div className="links">
              <span className="loginForgot">
                <Link to="/Request_new_user">
                  {language.REQUEST_AS_NEW_USER.BUTTON_REDIRECT}
                </Link>
              </span>
              <span className="loginForgot">
                <Link to="/forgotpassword">
                  {language.LOGIN.BUTTON_REDIRECT}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* <Box
        sx={{
          height: 280,
          width: 300,
          position: "absolute",
          zIndex: 10,
        }}
      >
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
            <svg>
              <Box
                component="polygon"
                points="0,100 50,00, 100,100"
                sx={{
                  fill: (theme) => theme.palette.common.white,
                  stroke: (theme) => theme.palette.divider,
                  strokeWidth: 1,
                }}
              />
            </svg>
          </Paper>
        </Slide>
      </Box> */}
    </div>
  );
};

export default Login;
