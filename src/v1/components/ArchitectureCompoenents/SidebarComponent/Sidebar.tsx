import React, { useState } from "react";
import "./Sidebar.css";
import myMasjid from "../../../photos/My Mazjid.png";
import Announcements from "../../../photos/Annoucements.png";
import Timings from "../../../photos/Prayer Timing.png";
import Events from "../../../photos/Events.png";
import LogOut from "../../../photos/Log Out.png";
import { Link, useNavigate } from "react-router-dom";
import { authLogout } from "../../../redux/actions/AuthActions/LogoutAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { ResponseType } from "../../../redux/Types";
import { useAppThunkDispatch } from "../../../redux/hooks";



const Sidebar = () => {
  const navigate = useNavigate();
  const [LogOutModelOpen, setLogOutModelOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const dispatch = useAppThunkDispatch();


  const handleLogout = () => {
    const res = dispatch(authLogout())
    window.location.reload();
    setLogOutModelOpen(!LogOutModelOpen)

  };


  return (
    <>
      <div className="SidebarContainer">
        {/* SiderBar Starts */}
        <div className="SidebarItem">
          <Link to="/masjidprofile" style={{ textDecoration: "none" }}>
            <div className="SidebarItemIcon">
              <img src={myMasjid} alt="mymasjidicon" className="SidebarIconsMazjid" />
            </div>
            <span className="SidebarItemName">My Mazjid</span>
          </Link>
        </div>

        <div className="SidebarItem">
          <Link to="/announcements" style={{ textDecoration: "none" }}>
            <div className="SidebarItemIcon">
              <img
                src={Announcements}
                alt="announcementsicon"
                className="SidebarIconsAnnoucments"
              />
            </div>
            <div className="SidebarItemNameBox">
              <span className="SidebarItemName">Announcement</span>
            </div>
          </Link>
        </div>

        <div className="SidebarItem">
          <Link to="/masjidtimings" style={{ textDecoration: "none" }}>
            <div className="SidebarItemIcon">
              <img src={Timings} alt="timingsIcon" className="SidebarIconsTimings" />
            </div>
            <span className="SidebarItemName">Mazjid Timing</span>
          </Link>
        </div>

        <div className="SidebarItem">
          <Link to="/events" style={{ textDecoration: "none" }}>
            <div className="SidebarItemIcon">
              <img src={Events} alt="Events" className="SidebarIconsEvents" />
            </div>
            <span className="SidebarItemName">Mazjid Events</span>
          </Link>
        </div>

        <div className="SidebarItem" onClick={(e) => setLogOutModelOpen(!LogOutModelOpen)}>
          <div className="SidebarItemIcon">
            <img src={LogOut} alt="LogoutIcon" className="SidebarIconsLout" />
          </div>
          <span className="SidebarItemName" >
            Log Out
          </span>
          <Dialog
            open={LogOutModelOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Are you sure you want to Log Out ?`}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleLogout} variant="outlined">
                {" "}
                {IsLoading ? (
                  <CircularProgress size="15px" />
                ) : (
                  <span> Yes </span>
                )}{" "}
              </Button>
              <Button
                onClick={(e) => setLogOutModelOpen(!LogOutModelOpen)}
                variant="outlined"
                disabled={IsLoading}>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
