import React, { useEffect, useState } from "react";
import "./Payments.css";
import BackButton from "../Shared/BackButton";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import { CircularProgress, Paper } from "@mui/material";
import stripecardIcon from "../../../photos/Newuiphotos/Payments/stripe-card-icon.webp";
import paymentLinkIcon from "../../../photos/Newuiphotos/Payments/payment-link.webp";
import emailSentIcon from "../../../photos/Newuiphotos/Payments/emailsent.webp";
import underreviewIcon from "../../../photos/Newuiphotos/Payments/underreview.webp";
import rejectedIcon from "../../../photos/Newuiphotos/Payments/rejected.webp";
import PaymentOtp from "./PaymentOtp/PaymentOtp";
import toast from "react-hot-toast";
import { AuthTokens } from "../../../redux/Types";
import { getRestAPIRootDomain } from "../../../helpers/ApiSetter/GraphQlApiSetter";
import axios from "axios";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import PaymentTransactions from "./PaymentTransactions/PaymentTransactions";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import { useNavigationprop } from "../../../../MyProvider";
import useStripeConnect from "../../../helpers/StripeConnectHelper/useStripeConnect";
const cardStyle = {
  borderRadius: "16px",
  margin: "auto 10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",

  display: "flex",
  flexDirection: "column",
  padding: "15px",
  minHeight: "225px",
  marginTop: "20px",
  justifyContent: "flex-start",
};
interface PaymentProps {
  consumerMasjidId: string;
}
const Payments = ({ consumerMasjidId }: PaymentProps) => {
  const navigation = useNavigationprop();
  const [contentDescription, setContentDescription] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("nolink");
  const [statusTitle, setStatustitle] = useState(
    "Link Your Account to Receive Payments"
  );
  const [reviewBy, setReviewBy] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpError, setIsOtpError] = useState(false);
  const [email, setEmail] = useState("");
  const [statusLinkText, setStatusLinkText] = useState(
    "Learn More About Stripe Integration"
  );
  const [setupUrl, setSetupUrl] = useState("");
  const [statusLinkUrl, setStatusLinkUrl] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [isRemoveWarningVisible, setIsRemoveWarningVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [isChangingDeletingAccount, setIsChangingDeletingAccount] =
    useState(false);
  const [partialLink, setPartialLink] = useState("");
  //   const [isLoginIframeVisible, setIsLoginIframeVisible] = useState(false);
  //   const [statusDescription, setStatusDescription]=useState("")}
  const BaseRestUrl = getRestAPIRootDomain();
  const handleUnexpectedError = () => {
    setIsDisabled(true);
  };
  const {
    stripeConnect,
    isLoading: isStripeLoading,
    error,
  } = useStripeConnect(handleUnexpectedError); // Use the hook

  let admin = useAppSelector((state) => state.admin);

  const sendOtp = async () => {
    const toastId = toast.loading("Sending Otp...");
    const url = BaseRestUrl + "/email/get-otp";

    try {
      const authTokensString = localStorage.getItem("authTokens");
      const token: AuthTokens | null = authTokensString
        ? JSON.parse(authTokensString)
        : null;

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      );

      console.log(response);
      const data = response.data;
      if (response.status === 200) {
        toast.dismiss(toastId);
        setStatus("emailsent");
        setStatustitle("Enter Your OTP");
      }
    } catch (error) {
      toast.dismiss(toastId);
      // if (axios.isAxiosError(error)) {
      toast.error("Something went wrong...");
      // } else {
      //   toast.error("Something went wrong...");
      console.error("Error:", error?.message);
      // }
    }
  };

  const handleStripeConnect = async (email: string, otp: string) => {
    const { success, status, data, error } = await stripeConnect(
      email,
      otp,
      true
    );

    if (success) {
      if (status === 200 && data?.link) {
        // if (!isChangingDeletingAccount)
        setIsDisabled(true);
        toast.loading("Redirecting to stripe...");
        window.location.href = data?.link;
      } else if (status === 200 && !data?.link) {
        console.error("Missing Link");
        toast.error("An unexpected error occured");
      } else if (status === 202 && data.account.status === "pending") {
        if (data.account.stripeStatus === "pending") {
          setReviewBy("Stripe");
          setStatus("underreview");
          setStatustitle("Your Account is Under Review");
        } else if (
          data.account.stripeStatus === "inactive" &&
          data.account.pendingActions.length > 0 &&
          data.link
        ) {
          setPartialLink(data.link);
          setStatus("partiallink");
          setStatusLinkText("Learn More About Stripe Integration");
          setStatusLinkUrl("https://stripe.com/in/connect");
          setStatustitle("Complete Your Account setup to Receive Payments");
        }
      } else if (status === 202 && data.account.status === "inreview") {
        // if (data.account.stripeStatus === "active") {
        setReviewBy("ConnectMazjid Team");
        setStatus("underreview");
        setStatustitle("Your Account is Under Review");

        // }
      } else if (status === 202 && data.account.status === "rejected") {
        setStatus("rejected");
        setStatustitle("");
        setStatusLinkText("Contact Support");
        setStatusLinkUrl("/feed/14");
      } else if (status === 202 && data.account.status === "approved") {
        setStatustitle("");
        setStatus("hasaccount");
        setEmail(data.email);
      }
    } else if (status === 400) {
      setStatus("nolink");
      setStatusLinkText("Learn More About Stripe Integration");
      setStatusLinkUrl("https://stripe.com/in/connect");
      setStatustitle("Link Your Account to Receive Payments");
      // toast.error("Bad Request: Unable to link the account.");
    }
  };

  useEffect(() => {
    handleStripeConnect("", "");
  }, []);

  const handleSubmitClick = () => {
    if (status === "nolink") {
      sendOtp();
    } else if (status === "partiallink") {
      toast.loading("Redirecting to stripe...");
      window.location.href = partialLink;
      setIsDisabled(true);
    } else if (status === "emailsent") {
      if (otp === "") {
        toast.error("Otp is required!");
        setIsOtpError(true);
      } else {
        console.log("Otp", otp);
        // if (isChangingDeletingAccount) {
        //   console.log("Otp1", otp);
        //   deleteType === "change"
        //     ? deleteAccount(true)
        //     : deleteType === "remove"
        //     ? deleteAccount(false)
        //     : null;
        // }

        // else {
        handleStripeConnect("", otp);
        // }
      }
    } else if (status === "hasaccount") {
      setShowTransactions(true);
    }
  };

  const handleOtpChange = (e) => {
    setIsOtpError(false);
    setOtp(e.target.value);
  };

  const handleBackBtn = () => {
    if (showTransactions) {
      setShowTransactions(false);
    }
    // else if (isChangingDeletingAccount) {
    //   setIsDisabled(false);
    //   setIsChangingDeletingAccount(false);
    //   setStatustitle("");
    //   setStatus("hasaccount");
    // }
    else if (
      status === "nolink" ||
      status === "partiallink" ||
      status === "hasaccount" ||
      status === "underreview" ||
      status === "rejected"
    ) {
      if (navigation) navigation("/feed/0");
      else customNavigatorTo("/feed/0");
    } else if (status === "emailsent") {
      setIsDisabled(false);
      setStatus("nolink");
      setStatusLinkText("Learn More About Stripe Integration");
      setStatustitle("Link Your Account to Receive Payments");
    }
  };

  const obfuscateEmail = (email: string) => {
    const [localPart, domain] = email.split("@");

    // Obfuscate the local part (at least 1 visible character, maximum 5)
    const visibleLocalLength = Math.min(5, Math.max(1, localPart.length - 3));
    const obfuscatedLocalPart =
      localPart.slice(0, visibleLocalLength) +
      "*".repeat(localPart.length - visibleLocalLength);

    // Obfuscate the domain part (at least 1 visible character before the dot)
    const [domainName, topLevelDomain] = domain.split(".");
    const visibleDomainLength = Math.max(1, domainName.length - 3);
    const obfuscatedDomain =
      domainName.slice(0, visibleDomainLength) +
      "*".repeat(domainName.length - visibleDomainLength) +
      "." +
      topLevelDomain;

    return `${obfuscatedLocalPart}@${obfuscatedDomain}`;
  };

  const deleteAccount = async (redirectToStripe: boolean) => {
    // setTimeout(() => {
    //   toast.loading("Redirecting to stripe...");
    // }, 8000);
    const verificationToastId = toast.loading("Verifying otp...");
    let disconnectingToastId: any;
    let disconnectTimeoutId: NodeJS.Timeout | undefined;

    disconnectTimeoutId = setTimeout(() => {
      toast.dismiss(verificationToastId);
      disconnectingToastId = toast.loading("Disconnecting account...");
      // setTimeout(() => {
      //   toast.dismiss(disconnectingToastId);
      // }, 4000);
    }, 4000);

    // setTimeout(() => {
    //   toast.success("Stripe Account Disconnected");
    // }, 8000);

    // const toastId = toast.loading("Please wait...");
    let url = BaseRestUrl + `/stripe/disconnect?otp=${otp}`;
    try {
      const authTokensString = localStorage.getItem("authTokens");
      const token: AuthTokens | null = authTokensString
        ? JSON.parse(authTokensString)
        : null;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      });

      if (response.status === 204) {
        toast.dismiss(disconnectingToastId);
        // toast.success("Stripe Account Disconnected");

        // toast.loading("Redirecting to stripe...");

        if (redirectToStripe) {
          handleStripeConnect("", otp);
        } else {
          toast.success("Stripe Account Disconnected");
          setTimeout(() => {
            if (navigation) {
              navigation("/feed/0");
            } else {
              customNavigatorTo("/feed/0");
            }
          }, 1000);
        }
      }
    } catch (error) {
      toast.dismiss(disconnectingToastId);
      clearTimeout(disconnectTimeoutId);
      toast.error("Invalid Otp!");
      console.log("Error occurred:", error);
      setIsChangingDeletingAccount(false);
      setStatustitle("");
      setStatus("hasaccount");
    }
  };
  // const RemoveAccount = async () => {
  //   setIsRemoveWarningVisible(false);
  //   console.log("remove account");
  //   sendOtp();
  //   setIsChangingDeletingAccount(true);
  //   // const response = await deleteAccount(true);
  // };
  // const ChangeAccount = async () => {
  //   setIsRemoveWarningVisible(false);
  //   console.log("change account");
  //   sendOtp();
  //   setIsChangingDeletingAccount(true);
  //   // const response = await deleteAccount(true);
  // };

  return (
    <div className="PaymentsContainer">
      <>
        <div style={{ width: "100%" }}>
          <div className="goback">
            <BackButton handleBackBtn={handleBackBtn} />
          </div>
          <h3 className="page-title">Payments</h3>
        </div>
        <div className="payments-main-container">
          {isStripeLoading ? (
            <CircularProgress />
          ) : showTransactions ? (
            <PaymentTransactions></PaymentTransactions>
          ) : (
            <Paper sx={cardStyle}>
              {status === "hasaccount" ? (
                <div className="iconContainer">
                  <h4 className="iconText">stripe</h4>
                </div>
              ) : status === "nolink" || status === "partiallink" ? (
                <div className="iconContainer">
                  <img src={stripecardIcon} style={{ width: "27px" }} alt="" />
                  <img src={paymentLinkIcon} style={{ width: "27px" }} alt="" />
                  <h4 className="iconText">stripe</h4>
                </div>
              ) : status === "emailsent" ? (
                <div className="iconContainer">
                  <img src={emailSentIcon} style={{ width: "45px" }} alt="" />
                </div>
              ) : status === "underreview" ? (
                <div className="iconContainer">
                  <img src={underreviewIcon} style={{ width: "65px" }} alt="" />
                </div>
              ) : status === "rejected" ? (
                <div className="iconContainer">
                  <img src={rejectedIcon} style={{ width: "65px" }} alt="" />
                </div>
              ) : (
                <></>
              )}
              {statusTitle && <h5 className="payments-title">{statusTitle}</h5>}
              <div
                className="payment-content"
                style={{
                  alignItems: status === "hasaccount" ? "flex-start" : "center",
                }}
              >
                {status === "nolink" ? (
                  <p>
                    To start receiving payments for donations, events, programs,
                    and services through ConnectMazjid, please link your account
                    to Stripe. Connecting your Stripe account is quick, secure,
                    and ensures you can seamlessly manage your funds.
                  </p>
                ) : status === "partiallink" ? (
                  <p>
                    To start receiving payments for donations, events, programs,
                    and services through ConnectMazjid, please complete your
                    account setup to Stripe. Connecting your Stripe account is
                    quick, secure, and ensures you can seamlessly manage your
                    funds.
                  </p>
                ) : status === "emailsent" ? (
                  <p>
                    We've sent a One-Time Password (OTP) to your registered
                    email {email} Please enter the OTP below to proceed
                  </p>
                ) : status === "underreview" ? (
                  <p>
                    Thank you for completing your account setup. Your account is
                    currently under review by <b>{reviewBy}</b>.
                    {reviewBy === "ConnectMazjid Team"
                      ? "We will notify you by email once the review process is complete."
                      : ""}
                  </p>
                ) : status === "rejected" ? (
                  <p>
                    <p style={{ color: "#3D544E" }}>
                      <b>Approval Status:</b> Rejected by
                    </p>{" "}
                    ConnectMazjid Team.
                  </p>
                ) : status === "hasaccount" ? (
                  <p style={{ color: "#3D5347", fontWeight: "500" }}>
                    Email: {obfuscateEmail(email)}
                  </p>
                ) : null}
                {status === "emailsent" && (
                  <>
                    <input
                      style={{ borderColor: isOtpError ? "red" : "#3D544E" }}
                      type="text"
                      placeholder="Enter OTP"
                      className="otpinput"
                      name="otp"
                      onChange={handleOtpChange}
                    />
                  </>
                )}
              </div>
              {(status === "nolink" ||
                status === "emailsent" ||
                status === "hasaccount" ||
                status === "partiallink") && (
                <button
                  style={{
                    background: isDisabled ? "grey" : "#1B8368",
                    boxShadow: "none",
                    border: "none",
                    // padding: "10px 5px",
                    width: "90%",
                    height: "40px",
                    color: "white",
                    fontWeight: "500",
                    borderRadius: "22px",
                    margin: "20px auto",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmitClick}
                  disabled={isDisabled}
                >
                  {status === "nolink"
                    ? "Link My Account"
                    : status === "emailsent"
                    ? "Verify"
                    : status === "hasaccount"
                    ? "View Transactions"
                    : status === "partiallink"
                    ? "Complete Stripe Set up"
                    : ""}
                </button>
              )}
              {(status === "nolink" || status === "partiallink") && (
                <a
                  href={statusLinkUrl}
                  style={{
                    color: "#3D5347",
                    fontSize: "11px",
                    margin: "20px auto 0px",
                    textDecoration: "underline",
                  }}
                >
                  {statusLinkText}
                </a>
              )}
              {status === "rejected" && (
                <a
                  onClick={() => {
                    navigation
                      ? navigation("/feed/14")
                      : customNavigatorTo("/feed/14");
                  }}
                  style={{
                    color: "#3D5347",
                    fontSize: "11px",
                    margin: "20px auto 0px",
                    textDecoration: "underline",
                  }}
                >
                  {statusLinkText}
                </a>
              )}
              {/* {status === "hasaccount" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "20px 0px",
                  }}
                  className="removeAccountlinkDiv"
                >
                  <a
                    style={{
                      color: "#3D5347",
                      // fontSize: "12px",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      setDeleteType("change");
                      setIsRemoveWarningVisible(true);
                    }}
                  >
                    Change Stripe Account ?
                  </a>
                  <a
                    style={{
                      color: "#3D5347",
                      // fontSize: "12px",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      setDeleteType("remove");
                      setIsRemoveWarningVisible(true);
                    }}
                  >
                    Remove stripe accont ?
                  </a>
                </div>
              )} */}
            </Paper>
          )}
        </div>
      </>
      {/* )} */}
      {/* {isRemoveWarningVisible ? (
        <DeleteWarningCard
          wariningType=""
          warining={`Are you sure you want to ${deleteType} the stripe account`}
          onClose={() => setIsRemoveWarningVisible(false)}
          onConfirm={() => {
            deleteType === "remove" ? RemoveAccount() : ChangeAccount();
            // RemoveAccount();
          }}
          // icon={donationIcon}
          progress={false}
        />
      ) : null} */}
    </div>
  );
};

export default Payments;
