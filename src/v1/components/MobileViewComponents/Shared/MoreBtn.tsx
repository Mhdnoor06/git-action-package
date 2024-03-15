import { Button } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
type propsType = {
  tsx: string;
  txLength: number;
  height?: string;
};
const MoreBtn = ({ tsx, txLength, height }: propsType) => {
  const [showFullTx, setShowFullTx] = useState(false);

  const scrollStyole = `
  .profile-des-text{
    height:${height ? height : "70px"};
    overflow-y: scroll;


  }
    .profile-des-text::-webkit-scrollbar {
      width: 4px !important;
    }
    
    .profile-des-text::-webkit-scrollbar-thumb {
      background: #054635; 
      border-radius: 4px;
    }
    .profile-des-text::-webkit-scrollbar-track {
      background: #f1f1f1;
    } 
      
  `;
  return (
    <>
      <style>{scrollStyole}</style>
      <p className={txLength > 200 ? "profile-des-text" : ""}>{tsx}</p>
      {/* {tsx?.length > txLength ? (
        tsx ? (
          <p>
            {showFullTx
              ? tsx
              : tsx?.length > txLength
              ? tsx.substring(0, txLength) + "......"
              : tsx}{" "}
            <span
              onClick={() => setShowFullTx(!showFullTx)}
              style={{
                fontSize: "15px",
                color: "#0077cc",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {showFullTx ? "Less" : "More"}
            </span>
          </p>
        ) : null
      ) : (
        tsx
      )} */}
    </>
  );
};

export default MoreBtn;
