import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
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
import "./Login.css";
import LogoMain from "../../../photos/Newuiphotos/CM Logo/CM Logo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordInput from "../../Shared/PasswordInput/PasswordInput";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Box, Tooltip } from "@mui/material";
import { getHcaptchaKey } from "../../../helpers/ApiSetter/GraphQlApiSetter";
interface ResultType {
  success: boolean;
  TwoFAUser: boolean;
  adminId: string;
  message: string;
}
const Login = () => {
  const capchaKey = getHcaptchaKey();
  const captchaRef = useRef<HCaptcha>(null); // Ref to handle manual trigger
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppThunkDispatch();
  const [adminId, setadminId] = useState("");
  // const [CaptchaValue, setCaptchaValue] = useState(false);
  const [Captcha, setCaptcha] = useState("");
  const language = resources["en"];
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isExecutingCaptcha, setIsExecutingCaptcha] = useState(false);
  const handleCloseTwoFactorModal = () => {
    setIsTwoFactorModalOpen(false);
    setIsSubmitting(false);
  };

  // const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   setIsSubmitting(true);
  //   e.preventDefault();
  //   if (emailRef.current?.value && passwordRef.current?.value) {
  //     const res = dispatch(
  //       authLogin(
  //         {
  //           email: emailRef.current.value,
  //           password: passwordRef.current.value,
  //         },
  //         Captcha
  //       )
  //     );
  //     res.then((result: ResultType) => {
  //       if (result.success) {
  //         if (result.TwoFAUser) {
  //           setIsTwoFactorModalOpen(true);
  //           setadminId(result?.adminId);
  //         } else {
  //           setadminId(result.adminId);
  //           handleSnackbar(true, "success", "Logged In Successfully", dispatch);
  //         }
  //         setIsSubmitting(false);
  //       } else {
  //         handleSnackbar(
  //           true,
  //           "error",
  //           `Failed to Login` + result.message,
  //           dispatch
  //         );
  //         setIsSubmitting(false);
  //       }
  //     });
  //   } else {
  //     handleSnackbar(
  //       true,
  //       "warning",
  //       "Please Provide the Credentials to login",
  //       dispatch
  //     );
  //     setIsSubmitting(false);
  //   }
  // };

  // const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Ensure fields are filled before triggering captcha
  //   if (emailRef.current?.value && passwordRef.current?.value) {
  //     if (isExecutingCaptcha) {
  //       captchaRef.current?.execute();
  //       setIsSubmitting(true);
  //     } else {
  //       setIsSubmitting(true);
  //       if (emailRef.current?.value && passwordRef.current?.value) {
  //         const res = dispatch(
  //           authLogin(
  //             {
  //               email: emailRef.current.value,
  //               password: passwordRef.current.value,
  //             },
  //             "" // Send captcha token
  //           )
  //         );
  //         res.then((result: ResultType) => {
  //           if (result.success) {
  //             if (result.TwoFAUser) {
  //               setIsTwoFactorModalOpen(true);
  //               setadminId(result?.adminId);
  //             } else {
  //               setadminId(result.adminId);
  //               handleSnackbar(
  //                 true,
  //                 "success",
  //                 "Logged in successfully",
  //                 dispatch
  //               );
  //             }
  //             setIsSubmitting(false);
  //           } else {
  //             setIsExecutingCaptcha(true);
  //             handleSnackbar(
  //               true,
  //               "error",
  //               `Failed to Login: ${result.message}`,
  //               dispatch
  //             );
  //             setIsSubmitting(false);
  //           }
  //         });
  //       }
  //     }

  //     // Trigger hCaptcha validation
  //   } else {
  //     handleSnackbar(
  //       true,
  //       "warning",
  //       "Please provide the credentials to login",
  //       dispatch
  //     );
  //   }
  // };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current?.value && passwordRef.current?.value) {
      // Check if the user has already failed login once
      const failedLoginAttempt = sessionStorage.getItem("failedLogin");

      if (isExecutingCaptcha || failedLoginAttempt) {
        // Show captcha if failed login attempt exists or is executing captcha
        captchaRef.current?.execute();
        setIsSubmitting(true);
      } else {
        setIsSubmitting(true);
        const res = dispatch(
          authLogin(
            {
              email: emailRef.current.value,
              password: passwordRef.current.value,
            },
            "" // Send captcha token
          )
        );

        res.then((result: ResultType) => {
          if (result.success) {
            handleSnackbar(true, "success", "Logged in successfully", dispatch);
          } else {
            // Set sessionStorage if login fails
            sessionStorage.setItem("failedLogin", "true");
            setIsExecutingCaptcha(true);
            handleSnackbar(
              true,
              "error",
              `Failed to Login: ${result.message}`,
              dispatch
            );
          }
          setIsSubmitting(false);
        });
      }
    } else {
      handleSnackbar(
        true,
        "warning",
        "Please provide the credentials to login",
        dispatch
      );
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token); // Save the token once captcha is successful

    // Now, perform the login action with credentials and captcha token
    if (emailRef.current?.value && passwordRef.current?.value) {
      const res = dispatch(
        authLogin(
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          },
          token // Send captcha token
        )
      );
      res.then((result: ResultType) => {
        if (result.success) {
          if (result.TwoFAUser) {
            setIsTwoFactorModalOpen(true);
            setadminId(result?.adminId);
          } else {
            setadminId(result.adminId);
            handleSnackbar(true, "success", "Logged in successfully", dispatch);
          }
          setIsSubmitting(false);
        } else {
          handleSnackbar(
            true,
            "error",
            `Failed to Login: ${result.message}`,
            dispatch
          );
          setIsSubmitting(false);
        }
      });
    }
  };

  const handleTwoFactorAuthSubmit = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsSubmitting(true);
    e.preventDefault();
    let formData = {
      // token: token.current.value,
      // password: password.current.value,
      // userId: adminId,
      userId: adminId,
      token: tokenRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
    };

    const res = dispatch(VerifyingTwoFactorAuth(formData)); //,navigate
    res.then((result: ResultType) => {
      if (result.success) {
        // console.log(result.success)
        handleSnackbar(true, "success", "Logged In Successfully", dispatch);
        setIsSubmitting(false);
        setIsTwoFactorModalOpen(false);
      } else {
        handleSnackbar(
          true,
          "error",
          `Failed To LogIn :Invalid token`,
          dispatch
        );
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="LoginMainContainer">
      <div className="LoginHeadContainer">
        <div className="LoginLeftContainer">
          <div className="BannerPoppupMain">
            <Dialog open={isTwoFactorModalOpen}>
              <DialogTitle> {language.MODAL.MODAL_TITLE}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="OTP"
                  sx={{ marginLeft: 10, marginTop: 2 }}
                  type="number"
                  inputRef={tokenRef}
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseTwoFactorModal}
                  style={{ color: "grey" }}
                >
                  {language.MODAL.MODAL_CANCEL}
                </Button>
                <Button onClick={handleTwoFactorAuthSubmit}>
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
        </div>
        <div className="LoginrightContainer">
          <form onSubmit={(e) => handleLoginSubmit(e)} className="loginBox">
            <input
              placeholder={language.LOGIN.INPUT_PLACEHOLDER_EMAIL}
              type="email"
              ref={emailRef}
              required
              className="loginInput"
            />

            <div className="InputFields">
              <input
                placeholder={"Password"}
                type={isPasswordVisible ? "text" : "password"}
                ref={passwordRef}
                required
                className="ResetPasswordInput"
              />
              {isPasswordVisible ? (
                <AiFillEye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="ShowPasswordLogin"
                  role="button"
                  data-testid="show-password"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="ShowPasswordLogin"
                  role="button"
                  data-testid="hide-password"
                />
              )}
            </div>
            {/* <PasswordInput
              reference={passwordRef}
              pHolder={"Password"}
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
            /> */}

            <button
              className="loginButton"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size="20px" style={{ color: "white" }} />
              ) : (
                <>{language.LOGIN.BUTTON_SUBMIT}</>
              )}
            </button>
            <Tooltip title="Solve the captcha to verify you are not a robot.">
              <div>
                <HCaptcha
                  onClose={() => {
                    setIsSubmitting(false);
                  }}
                  sitekey={capchaKey}
                  ref={captchaRef}
                  size="invisible"
                  onVerify={handleCaptchaVerify}
                  onError={() => {
                    handleSnackbar(true, "error", "Captcha error", dispatch);
                  }}
                />
              </div>
            </Tooltip>
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
    </div>
  );
};

export default Login;
