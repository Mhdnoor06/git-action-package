import {
  PrayerTimes,
  CalculationMethod,
  Coordinates,
  CalculationParameters,
  Madhab,
} from "adhan";
import moment from "moment-timezone";
import { NamajTiming } from "../redux/Types";

// Function to convert prayer times to a specified timezone
function convertToTimezone(
  prayerTimes: PrayerTimes,
  timezone: string,
  formate: string
): Record<string, string> {
  return {
    fajr: moment(prayerTimes.fajr).tz(timezone).format(formate),
    sunrise: moment(prayerTimes.sunrise).tz(timezone).format(formate),
    dhuhr: moment(prayerTimes.dhuhr).tz(timezone).format(formate),
    asr: moment(prayerTimes.asr).tz(timezone).format(formate),
    maghrib: moment(prayerTimes.maghrib).tz(timezone).format(formate),
    isha: moment(prayerTimes.isha).tz(timezone).format(formate),
  };
}

export const methodMapping = [
  {
    id: 3,
    name: "Muslim World League",
    method: CalculationMethod.MuslimWorldLeague(),
  },
  {
    id: 2,
    name: "Islamic Society of North America (ISNA)",
    method: CalculationMethod.NorthAmerica(),
  },
  {
    id: 5,
    name: "Egyptian General Authority of Survey",
    method: CalculationMethod.Egyptian(),
  },
  {
    id: 4,
    name: "Umm Al-Qura University, Makkah",
    method: CalculationMethod.UmmAlQura(),
  },
  {
    id: 1,
    name: "University of Islamic Sciences, Karachi",
    method: CalculationMethod.Karachi(),
  },
  {
    id: 7,
    name: "University of Tehran",
    method: CalculationMethod.Tehran(),
  },
  { id: 9, name: "Kuwait", method: CalculationMethod.Kuwait() },
  { id: 10, name: "Qatar", method: CalculationMethod.Qatar() },
  {
    id: 11,
    name: "Majlis Ugama Islam Singapura, Singapore",
    method: CalculationMethod.Singapore(),
  },
  {
    id: 13,
    name: "Diyanet İşleri Başkanlığı, Turkey (experimental)",
    method: CalculationMethod.Turkey(),
  },
  {
    id: 15,
    name: "Moonsighting Committee Worldwide",
    method: CalculationMethod.MoonsightingCommittee(),
  },
  { id: 16, name: "Dubai", method: CalculationMethod.Dubai() },
];

// Function to get all available methods
export function fetchPrayerMethods() {
  return methodMapping.map(({ id, name, method }) => ({
    id,
    name,
    params: method,
    location: {},
  }));
}

function getPrayerTimesForMethod(
  latitude: number,
  longitude: number,
  date: Date,
  method: CalculationParameters,
  timezone: string
): Record<string, string> {
  const coordinates = new Coordinates(latitude, longitude);

  const prayerTimes = new PrayerTimes(coordinates, date, method);

  return convertToTimezone(prayerTimes, timezone, "hh:mm A");
}

// Function to get all available methods with prayer times
export function fetchPrayerMethodsWithTime(
  latitude: number,
  longitude: number,
  date: Date,
  timezone: string
) {
  return methodMapping.map(({ id, name, method }) => {
    const prayerTimes = getPrayerTimesForMethod(
      latitude,
      longitude,
      date,
      method,
      timezone
    );
    return {
      id,
      name,
      params: method,
      fajrTime: prayerTimes.fajr,
      ishaTime: prayerTimes.isha,
      maghribTime: method.maghribAngle ? prayerTimes.maghrib : undefined,
      location: {}, // Add location information if necessary
    };
  });
}

// Function to get prayer times for a single day
export function getPrayerTimes(
  latitude: number,
  longitude: number,
  date: Date,
  method: CalculationParameters,
  madhab: any,
  timezone: string,
  formate: string
): Record<string, string> {
  method.madhab = madhab;
  const coordinates = new Coordinates(latitude, longitude);
  const prayerTimes = new PrayerTimes(coordinates, date, method);
  return convertToTimezone(prayerTimes, timezone, formate);
}

// Function to get namaz timings for a range of dates
// Function to convert time to UTC Unix format
function UTCTimeHandler(time: string, date: string, timezone: string): number {
  const dateTime = moment.tz(`${date} ${time}`, "DD-MM-YYYY h:mm A", timezone);
  return dateTime.unix();
}

// Function to get namaz timings for a range of dates
export const TimingsFetch = (
  masjidCoordinates: { latitude: number; longitude: number },
  dateRange: string[],
  timings: any,
  tzone: string,
  selectedMethod: string,
  selectedPrayerMethod: any
) => {
  // console.log(timings.jamaatTime);
  const startDate = moment(dateRange[0]);
  const endDate = moment(dateRange[1]);

  // Find the selected method based on the ID
  const selectedMethodData = methodMapping.find(
    (method) => method.id === selectedPrayerMethod.id
  );

  if (!selectedMethodData) {
    throw new Error("Selected method not found");
  }

  const method = selectedMethodData.method;
  const results = [];
  let currentDate = startDate.clone();

  while (currentDate.isSameOrBefore(endDate)) {
    const prayerTimes = getPrayerTimes(
      masjidCoordinates.latitude,
      masjidCoordinates.longitude,
      currentDate.toDate(),
      method,
      selectedMethod === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi,
      tzone,
      "HH:mm"
    );

    const processedTimings = timings.map((timing: any) => {
      const solarNamazName =
        timing.namazName === "Asar"
          ? "Asr"
          : timing.namazName === "Dhur"
          ? "Dhuhr"
          : timing.namazName;
      const prayerTime = prayerTimes[solarNamazName.toLowerCase()];
      const prayerUtcTime = UTCTimeHandler(
        prayerTime,
        currentDate.format("DD-MM-YYYY"),
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
    currentDate.add(1, "day");
  }

  return results;
};
export const fetchAndFormatTimings = async (
  masjidCoordinates: { latitude: number; longitude: number },
  dateRange: string[],
  timings: any,
  tzone: string,
  selectedMethod: string,
  selectedPrayerMethod: any
): Promise<NamajTiming<string>[]> => {
  console.log(dateRange);
  const results = await TimingsFetch(
    masjidCoordinates,
    dateRange,
    timings,
    tzone,
    selectedMethod,
    selectedPrayerMethod
  );
  console.log(results);
  // Initialize an array to hold the formatted timings
  const formattedTimings: NamajTiming<string>[] = [];

  // Process the results to keep a continuous array of timings
  results.forEach((timing) => {
    // Convert azaanTime and jamaatTime from Unix to formatted 24-hour time
    // const azaanTimeFormatted = moment
    //   .unix(timing.azaanTime)
    //   .tz(tzone) // Apply timezone
    //   .format("HH:mm");

    // const jamaatTimeFormatted = moment
    //   .unix(timing.jamaatTime)
    //   .tz(tzone) // Apply timezone
    //   .format("HH:mm");

    formattedTimings.push({
      namazName: timing.namazName,
      azaanTime: timing.azaanTime,
      jamaatTime: timing.jamaatTime,
      ExtendedJamaatMinutes: timing.ExtendedJamaatMinutes,
      ExtendedAzaanMinutes: timing.ExtendedAzaanMinutes,
      TimesByAzaan: timing.TimesByAzaan,
      TimesByJamaat: timing.TimesByJamaat,
      type: timing.type,
      isSkipped: timing.isSkipped,
    });
  });

  return formattedTimings;
};
