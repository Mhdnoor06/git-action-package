import recurrenceIcon from "../../../../photos/Newuiphotos/Icons/recurrence.png";
// import "../../Events/Card/EventCard.css";
import "./DonationCard.css";
import DonationPreview from "../../../../photos/masjidPreview.png";
import reddot from "../../../../photos/Newuiphotos/Donations/reddot.webp";
import { Box } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

interface DonationCardProps {
  donation: {
    id: string;
    name: string;
    description: string;
    active: boolean;
    images: { url: string; id: string };
  };
  handleDonationClick: (donation: any) => void;
}
const DonationCard = ({ donation, handleDonationClick }: DonationCardProps) => {
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "......";
  };

  const handleCardClick = () => {
    handleDonationClick(donation);
    // if (navigation) {
    //   navigation(`/donation-details/${donation.id}`);
    // } else {
    //   customNavigatorTo(`/donation-details/${donation.id}`);
    // }
  };
  return (
    <div
      className="donation-card"
      data-testid="donation-card"
      onClick={handleCardClick}
    >
      <div className="donation-card-image">
        <img
          src={
            donation.images?.length > 0 ? donation.images[0] : DonationPreview
          }
        />
      </div>
      <div className="donation-card-content">
        <div>
          <h3>{donation.name}</h3>
        </div>

        <p className="donation-card-details">
          {truncateDescription(donation.description, 50)}
          <br />
          <span className="Datetime">
            {/* {true ? <></> : <></>} */}
            <span
              className={donation.active ? "greendot" : "reddot"}
              data-testid={donation.active ? "greendot" : "reddot"}
            ></span>
            {/* <img src={reddot} alt="" style={{ width: "15px" }} /> */}
            <strong style={{ color: donation.active ? "#00c986" : "#fc4a4a" }}>
              {donation.active ? "Active" : "Deactive"}
            </strong>
          </span>
        </p>
      </div>
      <div className="donation-card-next">
        <Box
          data-testid="nextslide"
          sx={{
            borderRadius: "20px",
            boxShadow: "0px 1px 5px -1px rgba(0, 0, 0, 0.3)",
            height: "24px",
            width: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#EFEFEF",
            fontSize: "18px",
          }}
        >
          <KeyboardArrowRightOutlinedIcon fontSize={"inherit"} />
        </Box>
      </div>
    </div>
  );
};

export default DonationCard;
