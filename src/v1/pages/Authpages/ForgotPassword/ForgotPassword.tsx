import React, { useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import { CircularProgress } from "@material-ui/core";
import { resources } from "../../../resources/resources";
import LogoMain from "../../../photos/Newuiphotos/CM Logo/cmlogofor.svg";
import { forgotPassword } from "../../../redux/actions/AuthActions/ForgotPasswordAction";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import ForgotPasswordNew from "../../../photos/Newuiphotos/Icons/forgotpass.svg";
import { useAppThunkDispatch } from "../../../redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import ResetPassword from "../ResetPassword/ResetPassword/ResetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppThunkDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const language = resources["en"];
  const [isEmailSentPopupVisible, setIsEmailSentPopupVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    const res = dispatch(forgotPassword({ email: email ?? "" }));
    res.then((result) => {
      if (result.success) {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `Email Sent SuccessFully`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        setIsEmailSentPopupVisible(true);
        setIsSubmitting(false);
      } else if (!result.success) {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Failed To Reset Password`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        setIsSubmitting(false);
      }
    });
  };

  return (
    <>
      <div className="ForgotPassowordMainComponent">
        <div className="ForgotPassowordTopContainerMob">
          <div className="ForgotPassowordLogoHeadContainerMob">
            <img src={LogoMain} alt="mymasjidicon" className="fpLogoMainIcon" />
          </div>
          <div className="ForgotPassowordLogoBottomContainerMob">
            <span className="SiteName">
              {" "}
              {language.BANER.INPUT_PLACEHOLDER_FIRST_NAME}{" "}
            </span>
            <span className="SiteNameEnd">
              {language.BANER.INPUT_PLACEHOLDER_SECOND_NAME}{" "}
            </span>
          </div>
        </div>
        {isEmailSentPopupVisible ? (
          <ResetPassword email={email} />
        ) : (
          <div className="ForgotPassowordHeadContainer">
            {/* <div className="ForgotPassowordLeftContainer">
              <div className="ForgotPassowordLogoHeadContainer">
                <img
                  src={LogoMain}
                  alt="mymasjidicon"
                  className="fpLogoMainIcon"
                />
              </div>
              <div className="ForgotPassowordLogoBottomContainer">
                <span className="SiteName">
                  {" "}
                  {language.BANER.INPUT_PLACEHOLDER_FIRST_NAME}{" "}
                </span>
                <span className="SiteNameEnd">
                  {language.BANER.INPUT_PLACEHOLDER_SECOND_NAME}{" "}
                </span>
              </div>
              <div className="ForgotPassowordLogoDescContainer">
                <span className="siteNamebottom">
                  {" "}
                  {language.BANER.INPUT_PLACEHOLDER_DESCRIPTION}{" "}
                </span>
              </div>
            </div> */}

            <div className="ForgotPassowordrightContainer">
              <form onSubmit={handleSubmit} className="ForgotPasswordBox">
                <span className="BackToLogin">
                  <Link to="/login">
                    <CloseIcon fontSize="150px" />
                  </Link>
                </span>
                <div className="FOrgetPasswordLogo">
                  <img
                    src={ForgotPasswordNew}
                    className="ForgotPasswordLogoimg"
                    alt="ForgotPasswordLogoimg"
                  />
                </div>
                <h3 style={{ color: "#3D544E", margin: "10px 0" }}>
                  Forget Password ?
                </h3>
                <p>Enter your email address to recieve verification code</p>
                <input
                  placeholder={language.LOGIN.INPUT_PLACEHOLDER_EMAIL}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="ForgotPasswordInput"
                />
                <button
                  className="ForgotPasswordBtnn"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ padding: "0", borderRadius: "25px  " }}
                >
                  {isSubmitting ? (
                    <CircularProgress size="20px" color="inherit" />
                  ) : (
                    <>{language.FORGOT_PASSWORD.BUTTON_SUBMIT}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
