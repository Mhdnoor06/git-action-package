import React, { useEffect, useRef, useState } from "react";
import {
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import Ticket from "../Ticket";
import CustomBtn from "../../CustomBtn";
import scanIcon from "../.././../../../photos/Newuiphotos/Icons/scan.webp";
import BackButton from "../../BackButton";
import TicketDetails from "../TicketDetails/TicketDetails";
import QrScanner from "qr-scanner";
import ScannerModal from "./ScannerModal";
import { createGlobalStyle } from "styled-components";
import TicketScanFailModal from "../TicketScanFailModal";
import moment from "moment";
import {
  dateFormatter,
  dateReverter,
} from "../../../../../helpers/HelperFunction";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_EVENT_TICKETS,
  GET_TICKETS,
} from "../../../../../graphql-api-calls/Events/query";
import { CHECKIN_TICKET } from "../../../../../graphql-api-calls/Events/mutation";
import toast from "react-hot-toast";
import "./TicketManagementTable.css";
const CustomTableCell = styled(TableCell)<{ namecolumn?: string }>(
  ({ theme, namecolumn }) => ({
    padding: "4px",
    textAlign: namecolumn ? "left" : "center",
    fontSize: "0.78rem",
    "&:first-of-type": {
      paddingLeft: "8px",
    },
    "&:last-of-type": {
      paddingRight: "8px",
    },
    [theme.breakpoints.down("sm")]: {
      "&:first-of-type": {
        paddingLeft: "4px",
      },
      "&:last-of-type": {
        paddingRight: "4px",
      },
      fontSize: "0.55rem",
    },
  })
);

const CheckInButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  fontSize: "0.75rem",
  borderRadius: "25px",
  border: "1px solid #2e7d32", // Green border
  color: "#2e7d32", // Green text color
  backgroundColor: "white",
  textTransform: "none", // To keep the text casing as it is
  "&:hover": {
    backgroundColor: "rgba(46, 125, 50, 0.04)", // Light green background on hover
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 1.5),
    fontSize: "0.55rem",
  },
}));

const CancelledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  fontSize: "0.75rem",
  borderRadius: "25px",
  backgroundColor: "#d32f2f", // Red background
  color: "white", // White text color
  textTransform: "none", // To keep the text casing as it is
  "&:hover": {
    backgroundColor: "#b71c1c", // Darker red background on hover
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 1.5),
    fontSize: "0.55rem",
  },
}));
const CheckedInButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  fontSize: "0.75rem",
  borderRadius: "25px",
  backgroundColor: "#1B8368", // Red background
  color: "white", // White text color
  textTransform: "none", // To keep the text casing as it is
  "&:hover": {
    backgroundColor: "#1B8368", // Darker red background on hover
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.5, 1.5),
    fontSize: "0.55rem",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "95%",
  margin: "16px",
  [theme.breakpoints.down("sm")]: {
    margin: "8px ",
    fontSize: "0.8rem",
  },
  "& .MuiOutlinedInput-root": {
    // padding: "4px",
    borderRadius: "8px",
    border: "1px solid #606060", // Border for the text field
    paddingLeft: "5px",
    "& fieldset": {
      borderColor: "transparent", // Remove default border
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  "& .MuiInputAdornment-root": {
    marginRight: "4px",
  },
  "& .MuiInputBase-input": {
    padding: "4px 4px",
    fontSize: "0.8rem",
  },
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F6F6F6",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "white",
  },
}));
const GlobalStyle = createGlobalStyle`
  .ticketContainer .center {
    justify-content: center;
    
  }
`;
interface Ticket {
  name: string;
  email: string;
  phone: string;
  seats: string;
  status: string;
}

const tickets1: Ticket[] = [
  {
    name: "Aasif",
    email: "asifmaxwellkhan@gmail.com",
    phone: "+91 9812890369",
    seats: "1",
    status: "Check In",
  },
  {
    name: "Mustufa",
    email: "mustufa@gmail.com",
    phone: "+91 78763747478",
    seats: "1",
    status: "Check In",
  },
  {
    name: "Bibek",
    email: "bibek@gmail.com",
    phone: "+91 8737383993",
    seats: "0",
    status: "Check In",
  },
  {
    name: "Prabhat",
    email: "prabhat@gmail.com",
    phone: "+91 8326623832",
    seats: "2",
    status: "Check In",
  },
  {
    name: "Riyad",
    email: "riyad@gmail.com",
    phone: "+91 87834674345",
    seats: "1",
    status: "Cancelled",
  },
  {
    name: "Noor. M",
    email: "noor.m@gmail.com",
    phone: "+91 9474747332",
    seats: "4",
    status: "Cancelled",
  },
];

type props = {
  setShowCheckIn: React.Dispatch<React.SetStateAction<boolean>>;
  eventData: any;
  getTimeInTimeZone: any;
  tZone: string;
  consumerId: string;
  admin: any;
};

const TicketManagementTable = ({
  setShowCheckIn,
  consumerId = "event",
  eventData,
  getTimeInTimeZone,
  tZone,
  admin,
}: props) => {
  const { eventName, date, dates, _id, timings, isCancelled, category } =
    eventData;

  const convertedDate = dateReverter(date, tZone);
  const eventDate = moment.tz(convertedDate, "YYYY-MM-DD", tZone);
  const todayDate = moment.tz(tZone);
  const isEventPassed = eventDate.isBefore(todayDate, "day");

  const [tickets, setTickets] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScanFailModalVisible, setIsScanFailModalVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showTicketDetails, setShowTicketDetails] = useState<boolean>(false);

  const videoRef = useRef(null);
  const [selectedTicket, setSelectedTicket] = useState();
  const [totalSeatsBooked, setTotalSeatsBooked] = useState(0);
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isViewingCheckedInUsers, setIsViewingCheckedInUsers] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_TICKETS, {
    variables: { parentId: eventData._id },
    fetchPolicy: "network-only", // or 'no-cache'
    // skip: !loadDonation,
  });

  const [
    updateStatus,
    {
      loading: loadingUpdateStatus,
      error: statusUpdateError,
      data: statusUpdateData,
    },
  ] = useMutation(CHECKIN_TICKET);

  useEffect(() => {
    if (!loading && data) {
      // console.log("data---", data);
      // setTickets(tickets1);
      setTickets(data.tickets);
      const totalSeatsBooked = data.tickets.reduce(
        (acc: number, ticket: any) => {
          if (ticket.status !== "Cancelled") {
            return acc + ticket.seats;
          }
          return acc;
        },
        0
      );
      setTotalSeatsBooked(totalSeatsBooked);
    }
  }, [loading, data]);

  // useEffect(() => {
  //   if (isCheckingIn) {
  //     setIsCheckingIn(false);
  //     let updatedTicketId = selectedTicket._id;

  //     const updatedTicket = tickets.find(
  //       (ticket) => ticket._id === updatedTicketId
  //     );
  //     if (updatedTicket) {
  //       setSelectedTicket(updatedTicket);
  //       setShowTicketDetails(true);
  //       setIsDetailsView(updatedTicket.checkInSeats === updatedTicket.seats);
  //     } else {
  //       toast.error("An Error Occured...");
  //     }
  //   }
  // }, [tickets]);

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.phone.includes(searchTerm)
  );

  // useEffect(() => {
  //   if (videoRef.current) {
  //     qrScannerRef.current = new QrScanner(
  //       videoRef.current,
  //       (result) => {
  //         handleScan(result.data);
  //         // console.log("QR Code detected:", result.data);
  //         // Handle the scanned data (e.g., navigate, store data, etc.)
  //       },
  //       {
  //         onDecodeError: (error) => {
  //           console.error("QR Code decode error:", error);
  //         },
  //         highlightScanRegion: true,
  //         highlightCodeOutline: true,
  //       }
  //     );

  //     qrScannerRef.current.start().catch(console.error);
  //   }

  //   // Clean up on component unmount
  //   return () => {
  //     if (qrScannerRef.current) {
  //       qrScannerRef.current.destroy();
  //       qrScannerRef.current = null;
  //     }
  //   };
  // }, []);
  const handleShowTicket = (ticket) => {
    setIsDetailsView(
      ticket.checkInSeats === ticket.seats || ticket.status === "Cancelled"
    );
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };

  const reloadAndOpenTicketDetails = () => {
    refetch();
    // console.log("reloading");
  };
  const handleCheckInTicket = (noOfSeats: number, bookingId: string) => {
    // console.log(noOfSeats);
    // console.log(bookingId);
    const toastId = toast.loading("Checking In. Please wait...");
    updateStatus({
      variables: { noOfPersons: noOfSeats, bookingId },
    })
      .then((response) => {
        const result = response?.data?.checkIn;
        if (result === "Checked in") {
          toast.dismiss(toastId);
          toast.success("Checked In Successfully");
          reloadAndOpenTicketDetails();
        } else {
          toast.dismiss(toastId);
          toast.error("Something went wrong!");
          console.error("Something went wrong!", result);
        }
      })
      .catch((error) => {
        toast.dismiss(toastId);
        toast.error("Error checking in");
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
        console.error("Error checking In:", error);
      });

    setShowTicketDetails(false);
  };
  const handleOpenScannedTicket = (scannedTicket: any) => {
    // console.log(scannedTicket);
    setSelectedTicket(scannedTicket);
    setIsDetailsView(
      scannedTicket.checkInSeats === scannedTicket.seats ||
        scannedTicket.status === "Cancelled"
    );
    setShowTicketDetails(true);
    // setIsDetailsView()
  };
  const handleToggleViewCheckedInUsers = () => {
    setIsDetailsView((prev) => !prev);
    setIsViewingCheckedInUsers((prev) => !prev);
  };

  const important = (value: any) => {
    return (value + " !important") as any;
  };
  return (
    <Box
      sx={{
        width: isMobile ? "95%" : "60%",
        margin: "10px auto",
        borderRadius: "10px",
      }}
    >
      <GlobalStyle />
      {showTicketDetails ? (
        <TicketDetails
          setShowTicketDetails={setShowTicketDetails}
          selectedTicket={selectedTicket}
          isDetailsView={isDetailsView}
          eventData={eventData}
          handleCheckInTicket={handleCheckInTicket}
          handleToggleViewCheckedInUsers={handleToggleViewCheckedInUsers}
          isViewingCheckedInUsers={isViewingCheckedInUsers}
        />
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <div className="goback">
              <BackButton
                handleBackBtn={() => setShowCheckIn((prev) => !prev)}
              />
            </div>
            <h3 className="page-title" style={{ color: "#3D5347" }}>
              User CheckIn
            </h3>
          </div>
          <Box
            sx={{
              margin: "0 auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className="scan-button-box"
          >
            <CustomBtn
              label="Scan to Check In"
              icon={scanIcon}
              size="30px"
              eventHandler={() => {
                setIsModalVisible(true);
              }}
              isDisabled={tickets.length === 0}
            />
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              minHeight: "450px",
              borderRadius: "10px",
              boxShadow: "1.08px 2.16px 30.24px 0px #00000040",
              margin: "20px 0",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Box
              sx={{
                margin: "0 10px",
                display: "flex",
                justifyContent: "center",
                width: "94%",
              }}
              className="ticketContainer"
            >
              <Ticket
                title={eventData?.eventName}
                time={getTimeInTimeZone(eventData?.timings[0].startTime)}
                date={dateFormatter(
                  dateReverter(eventData?.metaData.startDate, tZone)
                )}
                seats={eventData?.capacity}
                price={eventData?.cost}
                color="#D9D9D9"
                totalSeatsBooked={totalSeatsBooked}
              />
            </Box>
            <CustomTextField
              variant="outlined"
              fullWidth
              placeholder="Search Name/Email/Contact"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {loading ? (
              <div
                style={{
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            ) : tickets.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell namecolumn="true">
                      Name/Email
                    </CustomTableCell>
                    <CustomTableCell>Contact</CustomTableCell>
                    <CustomTableCell>Tickets</CustomTableCell>
                    {admin?.role !== "admin" &&
                    admin?.role !== "musaliadmin" ? (
                      <CustomTableCell>Status</CustomTableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTickets.map((ticket, index) => (
                    <CustomTableRow key={`${ticket.email}-${index}`}>
                      <CustomTableCell
                        namecolumn="true"
                        sx={{
                          // width: "15%",
                          whiteSpace: "nowrap", // truncate long names
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: isMobile ? "115px" : "130px",
                        }}
                      >
                        <Typography
                          sx={{
                            color:
                              ticket.status === "Cancelled"
                                ? "#CF000C"
                                : "black",
                            fontWeight: "bold",
                            fontSize: isMobile ? "0.65rem" : "0.89rem",
                            hiteSpace: "nowrap", // ensure the text doesn’t wrap
                            overflow: "hidden", // hide overflowed text
                            textOverflow: "ellipsis", // show ellipsis for long text
                          }}
                        >
                          {ticket.name}
                        </Typography>
                        <Typography
                          sx={{
                            color:
                              ticket.status === "Cancelled"
                                ? "#CF000C"
                                : "black",
                            fontSize: isMobile ? "0.61rem" : "0.85rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {ticket.email}
                        </Typography>
                      </CustomTableCell>
                      <CustomTableCell
                        sx={{
                          // width: "20%", // fixed width
                          color:
                            ticket.status === "Cancelled" ? "#CF000C" : "black",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {ticket?.phone ? ticket?.phone : "--"}
                      </CustomTableCell>
                      <CustomTableCell
                        sx={{
                          color:
                            ticket.status === "Cancelled" ? "#CF000C" : "black",
                          // width: "15%"
                        }}
                      >
                        {ticket?.checkInSeats ?? 0}/{ticket?.seats ?? 0}
                      </CustomTableCell>
                      {admin?.role !== "admin" &&
                      admin?.role !== "musaliadmin" ? (
                        <CustomTableCell
                          sx={
                            {
                              //  width: "15%"
                            }
                          }
                        >
                          {ticket.status === "SUCCESS" ||
                          ticket.status === "NotCheckedIn" ||
                          (ticket.status === "CheckedIn" &&
                            ticket.checkInSeats < ticket.seats) ? (
                            <CheckInButton
                              sx={{
                                minWidth: isMobile ? "70px" : "94px",
                              }}
                              variant="outlined"
                              onClick={() => {
                                handleShowTicket(ticket);
                              }}
                            >
                              Check In
                            </CheckInButton>
                          ) : ticket.status === "Cancelled" ? (
                            <CancelledButton
                              variant="contained"
                              sx={{ minWidth: isMobile ? "70px" : "94px" }}
                              onClick={() => {
                                handleShowTicket(ticket);
                              }}
                            >
                              Cancelled
                            </CancelledButton>
                          ) : ticket.status === "CheckedIn" ? (
                            <CheckedInButton
                              variant="contained"
                              sx={{ minWidth: isMobile ? "70px" : "94px" }}
                              onClick={() => {
                                handleShowTicket(ticket);
                              }}
                            >
                              Checked In
                            </CheckedInButton>
                          ) : null}
                        </CustomTableCell>
                      ) : null}
                    </CustomTableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                height={"200px"}
              >
                No Registered user yet
              </Box>
            )}
          </TableContainer>
          {isModalVisible ? (
            <ScannerModal
              videoRef={videoRef}
              handleModalClose={() => {
                setIsModalVisible(false);
              }}
              setShowTicketDetails={setShowTicketDetails}
              setIsScanFailModalVisible={setIsScanFailModalVisible}
              open={isModalVisible}
              tickets={tickets}
              handleOpenScannedTicket={handleOpenScannedTicket}
            />
          ) : null}
          <TicketScanFailModal
            open={isScanFailModalVisible}
            setOpen={setIsScanFailModalVisible}
            texts={{
              main: "The QR Code is not recognized",
              sub: "Invalid Qr Code",
            }}
            handleClose={() => {}}
          />
        </>
      )}
    </Box>
  );
};

export default TicketManagementTable;
