import React from "react";
import { useAppSelector } from "../../../Redux/hooks";
import SideBar from "../../../Components/FeedComponents/SideBar/SideBar";
import TopBar from "../../../Components/FeedComponents/TopBar/TopBar";

const PageContainer = ({ children }: any) => {
  const sidebarState = useAppSelector((state) => state.sidebarState);
  return (
    <div className="HomeContainer2">
      {sidebarState ? (
        <div className="LeftContainer">
          <SideBar />
        </div>
      ) : (
        <div className="LeftContainerClose">
          <SideBar />
        </div>
      )}
      <div className="RightContainer2">
        <div className="RightTopContainer">
          <TopBar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
