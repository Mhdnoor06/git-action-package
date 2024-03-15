import React from "react";

import backbtn from "../../../photos/backbtn.png";
const BackButton = ({ handleBackBtn }: { handleBackBtn: () => void }) => {
  const backBtn = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: "10px",
  };

  return (
    <div>
      <div
        className="backBtn"
        style={backBtn}
        onClick={() => {
          handleBackBtn();
        }}
      >
        <img src={backbtn} style={{ width: "40%" }} alt="back btn" />
      </div>
    </div>
  );
};

export default BackButton;
