import React, { useEffect, useState } from "react";
import logo from "../../../../photos/Newuiphotos/CM Logo/cmlogo-2.svg";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { LocationBasedToday } from "../../../../helpers/HelperFunction";
import SharePopover from "../../Shared/ShareModal/ShareModal";
import { QRCodeSVG } from "qrcode.react";
import playstore from "../../../../photos/Newuiphotos/storeicons/whiteplaystore.svg";
import applestore from "../../../../photos/Newuiphotos/storeicons/whiteapplestore.svg";
import locIcon from "../../../../photos/Newuiphotos/calenderIcons/locIcon.svg";
import phIcon from "../../../../photos/Newuiphotos/calenderIcons/phIcon.svg";
import netIcon from "../../../../photos/Newuiphotos/calenderIcons/netIcon.svg";
import mailIcon from "../../../../photos/Newuiphotos/calenderIcons/mailIcon.svg";
import azan from "../../../../photos/Newuiphotos/salahpageicons/azaan.svg";
import iqama from "../../../../photos/Newuiphotos/salahpageicons/iqama.svg";
import { useAppSelector } from "../../../../redux/hooks";
import { IExternalLinks } from "../../../../redux/Types";
import "./FullMonthCalendar.css";

const footerItemStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "#154F30",
  display: "flex",
  alignItems: "center",
};

const iconStyle: React.CSSProperties = {
  width: "10px",
  marginRight: "5px",
};

const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: "#FFD46D",
  color: "#3D5347",
  padding: "3px",
  textAlign: "center",
  border: "1px solid #ccc",
  fontSize: "9px",
  fontWeight: "bold",
};

const tableCellStyle: React.CSSProperties = {
  padding: "3px",
  textAlign: "center",
  border: "1px solid #ccc",
  fontSize: "9px",
  color: "#3D5347",
};

const jummahLabelStyle: React.CSSProperties = {
  width: "120px", // Fixed width for each Jummah label
  textAlign: "center",
  color: "#FFF",
  fontSize: "8px",
};

const jummahTimingStyle: React.CSSProperties = {
  width: "120px", // Fixed width for each Jummah timing
  textAlign: "center",
  fontSize: "8px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const iconButtonStyle: React.CSSProperties = {
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "10px",
  marginRight: "3px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
};

interface SalahTimings {
  date: string;
  day: string;
  fajrAzan: string;
  fajrIqama: string;
  ishraq: string;
  dhurAzan: string;
  dhurIqama: string;
  asarAzan: string;
  asarIqama: string;
  maghribAzan: string;
  maghribIqama: string;
  ishaAzan: string;
  ishaIqama: string;
}
interface FullMonthCalendarProps {
  componentRef: any;
  selectedDate: Date | null;
  tZone: string;
  timings: any;
  handlePrint: any;
  masjid: any;
}
const FullMonthCalendar = ({
  componentRef,
  selectedDate,
  tZone,
  timings,
  handlePrint,
  masjid,
}: FullMonthCalendarProps) => {
  const selectedDates = useAppSelector((state) => state.selectedDate);

  const startDate =
    selectedDates.length > 0 && selectedDates[0]
      ? moment(selectedDates[0]) // Convert string date to moment object
      : moment(LocationBasedToday(tZone));

  const qrUrl = `https://app.connectmazjid.com/share?type=masjid&key=6418878cccb079ecb57173e6&utm_source=widgets_webpage&utm_medium=event_detail&utm_campaign=${encodeURIComponent(
    `${masjid?.masjidName ?? ""}`
  )}`;
  const socialLinksHandler = (key: string, links: IExternalLinks[]) => {
    if (!links) return "";
    const matchedItems = links.find((link) => link.name === key);
    return matchedItems ? matchedItems.url : "";
  };

  return (
    <div
      ref={componentRef}
      className="printable-area" // Add the class here
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "3px",
        borderBottom: "1px solid #ccc",
        width: "60vw", // A4 width for screen view
        overflowY: "auto", // Scroll if necessary
        display: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px 0",
        }}
      >
        {/* Left Side: Masjid Logo and Name */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "12px", fontWeight: "bold" }}>
              {masjid?.masjidName ?? ""}
            </h1>
            <p style={{ margin: 0, fontSize: "10px" }}>
              {startDate.format("MMM, YYYY")}
            </p>
          </div>
        </div>

        {/* Right Side: Print, Download, Share Icons */}
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="cmlogo"
        >
          <img
            src={logo} // replace with the actual Connect Mazjid logo path
            alt="Connect Mazjid Logo"
            style={{ height: "25px", marginLeft: "3px" }}
          />
        </div>
      </div>

      {/* Salah Timings Table Header */}
      <div
        style={{
          marginTop: "3px",
          backgroundColor: "#154F30",
          color: "#FFF",
          padding: "3px",
        }}
        className="heading"
      >
        <h2 style={{ margin: 0, textAlign: "center", fontSize: "8px" }}>
          Salah Timings
        </h2>
      </div>

      {/* Salah Timings Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Day</th>
            <th style={tableHeaderStyle} colSpan={2}>
              Fajr
            </th>
            <th style={tableHeaderStyle}>Ishraq</th>
            <th style={tableHeaderStyle} colSpan={2}>
              Dhuhr
            </th>
            <th style={tableHeaderStyle} colSpan={2}>
              Asr
            </th>
            <th style={tableHeaderStyle} colSpan={2}>
              Maghrib
            </th>
            <th style={tableHeaderStyle} colSpan={2}>
              Isha
            </th>
          </tr>
        </thead>
        <tbody>
          {timings.length > 0 ? (
            timings.map((timing, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor:
                    timing.day === "Fri" ? "#CBFFE3" : "transparent",
                }}
              >
                <td style={tableCellStyle}>{timing.date}</td>
                <td style={tableCellStyle}>{timing.day}</td>
                <td style={tableCellStyle}>{timing.fajrAzan}</td>
                <td style={tableCellStyle}>{timing.fajrIqama}</td>
                <td style={tableCellStyle}>{timing.ishraq}</td>
                <td style={tableCellStyle}>{timing.dhurAzan}</td>
                <td style={tableCellStyle}>{timing.dhurIqama}</td>
                <td style={tableCellStyle}>{timing.asarAzan}</td>
                <td style={tableCellStyle}>{timing.asarIqama}</td>
                <td style={tableCellStyle}>{timing.maghribAzan}</td>
                <td style={tableCellStyle}>{timing.maghribIqama}</td>
                <td style={tableCellStyle}>{timing.ishaAzan}</td>
                <td style={tableCellStyle}>{timing.ishaIqama}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} style={{ textAlign: "center", color: "red" }}>
                No Salah Timings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* {specialTimesData && (
        <div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#154F30",
              padding: "5px 0",
              alignItems: "center",
            }}
          >
            {specialTimesData.map((special: any, index: number) => (
              <div
                key={index}
                style={jummahLabelStyle}
                className="jummahLabelStyle"
              >
                {special.name}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 0",
              color: "black",
            }}
          >
            {specialTimesData.map((special: any, index: number) => (
              <div
                key={index}
                style={jummahTimingStyle}
                className="jummahTimingStyle"
              >
                <img src={azan} alt="Azan" style={{ width: "10px" }} />{" "}
                {special.azaanTime
                  ? moment
                      .unix(special.azaanTime)
                      .tz(timeZone)
                      .format("hh:mm A")
                  : "-:-"}
                <img src={iqama} alt="Iqama" style={{ width: "10px" }} />
                {moment.unix(special.jamaatTime).tz(timeZone).format("hh:mm A")}
              </div>
            ))}
          </div>
        </div>
      )} */}
      <div
        style={{
          borderTop: "1px solid #ccc",
          padding: "10px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",

            justifyContent: "center",
            padding: "10px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={footerItemStyle} className="footerItemStyle">
              <img src={locIcon} alt="Location Icon" style={iconStyle} />
              {masjid?.address ?? ""}
            </div>
            <div style={footerItemStyle} className="footerItemStyle">
              <img src={phIcon} alt="Phone Icon" style={iconStyle} />
              {masjid?.contact ?? ""}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {socialLinksHandler("Website", masjid?.externalLinks ?? []) && (
              <div style={footerItemStyle} className="footerItemStyle">
                <img src={netIcon} alt="Web Icon" style={iconStyle} />
                {socialLinksHandler("Website", masjid?.externalLinks ?? [])}
              </div>
            )}

            {/* <div style={footerItemStyle} className="footerItemStyle">
              <img src={mailIcon} alt="Email Icon" style={iconStyle} />
              contact@annaislamiccenter.com
            </div> */}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {/* <img
        src={Qr}
        alt="QR Code"
        style={{ width: "30px" }}
        className="qr"
      /> */}
          <div
            className="qr-container"
            style={{ width: "100px", height: "100px" }}
          >
            <QRCodeSVG
              value={qrUrl}
              size={80}
              level="H"
              fgColor="#154F30"
              bgColor="transparent"
            />
          </div>
          <div style={{ fontSize: "8px", color: "#154F30" }}>
            SCAN TO DOWNLOAD
          </div>
        </div>
        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: "#154F30",
                display: "flex",
                alignItems: "center",
              }}
              className="footerItemStyle"
            >
              Download <span>ConnectMazjid</span> App Now!
              <a
                href="https://apps.apple.com/us/app/connectmazjid-prayer-masjid/id6446208222"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={applestore}
                  alt="App Store"
                  style={{ width: "16px", margin: "0 5px" }}
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=us.msasoftware.connectmazjid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={playstore}
                  alt="Play Store"
                  style={{ width: "16px" }}
                />
              </a>
            </div>
            <div style={{ marginTop: "15px" }}></div>
            <div
              style={{ fontSize: "10px", marginTop: "5px", color: "#154F30" }}
              className="footerItemStyle"
            >
              Real-time update from your Masjid at your Fingertips.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMonthCalendar;
