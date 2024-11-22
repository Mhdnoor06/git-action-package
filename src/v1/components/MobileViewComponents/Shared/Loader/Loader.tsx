import { CircularProgress } from "@mui/material";
import React from "react";

const ProgressLoader = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <CircularProgress
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="loader"
        data-testid="circular-progress"
      />
    </div>
  );
};

export default ProgressLoader;
