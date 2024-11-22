import React, { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import serviceIcon from "../../../../../photos/Newuiphotos/program/Frame-_4_.webp";
import ServiceDefaultImg from "../../../../../photos/Newuiphotos/Icons/noEvntphoto.svg";
import edit from "../../../../../photos/Newuiphotos/Icons/Edit.svg";
import del from "../../../../../photos/Newuiphotos/Icons/delete.svg";
import "../../../Services/services.css";
import "./programs.css";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import DeleteWarningCard from "../../../Shared/DeleteWarningCard/DeleteWarningCard";
import BackButton from "../../../Shared/BackButton";
import CustomBtn from "../../../Shared/CustomBtn";
import Disclaimer from "../../../Shared/Disclaimer/Disclaimer";
import {
  convertTo24HourFormat,
  customNavigatorTo,
} from "../../../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../../../MyProvider";
import {
  DELETE_PROGRAM,
  UPDATE_PROGRAM,
} from "../../../../../graphql-api-calls/mutation";
import {
  Get_PROGRAMS,
  Get_PROGRAMS_BY_RANGE,
} from "../../../../../graphql-api-calls/query";

import Ticket from "../../../Shared/TicketModel/Ticket";
import moment from "moment";
import MoreBtn from "../../../Shared/MoreBtn";
import ShareModal from "../../../Services/Helpers/ShareButtons/ShareButtons";
import { useAppSelector } from "../../../../../redux/hooks";
import EventCarousel from "../../../Events/Carousel/EventCarousel";
import ProgramCarousel from "../../Carousel/ProgramCarousel";
import FullScreenImageModal from "../../../Donation/Carousel/FullScreenImageModal ";

const ProgramView = ({
  formData,
  handleDisclaimerStatus,
  isPreviewMode,
  setShowCheckIn,
  isEditing = true,
  setIsPreviewVisible,
  handleEditButton,
  masjidId,
  children,
  isLoading = false,
}: any) => {
  const navigation = useNavigationprop();
  let adminMasjid = useAppSelector((state) => state.AdminMasjid);
  const [isDeactivateWarningVisible, setIsDeactivateWarningVisible] =
    useState(false);

  const [isSubmitWarningVisible, setIsSubmitWarningVisible] = useState(false);
  const [isImageOpenVisible, setIsImageOpenVisible] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [currentImageAlt, setCurrentImageAlt] = useState("");
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setChecked] = useState(formData?.active);

  // console.log("from program proview=> ", formData);
  const startDate = moment()
    .startOf("month")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const endDate = moment().endOf("year").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const rangeVariables = {
    masjidId,
    startDate,
    endDate,
  };
  const [deleteProgram, { loading, error }] = useMutation(DELETE_PROGRAM, {
    refetchQueries: [
      { query: Get_PROGRAMS_BY_RANGE, variables: rangeVariables },
    ],
    awaitRefetchQueries: true,
  });

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

  const handleBackPreview = () => {
    if (setIsPreviewVisible) {
      setIsPreviewVisible(false);
    } else {
      handleBackDetails();
    }
  };
  const handleBackDetails = () => {
    if (navigation) navigation("/feed/9");
    else customNavigatorTo(`/feed/9`);
  };

  const handleProgramDelete = async (id: string) => {
    const loadingToast = toast?.loading("Deleting Program...");
    try {
      const { data } = await deleteProgram({ variables: { id: id } });
      if (data.DeleteProgram) {
        toast.success("Program deleted successfully", {
          id: loadingToast, // Update the existing toast
        });
        setIsDeactivateWarningVisible(false);
        if (navigation) navigation("/feed/9");
        else customNavigatorTo(`/feed/9`);
      } else {
        toast.error("Failed to delete Program", {
          id: loadingToast, // Update the existing toast
        });
      }
    } catch (e) {
      console.error("Error deleting  Program:", e);
    } finally {
      // Ensure the toast is dismissed
      toast.dismiss(loadingToast);
    }
  };

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const handleImg = () => {
    if (
      formData?.images?.length > 0 &&
      typeof formData?.images[0] !== "string"
    ) {
      const imgUrl = URL.createObjectURL(formData?.images[0]);
      return [imgUrl, false];
    } else if (
      formData?.images?.length > 0 &&
      typeof formData?.images[0] === "string"
    )
      return [formData?.images[0], false];
    else {
      return [ServiceDefaultImg, true];
    }
  };
  const responsiveStyleImg = {
    height: "auto",
    maxHeight: 120,
    display: "block",
    overflow: "hidden",
    width: "auto",
    borderRadius: "20px",
  };

  return (
    <>
      <div className=" program-view-container">
        <div style={{ width: "100%" }}>
          <div className="goback">
            <BackButton
              handleBackBtn={
                isPreviewMode ? handleBackPreview : handleBackDetails
              }
            />
          </div>
          {isEditing ? (
            // <div className="top-img-container">
            <>
              {handleImg()[1] ? (
                <div className="top-img-container">
                  <img
                    className="program-no-img"
                    src={handleImg()[0]}
                    alt="program-img"
                  />
                </div>
              ) : (
                <ProgramCarousel
                  isProgDetails={true}
                  programData={formData?.images}
                  isEditing={isEditing}
                  handleToggleImage={() => setIsImageOpenVisible(true)}
                  setImgSrc={setCurrentImageSrc}
                  setAltSrc={setCurrentImageAlt}
                />
              )}
            </>
          ) : (
            // </div>
            <h3 className="page-title">Confirm Program</h3>
          )}
          {isPreviewMode ? (
            <h3 className="page-title">{formData?.programName}</h3>
          ) : null}
        </div>

        <div
          className="ViewMainContainer"
          style={{ marginTop: "-50px", zIndex: 1 }}
        >
          <Card
            style={{
              borderRadius: "16px",
              margin: "auto 10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="program-details-body">
              {!isEditing && formData?.images.length > 0 ? (
                <ProgramCarousel
                  programData={formData?.images}
                  isEditing={isEditing}
                  handleToggleImage={() => setIsImageOpenVisible(true)}
                  setImgSrc={setCurrentImageSrc}
                  setAltSrc={setCurrentImageAlt}
                />
              ) : !isEditing && formData?.images.length === 0 ? (
                <Box className="program-input-img-container">
                  <Box
                    component="img"
                    alt="program-img"
                    sx={responsiveStyleImg}
                    src={handleImg()[0]}
                  />
                </Box>
              ) : null}

              <div className="programDetails">
                <div className="title">
                  <h3
                    data-testid="program-name"
                    style={{
                      fontSize: "20px",
                      color: "#1D785A",
                      margin: "10px 0px 0px 0px",
                      textTransform: "capitalize",
                    }}
                  >
                    {formData?.programName || (
                      <Skeleton count={1} width={"100px"} />
                    )}
                  </h3>

                  <div
                    className="action-icon"
                    style={{ display: "flex", gap: "15px" }}
                  >
                    {formData?.programName ? (
                      <div className="edit-delete-program">
                        <img
                          onClick={() =>
                            isPreviewMode
                              ? handleBackPreview()
                              : handleEditButton()
                          }
                          src={edit}
                          alt="edit-icon"
                        />
                        {isEditing ? (
                          <img
                            onClick={() =>
                              setIsDeactivateWarningVisible(
                                !isDeactivateWarningVisible
                              )
                            }
                            style={{ marginLeft: "10px" }}
                            src={del}
                            alt="Delete icon"
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>

                {console.log(
                  " Ticket will be issued to the user => ",
                  formData
                )}
                <h3 className="styled-category">{formData?.programCategory}</h3>
                {formData?.isRegistrationRequired ? (
                  <div className="program-ticket">
                    <h4
                      style={{
                        margin: "0",
                        paddingTop: "7px",
                        marginBottom: "5px",
                      }}
                    >
                      Ticket Will Be Issued To The User
                    </h4>
                    <div
                      className="program-ticket-container"
                      onClick={() => (isEditing ? setShowCheckIn(true) : null)}
                    >
                      <Ticket
                        title={formData?.programName}
                        time={moment(formData.startTime, "HH:mm").format(
                          "hh:mm A"
                        )}
                        date={moment(formData.startDate).format("DD-MMM-YYYY")}
                        seats={formData?.capacity}
                        price={formData?.cost}
                        color="#C2E8D5"
                        totalSeatsBooked={0}
                        totalSeatsBooked={
                          formData?.availableSeats
                            ? formData?.availableSeats < 0
                              ? -formData?.availableSeats
                              : formData?.capacity - formData?.availableSeats
                            : 0
                        }
                      />
                    </div>
                  </div>
                ) : null}
                {isEditing && !formData?.isRegistrationRequired
                  ? children
                  : null}
                {/* {!formData?.isRegistrationRequired && formData.cost > 0  ? children : null} */}
                <div className="program-drop-item">
                  <h5>Age Ranges </h5>
                  <p>
                    {formData?.ageOption === "range"
                      ? `${formData.startRange} to ${formData.endRange} `
                      : formData?.ageOption}
                  </p>
                  <p></p>
                </div>
                {/* {formData?.isRegistrationRequired ? ( */}
                <div className="progRegDetails">
                  <h5>Registration Fees</h5>
                  <h5 className="regType" style={{ color: "#1D785A" }}>
                    {/* {formData?.registrationOption} */}
                    {formData?.registrationOption == "paid"
                      ? "$ " + formData.cost
                      : "Free"}
                  </h5>
                </div>
                {/* ) : null} */}
                <div className="program-flex-item">
                  <h5>Program Capacity</h5>
                  <p>{formData?.capacity}</p>
                </div>

                {/* <div className="program-drop-item">
                <h5>Program Category </h5>
                <p>{formData?.programCategory}</p>
              </div> */}
                <div className="program-drop-item ">
                  <h5>Description </h5>
                  <p style={{ overflow: "hidden", width: "100%" }}>
                    <MoreBtn
                      tsx={formData?.description}
                      txLength={formData?.description.length}
                    />
                  </p>
                </div>
                <div className="program-drop-item">
                  <h5>Start Date & Time </h5>
                  <p>
                    {moment(formData?.startDate).format("DD MMM YYYY")}|
                    {moment(formData?.startTime, ["h:mm A", "HH:mm"]).format(
                      "h:mm A"
                    )}
                  </p>
                </div>
                <div className="program-drop-item">
                  <h5>End Date & Time </h5>
                  <p>
                    {moment(formData?.endDate).format("DD MMM YYYY")} |{" "}
                    {moment(formData?.endTime, ["h:mm A", "HH:mm"]).format(
                      "h:mm A"
                    )}
                  </p>
                </div>

                <div className="program-location-box">
                  <h5>Location </h5>
                  <ShareModal
                    isOpen={isShareVisible}
                    onClose={() => {
                      setIsShareVisible(false);
                    }}
                    shareUrl="https://www.google.com"
                  />
                  <p>
                    {adminMasjid.address === formData?.address
                      ? adminMasjid.masjidName
                      : formData?.address}
                  </p>
                </div>
                <div
                  className="servicePreviewBtn"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {isPreviewMode && (
                    <div className="confirm-btn">
                      <CustomBtn
                        eventHandler={() => {
                          setIsSubmitWarningVisible(true);
                        }}
                        label={`Confirm &  ${
                          formData?.id ? "Update" : "Add"
                        } Program`}
                        isDisabled={isLoading}
                        icon={serviceIcon}
                        imgWidth={"10%"}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="serviceShowRegistrationsBtn"
                  style={{ display: "flex", justifyContent: "center" }}
                ></div>

                {/* <div
                className="serviceShowRegistrationsBtn"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="share-btn">
                  <CustomBtn
                    eventHandler={() => {
                      setIsShareVisible(true);
                    }}
                    label={"Share"}
                    isDisabled={false}
                    icon={shareIcon}
                    bgColor="#A3A3A3"
                    size="0.5vw"
                    hightSize="26px"
                  />
                </div>
              </div> */}
              </div>
            </div>
          </Card>
          {isDeactivateWarningVisible ? (
            <DeleteWarningCard
              wariningType={`Deleting the program`}
              warining={`Are you sure you want to Delete the program ?`}
              onClose={() => setIsDeactivateWarningVisible(false)}
              onConfirm={() => {
                handleProgramDelete(formData._id);
              }}
              // icon={getDonationDefaultIcon(formData.serviceName)}
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
      </div>
      <FullScreenImageModal
        isOpen={isImageOpenVisible}
        setIsOpen={setIsImageOpenVisible}
        imgSrc={currentImageSrc}
        imgAlt={currentImageAlt}
      />
    </>
  );
};

export default ProgramView;
