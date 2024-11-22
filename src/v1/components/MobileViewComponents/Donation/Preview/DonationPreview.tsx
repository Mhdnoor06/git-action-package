import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./DonationPreview.css";
import BackButton from "../../Shared/BackButton";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

import noEventImg from "../../../../photos/Newuiphotos/Icons/noEvntphoto.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import edit from "../../../../photos/Newuiphotos/Icons/Edit.svg";
import MoreBtn from "../../Shared/MoreBtn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DonationAmountInput from "../Helpers/DonationAmountInput";
import CustomBtn from "../../Shared/CustomBtn";
import donationwhiteIcon from "../../../../photos/Newuiphotos/Donations/donationwhite.webp";

import DonationCarousel from "../Carousel/DonationCarousel";
import DeleteWarningCard from "../../Shared/DeleteWarningCard/DeleteWarningCard";
import donationIcon from "../../../../photos/Newuiphotos/Donations/donationlightgreen.webp";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../../../../graphql-api-calls";
import toast from "react-hot-toast";
import shareIcon from "../../../../photos/Newuiphotos/ShareIcon.webp";
import DonationDisclaimer from "../Disclaimer/DonationDisclaimer";
import FullScreenImageModal from "../Carousel/FullScreenImageModal ";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 21,
  height: 13,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(8px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "rgb(0, 201, 134)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 11,
    height: 11,
  },
  "& .MuiSwitch-track": {
    borderRadius: 13 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#FC4A4A",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface DonationViewProps {
  // handleShowDonations?: (val: any) => void;
  handleDisclaimerStatus?: (val: boolean) => void;
  setIsPreviewVisible?: Dispatch<SetStateAction<boolean>>;
  images?: any;
  donation: any;
  isPreviewMode: boolean;
  handleCloseDonationDetails?: () => void;
  handleReload: () => void;
  consumerMasjidId: string;
  tZone: string;
  setIsShareVisible?: Dispatch<SetStateAction<boolean>>;
}

const important = (value: any) => {
  return (value + " !important") as any;
};
const DonationPreview = ({
  setIsPreviewVisible,
  images,
  donation,
  // handleShowDonations,
  handleDisclaimerStatus,
  isPreviewMode,
  handleCloseDonationDetails,
  handleReload,
  consumerMasjidId,
  tZone,
  setIsShareVisible,
}: DonationViewProps) => {
  // const [donation, setDonation] = useState(null);

  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeactivateWarningVisible, setIsDeactivateWarningVisible] =
    useState(false);
  const [activeDeactiveMsg, setActiveDeactiveMsg] = useState("");
  const [active, setActive] = useState(donation.active);
  const [isImageOpenVisible, setIsImageOpenVisible] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");
  const [currentImageAlt, setCurrentImageAlt] = useState("");

  const [updateProduct, { loading, error, data }] = useMutation(
    UPDATE_PRODUCT,
    {
      onCompleted: (data) => {
        toast.dismiss();
        toast.success(
          `Donation ${active ? "Deactivated" : "Activated"} successfully`
        );
        setActive(!active);
        handleReload();
        // handleReload();
        // customNavigatorTo(`/feed/6`);
        // setIsFormVisible(false);
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(`Failed to ${active ? "Deactivate" : "Activate"} donation`);
        console.error(
          `Error ${active ? "Deactivate" : "Activate"} donation:`,
          error.message
        );
      },
    }
  );

  const handleShowDisclaimer = () => {
    setIsDisclaimerVisible(true);
  };
  const handleToggleActiveDeactive = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.target.checked) {
      setActiveDeactiveMsg(
        `Are you sure you want to activate ${donation.name} Donation ?`
      );
    } else {
      setActiveDeactiveMsg(
        `Are you sure you want to deactivate ${donation.name} Donation ?`
      );
    }
    setIsDeactivateWarningVisible(true);
  };

  const handleActivateDeactivate = () => {
    updateProduct({
      variables: {
        input: {
          name: donation.name,
          active: !active,
          description: donation.description,
          prices: donation.prices,
          type: "DONATION",
        },
        id: donation.id,
        // prices:[]
      },
    });
    toast.loading("Please wait...");
    setIsDeactivateWarningVisible(false);
  };
  const handleBack = () => {
    console.log("handleBack");
    if (setIsPreviewVisible) {
      console.log("setIsPreviewVisible");

      setIsPreviewVisible(false);
    } else {
      console.log("handleCloseDonationDetails");

      handleCloseDonationDetails ? handleCloseDonationDetails() : null;
      // customNavigatorTo(`/feed/6`);
    }
  };

  const timeZoneHandler = (utcTime: string) => {
    return moment.utc(utcTime).tz(tZone).format("DD MMMM YYYY | hh:mm A");
  };
  const handleToggleImage = () => {
    console.log("handleToggleImage");
    setIsImageOpenVisible(true);
  };
  console.log(tZone);
  return (
    <div className="DonationPreviewContainer">
      <div style={{ width: "100%" }}>
        <div className="goback">
          <BackButton handleBackBtn={handleBack} />
        </div>
        <h3 className="page-title">
          {isPreviewMode ? "Preview Donation" : donation.name}
        </h3>
      </div>
      <div className="donationPreviewMainContainer">
        <Card
          className="donationPreviewCard"
          style={{
            borderRadius: "16px",
            margin: "auto 10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="donation-details-body">
            {(images && images?.length !== 0) || donation.images?.length > 0 ? (
              <DonationCarousel
                eventData={images && images.length !== 0 ? images : donation}
                isEditing={true}
                handleToggleImage={handleToggleImage}
                setImgSrc={setCurrentImageSrc}
                setAltSrc={setCurrentImageAlt}
              />
            ) : (
              <div className="event-preview-img">
                <img src={noEventImg} alt="No Event Image" />
              </div>
            )}

            <div className="donationDesc">
              {/* Title */}
              <div className="title">
                <h3
                  style={{
                    fontSize: "20px",
                    color: "#1D785A",
                    margin: "10px 0",
                  }}
                >
                  {donation.name || <Skeleton count={1} width={"100px"} />}
                </h3>
                {isPreviewMode ? (
                  <div
                    className="action-icon"
                    style={{ display: "flex", gap: "15px" }}
                  >
                    <div
                      className="edit-delete-donation"
                      onClick={() => handleBack()}
                    >
                      <img src={edit} alt="edit" />
                    </div>
                  </div>
                ) : null}
              </div>

              {!isPreviewMode ? (
                <div className="status">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <h5
                      style={
                        active
                          ? { color: "#00C986", margin: "0" }
                          : { color: "#FC4A4A", margin: "0" }
                      }
                    >
                      {active ? "Active" : "Deactive"}
                    </h5>
                    <IOSSwitch
                      defaultChecked={true}
                      checked={active}
                      onChange={handleToggleActiveDeactive}
                    />
                  </div>
                  <p>
                    Service start from {timeZoneHandler(donation.createdAt)}
                  </p>
                </div>
              ) : null}

              {/* Description */}
              <h5>Description</h5>
              <div className="event-des-box">
                {donation.description ? (
                  <div>
                    <MoreBtn
                      tsx={donation.description}
                      txLength={donation.description.length}
                    />
                  </div>
                ) : (
                  <Skeleton count={3} width={"320px"} />
                )}
              </div>

              <h5>Preferred Default Amount </h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: "18px 0px 14px",
                  gap: "15px",
                }}
              >
                {donation.prices.map((amount, index) => (
                  <DonationAmountInput
                    key={index}
                    value={
                      typeof amount === "number"
                        ? amount.toFixed(2).padStart(5, "0") // Format if it's a float
                        : amount
                    }
                    index={index}
                    readOnly={true}
                  />
                ))}
              </div>

              <div
                className="donationPreviewBtn"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {isPreviewMode ? (
                  <CustomBtn
                    eventHandler={handleShowDisclaimer}
                    label={"Confirm & Continue"}
                    isDisabled={isSubmitting}
                    icon={donationwhiteIcon}
                  />
                ) : // : handleShowDonations ? (
                //   <CustomBtn
                //     eventHandler={handleShowDonations}
                //     label={"Show Donation"}
                //     icon={adddonationIcon}
                //   />
                // )
                // <div className="share-btn">
                //   <CustomBtn
                //     eventHandler={() => {
                //       setIsShareVisible ? setIsShareVisible(true) : null;
                //     }}
                //     label={"Share"}
                //     isDisabled={false}
                //     icon={shareIcon}
                //     bgColor="#1D785A"
                //     size="0.5vw"
                //     hightSize="26px"
                //   />
                // </div>
                null}
              </div>
            </div>
          </div>
        </Card>
        {isPreviewMode && handleDisclaimerStatus && (
          <DonationDisclaimer
            showDisclaimer={isDisclaimerVisible}
            handleDisclaimerStatus={handleDisclaimerStatus}
            setDisclaimer={setIsDisclaimerVisible}
            setIsSubmitting={setIsSubmitting}
            DisclaimerText={
              "ConnectMazjid provides donation options but does not handle payment processing. All transactions are managed securely by Stripe. For payment issues, please refer to <a href='https://stripe.com/in/privacy' target='_blank' style='color: rgb(29, 120, 90);font-weight: bold;'>Stripe's policies.</a>"
            }
          />
        )}
        {isDeactivateWarningVisible ? (
          <DeleteWarningCard
            wariningType=""
            warining={activeDeactiveMsg}
            onClose={() => setIsDeactivateWarningVisible(false)}
            onConfirm={() => {
              handleActivateDeactivate();
            }}
            icon={donationIcon}
            progress={false}
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

export default DonationPreview;
