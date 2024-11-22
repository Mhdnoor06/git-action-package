import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import "./events.css";
import * as api from "../../../api-calls/index";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { EventType, Masjid } from "../../../redux/Types";
import eventImg from "../../../photos/eventIcon.png";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import toast from "react-hot-toast";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import tz_lookup from "tz-lookup";
import { UpdateEventById } from "../../../redux/actions/EventActions/UpdatingEventAction";
import API from "../../../helpers/AuthenticationHelper/AuthInterceptorHelper";
import {
  LocationBasedToday,
  UTCTimeConverter,
  UTCTimeConverterforevent,
  UTCTimeReverter2,
  UtcDateConverter,
  customNavigatorTo,
  dateFormatter,
  dateReverter,
  useCustomParams,
} from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import { EventPublishNotification } from "../../../redux/actions/AnnouncementActions/EventPublishingNotification";
import CustomBtn from "../Shared/CustomBtn";
import { deleteEventMedia } from "../../../redux/actions/EventActions/DeletingEventMediaAction";
import EventDisclaimer from "./Disclaimer/EventDisclaimer";
import { Backdrop, Card } from "@mui/material";
import CustomCalender from "../Shared/calendar/CustomCalender";
import calender from "../../../photos/Newuiphotos/Icons/calender.svg";
import EventPreview from "./Preview/EventPreview";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import { parseISO, format } from "date-fns";
import DaySelection from "./Helpers/DaySelection/DaySelection";
import EventClockTimePicker from "../Shared/EventClockTimePicker";
import MasjidsList from "../../../pages/Shared/MasjidsList/MasjidsList";
import ImageUploader from "./Helpers/eventImageUploader/ImageUploader";
import EventDetailsForm from "./Form/EventDetailsForm";
import { useCalendarLogic } from "./Helpers/eventHooks/useCalendarLogic";

import { useNavigationprop } from "../../../../MyProvider";
import useStripeConnect from "../../../helpers/StripeConnectHelper/useStripeConnect";
import SuccessMessageModel from "../../../helpers/SuccessMessageModel/SuccessMessageModel";
import {
  useCreateEvent,
  useUpdateEvent,
} from "../../../graphql-api-calls/Events/mutation";
import { T } from "vitest/dist/reporters-yx5ZTtEV";

export interface FormData {
  eventName: string;
  description: string;
  latitude: number;
  longitude: number;
  recurrenceType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  address: string;
  [key: string]: string | number | null | boolean;
}

type propsType = {
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  isFormDetailsPage?: boolean;
  isMainAdmin?: boolean;
  eventData?: EventType;
  consumerMasjidId: string;
  setUpload?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Events = ({
  setIsEditing,
  consumerMasjidId,
  isMainAdmin,
  isFormDetailsPage,
  eventData,
  setUpload,
}: propsType) => {
  const navigation = useNavigationprop();
  const [formData, setFormData] = useState<FormData>({
    eventName: "",
    capacity: "",
    cost: null,
    category: "",
    description: "",
    latitude: 0,
    longitude: 0,
    recurrenceType: "None",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    address: "",
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [nextRoute, setNextRoute] = useState("");
  const [modalMessage, setModalmessage] = useState("");
  let admin = useAppSelector((state) => state.admin);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [tZone, setTZone] = useState<string>("");

  const [isEditing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // used for isSubmitting during upload images and adding updating form details
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false); // used for loader during update event,but not during add event
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const [preview, setPreview] = useState(false);
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);
  const [isSubMitted, setIsSubmitted] = useState(false);

  //picker
  const [pickerClosed, setPickerClosed] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [strDatePickerOpen, setStrDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);

  // form fields
  const [images, setImages] = useState<File[]>([]);
  const [updateEventPhotos, setUpdateEventPhotos] = useState<
    { url: string; _id: string }[]
  >([]);
  const [selectedMasjids, setSelectedMasjid] = useState<Masjid[]>([]);
  const [dailyDates, setDailyDates] = useState<any>([]);
  const [weeklyDates, setWeeklyDates] = useState<any>([]);
  const [randomDates, setRandomDates] = useState<any>([]);
  const [weeklyDays, setWeeklyDays] = useState<string[]>([]);
  const [masjidAddress, setMasjidAddress] = useState<string>("");
  const [addressChecked, setAddressChecked] = useState(false);
  const [regCheckBox, setRegCheckBox] = useState<boolean>(false);
  const [isMasjidAddressFetched, setIsMasjidAddressFetched] =
    useState<boolean>(false);
  const [registrationOption, setRegistrationOption] = useState<"free" | "paid">(
    "free"
  );

  const [startTimeError, setStartTimeError] = useState<string>("");
  const [endTimeError, setEndTimeError] = useState<string>("");
  const [dateRangeError, setDateRangeError] = useState<boolean>();
  const [state, setState] = useState<{ uploadPercentage: number }>({
    uploadPercentage: 0,
  }); // maintains percentage whether 0% or 100% in the format{ uploadPercentage: 100 }
  const [activeStep, setActiveStep] = React.useState(0); // current image step on carousel
  const [maxSteps, setMaxSteps] = useState(0); // total images in the ImageUploader component
  const [isPaymentsSetup, setIsPaymentsSetup] = useState<boolean>(false);
  const dispatch = useAppThunkDispatch();

  const id = useCustomParams();
  const masjidIdQuery =
    admin.role === "admin" || admin.role === "superadmin"
      ? `?masjidId=${consumerMasjidId}`
      : "";

  // complete calendar logic validation, toggle and errors
  const {
    isCalendarVisible,
    handleToggleCalendar,
    handleDateSelect,
    selectedDateField,
    startDateError,
    endDateError,
  } = useCalendarLogic(tZone, formData, setFormData);

  const { updateEvent } = useUpdateEvent();
  const { createEvent } = useCreateEvent(); // GraphQL hook to create event

  const handleUnexpectedError = () => {
    // setIsNoAccountDialogOpen(true);
    setIsPaymentsSetup(false);
  };

  const {
    stripeConnect,
    isLoading: isStripeLoading,
    error: stripeError,
  } = useStripeConnect(handleUnexpectedError); // Use the hook

  const handleStripeConnect = async (email: string, otp: string) => {
    const { success, status, data, error } = await stripeConnect(
      email,
      otp,
      false
    );

    if (success) {
      if (
        status === 200 ||
        (status === 202 && data.account.status !== "approved")
      ) {
        setIsPaymentsSetup(false);
      } else if (status === 202 && data.account.status === "approved") {
        setIsPaymentsSetup(true);
      }
    } else if (!success && status === 400) {
      setIsPaymentsSetup(false);
    }
  };
  useEffect(() => {
    handleStripeConnect("", "");
  }, []);

  // used to set min date in start date as today.
  function formatConvertDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const parseTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0);
    return date;
  };

  const validateTime = () => {
    const noneTypeStrDate = moment(formData.startDate);
    const noneTypeEndDate = moment(formData.endDate);
    const isSameDate = noneTypeStrDate.isSame(noneTypeEndDate, "day");

    if (formData.recurrenceType === "None") {
      if (formData.startDate && formData.endDate && !isSameDate) {
        setStartTimeError("");
        setEndTimeError("");
        return;
      }
      if (!formData.startDate || !formData.endDate) {
        setStartTimeError("");
        setEndTimeError("");
        return;
      }
      if (isSameDate && formData.startTime && formData.endTime) {
        const startTime = parseTime(formData.startTime);
        const endTime = parseTime(formData.endTime);

        if (startTime > endTime) {
          const errorMsg = "Start time cannot be greater than end time";
          setStartTimeError(errorMsg);
          toast.error(errorMsg);
          setEndTimeError("");
        } else {
          setStartTimeError("");
          setEndTimeError("");
        }
      }
    } else {
      // When recurrenceType is not "None", only check the timing
      if (formData.startTime && formData.endTime) {
        const startTime = parseTime(formData.startTime);
        const endTime = parseTime(formData.endTime);

        if (startTime > endTime) {
          const errorMsg = "Start time cannot be greater than end time";
          setStartTimeError(errorMsg);
          toast.error(errorMsg);
          setEndTimeError("");
        } else {
          setStartTimeError("");
          setEndTimeError("");
        }
      }
    }
  };

  useEffect(() => {
    validateTime();
  }, [
    formData.recurrenceType,
    formData.startDate,
    formData.endDate,
    formData.startTime,
    formData.endTime,
  ]);
  // used for startDate endDate validation, startTime and endTime validation, if no error then set it in formData
  const formDataSetter = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // this useEffect used for start and end time validation while none type selected and start and end date are not same
  useEffect(() => {
    formDataSetter("endTime", formData.endTime);
  }, [strDatePickerOpen, endDatePickerOpen]);

  // handles change for startDate endDate recurrenceType and any other field of the form
  // startDate endDate recurrenceType capacity cost eventName eventCategory description address
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      // Date validation
      const otherDate =
        name === "startDate" ? formData.endDate : formData.startDate;

      const dateError =
        (name === "startDate" && new Date(value) > new Date(otherDate)) ||
        (name === "endDate" && new Date(value) < new Date(otherDate));

      if (name === "startDate") {
        setStrDatePickerOpen(true);
        setFormData({ ...formData, endDate: value });
      } else {
        setEndDatePickerOpen(true);
      }
    }

    if (name === "recurrenceType") {
      let updatedStartDate = "";
      let updatedEndDate = "";

      if (value === "Daily") {
        updatedStartDate = dailyDates[0]?.format("YYYY-MM-DD") || "";
        updatedEndDate = dailyDates[1]?.format("YYYY-MM-DD") || "";
      } else if (value === "Random") {
        updatedStartDate = randomDates[0]?.format("YYYY-MM-DD") || "";
        updatedEndDate =
          randomDates.length > 0
            ? randomDates[randomDates.length - 1]?.format("YYYY-MM-DD") || ""
            : "";
      } else if (value === "Weekly") {
        updatedStartDate = weeklyDates[0]?.format("YYYY-MM-DD") || "";
        updatedEndDate = weeklyDates[1]?.format("YYYY-MM-DD") || "";
      }
      setFormData({
        ...formData,
        recurrenceType: value,
        startDate: updatedStartDate,
        endDate: updatedEndDate,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // loads masjids default lat long and the masjid address
  const latLongAddressLoader = (result: Masjid) => {
    if (!result) return;
    const lon = result.location.coordinates[0];
    const lat = result.location.coordinates[1];
    if (lat && lon) {
      let location = tz_lookup(lat, lon);
      setFormData({
        ...formData,
        latitude: lat,
        longitude: lon,
        address: result.address,
      });
      setMasjidAddress(result.address);
      setTZone(location);
    }
  };

  // useeffect which handles the call for latLongAddressLoader masjid data is fetched and latlongaddressloader is called
  useEffect(() => {
    if (AdminMasjidState.masjidName) {
      latLongAddressLoader(AdminMasjidState);
    }
    if (!AdminMasjidState.masjidName) {
      const response = dispatch(fetchMasjidById(consumerMasjidId));
      response.then((result) => {
        if (result.address) {
          latLongAddressLoader(result.data);
        } else {
          const message = result?.message
            ? "Failed to Load Masjid Details : " + result.message
            : "Failed to Load Masjid Details : Internet or Server Issue ";

          toast.error(message);
        }
      });
    }
  }, []);

  // the prop masjid address is used so that it is run after the masjid address is fetched
  // if isEditing and id is fetched,
  // then this useeffect sets formData based on the event which is being updated the data comes from prop
  useEffect(() => {
    if (id && id.length > 4) {
      setEditing(true);
      const info = eventData;
      setFormData({
        eventName: info?.eventName || "",
        category: info?.category || "",
        capacity: typeof info?.capacity === "object" ? null : info?.capacity,
        cost: typeof info?.cost === "object" ? null : info?.cost.toString(),
        isRegistrationRequired: regCheckBox,
        description: info?.description || "",
        latitude: info?.location.coordinates[1] || 0,
        longitude: info?.location.coordinates[0] || 0,
        recurrenceType: info?.recurrenceType || "None",
        address: info?.address || "",
        startDate: dateReverter(info?.metaData.startDate, tZone),
        endDate: dateReverter(info?.metaData.endDate, tZone),
        startTime: UTCTimeReverter2(info?.timings[0].startTime, tZone),
        endTime: UTCTimeReverter2(info?.timings[0].endTime, tZone),
        date: info?.date,
      });
      setRegCheckBox(info?.isRegistrationRequired || false);

      if (info?.eventPhotos) setUpdateEventPhotos(info?.eventPhotos);

      const regType =
        typeof info?.cost === "object" || info?.cost.toString() === "0"
          ? "free"
          : "paid";
      setRegistrationOption(regType);
    }
  }, [id, tZone, masjidAddress]);

  // ticked the address is diffferent if it is infact different. This useeffect runs after the masjidAddress and formData address is loaded
  useEffect(() => {
    if (
      formData.address &&
      masjidAddress &&
      formData.address !== masjidAddress
    ) {
      setAddressChecked(true);
    }
  }, [formData.address, isMasjidAddressFetched]);
  // this is a method which takes the masjidId EventId and uploads an image for the event. Masjid is put into formData.
  const uploadSingleImageApiRequest = (
    MasjidId: string,
    EventId: string,
    formData: FormData // image inside the formdata
  ) => {
    return API.post(`/media/${MasjidId}/upload/${EventId}`, formData);
  };
  // This handler will loop all the images that are being uploaded and make promises, once all promise are resolved we have uploaded
  const addEventUploadImages = async (EventId: string) => {
    // images usestate stores images during new event
    const promises = [];
    for (let img of images) {
      const formData = new FormData();
      formData.append("image", img);
      promises.push(
        uploadSingleImageApiRequest(consumerMasjidId, EventId, formData)
      );
    }

    try {
      const res = await Promise.all(promises);
      const results = res.map((item) => item.status);
      if (results[0] !== 201) {
        toast.error("Something went wrong. try again");
        return false;
      }
      return true;
    } catch (error: any) {
      const data = error?.response?.data;
      toast.error(data ? data?.message : "Adding Masjid Media Failed");
      setIsLoading(false);
    }

    setImages([]);
  };
  // submit after disclaimer is read and accept is clicked, method is called after preview submission
  const handleDisclaimerStatus = (sta: boolean) => {
    if (sta) handleSubmit();
  };

  // fields validation
  const areAllFieldsFilled = () => {
    const requiredFields = [
      "eventName",
      "capacity",
      "description",
      "startDate",
      "endDate",
      "startTime",
      "endTime",
      "address",
      "category",
    ];
    if (regCheckBox) {
      requiredFields.push("capacity");
      requiredFields.push("cost");
    }

    // Check if all required fields have values
    return requiredFields.every((field) => {
      if (
        field === "cost" &&
        formData.cost === null &&
        registrationOption === "free"
      ) {
        return true; // ignore cost field if it's null and regType is free
      }
      if (field == "capacity" && formData[field] == 0) {
        return (
          formData["capacity"] !== null &&
          formData["capacity"] !== undefined &&
          formData["capacity"] !== ""
        );
      } else {
        return !!formData[field];
      }
    });
  };

  // just returns a css for when a field value is blank and form is submitted
  const inputChecker = (isValueExist: string, condition = false) => {
    if (condition && isSubMitted && !isValueExist) return "2px solid red";
    else return isSubMitted && !isValueExist ? "error-bdr" : "";
  };

  // handles the click of submit on form page, validation of fields and shows preview if success
  const handlePreviewOpen = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (areAllFieldsFilled()) {
      setPreview(true);
      setIsSubmitted(false);
    } else {
      toast.error("Please fill in all required fields before previewing.");
    }
  };

  // handles formatting. whenever any date range changes it needs to be formatted and put into formdata using handleChange
  useEffect(() => {
    if (
      (dailyDates && dailyDates.length > 0) ||
      (weeklyDates && weeklyDates.length > 0) ||
      (randomDates && randomDates.length > 0)
    ) {
      handleChange({
        target: { name: "recurrenceType", value: formData.recurrenceType },
      });
    }
  }, [dailyDates, randomDates, weeklyDates]);

  // when recurrence is weekly, checks if the date range has those days covered
  const getMatchingDates = (dateArray: any[], weekdays: string[]): string[] => {
    const matchingDates: string[] = [];
    let currentDate = moment(dateArray[0].format("YYYY-MM-DD"));
    while (
      currentDate.isSameOrBefore(dateArray[1].format("YYYY-MM-DD"), "day")
    ) {
      const dayOfWeek = currentDate.format("ddd");

      if (weekdays.includes(dayOfWeek)) {
        const matchedDate = currentDate.format("YYYY-MM-DD");
        matchingDates.push(UtcDateConverter(matchedDate, tZone));
      }
      currentDate = currentDate.add(1, "day");
    }
    return matchingDates;
  };

  const handleSubmit = async () => {
    const type = formData.recurrenceType;
    const stDate =
      type === "Daily"
        ? dailyDates[0].format("YYYY-MM-DD")
        : type === "Weekly"
        ? weeklyDates[0].format("YYYY-MM-DD")
        : type === "None"
        ? formData.startDate
        : randomDates[0]?.format("YYYY-MM-DD");
    const endDate =
      type === "Daily"
        ? dailyDates[1].format("YYYY-MM-DD")
        : type === "Weekly"
        ? weeklyDates[1].format("YYYY-MM-DD")
        : type === "None"
        ? formData.endDate
        : type === "Random" && randomDates.length > 0
        ? randomDates[randomDates.length - 1]?.format("YYYY-MM-DD")
        : randomDates[0]?.format("YYYY-MM-DD");

    if (!AdminMasjidState?.address || !AdminMasjidState?.masjidName) {
      // masjid address or masjid name missing
      toast.error(
        `${!AdminMasjidState?.address ? "Address" : "Masjid Name"} is missing`
      );
    } else if (formData.recurrenceType === "Daily" && !dailyDates[1]) {
      // start date in daily recurrenceType
      toast.error("Have to select Start & End Date");
    } else if (formData.recurrenceType === "Weekly" && !weeklyDates[1]) {
      // start date in Weekly recurrenceType
      toast.error("Have to select Start & End Date");
    } else {
      setIsLoading(true); // loading
      let eventObject = {
        address: formData?.address,
        description: formData?.description,
        eventName: formData.eventName,
        cost: formData?.cost,
        capacity: formData?.capacity,
        category: formData?.category,
        isRegistrationRequired: formData?.isRegistrationRequired,
        location: {
          type: "Point",
          coordinates: [formData.longitude, formData.latitude],
        },
        masjid: consumerMasjidId,
        metaData: {
          startDate: UtcDateConverter(stDate, tZone),
          endDate: UtcDateConverter(endDate, tZone),
          recurrenceType: `${
            type === "Random" || type === "Weekly"
              ? randomDates.length > 0
                ? formData.recurrenceType
                : "none"
              : formData.recurrenceType.toLowerCase()
          }`,
        },
        timings: [
          {
            startTime: UTCTimeConverter(formData.startTime, stDate, tZone),
            endTime: UTCTimeConverter(formData.endTime, endDate, tZone),
          },
        ],
        dates: [""],
        date: formData.date || "",
      };

      if (formData.recurrenceType === "Daily") {
        // Clear existing dates and generate all dates from startDate to endDate
        const start = moment(stDate, "YYYY-MM-DD");
        const end = moment(endDate, "YYYY-MM-DD");
        const datesArray: string[] = [];

        while (start.isSameOrBefore(end)) {
          datesArray.push(UtcDateConverter(start.format("YYYY-MM-DD"), tZone));
          start.add(1, "day"); // Move to the next day
        }

        eventObject.dates = [...datesArray];
      } else if (
        randomDates.length > 0 &&
        formData.recurrenceType === "Random"
      ) {
        let MultipleMetaData: string[] = [];
        randomDates.map((item: any, key: number) => {
          let meta = randomDates[key].format("YYYY-MM-DD");
          MultipleMetaData.push(UtcDateConverter(meta, tZone));
        });
        eventObject.dates = [...MultipleMetaData];
      } else {
        eventObject.dates = [
          UtcDateConverter(moment(randomDates[0]).format("YYYY-MM-DD"), tZone),
          UtcDateConverter(moment(randomDates[0]).format("YYYY-MM-DD"), tZone),
        ];
      }

      // if (randomDates.length > 0 && formData.recurrenceType === "Random") {
      //   // format random dates and put it into eventObject.dates
      //   // metadata and timings are set default
      //   let MultipleMetaData: string[] = [];
      //   randomDates.map((item: any, key: number) => {
      //     let meta = randomDates[key].format("YYYY-MM-DD");

      //     MultipleMetaData.push(UtcDateConverter(meta, tZone));
      //   });
      //   eventObject.dates = [...MultipleMetaData];
      // } else {
      //   eventObject.dates = [
      //     UtcDateConverter(moment(randomDates[0]).format("YYYY-MM-DD"), tZone),
      //     UtcDateConverter(moment(randomDates[0]).format("YYYY-MM-DD"), tZone),
      //   ];
      // }

      if (formData.recurrenceType === "Weekly") {
        // find out matched dates and put it into eventObject.dates
        // also set metadata start, end date and recurrenceType stdate enddate changes bcz we need the date from matched date only
        // Also set timings for recurrenceType Weekly
        const matchedDates = getMatchingDates(weeklyDates, weeklyDays);
        const weeklyStrDate = UtcDateConverter(
          dateReverter(matchedDates[0], tZone),
          tZone
        );
        const weeklyEndDate = UtcDateConverter(
          dateReverter(matchedDates[matchedDates.length - 1], tZone),
          tZone
        );

        eventObject.dates = matchedDates;

        eventObject.metaData = {
          startDate: weeklyStrDate,
          endDate: weeklyEndDate,
          recurrenceType: "Weekly",
        };
        eventObject.timings = [
          {
            startTime: UTCTimeConverterforevent(
              formData.startTime,
              weeklyStrDate,
              tZone
            ),
            endTime: UTCTimeConverterforevent(
              formData.endTime,
              weeklyEndDate,
              tZone
            ),
          },
        ];
      }

      if (
        formData.recurrenceType !== "Random" &&
        formData.recurrenceType !== "Weekly" &&
        formData.recurrenceType !== "Daily"
      ) {
        delete eventObject?.dates; // delete dates key if we are not having Random or Weekly
      }

      if (
        formData.recurrenceType !== "Random" &&
        formData.recurrenceType !== "Weekly"
      ) {
        // Check if eventObject.dates exists and has exactly 2 elements

        if (
          eventObject?.dates &&
          eventObject.dates.length === 2 &&
          formData.recurrenceType !== "Daily"
        ) {
          // Compare the two dates, if they are the same, remove one
          const [firstDate, secondDate] = eventObject.dates;
          if (firstDate === secondDate) {
            eventObject.dates = [firstDate]; // Keep only one of the dates
          }
        }
      }

      // Images do not need update during update because they are updated as soon as they are uploaded
      // if(update)- UpdateEventById, onsuccess isloading=false, also send to a preview page using cutomNavigator
      if (isEditing && id) {
        const loading = toast.loading("Please wait...!");
        // const data = dispatch(
        //   UpdateEventById(eventObject, consumerMasjidId, id)
        // );
        // data.then(function (result) {
        //   if (result.message === "Event updated successfully") {
        //     setModalmessage("Event updated successfully");
        //     setOpenSuccessModal(true);
        //   }
        //   setIsLoading(false);
        // });
        const { data } = await updateEvent({
          variables: {
            id: id,
            input: eventObject,
            all: eventData?.metaData.recurrenceType !== "none",
          },
        });
        if (data.updateEvent) {
          toast.dismiss(loading);
          setModalmessage("Event updated successfully");
          setNextRoute(
            `/event-details/${data.updateEvent._id}${masjidIdQuery}`
          );
          setOpenSuccessModal(true);
          toast.success("Event updated successfully");
          // Additional navigation logic here if necessary
        } else {
          toast.dismiss(loading);
          setIsLoading(false);
          throw new Error("Update failed without error message");
        }
      } else {
        // if(add)
        try {
          const loading = toast.loading("Please wait...!");
          if (isMainAdmin && selectedMasjids?.length) {
            // Loop through selected masjids and update eventObject for each masjid ID

            const promises = selectedMasjids.map((Masjid) => {
              // Clone the eventObject and update the masjid field for each masjid
              const updatedEventObject = {
                ...eventObject,
                masjid: Masjid._id, // Assign the masjid ID to the eventObject
              };

              // Call the GraphQL mutation for each masjid with the updated event object
              return createEvent({
                variables: {
                  input: updatedEventObject,
                },
              });
            });

            // Wait for all the promises to complete
            const responses = await Promise.all(promises);
            // Create an array to hold the upload promises for images
            const uploadPromises: any = [];
            let currentEventId;
            // Handle the response for each masjid

            responses.forEach((response, index) => {
              if (response?.data?.createEvent) {
                // Trigger event notification for each created event
                if (response.data.createEvent.masjid === consumerMasjidId) {
                  currentEventId = response.data.createEvent._id;
                }
                if (images.length) {
                  uploadPromises.push(eventImageHandler(response.data, true)); // Pass an additional flag to handle main admin redirection
                }
              } else {
                console.error(
                  `Event creation failed for Masjid ID ${selectedMasjids[index]._id}`
                );
              }
            });
            // Wait for all image uploads to complete
            await Promise.all(uploadPromises);
            // }

            // After all events and images are processed, redirect to home
            toast.dismiss(loading);
            setModalmessage("Events Added Successfully");
            // setNextRoute(`/feed/4`); // Redirect EVENTS PAGE for main admin
            setNextRoute(`/event-details/${currentEventId}${masjidIdQuery}`);
            setOpenSuccessModal(true);
            setIsLoading(false);
          } else {
            //if(musalli admin)- addEvent action is called for the masjid of admin then goes for notification
            // const result = await api.addEvent(consumerMasjidId, eventObject);
            const { data } = await createEvent({
              variables: {
                input: eventObject,
              },
            });

            if (data.createEvent) {
              if (images.length === 0) {
                toast.dismiss(loading);
                setModalmessage("Event Added Successfully");
                setOpenSuccessModal(true);
                setNextRoute(
                  `/event-details/${data.createEvent._id}${masjidIdQuery}`
                );
                setIsLoading(false);
              } else {
                eventImageHandler(data);
              }
            } else {
              toast.dismiss(loading);
              toast.error("Creation failed without error message");
              throw new Error("Creation failed without error message");
            }
          }
        } catch (error) {
          console.error("Failed to add events:", error);
        }
      }
    }
  };

  // uploads the images, then calls for publishing the event
  // if images are there then upload images then go for publishing
  // if no images publish directly
  // if images uploaded or event is published successfully then custom navigate to preview page.
  // isloading false
  const eventImageHandler = async (
    result: any,
    isMainAdmin: boolean = false
  ) => {
    if (result?.createEvent) {
      if (images.length) {
        const res = await addEventUploadImages(result.createEvent._id);

        if (res) {
          if (!isMainAdmin) {
            // Redirect to event details if not main admin
            setNextRoute(
              `/event-details/${result.createEvent._id}${masjidIdQuery}`
            );
          }
          setModalmessage("Event Added Successfully");
          setOpenSuccessModal(true);
          toast.dismiss();
          setIsLoading(false);
        } else {
          toast.error("Something went wrong !");
        }
      }
    }
  };

  // for publishing we will create formdata and add start date end date recurreing type
  // send if of the event which is created or is updating and action
  const handlePublishingEvent = async (data: any) => {
    const action = "create";

    const formData = {
      startDate: UtcDateConverter(data?.metaData?.startDate, tZone),
      endDate: UtcDateConverter(data?.metaData?.endDate, tZone),
      recurring: data?.metaData?.recurrenceType,
    };

    try {
      const result = await dispatch(
        EventPublishNotification(consumerMasjidId, data._id, action, formData)
      );

      if (result.message === "Success") {
        return true;
      } else {
        console.error("Event publishing failed:", result?.message);
        return false;
      }
    } catch (error) {
      console.error("Error while publishing event:", error);
      return false;
    }
  };

  // Image Upload during both add as well as update
  // if it is Update(isFormDetailsPage) then updateEventImageHandler(since we have event id)
  // else add the new Images into the use state images,setImages for future upload during submission
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (isFormDetailsPage) {
      updateEventImgHandler(e.target.files[0]);
      return;
    }

    const newImages = [...images];
    newImages.push(e.target.files[0]);
    setImages(newImages);
  };
  // This delete image is used during new event page because we have not uploaded yet we can just remove it from the images,setimages
  const handleImageDelete = (index: number | string) => {
    if (typeof index === "number") {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    }
  };
  // used to delete an image during an update event page because we already have the eventImgId for the image which is being deleted
  const handleDeleteImage = async (eventImgId: string) => {
    // const isConfirm = await confirmation();
    if (!id) return;

    const response = dispatch(deleteEventMedia(eventImgId, id));
    response.then(function (result) {
      const restImg = updateEventPhotos.filter(
        (eventImg) => eventImg._id !== eventImgId
      );
      setUpdateEventPhotos(restImg);
      setUpload((prevSignal) => !prevSignal);
    });
  };

  //uploading the Image during update using the api
  const updateEventImgHandler = (img: File) => {
    const formData = new FormData();
    formData.append("image", img || "");
    setIsUploadingImage(true);
    const options = {
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          setState({ uploadPercentage: percent });
        }
      },
    };

    API.post(`/media/${consumerMasjidId}/upload/${id}`, formData, options)
      .then((res) => {
        setState({ uploadPercentage: 100 });

        setTimeout(() => {
          setState({ uploadPercentage: 0 });
        }, 700);
        setTimeout(() => {
          let data = {
            _id: res.data.data._id,
            url: res.data.data.url,
          };
          setUpdateEventPhotos([...updateEventPhotos, data]);
          setIsUploadingImage(false);
        }, 3000);
        setUpload((prevSignal) => !prevSignal);
      })
      .catch((error) => {
        const snackbarFailureMessage = error.response.data
          ? error.response.data.message
          : "Adding Masjid Media Failed";

        setIsUploadingImage(false);
        toast.error(snackbarFailureMessage);
      });
  };
  // back btn click during editing to go to preview
  const handleBackBtn = () => {
    setIsEditing?.(false);
  };
  // to find tileDisabled
  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = LocationBasedToday(tZone);
    currentDate.setHours(0, 0, 0, 0);

    const providedDate = new Date(date);
    providedDate.setHours(0, 0, 0, 0);

    return providedDate < currentDate;
  };

  const handleComponentVisibility = (status = false) => {
    const containerElement = document.querySelector(".rmdp-container");
    if (containerElement) {
      const childElements = containerElement.children;
      for (let i = 0; i < childElements.length; i++) {
        if (i === 0) {
          childElements[i].style.visibility = "visible";
        } else {
          childElements[i].style.display = status ? "inline-block" : "none";
        }
      }
      if (!status) {
        setPickerClosed(false);
        setTimeout(() => {
          setPickerClosed(true);
        }, 100);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleComponentVisibility(true);
      const navigationElement = document.querySelector(".rmdp-panel");
      if (navigationElement) {
        // Check if there is already a button
        const existingButton = document.querySelector(
          ".customly-added-event-ok-btn"
        );

        // If there is an existing button, remove it
        existingButton && existingButton.remove();

        // Create a button element
        const newButton = document.createElement("button");
        newButton.className = "customly-added-event-ok-btn"; // Optional: Add a custom class for styling

        // Set the text content to "OK"
        newButton.textContent = "OK";

        // Add a click event listener
        newButton.addEventListener("click", (e) => {
          e.preventDefault();
          handleComponentVisibility(false);
        });

        // Append the button to the navigation element
        navigationElement.appendChild(newButton);

        // Return a cleanup function to remove the button when conditions change or the component unmounts
        return () => {
          newButton.remove();
        };
      }
    }, 200);
  }, [pickerOpen]);

  useEffect(() => {
    const panelBody = document.querySelector(".rmdp-panel-body");
    if (panelBody) {
      const children = panelBody.children;
      const liNumber = children.length;
      if (liNumber <= 2 && liNumber > 0) {
        children[0].insertAdjacentHTML(
          "beforebegin",
          "<li ><strong>From:</strong></li>"
        );
        children[1]?.insertAdjacentHTML(
          "afterend",
          "<li><strong>To:</strong></li>"
        );
      }
    }
  }, [dailyDates, weeklyDates]);

  // this is just meant to return(true/false) whether the submit should be disabled or not.
  // it is diabled when Random, Weekly, Daily is selected but not the dates
  const shouldDisableButton = () => {
    let randomOrDailyWeeklyErr = false;
    let eventType = formData.recurrenceType;
    if (
      eventType === "Random" &&
      inputChecker(!randomDates.length ? "" : "noErr", true)
    ) {
      randomOrDailyWeeklyErr = true;
    }
    if (
      eventType === "Daily" &&
      inputChecker(!dailyDates.length ? "" : "noErr", true)
    ) {
      randomOrDailyWeeklyErr = true;
    }

    if (
      eventType === "Weekly" &&
      (weeklyDays.length < 1 ||
        inputChecker(!weeklyDates.length ? "" : "noErr", true))
    ) {
      randomOrDailyWeeklyErr = true;
    }
    return (
      !!startDateError ||
      !!endDateError ||
      !!startTimeError ||
      !!endTimeError ||
      randomOrDailyWeeklyErr ||
      isLoading
    );
  };
  // shouldDisableButton doesnt chnage any state so maybe this useeffect is not used.
  // shouldDisableButton is used when recurrencetype is chnanged in EventDetailsForm
  useEffect(() => {
    shouldDisableButton();
  }, [weeklyDays]);

  const setRecurrenceType = (type: string) => {
    setFormData({ ...formData, recurrenceType: type });
  };

  useEffect(() => {
    if (weeklyDates[0] && weeklyDates[1] && weeklyDays.length) {
      checkDateRange();
    }
  }, [weeklyDates, weeklyDays]);

  // Function to update error based on the presence of selected days in the range
  const checkDateRange = () => {
    const matchingDates = getMatchingDates(weeklyDates, weeklyDays);
    setDateRangeError(matchingDates.length === 0);
  };
  const handleMasjids = (masjids: Masjid[]) => {
    setSelectedMasjid(masjids);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    setIsEditing?.(false);
    if (nextRoute) {
      if (navigation) navigation(nextRoute);
      else customNavigatorTo(nextRoute);
    } else {
      if (navigation) navigation(`/event-details/${id}${masjidIdQuery}`);
      else customNavigatorTo(`/event-details/${id}${masjidIdQuery}`);
    }
  };

  return (
    <>
      <SuccessMessageModel
        message={modalMessage}
        open={openSuccessModal}
        onClose={handleCloseSuccessModal} // Handle close event to navigate
      />
      {preview ? (
        <EventPreview
          masjidName={!addressChecked ? AdminMasjidState?.masjidName : ""}
          formData={formData}
          tZone={tZone}
          images={images}
          handleDisclaimerStatus={handleDisclaimerStatus}
          setPreview={setPreview}
          Dates={{
            Random: randomDates,
            Daily: dailyDates,
            None: [],
            Weekly: weeklyDates,
          }}
          selectedWeekDays={weeklyDays}
          updateEventPhotos={eventData}
          isEditing={isEditing}
        />
      ) : (
        <div className="event-container" data-testid="event-container">
          <div
            className="event-top"
            style={isFormDetailsPage ? { gap: "10px" } : {}}
          >
            <div className="event-backBtn">
              <BackButton handleBackBtn={handleBackBtn} />
            </div>
            <p
              style={{
                // width: "100%",
                flex: "1",
                textAlign: "center",
                marginRight: "70px",
              }}
              data-testid="event-title"
            >
              {isFormDetailsPage ? "Update Event" : "Create New Event"}
            </p>
            <p></p>
          </div>

          <EventDisclaimer
            showDisclaimer={isDisclaimerVisible}
            handleDisclaimerStatus={handleDisclaimerStatus}
            setDisclaimer={setIsDisclaimerVisible}
          />

          <div className="event-form-container">
            <Card
              style={{
                width: "100%",
                borderRadius: "20px",
                margin: "auto 20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              <form>
                <ImageUploader
                  images={images}
                  updateEventPhotos={updateEventPhotos}
                  handleImageUpload={handleImageUpload}
                  handleImageDelete={handleImageDelete}
                  handleDeleteImage={handleDeleteImage}
                  openBar={isUploadingImage}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  setIsDeleteWarningVisible={setIsDeleteWarningVisible}
                  setMaxSteps={setMaxSteps}
                />

                <div style={{ padding: "10px" }}>
                  {isMainAdmin ? (
                    <MasjidsList
                      id={consumerMasjidId}
                      handleChange={handleMasjids}
                      isMultiple={true}
                    />
                  ) : null}

                  <EventDetailsForm
                    formData={formData}
                    handleChange={handleChange}
                    addressChecked={addressChecked}
                    setAddressChecked={setAddressChecked}
                    inputChecker={inputChecker}
                    isFormDetailsPage={isFormDetailsPage}
                    masjidAddress={masjidAddress}
                    setFormData={setFormData}
                    regCheckBox={regCheckBox}
                    setRegCheckBox={setRegCheckBox}
                    isPaymentsSetup={isPaymentsSetup}
                    isStripeLoading={isStripeLoading}
                    registrationOption={registrationOption}
                    setRegistrationOption={setRegistrationOption}
                    admin={admin}
                    isEditing={isEditing}
                    existingEventData={eventData}
                  >
                    {
                      // to fix 2nd time picker open issue
                      pickerClosed ? (
                        <div className="date-picker-container">
                          {formData.recurrenceType === "Weekly" ? (
                            <>
                              <DaySelection
                                setDays={setWeeklyDays}
                                currentDays={weeklyDays}
                                setRecurrenceType={setRecurrenceType}
                              />
                              <DatePicker
                                value={weeklyDates}
                                onChange={(selectedValues) => {
                                  setWeeklyDates(selectedValues);
                                }}
                                onOpen={() => setPickerOpen(!pickerOpen)}
                                range
                                name="Weekly"
                                className="date-picker-daily"
                                minDate={LocationBasedToday(tZone)}
                                placeholder="Pick The Dates Range"
                                style={{
                                  marginTop: "20px",
                                  border: inputChecker(
                                    weeklyDates.length < 1 ? "" : "noError",
                                    true
                                  ),
                                  height: "40px",
                                }}
                                format="DD/MMM/YYYY"
                                multiple
                                plugins={[<DatePanel markFocused />]}
                              />
                              {dateRangeError && (
                                <div style={{ color: "red", fontSize: "12px" }}>
                                  No selected weekday(s) fall within the chosen
                                  date range.
                                </div>
                              )}
                            </>
                          ) : formData.recurrenceType === "Daily" ? (
                            <DatePicker
                              value={dailyDates}
                              onChange={(selectedValues) => {
                                setDailyDates(selectedValues);
                              }}
                              onOpen={() => setPickerOpen(!pickerOpen)}
                              range
                              name="Daily"
                              className="date-picker-daily"
                              minDate={LocationBasedToday(tZone)}
                              placeholder="Pick The Dates Range"
                              style={{
                                marginTop: "20px",
                                border: inputChecker(
                                  randomDates.length < 1 ? "" : "noError",
                                  true
                                ),
                                height: "40px",
                              }}
                              format="DD/MMM/YYYY"
                              multiple
                              plugins={[<DatePanel markFocused />]}
                            />
                          ) : formData.recurrenceType === "Random" ? (
                            <DatePicker
                              onOpen={() => setPickerOpen(!pickerOpen)}
                              name="Random"
                              sort
                              value={randomDates}
                              onChange={(selectedValues) => {
                                setRandomDates(selectedValues);
                              }}
                              style={{
                                marginTop: "20px",
                                border: inputChecker(
                                  !randomDates.length ? "" : "noError",
                                  true
                                ),
                                height: "40px",
                              }}
                              placeholder="Pick The Dates"
                              minDate={new Date()}
                              format="DD/MMM/YYYY"
                              multiple
                              plugins={[<DatePanel markFocused />]}
                            />
                          ) : (
                            <div className="location-inputs evntTimeclock">
                              <div
                                className="latitude-input"
                                style={{ position: "relative" }}
                                onClick={() =>
                                  handleToggleCalendar("startDate")
                                }
                              >
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                  type="text"
                                  className={inputChecker(formData.startDate)}
                                  id="startDate"
                                  style={
                                    startDateError
                                      ? {
                                          width: "33vw",
                                          borderColor: "red",
                                          marginBottom: "0",
                                        }
                                      : {
                                          // width: "33vw",
                                        }
                                  }
                                  placeholder="dd-mm-yyyy"
                                  required
                                  name="startDate"
                                  value={dateFormatter(formData.startDate)}
                                  onChange={handleChange}
                                  min={formatConvertDate(new Date())}
                                  // onClick={() => handleToggleCalendar("startDate")}
                                  readOnly
                                />
                                <span
                                  className="calendar-icon"
                                  style={{
                                    position: "absolute",
                                    top: "59%",
                                    right: "10px",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  <img src={calender} alt="" width={"14px"} />
                                </span>
                                {startDateError && (
                                  <span
                                    style={{ color: "red", fontSize: "10px" }}
                                  >
                                    {startDateError}
                                  </span>
                                )}
                              </div>

                              <EventClockTimePicker
                                pickerOpen={strDatePickerOpen}
                                setPickerOpen={setStrDatePickerOpen}
                                label={
                                  formData.recurrenceType.toLowerCase() !==
                                  "none"
                                    ? "Each Day Start Time :"
                                    : "Start Time :"
                                }
                                id={"startTime"}
                                formDataSetter={formDataSetter}
                                tim={formData?.startTime}
                                error={
                                  inputChecker(formData.startTime) ||
                                  startTimeError
                                }
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        // to fix 2nd time picker open issue
                        <input
                          style={{ height: "22px", marginTop: "21px" }}
                          type="text"
                        />
                      )
                    }
                    <div
                      className="evntTimeclock"
                      style={
                        formData.recurrenceType === "Weekly"
                          ? { marginTop: "15px" }
                          : {}
                      }
                    >
                      {formData.recurrenceType === "None" ? (
                        <div
                          className="latitude-input"
                          style={{ position: "relative" }}
                          onClick={() => handleToggleCalendar("endDate")}
                        >
                          <label htmlFor="endDate">End Date:</label>
                          <input
                            style={
                              endDateError
                                ? {
                                    borderColor: "red",
                                    marginBottom: "0",
                                  }
                                : {}
                            }
                            type="text"
                            id="endDate"
                            name="endDate"
                            required
                            readOnly
                            className={inputChecker(formData.endDate)}
                            placeholder="dd-mm-yyyy"
                            value={dateFormatter(formData.endDate)}
                            onChange={handleChange}

                            // onClick={() => handleToggleCalendar("endDate")}
                          />

                          <span
                            className="calendar-icon"
                            style={{
                              position: "absolute",
                              top: "59%",
                              right: "10px",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <img src={calender} alt="" width={"14px"} />
                          </span>
                          {endDateError && (
                            <span style={{ color: "red", fontSize: "10px" }}>
                              {endDateError}
                            </span>
                          )}
                        </div>
                      ) : (
                        <EventClockTimePicker
                          pickerOpen={strDatePickerOpen}
                          setPickerOpen={setStrDatePickerOpen}
                          label={
                            formData.recurrenceType !== "None"
                              ? "Each Day Start Time :"
                              : "Start Time :"
                          }
                          id={"startTime"}
                          formDataSetter={formDataSetter}
                          tim={formData?.startTime}
                          error={
                            inputChecker(formData.startTime) || startTimeError
                          }
                        />
                      )}

                      <EventClockTimePicker
                        pickerOpen={endDatePickerOpen}
                        setPickerOpen={setEndDatePickerOpen}
                        label={
                          formData.recurrenceType !== "None"
                            ? "Each Day End Time :"
                            : "End Time :"
                        }
                        id={"endTime"}
                        formDataSetter={formDataSetter}
                        tim={formData?.endTime}
                        error={inputChecker(formData.endTime) || endTimeError}
                      />
                    </div>
                  </EventDetailsForm>

                  <div className="submit-btn-container">
                    <CustomBtn
                      icon={eventImg}
                      eventHandler={handlePreviewOpen}
                      label={isEditing ? "Update Event" : "Add Event"}
                      isDisabled={shouldDisableButton()}
                    />
                  </div>
                </div>
              </form>
            </Card>
            {isCalendarVisible && (
              <Backdrop
                data-test-id="calendar-visible"
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isCalendarVisible}
                onClick={handleToggleCalendar}
              >
                <div
                  className="CalendarContainer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <CustomCalender
                    minDate={
                      new Date(
                        selectedDateField === "endDate"
                          ? formData.startDate
                          : ""
                      )
                    }
                    tileDisabled={tileDisabled}
                    onDateSelect={handleDateSelect}
                    value={parseISO(String(formData[selectedDateField]))}
                    setValue={(value) => {
                      const dateValue =
                        typeof value === "function" ? value(new Date()) : value;
                      const formattedDate = format(
                        dateValue,
                        "yyyy-MM-dd'T'HH:mm:ssxxx"
                      );
                      setFormData({
                        ...formData,
                        [selectedDateField]: formattedDate,
                      });
                    }}
                  />
                </div>
              </Backdrop>
            )}
          </div>
        </div>
      )}
      {isDeleteWarningVisible && (
        <DeleteWarningCard
          wariningType="Delete"
          warining="Are you sure you want to
        Delete this Photo  ?"
          onClose={() => setIsDeleteWarningVisible(false)}
          onConfirm={() => {
            setIsDeleteWarningVisible(false);
            handleDeleteImage(updateEventPhotos[activeStep]._id);
          }}
        />
      )}
    </>
  );
};

export default Events;
