import React, { useState } from "react";
import PrayerTv from "../../../photos/Newuiphotos/Icons/Tvimages/prayertv.webp";
import EventTv from "../../../photos/Newuiphotos/Icons/Tvimages/eventtv.webp";
import RestartTv from "../../../photos/Newuiphotos/Icons/Tvimages/restarttv.webp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SalahIcon from "../../../photos/Newuiphotos/menuIcons/salah.webp";
import EventIcon from "../../../photos/Newuiphotos/menuIcons/event.webp";
import { Backdrop } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  assignPermissionsTv,
  unpairTv,
} from "../../../redux/actions/TvActions/TvActions";
import toast from "react-hot-toast";
import BackButton from "../Shared/BackButton";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import unlink from "../../../photos/Newuiphotos/Icons/Tvimages/unlink.webp";
import Alert from "../../../photos/Newuiphotos/Icons/alert.svg";
import { RESET_ASSIGN_PERMISSIONS_STATE } from "../../../redux/actiontype";

type Props = {
  showAddTv: React.Dispatch<React.SetStateAction<boolean>>;
  setPairSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  tvDetail: any;
  isTvView?: boolean;
  selectedView: string;
  setSelectedView: React.Dispatch<React.SetStateAction<string>>;
  isForm?: boolean;
};

const TvView: React.FC<Props> = ({
  showAddTv,
  tvDetail,
  setPairSuccess,
  isTvView = false,
  selectedView,
  setSelectedView,
  isForm = false,
}) => {
  const [selectedTvDetail, setSelectedTvDetail] = useState<any>(null);
  const [selectedTvId, setSelectedTvId] = useState<string | null>(null);
  const [selectedTvName, setSelectedTvName] = useState<string>("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [unPairId, setUnPairId] = useState("");
  const [popup, setPopup] = useState(false);
  const dispatch = useAppDispatch();
  const permissions = useAppSelector(
    (state: any) => state.tvReducers.permissions
  );

  const handleSave = () => {
    if (!selectedView || !selectedTvId) {
      toast.error("Please select a view");
      return;
    }

    const permissionData = {
      tvId: selectedTvId,
      permissions: [selectedView.toLowerCase()],
    };
    setPopup(true);
    dispatch(assignPermissionsTv(permissionData))
      .then((data) => {
        toast.success("View updated successfully!");
      })
      .catch((error) => {
        console.error("Error assigning permissions:", error);
        toast.error("Failed to update the view");
      });
  };

  const handleSelect = (
    selectType: string,
    tvId: string,
    tvName: string,
    item: any
  ) => {
    setSelectedTvDetail(item);
    setSelectedTvId(tvId);
    setSelectedView(
      selectType === "Prayer Timings" ? "prayer-times" : "events"
    );
    setSelectedTvName(tvName);
  };

  const handleBack = () => {
    setPopup(false);
    setSelectedTvId(null);
    setSelectedView("");
  };

  const handleUnLink = () => {
    // setLoading(true);
    setSelectedView("");
    dispatch(unpairTv(unPairId));
    dispatch({ type: RESET_ASSIGN_PERMISSIONS_STATE });
    setUnPairId("");
  };

  const mapPermissionDisplayNameToView = (displayName: string) => {
    switch (displayName) {
      case "Prayer Timetable":
        return "prayer-times";
      case "Events":
        return "events";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="viewContainer">
        {(isForm || selectedView !== "") && (
          <div className="backBtnContainer">
            <div className="goback" style={{ marginTop: "0" }}>
              <BackButton
                handleBackBtn={() => (isForm ? showAddTv(false) : handleBack())}
              />
            </div>
            <h3 className="tv-title">Select Option</h3>
          </div>
        )}
        <div>
          {selectedView === "" ? (
            tvDetail.map((item: any) => (
              <div key={item._id} className="view-selection tv-view-selection">
                <span className="device-name">
                  <em>Connected with</em>
                  <b>{item.name}</b>
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#2E382E",
                    margin: "0",
                    fontWeight: "500",
                  }}
                >
                  Select Option to Display On TV
                </p>
                <div className="salahview">
                  <div
                    className="view-name"
                    onClick={() =>
                      handleSelect("Prayer Timings", item._id, item.name, item)
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src={SalahIcon} alt="" />
                      <b> Salah Timings</b>
                    </div>
                    {item?.permissionDisplayName === "Prayer Timetable" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div className="active-dot"></div>
                        <p
                          style={{
                            fontSize: "12px",
                            margin: "0",
                            color: "#00c986",
                          }}
                        >
                          Active
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className="view-name"
                    onClick={() =>
                      handleSelect("Events", item._id, item.name, item)
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src={EventIcon} alt="" />
                      <b>Events</b>
                    </div>
                    {item?.permissionDisplayName === "Events" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <div className="active-dot"></div>
                        <p
                          style={{
                            fontSize: "12px",
                            margin: "0",
                            color: "#00c986",
                          }}
                        >
                          Active
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="tv-view-selection">
              <span className="device-name">
                <em>Connected with</em>
                <b>{selectedTvDetail.name}</b>
              </span>
              <div className="viewImg selectedview">
                {selectedView === "prayer-times" && (
                  <>
                    <img src={PrayerTv} alt="" />
                    <b>
                      <CheckCircleIcon />
                      Salah Timings
                    </b>
                  </>
                )}
                {selectedView === "events" && (
                  <>
                    <img src={EventTv} alt="" />
                    <b>
                      <CheckCircleIcon />
                      Events
                    </b>
                  </>
                )}
              </div>

              {isTvView &&
              mapPermissionDisplayNameToView(
                selectedTvDetail.permissionDisplayName
              ) === selectedView ? (
                <button
                  onClick={() => {
                    setShowDeleteWarning(true);
                    setUnPairId(selectedTvId || "");
                  }}
                >
                  <img src={unlink} alt="" style={{ width: "15px" }} />
                  Unlink device
                </button>
              ) : (
                <button className="view-save" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Backdrop open={popup} style={{ zIndex: "10" }}>
        <div className="pairingpopup restarttv">
          <b style={{ color: "#1B8368" }}>Restart Your TV</b>
          <img src={RestartTv} alt="" style={{ width: "180px" }} />
          <p>
            Please restart your TV device to reflect your selected option on TV
            devices
          </p>
          <button
            style={{ background: "#1B8368" }}
            onClick={() => (isTvView ? handleBack() : showAddTv(false))}
          >
            Okay
          </button>
        </div>
      </Backdrop>
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
    </>
  );
};

export default TvView;
