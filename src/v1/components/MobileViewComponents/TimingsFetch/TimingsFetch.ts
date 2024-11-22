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

// export const TimingsFetch = (
//   masjidAddress: string,
//   selectedStartDate: string,
//   timings: any,
//   tzone: string
// ) => {
//   const savedMethod = localStorage.getItem("JuristicMethod");
//   const savedMethodString = localStorage.getItem("PrayerMethod");
//   const savedPrayerMethod = savedMethodString
//     ? JSON.parse(savedMethodString)
//     : null;
//   let response = axios
//     .get(`https://api.aladhan.com/v1/timingsByAddress/${selectedStartDate}`, {
//       params: {
//         address: masjidAddress,
//         school: savedMethod !== "Hanafi" ? 0 : 1,
//         method: savedPrayerMethod?.id ?? 2,
//       },
//     })
//     .then((res) => {
//       const times = res.data.data.timings;

//       const todayDate = res.data.data.date.gregorian.date;
//       const namajNames = [" ", "Fajr", "Dhur", "Asar", "Maghrib", "Isha"];
//       const processedTimings = timings.map((timing: any, index: number) => {
//         const solarNamzName =
//           timing.namazName === "Asar"
//             ? "Asr"
//             : timing.namazName === "Dhur"
//             ? "Dhuhr"
//             : timing.namazName;
//         const prayerUtcTime = UTCTimeHandler(
//           times[solarNamzName],
//           todayDate,
//           tzone
//         );
//         return {
//           namazName: timing.namazName,
//           azaanTime: prayerUtcTime,
//           jamaatTime: prayerUtcTime,
//           ExtendedAzaanMinutes: timing.ExtendedAzaanMinutes,
//           ExtendedJamaatMinutes: timing.ExtendedJamaatMinutes,
//           TimesByAzaan: timing.TimesByAzaan,
//           TimesByJamaat: timing.TimesByJamaat,
//           type: namajNames.indexOf(timing.namazName),
//           isSkipped: timing.isSkipped,
//         };
//       });

//       return processedTimings;
//     })
//     .catch((error) => {
//       return error;
//     });

//   return response;
// };

export const TimingsFetch = async (
  masjidAddress: string,
  dateRange: string[],
  timings: any,
  tzone: string,
  selectedMethod: string,
  selectedPrayerMethod: any
) => {
  const startDate = moment(dateRange[0]);
  const endDate = moment(dateRange[1]);
  const sameYear = startDate.year() === endDate.year();
  const sameMonth = sameYear && startDate.month() === endDate.month();

  const year = startDate.year();
  const month = startDate.month() + 1; // moment.js months are 0-indexed, API expects 1-indexed

  let apiEndpoint = `https://api.aladhan.com/v1/calendarByAddress/${year}`;
  if (sameMonth) {
    apiEndpoint += `/${month}`;
  }

  // const savedMethod = localStorage.getItem("JuristicMethod");
  const savedMethod = selectedMethod;
  // const savedMethodString = localStorage.getItem("PrayerMethod");
  // const savedPrayerMethod = savedMethodString
  //   ? JSON.parse(savedMethodString)
  //   : null;

  const response = await axios
    .get(apiEndpoint, {
      params: {
        address: masjidAddress,
        school: savedMethod !== "Hanafi" ? 0 : 1,
        method: selectedPrayerMethod?.id ?? 2,
      },
    })
    .catch((error) => {
      return error;
    });

  if (response instanceof Error) {
    return response;
  }

  let daysData = [];
  if (response.data.data.constructor === Array) {
    daysData = response.data.data;
  } else {
    // This handles the object structure where each key is a month and value is an array of days
    Object.values(response.data.data).forEach((monthData) => {
      daysData = daysData.concat(monthData);
    });
  }

  const results = [];
  daysData.forEach((dayData) => {
    const dayDate = moment(dayData.date.gregorian.date, "DD-MM-YYYY");
    if (dayDate.isBetween(startDate, endDate, "day", "[]")) {
      // inclusive of start and end date
      const times = dayData.timings;
      const processedTimings = timings.map((timing, index) => {
        const solarNamzName =
          timing.namazName === "Asar"
            ? "Asr"
            : timing.namazName === "Dhur"
            ? "Dhuhr"
            : timing.namazName;
        const prayerUtcTime = UTCTimeHandler(
          times[solarNamzName],
          dayData.date.gregorian.date,
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
          type: timing.type,
          isSkipped: timing.isSkipped,
        };
      });
      results.push(...processedTimings);
    }
  });

  return results;
};
