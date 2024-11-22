import React, { useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import NotCasted from "../../../photos/Newuiphotos/Icons/Tvimages/NotCasted.webp";
import addtv from "../../../photos/Newuiphotos/Icons/Tvimages/AddTv.webp";
import PrayerTv from "../../../photos/Newuiphotos/Icons/Tvimages/prayertv.webp";
import EventTv from "../../../photos/Newuiphotos/Icons/Tvimages/eventtv.webp";
import edit from "../../../photos/Newuiphotos/Icons/Tvimages/editwhite.webp";
import unlink from "../../../photos/Newuiphotos/Icons/Tvimages/unlink.webp";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  fetchAllTv,
  unpairTv,
} from "../../../redux/actions/TvActions/TvActions";
import "./TvConnection.css";
import AddTv from "./AddTv";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Alert from "../../../photos/Newuiphotos/Icons/alert.svg";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import TvView from "./TvView";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import { useNavigationprop } from "../../../../MyProvider";

type PermissionType = "events" | "prayer-times"; // Define valid permission types
const permissionDisplayNames: Record<PermissionType, string> = {
  events: "Events",
  "prayer-times": "Prayer Timetable",
};

const TvConnection: React.FC = () => {
  const navigation = useNavigationprop();
  const [showAddTv, setShowAddTv] = useState(false);
  const [showEditTv, setEditTv] = useState(false);
  const [selectedView, setSelectedView] = useState<string>("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTv, setSelectedTv] = useState<any>(null);

  const [unPairID, setUnPairId] = useState("");
  const dispatch = useAppDispatch();
  const tvs = useAppSelector((state) => state.tvReducers.tvs);
  const UnpairStatus = useAppSelector(
    (state) => state.tvReducers.unpairingStatus
  );
  const permissions = useAppSelector((state) => state.tvReducers.permissions);

  console.log(permissions);

  const isLoading = useAppSelector((state) => state.tvReducers.loading);

  useEffect(() => {
    dispatch(fetchAllTv());
  }, [showAddTv, unPairID, showEditTv, permissions]);

  useEffect(() => {
    if (UnpairStatus.success) {
      dispatch(fetchAllTv());
      dispatch({ type: "RESET_UNPAIRING_STATUS" });
      setLoading(false);
    }
  }, [UnpairStatus.success]);
  console.log(tvs);

  const views = tvs.map((tv) => {
    const imgSrc = tv.permissions.includes("events") ? EventTv : PrayerTv;
    const permissionName = tv.permissions[0] as PermissionType;
    const permissionDisplayName =
      permissionDisplayNames[permissionName] || "Unknown";
    return {
      img: imgSrc,
      name: tv.name,
      permissionDisplayName,
      _id: tv._id,
    };
  });

  const handleEdit = (tv: any) => {
    setSelectedTv(tv);
    setEditTv(true);
  };

  const handleUnLink = () => {
    setLoading(true);
    dispatch(unpairTv(unPairID));
    setUnPairId("");
  };

  return (
    <div>
      {/* {showEditTv && (
        <TvView
          tvDetail={selectedTv}
          showAddTv={setEditTv}
          setPairSuccess={setEditTv}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
      )} */}
      {/* Render TvView component if selectedTv is not null */}
      {!showEditTv && // Render TV selection list if selectedTv is null
        (showAddTv ? (
          <AddTv setShowAddTv={setShowAddTv} />
        ) : (
          <div className="tvconnectioncontainer">
            {selectedView === "" && (
              <div className="backBtnContainer">
                <div className="goback" style={{ marginTop: "0" }}>
                  <BackButton
                    handleBackBtn={navigation ? navigation : customNavigatorTo}
                  />
                </div>
                <h3 className="tv-title">Connected TV</h3>
              </div>
            )}
            {views.length <= 0 && (
              <div className="connectionlist">
                {isLoading ? (
                  <div>Loading...</div>
                ) : tvs.length > 0 ? (
                  <div></div>
                ) : (
                  <div className="connectionlist" style={{ height: "70vh" }}>
                    <img src={NotCasted} alt="" style={{ width: "150px" }} />
                    <p>Not connected to any device yet</p>
                  </div>
                )}
              </div>
            )}

            {views && (
              <TvView
                isTvView={true}
                tvDetail={views}
                showAddTv={setEditTv}
                setPairSuccess={setEditTv}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
              />
            )}
            {/* {views.map((item, index) => (
              <div className="tv-view-selection" key={index}>
                <div className="viewcardtop">
                  <span className="device-name">
                    <em>Connected with</em>
                    <b>{item.name}</b>
                  </span>
                </div>
                <div className={`viewImg  selectedview`}>
                  <img src={item.img} alt={item.permissionDisplayName} />
                  <span className="viewName">
                    <b>
                      <CheckCircleIcon />
                      {item.permissionDisplayName}
                    </b>
                  </span>
                </div>

                <button onClick={() => handleEdit(item)}>
                  <img src={edit} alt="" style={{ width: "12px" }} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowDeleteWarning(true);
                    setUnPairId(item._id);
                  }}
                >
                  <img src={unlink} alt="" style={{ width: "15px" }} />
                  Unlink device
                </button>
              </div>
            ))} */}

            <div className="addtvcontainer">
              <button
                className="AddTv"
                onClick={() => setShowAddTv((prev) => !prev)}
              >
                <img src={addtv} alt="" style={{ height: "20px" }} />
              </button>
            </div>
          </div>
        ))}
      {showDeleteWarning && (
        <DeleteWarningCard
          wariningType={"Are you sure you want to"}
          warining={"Unlink"}
          onClose={() => setShowDeleteWarning(false)}
          onConfirm={() => {
            setShowDeleteWarning(false);
            handleUnLink();
          }}
          icon={Alert}
        />
      )}
    </div>
  );
};

export default TvConnection;
