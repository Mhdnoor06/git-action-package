import "./programCard.css";
import programIcon from "../../../../..//photos/placeholder.png";
import clockRedIcon from "../../../../../photos/Newuiphotos/Icons/clock.svg";
import {
  customNavigatorTo,
  dateReverter,
  UTCTimeReverter,
} from "../../../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../../../MyProvider";
import moment from "moment";
import { useAppSelector } from "../../../../../redux/hooks";

interface ProgramCardProps {
  program: {
    _id: string;
    programName: string;
    description: string;
    category: string;
    active: boolean;
    images: { url: string; id: string };
  };
  tZone: string;
  masjidName: string;
  consumerMasjidId: string;
}

const ProgramCard = ({
  program,
  tZone,
  masjidName,
  consumerMasjidId,
}: ProgramCardProps) => {
  let admin = useAppSelector((state) => state.admin);

  const masjidIdQuery =
    admin.role === "admin" || admin.role === "superadmin"
      ? `?masjidId=${consumerMasjidId}`
      : "";
  const navigation = useNavigationprop();

  const truncateDescription = (description: string, maxLength: number) => {
    if (description?.length <= maxLength) {
      return description;
    }
    return description?.substring(0, maxLength) + "......";
  };

  const handleCardClick = () => {
    if (navigation) {
      navigation(`/program-details/${program?._id || 1}${masjidIdQuery}`);
    } else {
      customNavigatorTo(
        `/program-details/${program?._id || 1}${masjidIdQuery}`
      );
    }
  };
  const date = dateReverter(program.metaData.startDate, tZone);

  return (
    <div
      className="program-card" // Updated class name
      data-testid="program-card" // Updated test id
      onClick={handleCardClick}
    >
      <div className="program-card-image">
        {" "}
        {/* Updated class name */}
        <img
          src={
            program.programPhotos?.length > 0
              ? program.programPhotos[0]
              : programIcon
          }
          alt={program?.programName || "program name "}
        />
      </div>
      <div className="program-card-content">
        {" "}
        {/* Updated class name */}
        <div>
          <h3 className="program-icon-with-date">
            {" "}
            <img src={clockRedIcon} alt="" style={{ width: "15px" }} />
            <span>{UTCTimeReverter(program.timings[0].startTime, tZone)}</span>
            <span>{`(${moment(date, "YY-MM-DD").format("DD MMMM")})`}</span>
          </h3>
        </div>
        <p className="program-card-details">
          {" "}
          {/* Updated class name */}
          {truncateDescription(program.category, 65)}
          <br />
        </p>
        <h3 className="program-title">{program.programName}</h3>
        <p className="masjid-name-field">{masjidName}</p>
      </div>
    </div>
  );
};

export default ProgramCard;
