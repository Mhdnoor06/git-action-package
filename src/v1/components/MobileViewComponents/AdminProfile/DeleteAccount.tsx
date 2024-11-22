import React from "react";
import "./DeleteAccount.css";
import { resources } from "../../../resources/resources";
import LogoMain from "../../../photos/LogoMain.png";
import accountDeletedMsg from "../../../photos/Newuiphotos/Profile/AccountDeletedMsg.svg";
import CloseIcon from "@mui/icons-material/Close";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../MyProvider";

function DeleteAccount() {
  const navigation = useNavigationprop();
  const language = resources["en"];

  const handleClose = () => {
    if (navigation) navigation("/login");
    else customNavigatorTo("/login");
  };

  return (
    <>
      <div className="container">
        <div className="topContainerMob">
          <div className="logoHeadContainerMob">
            <img src={LogoMain} alt="mymasjidicon" className="fpLogoMainIcon" />
          </div>
          <div className="logoBottomContainerMob">
            <span className="SiteName">
              {" "}
              {language.BANER.INPUT_PLACEHOLDER_FIRST_NAME}{" "}
            </span>
            <span className="SiteNameEnd">
              {language.BANER.INPUT_PLACEHOLDER_SECOND_NAME}{" "}
            </span>
          </div>
        </div>
        <div className="deleteMsg">
          <div className="close" onClick={handleClose}>
            <CloseIcon sx={{ width: "25px" }} />
          </div>
          <div className="deleteMsgbox">
            <img src={accountDeletedMsg} alt="" />
            <h4>Please Check Your Email</h4>
            <p>confirm to delete your account permanently.</p>
            <div className="mail">
              {/* <div className="gmail">
                <img src={gmail} alt="" />
                <b>Close</b>
              </div> */}
              <p style={{ textDecoration: "underline" }} onClick={handleClose}>
                Close
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteAccount;
