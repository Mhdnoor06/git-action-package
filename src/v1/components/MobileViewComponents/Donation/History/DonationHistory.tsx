import React, { useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Icon,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import Ticket from "../../Shared/TicketModel/Ticket";
import CustomBtn from "../../Shared/CustomBtn";
import scanIcon from "../../../../photos/Newuiphotos/Icons/scan.webp";
import donorIcon from "../../../../photos/Newuiphotos/Donations/donorIcon.webp";
import BackButton from "../../Shared/BackButton";
import donationIcon from "../../../../photos/Newuiphotos/Donations/donationdarkgreen.webp";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import "./DonationHistory.css";
import CustomDropdown from "./CustomDropdown";
import DonationInvoice from "./Invoice/DonationInvoice";

const CustomTableCell = styled(TableCell)<{
  namecolumn?: string;
  isHeader?: string;
}>(({ theme, namecolumn, isHeader }) => ({
  padding: isHeader ? "0px" : "4px",
  textAlign: namecolumn ? "left" : "center",
  fontWeight: isHeader ? "bolder !important" : "500 !important", // Set bold for header cells
  fontFamily: "Lato !important",
  "&:first-of-type": {
    paddingLeft: "8px",
  },
  "&:last-of-type": {
    paddingRight: "8px",
  },
  fontSize: isHeader ? "0.8rem" : "0.875rem",
  [theme.breakpoints.down("sm")]: {
    "&:first-of-type": {
      paddingLeft: "4px",
    },
    "&:last-of-type": {
      paddingRight: "4px",
    },
    fontSize: "0.59rem",
    fontWeight: isHeader ? "bolder !important" : "600 !important", // Set bold for header cells
  },
}));

const CancelledButton = styled(Button)(({ theme }) => ({
  fontSize: "0.75rem",
  borderRadius: "25px",
  backgroundColor: "#1B8368", // Red background
  color: "white", // White text color
  textTransform: "none", // To keep the text casing as it is
  padding: theme.spacing(0.5, 2.5),

  "&:hover": {
    backgroundColor: "#1B8368", // same color background on hover
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0.3, 1.2),
    fontSize: "0.55rem",
    minWidth: "58px",
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
    padding: "4px",
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

interface Donation {
  name: string;
  email: string;
  date: string;
  time: string;
  amount: string;
  amountType: string;
  status: string;
  contactNumber?: string;
  donationFor?: string;
  message?: string;
  invoiceId?: string;
  paymentGatewayFee?: string;
  platformFee?: string;
}

const tickets: Donation[] = [
  {
    name: "Aasif",
    email: "asifmaxwellkhan@gmail.com",
    date: "12 Jun 2024",
    time: "09:00 PM",
    amount: "$ 18.00",
    amountType: "One Time",
    status: "Check In",
    contactNumber: "888888888888",
    donationFor: "Purpose of Donation",
    message: "wndjbqdygwdswdwdwd",
    invoiceId: "BYFYGE7482EB2EV",
    paymentGatewayFee: "$2.00",
    platformFee: "$2.00",
  },
  {
    name: "Mustufa",
    email: "mustufa@gmail.com",
    date: "29 July 2024",
    time: "09:00 PM",
    amount: "$ 18.00",
    amountType: "One Time",
    status: "Check In",
  },
  {
    name: "Bibek",
    email: "bibek@gmail.com",
    date: "02 Aug 2024",
    time: "09:00 PM",
    amount: "$ 18.00",
    amountType: "One Time",
    status: "Check In",
  },
  {
    name: "Prabhat",
    email: "prabhat@gmail.com",
    date: "12 July 2024",
    time: "09:00 PM",
    amount: "$ 18.00",
    amountType: "One Time",
    status: "Check In",
  },
  {
    name: "Riyad",
    email: "riyad@gmail.com",
    date: "12 July 2023",
    time: "09:00 PM",
    amount: "$ 18.00",
    amountType: "One Time",
    status: "Cancelled",
  },
  {
    name: "Noor. M",
    email: "noor.m@gmail.com",
    date: "3 Aug 2023",
    time: "09:00 PM",
    amount: "$ 18.00",
    amountType: "One Time",
    status: "Cancelled",
  },
  {
    name: "Mirza Akeel",
    email: "mirzaakeel@gmail.com",
    date: "15 July 2023",
    time: "02:00 AM",
    amount: "$ 10.00",
    amountType: "One Time",
    status: "Cancelled",
  },
];

type props = {
  handleToggleDonations: (val: any) => void;
  id: string;
};

const DonationHistory = ({ handleToggleDonations, id }: props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width:768px)");
  const [period, setPeriod] = useState("Past 30 Days");
  const [showDonorInvoice, setShowDonorInvoice] = useState(false);
  const handleChange = (event: any) => {
    setPeriod(event.target.value);
  };

  const now = new Date();
  const filteredByPeriod = tickets.filter((ticket) => {
    const ticketDate = new Date(ticket.date);

    if (period === "Today") {
      return (
        ticketDate.getDate() === now.getDate() &&
        ticketDate.getMonth() === now.getMonth() &&
        ticketDate.getFullYear() === now.getFullYear()
      );
    } else if (period === "This Week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());
      return ticketDate >= startOfWeek && ticketDate <= now;
    } else if (period === "Past 30 Days") {
      const past30Days = new Date();
      past30Days.setDate(now.getDate() - 30);
      return ticketDate >= past30Days && ticketDate <= now;
    } else if (period === "This Year") {
      const pastYear = new Date();
      pastYear.setFullYear(now.getFullYear() - 1);
      return ticketDate >= pastYear && ticketDate <= now;
    }
    return true;
  });

  const filteredTickets = filteredByPeriod.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.date.includes(searchTerm) ||
      ticket.time.includes(searchTerm)
  );
  const handleToggleShowDetails = () => {
    setShowDonorInvoice(!showDonorInvoice);
  };
  return (
    <Box
      sx={{
        fontFamily: "Lato !important",
        width: "95%",
        margin: "10px auto",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="donationinvoicemain"
    >
      {showDonorInvoice ? (
        <DonationInvoice handleToggleShowDetails={handleToggleShowDetails} />
      ) : (
        <>
          <div className="donationTopbar">
            <div className="topbarflex">
              <div className="goback">
                <BackButton handleBackBtn={handleToggleDonations} />
              </div>
              <h3 className="page-title">Zakat Donation</h3>
            </div>
            <h5>Start from 10 July 2024 | 06:00 AM</h5>
          </div>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "10px",
              boxShadow: "1.08px 2.16px 30.24px 0px #00000040",
              margin: "20px 0",
              padding: "20px 0",
            }}
          >
            <CustomTextField
              variant="outlined"
              fullWidth
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: "22px" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ padding: "4px" }}
            />
            <div className="totalDonations">
              <div className="totalDonationItem">
                <img
                  src={donorIcon}
                  style={{ width: isMobile ? "14px" : "18px" }}
                />
                <h5>Total Donor</h5>
                <h4>35</h4>
              </div>
              <div className="totalDonationItem">
                <img
                  src={donationIcon}
                  style={{ width: isMobile ? "18px" : "22px" }}
                />
                <h5>Received Fund</h5>
                <h4>$3000.00</h4>
              </div>
              <div className="totalDonationItem">
                <CustomDropdown
                  isMobile={isMobile}
                  period={period}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <CustomTableCell namecolumn="true" isHeader="true">
                    Name/Email{" "}
                    <Button className="buttonMinWidth">
                      <SyncAltIcon
                        className="syncAltIcon"
                        sx={{
                          fontSize: isMobile ? "9px" : "13px",
                        }}
                      />
                    </Button>
                  </CustomTableCell>
                  <CustomTableCell namecolumn="true" isHeader="true">
                    Date/Time{" "}
                    <Button className="buttonMinWidth">
                      <SyncAltIcon
                        className="syncAltIcon"
                        sx={{
                          fontSize: isMobile ? "9px" : "13px",
                        }}
                      />
                    </Button>
                  </CustomTableCell>
                  <CustomTableCell namecolumn="true" isHeader="true">
                    Amount{" "}
                    <Button className="buttonMinWidth">
                      <SyncAltIcon
                        className="syncAltIcon"
                        sx={{
                          fontSize: isMobile ? "9px" : "13px",
                        }}
                      />
                    </Button>
                  </CustomTableCell>
                  <CustomTableCell isHeader="true">
                    Action{" "}
                    {/* <SyncAltIcon
                  sx={{ transform: "rotate(90deg)", fontSize: "11px" }}
                /> */}
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ maxHeight: 300 }}>
                {filteredTickets.map((ticket) => (
                  <CustomTableRow key={ticket.email}>
                    <CustomTableCell namecolumn="true">
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: isMobile ? "9.2px" : "12px",
                          fontFamily: "Lato",
                        }}
                      >
                        {ticket.name}
                      </Typography>
                      <Typography
                        style={
                          isMobile
                            ? {
                                maxWidth: "115px",
                                overflowX: "hidden",
                                textOverflow: "ellipsis",
                              }
                            : {}
                        }
                        sx={{
                          fontSize: isMobile ? "9.1px" : "12px",
                          fontWeight: isMobile ? "600" : "500",
                          fontFamily: "Lato",
                        }}
                      >
                        {ticket.email}
                      </Typography>
                    </CustomTableCell>
                    <CustomTableCell
                      namecolumn="true"
                      style={{ fontSize: isMobile ? "9.1px" : "11px" }}
                    >
                      {ticket.date} <br />
                      {ticket.time}
                    </CustomTableCell>
                    <CustomTableCell
                      namecolumn="true"
                      style={{ fontSize: isMobile ? "9.1px" : "11px" }}
                    >
                      {ticket.amount} <br />
                      {ticket.amountType}
                    </CustomTableCell>
                    <CustomTableCell>
                      <CancelledButton
                        variant="contained"
                        onClick={handleToggleShowDetails}
                      >
                        Details
                      </CancelledButton>
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default DonationHistory;
