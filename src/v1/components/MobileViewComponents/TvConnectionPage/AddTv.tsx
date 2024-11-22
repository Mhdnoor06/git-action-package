import React, { useEffect, useRef, useState } from "react";
import BackButton from "../Shared/BackButton";
import SuccessTick from "../../../photos/Newuiphotos/Icons/Tvimages/successTick.webp";
import PairingIcon from "../../../photos/Newuiphotos/Icons/Tvimages/pairingimage.svg";
import "./TvConnection.css";
import { Backdrop } from "@mui/material";
import TvView from "./TvView";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  pairTv,
  resetPairingState,
} from "../../../redux/actions/TvActions/TvActions";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import SuccessMessageModel from "../../../helpers/SuccessMessageModel/SuccessMessageModel";
import { assignPermissions } from "../../../ClientApi-Calls";
import { RESET_ASSIGN_PERMISSIONS_STATE } from "../../../redux/actiontype";
type Props = {
  setShowAddTv: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTv: React.FC<Props> = ({ setShowAddTv }) => {
  const [tvName, setTvName] = useState("");
  const [tvCode, setTvCode] = useState("");
  const [pairing, setPairing] = useState(false);
  const [pairSuccess, setPairSuccess] = useState(false);
  const [newTvDetail, setNewTvDetail] = useState(null);
  const pairingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [selectedView, setSelectedView] = useState<string>("");

  const dispatch = useAppDispatch();
  const pairingState = useAppSelector(
    (state) => state.tvReducers.pairingStatus
  );

  const handleBackBtn = () => {
    setShowAddTv((prev) => !prev);
  };

  const handleTvNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTvName(event.target.value);
  };

  const handleTvCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTvCode(event.target.value);
  };

  const handlePair = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPairing(true);

    dispatch(pairTv(tvCode, tvName))
      .then((data) => {
        setNewTvDetail(data); // Set newly paired TV details to be passed to TvView
        setOpenSuccessModal(true);
        handleSnackbar(true, "success", "TV paired successfully", dispatch);
        dispatch({ type: RESET_ASSIGN_PERMISSIONS_STATE });
      })
      .catch((error) => {
        console.error("Pairing failed:", error.message);
        handleSnackbar(
          true,
          "error",
          "Pairing failed: " + error.message,
          dispatch
        );
      })
      .finally(() => {
        setPairing(false);
      });
  };

  const handleCancel = () => {
    if (pairingTimeoutRef.current) {
      clearTimeout(pairingTimeoutRef.current);
      pairingTimeoutRef.current = null;
    }
    setPairing(false);
    dispatch(resetPairingState());
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("focus", handleInputFocus);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", handleInputFocus);
      }
    };
  }, []);

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    setPairSuccess(true);
    dispatch(resetPairingState()); // Reset pairing state after successful pairing
  };

  return (
    <>
      {pairSuccess ? (
        <TvView
          isForm={true}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          showAddTv={setShowAddTv}
          tvDetail={[newTvDetail] || [pairingState]} // Pass the newly paired TV details
          setPairSuccess={setPairSuccess}
        />
      ) : (
        <div>
          <div className="addtvform">
            <div className="backBtnContainer">
              <div className="goback" style={{ marginTop: "0" }}>
                <BackButton handleBackBtn={handleBackBtn} />
              </div>
              <h3 className="tv-title">Add TV</h3>
            </div>
          </div>
          <div className="add-tv-device">
            <form action="" onSubmit={(e) => handlePair(e)}>
              <div className="step">
                <p className="step-text">1. Step</p>
                <label style={{ color: "#1B8368" }}>
                  Enter a name for the TV.
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Your TV Name"
                  value={tvName}
                  onChange={handleTvNameChange}
                  required
                />
              </div>
              <div className="step">
                <p className="step-text">2. Step</p>
                <label>
                  On your smart TV, open the App Store, search for{" "}
                  <b>“ConnectMazjid”</b> App and Install it
                </label>
              </div>
              <div className="step">
                <p className="step-text">3. Step</p>
                <label>
                  Launch ConnectMazjid App on your TV and Find{" "}
                  <b>“Unique Code”</b> displayed on the App.
                </label>
              </div>
              <div className="step">
                <p className="step-text">4. Step</p>
                <label style={{ color: "#1B8368" }}>
                  Enter the Code Displayed on the TV
                </label>
                <div className="input-with-icon">
                  <input
                    ref={inputRef}
                    type="text"
                    value={tvCode}
                    onChange={handleTvCodeChange}
                    required
                  />
                </div>
              </div>
              <button type="submit">Pair</button>
            </form>
          </div>
          <SuccessMessageModel
            message={"Successfully Paired"}
            open={openSuccessModal}
            onClose={handleCloseSuccessModal}
          />
          <Backdrop open={pairing}>
            {pairSuccess ? (
              <div className="successfulpair">
                <img
                  src={SuccessTick}
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
                <p>Successfully Paired</p>
              </div>
            ) : (
              <div className="pairingpopup">
                <b>
                  <em>{tvName}</em>
                </b>
                <img src={PairingIcon} alt="" style={{ width: "180px" }} />
                <p>Your device is pairing.....</p>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default AddTv;
