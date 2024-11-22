import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import greencircle from "../../../../photos/Newuiphotos/Icons/prayerIcons/Group 37671.webp";
import greyCircle from "../../../../photos/Newuiphotos/Icons/prayerIcons/Group 37672.webp";
import greydollar from "../../../../photos/Newuiphotos/Icons/prayerIcons/Vector-1.webp";
import greendollar from "../../../../photos/Newuiphotos/Icons/prayerIcons/greenDollar.webp";
import slashdoller from "../../../../photos/Newuiphotos/Icons/prayerIcons/Vector.webp";
import StripeErrorModal from "../../Payments/StripeErrorModal/StripeErrorModal";
import toast from "react-hot-toast";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../../MyProvider";
import "./commonFields.css";
import CloseIcon from "@mui/icons-material/Close";
interface CommonFieldsProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setValidationErrors: any;
  stripeFields: [boolean, boolean];
  admin: any;
}

const CommonFields: React.FC<CommonFieldsProps> = ({
  formData,
  handleChange,
  setValidationErrors,
  stripeFields,
  admin,
}) => {
  const [isPaymentsSetup, isStripeLoading] = stripeFields;
  const navigation = useNavigationprop();
  const [openFeeModal, setOpenFeeModal] = useState(false);
  const [registrationOption, setRegistrationOption] = useState<"free" | "paid">(
    formData.registrationOption || "free"
  );
  const [isNoAccountDialogOpen, setIsNoAccountDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (!formData.registrationOption) {
      setRegistrationOption("free");
      handleChange({
        target: {
          name: "registrationOption",
          value: "free",
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleChange({
        target: {
          name: "cost",
          value: "0",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [formData.registrationRequired]);
  const isEditing = formData?.id ? true : false;
  const handleToggle = (option: "free" | "paid") => {
    if (isEditing) return;
    if (option === "free" && registrationOption !== "free") {
      setRegistrationOption(option);
      handleChange({
        target: {
          name: "cost",
          value: "0",
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleChange({
        target: {
          name: "registrationOption",
          value: option,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    } else if (option == "paid") {
      if (isPaymentsSetup && registrationOption !== "paid") {
        setRegistrationOption(option);
        handleChange({
          target: {
            name: "registrationOption",
            value: option,
          },
        } as React.ChangeEvent<HTMLInputElement>);
        handleChange({
          target: {
            name: "cost",
            value: "0",
          },
        } as React.ChangeEvent<HTMLInputElement>);
        // setIsNoAccountDialogOpen(true);
      } else if (!isPaymentsSetup) {
        // account is not set up
        setIsNoAccountDialogOpen(true);
      }
    }
  };

  useEffect(() => {
    const errors: any = {};
    if (registrationOption === "paid" && !formData.cost) {
      errors.cost = "Cost is required for paid registration";
    }
    setValidationErrors(errors);
  }, [formData, registrationOption, setValidationErrors]);
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 180,
    borderRadius: "18px",
    height: 100,
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    p: 4,
  };
  const closeBtnStyle = {
    position: "absolute" as "absolute",
    top: "10px",
    right: "10px",
  };

  return (
    <>
      <>
        <div className="radio-group">
          <Box display="flex" alignItems="center" gap={2} mt={1} width={"100%"}>
            {/* Free box container */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={1}
              borderRadius={6}
              border={1}
              borderColor={
                registrationOption === "free" ? "#1D785A" : "grey.400"
              }
              onClick={() => handleToggle("free")}
              sx={{ cursor: "pointer", userSelect: "none", width: "50%" }}
            >
              <Box display="flex" alignItems="center">
                <img
                  src={registrationOption === "free" ? greendollar : greydollar}
                  alt="Circle"
                  style={{ height: 16, width: 10, marginRight: "5px" }}
                  // style={{ height: 16, width: 16 }}
                />
                <Typography
                  color={registrationOption === "free" ? "#1D785A" : ""}
                  marginLeft={1}
                  marginRight={1}
                >
                  Free
                </Typography>
              </Box>

              {registrationOption === "free" ? (
                <img
                  src={greencircle}
                  alt="Circle"
                  style={{ height: 16, width: 16 }}
                />
              ) : (
                <img
                  src={greyCircle}
                  alt="Circle"
                  style={{ height: 16, width: 16 }}
                />
              )}
            </Box>
            {/* paid box container */}
            {(admin.role === "subadmin" || admin.role === "superadmin") && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={1}
                borderRadius={6}
                border={1}
                borderColor={
                  registrationOption === "paid" ? "#1D785A" : "grey.400"
                }
                onClick={() => handleToggle("paid")}
                sx={{
                  cursor: "pointer",
                  background: isPaymentsSetup ? null : "#dcd8d8",
                  opacity: isPaymentsSetup ? "1" : "0.7",
                  userSelect: "none",
                  position: "relative",
                  width: "50%",
                }}
              >
                {isStripeLoading ? (
                  <CircularProgress size="20px" />
                ) : registrationOption === "paid" ? (
                  <>
                    <Box display="flex" alignItems="center">
                      <img
                        src={greendollar}
                        alt="Dollar"
                        style={{ height: 16, width: 10, marginRight: "5px" }}
                      />
                      <Typography
                        color={registrationOption === "paid" ? "#1D785A" : ""}
                        marginLeft={1}
                        marginRight={1}
                      >
                        Paid
                      </Typography>
                    </Box>

                    <img
                      src={greencircle}
                      alt="Dollar"
                      style={{ height: 16, width: 16 }}
                    />
                  </>
                ) : (
                  <>
                    <Box display="flex" alignItems="center">
                      <img
                        src={greydollar}
                        alt="Dollar"
                        style={{ height: 16, width: 10, marginRight: "5px" }}
                      />
                      <Typography marginLeft={1} marginRight={1}>
                        Paid
                      </Typography>
                    </Box>

                    <img
                      src={greyCircle}
                      alt="Dollar"
                      style={{ height: 16, width: 16 }}
                    />
                  </>
                )}
              </Box>
            )}
          </Box>
        </div>
        {isPaymentsSetup && registrationOption === "paid" ? (
          <Box
            display=""
            alignItems="center"
            gap={2}
            mt={1}
            mb={1.5}
            width={"100%"}
          >
            <label className="paid-price-label" htmlFor="cost-input">
              Price <span style={{ color: "red" }}>*</span>
            </label>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={1}
              borderRadius={6}
              border={1}
              borderColor={
                registrationOption === "paid" ? "#1D785A" : "grey.400"
              }
              onClick={() => handleToggle("paid")}
              sx={{
                cursor: "pointer",
                background: isPaymentsSetup ? null : "#dcd8d8",
                opacity: isPaymentsSetup ? "1" : "0.7",
                userSelect: "none",
                position: "relative",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={greendollar}
                  alt="Dollar"
                  style={{ height: 16, width: 10, marginRight: "5px" }}
                />
                <input
                  id="cost-input"
                  type="number"
                  value={formData.cost || ""}
                  onChange={isEditing ? null : handleChange}
                  name="cost"
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "3px",
                    width: "80%",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    margin: "0px",
                  }}
                  placeholder="Amount"
                />
              </Box>
            </Box>
            <h3
              data-testid="fee-breakdown"
              className="fee-breakdown"
              onClick={() => setOpenFeeModal(!openFeeModal)}
            >
              Fee Breakdown
            </h3>
          </Box>
        ) : null}

        <Modal
          open={openFeeModal}
          onClose={() => setOpenFeeModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <IconButton
              onClick={() => setOpenFeeModal(false)}
              sx={closeBtnStyle}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              className="fee-modal-title"
              data-testid="modal-fee-breakdown"
              variant="h6"
              component="h2"
            >
              Fee Breakdown
            </Typography>
            <div className="fee-info">
              <p>Stripe Charges</p>
              <p>2.5%+30c</p>
            </div>
            <div className="fee-info">
              <p>Platform Fees</p>
              <p>1%</p>
            </div>
          </Box>
        </Modal>

        <StripeErrorModal
          isOpen={isNoAccountDialogOpen}
          handleButtonClick={() => {
            toast.dismiss();
            if (navigation) navigation("/feed/12");
            else customNavigatorTo("/feed/12");
          }}
          handleClose={() => {
            toast.dismiss();
            setIsNoAccountDialogOpen(false);
            // if (navigation) navigation("/feed/0");
            // else customNavigatorTo("/feed/0");
          }}
          feature={"to make paid services"}
        />
      </>
    </>
  );
};

export default CommonFields;
