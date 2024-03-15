import React, { useState, useEffect } from "react";
import "./MazjidProfileMainConponent.css";
import { resources } from "../../resources/resources";
import CarouselForMainMazjidComponent from "../ProfileComponents/MazjidProfilePictureCarosal/CarouselForMainMazjidComponent";
import EditButton from "../../photos/EditButton.png";
import NoImgFound from "../../photos/NoImgFound.png";

import { fetchMasjidById } from "../../redux/actions/MasjidActions/fetchMasjidById";
import fb from "../../photos/fb.png";
import web from "../../photos/web.png";
import { useAppSelector, useAppThunkDispatch } from "../../redux/hooks";
type propsType = {
  setEditMasjid: (val: boolean) => void;
};
const MasjidProfileCard = ({ setEditMasjid }: propsType) => {
  // let AdminMasjid = [];
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [AdminMasjid, setAdminMasjid] = useState(false);
  const language = resources["en"];
  const [IsAdminPage, setIsAdminPage] = useState(false);
  const [mazjidId, setmazjidId] = useState();
  const dispatch = useAppThunkDispatch();

  let admin = useAppSelector((state) => state.admin);
  // const Mazjid = JSON.parse(localStorage.getItem('admin'));

  useEffect(() => {
    let MazjidId = admin.masjids[0];
    setmazjidId(MazjidId);
  }, [mazjidId]);

  useEffect(() => {
    if (admin.masjids[0]) {
      const response = dispatch(fetchMasjidById(admin.masjids[0]));

      response.then((result) => {
        console.log(result);
        if (result.message === "Success") {
          setAdminMasjid(result.data);
        }
      });
    }
  }, [mazjidId]);

  console.log(AdminMasjid);

  useEffect(() => {
    if (window.location.pathname === "/masjidprofile") {
      setIsAdminPage(true);
    } else {
      setIsAdminPage(false);
    }
  }, []);

  const handleEditClick = () => {
    setEditMasjid(true);
  };

  // Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea perferendis voluptate, explicabo officia culpa placeat voluptas totam veniam voluptates quisquam doloribus saepe, delectus consequatur ratione perspiciatis quibusdam fugiat accusantium ad unde quasi laboriosam voluptatem facere! Quia voluptate aut culpa hic.

  return (
    <div className="MasjidProfileCardContainerMain">
      <div className="MazjidPhotosConatinerMain">
        <CarouselForMainMazjidComponent
          ParentComponentType={"Masjid"}
          Photos={AdminMasjidState?.masjidPhotos}
          // AdminMasjidState={AdminMasjidState}
          mazjidId={mazjidId}
        />
      </div>
      <div className="MasjdiProfileCardTopMain">
        <div className="MazjisPictureContainerTopMain">
          <div className="MazjidPorfilePhotoCOntainerMain">
            <div className="MasjidProfilePictureMain">
              {AdminMasjidState && AdminMasjidState?.masjidProfilePhoto ? (
                <img
                  src={AdminMasjidState && AdminMasjidState?.masjidProfilePhoto}
                  alt="AdminMasjidProfile"
                  className="MasjidProfilePictureContianerMain"
                />
              ) : (
                <img
                  src={NoImgFound}
                  alt="AdminMasjidProfile"
                  className="MasjidProfilePictureContianerMain"
                />
              )}
            </div>
            <div className="MasjidProfilePictureTitleMain">
              <span className="MasjidProfilePictureTitleNameMain">
                {AdminMasjidState && AdminMasjidState.masjidName}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="SocialMediaLinks">
          <div className="FaceBookLink">
            <img src={fb} className="fbImageMasjid" />
            {AdminMasjidState?.externalLinks[0]?.url.length > 0
              ? AdminMasjidState?.externalLinks[0]?.url
              : "www.facebook.com"}
            {/* www.facebook.com */}
          </div>
          <div className="WebsiteLink">
            <img src={web} className="webImageMasjid" />

            {AdminMasjidState?.externalLinks[1]?.url.length > 0
              ? AdminMasjidState?.externalLinks[1]?.url
              : "www.mymasjid.com"}
            {/* www.mymasjid.com */}
          </div>
        </div>
      </div>

      <div className="MasjidProfileCardBottomMain">
        <div className="MasjidDecriptionItemCardMain">
          <div className="EditDescButtonBlock">
            <span className="MasjdiDescriptionKeyDescMain">
              {language.MASJID_PROFILE_CARD.MASJID_DESCRIPTION}
            </span>
            <div className="EditButtonForMazjid">
              {IsAdminPage && (
                <>
                  <div className="EditMasjidButtonMain">
                    <button
                      onClick={handleEditClick}
                      className="EditMazjidButton"
                    >
                      <img src={EditButton} className="EditMazjidButtonImage" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <span className="MasjidDescriptionValueDescMain">
            {AdminMasjidState && AdminMasjidState.description}
          </span>
        </div>

        <div className="MazjidBottomNewContainerMain">
          <div className="MasjidDecriptionItemMain">
            <span className="MasjdiDescriptionKeyMain">
              {language.MASJID_PROFILE_CARD.MASJID_CONTACT}
            </span>
            <span className="MasjidContactValue valueForAllMain">
              {AdminMasjidState && AdminMasjidState.contact}
            </span>
          </div>
          <div className="MasjidDecriptionItemMain">
            <span className="MasjdiDescriptionKeyMain">
              {language.MASJID_PROFILE_CARD.MASJID_ADDRESS}
            </span>
            <span className="MasjidAddressValueMain valueForAllMain">
              {AdminMasjidState && AdminMasjidState.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasjidProfileCard;
