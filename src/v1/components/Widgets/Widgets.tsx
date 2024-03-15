import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./Widgets.css";
import PrayerTimeWidget from "./PrayerTimeWidget";
import EventsWidget from "./EventsWidget";
import AnnouncementWidget from "./AnnouncementWidget";
import CMlogo from "./Icons/cmlogo.svg";
// import ShareIcon from "./Icons/ri_share-fill.svg";
import {
  fetchAnnouncementData,
  fetchEventsData,
  fetchPrayerTimings,
  fetchSpecialPrayerTimings,
} from "../../ClientApi-Calls/widget-api-calls";
import {
  AnnouncementType,
  EventType,
  WidgetNamazTiming,
  SpecialPrayer,
} from "../../redux/Types";
import { Backdrop, Box, Grow } from "@mui/material";
import tz_lookup from "tz-lookup";

function Widgets() {
  const { widgetType } = useParams();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const apiKey = token;
  let lat: string | null = new URLSearchParams(location.search).get("lat");
  let lon: string | null = new URLSearchParams(location.search).get("lon");

  // Check if lat and lon are not null and convert them to numbers
  const tZone = tz_lookup(Number(lat), Number(lon));
  console.log(tZone);

  // console.log(tZone)

  const [widgetData, setWidgetData] = useState<
    WidgetNamazTiming<number>[] | EventType | AnnouncementType | null
  >(null);
  const [specialPrayerData, setSpecialPrayerData] = useState<
    SpecialPrayer<number>[] | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [unAuthorized, setUnAuthorized] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState({ title: "", msg: "" });

  const UnAuthorised = {
    title: "You are not Authorized to use Widget",
    msg: "Please check your API key",
  };

  const UnknownWidget = {
    title: "Unknown Widget type",
    msg: "Please check your widget type on your url",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        switch (widgetType) {
          case "prayer-timing":
            fetchPrayerTimings(apiKey)
              .then((response) => {
                setWidgetData(
                  response.data.data.length !== 0
                    ? response.data.data[0].timings
                    : []
                );
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setLoading(false);

                if (error.response && error.response.status === 401) {
                  setUnAuthorized(true);
                  setErrorMsg({ ...UnAuthorised });
                  setChecked(true);
                  setOpen(true);
                }
              });

            fetchSpecialPrayerTimings(apiKey)
              .then((response) => {
                setSpecialPrayerData(response.data.data);
              })
              .catch((error) => {
                console.error(error);
                // handleApiError(error);
              });
            break;
          case "events":
            fetchEventsData(apiKey)
              .then((response) => {
                setWidgetData(response.data.data);
                console.log(response.data);
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setLoading(false);

                if (error.response && error.response.status === 401) {
                  setUnAuthorized(true);
                  setErrorMsg({ ...UnAuthorised });
                  setChecked(true);
                  setOpen(true);
                }
              });
            break;
          case "announcement":
            fetchAnnouncementData(apiKey)
              .then((response) => {
                setWidgetData(response.data.data);
                setLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setLoading(false);

                if (error.response && error.response.status === 401) {
                  setUnAuthorized(true);
                  setErrorMsg({ ...UnAuthorised });
                  setChecked(true);
                  setOpen(true);
                }
              });
            break;
          default:
            setErrorMsg({ ...UnknownWidget });
            setWidgetData(null);
            setLoading(false);
            setChecked(true);
            setOpen(true);
            break;
        }
      } catch (error) {
        console.error(error);
        setLoading(false);

        if ((error as any).response && (error as any).response.status === 401) {
          setUnAuthorized(true);
          setErrorMsg({ ...UnAuthorised });
          setChecked(true);
          setOpen(true);
        }
      }
    };

    fetchData();

    // Auto-refresh every 10 minutes
    const intervalId = setInterval(() => {
      fetchData();
      console.log("Data refreshed!");
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [apiKey, widgetType]);

  let currentWidget: React.ReactNode;

  if (loading) {
    currentWidget = <div>Loading...</div>;
  } else if (widgetData !== null) {
    switch (widgetType) {
      case "prayer-timing":
        currentWidget = (
          <PrayerTimeWidget
            widgetData={widgetData as WidgetNamazTiming<number>[] | null}
            specialPrayerData={specialPrayerData}
            tZone={tZone}
            lat={lat}
            lon={lon}
          />
        );
        break;

      case "events":
        currentWidget = <EventsWidget widgetData={widgetData as EventType} />;
        break;
      case "announcement":
        currentWidget = (
          <AnnouncementWidget
            widgetData={widgetData as AnnouncementType | null}
          />
        );
        break;
      default:
        return (currentWidget = <div>unknown Type</div>);
    }
  } else {
    currentWidget = (
      <div>
        <Backdrop open={open} sx={{ zIndex: "1" }}>
          <>
            <Box sx={{ height: 180 }}>
              <Box sx={{ display: "flex" }}>
                <Grow in={checked}>
                  <div className="delete">
                    <div className="content">
                      <h5>{errorMsg.title}</h5>
                      <p>{errorMsg.msg}</p>
                    </div>
                  </div>
                </Grow>
              </Box>
            </Box>
          </>
        </Backdrop>
      </div>
    );
  }

  return (
    <>
      <div className="main">
        <div className="widgetContainer">
          <div className="widgetTypeContainer">
            <h3>{widgetType === "prayer-timing" ? "Prayer Timings" : ""}</h3>
            <h3>{widgetType === "events" ? "Events" : ""}</h3>
            <h3>{widgetType === "announcement" ? "Announcement" : ""}</h3>
          </div>
          <div className="currentWidgetContainer"> {currentWidget}</div>

          <div className="footer">
            <a
              href="https://connectmazjid.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink"
            >
              <div className="footerContent">
                <h5 className="footerTitle">Powered By</h5>
                <div className="img">
                  <img src={CMlogo} alt="" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Widgets;
