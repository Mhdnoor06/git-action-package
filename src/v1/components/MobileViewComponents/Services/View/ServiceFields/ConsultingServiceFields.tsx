import moment from "moment";
import React from "react";
import { displayTiming } from "../../../../../helpers/HelperFunction";

const ConsultingServiceFields = ({ formData }) => {
  const handleConsultingDateAvailability = () => {
    switch (formData?.metaData.type) {
      case "daily":
        return "Daily";
      case "weekly":
        return "Weekly (" + formData?.metaData.days.join(", ") + ")";

      case "custom":
        return (
          "Every Month on" +
          formData?.metaData.days.map((val) => {
            return " " + moment(val, "YYYY/MM/DD").format("Do");
          })
        );
    }
  };
  const handleConsultingTimeAvailability = () => {
    return (
      moment(formData?.timing.startTime, "HH:mm").format("hh:mm A") +
      " To " +
      moment(formData?.timing.endTime, "HH:mm").format("hh:mm A")
    );
  };
  return (
    <div className="service-drop-item">
      <div >
        <h5>Available Practitioner's</h5>
        <div className="pointers-box">
          {formData?.consultants?.map((val) => (
            <li>{val}</li>
          ))}
        </div>
      </div>
      <h5>Screening Question For the User </h5>
      {formData?.consultationQuestions?.length > 0 ? (
        <div >
          {formData?.consultationQuestions?.map((val, index) => (
            <div style={{ fontSize: "14px", marginTop: "15px" }} key={index}>
              <h5>
                {" "}
                <span> {index + 1}.</span> {val.question}
              </h5>
              <p style={{ paddingTop: "8px" }}>
                Response Type : {val.responseType}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      <div>
        <h5>Availability Time</h5>
        <p>
          <div style={{ marginTop: "5px", fontWeight: "500" }}>
            {handleConsultingDateAvailability()}
          </div>
        </p>
        <p>
          <div style={{ marginTop: "5px", fontWeight: "500" }}>
            {displayTiming(formData.timing)}
          </div>
        </p>
      </div>
      <div >
        <h5>Consultation</h5>
        {formData?.consultationType === "On Site" ? (
          <p>Consultation On Site ({formData?.sessionTime})</p>
        ) : formData?.consultationType === "On Call" ? (
          <p>Consultation On Call ({formData?.sessionTime})</p>
        ) : (
          <>
            <p>Consultation On Site ({formData?.sessionTime})</p>
            <p>Consultation On Call ({formData?.sessionTime})</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultingServiceFields;
