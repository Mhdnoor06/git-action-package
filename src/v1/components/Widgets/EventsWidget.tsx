import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import timeIcon from "./Icons/Vector.svg";
import "./EventsWidget.css";
// import ShareIcon from "./Icons/ri_share-fill.svg";
import { timeZoneHandler } from "../../helpers/HelperFunction";
import moment from "moment";
import previewMasjid from "../../photos/PLACEHOLDER-event.png";
import styles from "./Widgets.module.css";
import noEvents from "../../photos/Newuiphotos/BG/no events.svg";
import EventCarousel from "../MobileViewComponents/EventDetails/EventCarousel";
import MoreBtn from "../MobileViewComponents/Shared/MoreBtn";

interface EventsWidgetProps {
  widgetData: any;
}

const EventsWidget: React.FC<EventsWidgetProps> = ({ widgetData }) => {
  const [tZone, setTzone] = useState("");

  // const getTimeZone = (location: any) => {
  //   if (widgetData) {
  //     let lat: number | undefined = location.coordinates[1];
  //     let lon: number | undefined = location.coordinates[0];
  //     let tzone: string = lat && lon ? tz_lookup(lat, lon) : "";
  //     setTzone(tzone);
  //     return tZone;
  //   } else {
  //     toast.error("Unable to fetch event data");
  //   }
  // };

  const dateConverter1 = (tm: string | undefined, tZone: string) => {
    const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    const outputFormat = "D MMMM, dddd";

    if (tm) {
      return moment.tz(tm, inputFormat, tZone).format(outputFormat) || "";
    } else {
      return "";
    }
  };

  const dateConverter2 = (tm: string | undefined, tZone: string) => {
    const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
    const outputFormat = "MMM D, YYYY";

    if (tm) {
      return moment.tz(tm, inputFormat, tZone).format(outputFormat) || "";
    } else {
      return "";
    }
  };

  const [showSecondContent, setShowSecondContent] = useState(
    widgetData.map(() => false)
  );

  const handleViewMoreClick = (index: number) => {
    setShowSecondContent((prev: boolean[]) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + ".....";
    }
    return description;
  };

  const filteredEvents = widgetData.filter((event: any) => {
    const eventDate = moment(event.metaData.startDate);
    const today = moment();
    return eventDate.isSameOrAfter(today, "day");
  });
  console.log(filteredEvents);

  return (
    <>
      {filteredEvents.length != 0 ? (
        <div
          className={`events-widget-container ${styles["custom-scrollbar"]}`}
        >
          {filteredEvents.map((event: any, index: number) => (
            <Card
              key={index}
              sx={{ margin: "20px 15px", borderRadius: "12px", width: "345px" }}
              className="cardContainer"
              onClick={() => handleViewMoreClick(index)}
            >
              <CardActionArea className="widgetCard">
                {event.eventPhotos.length > 0 ? (
                  <EventCarousel eventData={event} />
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image={previewMasjid}
                    alt="Event Image"
                  />
                )}
              </CardActionArea>
              {!showSecondContent[index] ? (
                <CardContent>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      gutterBottom
                      fontWeight="800"
                      fontSize={"18px"}
                      component="div"
                      className="title"
                    >
                      {event.eventName}
                    </Typography>
                    <Typography
                      gutterBottom
                      fontWeight="600"
                      fontSize={"14px"}
                      component="div"
                      className="datee"
                    >
                      {dateConverter2(event.metaData.startDate, tZone)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      fontWeight="600"
                      fontSize={"13px"}
                      component="h6"
                      className="time"
                    >
                      <img src={timeIcon} alt="" />
                      {timeZoneHandler(
                        event.timings[0].startTime,
                        "America/Chicago"
                      )}{" "}
                      to{" "}
                      {timeZoneHandler(
                        event.timings[0].endTime,
                        "America/Chicago"
                      )}
                    </Typography>
                  </Box>
                  <Typography
                    gutterBottom
                    fontWeight="600"
                    fontSize={"15px"}
                    component="h4"
                    className=""
                  >
                    Description
                  </Typography>
                  <Typography
                    gutterBottom
                    fontSize={"14px"}
                    component="p"
                    className=""
                  >
                    {truncateDescription(event.description)}
                  </Typography>
                  {/* <button
                    onClick={() => handleViewMoreClick(index)}
                    className="btn"
                  >
                    Read More
                  </button> */}
                </CardContent>
              ) : (
                <CardContent>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      gutterBottom
                      fontWeight="800"
                      fontSize={"20px"}
                      component="div"
                      className="title"
                    >
                      {event.eventName}
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                    >
                      {/* <Typography
                      gutterBottom
                      fontWeight="600"
                      fontSize={"14px"}
                      component="div"
                    >
                      Share
                    </Typography>
                    <div className="">
                      <img src={ShareIcon} alt="" style={{ width: "20px" }} />
                    </div> */}
                    </Box>
                  </Box>
                  <Typography
                    gutterBottom
                    fontWeight="600"
                    fontSize={"14px"}
                    component="h4"
                    className=""
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    Mazjid Name :
                    <Typography style={{ fontSize: "14px" }}>
                      {" "}
                      {event.masjid.masjidName}
                    </Typography>
                  </Typography>
                  <Typography
                    gutterBottom
                    fontWeight="600"
                    fontSize={"15px"}
                    component="h4"
                    className=""
                  >
                    Description
                  </Typography>
                  <Typography
                    gutterBottom
                    fontSize={"14px"}
                    component="p"
                    className=""
                  >
                    <MoreBtn
                      tsx={event.description}
                      txLength={event.description.length}
                    />
                    {/* {event.description} */}
                  </Typography>
                  <Typography
                    gutterBottom
                    fontWeight="600"
                    fontSize={"15px"}
                    component="h4"
                    className=""
                  >
                    Address
                  </Typography>
                  <Typography
                    gutterBottom
                    fontSize={"14px"}
                    component="p"
                    className=""
                  >
                    {event.address}
                  </Typography>
                  <Typography
                    gutterBottom
                    fontWeight="600"
                    fontSize={"15px"}
                    component="h4"
                    className=""
                  >
                    Day & Timing
                  </Typography>
                  <Typography
                    gutterBottom
                    fontSize={"14px"}
                    component="p"
                    className=""
                  >
                    {`${dateConverter1(
                      event.metaData.startDate,
                      tZone
                    )} | ${timeZoneHandler(
                      event.timings[0].startTime,
                      "America/Chicago"
                    )} to ${timeZoneHandler(
                      event.timings[0].endTime,
                      "America/Chicago"
                    )}`}
                  </Typography>
                  {/* <button
                    onClick={() => handleViewMoreClick(index)}
                    className="btn"
                  >
                    View Less
                  </button> */}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="noevents">
          <div className="notavailable">
            <img src={noEvents} alt="" />
            <p style={{ textAlign: "center" }}>"There are no events"</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsWidget;
