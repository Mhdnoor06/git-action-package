import React, { useRef, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { resources } from "../../../resources/resources";
import Box from "@mui/material/Box";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { ActivatingTwoFactorAuth } from "../../../redux/actions/AuthActions/ActivatingTwoFactorAuth";
import { VerifyingTwoFactorAuth } from "../../../redux/actions/AuthActions/VerifyingTwoFactorAuthAction";
import LogoMain from "../../../photos/LogoMain.png";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { resetPasswordInitial } from "../../../redux/actions/AuthActions/ResetPasswordInitial";
import "./SetPassword.css";
import WELCOMEONBOARD from "../../../photos/WELCOMEONBOARD.png";
import BackgroungWelcome from "../../../photos/BackgroungWelcome.png";
import jwt_decode from "jwt-decode";
import { useAppThunkDispatch } from "../../../redux/hooks";
const SetPassword = () => {
  const language = resources["en"];
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const LoginCode = useRef<HTMLInputElement>(null);
  const dispatch = useAppThunkDispatch();
  const [UserID, setUserId] = useState("");
  const [isFetching, setisFetching] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [PasswordShow, setPasswordShow] = useState(true);
  const [ConfirmPasswordType, setConfirmPasswordType] = useState("password");
  const [ConfirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("token");
  const [OpenQRModal, setOpenQRModal] = useState(false);
  const [AllowCancel, setAllowCancel] = useState(false);
  const [QRCode, setQRCode] = useState("");

  const [UserEmail, setUserEmail] = useState("");
  const [TermsandCondition, setTermsandCondition] = useState(false);
  const decodedToken: any = jwt_decode(id ?? "");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setisFetching(true);
    setTimeout(() => {
      if (password.current?.value === confirmPassword.current?.value) {
        const formData = {
          password: password.current?.value ?? "",
          token: id ?? "",
        };

        setisFetching(true);
        const res = dispatch(resetPasswordInitial(formData));

        res.then((result) => {
          if (result.success) {
            setisFetching(false);

            const response = dispatch(ActivatingTwoFactorAuth());
            response.then(function (result) {
              if (result.success) {
                console.log(result.QR);
                setQRCode(result.QR);
                setOpenQRModal(true);
                setUserId(result.data._id);
                setisFetching(false);
                setUserEmail(result.data.email);
                setUserEmail(result.data.email);
              } else {
                handleSnackbar(
                  true,
                  "error",
                  result.message
                    ? "Failed : " + result.message
                    : "Failed : Internet or Server Issue ",
                  dispatch
                );
              }
            });
          } else {
            handleSnackbar(
              true,
              "error",
              `Failed To Setup the Password : ` + result.message,
              dispatch
            );
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
      setisFetching(false);
    }, 2000);
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

  const handleQRClose = () => {
    let formData = {
      password: password.current?.value ?? "",
      token: LoginCode.current?.value ?? "",
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

        setisFetching(false);
        setOpenQRModal(false);
      } else {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Request Failed :Invalid token`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        setisFetching(false);
      }
    });
  };

  const handleChange = () => {
    if (LoginCode.current?.value && LoginCode.current.value.length > 5) {
      setAllowCancel(true);
    } else if (LoginCode.current?.value?.length === 0) {
      setAllowCancel(false);
    }
  };

  const styles = {
    backgroundImage: `url(${BackgroungWelcome})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div className="SetPassowordMainComponent">
        <div className="SetPassowordHeadContainer">
          <div className="SetPassowordLeftContainer" style={styles}>
            {OpenQRModal ? (
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
                        <button
                          onClick={handleQRClose}
                          className="TOTPVERIFYBTN"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="SetPassowordLogoHeadContainer">
              <img src={LogoMain} alt="mymasjidicon" className="LogoMainIcon" />
            </div>
            <div className="SetPassowordLogoBottomContainer">
              <span className="SiteName">
                {language.BANER.INPUT_PLACEHOLDER_FIRST_NAME}{" "}
              </span>
              <span className="SiteNameEnd">
                {language.BANER.INPUT_PLACEHOLDER_SECOND_NAME}{" "}
              </span>
            </div>
            {/* <div className="SetPassowordLogoDescContainer">
              <span className="siteNamebottom">
                {language.BANER.INPUT_PLACEHOLDER_DESCRIPTION}{" "}
              </span>
            </div> */}
          </div>
          <div className="SetPassowordrightContainer">
            <form className="SetPasswordBox">
              <div className="SetPasswordImgContainer">
                <img src={WELCOMEONBOARD} className="SetPasswordImg" />
              </div>
              <div className="EmailOfLogin">Welcome {decodedToken?.email}!</div>
              {/*  */}
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
                className="ForgotPasswordBtnSignup"
                type="submit"
                disabled={isFetching}
                onClick={handleSubmit}
              >
                {isFetching ? (
                  <CircularProgress size="20px" />
                ) : (
                  <>{language.RESET_PASSWORD.BUTTON_SIGNUP}</>
                )}
              </button>
            </form>
            <div className="TermsandCondition">
              <button
                className="TermAndConditionBtn"
                onClick={(e) => {
                  setTermsandCondition(true);
                }}
              >
                <span className="TermandConditions">
                  By Signing up, you agree with terms and condition
                </span>
              </button>
            </div>
          </div>
          {TermsandCondition ? (
            <div className="PopupForTermsAndConditions">
              <div className="InsideTermsAndConditions">
                <div className="TermAndConditionsTitle">Term & Conditions</div>
                <div className="TermAndCondition">
                  <strong>
                    Terms and Conditions for ConnectMazjid Admin Portal
                  </strong>
                  <br />
                  <br /> Welcome to the ConnectMazjid Admin Portal(the
                  "Portal"). This Portal is operated by MSA Software LLC ("we",
                  "us", or "our"), and is intended for use by mosque
                  administrators and staff members ("Admins").
                  <br /> By accessing and using the Portal, you agree to comply
                  with and be bound by the following terms and conditions of use
                  (the "Terms"). <br />
                  <br />
                  <strong>Access and Use of the Portal</strong>
                  <br />
                  <br /> Admins are authorized to access and use the Portal
                  solely for the purpose of updating and sharing information
                  about their mosque with their community. Admins must comply
                  with all applicable laws and regulations in connection with
                  their use of the Portal.
                  <br />
                  <br />
                  Account Registration and Security
                  <br />
                  <br /> Admins must register for an account with the Portal in
                  order to access its features. Admins are responsible for
                  maintaining the confidentiality of their account information,
                  including their login credentials, and are solely responsible
                  for any activity that occurs under their account. Admins agree
                  to notify us immediately if they become aware of any
                  unauthorized access or use of their account.
                  <br />
                  <br />
                  <strong> Ownership and Intellectual Property</strong>
                  <br />
                  <br /> All content and materials made available through the
                  Portal, including text, images, graphics, logos, and software,
                  are the property of Masjid App or its licensors, and are
                  protected by United States and international copyright laws.
                  Admins may use the content and materials solely for the
                  purpose of updating and sharing information about their mosque
                  with their community.
                  <br />
                  <br />
                  <strong>Prohibited Conduct</strong>
                  <br />
                  <br /> Admins must not use the Portal to engage in any conduct
                  that is unlawful, infringing, or otherwise violates these
                  Terms. Prohibited conduct includes, but is not limited to, the
                  following: Using the Portal to transmit any content or
                  materials that are infringing, defamatory, or obscene.
                  Attempting to gain unauthorized access to the Portal or its
                  systems, or using the Portal in any manner that could disable,
                  overburden, or impair its functionality. <br />
                  Using the Portal to engage in any conduct that could damage or
                  impair our reputation, or that of any other user or third
                  party.
                  <br />
                  Posting inaccurate or misleading information about your
                  mosque, or engaging in any other conduct that could mislead or
                  deceive users of the Portal. <br />
                  Termination We reserve the right to terminate or suspend
                  access to the Portal at any time and for any reason,
                  including, but not limited to, any violation of these Terms.
                  <br />
                  <br />
                  <br />
                  <strong> Disclaimer of Warranties</strong> <br />
                  <br />
                  THE PORTAL IS PROVIDED "AS IS" AND WITHOUT WARRANTY OF ANY
                  KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED
                  TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE
                  PORTAL WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. <br />
                  <br />
                  <strong>Limitation of Liability</strong>
                  <br />
                  <br />
                  IN NO EVENT SHALL WE BE LIABLE FOR ANY DIRECT, INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES,
                  INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS,
                  GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF WE
                  HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), ARISING
                  OUT OF OR IN CONNECTION WITH YOUR USE OF THE PORTAL.
                  <br />
                  <br /> <strong>Changes to the Terms</strong>
                  <br />
                  <br /> We reserve the right to update or modify these Terms at
                  any time and without prior notice. Admins are responsible for
                  regularly reviewing these Terms to ensure their continued
                  compliance. <br />
                  <br />
                  <strong>Governing Law</strong>
                  <br />
                  <br /> These Terms shall be governed by and construed in
                  accordance with the laws of the State of California, without
                  giving effect to any principles of conflicts of law.
                  <br /> <br />
                  <strong>Entire Agreement</strong>
                  <br /> <br />
                  These Terms constitute the entire agreement between you and us
                  with respect to your use of the Portal, and supersede all
                  prior or contempor.
                </div>
                <button
                  className="BtnforTaC"
                  onClick={(e) => {
                    setTermsandCondition(false);
                  }}
                >
                  <span className="CloseForTaC">Close</span>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SetPassword;
