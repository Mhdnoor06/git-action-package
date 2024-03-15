import React from "react";
import { Link } from "react-router-dom";

const CustomBtn = ({
  imgSrc,
  tx,
  route,
}: {
  imgSrc: string;
  tx: string;
  route: string;
}) => {
  return (
    <Link to={`/${route}`} style={{ textDecoration: "none" }}>
      <button className="Dashboard-Btn">
        <img src={imgSrc} style={{marginRight:"5px"}} alt="mymasjidicon" className="Timings-MobileView" />
        <span > {tx}</span>
      </button>
    </Link>
  );
};

export default CustomBtn;
