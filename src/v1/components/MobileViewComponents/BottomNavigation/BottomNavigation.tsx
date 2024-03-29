import React, { useEffect, useState, useRef } from "react";
import "./BottomNavigation.css";
import MobileViewCalender from "../MobileViewCalender/MobileViewCalender";
import MasjidProfile from "../MasjidProfile/MasjidProfile";
import SpecialPrayersComponent from "../SpecialPrayersComponent/SpecialPrayersComponent";
import EventsViewCalender from "../EventsComponent/EventsViewCalender/EventsViewCalender";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../../photos/Newuiphotos/nav bar/navicons/home.svg";
import prayerIcon from "../../../photos/Newuiphotos/nav bar/navicons/prayerT.svg";
import specialPrayerIcon from "../../../photos/Newuiphotos/nav bar/navicons/otherprayer.svg";
import eventIcon from "../../../photos/Newuiphotos/nav bar/navicons/events.svg";
import profileIcon from "../../../photos/Newuiphotos/nav bar/navicons/profile.svg";
import AnnouncementIcon from "../../../photos/Newuiphotos/nav bar/navicons/announcement.svg";
import homeIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/homeactive.svg";
import prayerIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/prayertactive.svg";
import specialPrayerIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/otherpactive.svg";
import eventIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/eventsactive.svg";
import profileIconActive from "../../..//photos/Newuiphotos/nav bar/navicons/navactiveicons/profileactive.svg";
import AnnouncementIconActive from "../../../photos/Newuiphotos/nav bar/navicons/navactiveicons/Announcementactive.svg";
import TermAndConditions from "../Shared/TermAndConditions";
import AdminProfile from "../AdminProfile/AdminProfile";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Announcement from "../Announcement/Announcement";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tmConOpener, setTmConOpener] = useState(false);
  const { tab } = useParams();
  const navigation = useNavigate();
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
    navigation("/feed/" + index);
    setActiveTab(index);
  };

  const navigationData = [
    {
      label: "Home",
      icon: homeIcon,
      activeIcon: homeIconActive,
      content: <MasjidProfile />,
    },
    {
      label: "Prayer Timing",
      icon: prayerIcon,
      activeIcon: prayerIconActive,
      content: <MobileViewCalender />,
    },
    {
      label: "Other Prayers",
      activeIcon: specialPrayerIconActive,
      icon: specialPrayerIcon,
      content: <SpecialPrayersComponent />,
    },

    {
      label: "Events",
      activeIcon: eventIconActive,
      icon: eventIcon,
      content: <EventsViewCalender />,
    },

    {
      label: "Announcement",
      activeIcon: AnnouncementIconActive,
      icon: AnnouncementIcon,
      content: <Announcement />,
    },
    {
      label: "Profile",
      activeIcon: profileIconActive,
      icon: profileIcon,
      content: <AdminProfile />,
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
    // initializeSwiper();
    // Add event listener for window resize
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
