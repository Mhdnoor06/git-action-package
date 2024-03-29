import React, { useState } from "react";
import { resources } from "../../../resources/resources";
import CmIcon from "../../../photos/Newuiphotos/CM Logo/CM Logo.svg";
import "./RequestUserForm.css";
import { Link, useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import successTick from "../../../photos/Newuiphotos/Icons/successTick.svg";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import TermAndConditions from "../Shared/TermAndConditions";
import BackButton from "../Shared/BackButton";
import { signUpEmail } from "../../../redux/actions/AuthActions/SignUpFormAction";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";

interface FormState {
  whoIAm: string;
  masjidName: string;
  masjidLocation: string;
  masjidContactNumber: string;
  masjidWebsite: string;
  firstName: string;
  lastName: string;
  officialEmail: string;
  phoneNumber: string;
  contribution: string;
  termsAndConditions: boolean;
  errors: { [key: string]: string };
}

function RequestUserForm() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();

  const [formState, setFormState] = useState<FormState>({
    whoIAm: "",
    masjidName: "",
    masjidLocation: "",
    masjidContactNumber: "",
    masjidWebsite: "",
    firstName: "",
    lastName: "",
    officialEmail: "",
    phoneNumber: "",
    contribution: "",
    termsAndConditions: false,
    errors: {},
  });
  const language = resources["en"];
  const navigate = useNavigate();

  const validateField = (field: keyof FormState, value: string) => {
    let errorMessage = "";

    // Phone Number Validation
    if (field === "phoneNumber") {
      if (formState.phoneNumber == "") {
        setFormState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            phoneNumber: "",
          },
        }));
        return;
      }
      const phoneNumberRegex = /^[0-9]{10}$/;
      if (!phoneNumberRegex.test(value)) {
        errorMessage = "Please enter a valid phone number.";
      }
    }

    if (field === "masjidContactNumber") {
      if (formState.masjidContactNumber == "") {
        setFormState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            masjidContactNumber: "",
          },
        }));

        return;
      }
      const phoneNumberRegex = /^[0-9]{10}$/;
      if (!phoneNumberRegex.test(value)) {
        errorMessage = "Please enter a valid phone number.";
      }
    }

    // Email Validation
    if (field === "officialEmail") {
      if (formState.officialEmail == "") {
        setFormState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            officialEmail: "",
          },
        }));
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }
    }

    // Website Validation
    if (field === "masjidWebsite") {
      if (formState.masjidWebsite == "") {
        setFormState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            masjidWebsite: "",
          },
        }));

        return;
      }
      const websiteRegex =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
      if (!websiteRegex.test(value)) {
        errorMessage = "Please enter a valid website URL.";
      }
    }

    setFormState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [field]: errorMessage,
      },
    }));
  };

  const handleBlur = (field: keyof FormState, value: string) => {
    validateField(field, value);
  };

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFetching(true);

    const isValid = Object.values(formState.errors).every(
      (error) => error === ""
    );
    if (isValid) {
      console.log(formState);
      try {
        const response = dispatch(
          signUpEmail({
            email: formState.officialEmail,
            subject: "New Signup Request",
            message: `
          <p>A new signup request has been submitted. Here are the details:</p>
          <ul>
            <li>Who I am: ${formState.whoIAm}</li>
            <li>Masjid Name: ${formState.masjidName}</li>
            <li>Masjid Location: ${formState.masjidLocation}</li>
            <li>Masjid Contact: ${formState.masjidContactNumber}</li>
            <li>Masjid Website: ${formState.masjidWebsite}</li>
            <li>First Name: ${formState.firstName}</li>
            <li>Last Name: ${formState.lastName}</li>
            <li>Email: ${formState.officialEmail}</li>
            <li>Phone Number: ${formState.phoneNumber}</li>
            <li>Contribution: ${formState.contribution}</li>
          </ul>
          `,
            name: `${formState.firstName} ${formState.lastName}`,
          })
        );
        console.log("Email sent successfully:", response);
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `Form has been submitted successfully`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        setSuccess(true);
      } catch (error) {
        console.error("Error sending email:", error);
      } finally {
        setIsFetching(false);
      }
    } else {
      const snackbarDetails = {
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: `Please ensure all fields are valid`,
      };
      dispatch(ChangeSnackbar(snackbarDetails));
      setIsFetching(false);
    }
  };
  // console.log(formState);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleBackBtn = () => {
    navigate("/login");
  };
  return (
    <>
      <div className={success ? "Rqstsuccess" : "RequestForm"}>
        <div className="rqstformtop">
          <div className="header-container">
            <div
              className="header-back-button"
              style={success ? { display: "none" } : {}}
            >
              <BackButton handleBackBtn={handleBackBtn} />
            </div>
          </div>
          {/* <div
            style={
              success
                ? {
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                  }
                : {
                    display: "flex",
                    // alignItems: "center",
                  }
            }
          >
            {!success ? (
              <div className="event-backBtn">
                <BackButton handleBackBtn={handleBackBtn} />
              </div>
            ) : (
              <>
                <div className=""></div>
              </>
            )}
            <div
              style={{
                // width: "45%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={CmIcon} alt="" style={{ width: "70%" }} />
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
            <p style={{ marginRight: "10px" }}></p>
          </div> */}
        </div>

        {success ? (
          <div className="SuccessCard">
            <div className="formsubmit">
              <Link to="/login">
                <CloseIcon fontSize="150px" />
              </Link>
              <img src={successTick} alt="" />
              <b>Thank you !</b>
              <p>
                Your Request has been received. Our Team will be in touch and
                contact you soon.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="rqstForm">
              <form onSubmit={handleSubmit} className="my-form">
                <div
                  className="header-logo"
                  style={success ? { margin: "0" } : {}}
                >
                  <img src={CmIcon} alt="Logo" style={{ width: "129px" }} />
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
                <h3 style={{ color: "#1D785A", margin: "0" }}>
                  Welcome On Board
                </h3>

                <div className="formFields">
                  <Box sx={{ width: "90% !important" }}>
                    <FormControl fullWidth>
                      <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        id="recurrenceType"
                        name="recurrenceType"
                        value={formState.whoIAm || ""}
                        onChange={(e) => handleChange("whoIAm", e.target.value)}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              borderRadius: "22px",
                            },
                          },
                        }}
                        sx={{
                          borderRadius: "15px",
                          fontSize: "12px !important",
                          border: "1px solid #3d544e",
                          // outlineColor: "none",
                        }}
                        displayEmpty
                        required
                      >
                        <MenuItem value="" disabled sx={{ fontSize: "12px" }}>
                          Who I am*
                        </MenuItem>
                        <MenuItem
                          value="Masjid Admin"
                          sx={{ fontSize: "12px" }}
                        >
                          Masjid Admin : Who controls masjid
                        </MenuItem>
                        <MenuItem
                          value="Musali Admin"
                          sx={{ fontSize: "12px" }}
                        >
                          Musali Admin : Going to masjid daily
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                <div className="formFields">
                  <input
                    type="text"
                    value={formState.masjidName}
                    onChange={(e) => handleChange("masjidName", e.target.value)}
                    required
                    placeholder="Masjid Name*"
                  />
                </div>

                <div className="formFields">
                  <input
                    type="text"
                    value={formState.masjidLocation}
                    onChange={(e) =>
                      handleChange("masjidLocation", e.target.value)
                    }
                    required
                    placeholder="Masjid Location*"
                  />
                </div>

                <div
                  className="formFields error-field"
                  style={
                    formState.errors.masjidContactNumber
                      ? {
                          margin: "0",
                          flexDirection: "column",
                          alignItems: "normal",
                        }
                      : {}
                  }
                >
                  <input
                    type="tel"
                    maxLength={10}
                    value={formState.masjidContactNumber}
                    onChange={(e) =>
                      handleChange("masjidContactNumber", e.target.value)
                    }
                    onBlur={(e) =>
                      handleBlur("masjidContactNumber", e.target.value)
                    }
                    {...(formState.whoIAm === "Masjid Admin"
                      ? { required: true }
                      : {})}
                    placeholder={
                      formState.whoIAm === "Masjid Admin"
                        ? "Masjid Contact Number*"
                        : "Masjid Contact Number"
                    }
                    style={{ margin: "0 auto" }}
                  />
                  {formState.errors.masjidContactNumber && (
                    <p className="error-message">
                      {formState.errors.masjidContactNumber}
                    </p>
                  )}
                </div>

                <div
                  className="formFields error-field"
                  style={
                    formState.errors.masjidWebsite
                      ? {
                          margin: "0",
                          flexDirection: "column",
                          alignItems: "normal",
                        }
                      : {}
                  }
                >
                  <input
                    type="text"
                    value={formState.masjidWebsite}
                    onChange={(e) =>
                      handleChange("masjidWebsite", e.target.value)
                    }
                    onBlur={(e) => handleBlur("masjidWebsite", e.target.value)}
                    // required
                    placeholder="Masjid Website"
                    style={{ margin: "0 auto" }}
                  />
                  {formState.errors.masjidWebsite && (
                    <p className="error-message">
                      {formState.errors.masjidWebsite}
                    </p>
                  )}
                </div>

                <p
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#3D544E",
                    background: "#D0F9E4",
                    padding: "10px 0",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Personal Details
                </p>

                <div className="formFields">
                  <input
                    type="text"
                    value={formState.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="First Name*"
                    required
                    style={{ width: "44%", margin: "2px" }}
                  />
                  <input
                    type="text"
                    value={formState.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Last Name*"
                    required
                    style={{ width: "44%", margin: "2px" }}
                  />
                </div>

                <div
                  className="formFields error-field"
                  style={
                    formState.errors.officialEmail
                      ? {
                          margin: "0",
                          flexDirection: "column",
                          alignItems: "normal",
                        }
                      : {}
                  }
                >
                  <input
                    type="email"
                    value={formState.officialEmail}
                    onChange={(e) =>
                      handleChange("officialEmail", e.target.value)
                    }
                    onBlur={(e) => handleBlur("officialEmail", e.target.value)}
                    required
                    placeholder="Email*"
                    style={{ margin: "0 auto" }}
                  />
                  {formState.errors.officialEmail && (
                    <p className="error-message">
                      {formState.errors.officialEmail}
                    </p>
                  )}
                </div>

                <div
                  className="formFields error-field"
                  style={
                    formState.errors.phoneNumber
                      ? {
                          margin: "0",
                          flexDirection: "column",
                          alignItems: "normal",
                        }
                      : {}
                  }
                >
                  <input
                    type="tel"
                    value={formState.phoneNumber}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                    onBlur={(e) => handleBlur("phoneNumber", e.target.value)}
                    required
                    placeholder="Phone Number*"
                    maxLength={10}
                    style={{ margin: "0 auto" }}
                  />
                  {formState.errors.phoneNumber && (
                    <p className="error-message">
                      {formState.errors.phoneNumber}
                    </p>
                  )}
                </div>

                {formState.whoIAm !== "Masjid Admin" && (
                  <div className="formFields">
                    <textarea
                      value={formState.contribution}
                      onChange={(e) =>
                        handleChange("contribution", e.target.value)
                      }
                      required
                      placeholder="How can you contribute"
                      rows={4}
                    />
                  </div>
                )}

                <div className="formFields">
                  <input
                    type="checkbox"
                    checked={formState.termsAndConditions}
                    onChange={(e) =>
                      handleChange("termsAndConditions", e.target.checked)
                    }
                    required
                  />
                  <label
                    style={{ textDecoration: "underline" }}
                    onClick={handleOpen}
                  >
                    Terms & Conditions
                  </label>
                </div>

                <div className="sntrqstbtn formFields">
                  <LoadingButton
                    size="small"
                    type="submit"
                    loading={isFetching}
                    loadingPosition="end"
                    variant="contained"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#117158",
                      },
                    }}
                  >
                    <span>Send Request</span>
                  </LoadingButton>
                </div>
                <div className="formFields">
                  <p style={{ marginBottom: "20px" }}>
                    Already have account ?{" "}
                    <Link to="/login" style={{ color: "#1D785A" }}>
                      <b>Log In</b>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </>
        )}
      </div>

      <div>
        <TermAndConditions tmConOpener={open} setTmConOpener={setOpen} />
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default RequestUserForm;
