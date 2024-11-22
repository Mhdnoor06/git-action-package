import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import FajrIcon from "../../../../photos/Newuiphotos/Icons/prayerIcons/Fajar.webp";
import DhurIcon from "../../../../photos/Newuiphotos/Icons/prayerIcons/dhur.webp";
import AsarIcon from "../../../../photos/Newuiphotos/Icons/prayerIcons/asr.webp";
import MaghribIcon from "../../../../photos/Newuiphotos/Icons/prayerIcons/magrib.webp";
import IshaIcon from "../../../../photos/Newuiphotos/Icons/prayerIcons/isha.webp";
import noPrayer from "../../../../photos/Newuiphotos/Icons/prayerIcons/nosalahtiming.webp";
import "./PrayerBox.css";
import { NamajTiming } from "../../../../redux/Types";
import "../../../Widgets/PrayerTimgeWidgets.css";
import ProgressLoader from "../Loader/Loader";

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
  loading?: boolean;
};
const PrayerBox = ({
  tZone,
  prayer,
  children,
  reloader,
  date,
  loading,
}: propsType) => {
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

  return (
    <div className="prayerTable">
      {loading ? (
        <ProgressLoader />
      ) : (
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
                  Salah
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
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="left" // Changed from center to left
                      style={{
                        padding: "10px", // Adjust padding as needed
                        display: "table-cell", // Ensuring default table cell display
                      }}
                    >
                      <img
                        src={icons[row.namazName]}
                        alt=""
                        style={{
                          width: "25px",
                          height: "25px",
                          marginRight: "10px", // Spacing between icon and text, adjust as needed
                          verticalAlign: "middle", // Align icon vertically with text
                        }}
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
                    <TableCell align="center" sx={{ padding: "3px" }}>
                      {row.jamaatTime && row.TimesByJamaat !== "No Iqama"
                        ? row.TimesByJamaat === "solar"
                          ? timeZoneHandler(
                              moment(row.jamaatTime, "HH:mm")
                                // .add(row.ExtendedJamaatMinutes, "minutes")
                                .format("HH:mm")
                            )
                          : timeZoneHandler(row.jamaatTime)
                        : "-:-"}
                      {/* {row.TimesByJamaat !== "manual" &&
                        row.ExtendedJamaatMinutes
                          ? row.ExtendedJamaatMinutes >= 0
                            ? ` (+${row.ExtendedJamaatMinutes}m)`
                            : ` (${row.ExtendedJamaatMinutes}m)`
                          : null} */}
                      {row.azaanTime && row.jamaatTime ? (
                        <div style={{ fontSize: "0.75em", color: "#1B8368" }}>
                          {reloader &&
                          row.jamaatTime &&
                          row.TimesByJamaat !== "No Iqama" &&
                          row.iqamahType === "solar"
                            ? `(Azan ${
                                row?.offset?.iqamah >= 0
                                  ? `+ ${row.offset.iqamah}`
                                  : row.offset.iqamah
                              }min)`
                            : !reloader &&
                              row.jamaatTime &&
                              row.TimesByJamaat !== "No Iqama" &&
                              row.TimesByJamaat === "solar"
                            ? `(Azan ${
                                row.ExtendedJamaatMinutes >= 0
                                  ? `+ ${row.ExtendedJamaatMinutes}`
                                  : row.ExtendedJamaatMinutes
                              }min)`
                            : ""}
                        </div>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <div className="notavailable">
                      <div>
                        <img
                          src={noPrayer}
                          alt="no prayer"
                          style={{ width: "200px" }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PrayerBox;
