import React from "react";
import "./LandingFeedPage.css";
import TimingsCard from "../../../../components/Feedcomponents/FeedTimingsCard/TimingsCard";
import CardCarousel from "../../../../components/Feedcomponents/FeedCardCarousel/CardCarousel";
import MasjidProfileCard from "../../../../components/ProfileComponents/MasjidProfileComponent/MasjidProfileComponent";

const LandingFeedPage = () => {
  return (
    <>
      <div className="DashboardCOmponentsFlexBox">
        <div className="DasboardleftComponent">
          <div className="DashboardMasjidTimingsContainer">
            <TimingsCard />
          </div>

          <div className="DashboardMasjidProfileContainer">
            <MasjidProfileCard />
          </div>
        </div>
        <div className="DasboardRightComponent">
      <div className="DashboardEventsCarouselContainer">
        <CardCarousel carouselName={"Event"} />
      </div>
      <div className="DashboardAnnoucementsCarouselContainer">
        <CardCarousel carouselName={"Announcement"} />
      </div>
      </div>
      </div>
    </>
  );
};

export default LandingFeedPage;
