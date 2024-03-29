import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import "./events.css";
// import { styled } from "@mui/material/styles";
import { useAppSelector, useAppThunkDispatch } from "../../../redux/hooks";
import { EventType, Masjid } from "../../../redux/Types";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import eventImg from "../../../photos/eventIcon.png";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { fetchMasjidById } from "../../../redux/actions/MasjidActions/fetchMasjidById";
import toast from "react-hot-toast";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import tz_lookup from "tz-lookup";
import { addNewEvent } from "../../../redux/actions/EventActions/AddingNewEventAction";
import { useNavigate, useParams } from "react-router";
// import { FetchEventById } from "../../../redux/actions/EventActions/FetchingEventDetailsById";
import { UpdateEventById } from "../../../redux/actions/EventActions/UpdatingEventAction";
import API from "../../../helpers/AuthenticationHelper/AuthInterceptorHelper";
import {
  LocationBasedToday,
  UTCTimeConverter,
  UTCTimeReverter,
  UtcDateConverter,
  dateFormatter,
  dateReverter,
  formatConvertDate,
} from "../../../helpers/HelperFunction";
import BackButton from "../Shared/BackButton";
import { EventPublishNotification } from "../../../redux/actions/AnnouncementActions/EventPublishingNotification";
import CustomBtn from "../Shared/CustomBtn";
import { deleteEventMedia } from "../../../redux/actions/EventActions/DeletingEventMediaAction";
import EventDisclaimer from "./eventDisclaimer/EventDisclaimer";
import {
  Backdrop,
  Box,
  Card,
  Checkbox,
  CircularProgress,
  FormControl,
  MenuItem,
  MobileStepper,
  Select,
} from "@mui/material";
import noEventImg from "../../../photos/Newuiphotos/Icons/noEvntphoto.svg";
import AddEvntImg from "../../../photos/Newuiphotos/Icons/addEvntImg.svg";
import deleteEvntImg from "../../../photos/Newuiphotos/Icons/deletex.svg";

import ClockTimeInput from "../Shared/ClockTimeInput";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme } from "@mui/material/styles";
import CustomCalender from "../Shared/calendar/CustomCalender";
import calender from "../../../photos/Newuiphotos/Icons/calender.svg";
import EventPreview from "./EventPreview/EventPreview";
import DeleteWarningCard from "../Shared/DeleteWarningCard/DeleteWarningCard";
import { parseISO, format } from "date-fns";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

type propsType = {
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  isFormDetailsPage?: boolean;
  eventData?: EventType;
  setUpload?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface FormData {
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
  [key: string]: string | number;
}

const Events = ({
  setIsEditing,
  isFormDetailsPage,
  eventData,
  setUpload,
}: propsType) => {
  const [formData, setFormData] = useState<FormData>({
    eventName: "",
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

  const [values, setValues] = useState<any>([]);
  const [randomDate, setRandomDate] = useState<any>([]);
  const [addressChecked, setAddressChecked] = useState(false);
  const [showDisclaimer, setDisclaimer] = useState(false);
  let admin = useAppSelector((state) => state.admin);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [tZone, setTZone] = useState<string>("");
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDateError, setStartDateError] = useState<string>("");
  const [endDateError, setEndDateError] = useState<string>("");
  const [startTimeError, setStartTimeError] = useState<string>("");
  const [endTimeError, setEndTimeError] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [state, setState] = useState<{ uploadPercentage: number }>({
    uploadPercentage: 0,
  });
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  // const defaultValue = new Date();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState("");
  const [preview, setPreview] = useState(false);
  const [willDelete, setWillDelete] = useState(false);
  // const [open, setOpen] = React.useState(false);

  const handleToggleCalendar = (dateType: "startDate" | "endDate") => {
    setIsCalendarVisible(!isCalendarVisible);
    setSelectedDateField(dateType);
  };

  const handleCalendarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  function formatConvertDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatConvertDate(date);

    if (selectedDateField === "startDate") {
      const otherDate = formData.endDate;

      if (otherDate && new Date(formattedDate) > new Date(otherDate)) {
        setStartDateError("Start date is greater than end date");
        setEndDateError("");
        setIsCalendarVisible(false);
        console.log(otherDate);
        // setFormData({
        //   ...formData,
        //   [selectedDateField]: otherDate,
        // });

        return;
      } else {
        setStartDateError("");
        setEndDateError("");
      }

      setFormData({ ...formData, startDate: formattedDate });
    } else if (selectedDateField === "endDate") {
      const otherDate = formData.startDate;

      if (otherDate && new Date(formattedDate) < new Date(otherDate)) {
        setEndDateError("End date is less than start date");
        setStartDateError("");
        setIsCalendarVisible(false);
        // setFormData({
        //   ...formData,
        //   [selectedDateField]: otherDate,
        // });

        return;
      } else {
        setEndDateError("");
        setStartDateError("");
      }

      setFormData({ ...formData, endDate: formattedDate });
    }

    setTimeout(() => {
      setIsCalendarVisible(false);
    }, 300);
  };

  useEffect(() => {
    setMaxSteps(images.length);
    setActiveStep(0);
  }, [images]);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const formDataSetter = (name: string, value: string) => {
    if (name === "startTime" || name === "endTime") {
      // Handle time validation
      const otherTime =
        name === "startTime" ? formData.endTime : formData.startTime;
      const parseTime = (time: string): Date => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), 0);
        return date;
      };

      const startTime = parseTime(value);
      const endTime = parseTime(otherTime);

      const isSameDate = formData.startDate === formData.endDate;

      if (isSameDate) {
        if (otherTime && name === "startTime" && startTime > endTime) {
          setStartTimeError("Start time cannot be greater than end time");
          setEndTimeError("");
        } else if (otherTime && name === "endTime" && endTime > startTime) {
          setEndTimeError("End time cannot be less than start time");
          setStartTimeError("");
        } else {
          setStartTimeError("");
          setEndTimeError("");
        }
      } else {
        setStartTimeError("");
        setEndTimeError("");
      }

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // console.log(formData);

  const [openBar, setOpenBar] = useState<boolean>(false);
  const [updateEventPhotos, setUpdateEventPhotos] = useState<
    { url: string; _id: string }[]
  >([]);

  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // function formatConvertDate(date: Date) {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // }

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;

  //   if (name === "startDate" || name === "endDate") {
  //     // Handle date validation
  //     const otherDate =
  //       name === "startDate" ? formData.endDate : formData.startDate;

  //     if (
  //       otherDate &&
  //       name === "startDate" &&
  //       new Date(value) > new Date(otherDate)
  //     ) {
  //       setStartDateError("Start date is greater than end date");
  //       setEndDateError("");
  //       return;
  //     } else if (
  //       otherDate &&
  //       name === "endDate" &&
  //       new Date(value) < new Date(otherDate)
  //     ) {
  //       setEndDateError("End date is less than start date");
  //       setStartDateError("");
  //       return;
  //     } else {
  //       setStartDateError("");
  //       setEndDateError("");
  //     }
  //   }

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      // Handle date validation
      const otherDate =
        name === "startDate" ? formData.endDate : formData.startDate;

      if (
        otherDate &&
        name === "startDate" &&
        new Date(value) > new Date(otherDate)
      ) {
        setStartDateError("Start date is greater than end date");
        setEndDateError("");

        return;
      } else if (
        otherDate &&
        name === "endDate" &&
        new Date(value) < new Date(otherDate)
      ) {
        setEndDateError("End date is less than start date");
        setStartDateError("");
        return;
      } else {
        setStartDateError("");
        setEndDateError("");
      }
    }

    if (name === "recurrenceType") {
      let updatedStartDate = formData.startDate;
      let updatedEndDate = formData.endDate;

      if (value === "Daily") {
        updatedStartDate = values[0]?.format("YYYY-MM-DD") || "";
        updatedEndDate = values[1]?.format("YYYY-MM-DD") || "";
      } else if (value === "Random") {
        updatedStartDate = randomDate[0]?.format("YYYY-MM-DD") || "";
        updatedEndDate =
          randomDate.length > 0
            ? randomDate[randomDate.length - 1]?.format("YYYY-MM-DD") || ""
            : "";
      }

      setFormData({
        ...formData,
        recurrenceType: value,
        startDate: updatedStartDate,
        endDate: updatedEndDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const letLongHandler = (result: Masjid) => {
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
      setTZone(location);
    }
  };
  useEffect(() => {
    if (AdminMasjidState.masjidName) {
      letLongHandler(AdminMasjidState);
    }
    if (!AdminMasjidState.masjidName) {
      const response = dispatch(fetchMasjidById(admin.masjids[0]));
      response.then((result) => {
        if (result.address) {
          letLongHandler(result.data);
        } else {
          const message = result?.message
            ? "Failed to Load Masjid Details : " + result.message
            : "Failed to Load Masjid Details : Internet or Server Issue ";

          toast.error(message);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (id && id.length > 4) {
      setEditing(true);
      const info = eventData;

      setFormData({
        eventName: info?.eventName || "",
        description: info?.description || "",
        latitude: info?.location.coordinates[1] || 0,
        longitude: info?.location.coordinates[0] || 0,
        recurrenceType: info?.recurrenceType || "None",
        address: info?.address || "",
        startDate: dateReverter(info?.metaData.startDate, tZone),
        endDate: dateReverter(info?.metaData.endDate, tZone),
        startTime: UTCTimeReverter(info?.timings[0].startTime, tZone),
        endTime: UTCTimeReverter(info?.timings[0].endTime, tZone),
      });
      // console.log(formData);
      if (info?.eventPhotos) setUpdateEventPhotos(info?.eventPhotos);
    }
  }, [id, tZone]);

  const makeApiRequest = (
    MasjidId: string,
    EventId: string,
    formData: FormData
  ) => {
    return API.post(`/media/${MasjidId}/upload/${EventId}`, formData);
  };
  const uploadHandler = async (EventId: string) => {
    const promises = [];
    for (let img of images) {
      const formData = new FormData();
      formData.append("image", img);
      promises.push(makeApiRequest(admin.masjids[0], EventId, formData));
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
  const handleDisclaimerStatus = (sta: boolean) => {
    if (sta) handleSubmit();
  };

  const areAllFieldsFilled = () => {
    const requiredFields = [
      "eventName",
      "description",
      "startDate",
      "endDate",
      "startTime",
      "endTime",
      "address",
    ];

    // Check if all required fields have values
    return requiredFields.every((field) => !!formData[field]);
  };

  const handleModalOpen = (e: any) => {
    e.preventDefault();

    if (areAllFieldsFilled()) {
      setPreview(true);
    } else {
      toast.error("Please fill in all required fields before previewing.");
    }
  };

  useEffect(() => {
    if (
      (values && values.length > 0) ||
      (randomDate && randomDate.length > 0)
    ) {
      handleChange({
        target: { name: "recurrenceType", value: formData.recurrenceType },
      });
    }
  }, [values, randomDate]);

  const handleSubmit = async () => {
    const type = formData.recurrenceType;
    const stDate =
      type === "Daily"
        ? values[0].format("YYYY-MM-DD")
        : type === "None"
        ? formData.startDate
        : randomDate[0]?.format("YYYY-MM-DD");
    const endDate =
      type === "Daily"
        ? values[1].format("YYYY-MM-DD")
        : type === "None"
        ? formData.endDate
        : type === "Random" && randomDate.length > 0
        ? randomDate[randomDate.length - 1]?.format("YYYY-MM-DD")
        : randomDate[0]?.format("YYYY-MM-DD");
    if (!AdminMasjidState?.address || !AdminMasjidState?.masjidName) {
      toast.error(
        `${!AdminMasjidState?.address ? "Address" : "Masjid Name"} is missing`
      );
    } else if (formData.recurrenceType === "Daily" && !values[1]) {
      toast.error("Have to select Start & End Date");
    } else {
      setIsLoading(true);
      let eventObject = {
        address: formData?.address,
        description: formData?.description,
        eventName: formData.eventName,
        location: {
          type: "Point",
          coordinates: [formData.longitude, formData.latitude],
        },
        masjidName: AdminMasjidState?.masjidName,
        metaData: {
          startDate: UtcDateConverter(stDate, tZone),
          endDate: UtcDateConverter(endDate, tZone),
          recurrenceType: `${
            type === "Random"
              ? randomDate.length > 0
                ? "Weekly"
                : "None"
              : formData.recurrenceType
          }`,
        },
        timings: [
          {
            startTime: UTCTimeConverter(formData.startTime, stDate, tZone),
            endTime: UTCTimeConverter(formData.endTime, endDate, tZone),
          },
        ],
        dates: [""],
      };

      if (randomDate.length > 0) {
        let MultipleMetaData: string[] = [];
        randomDate.map((item: any, key: number) => {
          let meta = randomDate[key].format("YYYY-MM-DD");

          MultipleMetaData.push(UtcDateConverter(meta, tZone));
        });
        eventObject.dates = [...MultipleMetaData];
      } else {
        eventObject.dates = [
          UtcDateConverter(moment(randomDate[0]).format("YYYY-MM-DD"), tZone),
          UtcDateConverter(moment(randomDate[0]).format("YYYY-MM-DD"), tZone),
        ];
      }

      if (formData.recurrenceType !== "Random") {
        delete eventObject?.dates;
      }
      if (isEditing && id) {
        const data = dispatch(
          UpdateEventById(eventObject, admin.masjids[0], id)
        );
        data.then(function (result) {
          if (result.message === "Event updated successfully") {
            if (setIsEditing) setIsEditing(false);
            navigate(`/event-details/${id}`);
          }
          setIsLoading(false);
        });
      } else {
        const data = dispatch(addNewEvent(eventObject, admin.masjids[0]));
        const loading = toast.loading("Please wait...!");
        data.then(async function (result) {
          if (result?.data?.message === "Success") {
            if (images.length) {
              const res = await uploadHandler(result.data.data._id);
              if (res) {
                navigate(`/event-details/${result.data.data._id}`);
                toast.dismiss(loading);
                toast.success("Event  added Successfully");
                setIsLoading(false);
              } else toast.error("Something went wrong !");
            } else {
              const res = await handlePublishingEvent(result?.data);
              if (res) {
                navigate(`/event-details/${result.data.data._id}`);
                toast.dismiss(loading);
                toast.success("Event  added Successfully");
                setIsLoading(false);
              } else toast.error("Something went wrong !");
            }
          }
          // setIsLoading(false);
        });
      }
    }
  };

  const handlePublishingEvent = async (data: any) => {
    const action = "create";

    const formData = {
      startDate: UtcDateConverter(data?.data?.metaData?.startDate, tZone),
      endDate: UtcDateConverter(data?.data?.metaData?.endDate, tZone),
      recurring: data?.data?.metaData?.recurrenceType,
    };

    try {
      const result = await dispatch(
        EventPublishNotification(
          admin.masjids[0],
          data.data._id,
          action,
          formData
        )
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

  const handleImageDelete = (index: number | string) => {
    if (typeof index === "number") {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    } else {
    }
  };

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

  const updateEventImgHandler = (img: File) => {
    const formData = new FormData();
    formData.append("image", img || "");
    setOpenBar(true);
    const options = {
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          setState({ uploadPercentage: percent });
        }
      },
    };

    API.post(`/media/${admin.masjids[0]}/upload/${id}`, formData, options)
      .then((res) => {
        //com-6
        // setState({ uploadPercentage: 100 }, () => {
        //   setTimeout(() => {
        //     setState({ uploadPercentage: 0 });
        //   }, 700);
        // });
        setState({ uploadPercentage: 100 });

        setTimeout(() => {
          setState({ uploadPercentage: 0 });
        }, 700);
        // imgWhileUpdate, setImgWhileUpdate
        setTimeout(() => {
          let data = {
            _id: res.data.data._id,
            url: res.data.data.url,
          };
          setUpdateEventPhotos([...updateEventPhotos, data]);
          setOpenBar(false);

          // setImgWhileUpdate([]);
        }, 3000);
        setUpload((prevSignal) => !prevSignal);
      })
      .catch((error) => {
        const snackbarFailureMessage = error.response.data
          ? error.response.data.message
          : "Adding Masjid Media Failed";

        setOpenBar(false);
        toast.error(snackbarFailureMessage);
      });
  };
  const handleBackBtn = () => {
    setIsEditing?.(false);
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = LocationBasedToday(tZone);
    currentDate.setHours(0, 0, 0, 0);

    // Set the provided date's time component to 00:00:00
    const providedDate = new Date(date);
    providedDate.setHours(0, 0, 0, 0);

    // Disable if the date is before the current date (but not if it's the current date)
    return providedDate < currentDate;
  };

  return (
    <>
      {preview ? (
        <EventPreview
          formData={formData}
          tZone={tZone}
          images={images}
          handleDisclaimerStatus={handleDisclaimerStatus}
          setPreview={setPreview}
          updateEventPhotos={eventData}
          isEditing={isEditing}
        />
      ) : (
        <div className="event-container">
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
            >
              {isFormDetailsPage ? "Update Event" : "Create New Event"}
            </p>
            <p></p>
          </div>

          <EventDisclaimer
            showDisclaimer={showDisclaimer}
            handleDisclaimerStatus={handleDisclaimerStatus}
            setDisclaimer={setDisclaimer}
          />

          <div className="event-form-container">
            <Card
              style={{
                width: "100%",
                borderRadius: "20px",
                // margin: `${isFormDetailsPage ? "0px" : "auto 20px"}`,
                margin: "auto 20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              <form>
                <div className="image-preview">
                  <Box sx={{ width: "100%", flexGrow: 1 }}>
                    {images.length > 0 ||
                    (updateEventPhotos && updateEventPhotos.length > 0) ? (
                      <div style={{ position: "relative" }}>
                        <AutoPlaySwipeableViews
                          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                          index={activeStep}
                          onChangeIndex={handleStepChange}
                          enableMouseEvents
                        >
                          {updateEventPhotos.length > 0
                            ? updateEventPhotos.map((photo, index) => (
                                <div key={index}>
                                  {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                      component="img"
                                      sx={{
                                        height: 140,
                                        display: "block",
                                        // maxWidth: 400,
                                        overflow: "hidden",
                                        width: "100%",
                                        borderRadius: "20px",
                                      }}
                                      src={photo.url}
                                      alt={`Photo ${index}`}
                                    />
                                  ) : null}
                                </div>
                              ))
                            : images.map((photo, index) => (
                                <div key={index}>
                                  {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                      component="img"
                                      sx={{
                                        height: 140,
                                        display: "block",
                                        // maxWidth: 400,
                                        overflow: "hidden",
                                        width: "100%",
                                        borderRadius: "20px",
                                      }}
                                      src={URL.createObjectURL(photo)}
                                      alt={`Photo ${index}`}
                                    />
                                  ) : null}
                                </div>
                              ))}
                        </AutoPlaySwipeableViews>
                        <div
                          style={{
                            position: "absolute",
                            right: "10px",
                            bottom: "10px",
                            background: "white",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div
                            id="deleteFile"
                            style={{ display: "none" }}
                            onClick={() => {
                              updateEventPhotos.length > 0
                                ? setWillDelete(true)
                                : handleImageDelete(activeStep);
                            }}
                          />
                          <img
                            src={deleteEvntImg}
                            alt=""
                            style={{ width: "15px", height: "15px" }}
                            onClick={() =>
                              document.getElementById("deleteFile")?.click()
                            }
                          />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            right: "50px",
                            bottom: "10px",
                            background: "white",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                          />
                          <img
                            src={AddEvntImg}
                            alt=""
                            style={{ width: "15px", height: "15px" }}
                            onClick={() =>
                              document.getElementById("fileInput")?.click()
                            }
                          />
                        </div>
                        {openBar && (
                          <CircularProgress
                            color="inherit"
                            sx={{
                              position: "absolute",
                              top: "40%",
                              left: "45%",
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <Box
                        component="div"
                        sx={{
                          height: 140,
                          background: "#E4FFF1",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          // maxWidth: 500,
                          overflow: "hidden",
                          width: "100%",
                          position: "relative",
                          borderRadius: "20px",
                        }}
                      >
                        <img
                          src={noEventImg}
                          alt=""
                          style={{ width: "40px" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: "10px",
                            bottom: "10px",
                            background: "white",
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                          />
                          <img
                            src={AddEvntImg}
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                            onClick={() =>
                              document.getElementById("fileInput")?.click()
                            }
                          />
                        </div>
                      </Box>
                    )}
                    {images.length > 1 && (
                      <MobileStepper
                        steps={images.length}
                        position="static"
                        activeStep={activeStep}
                        nextButton={null}
                        backButton={null}
                        sx={{ justifyContent: "center" }}
                      />
                    )}
                  </Box>

                  {/* {updateEventPhotos.length
                    ? updateEventPhotos.map((img, index) => (
                        <div key={index} className="image-preview-item">
                          <img alt="event Img" src={img.url} />
                          <div className="delete-event-btn">
                            <DeleteBtn
                              param={img._id}
                              btnHandler={handleDeleteImage}
                            />
                          </div>
                        </div>
                      ))
                    : images.map((image, index) => (
                        <div key={index} className="image-preview-item">
                          <img
                            alt="event Img"
                            src={URL.createObjectURL(image)}
                          />

                          <div className="delete-event-btn">
                            <DeleteBtn
                              param={index}
                              btnHandler={handleImageDelete}
                            />
                          </div>
                        </div>
                      ))} */}
                  {/* {images.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img alt="event Img" src={URL.createObjectURL(image)} />
                  <DeleteBtn param={index} btnHandler={handleImageDelete} />
                </div>
              ))} */}
                </div>
                {/* <LoadingButton
              loading={openBar}
              color="inherit"
              component="label"
              className="event-img-btn"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              <span>Upload Image</span>
              <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
            </LoadingButton> */}
                <div style={{ padding: "10px" }}>
                  <label htmlFor="eventName">Event Name:</label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="description">Event Details:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                  <div className="address-check-box">
                    <label htmlFor="eventName">If Location is different</label>
                    <Checkbox
                      checked={addressChecked}
                      onChange={() => setAddressChecked(!addressChecked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  {addressChecked ? (
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  ) : null}
                  {!isFormDetailsPage ? (
                    <>
                      <label htmlFor="recurrenceType">
                        Event Recurrence Type:
                      </label>
                      {/* <select
                        id="recurrenceType"
                        name="recurrenceType"
                        value={formData.recurrenceType}
                        onChange={handleChange}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Random">Random</option>
                        <option value="None">None</option>
                      </select> */}
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            id="recurrenceType"
                            name="recurrenceType"
                            value={formData.recurrenceType}
                            onChange={handleChange}
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  // borderRadius: "22px",
                                },
                              },
                            }}
                            sx={{
                              borderRadius: "22px",
                              border: "1px solid #065f46",
                              marginBottom: "15px",
                              fontSize: "12px !important",
                              outlineColor: "none",
                            }}
                          >
                            <MenuItem value="Daily">Daily</MenuItem>
                            <MenuItem value="Random">Random</MenuItem>
                            <MenuItem value="None">None</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </>
                  ) : null}
                  {formData.recurrenceType === "Daily" ? (
                    <DatePicker
                      name="Daily"
                      value={values}
                      onChange={(selectedValues) => {
                        setValues(selectedValues);
                      }}
                      range
                      minDate={new Date()}
                      style={{ marginTop: "20px" }}
                      placeholder="Select the range for recurrence"
                      format="MM/DD/YYYY"
                      multiple
                      plugins={[<DatePanel markFocused />]}
                    />
                  ) : formData.recurrenceType === "Random" ? (
                    <DatePicker
                      name="Random"
                      sort
                      value={randomDate}
                      onChange={(selectedValues) => {
                        setRandomDate(selectedValues);
                      }}
                      style={{ marginTop: "20px" }}
                      placeholder="Pick the dates of  recurrence"
                      minDate={new Date()}
                      format="MMMM DD YYYY"
                      multiple
                      plugins={[<DatePanel markFocused />]}
                    />
                  ) : (
                    <div className="location-inputs">
                      <div
                        className="latitude-input"
                        style={{ position: "relative" }}
                        onClick={() => handleToggleCalendar("startDate")}
                      >
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                          type="text"
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
                          // onClick={() => handleToggleCalendar("startDate")}
                        >
                          <img src={calender} alt="" width={"14px"} />
                        </span>
                        {startDateError && (
                          <span style={{ color: "red", fontSize: "10px" }}>
                            {startDateError}
                          </span>
                        )}
                      </div>

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
                                  // width: "32vw",
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
                          placeholder="dd-mm-yyyy"
                          value={dateFormatter(formData.endDate)}
                          onChange={handleChange}
                          min={formatConvertDate(new Date())}
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
                          // onClick={() => handleToggleCalendar("endDate")}
                        >
                          <img src={calender} alt="" width={"14px"} />
                        </span>
                        {endDateError && (
                          <span style={{ color: "red", fontSize: "10px" }}>
                            {endDateError}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="evntTimeclock">
                    <ClockTimeInput
                      label={"Start Time"}
                      id={"startTime"}
                      formDataSetter={formDataSetter}
                      tim={formData?.startTime}
                      error={startTimeError}
                    />
                    <ClockTimeInput
                      label={"End Time:"}
                      id={"endTime"}
                      formDataSetter={formDataSetter}
                      tim={formData?.endTime}
                      error={endTimeError}
                    />
                  </div>

                  <div className="submit-btn-container">
                    <CustomBtn
                      icon={eventImg}
                      eventHandler={handleModalOpen}
                      // eventHandler={handleSubmit}
                      label={isEditing ? "Update Event" : "Add Event"}
                      isDisabled={
                        !!startDateError ||
                        !!endDateError ||
                        !!startTimeError ||
                        !!endTimeError ||
                        isLoading
                      }
                    />
                  </div>
                </div>
              </form>
            </Card>
            {isCalendarVisible && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isCalendarVisible}
                onClick={handleToggleCalendar}
              >
                <div
                  className="CalendarContainer"
                  onClick={handleCalendarClick}
                >
                  <CustomCalender
                    tileDisabled={tileDisabled}
                    onDateSelect={handleDateSelect}
                    value={parseISO(String(formData[selectedDateField]))} // Convert value to string before passing it to parseISO
                    setValue={(value) => {
                      // Ensure the value is a Date object
                      const dateValue =
                        typeof value === "function" ? value(new Date()) : value;
                      const formattedDate = format(
                        dateValue,
                        "yyyy-MM-dd'T'HH:mm:ssxxx"
                      ); // Format the date as a string in ISO 8601 format
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
      {willDelete && (
        <DeleteWarningCard
          wariningType="Delete"
          warining="Are you sure you want to
        Delete this Photo  ?"
          onClose={() => setWillDelete(false)}
          onConfirm={() => {
            setWillDelete(false);
            handleDeleteImage(updateEventPhotos[activeStep]._id);
          }}
        />
      )}
    </>
  );
};

export default Events;
