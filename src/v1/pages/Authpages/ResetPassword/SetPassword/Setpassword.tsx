import React, { useRef, useState } from "react";
import LogoMain from "../../../../photos/Newuiphotos/CM Logo/cmlogofor.svg";
import { resources } from "../../../../resources/resources";
import CloseIcon from "@mui/icons-material/Close";
import ResetPassIcon from "../../../../photos/Newuiphotos/Icons/resetPass.svg";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useLocation } from "react-router";
import { resetPasswordInitial } from "../../../../redux/actions/AuthActions/ResetPasswordInitial";
// import { ActivatingTwoFactorAuth } from "../../../../redux/actions/AuthActions/ActivatingTwoFactorAuth";
import { useAppThunkDispatch } from "../../../../redux/hooks";
import { handleSnackbar } from "../../../../helpers/SnackbarHelper/SnackbarHelper";
import { ChangeSnackbar } from "../../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { CircularProgress } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Backdrop, Box } from "@mui/material";
// import { VerifyingTwoFactorAuth } from "../../../../redux/actions/AuthActions/VerifyingTwoFactorAuthAction";
import resetSuccessIcon from "../../../../photos/Newuiphotos/Icons/successTick.svg";
import { authLogin } from "../../../../redux/actions/AuthActions/LoginAction";
import toast from "react-hot-toast";

interface ResultType {
  success: boolean;
  TwoFAUser: boolean;
  adminId: string;
  message: string;
}

const Setpassword = () => {
  const language = resources["en"];
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  // const [logingIn, setLoggingIn] = useState(false);
  // const [UserEmail, setUserEmail] = useState("");
  // const [UserID, setUserId] = useState("");
  // const [OpenQRModal, setOpenQRModal] = useState(false);
  // const [AllowCancel, setAllowCancel] = useState(false);
  // const [QRCode, setQRCode] = useState("");
  // const LoginCode = useRef<HTMLInputElement>(null);
  
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const decodedToken: any = jwt_decode(token ?? "");
  const dispatch = useAppThunkDispatch();
  
  const [Captcha, setCaptcha] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (password === confirmPassword) {
        const formData = {
          password: password ?? "",
          token: token ?? "",
        };

        setIsSubmitting(true);
        const res = dispatch(resetPasswordInitial(formData));

        res.then((result) => {
          if (result.success) {
            setIsSubmitting(false);
            setIsResetSuccessful(true);
            handleSnackbar(
              true,
              "success",
              "Password set successfully",
              dispatch
            );

            toast.success("Logging In...", {
              duration: 3000,
            });

            if (decodedToken?.email && password) {
              // setLoggingIn(true);
              const res = dispatch(
                authLogin(
                  {
                    email: decodedToken?.email,
                    password: password,
                  },
                  Captcha
                )
              );
              res.then((result: ResultType) => {
                if (result.success) {
                  if (result.TwoFAUser) {
                    //   setOpenModal(true);
                    //   setadminId(result?.adminId);
                    console.log("2fa");
                  } else {
                    //   setadminId(result.adminId);
                    handleSnackbar(
                      true,
                      "success",
                      "Logged In Successfully",
                      dispatch
                    );
                  }
                  setIsSubmitting(false);
                } else {
                  handleSnackbar(
                    true,
                    "error",
                    `Failed to Login` + result.message,
                    dispatch
                  );
                  setIsSubmitting(false);
                }
              });
            } else {
              handleSnackbar(
                true,
                "warning",
                "Please Provide the Credentials to login",
                dispatch
              );
              setIsSubmitting(false);
            }

            // const response = dispatch(ActivatingTwoFactorAuth());
            // response.then(function (result) {
            //   if (result.success) {
            //     console.log(result.QR);
            //     setQRCode(result.QR);
            //     setOpenQRModal(true);
            //     setUserId(result.data._id);
            //     setisFetching(false);
            //     setUserEmail(result.data.email);
            //     setUserEmail(result.data.email);
            //   } else {
            //     handleSnackbar(
            //       true,
            //       "error",
            //       result.message
            //         ? "Failed : " + result.message
            //         : "Failed : Internet or Server Issue ",
            //       dispatch
            //     );
            //   }
            // });
          } else {
            handleSnackbar(
              true,
              "error",
              `Failed To Setup the Password : ` + result.message,
              dispatch
            );
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
      //   setisFetching(false);
    }, 2000);
  };

  return (
    <div className="setpassword-container">
      <div className="setpasswordhead">
        <div className="spheaderlogo">
          <img src={LogoMain} alt="mymasjidicon" className="fpLogoMainIcon" />
        </div>
        <div className="sp-name">
          <span className="sp-fname">
            {language.BANER.INPUT_PLACEHOLDER_FIRST_NAME}{" "}
          </span>
          <span className="sp-lname">
            {language.BANER.INPUT_PLACEHOLDER_SECOND_NAME}{" "}
          </span>
        </div>
      </div>
      {/* {!OpenQRModal ? (
        <div className="BannerPoppup">
          <div className="InsideBannerPoppup">
            <div className="TextInsideBannerPoppup">
              <a
                href="https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform"
                className="TextInsideBannerPoppup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn how to enroll with Google Authentication App
              </a>
            </div>
            <div className="QrCodeTotp">
              <div className="QrCOdeDiv">
                <Box
                  component="img"
                  sx={{ height: 260, width: 270, marginLeft: 10 }}
                  alt="Qr Code"
                  src={QRCode}
                />
              </div>
              <div className="TotpIndiseDiv">
                <div className="TOTPTitle">
                  Scan this QR Code with
                  <br />
                  GOOGLE AUTHENTICATION APP
                </div>
                <div className="Totp">
                  <input
                    type="number"
                    onChange={handleChange}
                    ref={LoginCode}
                    className="TOTPINPUT"
                  />
                  <button onClick={handleQRClose} className="TOTPVERIFYBTN">
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
      <span>
        <h3>Welcome on board ! </h3>
      </span>

      <div className="setpasswordForm">
        <span className="BackToLogin">
          <Link to="/login">
            <CloseIcon />
          </Link>
        </span>
        {!isResetSuccessful ? (
          <form className="setpasswordbox">
            <Backdrop open={isSubmitting} sx={{ zIndex: "1" }}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <div className="setpasswordlogo">
              <img
                src={ResetPassIcon}
                className="emailLogoimg"
                //   alt="ForgotPasswordLogoimg"
                style={{ width: "50px" }}
              />
              <b style={{ marginBottom: "10px" }}>Set your password</b>
              <p style={{ margin: "0", fontSize: "small" }}>
                {decodedToken?.email}
              </p>
            </div>

            <div className="setpassInputFields">
              <input
                placeholder={
                  language.RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD
                }
                type={isPasswordVisible?"text":"password"}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required={true}
                className="setPasswordInput"
                //   style={{ marginBottom: "15px" }}
              />
              {isPasswordVisible ? (
                <AiFillEye
                  onClick={()=>{setIsPasswordVisible(!isPasswordVisible)}}
                  className="ShowPasswordLogin"
                  data-testid="password-toggle-icon"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={()=>{setIsPasswordVisible(!isPasswordVisible)}}
                  className="ShowPasswordLogin"
                  data-testid="password-toggle-icon"
                  
                />
              )}
            </div>
            <div className="setpassInputFields">
              <input
                placeholder={
                  language.RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD
                }
                type={isConfirmPasswordVisible?"text":"password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
                className="setPasswordInput"
                //   style={{ marginBottom: "15px" }}
              />
              {isConfirmPasswordVisible ? (
                <AiFillEye
                  onClick={()=>{setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}}
                  className="ShowPasswordLogin"
                  data-testid="confirm-password-toggle-icon"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={()=>{setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}}
                  className="ShowPasswordLogin"
                  data-testid="confirm-password-toggle-icon"
                />
              )}
            </div>

            <button
              className="setPasswordBtnn"
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              // style={{ padding: "0", borderRadius: "25px" }}
            >
              {isSubmitting ? (
                <CircularProgress size="20px" />
              ) : (
                <>Set password</>
              )}
            </button>
          </form>
        ) : (
          <>
            <div className="setpasswordsuccesscontainer">
              <div className="setpasswordsuccessone">
                <div className="setpasswordsuccesstwo">
                  <img
                    src={resetSuccessIcon}
                    alt=""
                    style={{ height: "70px" }}
                  />
                  <p>Your password has been reset</p>
                  <b style={{ marginBottom: "20px" }}>“Successfully”</b>
                  {/* <button
                    className="setpasswordbtnsuccess"
                    // style={{
                    //   padding: "0",
                    //   borderRadius: "25px",
                    //   background: "#1B8368",
                    // }}
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Setpassword;
