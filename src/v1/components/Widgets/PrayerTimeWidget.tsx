import React, { useState, useEffect } from "react";
import "./PrayerTimgeWidgets.css";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";//feature implimentaion
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";//feature implimentaion
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FajarIcon from "./Icons/fajar.svg";
import DuharIcon from "./Icons/duhar.svg";
import AsrIcon from "./Icons/asr.svg";
import MagribIcon from "./Icons/magrib.svg";
import IshaIcon from "./Icons/isha.svg";
import IshraqIcon from "./Icons/ishraq.svg";
import Azaan from "./Icons/azaan.svg";
import Iqama from "./Icons/iqama.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { SpecialPrayer, WidgetNamazTiming } from "../../redux/Types";
import moment from "moment-timezone";
import noPrayer from "../../photos/prayerIcon/noPrayer.svg";
import SunCalc from "suncalc";
import styles from "./Widgets.module.css";

const icons: { [key: string]: string } = {
  Fajr: FajarIcon,
  Dhur: DuharIcon,
  Asar: AsrIcon,
  Maghrib: MagribIcon,
  Isha: IshaIcon,
  Azaan: Azaan,
  Iqama: Iqama,
  Ishraq: IshraqIcon,
};

interface PrayerTimeWidgetProps {
  widgetData: WidgetNamazTiming<number>[] | null;
  specialPrayerData: SpecialPrayer<number>[] | null;
  tZone: string;
  lat: string;
  lon: string;
}

const PrayerTimeWidget: React.FC<PrayerTimeWidgetProps> = ({
  widgetData,
  specialPrayerData,
  tZone,
  lat,
  lon,
}) => {
  const [hijiriDate, setHijjiriDate] = useState("");
  const [sunriseTime, setSunriseTime] = useState<number>();

  const apiUrl = (date: Date, address: string) =>
    `https://api.aladhan.com/v1/timingsByAddress/${date}?address=${address}`;

  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        const response = await fetch(apiUrl(new Date(), "america"));
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const apiResponse = data.data;
        const hijriFormattedDate = `${apiResponse.date.hijri.month.en} ${
          apiResponse.date.hijri.day - 1
        }, ${apiResponse.date.hijri.year}`;
        setHijjiriDate(hijriFormattedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHijriDate();
  }, []);

  useEffect(() => {
    const latitude = Number(lat);
    const longitude = Number(lon);
    const { sunrise } = SunCalc.getTimes(new Date(), latitude, longitude);
    const sunriseUnix = sunrise.getTime() / 1000;
    setSunriseTime(sunriseUnix);
  }, [lat, lon]);

  const timeZoneHandler = (tm: number | string) => {
    return typeof tm === "number"
      ? moment.unix(tm).tz(tZone).format("hh:mm A")
      : moment.tz(tm, "HH:mm", tZone).format("hh:mm A");
  };

  const convertedDate = moment().tz(tZone).format("ddd, DD MMMM, YYYY");

  let ishraqTime: number | undefined = sunriseTime
    ? sunriseTime + 15 * 60
    : undefined;

  const ishraqPrayer = {
    namazName: "Ishraq",
    azaanTime: ishraqTime,
    jamaatTime: null,
    _id: "ishraq_unique_id",
  };

  const updatedWidgetData = [...widgetData];

  const fajrIndex = updatedWidgetData.findIndex(
    (prayer) => prayer.namazName === "Fajr"
  );
  if (fajrIndex !== -1) {
    updatedWidgetData.splice(fajrIndex + 1, 0, ishraqPrayer);
  }

  return (
    <div className="scr">
      <div className="PrayerBox">
        <div className="IslamicDate">
          {/* <div className="left">
            <KeyboardArrowLeftIcon sx={{ width: "15px" }} />
          </div> */}
          <div className="mid">
            <div>{hijiriDate}</div>
            <div>{`(${convertedDate})`}</div>
          </div>
          {/* <div className="right">
            <KeyboardArrowRightIcon sx={{ width: "15px" }} />
          </div> */}
        </div>
        <div className="prayerTable">
          <TableContainer
            component={Paper}
            style={{ width: "100%", boxShadow: "none" }}
          >
            <Table
              aria-label="prayer timings table"
              sx={{ borderCollapse: "collapse" }}
            >
              <TableHead>
                <TableRow>
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
                {updatedWidgetData?.length !== 0 ? (
                  updatedWidgetData?.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: " 10px",
                        }}
                      >
                        <img
                          src={icons[row.namazName]}
                          alt=""
                          style={{ width: "25px", height: "25px" }}
                        />
                        {row.namazName}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: " 10px" }}>
                        {timeZoneHandler(row.azaanTime)}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: " 10px" }}>
                        {row.jamaatTime ? timeZoneHandler(row.jamaatTime) : ""}
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

        <div className="OtherPrayerContainer">
          <div className="OtherPrayer">
            {specialPrayerData?.length != 0 ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={
                  specialPrayerData && specialPrayerData.length
                    ? specialPrayerData.length > 2
                      ? 1.4
                      : specialPrayerData.length === 2
                      ? 1.4
                      : 1
                    : 1
                }
                style={
                  specialPrayerData?.length === 1
                    ? { marginLeft: 0, padding: "10px" }
                    : { padding: "10px" }
                }
              >
                {specialPrayerData?.map((timing, index) => (
                  <SwiperSlide
                    key={index}
                    style={
                      specialPrayerData.length === 1
                        ? { maxWidth: "200px" }
                        : {}
                    }
                  >
                    <div className="box">
                      <b>{timing.name}</b>
                      <div
                        className="WidgetSpecialTimingBox"
                        style={!timing.azaanTime ? { gap: "0" } : {}}
                      >
                        <div className="WidgetSpecialTiming">
                          {" "}
                          <span
                            style={
                              !timing.azaanTime
                                ? { display: "none", gap: "0" }
                                : {}
                            }
                          >
                            <img src={icons["Azaan"]} alt="" />
                            <b>
                              {timing.azaanTime
                                ? timeZoneHandler(timing.azaanTime)
                                : "---"}
                            </b>
                          </span>
                        </div>
                        <div className="WidgetSpecialTiming">
                          <span>
                            <img src={icons["Iqama"]} alt="" />
                            <b>{timeZoneHandler(timing.jamaatTime)}</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="notavailable">
                <div>
                  {/* <img src={noPrayer} alt="" /> */}
                  <p>"Other prayer timings are not updated"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimeWidget;
