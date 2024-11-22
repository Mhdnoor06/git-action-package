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
  Typography,
  Box,
} from "@mui/material";

import { styled } from "@mui/system";

import CustomBtn from "../../Shared/CustomBtn";

import BackButton from "../../Shared/BackButton";

import "./RegistrationsTable.css";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import FinancialRegistrationDetails from "../FinancialRegisteredDetails/FinancialRegistrationDetails";
import {
  customNavigatorTo,
  useCustomParams,
} from "../../../../helpers/HelperFunction";
import { GET_USERS_FOR_SERVICE } from "../../../../graphql-api-calls/query";
import { useQuery } from "@apollo/client";
import { useNavigationprop } from "../../../../../MyProvider";
import ServiceUserDetails from "../ServiceUserDetails/ServiceUserDetails";
import moment from "moment";
const CustomTableCell = styled(TableCell)<{
  isLeftAligned?: string;
  isHeader?: string;
}>(({ theme, isLeftAligned, isHeader }) => ({
  padding: isHeader ? "0px" : "4px",
  textAlign: isLeftAligned ? "left" : "center",
  fontWeight: isHeader ? "bolder !important" : "500 !important", // Set bold for header cells
  fontFamily: "Lato !important",
  "&:first-of-type": {
    paddingLeft: "18px !important",
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

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F6F6F6",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "white",
  },
}));

type props = {
  handleToggleRegistrationTable: (val: any) => void;
  id: string;
  formData: any;
};

const RegistrationsTable = ({
  handleToggleRegistrationTable,
  id,
  formData,
}: props) => {
  const navigation = useNavigationprop();
  // console.log("formData=> ", formData);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [isFinancialRegDetailsVisible, setIsFinancialRegDetailsVisible] =
    useState(false);
  const [user, setUser] = useState({});
  const getColumnName = () => {
    if (formData.serviceName == "Financial Assistance") return "Detail";
    else return "Appointment";
  };
  const getColumnValue = (ticket) => {
    return (
      ticket.details.time +
      " (" +
      moment(ticket.details.date).format("DD MMM, YYYY") +
      ") "
    );
  };

  const serviceId = useCustomParams();

  const {
    loading: serviceLoading,
    error: serviceError,
    data: ServiceData,
  } = useQuery(GET_USERS_FOR_SERVICE, {
    variables: { serviceId: id },
  });
  const mockTickets = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "+1-555-123-4567",
      details: {
        time: "10:00 AM",
        date: "2024-11-05T00:00:00Z",
      },
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      contact: "+1-555-987-6543",
      details: {
        time: "2:30 PM",
        date: "2024-11-06T00:00:00Z",
      },
    },
    {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      contact: "+1-555-234-5678",
      details: {
        time: "1:15 PM",
        date: "2024-11-07T00:00:00Z",
      },
    },
  ];
  // console.log("Registration table => ", ServiceData?.getUsersForService);
  const tickets = ServiceData?.getUsersForService;
  const openDetails = (user: any) => {
    setUser(user);
  };
  return (
    <>
      {" "}
      {user?.name ? (
        <ServiceUserDetails user={user} setUser={setUser} formData={formData} />
      ) : (
        <div className="donationinvoicemain">
          {/* {isFinancialRegDetailsVisible ? (
            <FinancialRegistrationDetails
              setIsFinancialRegDetailsVisible={setIsFinancialRegDetailsVisible}
              formData={formData}
            />
          )
          
          : */}

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
            <>
              <div className="donationTopbar">
                <div className="topbarflex">
                  <div className="goback">
                    <BackButton handleBackBtn={handleToggleRegistrationTable} />
                  </div>
                  <h3 className="page-title">
                    {formData.serviceName} Registered Users
                  </h3>
                </div>
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
                {tickets.length > 0 ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow className="service-reg-table-title">
                        <CustomTableCell isLeftAligned="true" isHeader="true">
                          Name/Email
                        </CustomTableCell>
                        <CustomTableCell isLeftAligned="true" isHeader="true">
                          Phone
                        </CustomTableCell>
                        {formData.serviceName !== "Financial Assistance" && (
                          <CustomTableCell isLeftAligned="true" isHeader="true">
                            {getColumnName()}
                          </CustomTableCell>
                        )}
                        <CustomTableCell isLeftAligned="false" isHeader="true">
                          Action
                        </CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tickets.map((ticket: any) => (
                        <CustomTableRow key={ticket.email}>
                          <CustomTableCell isLeftAligned="true">
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color: "#2E382E",
                                fontSize: isMobile ? "9px" : "12px",
                                fontFamily: "Lato",
                              }}
                            >
                              {ticket.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: isMobile ? "9.1px" : "12px",
                                fontWeight: isMobile ? "600" : "500",
                                fontFamily: "Lato",
                                color: "#2E382E",
                              }}
                            >
                              {ticket.email}
                            </Typography>
                          </CustomTableCell>
                          <CustomTableCell
                            isLeftAligned="true"
                            sx={{
                              fontSize: isMobile ? "9.1px" : "11px",
                              color: "#2E382E",
                            }}
                          >
                            {ticket.contact}
                          </CustomTableCell>
                          {formData.serviceName !== "Financial Assistance" && (
                            <CustomTableCell isLeftAligned="false">
                              {getColumnValue(ticket)}
                            </CustomTableCell>
                          )}
                          <CustomTableCell isLeftAligned="false">
                            <CustomBtn
                              eventHandler={() => openDetails(ticket)}
                              size={"10px"}
                              fontSize={"10px"}
                              hightSize={"20px"}
                              showIcon={false}
                              label="Details"
                            />
                          </CustomTableCell>
                        </CustomTableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography
                    sx={{
                      textAlign: "center",
                      padding: "20px",
                      marginTop: "40vh",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#929292",
                    }}
                  >
                    No Registered user yet
                  </Typography>
                )}
              </TableContainer>
            </>
          </Box>
        </div>
      )}
    </>
  );
};

export default RegistrationsTable;
