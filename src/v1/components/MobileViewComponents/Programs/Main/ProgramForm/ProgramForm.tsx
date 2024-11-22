import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../../../Services/services.css";
import { parseISO, format } from "date-fns";
import moment from "moment-timezone";
import "../../../Events/events.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Backdrop, Box, Checkbox, Typography } from "@mui/material";
import toast from "react-hot-toast";
import nextIcon from "../../../../../photos/Newuiphotos/program/Frame-_4_.webp";
import selectedCircle from "../../../../../photos/Newuiphotos/program/selectedCircle.webp";
import nonSelectedCircle from "../../../../../photos/Newuiphotos/program/nonSelectred.webp";
import calender from "../../../../../photos/Newuiphotos/Icons/calender.svg";
import BackButton from "../../../Shared/BackButton";
import ImageUploader from "../../../Events/Helpers/eventImageUploader/ImageUploader";
import {
  customNavigatorTo,
  dateFormatter,
  dateReverter,
  formatConvertDate,
  LocationBasedToday,
  parseTime,
  timeZoneGetter,
  UtcDateConverter,
  UTCTimeConverter,
  validateForm,
} from "../../../../../helpers/HelperFunction";

import "./programs.css";

import ProgramView from "./ProgramView";
import { useNavigationprop } from "../../../../../../MyProvider";
import { fetchMasjidById } from "../../../../../redux/actions/MasjidActions/fetchMasjidById";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  CREATE_PROGRAM,
  UPDATE_PROGRAM,
} from "../../../../../graphql-api-calls/mutation";
import { useMutation } from "@apollo/client";
import {
  Get_PROGRAMS,
  Get_PROGRAMS_BY_RANGE,
} from "../../../../../graphql-api-calls/query";
import { uploadImage } from "../../../../../helpers/imageUpload/imageUpload";
import EventClockTimePicker from "../../../Shared/EventClockTimePicker";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DaySelection from "../../../Events/Helpers/DaySelection/DaySelection";
import { useCalendarLogic } from "../../../Events/Helpers/eventHooks/useCalendarLogic";
import CustomCalender from "../../../Shared/calendar/CustomCalender";
import useStripeConnect from "../../../../../helpers/StripeConnectHelper/useStripeConnect";
import SuccessMessageModel from "../../../../../helpers/SuccessMessageModel/SuccessMessageModel";
import CommonFields from "../../../Services/CommonFileds/CommonFields";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ServiceFormProps {
  setIsFormVisible?: Dispatch<SetStateAction<boolean>>;
  detailsFormData?: any;
  id?: string;
  programName?: string;
  isEditing?: boolean;
  setIsEditing?: any;
  handleToggleEditForm?: () => void;
  masjidId: string;
}

const ProgramForm: React.FC<ServiceFormProps> = ({
  detailsFormData,
  programName,
  setIsFormVisible,
  id,
  isEditing = false,
  handleToggleEditForm,
  masjidId,
}) => {
  let admin = useAppSelector((state) => state.admin);
  const [formData, setFormData] = useState<any>({
    programName: "",
    description: "",
    programCategory: "",
    recurrenceType: "None",
    ageOption: "All Age",
    registrationRequired: false,
    isRegistrationRequired: false,
    images: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const categoriesList = [
    "Quran Programs",
    "Islamic Studies",
    "Youth Programs",
    "Community Outreach",
    "Family Programs",
    "Women’s Programs",
    "Children’s Programs",
    "Health & Wellness",
  ];
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [regCheckBox, setRegCheckBox] = useState(false);
  const [addressChecked, setAddressChecked] = useState(false);
  const [recurrenceChecked, setRecurrenceChecked] = useState(true);
  const [ageOption, setAgeOption] = useState<"All Age" | "range">("All Age");
  const [dailyDates, setDailyDates] = useState<any>([]);
  const [weeklyDates, setWeeklyDates] = useState<any>([]);
  const [dateRangeError, setDateRangeError] = useState<boolean>();
  const [randomDates, setRandomDates] = useState<any>([]);
  const [weeklyDays, setWeeklyDays] = useState<string[]>([]);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const [pickerClosed, setPickerClosed] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [strDatePickerOpen, setStrDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);
  const [tZone, setTZone] = useState<string>("");
  const {
    isCalendarVisible,
    handleToggleCalendar,
    handleDateSelect,
    selectedDateField,
    startDateError,
    endDateError,
  } = useCalendarLogic(tZone, formData, setFormData);
  const [isPaymentsSetup, setIsPaymentsSetup] = useState(false);
  const [masjid, setMasjid] = useState<any>();
  const dispatch = useAppDispatch();
  const navigation = useNavigationprop();

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
  const masjidAPIRequest = () => {
    const response = dispatch(fetchMasjidById(masjidId));
    response.then(function (result) {
      if (result?.address) {
        setMasjid(result);
        handleChange({
          target: {
            name: "address",
            value: result.address,
          },
        });
        // setAddressChecked(result.address === formData.address ? false : true);
      } else {
        toast.error("Unable to fetch Masjid data");
      }
    });
  };

  useEffect(() => {
    if (masjidId && !AdminMasjidState?.address) {
      masjidAPIRequest();
    } else if (AdminMasjidState?.masjidName) {
      setMasjid(AdminMasjidState);
      handleChange({
        target: {
          name: "address",
          value: AdminMasjidState.address,
        },
      });
    }
  }, [masjidId, AdminMasjidState?.address]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;

    let requiredField = [
      "programName",
      "programCategory",
      "startTime",
      "endTime",
      "capacity",
      "description",
      "address",
    ];
    setFormData((prevFormData: any) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };

      if (formData.ageOption === "range" || value === "range") {
        requiredField = [...requiredField, "endRange", "startRange"];
      }
      if (formData.recurrenceType === "None") {
        requiredField = [...requiredField, "endDate", "startDate"];
      }

      const validRes = validateForm(updatedFormData, requiredField);

      setValidationErrors(validRes);
      return updatedFormData;
    });
  };
  const handleBackBasedOnIsEditing = () => {
    if (isEditing) {
      if (handleToggleEditForm) handleToggleEditForm();
    } else {
      setIsFormVisible?.(false);
    }
  };
  const checkError = (field: string) => {
    if (formData.isSubBtnClicked && !validationErrors[field])
      return { border: "2px solid red" };
    else return {};
  };

  const strEndValidationChecker = () => {
    if (
      formData.endDate &&
      formData.startDate &&
      formData.startTime &&
      formData.endTime
    ) {
      const noneTypeStrDate = moment(formData.startDate);
      const noneTypeEndDate = moment(formData.endDate);
      const isSameDate = noneTypeStrDate.isSame(noneTypeEndDate, "day");
      const startTime = parseTime(formData.startTime);
      const endTime = parseTime(formData.endTime);
      if (isSameDate && startTime > endTime) {
        const errorMsg = "Start time cannot be greater than end time";
        toast.error(errorMsg);
        return true;
      }
      return false;
    }
  };
  useEffect(() => {
    strEndValidationChecker();
  }, [
    formData.endDate,
    formData.endTime,
    formData.startDate,
    formData.startTime,
  ]);
  const handleSubmit = () => {
    if (strEndValidationChecker()) {
      return;
    }
    if (!isEditing) {
      const recurrenceChecks = {
        Daily: dailyDates,
        Weekly: weeklyDates,
        Random: randomDates,
      };

      const selectedDates = recurrenceChecks[formData.recurrenceType];

      if (selectedDates && !selectedDates[1]) {
        toast.error("Have to select Start & End Date");
        return;
      }

      if (formData?.cost < 1 && formData?.registrationOption === "paid") {
        toast.error(
          "Registration fee must be greater than 0 for paid program."
        );
        return;
      }
    }

    if (
      formData.ageOption === "range" &&
      formData?.startRange &&
      formData?.startRange > formData.endRange
    ) {
      toast.error("Start range can not be greater than end range.");
      return;
    }
    if (
      formData.ageOption === "range" &&
      formData?.startRange &&
      formData?.startRange === formData.endRange
    ) {
      toast.error("Start range can not be equal to end range.");
      return;
    }

    if (
      (formData.ageOption === "range" && formData?.startRange === 0) ||
      formData?.startRange === "0"
    ) {
      toast.error("Start range can not be less then one.");
      return;
    }
    handleChange({
      target: {
        name: "isSubBtnClicked",
        value: true,
      },
    });

    // Perform final validation check before submission
    if (validationErrors?.all) {
      setIsPreviewVisible(true);
    } else {
      for (const [key] of Object.entries(validationErrors)) {
        if (key === "all" || validationErrors[key]) continue; // Skip the 'all' key
        toast.error(` ${key} is Required`);
        return;
      }
    }
  };

  useEffect(() => {
    if (id && isEditing && detailsFormData) {
      setFormData(detailsFormData);
      setIsFormValid(true);
      setAddressChecked(
        AdminMasjidState.address === detailsFormData.address ? false : true
      );
      setAgeOption(detailsFormData.ageOption);
      //calling this handleChange to fix the issue of programName is
      handleChange({
        target: {
          name: "ageOption",
          value: detailsFormData.ageOption,
        },
      });
    }
  }, [detailsFormData, id, isEditing]);

  const [images, setImages] = useState<File[]>(
    isEditing ? formData?.images : []
  );
  const [updateEventPhotos, setUpdateEventPhotos] = useState<
    { url: string; _id: string }[]
  >([]);
  const [activeStep, setActiveStep] = React.useState(0); // current image step on carousel
  const [maxSteps, setMaxSteps] = useState(0); // total images in the ImageUploader component
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);

  const handleImageUpload = (e: any) => {
    const newImages = [...images];
    newImages.push(e.target.files[0]);
    setImages(newImages);
    handleChange({
      target: {
        name: "images",
        value: newImages,
      },
    });
  };

  const handleImageDelete = (index: number | string) => {
    if (typeof index === "number") {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
      handleChange({
        target: {
          name: "images",
          value: newImages,
        },
      });
    }
  };
  const startDate = moment()
    .startOf("month")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const endDate = moment().endOf("year").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const rangeVariables = {
    masjidId,
    startDate,
    endDate,
  };
  const [createProgram, { data, loading: progLoading, error: progError }] =
    useMutation(CREATE_PROGRAM, {
      refetchQueries: [
        { query: Get_PROGRAMS_BY_RANGE, variables: rangeVariables },
      ],
      awaitRefetchQueries: true,
    });

  const [
    updateProgram,
    { data: updateProg, loading: updateProgLoading, error: updateProgError },
  ] = useMutation(UPDATE_PROGRAM, {
    refetchQueries: [
      { query: Get_PROGRAMS, variables: { masjidId: masjidId } },
    ],
    awaitRefetchQueries: true,
  });
  // to find tileDisabled
  const tileDisabled = ({ date }: { date: Date }) => {
    const currentDate = LocationBasedToday(tZone);
    currentDate.setHours(0, 0, 0, 0);

    const providedDate = new Date(date);
    providedDate.setHours(0, 0, 0, 0);

    return providedDate < currentDate;
  };
  useEffect(() => {
    if (masjid) {
      setTZone(timeZoneGetter(masjid));
    }
  }, [masjid]);
  // let location = tz_lookup(lat, lon);
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

  const prepareProgramInput = (isUpdate: boolean, imgURLs: string[]) => {
    const type = formData.recurrenceType;
    let stDate = "";
    let endDate = "";
    if (!isUpdate) {
      stDate =
        type === "Daily"
          ? dailyDates[0].format("YYYY-MM-DD")
          : type === "Weekly"
          ? weeklyDates[0].format("YYYY-MM-DD")
          : type === "None"
          ? formData.startDate
          : randomDates[0]?.format("YYYY-MM-DD");

      endDate =
        type === "Daily"
          ? dailyDates[1].format("YYYY-MM-DD")
          : type === "Weekly"
          ? weeklyDates[1].format("YYYY-MM-DD")
          : type === "None"
          ? formData.endDate
          : type === "Random" && randomDates.length > 0
          ? randomDates[randomDates.length - 1]?.format("YYYY-MM-DD")
          : randomDates[0]?.format("YYYY-MM-DD");
    } else {
      stDate = formData.startDate;
      endDate = formData.endDate;
    }

    const timings = [
      {
        startTime: UTCTimeConverter(formData.startTime, stDate, tZone),
        endTime: UTCTimeConverter(formData.endTime, endDate, tZone),
      },
    ];

    const metaData = {
      startDate: UtcDateConverter(stDate, tZone),
      endDate: UtcDateConverter(endDate, tZone),
      recurrenceType: type === "Random" || type === "Weekly" ? "Weekly" : type,
    };

    // Handle weekly recurrence
    if (type === "Weekly" && !isUpdate) {
      const matchedDates = getMatchingDates(weeklyDates, weeklyDays);

      metaData.startDate = UtcDateConverter(
        dateReverter(matchedDates[0], tZone),
        tZone
      );

      metaData.endDate = UtcDateConverter(
        dateReverter(matchedDates[matchedDates.length - 1], tZone),
        tZone
      );

      timings[0].startTime = UTCTimeConverter(
        formData.startTime,
        metaData.startDate,
        tZone
      );

      timings[0].endTime = UTCTimeConverter(
        formData.endTime,
        metaData.endDate,
        tZone
      );
    }

    return {
      programName: formData.programName,
      masjidId,
      category: formData?.programCategory ?? "",
      description: formData.description,
      location: {
        type: "Point",
        coordinates: masjid?.location?.coordinates,
      },
      isPaid: formData?.registrationOption !== "free" ? true : false,
      cost: formData?.cost || "0",
      capacity: formData.capacity + "",
      metaData,
      timings,
      ageRange: {
        minimumAge: formData.ageOption === "All Age" ? 0 : formData.startRange,
        maximumAge: formData.ageOption === "All Age" ? 0 : formData.endRange,
      },
      address: formData.address ?? masjid?.address,
      ...(imgURLs?.length > 0 && { programPhotos: imgURLs }),
      ...(imgURLs?.length === 0 && isUpdate && { programPhotos: [] }),

      isRegistrationRequired: formData?.isRegistrationRequired ? true : false,
    };
  };

  const handleFinalSubmitting = async () => {
    const loadingToast = toast.loading("Submitting your program...");
    const imgURLs = await Promise.all(
      formData?.images.map((image: File) => uploadImage(image))
    );

    const isUpdate = Boolean(formData?.id);
    const programInput = prepareProgramInput(isUpdate, imgURLs);

    try {
      const mutation = isUpdate ? updateProgram : createProgram;
      const variables = isUpdate
        ? { id: formData.id, input: programInput }
        : { input: programInput };

      await mutation({ variables });
      toast.dismiss(loadingToast);
      // toast.success(
      //   `Program ${isUpdate ? "updated" : "created"} successfully`,
      //   {
      //     id: loadingToast,
      //   }
      // );
      setOpenSuccessModal(true);
    } catch (error) {
      toast.error(
        `Error ${isUpdate ? "updating" : "creating"} Program: ${
          error?.message
        }`,
        { id: loadingToast }
      );
    }
  };

  // useEffect(() => {
  //   if (!formData.ageOption) {
  //     setAgeOption(formData.ageOption || "All Age");
  //     handleChange({
  //       target: {
  //         name: "ageOption",
  //         value: formData.ageOption || "All Age",
  //       },
  //     } as React.ChangeEvent<HTMLInputElement>);
  //   } else if (formData.id && formData.endRange > 0) {
  //     setAgeOption("range");
  //     handleChange({
  //       target: {
  //         name: "ageOption",
  //         value: formData.ageOption || "range",
  //       },
  //     } as React.ChangeEvent<HTMLInputElement>);
  //   }
  // }, [formData.ageOption, formData.endRange]);

  const handleAgeToggle = (option: "All Age" | "range") => {
    setAgeOption(option);
    handleChange({
      target: {
        name: "ageOption",
        value: option,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  useEffect(() => {
    setImages(formData?.images);
  }, [formData?.images]);
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
  const setRecurrenceType = (type: string) => {
    setFormData({ ...formData, recurrenceType: type });
  };
  const inputChecker = (isValueExist: string, condition = false) => {
    if (condition && formData.isSubBtnClicked && !isValueExist)
      return "2px solid red";
    else return formData.isSubBtnClicked && !isValueExist ? "error-bdr" : "";
  };
  const formDataSetter = (name: string, value: string) => {
    handleChange({
      target: {
        name: name,
        value: value,
      },
    });
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    setIsPreviewVisible(false);
    setIsFormVisible?.(false);
    if (navigation) navigation("/feed/9");
    else customNavigatorTo("/feed/9");
  };

  return (
    <>
      <SuccessMessageModel
        message={` Program ${
          Boolean(formData?.id) ? "Updated" : "Added"
        } Successfully`}
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
      />
      {isPreviewVisible ? (
        <div>
          <ProgramView
            formData={formData}
            isPreviewMode={true}
            isLoading={progLoading || updateProgLoading}
            isEditing={false}
            setIsPreviewVisible={setIsPreviewVisible}
            handleDisclaimerStatus={handleFinalSubmitting}
            masjidId={masjidId}
          ></ProgramView>
        </div>
      ) : (
        <>
          <div className="announcement program-form-main-container">
            <div className="goback" style={{ margin: "0" }}>
              <BackButton handleBackBtn={handleBackBasedOnIsEditing} />
            </div>
            <h3
              className="page-title"
              style={{ color: "#3D5347", fontSize: "22px" }}
            >
              {isEditing ? "Update" : " Create"} an Program
            </h3>
            <p></p>
          </div>

          <div className="program-main-form">
            <ImageUploader
              images={images}
              updateEventPhotos={updateEventPhotos}
              handleImageUpload={handleImageUpload}
              handleImageDelete={handleImageDelete}
              handleDeleteImage={() => {}}
              openBar={false}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setIsDeleteWarningVisible={setIsDeleteWarningVisible}
              setMaxSteps={setMaxSteps}
            />
            <div className="form-container">
              <div className="form-group">
                <label htmlFor="programName">
                  Program Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  style={checkError("programName")}
                  id="programName"
                  name="programName"
                  value={formData.programName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <FormControl
                  sx={{
                    width: "100%",
                    borderRadius: "20px",
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#cfcfcf",
                        borderRadius: "20px",
                      },
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#2e2e2e",
                      marginBottom: "8px",
                      fontSize: "14px",
                    }}
                  >
                    Categories <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Select
                    id="programCategory"
                    name="programCategory"
                    value={formData.programCategory}
                    onChange={handleChange}
                    input={<OutlinedInput placeholder="Categories" />}
                    MenuProps={MenuProps}
                    displayEmpty
                    sx={{
                      ...checkError("programCategory"),
                      width: "100%",
                      borderRadius: "20px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#2e2e2e",
                          borderRadius: "20px",
                        },
                      },
                      "& .MuiSelect-select": {
                        padding: "8px 14px",
                        fontSize: "14px",
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em data-testid="category">Categories</em>
                    </MenuItem>
                    {categoriesList.map((service) => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/* Age Selection */}
              <div className="radio-group">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  mt={2}
                  width={"100%"}
                >
                  <Typography>Select Age</Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      display="flex"
                      alignItems="center"
                      padding={1}
                      onClick={() => handleAgeToggle("All Age")}
                      sx={{
                        cursor: "pointer",
                        userSelect: "none",
                        width: "35%",
                      }}
                    >
                      <img
                        src={
                          ageOption === "All Age"
                            ? selectedCircle
                            : nonSelectedCircle
                        }
                        alt="Circle"
                        style={{ height: 16, width: 16, marginRight: "5px" }}
                      />
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" marginRight={1}>
                          All Ages
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      padding={1}
                      onClick={() => handleAgeToggle("range")}
                      sx={{
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <img
                        src={
                          ageOption === "range"
                            ? selectedCircle
                            : nonSelectedCircle
                        }
                        alt="Circle"
                        style={{ height: 16, width: 16 }}
                      />
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2" marginLeft={1}>
                          Choose Range
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </div>
              {ageOption === "range" ? (
                <div className="range-amount">
                  <div className="form-group">
                    <input
                      type="number"
                      id="startRange"
                      // style={checkError("startRange")}
                      name="startRange"
                      value={formData.startRange}
                      onKeyDown={(e) => {
                        // Prevent entering 'e', '-', '+', '.', and any other non-numeric characters
                        if (["e", "E", "+", "-", "0"].includes(e.key)) {
                          if (e.key === "0" && formData.startRange >= 1) return;
                          else e.preventDefault();
                        }
                        if (e.key.length === 1 && e.key.startsWith("0")) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const value = Number(e.target.value);

                        if (value >= 0 && value <= 100) {
                          handleChange(e);
                        }
                      }}
                    />
                  </div>
                  <span>To</span>
                  <div className="form-group">
                    <input
                      type="number"
                      // style={checkError("endRange")}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= 100) {
                          handleChange(e);
                        }
                      }}
                      id="endRange"
                      name="endRange"
                      value={formData.endRange}
                    />
                  </div>
                </div>
              ) : null}
              {isEditing ? null : (
                <CommonFields
                  formData={formData}
                  handleChange={handleChange}
                  setValidationErrors={() => {}}
                  stripeFields={[isPaymentsSetup, isStripeLoading]}
                  admin={admin}
                />
              )}
              <div className="form-group">
                <label htmlFor="capacity">
                  Capacity <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  id="capacity"
                  placeholder="e.g.500"
                  name="capacity"
                  style={checkError("capacity")}
                  value={formData.capacity}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Check if the value starts with a zero and has more than one digit
                    if (value.length > 1 && value.startsWith("0")) {
                      // Remove the leading zero
                      handleChange({
                        target: { name: "capacity", value: value.slice(1) },
                      });
                    } else if (value.length === 1 && value.startsWith("0")) {
                      e.preventDefault();
                    } else {
                      handleChange(e);
                    }
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  style={checkError("description")}
                  value={formData.description || ""}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* {!isEditing ? (
                <>
                  <label htmlFor="recurrenceType">
                    Program Recurrence Type:
                  </label>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        inputProps={{ "data-testid": "event-recurrence-type" }}
                        id="recurrenceType"
                        name="recurrenceType"
                        value={formData.recurrenceType}
                        onChange={handleChange}
                        sx={{
                          borderRadius: "22px",
                          border: "1px solid #065f46",
                          marginBottom: "15px",
                          fontSize: "12px !important",
                          outlineColor: "none",
                          "& .MuiSelect-select.MuiInputBase-input": {
                            paddingBottom: "16.5px !important",
                            paddingLeft: "14px !important",
                            paddingRight: "32px !important",
                            paddingTop: "16.5px !important",
                          },
                        }}
                      >
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Random">Random</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="None">None</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </>
              ) : null} */}
              <div className="event-container ">
                {
                  // to fix 2nd time picker open issue
                  pickerClosed ? (
                    <div className="date-picker-container ">
                      {formData.recurrenceType === "Weekly" && !isEditing ? (
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
                              No selected weekday(s) fall within the chosen date
                              range.
                            </div>
                          )}
                        </>
                      ) : formData.recurrenceType === "Daily" && !isEditing ? (
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

                            height: "40px",
                          }}
                          format="DD/MMM/YYYY"
                          multiple
                          plugins={[<DatePanel markFocused />]}
                        />
                      ) : formData.recurrenceType === "Random" && !isEditing ? (
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
                            onClick={() => handleToggleCalendar("startDate")}
                          >
                            <label htmlFor="startDate">Start Date</label>
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
                              // readOnly
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
                              <span style={{ color: "red", fontSize: "10px" }}>
                                {startDateError}
                              </span>
                            )}
                          </div>

                          <EventClockTimePicker
                            pickerOpen={strDatePickerOpen}
                            // style={checkError("startTime")}
                            setPickerOpen={setStrDatePickerOpen}
                            label={
                              formData.recurrenceType !== "None"
                                ? "Each Day Start Time :"
                                : "Start Time "
                            }
                            id={"startTime"}
                            formDataSetter={formDataSetter}
                            tim={formData?.startTime}
                            // error={
                            //   inputChecker(formData.startTime) || startTimeError
                            // }
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
                  {formData.recurrenceType === "None" || isEditing ? (
                    <div
                      className="latitude-input"
                      style={{ position: "relative" }}
                      onClick={() => handleToggleCalendar("endDate")}
                    >
                      <label htmlFor="endDate">End Date</label>
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
                          : "Start Time"
                      }
                      id={"startTime"}
                      formDataSetter={formDataSetter}
                      tim={formData?.startTime}
                      // error={inputChecker(formData.startTime) || startTimeError}
                    />
                  )}

                  <EventClockTimePicker
                    pickerOpen={endDatePickerOpen}
                    setPickerOpen={setEndDatePickerOpen}
                    label={
                      formData.recurrenceType !== "None"
                        ? "Each Day End Time :"
                        : "End Time "
                    }
                    id={"endTime"}
                    formDataSetter={formDataSetter}
                    tim={formData?.endTime}
                    // error={inputChecker(formData.endTime) || endTimeError}
                  />
                </div>
              </div>
              {/* <>
                <div className="timeGroup">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      style={checkError("startDate")}
                      name="startDate"
                      value={formData.startDate || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      style={checkError("endDate")}
                      value={formData.endDate || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <DateTimeSelector
                  formData={formData}
                  handleChange={handleChange}
                  setValidationErrors={true}
                  showTiming={true}
                />
                <div className="timeGroup">
                  <div className="form-group">
                    <label htmlFor="startTime">Start Time</label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      style={checkError("startTime")}
                      value={convertTo24HourFormat(formData?.startTime) || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      style={checkError("endTime")}
                      value={convertTo24HourFormat(formData?.endTime) || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </> */}
              <div className="address-check-box">
                <label htmlFor="address">If Location Is Different</label>
                <Checkbox
                  checked={addressChecked}
                  onChange={
                    () => setAddressChecked(!addressChecked)
                    // handleChange()
                  }
                  inputProps={{ "aria-label": "controlled" }}
                  id="address"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      width: 20,
                      height: 15,
                    },
                  }}
                />
              </div>
              {addressChecked ? (
                <div className="form-group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address ?? masjid?.address}
                    onChange={handleChange}
                  />
                </div>
              ) : null}

              <div>
                <div
                  className={
                    formData?.registrationOption === "paid"
                      ? "reg-gray-checkbox"
                      : "reg_checkbox"
                  }
                >
                  <label htmlFor="reg_checkbox" data-testid="reg_checkbox">
                    User Required Registration
                  </label>
                  <Checkbox
                    disabled={
                      formData?.registrationOption === "paid" ? true : false
                    }
                    checked={
                      // formData?.isRegistrationRequired
                      formData?.registrationOption === "paid"
                        ? true
                        : formData?.isRegistrationRequired
                        ? true
                        : false
                    }
                    onChange={() => {
                      // const newValue = !regCheckBox;
                      // setRegCheckBox(newValue);

                      // Only call handleChange when the checkbox is checked

                      handleChange({
                        target: {
                          name: "isRegistrationRequired",
                          value: !formData.isRegistrationRequired,
                        },
                      });
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                    id="reg_checkbox"
                    sx={{
                      "& .MuiSvgIcon-root": {
                        width: 20,
                        height: 15,
                      },
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  // disabled={!isFormValid}
                  className="btn program-action-btn"
                >
                  <img src={nextIcon} alt="Next" className="btn-icon" />
                  <span className="btn-text">Next</span>
                </button>
              </div>
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
                          typeof value === "function"
                            ? value(new Date())
                            : value;
                        const formattedDate = format(
                          dateValue,
                          "yyyy-MM-dd'T'HH:mm:ssxxx"
                        );
                        handleChange({
                          target: {
                            name: selectedDateField,
                            value: formattedDate,
                          },
                        });
                      }}
                    />
                  </div>
                </Backdrop>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProgramForm;
