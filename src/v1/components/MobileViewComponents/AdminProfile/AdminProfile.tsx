import React, { useEffect, useState } from "react";
import "../AdminProfile/AdminProfile.css";
import profileIcon from "../../../photos/Newuiphotos/nav bar/png/Vector-2.png";
import changePassIcon from "../../../photos/Newuiphotos/Profile/changepass.svg";
import logoutIcon from "../../../photos/Newuiphotos/Profile/logout.svg";
import deleteAccIcon from "../../../photos/Newuiphotos/Profile/delete.svg";
import roleIcon from "../../../photos/Newuiphotos/Profile/Group 1221.svg";
import Alert from "../../../photos/Newuiphotos/Icons/alert.svg";

import { useAppThunkDispatch } from "../../../redux/hooks";
import { authLogout } from "../../../redux/actions/AuthActions/LogoutAction";
import { fetchAdminDetails } from "../../../redux/actions/AuthActions/fetchAdminDetails";
import { AdminInterFace } from "../../../redux/Types";
import { Button } from "@mui/material";
import DeleteProfileIcon from "../../../photos/Newuiphotos/Profile/material-symbols_account-circle-off.svg";
import { useNavigate } from "react-router";
import { deleteUserAction } from "../../../redux/actions/AuthActions/DeleteUserAction";
import { changePassword } from "../../../redux/actions/AuthActions/ChangePasswordAction";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { LoadingButton } from "@mui/lab";
import DeleteConfirmation from "../Shared/DeleteConfirmation/DeleteConfirmation";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";

function AdminProfile() {
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [isFetching, setisFetching] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [warning, setWarning] = useState("");
  const [wariningType, setWarningtype] = useState("");

  const adminString = localStorage.getItem("admin");
  const admin: AdminInterFace | null = adminString
    ? JSON.parse(adminString)
    : null;

  useEffect(() => {
    if (admin) {
      const AdminDetails = dispatch(fetchAdminDetails());
      AdminDetails.then((result) => {
        console.log(result);
        if (!(result.message === "Success")) {
          localStorage.removeItem("authTokens");
          localStorage.removeItem("admin");
          window.location.reload();
        }
      });
    }
  }, []);

  const DeleteUser = async () => {
    setProgress(true);
    const response = await dispatch(deleteUserAction());
    if (response === "success") {
      window.location.reload();
      window.location.href = "/DeleteAccountConfirm";
    }
  };

  const handleDeleteUserCard = () => {
    setOpen(!open);
    setChecked((prev) => !prev);
  };

  const handleChagePassword = () => {
    setisFetching(true);
    // e.preventDefault();
    const res = dispatch(changePassword());
    res.then((result) => {
      if (result.success) {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `OTP Sent SuccessFully`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        navigate("/changePassword");
        setisFetching(false);
      } else if (!result.success) {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Failed To Reset Password `,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        setisFetching(false);
      }
    });
  };
  const handleLogout = () => {
    dispatch(authLogout());
  };
  const texts = {
    main: "Are you sure you want to Delete Your Account Permanently ?",
    sub: "Deleting your account will remove all of your information from our database. This cannot be undone.",
  };
  return (
    <>
      <div className="Mainconatiner">
        <div className="deleteCard">
          <DeleteConfirmation
            open={open}
            setOpen={setOpen}
            progress={progress}
            texts={texts}
            handleReject={handleDeleteUserCard}
            handleDelete={DeleteUser}
          />
        </div>
        <div>
          {showDeleteWarning && (
            <DeleteWarningCard
              wariningType={wariningType}
              warining={warning}
              onClose={() => setShowDeleteWarning(false)}
              onConfirm={() => {
                setShowDeleteWarning(false);
                wariningType === "Logout"
                  ? handleLogout()
                  : handleChagePassword();
              }}
              icon={Alert}
            />
          )}
        </div>
        <div className="Topcontainer">
          <h3 className="page-title">Admin Profile</h3>
        </div>
        <div className="Middlecontainer">
          <span className="role">
            <h4>
              Role :{" "}
              {admin?.role === "musaliadmin" ? "Musali Admin" : "Masjid Admin"}
              <img
                src={roleIcon}
                alt=""
                style={{ marginLeft: "5px", height: "20px" }}
              />
            </h4>
          </span>
          <div className="Profiledetail">
            {/* <small>Profile Details</small> */}
            <div className="Details">
              <p
                style={{
                  color: "#1D785A",
                  borderTop: "1px solid rgb(235 235 235)",
                }}
              >
                <b>{admin?.name}</b>
              </p>

              <p
                style={{
                  borderTop: "1px solid rgb(235 235 235)",
                  borderBottom: "1px solid rgb(235 235 235)",
                  color: "#9F9E9E",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={profileIcon} alt="" style={{ marginRight: "10px" }} />
                {admin?.email}
              </p>
              <p style={{ color: "grey", fontWeight: "400" }}>
                {/* Profile Created : - - - */}
              </p>
            </div>
          </div>
        </div>
        <div className="Btncontainer">
          <LoadingButton
            size="small"
            onClick={(e) => {
              setShowDeleteWarning(true);
              setWarning("Do you want to change your password ?");
              setWarningtype("Change password");
            }}
            loading={isFetching}
            loadingPosition="end"
            variant="contained"
            sx={{
              textTransform: "none",
            }}
          >
            <img
              src={changePassIcon}
              alt=""
              style={{ marginRight: "10px", height: "20px" }}
            />
            <span>Change password</span>
          </LoadingButton>

          <Button
            onClick={() => {
              setShowDeleteWarning(true);
              setWarning("Do you want to Log out ?");
              setWarningtype("Logout");
            }}
            sx={{
              textTransform: "none",
            }}
          >
            <img
              src={logoutIcon}
              alt=""
              style={{ marginRight: "10px", height: "18px" }}
            />
            Log Out
          </Button>

          <Button
            onClick={handleDeleteUserCard}
            sx={{
              textTransform: "none",
            }}
          >
            <img
              src={deleteAccIcon}
              alt=""
              style={{ marginRight: "10px", height: "20px" }}
            />
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;
