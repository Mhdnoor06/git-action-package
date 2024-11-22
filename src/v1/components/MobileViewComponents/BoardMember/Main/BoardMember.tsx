import { useState, useEffect } from "react";
import { customNavigatorTo } from "../../../../helpers/HelperFunction";
import BackButton from "../../Shared/BackButton";
import noBoardMember from "../../../../photos/Newuiphotos/BoardMember/noBoardMember.webp";
import addBoardMemberIcon from "../../../../photos/Newuiphotos/BoardMember/Vector (11).webp";
import "./BoardMember.css";
import { useQuery } from "@apollo/client";
import { Get_BoardMember } from "../../../../graphql-api-calls/query";
import { Box, Skeleton, styled } from "@mui/material";
import BoardMemberForm from "../BoardMemberForm/BoardMemberForm";
import BoardMemberCard from "../BoardMemberCard/BoardMemberCard";
import { useNavigationprop } from "../../../../../MyProvider";
type boardMemberProps = { consumerMasjidId: string };
const BoardMember = ({ consumerMasjidId }: boardMemberProps) => {
  const navigation = useNavigationprop();
  const [allMember, setAllMembers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const SkeletonImage = styled(Skeleton)(({ theme }) => ({
    borderRadius: "30px",
  }));

  const SkeletonCard = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "80%",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(2),
  }));
  const { loading, error, data } = useQuery(Get_BoardMember, {
    variables: { masjidId: consumerMasjidId },
  });

  useEffect(() => {
    if (data && data.GetBoardMembers) {
      // Assuming data.services is the array of services you need
      setAllMembers(data.GetBoardMembers);
    }
  }, [data]); // Only update when data changes
  if (loading) {
    return (
      <div className="board-skelition">
        <div style={{ width: "100%" }}>
          <div className="goback">
            <BackButton handleBackBtn={() => {}} />
          </div>
          <h3 className="page-title">Board Members</h3>
        </div>

        {/* Skeleton Loader */}
        <div className="reused-table">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} data-testid="skeleton-card">
              <SkeletonImage variant="circular" width={80} height={80} />
              <Box sx={{ marginLeft: 2, flex: 1 }}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  sx={{ marginTop: 1 }}
                />
              </Box>
              <Skeleton
                variant="rectangular"
                width={24}
                height={24}
                sx={{ borderRadius: "50%", marginLeft: 2 }}
              />
            </SkeletonCard>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  // form
  if (isFormVisible) {
    return (
      <BoardMemberForm
        setIsFormVisible={setIsFormVisible}
        masjidId={consumerMasjidId}
      />
    );
  }
  return (
    <div className="board-member-main-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <div className="goback">
            <BackButton
              handleBackBtn={navigation ? navigation : customNavigatorTo}
            />
          </div>
          <h3 className="page-title">Board Members</h3>
        </div>
        <div className="boardmember-container">
          {allMember.length < 1 ? (
            <div className="no-item-found">
              <img src={noBoardMember} alt="no-member" />
              <p>No Board Member Yet</p>
            </div>
          ) : (
            allMember.map((member) => (
              <BoardMemberCard
                consumerMasjidId={consumerMasjidId}
                boardMember={member}
              />
            ))
          )}
        </div>

        <div
          className="add-item-container"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <button className="AddDonation" data-testid="add-board-member-btn">
            <img src={addBoardMemberIcon} alt="" style={{ height: "27px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardMember;
