import React, { useEffect, useState } from "react";
import DonationPreview from "../Preview/DonationPreview";
import { useCustomParams } from "../../../../helpers/HelperFunction";
import DonationHistory from "../History/DonationHistory";
import ShareModal from "../../Services/Helpers/ShareButtons/ShareButtons";

const DonationDetails = ({
  donation,
  handleCloseDonationDetails,
  handleReload,
  consumerMasjidId,
  tZone,
}: any) => {
  const [images, setImages] = useState({ images: donation.images });
  const [isShareVisible, setIsShareVisible] = useState(false);
  // const [isDonationsHistoryVisible, setIsDonationHistoryVisible] =
  //   useState(false);
  const dummyFormData = {
    description: "description of the donation goes here!",
    donationPurpose: "Zakat Donation",
    defaultAmounts: ["200.00", "100.00", "50.00"],
  };

  const sortedDonation = {
    ...donation,
    prices: donation.prices ? [...donation.prices].sort((a, b) => a - b) : [],
  };

  // const fetchedImages: any = [];
  // const id = useCustomParams();
  // console.log(id);
  // useEffect(() => {
  //   if (id) {
  //     // Fetch the data using the id from the URL in View mode
  //   }
  // }, [id]);
  // const handleToggleDonations = () => {
  //   //handle showing donations table
  //   console.log("handleShowDonations");
  //   setIsDonationHistoryVisible(!isDonationsHistoryVisible);
  // };
  return (
    <div data-testid="donation-details">
      {/* {isDonationsHistoryVisible ? (
        <DonationHistory
          handleToggleDonations={handleToggleDonations}
          id={id}
        />
      ) : ( */}
      <DonationPreview
        // handleShowDonations={handleToggleDonations}
        donation={sortedDonation}
        isPreviewMode={false}
        handleCloseDonationDetails={handleCloseDonationDetails}
        handleReload={handleReload}
        consumerMasjidId={consumerMasjidId}
        tZone={tZone}
        setIsShareVisible={setIsShareVisible}
      />
      {/* )} */}
      <ShareModal
        isOpen={isShareVisible}
        onClose={() => {
          setIsShareVisible(false);
        }}
        shareUrl="https://www.google.com"
      />
    </div>
  );
};

export default DonationDetails;
