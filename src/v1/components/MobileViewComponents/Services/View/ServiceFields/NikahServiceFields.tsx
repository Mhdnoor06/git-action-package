import moment from "moment";
import React from "react";
import { displayTiming } from "../../../../../helpers/HelperFunction";

const NikahServiceFields = ({ formData }: any) => {
  const handleNikahDateAvailability = () => {
    // console.log("formData handleNikahDateAvailability => ", formData);
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

  return (
    <div>
      <div className="service-drop-item">
        {formData?.metaData?.days ? (
          <>
            <h5>Availability </h5>

            <p>
              <div style={{ fontWeight: "500" }}>
                {handleNikahDateAvailability()}
              </div>
            </p>
          </>
        ) : null}
        <p>
          <div style={{ marginTop: "5px", fontWeight: "500" }}>
            {displayTiming(formData?.timing)}
          </div>
        </p>
      </div>
    </div>
  );
};

export default NikahServiceFields;
