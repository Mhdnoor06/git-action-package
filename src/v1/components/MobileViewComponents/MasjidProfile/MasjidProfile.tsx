import React, { useEffect, useState } from "react";

import swal from "sweetalert";
import { IExternalLinks, PrayerTimings } from "../../../redux/Types";
import proflePlaceholer from "../../../photos/Newuiphotos/home icon/profile_placeholder.png";
// import solarPhone from "../../../photos/solar_phone-bold.png";
// import globalIcon from "../../../photos/ph_globe-bold.png";
// import locationIcon from "../../../photos/mingcute_location-2-fill.png";

// import facebookIcon from "../../../photos/fb-icon.png";
import edit from "../../../photos/Newuiphotos/home icon/edit.svg";
// import LogoutIcon from "@mui/icons-material/Logout";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import "./masjid-profile.css";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import toast from "react-hot-toast";
import tz_lookup from "tz-lookup";
import moment from "moment";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import MoreBtn from "../Shared/MoreBtn";
import { dateReverter, timeZoneGetter } from "../../../helpers/HelperFunction";
import { authLogout } from "../../../redux/actions/AuthActions/LogoutAction";
import { FetchingTimingsByDateRange } from "../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import Slider from "react-slick";
import EditMasjid from "./EditMasjid";
import MagnifierComponent from "../Shared/Magnifier/MagnifierComponent";

const MasjidProfile = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [allPrayer, setAllPrayer] = useState<PrayerTimings<number>[]>([]);
  const [openMasjidEdit, setOpenMasjidEdit] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const [tZone, setTzone] = useState("");
  let admin = useAppSelector((state) => state.admin);
  const [masjid, setMasjid] = useState<any>();

  const dispatch = useAppThunkDispatch();

  const masjidAPIRequest = () => {
    const response = dispatch(fetchMasjidById(admin?.masjids[0]));
    response.then(function (result) {
      if (result?.masjidName) {
        setTzone(timeZoneGetter(result));
        setMasjid(result);
      } else {
        toast.error("Unable to fetch Masjid  data");
      }
    });
  };
  useEffect(() => {
    if (AdminMasjidState?.masjidName) {
      setMasjid(AdminMasjidState);
      setTzone(timeZoneGetter(AdminMasjidState));
      localStorage.setItem("MasjidtZone", timeZoneGetter(AdminMasjidState));
    } else if (admin?.masjids[0]) {
      masjidAPIRequest();
    }
  }, []);

  const zoneConverter = (location: any) => {
    const lon = location?.coordinates[0];
    const lat = location?.coordinates[1];
    if (lat && lon) {
      let location = tz_lookup(lat, lon);
      return location;
    }
    return "";
  };

  useEffect(() => {
    if (admin?.masjids[0]) {
      const startMonth = moment()
        .startOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const endNextMonth = moment()
        .add(1, "M")
        .endOf("month")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
      const res = dispatch(
        FetchingTimingsByDateRange(startMonth, endNextMonth, admin.masjids[0])
      );
      res.then((result) => {
        if (result.status === 200) {
          setAllPrayer(result.data.data);

          const today = moment.tz(tZone).format("YYYY-MM-DD");
          handleDateChange(today, result.data.data);
        }
      });
    }
  }, [admin]);

  const masjidReloader = () => {
    masjidAPIRequest();
  };

  const handleDateChange = (date: string, prayers = []) => {
    let targetedPrayer = prayers.length ? prayers : allPrayer;

    const matchedItem = targetedPrayer.find(
      (item) => dateReverter(item?.date, tZone).split("T")[0] === date
    );
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

  const modalOpener = async () => {
    if (!admin?.masjids[0]) {
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
        switch (value) {
          // case "Request":
          //   setOpen(true);
          //   break;

          case "Logout":
            swal("Logging out");
            dispatch(authLogout());
            break;

          default:
            swal("Logging out");
            dispatch(authLogout());
        }
      });
    }
  };
  useEffect(() => {
    // Assuming masjid?.masjidPhotos is the array used for slides
    setSlideCount(masjid?.masjidPhotos?.length || 0);
  }, [masjid?.masjidPhotos]);

  useEffect(() => {
    modalOpener();
    // swal("Oops", "Something went wrong!", "error");
  }, []);

  const socialLinksHandler = (key: string, links: IExternalLinks[]) => {
    if (!links) return "";
    const matchedItems = links.find((link) => link.name === key);
    if (matchedItems) return matchedItems.url;
    else return "";
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

  if (openMasjidEdit)
    return (
      <EditMasjid
        openMasjidEdit={openMasjidEdit}
        setOpenMasjidEdit={setOpenMasjidEdit}
        masjid={masjid}
        masjidReloader={masjidReloader}
        masjidId={admin?.masjids[0]}
      />
    );

  const maxTextLength = windowWidth > 374 ? 50 : 38;

  const maxAddLength = windowWidth > 386 ? 35 : 34;
  const fbLink = socialLinksHandler("Facebook", masjid?.externalLinks);
  const truncatedName =
    fbLink.length > maxTextLength
      ? fbLink.substring(0, maxTextLength) + "...."
      : fbLink;

  const truncatedAddress =
    masjid?.address?.length > maxAddLength
      ? masjid?.address.substring(0, maxAddLength) + "..."
      : masjid?.address;

  return (
    <>
      <div className="masjid-details">
        <div className="masjid-details-body">
          <div className="masjid-preview-img">
            {masjid?.masjidPhotos?.length > 0 ? (
              <Slider {...settings}>
                {masjid?.masjidPhotos?.map((img: any) => (
                  <div className="slider-img" key={img._id}>
                    <img src={img.url} alt="masjid-preview-img" />
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
                      onClick={() => setOpenMasjidEdit(true)}
                      src={edit}
                    />
                  </div>
                </div>
              </div>

              {!admin?.masjids[0] ? (
                <div>
                  {!formSubmitted && (
                    <>
                      <h5>You don't have any masjid assigned to you</h5>
                    </>
                  )}
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
                      <div className="icon-box">
                        <div>
                          {/* <img src={globalIcon} alt="" /> */}
                          <LanguageRoundedIcon sx={{ width: "20px" }} />
                        </div>
                        <p>{zoneConverter(masjid?.location)}</p>
                      </div>
                    </div>
                    <div className="icon-box">
                      <div>
                        {/* <img src={facebookIcon} alt="" /> */}
                        <FacebookRoundedIcon sx={{ width: "20px" }} />
                      </div>
                      <p>{truncatedName}</p>
                    </div>
                  </div>
                  <div className="icon-box">
                    <div>
                      {/* <img src={locationIcon} alt="" /> */}
                      <LocationOnRoundedIcon sx={{ width: "20px" }} />
                    </div>
                    <p>{truncatedAddress}</p>
                  </div>
                  {/* <NoUpdate des={masjid?.description} id={admin?.masjids[0]} /> */}
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
