import React, { useState } from "react";
import { AdminInterFace } from "../../../redux/Types";
import "./ChagePassword.css";
import CustomBtn from "../../../components/MobileViewComponents/Shared/CustomBtn";
import ChangePassIcon from "../../../photos/Newuiphotos/Icons/resetPass.svg";
import { resources } from "../../../resources/resources";
import { useNavigate } from "react-router";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { resetPassword } from "../../../redux/actions/AuthActions/ResetPasswordAction";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";

function ChangePassword() {
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

  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let formData = {
        password: password,
        token: otp,
        email: admin?.email,
        type: "otp",
      };
      setisFetching(true);
      const res = dispatch(resetPassword(formData));
      console.log(formData);

      res.then((result) => {
        if (result.success) {
          setResetSuccess(true);
          const snackbarDetails = {
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: `Password Changed`,
          };
          navigate("/feed/4");
          dispatch(ChangeSnackbar(snackbarDetails));
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
      <div className="topcp">
        <h3>Change Password</h3>

        <div className="cpForm">
          <form action="">
            <div style={{ width: "100%" }}>
              <span className="BackToLogin">
                <Link to="/feed/4">
                  <CloseIcon fontSize="150px" />
                </Link>
              </span>
              <img src={ChangePassIcon} alt="" style={{ width: "50px" }} />
            </div>
            <b>Create new password</b>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <div
              className="InputFields"
              style={{ width: "100%", left: "6px", margin: "0" }}
            >
              <input
                type={passwordType}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
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

            <div
              className="InputFields"
              style={{ width: "100%", left: "6px", margin: "0" }}
            >
              <input
                type={ConfirmPasswordType}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {ConfirmPasswordShow ? (
                <AiFillEye
                  onClick={ConfirmTogglePassword}
                  className="ShowPasswordLogin"
                  style={{ right: "5px !important" }}
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={ConfirmTogglePassword}
                  className="ShowPasswordLogin"
                />
              )}
            </div>

            <LoadingButton
              size="small"
              onClick={(e) => handleSubmit(e)}
              loading={isFetching}
              variant="contained"
              type="submit"
              sx={{
                textTransform: "none",
              }}
            >
              <span>Reset</span>
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
