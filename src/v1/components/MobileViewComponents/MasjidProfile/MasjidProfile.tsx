import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { IExternalLinks } from "../../../redux/Types";
import proflePlaceholer from "../../../photos/Newuiphotos/home icon/profile_placeholder.png";
import edit from "../../../photos/Newuiphotos/home icon/edit.svg";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import "./MasjidProfile.css";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import toast from "react-hot-toast";

import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import MoreBtn from "../Shared/MoreBtn";
import {
  customNavigatorTo,
  timeZoneGetter,
} from "../../../helpers/HelperFunction";
import { authLogout } from "../../../redux/actions/AuthActions/LogoutAction";
import Slider from "react-slick";
import EditProfile from "./EditProfile";
import LinkWrapper from "../Shared/LinkWrapperProps/LinkWrapperProps";
import BackButton from "../Shared/BackButton";
import { useNavigationprop } from "../../../../MyProvider";

type MasjidProfileProps = {
  consumerMasjidId: string;
  isMainAdmin?: boolean;
};
const MasjidProfile = ({
  consumerMasjidId,
  isMainAdmin = true,
}: MasjidProfileProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [isMasjidEditOpen, setIsMasjidEditOpen] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [masjid, setMasjid] = useState<any>();

  const dispatch = useAppThunkDispatch();

  const masjidAPIRequest = () => {
    const response = dispatch(fetchMasjidById(consumerMasjidId));
    response.then(function (result) {
      if (result?.masjidName) {
        // setTzone(timeZoneGetter(result));
        setMasjid(result);
      } else {
        toast.error("Unable to fetch Masjid data");
      }
    });
  };

  useEffect(() => {
    if (consumerMasjidId) {
      masjidAPIRequest();
    } else if (AdminMasjidState?.masjidName) {
      // console.log("form AdminMasjidState.amsjdi  => ", AdminMasjidState);
      setMasjid(AdminMasjidState);
      localStorage.setItem("MasjidtZone", timeZoneGetter(AdminMasjidState));
    }
  }, [consumerMasjidId]);

  // const zoneConverter = (location: any) => {
  //   const lon = location?.coordinates[0];
  //   const lat = location?.coordinates[1];
  //   if (lat && lon) {
  //     let location = tz_lookup(lat, lon);
  //     return location;
  //   }
  //   return "";
  // };

  const masjidReloader = () => {
    masjidAPIRequest();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const checkIsMasjidAssigned = async () => {
    if (!consumerMasjidId) {
      const result = await swal({
        title: "Oops",
        text: "You have no masjid assigned. Contact Admin to assign masjid",
        icon: "error",
        buttons: {
          catch: {
            text: "Logout",
            value: "Logout",
          },
          // Logout: true,
        },
      }).then((value) => {
        // if (value === "Logout") {
        swal("Logging out");
        dispatch(authLogout());
        // }
      });
    }
  };

  useEffect(() => {
    // Assuming masjid?.masjidPhotos is the array used for slides
    setSlideCount(masjid?.masjidPhotos?.length || 0);
  }, [masjid?.masjidPhotos]);

  useEffect(() => {
    checkIsMasjidAssigned();
  }, []);

  const socialLinksHandler = (key: string, links: IExternalLinks[]) => {
    if (!links) return "";
    const matchedItems = links.find((link) => link.name === key);
    return matchedItems ? matchedItems.url : "";
  };

  const updateSlideCount = () => {
    const slider = document.querySelector(".slick-slider");
    if (slider) {
      const slideCount = slider.querySelectorAll(".slick-slide").length;
      setSlideCount(slideCount);
    }
  };

  useEffect(() => {
    updateSlideCount();
  }, [windowWidth]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i: any) {
      return <div></div>; // Hide default dots
    },
    appendDots: (dots: any) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
        <div className="image-counter">
          {currentSlide + 1}/{slideCount}
        </div>
      </div>
    ),
    beforeChange: (current: any, next: any) => setCurrentSlide(next),
    afterChange: (current: any) => setCurrentSlide(current),
  };

  const getSavedOffsetFromLocalStorage = (): number => {
    return JSON.parse(localStorage.getItem("imageOffset") || "50");
  };

  const savedOffset = getSavedOffsetFromLocalStorage();

  if (isMasjidEditOpen)
    return (
      <EditProfile
        openMasjidEdit={isMasjidEditOpen}
        setOpenMasjidEdit={setIsMasjidEditOpen}
        masjid={masjid}
        masjidReloader={masjidReloader}
        masjidId={consumerMasjidId}
      />
    );

  const maxTextLength = windowWidth > 374 ? 50 : 38;
  const fbLink = socialLinksHandler("Facebook", masjid?.externalLinks);
  const webLink = socialLinksHandler("Website", masjid?.externalLinks);

  const truncatedName =
    fbLink.length > maxTextLength
      ? fbLink.substring(0, maxTextLength) + "...."
      : fbLink;
  const truncatedWebLink =
    webLink.length > maxTextLength - 20
      ? webLink.substring(0, maxTextLength - 20) + "...."
      : webLink;

  const navigation = useNavigationprop();

  return (
    <>
      <div className="masjid-details">
        <div className="masjid-details-body">
          <div className="goback">
            <BackButton
              handleBackBtn={navigation ? navigation : customNavigatorTo}
            />
          </div>
          <div className="masjid-preview-img">
            {masjid?.masjidPhotos?.length > 0 ? (
              <Slider {...settings}>
                {masjid?.masjidPhotos?.map((img: any) => (
                  <div className="slider-img" key={img._id}>
                    <img
                      src={img.url}
                      alt="masjid-preview-img"
                      data-testid="masjid-preview-img"
                      style={{
                        objectFit: "cover",
                        objectPosition: `50% ${savedOffset}%`,
                      }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img src={proflePlaceholer} alt="masjid-preview-img" />
            )}
          </div>

          <div className="profile-bottom-part">
            <div className="profile-card">
              <div className="profile-top-container">
                <div className="home-masjid-circular-img">
                  {masjid?.masjidProfilePhoto ? (
                    <img src={masjid?.masjidProfilePhoto} alt="masjid-img" />
                  ) : (
                    <img src={proflePlaceholer} alt="masjid-preview-img" />
                  )}
                </div>
                <div className="profile-card-top">
                  <h3 className="profile-card-title">{masjid?.masjidName}</h3>
                  <div>
                    <img
                      alt="edit img"
                      onClick={() => setIsMasjidEditOpen(true)}
                      src={edit}
                    />
                  </div>
                </div>
              </div>

              {!consumerMasjidId ? (
                <div>
                  <>
                    <h5>You don't have any masjid assigned to you</h5>
                  </>
                </div>
              ) : (
                <div>
                  <h5>Description</h5>
                  <MoreBtn tsx={masjid?.description} txLength={250} />
                  {/* <MagnifierComponent /> */}
                  <div className="icon-box-group">
                    <div className="icon-box-container">
                      <div className="icon-box">
                        <div>
                          <CallRoundedIcon sx={{ width: "20px" }} />
                        </div>
                        <p>{masjid?.contact}</p>
                      </div>
                      {truncatedWebLink && (
                        <LinkWrapper url={webLink}>
                          <div className="icon-box">
                            <div data-testid="website-testid">
                              <LanguageRoundedIcon sx={{ width: "20px" }} />
                            </div>
                            <p>{truncatedWebLink}</p>
                            {/* <p>{zoneConverter(masjid?.location)}</p> */}
                          </div>
                        </LinkWrapper>
                      )}
                    </div>

                    {fbLink && (
                      <LinkWrapper url={fbLink}>
                        <div className="icon-box">
                          <div data-testid="facebook-testid">
                            <FacebookRoundedIcon sx={{ width: "20px" }} />
                          </div>
                          <p>{truncatedName}</p>
                        </div>
                      </LinkWrapper>
                    )}
                  </div>

                  <div className="icon-box-container2">
                    <div className="icon-box">
                      <div>
                        <LocationOnRoundedIcon sx={{ width: "20px" }} />
                      </div>
                      <p>{masjid?.address}</p>
                    </div>
                    {isMainAdmin && (
                      <div className="icon-box">
                        <p>Last Updated By : </p>
                        <p>{masjid?.assignedUser?.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MasjidProfile;
