import React, { useRef, useContext, useState } from "react";
import "./ResetPassword.css";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { resources } from "../../../resources/resources";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { resetPassword } from "../../../redux/actions/AuthActions/ResetPasswordAction";
import { useNavigate, useParams } from "react-router-dom";
import SetPasswordImg from "../../../photos/SetPassword.png";
import LogoMain from "../../../photos/LogoMain.png";
import ResetPasswordImg from "../../../photos/ResetPasswordimg.png";
import { useAppThunkDispatch } from "../../../redux/hooks";

const ResetPassword = () => {
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [isFetching, setisFetching] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [PasswordShow, setPasswordShow] = useState(true);
  const [ConfirmPasswordType, setConfirmPasswordType] = useState("password");
  const [ConfirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const language = resources["en"];
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [PasswordPopup, setPasswordPopup] = useState(false);

  console.log("ResetPassword");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordShow(true);
      return;
    }
    setPasswordType("password");
    setPasswordShow(false);
  };

  const ConfirmTogglePassword = () => {
    if (ConfirmPasswordType === "password") {
      setConfirmPasswordType("text");
      setConfirmPasswordShow(true);
      return;
    }
    setConfirmPasswordType("password");
    setConfirmPasswordShow(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.current?.value == confirmPassword.current?.value) {
      let formData = {
        password: password.current?.value ?? "",
        token: token ?? "",
      };
      setisFetching(true);
      const res = dispatch(resetPassword(formData));

      res.then((result) => {
        if (result.success) {
          // const snackbarDetails = {
          //   snackbarOpen: true,
          //   snackbarType: "success",
          //   snackbarMessage: ` Password Setup Successfully `,
          // };
          // navigate("/login");
          // dispatch(ChangeSnackbar(snackbarDetails));
          setPasswordPopup(true);
          setisFetching(false);
        } else {
          const snackbarDetails = {
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: `Failed To Setup the Password`,
          };
          dispatch(ChangeSnackbar(snackbarDetails));
          setisFetching(false);
        }
      });
    } else {
      const snackbarDetails = {
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: `Password and Confirmed Password does not match`,
      };
      dispatch(ChangeSnackbar(snackbarDetails));
      setisFetching(false);
    }
  };

  return (
    <>
      <div className="ResetPassowordMainComponent">
        <div className="ResetPassowordHeadContainer">
          <div className="ResetPassowordLeftContainer">
            <div className="EmailOfLogin">yaseen.khatib@msasoftware.us</div>
            <div className="SetPassowordLogoHeadContainer">
              <img src={LogoMain} alt="mymasjidicon" className="LogoMainIcon" />
            </div>
            <div className="ResetPassowordLogoBottomContainer">
              <span className="SiteName">
                {language.BANER.INPUT_PLACEHOLDER_FIRST_NAME}{" "}
              </span>
              <span className="SiteNameEnd">
                {language.BANER.INPUT_PLACEHOLDER_SECOND_NAME}{" "}
              </span>
            </div>
            {/* <div className="ResetPassowordLogoDescContainer">
              <span className="siteNamebottom">
                {language.BANER.INPUT_PLACEHOLDER_DESCRIPTION}{" "}
              </span>
            </div> */}
          </div>
          <div className="ResetPassowordrightContainer">
            <form onSubmit={handleSubmit} className="ResetPasswordBox">
              <div className="SetPasswordImgContainer">
                <img src={ResetPasswordImg} className="SetPasswordImg" />
              </div>
              <div className="InputFields">
                <input
                  placeholder={language.LOGIN.INPUT_PLACEHOLDER_PASSWORD}
                  type={passwordType}
                  ref={password}
                  required
                  className="ResetPasswordInput"
                />
                {PasswordShow ? (
                  <AiFillEye
                    onClick={togglePassword}
                    className="ShowPasswordLogin"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={togglePassword}
                    className="ShowPasswordLogin"
                  />
                )}
              </div>
              <div className="InputFields">
                <input
                  placeholder={
                    language.RESET_PASSWORD.INPUT_PLACEHOLDER_CONFIRM_PASSWORD
                  }
                  type={ConfirmPasswordType}
                  ref={confirmPassword}
                  required
                  className="ResetPasswordInput"
                />
                {ConfirmPasswordShow ? (
                  <AiFillEye
                    onClick={ConfirmTogglePassword}
                    className="ShowPasswordLogin"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={ConfirmTogglePassword}
                    className="ShowPasswordLogin"
                  />
                )}
              </div>

              <button
                className="ForgotPasswordBtn"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress size="20px" />
                ) : (
                  <>{language.RESET_PASSWORD.BUTTON_SUBMIT}</>
                )}
              </button>
              {/* <span className="BackToLogin">
                <Link to="/login">
                  {language.RESET_PASSWORD.BUTTON_REDIRECT}
                </Link>
              </span> */}
            </form>
          </div>
        </div>
        {PasswordPopup ? (
          <div className="PopupForSetPassword">
            <div className="InsidePopupForSetPassword">
              <div className="PhotoForPopupForSetPassword">
                <img src={SetPasswordImg} className="ImgForSetPassword" />
              </div>
              <div className="TextforPopupForSetPassword">
                Password Reset Successfully
              </div>
              <span className="BackToLogin">
                <Link to="/login">
                  {language.RESET_PASSWORD.BUTTON_REDIRECT}
                </Link>
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ResetPassword;
