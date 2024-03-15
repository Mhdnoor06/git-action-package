import React, {
  Dispatch,
  useState,
  useEffect,
  useRef,
  SetStateAction,
} from "react";
import { MdCancel } from "react-icons/md";
import "./EditProfileComponent.css";
import TextField from "@mui/material/TextField";
import UpdateProfileImageComponent from "../UpdateProfileImageComponent/UpdateProfileImageComponent";
import "react-phone-input-2/lib/material.css";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { updateAdminMasjid } from "../../../redux/actions/MasjidActions/UpdatingMasjidByAdmin";
import { getAdminMasjid } from "../../../redux/actions/MasjidActions/FetchingMasjidByAdminAction";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import CANCEL from "../../../photos/CANCEL.png";
import { CircularProgress } from "@material-ui/core";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { Masjid, ResponseType } from "../../../redux/Types";

type porpsType = {
  setEditMasjid: Dispatch<SetStateAction<boolean>>;
};
const EditProfileComponent = ({ setEditMasjid }: porpsType) => {
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [AdminMasjid, setAdminMasjid] = useState<any>();
  // let AdminMasjid = useSelector((state) => state.AdminMasjid[0]);
  const [MasjidAddressError, setMasjidAddressError] = useState<boolean>();
  const [MasjidNameError, setMasjidNameError] = useState<boolean>();
  const [MasjidDescError, setMasjidDescError] = useState<boolean>();
  const [Masjidcountry, setMasjidCountry] = useState(
    AdminMasjid && AdminMasjid?.country
  );
  const [MasjidContactError, setMasjidContactError] = useState<boolean>();
  const dispatch = useAppThunkDispatch();
  let MasjidNameRef = useRef<HTMLInputElement>(null);
  let MasjidDescRef = useRef<HTMLInputElement>(null);
  let MasjidAddressRef = useRef<HTMLInputElement>(null);
  // let MasjidLatitudeRef = useRef(null);
  // let MasjidLongitudeRef = useRef(null);
  let MasjidContactRef = useRef(AdminMasjidState && AdminMasjidState.contact);
  // let MasjidContactRef = useRef(AdminMasjidState && AdminMasjidState.contact);
  let MasjidCountryRef = useRef(AdminMasjidState && AdminMasjidState);
  const [mazjidId, setmazjidId] = useState();
  let faceBookLinkRef = useRef<HTMLInputElement>(null);
  let WebsiteLinkRef = useRef<HTMLInputElement>(null);
  const [MasjidUpdatedPopup, setMasjidUpdatedPopup] = useState(false);
  const [isTriggering, setisTriggering] = useState(false);
  const admin = useAppSelector((state) => state.admin);
  const handleCancelEdit = () => {
    setEditMasjid(false);
  };

  useEffect(() => {
    // const Mazjid = JSON.parse(localStorage.getItem("admin"));
    let MazjidId = admin.masjids[0];
    setmazjidId(MazjidId);
  }, [mazjidId]);

  useEffect(() => {
    if (mazjidId) {
      const response = dispatch(fetchMasjidById(mazjidId));
      response.then((result:ResponseType) => {
        if (result.message === "Success") {
          setAdminMasjid(result.data);
        }
      });
    }
  }, [mazjidId]);

  const handlePhoneChange = (
    country: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setMasjidCountry(country?.name);
    MasjidCountryRef.current = country?.name;
  };

  if (AdminMasjid === undefined) {
   window.location.reload();
  }
  const updateMasjid = () => {
    setisTriggering(true);
    const MasjidAddress = MasjidAddressRef.current?.value;
    const MasjidName = MasjidNameRef.current?.value;
    const MasjidDesc = MasjidDescRef.current?.value;
    if (!MasjidAddress) {
      setMasjidAddressError(true);
    } else if (MasjidAddress) {
      setMasjidNameError(false);
    }

    if (!MasjidName) {
      setMasjidNameError(true);
    } else if (MasjidName) {
      setMasjidNameError(false);
    }

    if (!MasjidDesc) {
      setMasjidDescError(true);
    } else if (MasjidDesc) {
      setMasjidDescError(false);
    }

    if (MasjidContactRef.current.numberInputRef.value) {
      setMasjidContactError(false);
    } else if (!MasjidContactRef.current.numberInputRef.value) {
      setMasjidContactError(true);
    }

    if (Masjidcountry == "") {
      setMasjidCountry(AdminMasjid?.country);
    }

    if (
      MasjidDesc &&
      MasjidName &&
      MasjidAddress &&
      MasjidContactRef.current.numberInputRef.value?.length > 9
    ) {
      let updatedData = {
        address: MasjidAddress,
        masjidName: MasjidName,
        description: MasjidDesc,
        contact: MasjidContactRef.current.numberInputRef.value,
        externalLinks: [
          {
            name: "Facebook",
            url: faceBookLinkRef?.current?.value,
          },
          {
            name: "Website",
            url: WebsiteLinkRef?.current?.value,
          },
        ],
      };

      const Response = dispatch(updateAdminMasjid(mazjidId ?? "", updatedData));
      Response.then((result: ResponseType) => {
        if (result.message === "Success") {
          // dispatch(getAdminMasjid(mazjidId));
          setisTriggering(false);
          setMasjidUpdatedPopup(true);
          handleSnackbar(
            true,
            "success",
            `Updated the Masjid Successfully`,
            dispatch
          );
        } else {
          handleSnackbar(
            true,
            "error",
            `Failed To Fetch :${result.message}`,
            dispatch
          );
        }
      });
    } else {
      handleSnackbar(
        true,
        "warning",
        "Please enter correct details before trying again",
        dispatch
      );
    }
  };

  //Image Upload

  const [previewImage, setPreviewImage] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setPreviewImage(reader?.result);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleCancelClick = () => {
    setPreviewImage("");
    fileInputRef.current!.value = "";
  };

  return (
    <>
      <div className="EditProfileContainer">
        <div className="EditProfileCard">
          <div className="EditProfileContainerTop">
            <div className="EditProfileContainerRevertIcon">
              <MdCancel
                className="EditMasjidCancelIcon"
                onClick={handleCancelEdit}
              />
            </div>
          </div>
          <div className="EditProfileContainerBottom">
            {MasjidUpdatedPopup ? (
              <div className="MasjidUpdatedPopup">
                <div className="MasjidUpdatedPopupInside">
                  <div className="BorderForMasjidUpdatedPopup">
                    <div className="TextForUpdate">
                      Masjid Information Updated Successfully
                    </div>
                    <div
                      className="CloseBtnForMasjidUpdatedPopup"
                      onClick={(e) => {
                        setEditMasjid(false);
                      }}
                    >
                      close
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="EditProfileForm">
              <div className="RightTextContainer">
                <div className="EdirProfilePhotoBlock">
                  <div className="PhotoPreview">
                    {previewImage && (
                      <img
                        src={previewImage}
                        className="previewImageBox"
                        alt="Preview Image"
                      />
                    )}
                    {fileInputRef?.current!.value?.length > 0 ? (
                      <>
                        <button
                          className="CancelBtnMazjid"
                          onClick={handleCancelClick}
                        >
                          <img src={CANCEL} className="CancelBtnMazjidImg" />
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="inputFieldButton">
                    <input
                      className="InputFildTimingsContainer"
                      type="file"
                      id="imageInput"
                      onChange={handleImageChange}
                      accept="image/*"
                      ref={fileInputRef}
                    />
                    <label
                      className="labelForUploadFileMazjid"
                      htmlFor="imageInput"
                    >
                      Upload Profile Photo
                    </label>
                  </div>
                </div>
                <div className="MasjidName">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    variant="outlined"
                    error={MasjidNameError}
                    helperText={MasjidNameError ? "Manditory field" : ""}
                    label="Masjid Name"
                    sx={{ marginBottom: 3 }}
                    type="text"
                    fullWidth
                    disabled={true}
                    style={{ backgroundColor: "white" }}
                    inputRef={MasjidNameRef}
                    defaultValue={AdminMasjidState?.masjidName}
                  />
                </div>
                <div className="MasjidAddress">
                  <TextField
                    id="outlined-required"
                    variant="outlined"
                    error={MasjidAddressError}
                    helperText={MasjidAddressError ? "Manditory field" : ""}
                    label="Address"
                    inputRef={MasjidAddressRef}
                    defaultValue={AdminMasjidState?.address}
                    fullWidth
                    sx={{
                      marginBottom: 3,
                      "& .react-tel-input .special-label": {
                        background: "transparent",
                      },
                    }}
                    style={{ backgroundColor: "white" }}
                    type="text"
                  />
                </div>
                <div className="MasjidNumber">
                  <PhoneInput
                    placeholder="Enter phone number"
                    // error={MasjidContactError}
                    // ref={MasjidContactRef}
                    // style={{ width: "100%", height: "10%" }}
                    onChange={(value, country, e) =>
                      handlePhoneChange(country, e)
                    }
                    value={AdminMasjidState && AdminMasjidState?.contact}
                    inputClass="PhoneInputStyle"
                  />
                  {MasjidContactError && (
                    <p style={{ color: "red" }}>
                      Please Enter the Contact Number
                    </p>
                  )}
                </div>

                <div className="MasjidDescReq">
                  <TextField
                    id="outlined-required"
                    variant="outlined"
                    error={MasjidDescError}
                    helperText={MasjidDescError ? "Manditory field" : ""}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    inputRef={MasjidDescRef}
                    style={{ backgroundColor: "white" }}
                    type="text"
                    sx={{ marginTop: 3 }}
                    defaultValue={
                      AdminMasjidState && AdminMasjidState?.description
                    }
                  />
                </div>
              </div>
            </div>
            <div className="EditProfileImage">
              <div className="UpdatePhotoComponentContainer">
                {mazjidId ? (
                  <UpdateProfileImageComponent
                    ParentComponentType={"Masjid"}
                    OperationType={"ADD"}
                    // AdminMasjid={AdminMasjidState}
                    MazjidId={mazjidId}
                  />
                ) : null}
              </div>
              <div className="SocialMediaLink">
                <span className="EnterLinks">Add Social links</span>
                <div className="WebsiteInput">
                  <input
                    type="url"
                    className="FaceBookMasjidLink"
                    placeholder="Enter FaceBook Link Here"
                    // value={faceBookLink}
                    ref={faceBookLinkRef}
                    defaultValue={AdminMasjidState?.externalLinks[1]?.url}
                    // onChange={(e) => {
                    //   console.log(faceBookLinkRef.current.value);
                    // }}
                  />
                  <input
                    type="url"
                    className="WebsiteMasjidLink"
                    placeholder="Enter Website Link Here"
                    // value={WebsiteLink}
                    ref={WebsiteLinkRef}
                    defaultValue={AdminMasjidState?.externalLinks[0]?.url}
                    // onChange={(e) => {
                    //   console.log(WebsiteLinkRef.current.value);
                    // }}
                  />
                </div>
              </div>
              <div className="UpdateBottomMasjid">
                <button className="UpdateBottomButton" onClick={updateMasjid}>
                  {isTriggering ? (
                    <CircularProgress size="20px" color="inherit" />
                  ) : (
                    "Update Masjid"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileComponent;
