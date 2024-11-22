import { useEffect, useState } from "react";
import "../AdminProfile/AdminProfile.css";
import profileIcon from "../../../photos/Newuiphotos/nav bar/png/Vector-2.png";
import changePassIcon from "../../../photos/Newuiphotos/Profile/changepass.svg";
import logoutIcon from "../../../photos/Newuiphotos/Profile/logout.svg";
import deleteAccIcon from "../../../photos/Newuiphotos/Profile/delete.svg";
import roleIcon from "../../../photos/Newuiphotos/Profile/Group 1221.svg";
import Alert from "../../../photos/Newuiphotos/Icons/alert.svg";
import packageJSON from "../../../../../package.json";
import { useAppThunkDispatch } from "../../../redux/hooks";
import { authLogout } from "../../../redux/actions/AuthActions/LogoutAction";
import { fetchAdminDetails } from "../../../redux/actions/AuthActions/fetchAdminDetails";
import { AdminInterFace } from "../../../redux/Types";
import { Button } from "@mui/material";

import { deleteUserAction } from "../../../redux/actions/AuthActions/DeleteUserAction";
import { changePassword } from "../../../redux/actions/AuthActions/ChangePasswordAction";
import { ChangeSnackbar } from "../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import { LoadingButton } from "@mui/lab";
import DeleteConfirmation from "../Shared/DeleteConfirmation/DeleteConfirmation";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import { useNavigationprop } from "../../../../MyProvider";

function AdminProfile() {
  const dispatch = useAppThunkDispatch();
  const navigation = useNavigationprop();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleteInProgress, setDeleteInProgress] = useState(false);
  const [isPasswordChangeInProgress, setPasswordChangeInProgress] =
    useState(false);
  const [isWarningVisible, setWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
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

  const handleDeleteUser = async () => {
    setDeleteInProgress(true);
    const response = await dispatch(deleteUserAction());
    if (response === "success") {
      window.location.reload();
      window.location.href = "/DeleteAccountConfirm";
    }
  };

  const toggleDeleteDialog = () => {
    setDeleteDialogOpen(!isDeleteDialogOpen);
  };

  const handleChangePassword = () => {
    setPasswordChangeInProgress(true);
    const res = dispatch(changePassword());
    res.then((result) => {
      if (result.success) {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: `OTP Sent SuccessFully`,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        if (navigation) navigation("/changePassword");
        else customNavigatorTo("/changePassword");
        setPasswordChangeInProgress(false);
      } else if (!result.success) {
        const snackbarDetails = {
          snackbarOpen: true,
          snackbarType: "error",
          snackbarMessage: `Failed To Reset Password `,
        };
        dispatch(ChangeSnackbar(snackbarDetails));
        setPasswordChangeInProgress(false);
      }
    });
  };
  const handleLogout = () => {
    dispatch(authLogout());
  };
  const warningTexts = {
    main: "Are you sure you want to Delete Your Account Permanently ?",
    sub: "Deleting your account will remove all of your information from our database. This cannot be undone.",
  };
  return (
    <>
      <div className="Mainconatiner">
        <div className="deleteCard">
          <DeleteConfirmation
            isDeleteDialogOpen={isDeleteDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            isDeleteInProgress={isDeleteInProgress}
            warningTexts={warningTexts}
            handleReject={toggleDeleteDialog}
            handleDelete={handleDeleteUser}
          />
        </div>
        <div>
          {isWarningVisible && (
            <DeleteWarningCard
              wariningType={wariningType}
              warining={warningMessage}
              onClose={() => setWarningVisible(false)}
              onConfirm={() => {
                setWarningVisible(false);
                wariningType === "Logout"
                  ? handleLogout()
                  : handleChangePassword();
              }}
              icon={Alert}
            />
          )}
        </div>
        <div className="Topcontainer">
          <div className="goback">
            <BackButton
              handleBackBtn={navigation ? navigation : customNavigatorTo}
            />
          </div>
          <h3 className="page-title">Settings</h3>
        </div>
        <div className="Middlecontainer">
          <span className="role">
            <h4>
              Role :
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
              <p
                style={{
                  color: "grey",
                  fontWeight: "400",
                  textAlign: "center",
                }}
              >
                V{packageJSON.version}
              </p>
            </div>
          </div>
        </div>

        <div className="Btncontainer">
          <LoadingButton
            size="small"
            onClick={(e) => {
              setWarningVisible(true);
              setWarningMessage("Do you want to change your password ?");
              setWarningtype("Change password");
            }}
            loading={isPasswordChangeInProgress}
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
              setWarningVisible(true);
              setWarningMessage("Do you want to Log out ?");
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

          {/* commented for next release 3.7.2 */}
          {/* <Button
            onClick={() => {
              navigation
                ? navigation("/feed/14")
                : customNavigatorTo("/feed/14");
            }}
            sx={{
              textTransform: "none",
            }}
          >
            <img
              src={supportIcon}
              alt=""
              style={{ marginRight: "10px", height: "20px" }}
            />
            Contact & Support
          </Button> */}

          <Button
            onClick={toggleDeleteDialog}
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
