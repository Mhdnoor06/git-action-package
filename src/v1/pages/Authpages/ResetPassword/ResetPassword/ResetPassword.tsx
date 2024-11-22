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
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import "./ResetPassword.css";
import { useNavigationprop } from "../../../../../MyProvider";

type propsType = {
  email: string;
};

function ResetPassword({ email }: propsType) {
  const navigation = useNavigationprop();
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const language = resources["en"];
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const dispatch = useAppThunkDispatch();

  const handleOtpSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (otp !== "") {
      setIsOtpVerified((prev) => !prev);
    } else {
      const snackbarDetails = {
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: `Please enter your OTP to proceed`,
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
      setIsSubmitting(true);
      const res = dispatch(resetPassword(formData));

      res.then((result) => {
        if (result.success) {
          setIsResetSuccess(true);
          setIsSubmitting(false);
        } else {
          const snackbarDetails = {
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: `Failed To Setup the Password, check your OTP again`,
          };
          dispatch(ChangeSnackbar(snackbarDetails));
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
  };

  return (
    <div>
      {!isResetSuccess ? (
        <>
          {isOtpVerified ? (
            <div className="ForgotPassowordHeadContainer">
              <div className="ForgotPassowordrightContainer">
                <form onSubmit={handleSubmit} className="ForgotPasswordBox">
                  <span
                    className="BackToLogin"
                    onClick={() => setIsOtpVerified(false)}
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
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      required={isOtpVerified}
                      className="ForgotPasswordInput"
                      style={{ marginBottom: "15px" }}
                    />
                    {isPasswordVisible ? (
                      <AiFillEye
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="ShowPasswordLogin"
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={isOtpVerified}
                      className="ForgotPasswordInput"
                      style={{ marginBottom: "15px" }}
                    />
                    {isConfirmPasswordVisible ? (
                      <AiFillEye
                        onClick={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                        className="ShowPasswordLogin"
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                        className="ShowPasswordLogin"
                      />
                    )}
                  </div>

                  <button
                    className="ForgotPasswordBtnn"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ padding: "0", borderRadius: "25px" }}
                  >
                    {isSubmitting ? (
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
              <div
                className="ForgotPassowordHeadContainer"
                data-testid="reset-password-component"
              >
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
                      onClick={(e) => handleOtpSubmit(e)}
                      disabled={isSubmitting}
                      style={{ padding: "0", borderRadius: "25px  " }}
                    >
                      {isSubmitting ? (
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
        <div
          className="ForgotPassowordHeadContainer"
          data-testid="reset-password-component-success"
        >
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
                role="login-btn"
                style={{
                  padding: "0",
                  borderRadius: "25px",
                  background: "#1B8368",
                }}
                onClick={() => {
                  if (navigation) navigation("/login");
                  else customNavigatorTo("/login");
                }}
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
