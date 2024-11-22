// TicketComponent.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import successTick from "../../../../../photos/Newuiphotos/Icons/successTick.svg";
import incrementIcon from "../../../../../photos/Newuiphotos/Icons/increment.svg";
import decrementIcon from "../../../../../photos/Newuiphotos/Icons/decrement.svg";
import notcheckedinIcon from "../../../../../photos/Newuiphotos/events/ticket/notcheckedinIcon.webp";
import successTick from "../../../../../photos/Newuiphotos/events/ticket/CheckedInSuccess.webp";
import cancelledIcon from "../../../../../photos/Newuiphotos/events/ticket/cancelledIcon.webp";
import "./TicketDetails.css";
import BackButton from "../../BackButton";
import moment from "moment";
import { Button } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Styled component for the body background
const StyledBody = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  font-size: 13px;
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const TicketHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
`;

const TicketStatus = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;

  .icon {
    .successIcon {
      width: 50px;
      margin-bottom: 10px;
    }
    .failedIcon {
      width: 70px;
      margin-bottom: 10px;
    }
    .cancelledIcon {
      width: 63px;
    }
  }
`;

const TicketContent = styled.div`
  font-size: 14px;
  color: #555;
`;

const TicketDetail = styled.div`
  margin: 10px 0;

  .label {
    font-weight: bold;
  }
`;

const MainContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const LeftContainer = styled.div`
  flex: 0 0 40%;
`;

const CenterContent = styled.div<{ isCancelled: boolean }>`
  ${({ isCancelled }) =>
    isCancelled
      ? `background-color: #FFC3C6;; color: #D20006;`
      : `background-color: #ccffe6;`}

  border-radius: 20px;
  padding: 5px 10px;
  z-index: 1;
`;

const DottedLine = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  border-bottom: 2px dotted #555;
  z-index: 0;
`;

const RightContainer = styled.div`
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 15px;

  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0 10px;
    cursor: pointer;

    img {
      width: 24px; /* Adjust size as needed */
      height: 24px;
    }
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

const CheckInButton = styled.button`
  font-weight: 500;
  background-color: #1d785a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  // margin-top: 20px;
`;

const DetailWrapper = styled.div`
  text-align: left;

  .label {
    display: block;
    margin-bottom: 5px;
  }

  .value {
    font-weight: bold;
    margin-bottom: 15px;
  }
`;
const Ticket = styled.span<{ isDetailsView: boolean }>`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
  position: relative;
  width: 270px;
  padding: 1em;
  color: black;
  font-size: 16px;
  background-size: 51% 100%;
  background-repeat: no-repeat;
  ${({ isDetailsView }) =>
    isDetailsView
      ? `
      background-image: radial-gradient(circle at 0 50%, rgba(255, 250, 205, 0) 1em, white 0.5em),
      radial-gradient(circle at 100% 50%, rgba(255, 250, 205, 0) 1em, white 0.5em);
      height: 408px; /* Adjust the height as needed */
    `
      : `
      background-image: radial-gradient(circle at 0 45%, rgba(255, 250, 205, 0) 1em, white 0.5em),
      radial-gradient(circle at 100% 45%, rgba(255, 250, 205, 0) 1em, white 0.5em);
      height: 460px; /* Adjust the height as needed */
    `}
  background-position: top left, top right;
  border-radius: 10px;
  margin-top: 15px;
`;

const CenterContainer = styled.div<{ isDetailsView: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${({ isDetailsView }) => (isDetailsView ? `flex: 0 0 20%;` : `flex: 0 0 9%;`)}
`;

// Component that puts everything together
const TicketDetails = ({
  setShowTicketDetails,
  selectedTicket,
  isDetailsView,
  eventData,
  handleCheckInTicket,
  handleToggleViewCheckedInUsers,
  isViewingCheckedInUsers,
}: any) => {
  // Styled component for the ticket
  //   const Ticket = styled.span`
  //     display: flex;
  //     flex-direction: column;
  //     box-sizing: content-box;
  //     filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
  //     position: relative;
  //     width: 270px;
  //     padding: 1em;
  //     color: black;
  //     font-size: 16px;
  //     background-size: 51% 100%;
  //     background-repeat: no-repeat;
  //     ${isDetailsView
  //       ? `background-image: radial-gradient(
  //         circle at 0 50%,
  //         rgba(255, 250, 205, 0) 1em,
  //         white 0.5em
  //       ),
  //       radial-gradient(
  //         circle at 100% 50%,
  //         rgba(255, 250, 205, 0) 1em,
  //         white 0.5em
  //       );
  //       height: 408px; /* Adjust the height as needed */
  // `
  //       : `background-image: radial-gradient(
  //         circle at 0 45%,
  //         rgba(255, 250, 205, 0) 1em,
  //         white 0.5em
  //       ),
  //       radial-gradient(
  //         circle at 100% 45%,
  //         rgba(255, 250, 205, 0) 1em,
  //         white 0.5em
  //       );
  //       height: 460px; /* Adjust the height as needed */
  // `}

  //     background-position: top left, top right;
  //     border-radius: 10px;
  //     margin-top: 15px;
  //   `;

  //   const CenterContainer = styled.div`
  //     ${isDetailsView ? `flex: 0 0 20%;` : `flex: 0 0 9%;`}

  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     position: relative;
  //   `;

  const [ticketCount, setTicketCount] = useState(0);
  const [ticketsBooked, setTicketsBooked] = useState(
    // selectedTicket.seats
    // 3
    0
  );
  const [ticketsCheckedIn, setTicketsCheckedIn] = useState(
    // selectedTicket.bookedSeats
    // 1
    0
  );

  useEffect(() => {
    setTicketCount(1);
    setTicketsBooked(selectedTicket.seats);
    setTicketsCheckedIn(selectedTicket.checkInSeats);
  }, [selectedTicket]);

  const incrementCount = () => {
    if (ticketCount < ticketsBooked - ticketsCheckedIn) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrementCount = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };
  const convertDateTime = (dateString: string) => {
    const formattedDateTime = moment
      .utc(dateString)
      .tz("America/Chicago")
      .format("DD MMMM YYYY, hh:mm A");
    return formattedDateTime;
  };

  return (
    <StyledBody>
      <div style={{ width: "100%" }}>
        <div className="goback">
          <BackButton
            handleBackBtn={() => {
              isViewingCheckedInUsers
                ? handleToggleViewCheckedInUsers()
                : setShowTicketDetails(false);
            }}
          />
        </div>
        <h3 className="page-title">Ticket Details</h3>
      </div>
      <Ticket isDetailsView={isDetailsView}>
        <MainContainer className="main_container">
          <LeftContainer>
            <TicketHeader>
              <div>Registration Fees</div>
              <div style={{ color: "#1D785A" }}>
                {eventData.cost === 0 ? "Free" : `$${eventData.cost}`}
              </div>
            </TicketHeader>
            <TicketStatus>
              <div className="icon">
                <img
                  src={
                    isDetailsView && selectedTicket.status === "CheckedIn"
                      ? successTick
                      : isDetailsView && selectedTicket.status === "Cancelled"
                      ? cancelledIcon
                      : notcheckedinIcon
                  }
                  className={
                    isDetailsView && selectedTicket.status === "CheckedIn"
                      ? "successIcon"
                      : isDetailsView && selectedTicket.status === "Cancelled"
                      ? "cancelledIcon"
                      : "failedIcon"
                  }
                  alt={"Status Icon"}
                />

                {isDetailsView && selectedTicket.status === "CheckedIn" ? (
                  <div>Checked In</div>
                ) : isDetailsView && selectedTicket.status === "Cancelled" ? (
                  <div style={{ color: "#E21F27" }}>Cancelled</div>
                ) : (
                  <div style={{ color: "#A3A3A3" }}>
                    {ticketsCheckedIn === 0
                      ? "Not Checked In"
                      : "Partially Checked In"}
                  </div>
                )}
              </div>
            </TicketStatus>
            {isDetailsView && (
              <TicketContent>
                <TicketDetail>
                  <span className="label">
                    Date & Time : {convertDateTime(selectedTicket.lastUpdated)}
                  </span>
                </TicketDetail>
              </TicketContent>
            )}
          </LeftContainer>
          <CenterContainer isDetailsView={isDetailsView}>
            <DottedLine />
            <CenterContent isCancelled={selectedTicket.status === "Cancelled"}>
              <span
                className="label"
                style={{
                  fontWeight: "bold",
                  textDecoration:
                    selectedTicket.status === "Cancelled"
                      ? "line-through"
                      : "none",
                }}
              >
                Ticket: {ticketsCheckedIn} of {ticketsBooked}
              </span>
            </CenterContent>
          </CenterContainer>
          <RightContainer>
            <TicketContent>
              {!isDetailsView && (
                <CounterContainer>
                  <b>No of Tickets</b>
                  <button onClick={decrementCount}>
                    <RemoveCircleIcon
                      sx={{
                        fontSize: "1.7rem",
                        color: ticketCount === 1 ? "#606060" : "#145B48",
                      }}
                    />
                    {/* <img src={decrementIcon} alt="Decrement" /> */}
                  </button>
                  <span>{ticketCount.toString().padStart(2, "0")}</span>
                  <button
                    onClick={incrementCount}
                    // disabled={ticketCount === ticketsBooked - ticketsCheckedIn}
                  >
                    <AddCircleIcon
                      sx={{
                        fontSize: "1.7rem",
                        color:
                          ticketCount === ticketsBooked - ticketsCheckedIn
                            ? "#606060"
                            : "#145B48",
                      }}
                    />

                    {/* <img src={incrementIcon} alt="Increment" /> */}
                  </button>
                </CounterContainer>
              )}

              <DetailWrapper>
                <div className="label">Name:</div>
                <div className="value" style={{ fontSize: "18px" }}>
                  {selectedTicket.name}
                </div>
                <div className="label">Email:</div>
                <div className="value">{selectedTicket.email}</div>
              </DetailWrapper>
            </TicketContent>
            {!isDetailsView && (
              <CheckInButton
                onClick={() =>
                  handleCheckInTicket(ticketCount, selectedTicket.bookingId)
                }
              >
                Check In
              </CheckInButton>
            )}
            {!isDetailsView &&
              ticketsCheckedIn != 0 &&
              ticketsCheckedIn < ticketsBooked && (
                <Button
                  sx={{
                    color: "#145B48",
                    textTransform: "none",
                    textDecoration: "underline",
                  }}
                  variant="text"
                  onClick={handleToggleViewCheckedInUsers}
                >
                  View Checked In Users
                </Button>
              )}
          </RightContainer>
        </MainContainer>
      </Ticket>
    </StyledBody>
  );
};

export default TicketDetails;
