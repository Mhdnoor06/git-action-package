import React, { useState } from "react";
import DonationPreview from "../Preview/DonationPreview";
import EventDisclaimer from "../../Events/Disclaimer/EventDisclaimer";
import BackButton from "../../Shared/BackButton";
import "./DonationForm.css";
import {
  Box,
  Card,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ImageUploader from "../../Events/Helpers/eventImageUploader/ImageUploader";
import DonationFormFields from "./DonationFormFields";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CustomBtn from "../../Shared/CustomBtn";
import donationwhiteIcon from "../../../../photos/Newuiphotos/Donations/donationwhite.webp";
import DonationAmountInput from "../Helpers/DonationAmountInput";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../../../graphql-api-calls/index";
import axios from "axios";
import { getRestAPIRootDomain } from "../../../../helpers/ApiSetter/GraphQlApiSetter";
import { AuthTokens } from "../../../../redux/Types";
import SuccessMessageModel from "../../../../helpers/SuccessMessageModel/SuccessMessageModel";

export interface FormData {
  name: string;
  description: string;
  active: boolean;
  prices: string[];
  [key: string]: string | number | null | boolean | string[];
}
const DonationForm = ({
  setIsFormVisible,
  consumerMasjidId,
  handleReload,
  availableDonationTypes,
  tZone,
}: any) => {
  // Images
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [updateEventPhotos, setUpdateEventPhotos] = useState<
    { url: string; _id: string }[]
  >([]);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false); // used for loader during update event,but not during add event
  const [activeStep, setActiveStep] = React.useState(0); // current image step on carousel
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);

  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
  const [isSubmittingForPreview, setIsSubmittingForPreview] =
    useState<boolean>(false);

  const [maxSteps, setMaxSteps] = useState(0); // total images in the ImageUploader component

  // form fields
  const defaultAmountValues = ["20.00", "50.00", "200.00"];
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    active: true,
    prices: defaultAmountValues,
  });
  // const [description, setDescription] = useState<string>("");
  // const [donationPurpose, setDonationPurpose] = useState<string>("");
  // const [defaultAmounts, setDefaultAmounts] =
  //   useState<string[]>(defaultAmountValues);
  const RestBaseUrl = getRestAPIRootDomain();

  // graphQl
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT,
    {
      onCompleted: (data) => {
        console.log("Product created successfully:", data);
        toast.dismiss();
        handleReload();
        setOpenSuccessModal(true);
      },
      onError: (error) => {
        toast.error("Failed to create donation");
        setIsFormVisible(false);
        console.error("Error creating donation:", error.message);
      },
    }
  );

  const fillMissingDefaultValues = () => {
    formData.prices = formData.prices.map((price, index) =>
      validateAndFormatPrice(price, defaultAmountValues[index])
    );
  };
  const uploadImages = async () => {
    const uploadedImageUrls = [];
    const authTokensString = localStorage.getItem("authTokens");
    const token: AuthTokens | null = authTokensString
      ? JSON.parse(authTokensString)
      : null;
    for (let image of images) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await axios.post(
          RestBaseUrl + "/image/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token?.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        uploadedImageUrls.push(response.data); // Assuming response.data.url contains the URL of the uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    }
    return uploadedImageUrls;
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    toast.loading("Please wait...");
    const convertedPrices = formData.prices.map((price) => parseFloat(price));
    console.log(convertedPrices);
    
    if (images.length > 0) {
      const uploadedImageUrls = await uploadImages();
      if (!uploadedImageUrls) {
        toast.dismiss();
        toast.error("Image upload failed.");
        return; // Stop the submission if image upload fails
      }
      createProduct({
        variables: {
          input: {
            name: formData.name,
            description: formData.description,
            active: true,
            type: "DONATION",
            // price: 0,
            prices: convertedPrices,
            images: uploadedImageUrls,
          },
          // prices:[]
        },
      });
    } else {
      createProduct({
        variables: {
          input: {
            name: formData.name,
            description: formData.description,
            active: true,
            type: "DONATION",

            // price: 0,
            prices: convertedPrices,
          },
          // prices:[]
        },
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    switch (field) {
      case "description":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: value,
        }));
        break;
      case "name":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: value,
        }));
        break;
      case "active":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: value,
        }));

        break;
      case "prices":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: value,
        }));
    }
  };
  // submit after disclaimer is read and accept is clicked, method is called after preview submission
  const handleDisclaimerStatus = (sta: boolean) => {
    if (sta) handleSubmit();
  };
  const handleBackBtn = () => {
    setIsFormVisible(false);
  };
  const handleImageUpload = (e: any) => {
    const newImages = [...images];
    newImages.push(e.target.files[0]);
    setImages(newImages);
  };
  const handleImageDelete = (index: number | string) => {
    if (typeof index === "number") {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    }
  };
  const handleDeleteImage = () => {};
  const areAllFieldsFilled = () => {
    let fieldsValid = true;

    if (formData.description && formData.name) {
      // defaultAmounts.map((value, index) => {
      //   if (!value && isNaN(parseFloat(value))) {
      //     fieldsValid = false;
      //   }
      // });
    } else {
      fieldsValid = false;
    }
    return fieldsValid;
  };
  const handlePreviewOpen = (e: any) => {
    e.preventDefault();
    fillMissingDefaultValues();

    setIsSubmittingForPreview(true);
    // setIsSubmittde(true);
    if (areAllFieldsFilled()) {
      setIsPreviewVisible(true);
      setIsSubmittingForPreview(false);
    } else {
      toast.error("Please fill in all required fields before previewing.");
    }
  };
  // just returns a css for when a field value is blank and form is submitted
  const inputChecker = (isValueExist: string, condition = false) => {
    if (condition && isSubmittingForPreview && !isValueExist)
      return "2px solid red";
    else return isSubmittingForPreview && !isValueExist ? "error-bdr" : "";
  };
  const handleAmountChange = (index: number, value: string) => {
    const newAmounts = [...formData.prices];
    newAmounts[index] = value;
    handleChange(`prices`, newAmounts);
  };

  const validateAndFormatPrice = (
    price: string,
    defaultValue: string
  ): string => {
    const trimmedValue = price.trim();

    if (trimmedValue === "") {
      return defaultValue; // Replace empty string with default value
    }

    const floatValue = parseFloat(trimmedValue);
    if (!isNaN(floatValue)) {
      const formattedValue = floatValue.toFixed(2).padStart(5, "0");
      return formattedValue === "00.00" ? defaultValue : formattedValue;
    }

    return defaultValue; // If the value is not a valid number, return the default value
  };

  return (
    <>
      <SuccessMessageModel
        message="Donation Added Sucessfully"
        open={openSuccessModal}
        onClose={() => {
          setOpenSuccessModal(false);
          setIsFormVisible(false);
        }}
      />
      {isPreviewVisible ? (
        <DonationPreview
          setIsPreviewVisible={setIsPreviewVisible}
          images={images}
          donation={formData}
          handleDisclaimerStatus={handleDisclaimerStatus}
          isPreviewMode={true}
          consumerMasjidId={consumerMasjidId}
          tZone={tZone}
        />
      ) : (
        <div className="donation-container">
          <div style={{ width: "100%" }}>
            <div className="goback">
              <BackButton handleBackBtn={handleBackBtn} />
            </div>
            <h3 className="page-title">Add Donation</h3>
          </div>
          <div className="donation-form-container">
            <Card
              style={{
                width: "100%",
                borderRadius: "20px",
                margin: "auto 20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
              className="donation-form-card"
            >
              <form>
                {/* Uploader */}
                <ImageUploader
                  images={images}
                  updateEventPhotos={updateEventPhotos}
                  handleImageUpload={handleImageUpload}
                  handleImageDelete={handleImageDelete}
                  handleDeleteImage={handleDeleteImage}
                  openBar={isUploadingImage}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  setIsDeleteWarningVisible={setIsDeleteWarningVisible}
                  setMaxSteps={setMaxSteps}
                />
                <div style={{ padding: "10px" }}>
                  <div>
                    {/* Donation Purpose */}
                    <label htmlFor="donationPurpose">Donation Purpose:</label>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select
                          // data-testid=""
                          inputProps={{
                            "data-testid": "donation-purpose-select",
                          }}
                          id="donationPurpose"
                          name="donationPurpose"
                          className={inputChecker(formData.name)}
                          value={formData.name || ""}
                          onChange={(e) => {
                            handleChange("name", e.target.value);
                          }}
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
                          {availableDonationTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <label htmlFor="description">Description *</label>
                    <textarea
                      id="description"
                      name="description"
                      className={inputChecker(formData.description)}
                      value={formData.description}
                      onChange={(e) => {
                        handleChange("description", e.target.value);
                      }}
                      rows={4}
                      required
                    />
                    <label htmlFor="">Preferred Default Amount *</label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: "22px",
                        marginBottom: "14px",
                        gap: "15px",
                      }}
                    >
                      {formData.prices.map((amount, index) => (
                        <DonationAmountInput
                          validateAndFormatPrice={validateAndFormatPrice}
                          inputChecker={inputChecker}
                          key={index}
                          value={amount}
                          defaultValue={defaultAmountValues[index]}
                          index={index}
                          onChange={handleAmountChange}
                          readOnly={false}
                        />
                      ))}

                      {/* <div
                        style={{
                          border: "1px solid #065f46",
                          borderRadius: "29px",
                          position: "relative",
                          display: "flex",
                          flexDirection: "row"
                        }}
                      >
                        <AttachMoneyIcon
                          sx={{
                            fontWeight: "100",
                            bottom: "0",
                            alignSelf: "center",
                            marginLeft: "4px",
                            width: "0.65em",
                            height: "0.65em"
                          }}
                        />
                        <input
                          value={formData.defaultAmounts[1]}
                          className="defaultAmount"
                          type="text"
                          onBlur={(e) => {
                            const defaultValues = formData.defaultAmounts;
                            const targetValue = e.target.value;
                            if (targetValue === "") {
                              defaultValues[1] = "50.00";
                            } else if (
                              !isNaN(targetValue) &&
                              targetValue !== ""
                            ) {
                              const paddedFloat = parseFloat(targetValue)
                                .toFixed(2)
                                .padStart(5, "0");
                              defaultValues[1] =
                                paddedFloat === "00.00" ? "50.00" : paddedFloat;
                            }
                            setFormData({
                              ...formData,
                              defaultAmounts: defaultValues
                            });
                          }}
                          onChange={(e) => {
                            const defaultValues = formData.defaultAmounts;
                            const targetValue = e.target.value;
                            // defaultValues[0] =
                            // Set the state to either the parsed number or the input string if it's invalid
                            if (!isNaN(targetValue)) {
                              defaultValues[1] = targetValue;
                            }
                            setFormData({
                              ...formData,
                              defaultAmounts: defaultValues
                            });
                          }}
                          style={{
                            color: "#878787",
                            width: "50px",
                            border: "none",
                            fontWeight: 500,
                            margin: 0,
                            fontSize: "12px",
                            padding: "10px 1px",
                            borderRadius: "22px"
                          }}
                        />
                      </div> */}
                    </div>
                    <div className="form-submit-btn-container">
                      <CustomBtn
                        icon={donationwhiteIcon}
                        eventHandler={handlePreviewOpen}
                        label={"Next"}
                        isDisabled={false}
                        imgWidth="19px"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationForm;
