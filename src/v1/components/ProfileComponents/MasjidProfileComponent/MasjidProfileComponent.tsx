import React, { useState, useEffect } from "react";
import "./MasjidProfileComponenet.css";
import { resources } from "../../../resources/resources";

import PictureCarouselComponent from "../PictureCarouselComponent/PictureCarouselComponent";
import Button from "@mui/material/Button";
import ReadMoreReadLess from "../../ArchitectureCompoenents/ReadMoreComponent/ReadMoreReadLess";
import NoImgFound from "../../../photos/NoImgFound.png";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import { handleSnackbar } from "../../../helpers/SnackbarHelper/SnackbarHelper";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { AdminInterFace } from "../../../redux/Types";

const MasjidProfileCard = () => {
  const [mazjidId, setmazjidId] = useState("");
  const dispatch = useAppThunkDispatch();
  const language = resources["en"];
  const [IsAdminPage, setIsAdminPage] = useState(false);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);

  useEffect(() => {
    const adminString = localStorage.getItem("admin");
    const admin: AdminInterFace | null = adminString
      ? JSON.parse(adminString)
      : null;

    let MazjidId = admin?.masjids[0];
    if (MazjidId) {
      setmazjidId(MazjidId);

      const response = dispatch(fetchMasjidById(MazjidId));
      response.then((result) => {
        if (!result.timings === null) {
          handleSnackbar(
            true,
            "error",
            `Failed To Fetch :${result?.message}`,
            dispatch
          );
        }
      });
    }
  }, [mazjidId]);

  useEffect(() => {
    if (window.location.pathname === "/masjidprofile") {
      setIsAdminPage(true);
    } else {
      setIsAdminPage(false);
    }
  }, []);

  const handleEditClick = () => {
    //  setEditMasjid(true);
  };

  return (
    <div className="MasjidProfileCardContainer">
      <div className="MasjdiProfileCardTop">
        <div className="MazjisPictureContainerTop">
          <div className="MazjidPorfilePhotoCOntainer">
            <div className="MasjidProfilePicture">
              {AdminMasjidState && AdminMasjidState?.masjidProfilePhoto ? (
                <img
                  src={AdminMasjidState && AdminMasjidState?.masjidProfilePhoto}
                  alt="AdminMasjidProfile"
                  className="MasjidProfilePictureContianer"
                />
              ) : (
                <img
                  src={NoImgFound}
                  alt="AdminMasjidProfile"
                  className="MasjidProfilePictureContianer"
                />
              )}
            </div>
            <div className="MasjidProfilePictureTitle">
              <span className="MasjidProfilePictureTitleName">
                {AdminMasjidState && AdminMasjidState.masjidName}{" "}
              </span>
              {IsAdminPage && (
                <>
                  <div className="EditMasjidButton">
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleEditClick}
                    >
                      {language.MASJID_PROFILE_CARD.EDIT_MASJID}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="MasjidProfileCardPictures">
          <PictureCarouselComponent
            ParentComponentType={"Masjid"}
            Photos={AdminMasjidState?.masjidPhotos}
            // AdminMasjidState={AdminMasjidState}
            // MazjidId={mazjidId}
          />
        </div>
      </div>
      <div className="MasjidProfileCardBottom">
        <div className="MasjidDecriptionItemCard">
          <span className="MasjdiDescriptionKeyDesc">
            {language.MASJID_PROFILE_CARD.MASJID_DESCRIPTION}
          </span>
          <span className="MasjidDescriptionValueDesc">
            {AdminMasjidState?.description?.length > 0 ? (
              <>
                {AdminMasjidState?.description?.length > 100 ? (
                  <ReadMoreReadLess Limit={100}>
                    {AdminMasjidState && AdminMasjidState.description}
                  </ReadMoreReadLess>
                ) : (
                  <>{AdminMasjidState && AdminMasjidState.description}</>
                )}
              </>
            ) : (
              <>
                .................................................................................
              </>
            )}
          </span>
        </div>
        <div className="MazjidBottomNewContainer">
          <div className="MasjidDecriptionItem">
            <span className="MasjdiDescriptionKey">
              {language.MASJID_PROFILE_CARD.MASJID_CONTACT}
            </span>
            {AdminMasjidState?.contact?.length > 0 ? (
              <>
                <span className="MasjidContactValue valueForAll">
                  {AdminMasjidState && AdminMasjidState.contact}
                </span>
              </>
            ) : (
              <>................................................</>
            )}
          </div>

          <div className="MasjidDecriptionItem">
            <span className="MasjdiDescriptionKey">
              {language.MASJID_PROFILE_CARD.MASJID_ADDRESS}
            </span>
            {AdminMasjidState?.address?.length > 0 ? (
              <>
                <span className="MasjidAddressValue valueForAll">
                  {AdminMasjidState && AdminMasjidState.address}
                </span>
              </>
            ) : (
              <>............................................................</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasjidProfileCard;
