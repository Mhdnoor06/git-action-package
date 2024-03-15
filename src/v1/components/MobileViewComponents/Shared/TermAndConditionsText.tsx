import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CustomBtn from "./CustomBtn";

const TermAndConditionsText = () => {
  const strongStyle = {
    display: "inline-block",
    marginTop: "10px",
  };
  const actionContainer = {
    display: "flex",
    justifyContent: "space-around",
  };

  const scrollStyle = `
  .condition-text{
   
     border-radius :20px
  }
    .condition-text::-webkit-scrollbar {
      width: 4px !important;
 
    }
    
    .condition-text::-webkit-scrollbar-thumb {
      background: #00A860; 
     
    }
    .condition-text::-webkit-scrollbar-track {
      background: #f1f1f1;
      
    } 
    .term-condition>div>div{
      border-radius: 30px;
    }     
  `;

  return (
    <>
      <style>{scrollStyle}</style>
      <p
        style={{
          marginTop: "0px",
          fontSize: "14px",
          lineHeight: "20px",
          textAlign: "justify",
        }}
      >
        <strong style={{ display: "inline-block" }}>
          Privacy Policy for Connect Mazjid Portal:
        </strong>{" "}
        At Connect Mazjid, we prioritize your privacy and are fully dedicated to
        safeguarding your personal information. This Privacy Policy outlines the
        information collection process, its usage, and the measures taken to
        ensure its security.
        <br />
        <strong style={strongStyle}> Information We Collect:</strong> When using
        the Connect Mazjid portal, rest assured that we do not gather any
        personal information. However, to enhance your user experience, we may
        collect data related to your portal usage. <br />
        <strong style={strongStyle}>Use of Information:</strong>
        The collected data is exclusively utilized to improve your portal
        experience. It's important to note that we do not sell or share any user
        information with third parties. <br /> To optimize portal performance,
        we may, on an optional basis, share limited user data with third-party
        services. Users retain the flexibility to disable this feature. Refer to
        the portal for details on third-party services.
        <br />
        <strong style={strongStyle}> User-Generated Content:</strong> Authorized
        users on the Connect Mazjid portal may upload content related to masjids
        or events. Any required permissions are solely for uploading this
        content and do not apply universally. Connect Mazjid has no intention of
        using user-provided media for purposes other than intended on the
        portal, ensuring user privacy and security. <br />
        <strong style={strongStyle}>Data Security:</strong> Protecting your data
        is paramount. We have implemented technical and organizational measures
        to prevent unauthorized access or misuse. <br />
        <strong style={strongStyle}> Third-Party Links:</strong> The Connect
        Mazjid portal may include links to third-party websites. We are not
        responsible for the content or privacy practices of these sites. Review
        the privacy policies of these websites before sharing personal
        information.
        <br />
        <strong style={strongStyle}>Changes to Our Privacy Policy:</strong>
        Connect Mazjid reserves the right to update this Privacy Policy. Any
        revisions will be reflected on this page and users are encouraged to
        regularly review for updates.
        <br />
        <strong style={strongStyle}>Contact Us: </strong> For questions or
        concerns about our Privacy Policy or data protection practices, contact
        us at: mailto: <strong>info@connectmazjid.com.</strong> Your privacy and
        security are paramount to us.
      </p>
    </>
  );
};

export default TermAndConditionsText;
