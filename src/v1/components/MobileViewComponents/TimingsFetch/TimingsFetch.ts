import axios from "axios";
import moment from "moment";
import "moment-timezone";

export const UTCTimeHandler = (time: string, date: string, tzone: string) => {
  const momentObj = moment.tz(time, "HH:mm", tzone);
  const formattedDate = moment(date, "DD-MM-YYYY");
  const year = formattedDate.format("YYYY");
  const month = formattedDate.format("MM");
  const day = formattedDate.format("DD");

  const updatedMoments = momentObj.clone().set({
    year: +year,
    month: Number(month) - 1,
    date: +day,
  });

  return updatedMoments.unix();
};
export const TimingsFetch = (
  masjidAddress: string,
  selectedStartDate: string,
  timings: any,
  tzone: string
) => {
  const savedMethod = localStorage.getItem("JuristicMethod");

  let response = axios
    .get(`https://api.aladhan.com/v1/timingsByAddress/${selectedStartDate}`, {
      params: {
        address: masjidAddress,
        school: savedMethod !== "Hanafi" ? 0 : 1,
      },
    })
    .then((res) => {
      const times = res.data.data.timings;

      const todayDate = res.data.data.date.gregorian.date;
      const namajNames = [" ", "Fajr", "Dhur", "Asar", "Maghrib", "Isha"];
      const processedTimings = timings.map((timing: any, index: number) => {
        const solarNamzName =
          timing.namazName === "Asar"
            ? "Asr"
            : timing.namazName === "Dhur"
            ? "Dhuhr"
            : timing.namazName;
        const prayerUtcTime = UTCTimeHandler(
          times[solarNamzName],
          todayDate,
          tzone
        );
        return {
          namazName: timing.namazName,
          azaanTime: prayerUtcTime,
          jamaatTime: prayerUtcTime,
          ExtendedAzaanMinutes: timing.ExtendedAzaanMinutes,
          ExtendedJamaatMinutes: timing.ExtendedJamaatMinutes,
          TimesByAzaan: timing.TimesByAzaan,
          TimesByJamaat: timing.TimesByJamaat,
          type: namajNames.indexOf(timing.namazName),
          isSkipped: timing.isSkipped,
        };
      });

   
      return processedTimings;
    })
    .catch((error) => {
      return error;
    });

  return response;
};
