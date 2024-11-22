import React, { useState } from "react";
import { AdminInterFace } from "../../../redux/Types";
import "./ChangePassword.css";
import ChangePassIcon from "../../../photos/Newuiphotos/Icons/resetPass.svg";
// import { resources } from "../../../resources/resources";

import { useAppThunkDispatch } from "../../../redux/hooks";
import { resetPassword } from "../../../redux/actions/AuthActions/ResetPasswordAction";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../MyProvider";

function ChangePassword() {
  const navigation = useNavigationprop();
  // const lanugage = resources["en"];
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
      const res = dispatch(resetPassword(formData));
      console.log(formData);

      res.then((result) => {
        if (result.success) {
          const snackbarDetails = {
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: `Password Changed`,
          };
          if (navigation) navigation("/feed/11");
          else customNavigatorTo("/feed/11");
          dispatch(ChangeSnackbar(snackbarDetails));
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
      <div className="topcp">
        <h3>Change Password</h3>

        <div className="cpForm">
          <form action="">
            <div style={{ width: "100%", position: "relative" }}>
              <span className="BackToLogin1">
                <Link to="/feed/11">
                  <CloseIcon />
                </Link>
              </span>
              <img src={ChangePassIcon} alt="" style={{ width: "50px" }} />
            </div>
            <b>Create new password</b>
            <div
              className="InputFields"
              style={{ width: "100%", left: "6px", margin: "0" }}
            >
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div
              className="InputFields"
              style={{ width: "100%", left: "6px", margin: "0" }}
            >
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
              {isPasswordVisible ? (
                <AiFillEye
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                  className="ShowPasswordLogin"
                  data-testid="toggle-password-visibility-hide"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                  className="ShowPasswordLogin"
                  data-testid="toggle-password-visibility-show"
                />
              )}
            </div>

            <div
              className="InputFields"
              style={{ width: "100%", left: "6px", margin: "0" }}
            >
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {isConfirmPasswordVisible ? (
                <AiFillEye
                  onClick={() => {
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                  }}
                  className="ShowPasswordLogin"
                  style={{ right: "5px !important" }}
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => {
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                  }}
                  className="ShowPasswordLogin"
                />
              )}
            </div>

            <LoadingButton
              size="small"
              onClick={(e) => handleSubmit(e)}
              loading={isSubmitting}
              variant="contained"
              type="submit"
              role="progressbar"
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
