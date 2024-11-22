import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import toast from "react-hot-toast";
import proflePlaceholer from "../../../photos/Newuiphotos/home icon/profile_placeholder.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./Menu.css"; // CSS file for custom styling
import InfoIcon from "@mui/icons-material/Info";

// Icons Import
import AboutIcon from "../../../photos/Newuiphotos/menuIcons/about.webp";
import SalahIcon from "../../../photos/Newuiphotos/menuIcons/salah.webp";

import Widget from "../../../photos/Newuiphotos/menuIcons/widgetsIcon.svg";
import EventIcon from "../../../photos/Newuiphotos/menuIcons/event.webp";
import Profile from "../../../photos/Newuiphotos/menuIcons/profile.webp";
import TvIcon from "../../../photos/Newuiphotos/menuIcons/connectTv.webp";
import ServicesIcon from "../../../photos/Newuiphotos/menuIcons/services.webp";
import Members from "../../../photos/Newuiphotos/menuIcons/members.webp";
import Donation from "../../../photos/Newuiphotos/menuIcons/donation.svg";
import boardMember from "../../../photos/Newuiphotos/menuIcons/boardmember.webp";
import circledollar from "../../../photos/Newuiphotos/menuIcons/circledollar.webp";
import contactUsIcon from "../../../photos/Newuiphotos/menuIcons/contactus.webp";

import AnnouncementIcon from "../../../photos/Newuiphotos/menuIcons/announcement.svg";
import program from "../../../photos/Newuiphotos/menuIcons/program.webp";
import { adminFromLocalStg } from "../../../helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import MobileViewCalender from "../MobileViewCalender/MobileViewCalender";
import OtherSalahComponent from "../OtherSalahComponents/OtherSalahComponent";
import EventsViewCalender from "../Events/EventsViewCalender/EventsViewCalender";
import Announcement from "../Announcement/Announcement";
import AdminProfile from "../AdminProfile/AdminProfile";
import MasjidProfile from "../MasjidProfile/MasjidProfile";
import TvConnection from "../TvConnectionPage/TvConnection";
import TermAndConditions from "../Shared/TermsAndCondition/TermAndConditions";
import Donations from "../Donation/Donations";
import Services from "../Services/Main/Services";
import { useQuery } from "@apollo/client";
import { getMasjid, getMasjidById } from "../../../graphql-api-calls";
import Programs from "../Programs/Main/Programs";
import BoardMember from "../BoardMember/Main/BoardMember";
import Payments from "../Payments/Payments";
import SalahTimings from "../MobileViewCalender/SalahTimings/SalahTimings";
import ContactForm from "../ContactForm/ContactForm";
import WebWidgets from "../WebWidgets/WidgetsPage/WebWidgets";
import { authLogout } from "../../../redux/actions/AuthActions/LogoutAction";

const Menu = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const localAdmin = adminFromLocalStg();
  let admin = useAppSelector((state) => state.admin);
  const consumerMasjidId = localAdmin.masjids[0];
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [masjid, setMasjid] = useState<any>(null);
  const dispatch = useAppThunkDispatch();
  const { tab } = useParams();
  const [followers, setFollowers] = useState<number>(0); // Sample follower count
  const [myMasjidCount, setMyMasjidCount] = useState<number>(0); // Sample My Masjid count
  const [activeTab, setActiveTab] = useState<number>(0);
  const [tmConOpener, setTmConOpener] = useState(false);
  const [isAdminMasjidStateLoaded, setIsAdminMasjidStateLoaded] =
    useState(false);
  // Ensure that openFollowersTooltip and openMusaliTooltip are initialized
  const [openFollowersTooltipMobile, setOpenFollowersTooltipMobile] =
    useState(false);
  const [openMusaliTooltipMobile, setOpenMusaliTooltipMobile] = useState(false);
  const [openFollowersTooltipDesktop, setOpenFollowersTooltipDesktop] =
    useState(false);
  const [openMusaliTooltipDesktop, setOpenMusaliTooltipDesktop] =
    useState(false);

  // Handler function to toggle the tooltip state
  const handleTooltipToggle = (setTooltipState: any) => {
    console.log("clicked");
    setTooltipState((prev: any) => !prev);
  };

  const masjidAPIRequest = () => {
    const response = dispatch(fetchMasjidById(consumerMasjidId));
    response.then(function (result) {
      if (result?.masjidName) {
        setMasjid(result);
      } else {
        toast.error("Unable to fetch Masjid data");
      }
    });
  };

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
    checkIsMasjidAssigned();
  }, []);
  useEffect(() => {
    if (consumerMasjidId && !AdminMasjidState?.masjidName) {
      masjidAPIRequest();
    } else if (AdminMasjidState?.masjidName) {
      setMasjid(AdminMasjidState);
    }
  }, [consumerMasjidId, AdminMasjidState?.masjidName]);

  useEffect(() => {
    if (tab) setActiveTab(+tab);

    if (AdminMasjidState && AdminMasjidState.lastEditor) {
      setIsAdminMasjidStateLoaded(true);
    }
  }, [tab, AdminMasjidState]);

  const { loading, error, data } = useQuery(getMasjidById(), {
    variables: {
      id: consumerMasjidId,
    },
    skip: !AdminMasjidState?.masjidName,
  });

  useEffect(() => {
    if (data?.getMasjidById) {
      setFollowers(data?.getMasjidById.followers ?? 0);
      setMyMasjidCount(data?.getMasjidById.subscribers ?? 0);
    }
  }, [data]);

  if (!AdminMasjidState) {
    return <div>Loading...</div>; // or some kind of loading spinner
  } // Menu items
  const menuItems = [
    {},
    {
      label: "About Masjid",
      link: "/feed/1",
      icon: AboutIcon,
      content: (
        <MasjidProfile
          consumerMasjidId={consumerMasjidId}
          isMainAdmin={false}
        />
      ),
    },

    {
      label: "Salah Timings",
      link: "/feed/2",
      icon: SalahIcon,

      // content: <MobileViewCalender consumerMasjidId={consumerMasjidId} />,
      content: <SalahTimings consumerMasjidId={consumerMasjidId} />,
    },
    {},
    {
      label: "Events",
      link: "/feed/4",
      icon: EventIcon,

      content: <EventsViewCalender consumerMasjidId={consumerMasjidId} />,
    },
    {
      label: "Announcements",
      link: "/feed/5",
      icon: AnnouncementIcon,
      content: <Announcement consumerMasjidId={consumerMasjidId} />,
    },
    {
      label: "Donations",
      link: "/feed/6",
      icon: Donation,
      content: <Donations consumerMasjidId={consumerMasjidId} />,
    },

    {
      label: "Services",
      link: "/feed/7",
      icon: ServicesIcon,
      content: <Services consumerMasjidId={consumerMasjidId} />,
    },
    {
      label: "Connect TV",
      link: "/feed/8",
      icon: TvIcon,

      content: <TvConnection />,
    },
    {
      label: "Programs",
      link: "/feed/9",
      icon: program,
      content: <Programs consumerMasjidId={consumerMasjidId} />,
    },
    {
      label: "Board Member",
      link: "/feed/10",
      icon: boardMember,
      content: <BoardMember consumerMasjidId={consumerMasjidId} />,
    },
    {
      label: "Web Widgets",
      link: "/feed/11",
      icon: Widget,
      content: <WebWidgets consumerMasjidId={consumerMasjidId} />,
    },
    {
      label: "Profile",
      link: "/feed/12",
      icon: Profile,
      content: <AdminProfile />,
    },

    {
      label: "Payments",
      link: "/feed/13",
      icon: circledollar,

      content: <Payments consumerMasjidId={consumerMasjidId} />,
    },
    {
      label: "Contact Form",
      link: "/feed/14",
      icon: contactUsIcon,
      content: <ContactForm consumerMasjidId={consumerMasjidId} />,
    },
  ];

  return (
    <>
      {activeTab === 0 ? (
        <div className="home_main_container">
          <div className="home_desktop">
            <div className="masjid_header">
              <img
                src={masjid?.masjidProfilePhoto || proflePlaceholer}
                alt="Masjid"
                className="header-image"
              />
              <span className="header-name">{masjid?.masjidName}</span>
              <span className="header-followers">
                <b>{followers}</b>
                <b className="label">
                  Follower
                  <Tooltip
                    title="Users who have subscribed to receive updates from your Masjid, including events, programs, etc."
                    arrow
                    open={openFollowersTooltipDesktop}
                    onClose={() => setOpenFollowersTooltipDesktop(false)}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          padding: "10px",
                          backgroundColor: "white",
                          color: "#1D785A",
                          fontSize: "12px",
                          width: "280px",
                          borderRadius: "15px",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "white",
                        },
                      },
                    }}
                  >
                    {/* <IconButton> */}
                    <InfoIcon
                      onClick={() =>
                        handleTooltipToggle(setOpenFollowersTooltipDesktop)
                      }
                      style={{
                        color: "#3D5347",
                        marginLeft: "5px",
                        fontSize: "15px",
                      }}
                    />
                    {/* </IconButton> */}
                  </Tooltip>
                </b>
              </span>
              <span className="header-myMasjid">
                <b>{myMasjidCount}</b>{" "}
                <b className="label">
                  Musali
                  <Tooltip
                    title="Users who has set salah timing based on your masjid."
                    arrow
                    open={openMusaliTooltipDesktop}
                    onClose={() => setOpenMusaliTooltipDesktop(false)}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          padding: "10px",
                          backgroundColor: "white",
                          color: "#1D785A",
                          fontSize: "12px",
                          borderRadius: "10px",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <InfoIcon
                      onClick={() =>
                        handleTooltipToggle(setOpenMusaliTooltipDesktop)
                      }
                      style={{
                        color: "#3D5347",
                        marginLeft: "5px",
                        fontSize: "15px",
                      }}
                    />
                  </Tooltip>
                </b>
              </span>
            </div>
          </div>
          <div className="slider-container">
            <div className="slider-container-1">
              <Slider {...settings}>
                {masjid?.masjidPhotos?.length > 0 ? (
                  masjid?.masjidPhotos?.map((photo: any, index: number) => (
                    <div key={index} className="slide">
                      <img
                        src={photo.url}
                        alt={`Masjid Slide ${index}`}
                        className="slide-image"
                      />
                    </div>
                  ))
                ) : (
                  <div className="slide">
                    <img
                      src={proflePlaceholer}
                      alt={`Masjid Slide}`}
                      className="slide-image"
                    />
                  </div>
                )}
              </Slider>
            </div>

            <div className="profile-section">
              <div className="followers">
                <div className="count">{followers}</div>
                <div className="label">
                  Followers
                  <Tooltip
                    disableFocusListener
                    disableHoverListener
                    className="followers-tooltip"
                    title="Users who have subscribed to receive updates from your Masjid, including events, programs, etc."
                    arrow
                    open={openFollowersTooltipMobile}
                    onClose={() => {
                      console.log("close");
                      setOpenFollowersTooltipMobile(false);
                    }}
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -14],
                          },
                        },
                      ],
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "white",
                          color: "#1D785A",
                          fontSize: "12px",
                          width: "280px",
                          borderRadius: "15px",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "white",
                        },
                      },
                    }}
                  >
                    {/* <IconButton> */}
                    <InfoIcon
                      onClick={() =>
                        handleTooltipToggle(setOpenFollowersTooltipMobile)
                      }
                      style={{
                        color: "#3D5347",
                        marginLeft: "5px",
                        fontSize: "15px",
                      }}
                    />
                    {/* </IconButton> */}
                  </Tooltip>
                </div>
              </div>
              <div className="profile-image-container">
                <img
                  src={masjid?.masjidProfilePhoto || proflePlaceholer}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
              <div className="my-masjid">
                <div className="count">{myMasjidCount}</div>
                <div className="label">
                  Musali
                  <Tooltip
                    disableFocusListener
                    disableHoverListener
                    className="musali-tooltip"
                    title="Users who has set salah timing based on your masjid."
                    arrow
                    open={openMusaliTooltipMobile}
                    onClose={() => setOpenMusaliTooltipMobile(false)}
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -14],
                          },
                        },
                      ],
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "white",
                          color: "#1D785A",
                          fontSize: "12px",
                          borderRadius: "10px",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <InfoIcon
                      onClick={() =>
                        handleTooltipToggle(setOpenMusaliTooltipMobile)
                      }
                      style={{
                        color: "#3D5347",
                        marginLeft: "5px",
                        fontSize: "15px",
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="menu-container">
              <b className="header-name-1">{masjid?.masjidName}</b>

              <Grid container spacing={0} style={{ padding: 0 }}>
                {menuItems.map((item, index) => {
                  const restrictedItems = [
                    "Donations",
                    "Services",
                    "Payments",
                    "Board Member",
                    // "Connect TV",
                  ];

                  if (
                    index === 0 ||
                    // index === 9 ||
                    index === 3 ||
                    // index === 13 ||
                    !admin ||
                    (admin.role !== "subadmin" &&
                      admin.role !== "superadmin" &&
                      restrictedItems.includes(item.label))
                  ) {
                    return null;
                  }
                  return (
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={3}
                      key={index}
                      style={{ padding: "5px" }}
                    >
                      <Card
                        component={Link}
                        to={item.link}
                        onClick={() => setActiveTab(index)}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: { xs: "15vh", sm: "16vh", md: "20vh" },
                          borderRadius: "10px",
                          textDecoration: "none",
                        }}
                      >
                        <CardActionArea sx={{ height: "100%" }}>
                          <CardContent sx={{ textAlign: "center", padding: 0 }}>
                            <Box
                              component="img"
                              src={item.icon}
                              alt={item.label}
                              sx={{
                                width: { xs: 25, sm: 30, md: 35 },
                                height: { xs: 25, sm: 30, md: 35 },
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: {
                                  xs: "0.8rem",
                                  sm: "0.8rem",
                                  md: "0.9rem",
                                },
                                lineHeight: "1rem",
                                color: "#1D785A",
                                fontWeight: "bold",
                                marginTop: "10px",
                                textDecoration: "none",
                              }}
                            >
                              {item.label}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </div>
      ) : (
        <div className="content-container">{menuItems[activeTab].content}</div>
      )}
      <TermAndConditions
        tmConOpener={tmConOpener}
        setTmConOpener={setTmConOpener}
      />
      <footer className="terms-footer">
        <Typography
          variant="subtitle2"
          style={{
            textAlign: "center",
            color: "#33443B",
            textDecoration: "underline",
          }}
          onClick={() => setTmConOpener(true)}
        >
          Terms and Conditions
        </Typography>
      </footer>
    </>
  );
};

export default Menu;
