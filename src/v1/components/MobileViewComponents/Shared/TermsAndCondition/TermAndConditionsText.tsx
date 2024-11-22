import React from "react";

const TermsAndConditionsText = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "17px",
      fontWeight: "bold",
      margin: "0px",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginTop: "20px",
      marginBottom: "10px",
    },
    subsectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      marginTop: "10px",
    },
    text: {
      fontSize: "14px",
      lineHeight: "1.4",
      textAlign: "justify",
    },
    contact: {
      marginTop: "20px",
      fontWeight: "bold",
    },
  };

  const scrollStyle = `
    .condition-text {
      border-radius: 20px;
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
    .term-condition > div > div {
      border-radius: 30px;
    }     
  `;

  return (
    <>
      <style>{scrollStyle}</style>
      <div style={styles.container}>
        <p style={styles.title}>
          Privacy Policy and Terms of Use for Connect Mazjid Portal
        </p>
        <p style={styles.text}>
          At Connect Mazjid, we prioritize your privacy and are fully dedicated
          to safeguarding your personal information. This document outlines our
          Privacy Policy and Terms of Use, detailing the information collection
          process, its usage, the measures taken to ensure its security, and the
          guidelines for content uploaded to the portal.
        </p>
        <p style={styles.sectionTitle}>Privacy Policy</p>
        <p style={styles.subsectionTitle}>Information We Collect</p>
        <p style={styles.text}>
          When using the Connect Mazjid portal, rest assured that we do not
          gather any personal information. However, to enhance your user
          experience, we may collect data related to your portal usage.
        </p>
        <p style={styles.subsectionTitle}>Use of Information</p>
        <p style={styles.text}>
          The collected data is exclusively utilized to improve your portal
          experience. It's important to note that we do not sell or share any
          user information with third parties. To optimize portal performance,
          we may, on an optional basis, share limited user data with third-party
          services. Users retain the flexibility to disable this feature. Refer
          to the portal for details on third-party services.
        </p>
        <p style={styles.subsectionTitle}>User-Generated Content</p>
        <p style={styles.text}>
          Authorized users on the Connect Mazjid portal may upload content
          related to Mazjid or events. Any required permissions are solely for
          uploading this content and do not apply universally. Connect Mazjid
          has no intention of using user-provided media for purposes other than
          intended on the portal, ensuring user privacy and security.
        </p>
        <p style={styles.subsectionTitle}>Data Security</p>
        <p style={styles.text}>
          Protecting your data is paramount. We have implemented technical and
          organizational measures to prevent unauthorized access or misuse.
        </p>
        <p style={styles.subsectionTitle}>Third-Party Links</p>
        <p style={styles.text}>
          The Connect Mazjid portal may include links to third-party websites.
          We are not responsible for the content or privacy practices of these
          sites. Review the privacy policies of these websites before sharing
          personal information.
        </p>
        <p style={styles.subsectionTitle}>Changes to Our Privacy Policy</p>
        <p style={styles.text}>
          Connect Mazjid reserves the right to update this Privacy Policy. Any
          revisions will be reflected on this page and users are encouraged to
          regularly review for updates.
        </p>
        <p style={styles.sectionTitle}>Terms of Use</p>
        <p style={styles.subsectionTitle}>Content Guidelines</p>
        <p style={styles.subsectionTitle}>Prohibited Content</p>
        <ul>
          <li>
            <p style={styles.text}>
              Users are strictly prohibited from uploading any content that is
              illegal, harmful, threatening, abusive, harassing, defamatory,
              vulgar, obscene, libelous, invasive of another's privacy, hateful,
              or racially, ethnically, or otherwise objectionable.
            </p>
          </li>
          <li>
            <p style={styles.text}>
              Content promoting discrimination based on race, gender, religion,
              nationality, disability, sexual orientation, or age is not
              allowed.
            </p>
          </li>
          <li>
            <p style={styles.text}>
              Unauthorized commercial content, spam, and phishing attempts are
              forbidden.
            </p>
          </li>
        </ul>

        <p style={styles.subsectionTitle}>User Responsibility</p>

        <ul>
          <li>
            <p style={styles.text}>
              Users are responsible for the accuracy, completeness, and legality
              of the content they upload.
            </p>
          </li>
          <li>
            <p style={styles.text}>
              By uploading content, users affirm that they have the necessary
              rights and permissions to share it.
            </p>
          </li>
          <li>
            <p style={styles.text}>
              Connect Mazjid reserves the right to review, flag, and remove
              content that violates these guidelines.
            </p>
          </li>
        </ul>

        <p style={styles.subsectionTitle}>Acceptance of Terms</p>
        <ul>
          <li>
            <p style={styles.text}>
              By accessing and using the Connect Mazjid portal, authorized
              administrators agree to comply with these content guidelines and
              the overall terms and conditions.
            </p>
          </li>
          <li>
            <p style={styles.text}>
              Violations may result in the suspension or termination of user
              accounts and legal action if necessary.
            </p>
          </li>
        </ul>

        <p style={styles.text}>
          Contact Us: For questions or concerns about our Privacy Policy, Terms
          of Use, or data protection practices, contact us at:{" "}
          <strong>info@connectmazjid.com</strong>. Your privacy and security are
          paramount to us.
        </p>
      </div>
    </>
  );
};

export default TermsAndConditionsText;
