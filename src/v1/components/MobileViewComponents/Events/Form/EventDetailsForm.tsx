import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
  Typography,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import greencircle from "../../../../photos/Newuiphotos/Icons/prayerIcons/Group 37671.webp";
import greyCircle from "../../../../photos/Newuiphotos/Icons/prayerIcons/Group 37672.webp";
import greydollar from "../../../../photos/Newuiphotos/Icons/prayerIcons/Vector-1.webp";
import greendollar from "../../../../photos/Newuiphotos/Icons/prayerIcons/greenDollar.webp";

import slashdoller from "../../../../photos/Newuiphotos/Icons/prayerIcons/Vector.webp";
import StripeErrorModal from "../../Payments/StripeErrorModal/StripeErrorModal";
import toast from "react-hot-toast";
import {
  customNavigatorTo,
  useCustomParams,
} from "../../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../../MyProvider";
type EventDetailsFormProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  addressChecked: boolean;
  setAddressChecked: (checked: boolean) => void;
  inputChecker: (isValueExist: string, condition?: boolean) => string;
  isFormDetailsPage: boolean;
  children: React.ReactNode;
  masjidAddress?: string;
  setFormData: any;
  regCheckBox: any;
  setRegCheckBox: any;
  isPaymentsSetup: boolean;
  isStripeLoading: boolean;
  registrationOption: string;
  setRegistrationOption: Dispatch<SetStateAction<"free" | "paid">>;
  admin: any;
  isEditing: boolean;
  existingEventData?: any;
};

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  formData,
  handleChange,
  addressChecked,
  setAddressChecked,
  inputChecker,
  isFormDetailsPage,
  masjidAddress,
  setFormData,
  children,
  regCheckBox,
  setRegCheckBox,
  isPaymentsSetup,
  isStripeLoading,
  registrationOption,
  setRegistrationOption,
  admin,
  isEditing,
  existingEventData,
}) => {
  const navigation = useNavigationprop();
  const id = useCustomParams();

  const [isNoAccountDialogOpen, setIsNoAccountDialogOpen] =
    useState<boolean>(false);

  const handleToggle = (option: "free" | "paid") => {
    if (option === "free" && registrationOption !== "free") {
      setRegistrationOption(option);
      handleChange({
        target: { name: "cost", value: "0" },
      } as React.ChangeEvent<HTMLInputElement>);
    } else if (option === "paid") {
      if (isPaymentsSetup && registrationOption !== "paid") {
        setRegistrationOption(option);
        handleChange({
          target: { name: "cost", value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      } else if (!isPaymentsSetup) {
        setIsNoAccountDialogOpen(true);
      }
    }
  };

  const handleAddressCheckBoxClick = () => {
    // condition to verify if it is checking or unchecking by seeing the value before the change/click happens
    if (addressChecked) {
      setFormData({
        ...formData,
        address: masjidAddress,
      });
      setAddressChecked(!addressChecked);
    } else {
      setAddressChecked(!addressChecked);
    }
  };

  useEffect(() => {
    if (formData.isRegistrationRequired && formData.cost === "0") {
      setRegCheckBox(true);
    }
  }, [FormData]);

  const shouldDisableFields =
    isEditing && existingEventData.isRegistrationRequired;

  return (
    <div>
      <label htmlFor="eventName">Event Name *</label>
      <input
        type="text"
        id="eventName"
        className={inputChecker(formData.eventName)}
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        required
      />
      <label htmlFor="eventCategory">Event Category:</label>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            // data-testid=""
            inputProps={{ "data-testid": "event-category-select" }}
            id="eventCategory"
            name="category"
            className={inputChecker(formData.category)}
            value={formData.category || ""}
            onChange={handleChange}
            sx={{
              borderRadius: "22px",
              border: "1px solid #065f46",
              marginBottom: "15px",
              fontSize: "12px !important",
              outlineColor: "none",
              "& .MuiSelect-select.MuiInputBase-input": {
                paddingBottom: "16.5px !important",
                paddingLeft: "14px !important",
                paddingRight: "32px !important",
                paddingTop: "16.5px !important",
              },
            }}
          >
            <MenuItem value="Educational Event">Educational Event</MenuItem>
            <MenuItem value="Islamic Event">Islamic Event</MenuItem>
            <MenuItem value="Sports Event">Sports Event</MenuItem>
            <MenuItem value="Charity Event">Charity Event</MenuItem>
            <MenuItem value="Kids Event">Kids Event</MenuItem>
            <MenuItem value="Family Event">Family Event</MenuItem>
            <MenuItem value="Health Event">Health Event</MenuItem>
            <MenuItem value="Health Event">Social Event</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <label htmlFor="description">Description *</label>
      <textarea
        id="description"
        name="description"
        className={inputChecker(formData.description)}
        value={formData.description}
        onChange={handleChange}
        rows={4}
        required
      />

      {/* {regCheckBox && ( */}
      <>
        <label htmlFor="capacity">Event Capacity:</label>
        <input
          type="text"
          id="capacity"
          className={inputChecker(formData.capacity)}
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </>
      {/* )} */}

      {!isFormDetailsPage && (
        <>
          <label htmlFor="recurrenceType">Event Recurrence Type:</label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                data-testid="event-recurrence-type"
                id="recurrenceType"
                name="recurrenceType"
                value={formData.recurrenceType}
                onChange={handleChange}
                sx={{
                  borderRadius: "22px",
                  border: "1px solid #065f46",
                  marginBottom: "15px",
                  fontSize: "12px !important",
                  outlineColor: "none",
                  "& .MuiSelect-select.MuiInputBase-input": {
                    paddingBottom: "16.5px !important",
                    paddingLeft: "14px !important",
                    paddingRight: "32px !important",
                    paddingTop: "16.5px !important",
                  },
                }}
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Random">Random</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="None">None</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      )}
      {children}
      <div className="address-check-box">
        <label htmlFor="differentlocation">Location Is Different</label>
        <Checkbox
          checked={addressChecked}
          onChange={() => handleAddressCheckBoxClick()}
          inputProps={{ "aria-label": "controlled" }}
          id="differentlocation"
          sx={{
            "& .MuiSvgIcon-root": {
              width: 20,
              height: 15,
            },
          }}
        />
      </div>
      {addressChecked ? (
        <input
          type="text"
          id="address"
          className={inputChecker(formData.address)}
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      ) : null}

      <div>
        <div className="reg_checkbox">
          <label htmlFor="reg_checkbox" data-testid="reg_checkbox">
            User Required Registration
          </label>
          <Checkbox
            disabled={shouldDisableFields}
            checked={regCheckBox}
            name="isRegistrationRequired"
            onChange={() => {
              setRegCheckBox(!regCheckBox);
              formData.cost !== null
                ? (handleChange({
                    target: {
                      name: "cost",
                      value: "0",
                    },
                  }) as any)
                : handleChange({
                    target: { name: "cost", value: "0" },
                  } as React.ChangeEvent<HTMLInputElement>);
              setFormData((prevFormData: any) => ({
                ...prevFormData,
                isRegistrationRequired: !regCheckBox,
                // capacity: regCheckBox ? 0 : 500,
              }));
            }}
            sx={{
              "& .MuiSvgIcon-root": {
                width: 20,
                height: 15,
              },
            }}
            inputProps={{ "aria-label": "controlled" }}
            id="reg_checkbox"
          />
        </div>

        {regCheckBox && (
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mt={1}
            data-testid="registration-options"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              padding={1}
              borderRadius={3}
              border={1}
              borderColor={
                registrationOption === "free" ? "#1D785A" : "grey.400"
              }
              onClick={() => {
                if (!shouldDisableFields) {
                  handleToggle("free");
                }
              }}
              sx={{
                cursor: shouldDisableFields ? "not-allowed" : "pointer",
                opacity: shouldDisableFields ? "0.6" : "1",
                userSelect: "none",
                width: "50%",
              }}
            >
              <Box display="flex" alignItems="center">
                <img
                  src={slashdoller}
                  alt="Circle"
                  style={{ height: 16, width: 16 }}
                />
                <Typography marginLeft={1} marginRight={1}>
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

            {(admin.role === "subadmin" || admin.role === "superadmin") && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding={1}
                borderRadius={3}
                border={1}
                borderColor={
                  registrationOption === "paid" ? "#1D785A" : "grey.400"
                }
                onClick={() => {
                  if (!shouldDisableFields && !isStripeLoading) {
                    handleToggle("paid");
                  }
                }}
                sx={{
                  background: isPaymentsSetup ? null : "#dcd8d8",
                  opacity: shouldDisableFields
                    ? "0.6"
                    : isPaymentsSetup
                    ? "1"
                    : "0.7",
                  cursor: shouldDisableFields ? "not-allowed" : "pointer",
                  userSelect: "none",
                  width: "50%",
                }}
                className={inputChecker(formData.cost)}
              >
                {isStripeLoading ? (
                  <CircularProgress size="20px" />
                ) : registrationOption === "paid" ? (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      padding: "4px 8px",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={greendollar}
                      alt="Dollar"
                      style={{ height: 16, width: 10 }}
                    />
                    <input
                      type="number"
                      value={formData.cost || ""}
                      onChange={handleChange}
                      name="cost"
                      style={{
                        border: "none",
                        outline: "none",
                        padding: "0 4px",
                        width: "80%",
                        fontSize: "15px",
                        boxSizing: "border-box",
                        margin: "0px",
                      }}
                      placeholder="Amount"
                      disabled={shouldDisableFields}
                    />
                    <img
                      src={greencircle}
                      alt="Circle"
                      style={{ height: 16, width: 16 }}
                    />
                  </Box>
                ) : (
                  <>
                    <Box display="flex" alignItems="center">
                      <img
                        src={greydollar}
                        alt="Dollar"
                        style={{ height: 16, width: 10 }}
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
        )}
      </div>
      <StripeErrorModal
        isOpen={isNoAccountDialogOpen}
        handleButtonClick={() => {
          if (navigation) navigation("/feed/13");
          else customNavigatorTo("/feed/13");
        }}
        handleClose={() => {
          setIsNoAccountDialogOpen(false);
          // if (navigation) navigation("/feed/0");
          // else customNavigatorTo("/feed/0");
        }}
        feature={"to make paid events"}
      />
    </div>
  );
};

export default EventDetailsForm;
