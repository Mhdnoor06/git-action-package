import React, { useEffect, useState } from "react";
import BackButton from "../../Shared/BackButton";
import {
  customNavigatorTo,
  useCustomParams,
} from "../../../../helpers/HelperFunction";
import { Card } from "@mui/material";

// import "./ServiceView.css";
import "./serviceUserDetails.css";
import Skeleton from "react-loading-skeleton";
import MoreBtn from "../../Shared/MoreBtn";
import CustomBtn from "../../Shared/CustomBtn";
import { useNavigationprop } from "../../../../../MyProvider";
import { GET_USERS_FOR_SERVICE } from "../../../../graphql-api-calls/query";
import { useQuery } from "@apollo/client";
import moment from "moment";

const ServiceUserDetails = ({ user, setUser, formData }: any) => {
  const handleBackDetails = () => {
    setUser({});
  };
  let attributesObject = user?.attributes.reduce((acc, attribute) => {
    acc[attribute.attributeName] = attribute.attributeValues;
    return acc;
  }, {});
  let qsn;
  if (
    formData.serviceName === "Financial Assistance" ||
    formData.serviceName === "Consultation"
  )
    qsn = JSON.parse(attributesObject.questions);
  // const consultationType = JSON.parse(attributesObject.consultationType);


  const dynamicField = () => {
   
    if (formData.serviceName === "Financial Assistance") {
      return (
        <>
          <div className="service-contact-box">
            <h5>Assistance Type</h5>
            <p>{attributesObject?.assistanceType[0]}</p>
          </div>
          {qsn.map((question: any, index: number) => {
            return (
              <div key={index} className="service-contact-box">
                <h5>{question.question}</h5>
                <p>{question.answer}</p>
              </div>
            );
          })}
        </>
      );
    } else if (formData.serviceName === "Consultation") {
      return (
        <>
          <div className="service-contact-box">
            <h5>Practitioner</h5>
            <p>{attributesObject?.practitioner[0]}</p>
          </div>

          {qsn.map((question: any, index: number) => {
            return (
              <div key={index} className="service-contact-box">
                <h5>{question.question}</h5>
                <p>{question.answer}</p>
              </div>
            );
          })}
        </>
      );
    }
  };
  return (
    <div className="ServicesViewContainer">
      <div style={{ width: "100%" }}>
        <div className="goback">
          <BackButton handleBackBtn={handleBackDetails} />
        </div>
        <h3 className="page-title">
          {formData.serviceName + " Registered Users"}
        </h3>
      </div>
      <div className="ViewMainContainer">
        <Card
          style={{
            borderRadius: "16px",
            margin: "auto 10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="service-details-body">
            <div className="servicedetails">
              <div className="RegistrationFeesDiv">
                <div className="totalDonationItem">
                  <h5 style={{ margin: "10px 0px" }}>Registration Fees</h5>
                </div>

                <div className="totalDonationItem" style={{ color: "#1D785A" }}>
                  <h5 style={{ margin: "10px 0px" }}>
                    {formData?.cost !== 0 ? " $" + formData?.cost : "Free"}
                  </h5>
                </div>
              </div>
              <h3 className="user-details-top-heading">User’s Details</h3>

              <div className="service-email-box">
                <h5>Name </h5>
                <p>{user?.name}</p>
              </div>
              <div className="service-email-box">
                <h5>Email Address </h5>
                <p>{user?.email}</p>
              </div>
              {formData.serviceName !== "Financial Assistance" ? (
                <div className="service-email-box">
                  <h5>Date & Time </h5>
                  <p>
                    {user?.details.time +
                      " (" +
                      moment(user?.details.date).format("DD MMM, YYYY") +
                      ") "}
                  </p>
                </div>
              ) : null}
              <div className="service-contact-box">
                <h5>Contact Number</h5>
                <p>{user?.contact}</p>
              </div>
              {dynamicField()}

              {/* <h3 className="user-details-top-heading">Invoice Details</h3>
              <div className="invoice-container">
                <div>
                  <h3>Service Price</h3>
                  <h3>$100.00</h3>
                </div>
                <div>
                  <h5>Stripe Charges</h5>
                  <h5>2.5%+30c</h5>
                </div>
                <div>
                  <h5>Platform fee</h5>
                  <h5>1%</h5>
                </div>
              </div> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ServiceUserDetails;
