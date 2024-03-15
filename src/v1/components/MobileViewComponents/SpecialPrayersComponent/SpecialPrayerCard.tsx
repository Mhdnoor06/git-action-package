import { Card, Table } from "@mui/material";
import React, { useState } from "react";
// import moment from "moment-timezone";
// import noPrayer from "../../../photos/prayerIcon/noPrayer.png";
import edit from "../../../photos/Newuiphotos/Icons/Edit.svg";
import del from "../../../photos/Newuiphotos/Icons/delete.svg";
import { SpecialPrayer } from "../../../redux/Types";
// import Loader from "../../../pages/Authpages/Loader/Loader";
// import { icons } from "../Shared/PrayerBox/PrayerBox";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import { dateFormatter, tmFormatter } from "../../../helpers/HelperFunction";

type propsType = {
  tZone: string;
  isInitialLoaded: boolean;
  hasPrayers: boolean;
  prayer: SpecialPrayer<number>;
  handleEdit: (val: SpecialPrayer<number>) => void;
  handleDelete: (val: string) => void;
  children?: React.ReactNode;
};

const SpecialPrayerCard = ({
  hasPrayers,
  prayer,
  tZone,
  handleEdit,
  isInitialLoaded,
  handleDelete,
  children,
}: propsType) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  // const tmFormatter = (tm: number | undefined) => {
  //   if (tm && tZone) return moment.unix(tm).tz(tZone).format("hh:mm A");
  //   else return "---:---";
  // };

  // const DateFormatter = (date: string) => {
  //   return moment(date.slice(0, 10), "YYYY-MM-DD").format("DD-MMM-YYYY");
  // };

  return (
    <>
      {" "}
      <Card className="special-card">
        <Table>
          <thead>
            <tr className="Prayer-card-header">
              <th>Prayer</th>
              <th>Adhan</th>
              <th>Iqama</th>
              {!children && <th></th>}
            </tr>
          </thead>
          <tbody>
            {/* {!hasPrayers ? (
              <tr>
                <td colSpan={4}>
                  {isInitialLoaded ? (
                    <Loader />
                  ) : (
                    <div className="noPrayerContainer">
                      <img src={noPrayer} alt="NO Prayer" />
                      <p>No Special Prayer Found</p>
                    </div>
                  )}
                </td>
              </tr>
            ) : ( */}
            <tr>
              <td>
                <div
                  style={{
                    // paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "60px",
                  }}
                >
                  {/* <div className="titleIcon">
                    <img src={icons.Dhur} className="edit-img" alt="edit img" />
                  </div> */}
                  <p className="titleIcon" style={{ margin: "5px 0" }}>
                    {prayer.name?.length > 6
                      ? prayer.name.substring(0, 6) + ".."
                      : prayer.name}
                  </p>
                </div>
              </td>
              <td>{tmFormatter(prayer.azaanTime, tZone)}</td>
              <td>{tmFormatter(prayer.jamaatTime, tZone)}</td>
              {!children && (
                <td className="action-container">
                  <img
                    src={edit}
                    className="edit-img"
                    alt="edit img"
                    onClick={() => handleEdit(prayer)}
                  />
                  <img
                    src={del}
                    className="del-img"
                    alt="delete img"
                    onClick={() => setShowDeleteWarning(true)}
                  />
                </td>
              )}
            </tr>
            {/* )} */}
          </tbody>
        </Table>
        <div className="special-date-container">
          <p> Start Date: {dateFormatter(prayer.startDate)}</p>
          <p>End Date: {dateFormatter(prayer.endDate)}</p>
        </div>

        {children}
      </Card>
      {showDeleteWarning && (
        <DeleteWarningCard
          wariningType="Delete"
          warining="Are you sure you want to
        Delete (Jummah) Special Timing ?"
          onClose={() => setShowDeleteWarning(false)}
          onConfirm={() => {
            setShowDeleteWarning(false);
            handleDelete(prayer._id ?? "");
          }}
        />
      )}
    </>
  );
};

export default SpecialPrayerCard;
