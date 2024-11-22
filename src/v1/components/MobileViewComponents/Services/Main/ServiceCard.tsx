import "./ServiceCard.css";
import { Box } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import activeService from "../../../../photos/Newuiphotos/Services/active.webp";
import deactivateService from "../../../../photos/Newuiphotos/Services/deactive.webp";
import { getDonationDefaultIcon } from "../../../../helpers/ServiceIconHelper/ServiceIconHelper";
import { useNavigationprop } from "../../../../../MyProvider";
import { useAppSelector } from "../../../../redux/hooks";

interface ServiceCardProps {
  service: {
    id: string;
    serviceName: string;
    description: string;
    active: boolean;
    images: { url: string; id: string };
  };
  consumerMasjidId: string;
}
const ServiceCard = ({ service, consumerMasjidId }: ServiceCardProps) => {
  const navigation = useNavigationprop();
  let admin = useAppSelector((state) => state.admin);

  const masjidIdQuery =
    admin.role == "admin" || admin.role == "superadmin"
      ? `?masjidId=${consumerMasjidId}`
      : "";

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "......";
  };

  const handleCardClick = () => {
    if (navigation) {
      navigation(`/service-details/${service.id}${masjidIdQuery}`);
    } else {
      customNavigatorTo(`/service-details/${service.id}${masjidIdQuery}`);
    }
  };
  return (
    <div
      className="service-card"
      data-testid="service-card"
      onClick={handleCardClick}
    >
      <div className="service-card-image">
        <img
          alt="service-icon"
          src={service?.image || getDonationDefaultIcon(service.serviceName)}
        />
      </div>
      <div className="service-card-content">
        <div>
          <h3>{service.serviceName}</h3>
        </div>

        <p className="service-card-details">
          {truncateDescription(service.description, 65)}
          <br />
        </p>
        <p className="service-card-details">
          <span>
            <img
              src={service?.active ? activeService : deactivateService}
              style={{ display: "inline-block" }}
              alt={service?.active ? "active service" : "deactivate service"}
            />
          </span>
          {service.active ? "Active" : "Deactivate"}
          <br />
        </p>
      </div>
      <div className="service-card-next">
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

export default ServiceCard;
