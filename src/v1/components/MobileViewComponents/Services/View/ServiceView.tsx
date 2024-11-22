import React, { useEffect, useState } from "react";
import BackButton from "../../Shared/BackButton";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import { Box, Card, Typography } from "@mui/material";

// import nikahdefaultImg from "../../../../photos/Newuiphotos/Services/nikahdefault.webp";
import serviceIcon from "../../../../photos/Newuiphotos/Services/service.webp";
import shareIcon from "../../../../photos/Newuiphotos/ShareIcon.webp";
// import ServiceDefaultImg from "../../../../photos/masjidPreview.png";
import ServiceDefaultImg from "../../../../photos/Newuiphotos/Services/service_placeholer.webp";

import edit from "../../../../photos/Newuiphotos/Icons/Edit.svg";

import "./ServiceView.css";
import Skeleton from "react-loading-skeleton";
import MoreBtn from "../../Shared/MoreBtn";
import NikahServiceFields from "./ServiceFields/NikahServiceFields";
import MedicalServiceFields from "./ServiceFields/MedicalServiceFields";
import ConsultingServiceFields from "./ServiceFields/ConsultingServiceFields";
import FinancialServiceFields from "./ServiceFields/FinancialServiceFields";
import DeleteWarningCard from "../../Shared/DeleteWarningCard/DeleteWarningCard";
import CustomBtn from "../../Shared/CustomBtn";
import Disclaimer from "../../Shared/Disclaimer/Disclaimer";
import { useMutation } from "@apollo/client";
import { UPDATE_SERVICE } from "../../../../graphql-api-calls/mutation";
import toast from "react-hot-toast";
import { Get_Services } from "../../../../graphql-api-calls/query";
import { getDonationDefaultIcon } from "../../../../helpers/ServiceIconHelper/ServiceIconHelper";
import FullScreenImageModal from "../../Donation/Carousel/FullScreenImageModal ";
import { useNavigationprop } from "../../../../../MyProvider";
import { fetchMasjidById } from "../../../../redux/actions/MasjidActions/fetchMasjidById";
import { useAppSelector, useAppThunkDispatch } from "../../../../redux/hooks";

const ServiceView = ({
  formData,
  tZone,
  loadingRequest,
  images = [],
  Dates,
  handleDisclaimerStatus,
  isPreviewMode,
  setPreview,
  selectedWeekDays,
  updateEventPhotos,
  isEditing = true,
  setIsPreviewVisible,
  handleEditButton,
  setIsRegistrationsVisible,
  setIsShareVisible,
  masjidId,
}: any) => {
  const navigation = useNavigationprop();
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const dispatch = useAppThunkDispatch();
  const [masjidName, setMasjidName] = useState("");
  const masjidAPIRequest = () => {
    const response = dispatch(fetchMasjidById(masjidId));
    response.then(function (result) {
      if (result?.address) {
        setMasjidName(result.masjidName);
      } else {
        toast.error("Unable to fetch Masjid data");
      }
    });
  };

  useEffect(() => {
    if (masjidId && !AdminMasjidState?.address) {
      masjidAPIRequest();
    } else if (AdminMasjidState?.masjidName) {
      setMasjidName(AdminMasjidState.masjidName);
    }
  }, [masjidId]);
  const [isDeactivateWarningVisible, setIsDeactivateWarningVisible] =
    useState(false);

  const [isSubmitWarningVisible, setIsSubmitWarningVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(formData?.active);
  const [isImageOpenVisible, setIsImageOpenVisible] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [currentImageAlt, setCurrentImageAlt] = useState("");

  const handleImageClick = (src, alt) => {
    setCurrentImageSrc(src);
    setCurrentImageAlt(alt);
    setIsImageOpenVisible(true);
  };

  const [updateService, { data, loading, error }] = useMutation(
    UPDATE_SERVICE,
    {
      refetchQueries: [
        { query: Get_Services, variables: { masjidId: masjidId } },
      ],
      awaitRefetchQueries: true,
    }
  );
  const removeTypename = (obj: any) => {
    if (Array.isArray(obj)) {
      return obj.map(removeTypename);
    } else if (typeof obj === "object" && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        if (key !== "__typename") {
          newObj[key] = removeTypename(obj[key]);
        }
      }
      return newObj;
    } else {
      return obj;
    }
  };
  useEffect(() => {
    setChecked(formData?.active);
  }, [formData?.active]);
  const handleServiceUpdate = async (serviceId: string, isActive: boolean) => {
    const loadingToast = toast.loading(
      isActive ? "Deactivating service..." : "Activating service..."
    );
    const { id, ...responseWithoutId } = removeTypename(
      formData.responseResponse
    );
    try {
      setLoader(true);
      const { data } = await updateService({
        variables: {
          id: serviceId,
          input: {
            ...responseWithoutId,
            active: !isActive,
            masjidId,
          },
        },
      });
      if (data.updateService) {
        toast.success(
          `Service ${isActive ? "activated" : "deactivated"} successfully`,
          {
            id: loadingToast, // Update the existing toast
          }
        );
        setIsDeactivateWarningVisible(false);

        if (navigation) navigation("/feed/7");
        else customNavigatorTo("/feed/7");
      } else {
        toast.error(
          `Failed to ${!isActive ? "activate" : "deactivate"} service`,
          {
            id: loadingToast, // Update the existing toast
          }
        );
      }
    } catch (e) {
      console.error(
        `Error ${isActive ? "deactivating" : "activating"} service:`,
        e
      );
      toast.error("An error occurred. Please try again.", {
        id: loadingToast, // Update the existing toast
      });
    } finally {
      // Ensure the toast is dismissed
      toast.dismiss(loadingToast);
      setLoader(false);
    }
  };

  const handleBackPreview = () => {
    if (setIsPreviewVisible) {
      setIsPreviewVisible(false);
    } else {
      handleBackDetails();
    }
  };
  const handleBackDetails = () => {
    if (navigation) navigation("/feed/7");
    else customNavigatorTo("/feed/7");
  };
  const renderServiceFields = (serviceName: string) => {
    switch (serviceName) {
      case "Nikah":
        return <NikahServiceFields formData={formData} />;
      case "Medical Clinic":
        return <MedicalServiceFields formData={formData} />;
      case "Consultation":
        return <ConsultingServiceFields formData={formData} />;
      case "Financial Assistance":
        return <FinancialServiceFields formData={formData} />;
      default:
        return null;
    }
  };
  const handleChange = (event: any) => {
    setIsDeactivateWarningVisible(!isDeactivateWarningVisible);
  };

  const label = { inputProps: { "aria-label": "Color switch demo" } };
  return (
    <div className="ServicesViewContainer" data-testid="service-details">
      <div style={{ width: "100%" }}>
        <div className="goback">
          <BackButton
            handleBackBtn={
              isPreviewMode ? handleBackPreview : handleBackDetails
            }
          />
        </div>
        <h3 className="page-title">{formData?.serviceName}</h3>
      </div>
      <div className="ViewMainContainer">
        <Card
          style={{
            borderRadius: "16px",
            margin: "auto 10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="service-details-body">
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#e4fff1",
                minHeight: "160px",
                alignItems: "center",
              }}
            >
              <Box
                className="event-input-img"
                component="img"
                alt="service-top-img"
                src={
                  formData?.image instanceof File
                    ? URL.createObjectURL(formData.image)
                    : formData?.image || ServiceDefaultImg
                }
                sx={{
                  height: formData?.image ? 220 : 120,
                  display: "block",
                  overflow: "hidden",
                  width: "auto",
                  borderRadius: "20px",
                  objectFit: "contain",
                }}
                onClick={() => {
                  // if (formData?.image) {
                  if (formData?.image) {
                    const imageSrc =
                      formData?.image instanceof File
                        ? URL.createObjectURL(formData?.image)
                        : formData?.image;

                    handleImageClick(imageSrc, "Image");
                  }
                  // }
                }}
              />
            </Box>

            <div className="servicedetails">
              {formData?.registrationRequired ? (
                <div className="registrationDetails">
                  <h5>Registration Fees</h5>
                  <h5 className="regType" style={{ color: "#1D785A" }}>
                    {formData.registrationOption == "paid"
                      ? "$" + formData.cost
                      : "Free"}
                  </h5>
                </div>
              ) : null}

              <div className="title">
                <div className="service-drop-item ">
                  <h5 className="service-name-top">Service Name</h5>
                  <h3
                    style={{
                      fontSize: "20px",
                      color: "#1D785A",
                      margin: "10px 0",
                    }}
                  >
                    {formData?.serviceName || (
                      <Skeleton count={1} width={"100px"} />
                    )}
                  </h3>
                </div>
                <div
                  className="action-icon"
                  style={{ display: "flex", gap: "15px" }}
                >
                  <div
                    className="edit-delete-service"
                    onClick={() =>
                      isPreviewMode ? handleBackPreview() : handleEditButton()
                    }
                  >
                    <img src={edit} alt="Edit Icon" />
                  </div>
                </div>
              </div>
              {isPreviewMode ? null : (
                <div className="toggle-switch">
                  <Typography
                    sx={{
                      color: checked ? "#4caf50" : "#FF7272",
                      width: "70px",
                      fontWeight: "bold",
                    }}
                    className="toggle-switch-text"
                  >
                    {checked ? "Active" : "Deactivate"}
                  </Typography>
                  <div
                    onClick={handleChange}
                    className="toggle-switch-container"
                    style={{ backgroundColor: checked ? "#4caf50" : "#FF7272" }}
                  >
                    <div
                      data-testid="service-toggle-switch"
                      className="toggle-switch-thumb"
                      style={{ left: checked ? "22px" : "4px" }}
                    />
                  </div>
                </div>
              )}
              <div className="service-des-drop-item">
                <h5 className="service-des-top">Description</h5>
                {formData?.description ? (
                  <div>
                    <MoreBtn
                      tsx={formData?.description}
                      txLength={formData?.description.length}
                    />
                  </div>
                ) : (
                  <Skeleton count={3} width={"320px"} />
                )}
                {/* <h6 className="clk-to-reg">Click to Registered</h6> */}
              </div>
              <div className="service-drop-item">
                <h5>Email Address </h5>
                <p>{formData?.email}</p>
              </div>
              {formData?.contactNumber ? (
                <div className="service-drop-item">
                  <h5>Contact Number</h5>
                  <p>{formData?.contactNumber}</p>
                </div>
              ) : null}
              {formData?.registrationRequired
                ? renderServiceFields(formData?.serviceName)
                : null}
              <div className="service-drop-item">
                <h5>Location</h5>
                <p>{masjidName}</p>
              </div>
              <div
                className="servicePreviewBtn"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px auto",
                }}
              >
                {isPreviewMode && (
                  <div className="confirm-btn">
                    <CustomBtn
                      isLoading={loadingRequest}
                      eventHandler={() => {
                        setIsSubmitWarningVisible(true);
                      }}
                      label={`Confirm & ${
                        formData.id ? "Update" : "Add"
                      } Service`}
                      isDisabled={loadingRequest}
                      showIcon={false}
                      icon={serviceIcon}
                      imgWidth={"10%"}
                    />
                  </div>
                )}
              </div>
              <div
                className="serviceShowRegistrationsBtn"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {formData?.registrationRequired && !isPreviewMode ? (
                  <>
                    {" "}
                    <CustomBtn
                      eventHandler={() => {
                        setIsRegistrationsVisible
                          ? setIsRegistrationsVisible(true)
                          : null;
                      }}
                      label={"Show Registered User's"}
                      isDisabled={false}
                      icon={serviceIcon}
                      size="5vw"
                      imgWidth={"10%"}
                    />
                    <div className="share-btn">
                      <CustomBtn
                        eventHandler={() => {
                          setIsShareVisible(true);
                        }}
                        label={"Share"}
                        isDisabled={false}
                        icon={shareIcon}
                        bgColor="#1D785A"
                        size="0.5vw"
                        hightSize="26px"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Card>
        {isDeactivateWarningVisible ? (
          <DeleteWarningCard
            wariningType={`${checked ? "Deactivate" : "Active"} ${
              formData.serviceName
            } Service`}
            warining={`Are you sure you want to ${
              checked ? "Deactivate" : "Active"
            } This Service ?`}
            onClose={() => setIsDeactivateWarningVisible(false)}
            onConfirm={() => {
              handleServiceUpdate(formData.id, checked);
            }}
            icon={getDonationDefaultIcon(formData.serviceName)}
            progress={loading}
          />
        ) : null}
        {isSubmitWarningVisible ? (
          <Disclaimer
            showDisclaimer={isSubmitWarningVisible}
            handleDisclaimerStatus={handleDisclaimerStatus}
            setDisclaimer={setIsSubmitWarningVisible}
            setIsSubmitting={setIsSubmitting}
          />
        ) : null}
      </div>
      <FullScreenImageModal
        isOpen={isImageOpenVisible}
        setIsOpen={setIsImageOpenVisible}
        imgSrc={currentImageSrc}
        imgAlt={currentImageAlt}
      />
    </div>
  );
};

export default ServiceView;
