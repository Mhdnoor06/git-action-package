import React, { useEffect, useState, useRef } from "react";
import "./BottomNavigation.css";
import MobileViewCalender from "../MobileViewCalender/MobileViewCalender";
import MasjidProfile from "../MasjidProfile/MasjidProfile";
import OtherSalahComponent from "../OtherSalahComponents/OtherSalahComponent";
import EventsViewCalender from "../Events/EventsViewCalender/EventsViewCalender";
import { useParams } from "react-router";
import homeIcon from "../../../photos/Newuiphotos/nav bar/navicons/home.svg";
import prayerIcon from "../../../photos/Newuiphotos/nav bar/navicons/prayerT.svg";
import specialPrayerIcon from "../../../photos/Newuiphotos/nav bar/navicons/otherprayer.svg";
import eventIcon from "../../../photos/Newuiphotos/nav bar/navicons/events.svg";
import settingsIcon from "../../../photos/Newuiphotos/nav bar/navicons/settingsIcon.svg";
import AnnouncementIcon from "../../../photos/Newuiphotos/nav bar/navicons/announcement.svg";
import homeIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/homeactive.svg";
import prayerIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/prayertactive.svg";
import specialPrayerIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/otherpactive.svg";
import eventIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/eventsactive.svg";
import settingActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/settings.svg";
import AnnouncementIconActive from "../../../photos/Newuiphotos/nav bar/navicons/navactiveicons/Announcementactive.svg";
import TermAndConditions from "../Shared/TermsAndCondition/TermAndConditions";
import AdminProfile from "../AdminProfile/AdminProfile";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Announcement from "../Announcement/Announcement";
import { customNavigatorTo } from "../../../helpers/HelperFunction";
import { adminFromLocalStg } from "../../../helpers/AdminFromLocalStorage/AdminFromLocalStorage";
import { useNavigationprop } from "../../../../MyProvider";

const BottomNavigation = () => {
  const navigation = useNavigationprop();
  const localAdmin = adminFromLocalStg();
  const consumerMasjidId = localAdmin.masjids[0];
  const [activeTab, setActiveTab] = useState(0);
  const [tmConOpener, setTmConOpener] = useState(false);
  const { tab } = useParams();

  useEffect(() => {
    if (tab) setActiveTab(+tab);
  }, [tab]);

  const swiperRef = useRef(null);

  const initializeSwiper = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      const totalSlides = swiper.slides.length;
      let autoplayCounter = 0;

      swiper.slideTo(0, 0);

      const autoplayOnce = () => {
        if (swiper.activeIndex === 0) {
          if (autoplayCounter >= 1) {
            clearInterval(interval);
            return;
          } else {
            swiper.slideTo(totalSlides - 1, 500);
          }
        } else {
          swiper.slideTo(0, 500);
        }
        autoplayCounter++;
      };

      const interval = setInterval(autoplayOnce, 500);

      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    initializeSwiper();
  }, []);

  const handleTabChange = (index: number) => {
    if (navigation) navigation("/feed/" + index);
    else customNavigatorTo("/feed/" + index);

    setActiveTab(index);
  };

  const navigationData = [
    {
      label: "Home",
      icon: homeIcon,
      activeIcon: homeIconActive,
      content: (
        <MasjidProfile
          consumerMasjidId={consumerMasjidId}
          isMainAdmin={false}
        />
      ),
      onlyForMusalliAdmin: false,
    },
    {
      label: "Salah Timing",
      icon: prayerIcon,
      activeIcon: prayerIconActive,
      content: <MobileViewCalender consumerMasjidId={consumerMasjidId} />,
      onlyForMusalliAdmin: false,
    },
    {
      label: "Other Prayers",
      activeIcon: specialPrayerIconActive,
      icon: specialPrayerIcon,
      content: <OtherSalahComponent consumerMasjidId={consumerMasjidId} />,
      onlyForMusalliAdmin: false,
    },

    {
      label: "Events",
      activeIcon: eventIconActive,
      icon: eventIcon,
      content: <EventsViewCalender consumerMasjidId={consumerMasjidId} />,
      onlyForMusalliAdmin: false,
    },

    {
      label: "Announcement",
      activeIcon: AnnouncementIconActive,
      icon: AnnouncementIcon,
      content: <Announcement consumerMasjidId={consumerMasjidId} />,
      onlyForMusalliAdmin: false,
    },
    {
      label: "Settings",
      activeIcon: settingActive,
      icon: settingsIcon,
      content: <AdminProfile />,
      onlyForMusalliAdmin: false,
    },
  ];

  const conditionalImg = (idx: number, item: (typeof navigationData)[0]) => {
    const isActive = activeTab === idx ? true : false;
    return (
      <div>
        <img
          src={isActive ? item.activeIcon : item.icon}
          className={isActive ? "nav-icon-active" : "nav-icon"}
          alt={item.label}
        />
      </div>
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleWindowResize = () => {
    // Call getSlidesPerView when window is resized
    const slidesPerView = getSlidesPerView();
    // Update Swiper slidesPerView
    if (swiperRef.current) {
      swiperRef.current.swiper.params.slidesPerView = slidesPerView;
      swiperRef.current.swiper.update();
    }
  };

  const getSlidesPerView = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 350) return 4;
    else if (screenWidth >= 350 && screenWidth < 600) return 4;
    else return 6;
  };

  return (
    <div className="bottom-nav-container">
      <TermAndConditions
        tmConOpener={tmConOpener}
        setTmConOpener={setTmConOpener}
      />
      <div
        className={`bottom-nav-component ${activeTab !== 0 ? "d-flex" : ""}`}
      >
        {navigationData[activeTab].content}
      </div>
      <div className="bottom-nav-with-condition">
        <div className="bottom-navigation">
          <Swiper
            data-testid="group"
            ref={swiperRef}
            slidesPerView={getSlidesPerView()}
            // modules={[Autoplay, Pagination, Navigation]}
          >
            {navigationData.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  key={index}
                  className={`nav-item ${activeTab === index ? "active" : ""}`}
                  onClick={() => handleTabChange(index)}
                >
                  {conditionalImg(index, item)}
                  <span
                    className={
                      activeTab === index ? "nav-label-active" : "nav-label"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <h1 className="term-condition-tx" onClick={() => setTmConOpener(true)}>
          Term and Conditions
        </h1>
      </div>
    </div>
  );
};

export default BottomNavigation;
