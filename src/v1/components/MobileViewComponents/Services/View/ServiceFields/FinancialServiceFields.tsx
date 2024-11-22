import React from "react";

const FinancialServiceFields = ({ formData }) => {
  // console.log("formData => ", formData);
  return (
    <div className="service-drop-item">
      <div className="medical-residentphysicians-box">
        <h5>What kind of assistance are you Providing ?</h5>
        <div className="pointers-box">
          {formData?.assistanceTypes.map((val) => (
            <li>{val}</li>
          ))}
        </div>
      </div>

      <h5>Screening Question For the User </h5>
      {formData?.questions.length > 0 ? (
        <div className="financial-questions-box">
          {formData?.questions.map((val, index) => (
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
    </div>
  );
};

export default FinancialServiceFields;
