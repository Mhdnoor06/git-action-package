import React from "react";

import backbtn from "../../../photos/backbtn.png";
const BackButton = ({ handleBackBtn }: any) => {
  const backBtn = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "10px",
  };

  return (
    <div>
      <div
        data-testid="backBtn"
        className="backBtn"
        style={backBtn}
        onClick={() => {
          handleBackBtn("/feed/0");
        }}
      >
        <img src={backbtn} style={{ width: "40%" }} alt="back btn" />
      </div>
    </div>
  );
};

export default BackButton;
