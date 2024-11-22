import React from "react";
import { Card } from "@mui/material";
import BackButton from "../BackButton";

import "../../Services/services.css";
import "./PreviewPageContainer.css";
interface PageContainerProps {
  handleBackBtn: () => void;
  title: string;
  children: React.ReactNode;
  isPreviewMode?: boolean;
}

const PreviewPageContainer: React.FC<PageContainerProps> = ({
  handleBackBtn,
  title,
  children,
}) => {
  return (
    <div className="PreviewPageContainer">
      <div style={{ width: "100%" }}>
        <div className="goback">
          <BackButton handleBackBtn={handleBackBtn} />
        </div>
        <h3 className="page-title">{title}</h3>
      </div>
      <div className="PreviewPageMainContainer">
        <Card
          style={{
            borderRadius: "16px",
            margin: "auto 10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="service-details-body">{children}</div>
        </Card>
      </div>
    </div>
  );
};

export default PreviewPageContainer;
