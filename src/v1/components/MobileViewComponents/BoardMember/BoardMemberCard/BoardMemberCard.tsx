import "./boardMemberCard.css";
import { Box, useMediaQuery } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import memberIcon from "../../../../photos/Newuiphotos/BoardMember/bmplaceholder.svg";
import { useNavigationprop } from "../../../../../MyProvider";
import { BoardMember } from "../../../../redux/Types";
import { useAppSelector } from "../../../../redux/hooks";

interface BoardMemberCardProps {
  boardMember: BoardMember;
  consumerMasjidId: string;
}

const BoardMemberCard = ({
  boardMember,
  consumerMasjidId,
}: BoardMemberCardProps) => {
  const navigation = useNavigationprop();
  let admin = useAppSelector((state) => state.admin);

  const masjidIdQuery =
    admin.role === "admin" || admin.role === "superadmin"
      ? `?masjidId=${consumerMasjidId}`
      : "";

  const handleCardClick = (id: string) => {
    const url = `/board-member-details/` + id + masjidIdQuery;
    if (navigation) {
      navigation(url);
    } else {
      customNavigatorTo(url);
    }
  };
  const isMobile = useMediaQuery("(max-width:768px)");
  const truncateMemmberName = (name: string, length) => {
    if ( name.length > length) {
      return `${name.substring(0, length)}...`;
    }
    return name;
  };
  const truncatedMemberName = truncateMemmberName(boardMember.name, 13);
  const truncatedPosition = truncateMemmberName(boardMember.position, 10);
  return (
    <div
      className="board-member-card"
      data-testid="board-member-card"
      onClick={() => handleCardClick(boardMember._id)}
    >
      <div className="board-member-card-info">
        <div className="member-avatar-container">
          <img src={boardMember?.image || memberIcon} alt="Board Member" />
        </div>

        <div className="member-info">
          <h3>{truncatedMemberName}</h3>
          <p className="member-email">{boardMember.email} </p>
        </div>

        <div className="member-role-container">
          <h3>Role</h3>
          <p className="member-role">{ truncatedPosition}</p>
        </div>

        <div className="navigation-icon-container">
          <div className="navigation-icon">
            <KeyboardArrowRightOutlinedIcon fontSize="inherit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMemberCard;
