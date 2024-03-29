import { Card, Paper } from "@material-ui/core";
import moment from "moment";
import React from "react";
type propsType = {
  namazName: string;
  azaanTime: any;
  jamaatTime: string;
}[];
const PrayerTable = ({ timings, tZone }: { timings: any; tZone: string }) => {
  console.log(timings);
  const timeZoneHandler = (tm: number | string) => {
    if (typeof tm === "number")
      return moment.unix(tm)?.tz(tZone)?.format("hh:mm A");
    else return moment.tz(tm, "HH:mm", tZone).format("hh:mm A");
  };
  return (
    <Paper>
      <p style={{ marginBottom: "10px", textAlign: "center" }}>
        The Timings are according to the <strong>{tZone}</strong>
      </p>
      <div className="PrayerTimings-Table">
        <table style={{ padding: "auto 10px" }}>
          <thead>
            <tr className="Prayer-Timings-header">
              <th>Prayer</th>
              <th>Adhan</th>
              <th>Iqama</th>
            </tr>
          </thead>
          <tbody>
            {timings.map((timing: any, index: number) => (
              <tr
                className={`Prayer-Timings-Tr  ${
                  timing?.isSkipped ? "disable-tr" : ""
                }`}
                style={{}}
                key={index}
              >
                <td>{timing.namazName}</td>
                <td className="gray-time">
                  {timeZoneHandler(timing.azaanTime)}{" "}
                  {timing.ExtendedAzaanMinutes
                    ? ` ${timing.ExtendedAzaanMinutes}m`
                    : null}
                </td>
                <td className="gray-time">
                  {timeZoneHandler(timing.jamaatTime)}{" "}
                  {timing.ExtendedJamaatMinutes
                    ? ` ${timing.ExtendedJamaatMinutes}m`
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="Pop-up-Btn"></div>
    </Paper>
  );
};

export default PrayerTable;
