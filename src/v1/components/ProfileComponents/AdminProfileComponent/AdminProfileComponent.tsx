import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resources } from "../../../resources/resources";
import moment from "moment";
import "./AdminProfileCompoenent.css";
import { MdCancel, MdEdit } from "react-icons/md";
import { Navigate, useNavigate } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CircularProgress } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";

const AdminProfileComponent = () => {
  let admin = useAppSelector((state) => state.admin);
  // const admin = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();
  const language = resources["en"];
  const AdminMasjid = useAppSelector((state) => state.AdminMasjid[0]);
  // const [AdminMasjid, setAdminMasjid] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [EditNameUpdate, setEditNameUpdate] = useState(false);
  let AdminNameref = useRef();
  const [mazjidId, setmazjidId] = useState('');
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    // const Mazjid = JSON.parse(localStorage.getItem("admin"));
    let MazjidId = admin.masjids[0];
    console.log(MazjidId);
    setmazjidId(MazjidId);
  }, [mazjidId]);

  useEffect(() => {
    if(mazjidId){
      
      const response = dispatch(fetchMasjidById(mazjidId));
      response.then((result) => {
      if (!result.timings === null) {
        handleSnackbar(
          true,
          "error",
          `Failed To Fetch :${result.message}`,
          dispatch
          );
        } else {
          console.log(result);
          //  setAdminMasjid(result.data);
        }
      });
    }
  }, [mazjidId]);

  const handleCancelEdit = () => {
    navigate("/feed");
  };

  const handleEditName = () => {
    setEditNameUpdate(!EditNameUpdate);
  };

  const handleUpdateAdmin = () => {
   
  };

  return (
    <div className="AdminProfileCard">
      <div className="AdminProfileCardInformation">
        <Dialog
          open={EditNameUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Enter the Name `}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              inputRef={AdminNameref}
              sx={{ width: "20rem" }}
              label="Edit Name"
              type="text"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateAdmin} variant="outlined">
              {" "}
              {IsLoading ? (
                <CircularProgress size="15px" />
              ) : (
                <span> Yes </span>
              )}{" "}
            </Button>
            <Button
              onClick={(e) => setEditNameUpdate(!EditNameUpdate)}
              variant="outlined"
              disabled={IsLoading}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <div className="AdminNameProfileCardName">
          <div className="AdminProfileItemAdminName">
            <span className="AdminName">{admin && admin.name}</span>
            {/* <span className="AdminName">{admin && admin?.adminName}</span> */}
            <MdEdit className="CancelIconAdminName" onClick={handleEditName} />
          </div>
          <div className="CancelIconButtonAdmin">
            <MdCancel className="CancelIconAdmin" onClick={handleCancelEdit} />
          </div>
        </div>
        <div className="AdminProfileItem">
          <div className="AdminProfileInfoKey">
            <span className="AdminProfileInforKeyWord">
              {language.ADMIN_PROFILE_CARD.ADMIN_EMAIL} :{" "}
            </span>
          </div>
          <div className="AdminProfileInfoValue">
            <span className="AdminProfileInforValueWord">
              {admin && admin.email}
            </span>
          </div>
        </div>
        <div className="AdminProfileItem">
          <div className="AdminProfileInfoKey">
            <span className="AdminProfileInforKeyWord">
              {language.ADMIN_PROFILE_CARD.ADMIN_MASJID} :{" "}
            </span>
          </div>
          <div className="AdminProfileInfoValue">
            <span className="AdminProfileInforValueWord">
              {AdminMasjid && AdminMasjid?.masjidName}
            </span>
          </div>
        </div>
        {/* <div className="AdminProfileItem">
          <div className="AdminProfileInfoKey">
            <span className="AdminProfileInforKeyWord">
              {language.ADMIN_PROFILE_CARD.AUTO_PREFILLING_TIMES} :{" "}
            </span>
          </div>
          <div className="AdminProfileInfoValue">
            <span className="AdminProfileInforValueWord">
              {admin && admin.autoPrefillingTiming ? "True" : "False"}
            </span>
          </div>
        </div> */}
        <div className="AdminProfileItem">
          <div className="AdminProfileInfoKey">
            <span className="AdminProfileInforKeyWord">
              {language.ADMIN_PROFILE_CARD.UPDATED_AT} :{" "}
            </span>
          </div>
          <div className="AdminProfileInfoValue">
            <span className="AdminProfileInforValueWord">
              {admin && moment(admin?.updatedAt).format("DD/MM/YYYY hh:mm a")}
            </span>
          </div>
        </div>
        <div className="AdminProfileItem">
          <div className="AdminProfileInfoKey">
            <span className="AdminProfileInforKeyWord">
              {language.ADMIN_PROFILE_CARD.CREATED_AT} :{" "}
            </span>
          </div>
          <div className="AdminProfileInfoValue">
            <span className="AdminProfileInforValueWord">
              {admin && moment(admin?.createdAt).format("DD/MM/YYYY hh:mm a")}
            </span>
          </div>
        </div>
      </div>
      <div className="AdminProfileCardImage"></div>
    </div>
  );
};

export default AdminProfileComponent;
