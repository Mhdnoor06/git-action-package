import moment from "moment";
import swal from "sweetalert";
import { AuthTokens, Masjid } from "../../redux/Types";
import tz_lookup from "tz-lookup";

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

// export const dateReverter = (tm: string | undefined, tZone: string) => {
//   const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
//   const outputFormat = "MMM D, YYYY";

//   if (tm) {
//     return moment.tz(tm, inputFormat, tZone).format(outputFormat) || "";
//   } else {
//     return "";
//   }
// };

// export const dateReverter = (tm: string | undefined, tZone: string) => {
//   const inputFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
//   const outputFormat = "MMM D, YYYY";

//   if (tm) {
//     return moment.tz(tm, inputFormat, tZone).format(outputFormat) || "";
//   } else {
//     return "";
//   }
// };

export const timeZoneHandler = (tm: number | string, tZone: string) => {
  if (typeof tm === "number")
    return moment.unix(tm)?.tz(tZone)?.format("hh:mm A");
  else return moment.tz(tm, "HH:mm", tZone).format("hh:mm A");
};

export const UTCTimeReverter = (tm: number | undefined, tZone: string) => {
  if (tm && tZone) return moment.unix(tm).tz(tZone).format("HH:mm");
  else return "";
};
export const timeZoneGetter = (Masjid: Masjid) => {
  let lat = Masjid?.location?.coordinates[1];
  let lon = Masjid?.location?.coordinates[0];
  if (lat && lon) {
    const currentTzone = tz_lookup(lat, lon);
    // if (!tzone) setTzone(currentTzone);
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

// export const confirmation = async (delAPIFun: any) => {
//   const willDelete = await swal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover!",
//     icon: "warning",
//     buttons: ["Cancel", "OK"],
//     dangerMode: true,
//   });
//   if (willDelete) {
//     const loading = toast.loading("Please wait...!");
//     try {
//       const response = await delAPIFun();
//       console.log(response, "response");

//       if (response.status === 204) {
//         toast.dismiss(loading);
//         toast.success("Deleted Successfully");
//         return true;
//       }
//       return false;
//     } catch (error: any) {
//       let result = {
//         success: false,
//         message: error.response.data.data.error
//           ? error.response.data.data.error
//           : " SomeThing Went Wrong",
//       };
//       toast.dismiss(loading);
//       toast.error(result.message);
//       return false;
//     }
//   }
// };
