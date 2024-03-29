import React from "react";
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import FajrIcon from "../../../../photos/prayerIcon/Group 1216.png";
import DhurIcon from "../../../../photos/prayerIcon/Group 1217.png";
import AsarIcon from "../../../../photos/prayerIcon/Group 1218.png";
import MaghribIcon from "../../../../photos/prayerIcon/Group 1219.png";
import IshaIcon from "../../../../photos/prayerIcon/Group 1220.png";
import noPrayer from "../../../../photos/prayerIcon/noPrayer.png";
import "./PrayerBox.css";
import { NamajTiming } from "../../../../redux/Types";
import "../../../Widgets/PrayerTimgeWidgets.css";

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
    <div className="prayerTable">
      <TableContainer
        component={Paper}
        style={{ width: "100%", boxShadow: "none", borderRadius: "20px" }}
      >
        {children}
        <Table
          aria-label="prayer timings table"
          sx={{ borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow sx={{ border: "none" }}>
              <TableCell
                align="center"
                style={{
                  fontWeight: 700,
                  color: "#A5A5A5",
                  padding: " 12px",
                }}
              >
                Prayer
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: 700,
                  color: "#A5A5A5",
                  padding: " 12px",
                }}
              >
                Azan
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: 700,
                  color: "#A5A5A5",
                  padding: " 12px",
                }}
              >
                Iqama
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prayer?.length !== 0 ? (
              prayer?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    border: "none",
                    fontWeight: "700",
                    fontFamily: "Inter sans-serif",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={
                      window.innerWidth <= 320
                        ? {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px",
                          }
                        : {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px",
                          }
                    }
                  >
                    <img
                      src={icons[row.namazName]}
                      alt=""
                      style={{ width: "25px", height: "25px" }}
                    />
                    {row.namazName}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={
                      window.innerWidth <= 320
                        ? { padding: " 7px" }
                        : { padding: "10px" }
                    }
                  >
                    {timeZoneHandler(row.azaanTime)}
                    {row.ExtendedAzaanMinutes
                      ? row.ExtendedAzaanMinutes >= 0
                        ? `(+${row.ExtendedAzaanMinutes}m)`
                        : `(${row.ExtendedAzaanMinutes}m)`
                      : null}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: " 3px" }}>
                    {row.jamaatTime ? timeZoneHandler(row.jamaatTime) : ""}
                    {row.TimesByJamaat !== "manual" && row.ExtendedJamaatMinutes
                      ? row.ExtendedJamaatMinutes >= 0
                        ? ` (+${row.ExtendedJamaatMinutes}m)`
                        : `( ${row.ExtendedJamaatMinutes}m)`
                      : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <div className="notavailable">
                    <div>
                      <img src={noPrayer} alt="" />
                      <p>"Prayer timings are not updated"</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PrayerBox;
