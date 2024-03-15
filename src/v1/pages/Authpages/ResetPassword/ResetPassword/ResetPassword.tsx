import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { resources } from "../../../../resources/resources";
// import LogoMain from "../../../../photos/Newuiphotos/CM Logo/CM Logo.svg";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import EmailSend from "../../../../photos/Newuiphotos/Icons/EmailSent.svg";
import ResetPassIcon from "../../../../photos/Newuiphotos/Icons/resetPass.svg";
import { ChangeSnackbar } from "../../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { resetPassword } from "../../../../redux/actions/AuthActions/ResetPasswordAction";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useAppThunkDispatch } from "../../../../redux/hooks";
import resetSuccessIcon from "../../../../photos/Newuiphotos/Icons/successTick.svg";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

type propsType = {
  email: string;
};

function ResetPassword({ email }: propsType) {
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [PasswordPopup, setPasswordPopup] = useState(false);
  const language = resources["en"];
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [passwordType, setPasswordType] = useState("password");
  const [PasswordShow, setPasswordShow] = useState(true);
  const [ConfirmPasswordType, setConfirmPasswordType] = useState("password");
  const [ConfirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const [isFetching, setisFetching] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();

  const handleOtp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (otp !== "") {
      setOtpSuccess((prev) => !prev);
    } else {
      const snackbarDetails = {
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: `please enter your OTP to proceed`,
      };
      dispatch(ChangeSnackbar(snackbarDetails));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let formData = {
        password: password,
        token: otp,
        email: email,
        type: "otp",
      };
      setisFetching(true);
      const res = dispatch(resetPassword(formData));
      console.log(formData);

      res.then((result) => {
        if (result.success) {
          setResetSuccess(true);
          setPasswordPopup(true);
          setisFetching(false);
        } else {
          const snackbarDetails = {
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: `Failed To Setup the Password, check your OTP again`,
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

  return (
    <div>
      {!resetSuccess ? (
        <>
          {otpSuccess ? (
            <div className="ForgotPassowordHeadContainer">
              <div className="ForgotPassowordrightContainer">
                <form onSubmit={handleSubmit} className="ForgotPasswordBox">
                  <span
                    className="BackToLogin"
                    onClick={() => setOtpSuccess(false)}
                  >
                    <CloseIcon fontSize="150px" />
                  </span>
                  <div className="FOrgetPasswordLogo">
                    <img
                      src={ResetPassIcon}
                      className="emailLogoimg"
                      alt="ForgotPasswordLogoimg"
                      style={{ width: "50px" }}
                    />
                    <b style={{ marginBottom: "10px" }}>Reset Password</b>
                  </div>

                  <div className="InputFields">
                    {" "}
                    <input
                      placeholder={
                        language.RESET_PASSWORD.INPUT_PLACEHOLDER_NEW_PASSWORD
                      }
                      type={passwordType}
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      required={otpSuccess}
                      className="ForgotPasswordInput"
                      style={{ marginBottom: "15px" }}
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
                        language.RESET_PASSWORD
                          .INPUT_PLACEHOLDER_CONFIRM_PASSWORD
                      }
                      type={ConfirmPasswordType}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={otpSuccess}
                      className="ForgotPasswordInput"
                      style={{ marginBottom: "15px" }}
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
                    className="ForgotPasswordBtnn"
                    type="submit"
                    disabled={isFetching}
                    style={{ padding: "0", borderRadius: "25px" }}
                  >
                    {isFetching ? (
                      <CircularProgress size="20px" />
                    ) : (
                      <>{language.FORGOT_PASSWORD.VERIFY}</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="ForgotPassowordHeadContainer">
                <div className="ForgotPassowordrightContainer">
                  <form className="ForgotPasswordBox">
                    <span className="BackToLogin">
                      <Link to="/login">
                        <CloseIcon fontSize="150px" />
                      </Link>
                    </span>
                    <div className="FOrgetPasswordLogo">
                      <img
                        src={EmailSend}
                        className="emailLogoimg"
                        alt="ForgotPasswordLogoimg"
                        style={{ width: "60px" }}
                      />
                      <b>Enter Code</b>
                      <p>Please enter the code sent to your email address</p>
                    </div>

                    <input
                      placeholder={language.FORGOT_PASSWORD.ENTER_CODE}
                      type="number"
                      //   ref={otp}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="ForgotPasswordInput"
                      style={{ marginBottom: "15px" }}
                    />
                    <button
                      className="ForgotPasswordBtnn"
                      //   type="submit"
                      onClick={(e) => handleOtp(e)}
                      disabled={isFetching}
                      style={{ padding: "0", borderRadius: "25px  " }}
                    >
                      {isFetching ? (
                        <CircularProgress size="20px" color="inherit" />
                      ) : (
                        <>{language.FORGOT_PASSWORD.VERIFY}</>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="ForgotPassowordHeadContainer">
          <div className="ForgotPassowordrightContainer">
            <div className="resetsuccess">
              <img
                src={resetSuccessIcon}
                alt=""
                style={{ height: "70px", marginBottom: "30px" }}
              />
              <p>Your password has been reset</p>
              <b style={{ marginBottom: "20px" }}>“Successfully”</b>
              <button
                className="ForgotPasswordBtnn"
                style={{
                  padding: "0",
                  borderRadius: "25px",
                  background: "#1B8368",
                }}
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
