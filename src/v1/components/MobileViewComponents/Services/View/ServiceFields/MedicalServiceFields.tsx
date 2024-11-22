import moment from "moment";
import React from "react";
import { displayTiming } from "../../../../../helpers/HelperFunction";

const MedicalServiceFields = ({ formData }) => {
  const handleMedicalDateAvailability = () => {
    switch (formData?.metaData.type) {
      case "daily":
        return "Daily";
      case "weekly":
        return "Weekly (" + formData?.metaData.days.join(", ") + ")";

      case "custom":
        return (
          "Every Month on" +
          formData?.metaData.days?.map((val) => {
            return " " + moment(val, "YYYY/MM/DD").format("Do");
          })
        );
    }
  };

  return (
    <div className="service-drop-item">
      {formData?.healthServices.length > 0 ? (
        <div className="medical-servicetype-box">
          <h5>Health Service In Medical Clinic</h5>
          <div className="pointers-box">
            {formData?.healthServices?.map((val) => (
              <li>{val}</li>
            ))}
          </div>
        </div>
      ) : null}
      {formData?.residentPhysicians?.length > 0 ? (
        <div className="medical-residentphysicians-box">
          <h5>Resident Physicians</h5>
          <div className="pointers-box">
            {formData?.residentPhysicians?.map((val) => (
              <li>{val}</li>
            ))}
          </div>
        </div>
      ) : null}
      {formData?.visitingPhysicians ? (
        <div className="medical-visitingphysicians-box">
          <h5>Visiting Physicians</h5>
          <div className="pointers-box">
            {formData?.visitingPhysicians?.map((val) => (
              <li>{val}</li>
            ))}
            {/* {.map((val) => ( */}
            {/* <li>{formData?.visitingPhysicians}</li> */}
            {/* ))} */}
          </div>
        </div>
      ) : null}
      <div className="service-availability-box">
        <h5>Availability Time</h5>
        <p>
          <div style={{ marginTop: "5px", fontWeight: "500" }}>
            {handleMedicalDateAvailability()}
          </div>

          {/* {formData?.metaData.type} ({formData?.availabilityDayOrDate.join(", ")} 
          )*/}
        </p>
        <p>
          <div style={{ marginTop: "5px", fontWeight: "500" }}>
            {displayTiming(formData.timing)}
          </div>
        </p>
      </div>
    </div>
  );
};

export default MedicalServiceFields;
