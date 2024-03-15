import React from "react";
import moment from "moment-timezone";
const TimeZone = ({ tZone }: { tZone: string }) => {
  const timeZone = tZone;

  // Get the current UTC offset in minutes for the specified time zone
  const offsetInMinutes = moment.tz(timeZone).utcOffset();

  // Convert the offset to hours and minutes
  const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const offsetMinutes = Math.abs(offsetInMinutes) % 60;

  // Check if the time zone is currently observing Daylight Saving Time (DST)
  const isDST = moment.tz(timeZone).isDST();

  // Determine if the offset is ahead (+) or behind (-) UTC
  const sign = offsetInMinutes >= 0 ? "+" : "-";

  return (
    <div style={{ margin: "10px auto" }}>
      <p
        style={{
          padding: "5px",
          textAlign: "center",
          background: "#d0f9e4",
          borderRadius: "10px",
          margin: " auto 10vw",
        }}
      >
        Time Zone : {tZone}
      </p>
    </div>
  );
};

export default TimeZone;
