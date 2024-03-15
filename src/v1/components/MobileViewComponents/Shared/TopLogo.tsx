import React from "react";
import LogoMain from "../../../photos/LogoMain.png";

const TopLogo = () => {
  const logoStyle = `
    .Logo-Azan-MobileView {

        align-items: center;
        justify-content: space-between;
        .Logo-MobileView{
            height: 10vh;
            width: auto;
          }
      }`;
  return (
    <div className="Logo-Azan-MobileView">
      <img src={LogoMain} alt="my masjid icon" className="Logo-MobileView" />
    </div>
  );
};

export default TopLogo;
