import moment from "moment";
import { OtherSalahFormProps, Timing } from "../OtherSalahForm/OtherSalahForm";
import axios from "axios";

export enum EidSalah {
  EidUlFitr = "Eid Ul-Fitr",
  EidUlDuha = "Eid Ul-Duha",
}

//parsing timings to the format required by the backend
export const parseTimings = (
  timings: OtherSalahFormProps["initialTimings"]
): Timing[] => {
  if (!timings) return [];

  return timings.map((timing) => ({
    startDate: timing.startDate
      ? moment(timing.startDate, "DD-MM-YYYY").toDate()
      : null,
    endDate: timing.endDate
      ? moment(timing.endDate, "DD-MM-YYYY").toDate()
      : null,
    azanTime: timing.azanTime
      ? moment(timing.azanTime, "hh:mm a").format("HH:mm")
      : "",
    iqamaTime: timing.iqamaTime
      ? moment(timing.iqamaTime, "hh:mm a").format("HH:mm")
      : "",
    isStartDateInvalid: false,
    isEndDateInvalid: false,
    isIqamaTimeInvalid: false,
  }));
};

//fetching eid dates from aladhan api

export const fetchEidDates = async () => {
  try {
    // Step 1: Get the current Hijri year by converting today's date
    const today = new Date();
    const todayHijriResponse = await axios.get(
      "https://api.aladhan.com/v1/gToH",
      {
        params: {
          date: `${today.getDate()}-${
            today.getMonth() + 1
          }-${today.getFullYear()}`,
        },
      }
    );

    if (todayHijriResponse.data && todayHijriResponse.data.code === 200) {
      const currentHijriYear = todayHijriResponse.data.data.hijri.year;

      // Step 2: Fetch Eid al-Fitr date (1st Shawwal of the current Hijri year)
      const eidFitrResponse = await axios.get(
        "https://api.aladhan.com/v1/hToG",
        {
          params: { date: `1-10-${currentHijriYear}` }, // 1st of Shawwal
        }
      );

      // Step 3: Fetch Eid al-Adha date (10th Dhu al-Hijjah of the current Hijri year)
      const eidAdhaResponse = await axios.get(
        "https://api.aladhan.com/v1/hToG",
        {
          params: { date: `10-12-${currentHijriYear}` }, // 10th of Dhu al-Hijjah
        }
      );

      if (
        eidFitrResponse.data &&
        eidAdhaResponse.data &&
        eidFitrResponse.data.code === 200 &&
        eidAdhaResponse.data.code === 200
      ) {
        // Convert DD-MM-YYYY to YYYY-MM-DD format for valid Date parsing
        const formatDateString = (dateStr: string) => {
          const [day, month, year] = dateStr.split("-");
          return `${year}-${month}-${day}`;
        };

        const eidFitrDate = new Date(
          formatDateString(eidFitrResponse.data.data.gregorian.date)
        );
        const eidAdhaDate = new Date(
          formatDateString(eidAdhaResponse.data.data.gregorian.date)
        );

        return { eidFitrDate, eidAdhaDate };
      } else {
        console.error("Failed to fetch one of the Eid dates");
        return null;
      }
    } else {
      console.error("Failed to fetch the current Hijri year");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Eid dates:", error);
    return null;
  }
};
