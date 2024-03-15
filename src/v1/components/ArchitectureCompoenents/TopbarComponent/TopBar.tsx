import React from "react";
import "./TopBar.css";
import { resources } from "../../../resources/resources";
import { Link } from "react-router-dom";
import image from "../../../photos/Profileicon.png";
import { AdminInterFace } from "../../../redux/Types";

const TopBar = () => {
  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

  const language = resources["en"];
  return (
    <div className="TopbarContainer">
      <div className="TopBarContainerRight">
        <div className="TopBarNameContainer">
          <span className="AdminNameContainer">
            {" "}
            Hello {admin && admin.name}!
          </span>
          <div className="AdminViewContainer">
            <Link
              to="/adminprofile"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img src={image} alt="Profile Icon" className="profileTopImage" />
              {/* {language.PROFILE_CARD.VIEW}  */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
