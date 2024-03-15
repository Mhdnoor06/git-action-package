import React from "react";
import { Card } from "@mui/material";
import moment from "moment";
import FajrIcon from "../../../../photos/prayerIcon/Group 1216.png";
import DhurIcon from "../../../../photos/prayerIcon/Group 1217.png";
import AsarIcon from "../../../../photos/prayerIcon/Group 1218.png";
import MaghribIcon from "../../../../photos/prayerIcon/Group 1219.png";
import IshaIcon from "../../../../photos/prayerIcon/Group 1220.png";
import noPrayer from "../../../../photos/prayerIcon/noPrayer.png";
import "./PrayerBox.css";
import { NamajTiming } from "../../../../redux/Types";
import { confirmation } from "../../../../helpers/HelperFunction";
import * as api from "../../../../api-calls/index";

export const icons: { [key: string]: string } = {
  Fajr: FajrIcon,
  Dhur: DhurIcon,
  Asar: AsarIcon,
  Maghrib: MaghribIcon,
  Isha: IshaIcon,
};

type propsType = {
  tZone: string;
  prayer: NamajTiming<number | string>[];
  children: React.ReactNode;
  timingId?: string;
  masjidId?: string;
  reloader?: () => void;
  date?: string;
};
const PrayerBox = ({ tZone, prayer, children, reloader, date }: propsType) => {
  const timeZoneHandler = (tm: number | string) => {
    if (typeof tm === "number")
      return moment.unix(tm)?.tz(tZone)?.format("hh:mm A");
    else return moment.tz(tm, "HH:mm", tZone).format("hh:mm A");
  };

  const normalStyle = `.PrayerTimings-box .Prayer-card-Tr td,
.PrayerTimings-box .Prayer-card-header th,
.PrayerTimings-box .Prayer-card-Tr th {
  width:25vw;
  text-align:center
  
}
`;

  // console.log(date);

  return (
    <Card className="prayer-box-card-container">
      {children}
      <>
        <style>{normalStyle}</style>
        <div className="PrayerTimings-box">
          {prayer?.length ? (
            <table>
              <thead>
                <tr className="Prayer-card-header">
                  <th>Prayer</th>
                  <th>Adhan</th>
                  <th>Iqama</th>
                </tr>
              </thead>
              <tbody>
                {prayer?.map((timing, index: number) => (
                  <tr className="Prayer-card-Tr" key={index}>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ marginRight: "5px" }}
                        src={icons[timing?.namazName]}
                        alt="Prayer icon"
                      />
                      {/* timing.namazName.length > 4
                        ? timing.namazName.slice(0, 4) + "...."
                        :  */}
                      {timing.namazName}
                    </td>
                    <td className="gray-time">
                      {timeZoneHandler(timing.azaanTime)}{" "}
                      {timing.ExtendedAzaanMinutes
                        ? ` +${timing.ExtendedAzaanMinutes}m`
                        : null}
                    </td>
                    <td className="gray-time">
                      {timeZoneHandler(timing.jamaatTime)}{" "}
                      {timing.TimesByJamaat !== "manual" &&
                      timing.ExtendedJamaatMinutes
                        ? ` +${timing.ExtendedJamaatMinutes}m`
                        : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div className="no-prayer">
                <img src={noPrayer} alt="NO Prayer" />
                <p>No Prayer Timings</p>
              </div>
            </>
          )}
        </div>
      </>
    </Card>
  );
};

export default PrayerBox;
