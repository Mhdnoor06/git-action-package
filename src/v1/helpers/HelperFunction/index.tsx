import moment from "moment";
import swal from "sweetalert";
import { AuthTokens, Masjid } from "../../redux/Types";
import tz_lookup from "tz-lookup";
import toast from "react-hot-toast";

export const UtcDateConverter = (data: string, tZone: string) => {
  const doesContain = data.includes("T");
  const changedDate = doesContain ? data.split("T")[0] : data;
  const inputFormat = "YYYY-MM-DD";
  const outputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

  const locationBasedDate = moment
    .tz(changedDate, inputFormat, tZone)
    .startOf("day");

  const formattedDate = locationBasedDate.format(outputFormat);

  // Convert to UTC
  const utcDate = moment.tz(formattedDate, outputFormat, tZone).utc();
  return utcDate.format(outputFormat);
};

export const tmFormatter = (tm: number | undefined, tZone: string) => {
  if (tm && tZone) return moment.unix(tm).tz(tZone).format("hh:mm A");
  else return "---:---";
};

export const dateFormatter = (date: Date | string) => {
  let dateObj: Date;

  // Convert string to Date object if date is a string
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  // Check if the date is valid
  if (!dateObj || isNaN(dateObj.getTime())) {
    return "";
  }

  // Format the date using Moment.js, specifying UTC timezone
  const formattedDate = moment.utc(dateObj).format("DD-MMM-YYYY");
  return formattedDate;
};

export const formatConvertDate = (date: Date | string) => {
  let dateObj: Date;

  // Convert string to Date object if date is a string
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  // Check if the date is valid
  if (!dateObj || isNaN(dateObj.getTime())) {
    return "";
  }

  // Format the date using Moment.js
  const formattedDate = moment(dateObj).format("YYYY-MM-DD");
  return formattedDate;
};

export const UTCTimeConverter = (time: string, date: string, tZone: string) => {
  const momentObj = moment.tz(time, "HH:mm", tZone);

  // Try different date formats to parse the date
  const formats = ["DD-MMM-YYYY", "YYYY-MM-DD", "DD-MM-YYYY"];
  const formattedDate = moment(date, formats, true); // Try multiple formats until one matches

  if (!formattedDate.isValid()) {
    throw new Error(`Invalid date format: ${date}`);
  }

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

export const UTCTimeConverterforevent = (
  time: string,
  date: string,
  tZone: string
) => {
  const momentObj = moment.tz(time, "HH:mm", tZone);

  const firstTxLength = date.split("-")[0].length;
  const dateFormate = firstTxLength > 2 ? "YYYY-MM-DD" : "DD-MM-YYYY";
  const formattedDate = moment(date, dateFormate);
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

export const confirmation = async (tx?: string) => {
  const willDelete = await swal({
    title: tx ? tx : "Are you sure?",
    text: tx ? "" : "Recovery not possible after deletion !",
    icon: "warning",
    buttons: ["Cancel", "OK"],
    dangerMode: true,
  });
  // content: {
  //   element: "div",
  //   attributes: {
  //     innerHTML: `
  //       <div class="custom-confirmation-dialog">
  //         <p>This is a custom confirmation dialog!</p>
  //         <p>${tx ? tx : "Recovery not possible after deletion!"}</p>
  //       </div>
  //     `,
  //   },
  // },
  return willDelete;
};
export const dateReverter = (tm: string | undefined, tZone: string) => {
  const inputFormate = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

  if (tm) return moment.tz(tm, inputFormate, tZone).format("YYYY-MM-DD") || "";
  // if (tm) return moment(new Date(tm), tZone).format("YYYY-MM-DD") || "";
  else return "";
};

export const timeZoneHandler = (tm: number | string, tZone: string) => {
  if (typeof tm === "number")
    return moment.unix(tm)?.tz(tZone)?.format("hh:mm A");
  else return moment.tz(tm, "HH:mm", tZone).format("hh:mm A");
};

export const UTCTimeReverter = (tm: number | undefined, tZone: string) => {
  if (tm && tZone) return moment.unix(tm).tz(tZone).format("hh:mm A");
  else return "";
};

export const UTCTimeReverter2 = (tm: number | undefined, tZone: string) => {
  if (tm && tZone) return moment.unix(tm).tz(tZone).format("HH:mm");
  else return "";
};
export const timeZoneGetter = (Masjid: Masjid) => {
  let lat = Masjid?.location?.coordinates[1];
  let lon = Masjid?.location?.coordinates[0];

  // Ensure lat is between -90 and 90, and lon is between -180 and 180
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    // Swap lat and lon if they are in the wrong order
    [lat, lon] = [lon, lat];
  }

  if (lat && lon) {
    const currentTzone = tz_lookup(lat, lon);
    return currentTzone;
  }
  return "";
};

export const LocationBasedToday = (tzone: string | undefined) => {
  if (tzone) return new Date(moment.tz(tzone).format("YYYY-MM-DD HH:mm:ss"));
  return new Date();
};
export const getAccessToken = () => {
  const authTokensString = localStorage.getItem("authTokens");
  const token: AuthTokens | null = authTokensString
    ? JSON.parse(authTokensString)
    : null;
  return token?.accessToken;
};
export const getRefreshToken = () => {
  const authTokensString = localStorage.getItem("authTokens");
  const token: AuthTokens | null = authTokensString
    ? JSON.parse(authTokensString)
    : null;
  return token?.refreshToken;
};
export const customNavigatorTo = (path: string) => {
  window.history.pushState({}, "", path);
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
};
export const useCustomParams = () => {
  const pathname = window.location.pathname;
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];
  return id;
};

export const handleBack = () => {
  customNavigatorTo("/feed/0");
};
export const TimeAvailability = (srtTime: string, endTime: string) => {
  return (
    moment(srtTime, "HH:mm").format("hh:mm A") +
    " To " +
    moment(endTime, "HH:mm").format("hh:mm A")
  );
};

export const displayTiming = (timingData: any) => {
  const elements: JSX.Element[] = [];

  if (timingData?.time?.length > 0) {
    elements.push(
      <strong
        style={{ display: "block", marginBottom: "5px" }}
        key="label-custom"
      >
        Timings
      </strong>
    );
    elements.push(
      ...timingData?.time?.map((time: string, index: number) => (
        <li key={`time-${index}`} style={{ listStyle: "none" }}>
          {time}
        </li>
      ))
    );
  }

  if (timingData?.customStartEndTime?.length > 0) {
    elements.push(
      <strong style={{ display: "block", margin: "8px 0px" }} key="label-time">
        Start and End Time:
      </strong>
    );
    elements.push(
      ...timingData?.customStartEndTime?.map((time: string, index: number) => (
        <li
          key={`custom-${index}`}
          style={{ display: "inline", marginRight: "10px" }}
        >
          {time}
          {index + 1 < timingData?.customStartEndTime.length ? "," : null}
        </li>
      ))
    );
  }

  return elements;
};

const mergeObjects = (obj: any): any => {
  let result = { ...obj };

  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key]) &&
      key !== "formData" // Skip merging for formData
    ) {
      // Recursively merge nested objects
      const childObject = mergeObjects(obj[key]);

      // Merge child object into the result object
      result = { ...result, ...childObject };
      delete result[key];
    }
  }

  return result;
};

export const validateForm = (data: any, requiredItems: string[]) => {
  const validationResult: { [key: string]: boolean } = {};

  // Flatten the data first
  const flattenedData = mergeObjects(data);

  // Validate based on required fields

  for (const key of requiredItems) {
    if (flattenedData.hasOwnProperty(key)) {
      if (Array.isArray(flattenedData[key])) {
        // If it's an array, check its length
        validationResult[key] = flattenedData[key].length > 0;
      } else if (
        flattenedData[key] === "" ||
        flattenedData[key] === "0" ||
        flattenedData[key] === null ||
        flattenedData[key] === undefined
      ) {
        // If it's empty, null, or undefined, mark as invalid
        validationResult[key] = false;
      } else {
        // Valid primitive value
        validationResult[key] = true;
      }
    } else {
      // If the key does not exist in the data, mark it as missing
      validationResult[key] = false;
    }
  }

  // Check if any field is invalid
  const isAnyError = Object.values(validationResult).includes(false);

  return { ...validationResult, all: isAnyError ? false : true }; // Return the object with field statuses
};
export const convertTo24HourFormat = (time12h: string) => {
  if (!time12h) {
    return "";
  }
  // Check if the time is already in 24-hour format (HH:mm)
  if (/^\d{2}:\d{2}$/.test(time12h)) {
    return time12h;
  }

  // Process only if it's in 12-hour format with AM/PM
  const [timePart, modifier] = time12h.split(" ");
  let [hours, minutes] = timePart.split(":");

  if (hours === "12") {
    hours = modifier === "AM" ? "00" : "12";
  } else if (modifier === "PM") {
    hours = String(Number(hours) + 12);
  }

  return `${hours}:${minutes}`;
};

export const parseTime = (time: any) => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes), 0);
  return date;
};
