import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import "./EventPageFormComponent.css";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { DatePicker as SingleDatePicker } from "@material-ui/pickers";
import { TimePicker as SingleTimePicker } from "@material-ui/pickers";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { addNewEvent } from "../../../../redux/actions/EventActions/AddingNewEventAction";
import { handleSnackbar } from "../../../../helpers/SnackbarHelper/SnackbarHelper";
import { CircularProgress } from "@material-ui/core";
// import UpdateForEvents from "../../../EditProfileComponents/UpdateProfileImageComponent/UpdateForEvents";
import { UpdateEventById } from "../../../../redux/actions/EventActions/UpdatingEventAction";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router";
import BackButton from "../../../../photos/BackButton.png";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { fetchMasjidById } from "../../../../redux/actions/MasjidActions/fetchMasjidById";
import FileUploadEvent from "../../../EditProfileComponents/UpdateProfileImageComponent/AddImageforEvents";
// import DragDownComponent from "../../../EditProfileComponents/UpdateProfileImageComponent/DragDownComponent/DragDownComponent";
import { ChangeSnackbar } from "../../../../redux/actions/SnackbarActions/ChangeSnackbarAction";
import axios from "axios";
import {
  // CompletionEvent,
  EventCompletionAction,
} from "../../../../redux/actions/EventActions/EventCompletionAction";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import {
  AuthTokens,
  EventType,
  MetaData,
  ResponseType,
} from "../../../../redux/Types";

type propsType = {
  ComponentPurpose: string;
  EventDetails: EventType | undefined;
  setEventDetails?: Dispatch<SetStateAction<EventType | undefined>>;
  setIsUpdating?: Dispatch<SetStateAction<boolean>>;
  setAddingEvent?: Dispatch<SetStateAction<boolean>>;
  setEventPhotos?: any;
  EventPhotos?: any;
  AddingEvent?: boolean;
};
const EventPageFormComponent = ({
  ComponentPurpose,
  EventDetails,
  setAddingEvent,
  AddingEvent,
  setEventDetails,
  setIsUpdating,
  setEventPhotos,
  EventPhotos,
}: propsType) => {
  const [RecurrenceType, setRecurrenceType] = useState("None");
  const [EventNameError, setEventNameError] = useState(false);
  const [EventAddressError, setEventAddressError] = useState(false);
  const [EventLatitudeError, setEventLatitudeError] = useState(false);
  const [EventLongitudeError, setEventLongitudeError] = useState(false);
  const [EventDescError, setEventDescError] = useState(false);
  const [EventOcccurenceError, setEventOcccurenceError] = useState(false);
  const [EventTimingEmpty, setEventTimingEmpty] = useState(false);
  let NewEventNameRef = useRef<HTMLInputElement>(null);
  let NewEventDescriptionRef = useRef<HTMLInputElement>(null);
  let NewEventAddressRef = useRef<HTMLInputElement>(null);
  let LatitudeRef = useRef<HTMLInputElement>(null);
  let LongitudeRef = useRef<HTMLInputElement>(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] =
    useState<MaterialUiPickersDate>(selectedStartDate);
  const [selectedStartTime, setSelectedStartTime] =
    useState<MaterialUiPickersDate>(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState<MaterialUiPickersDate>(
    new Date()
  );
  const [DateValue, setDateValue] = useState<any>([]);
  const [DateValues, setDateValues] = useState<any>();
  const [DraggedImage, setDraggedImage] = useState<File>();
  // const [EventPhotos, setEventPhotos] = useState(EventDetails?.eventPhotos);
  const [AdminMasjid, setAdminMasjid] = useState();
  const [MasjidUploadPhoto, setMasjidUploadPhoto] = useState<File>();
  const [EventUploadPhoto, setEventUploadPhoto] = useState<File>();
  // const [mazjidId, setmazjidId] = useState(EventDetails?.data?.data[0]?.masjid);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const dispatch = useAppDispatch();
  const [IsAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const Mazjid = useAppSelector((state) => state.admin);
  let MazjidId = Mazjid?.masjids[0];
  // const [Popup, setPopup] = useState(false);
  console.log(MazjidId);

  const handleStartDateChange = (date: any) => {
    setSelectedStartDate(date);
    setSelectedEndDate(date);
  };

  const handleRecurrenceChange = (val: string) => {
    setRecurrenceType(val);
    EventOcccurenceError && setEventOcccurenceError(false);
  };

  const handleCompletionEvent = () => {
    dispatch(EventCompletionAction(true));
  };

  useEffect(() => {
    if (MazjidId) {
      const response = dispatch(fetchMasjidById(MazjidId));
      response.then((result) => {
        if (!result.timings === null) {
          handleSnackbar(
            true,
            "error",
            `Failed To Fetch :${result.message}`,
            dispatch
          );
        } else {
          setAdminMasjid(result.data);
        }
      });
    }
  }, [MazjidId]);

  const API = axios.create({
    baseURL: "https://squid-app-7wo7y.ondigitalocean.app/api/",
  });

  API.interceptors.request.use(
    async (req) => {
      if (localStorage.getItem("authTokens")) {
        const authTokensString = localStorage.getItem("authTokens");
        const token: AuthTokens | null = authTokensString
          ? JSON.parse(authTokensString)
          : null;

        if (token?.accessToken) {
          req.headers.Authorization = `Bearer ${token?.accessToken}`;
        } else {
          req.headers.Authorization = `Bearer ${token?.token}`;
        }
      }

      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const uploadHandler = (id: string) => {
    if (id) {
      const formData = new FormData();
      formData.append("image", MasjidUploadPhoto as File);

      API.post(`v1/media/${MazjidId}/upload/${id}`, formData)
        .then((res) => {
          setTimeout(() => {
            let data = {
              _id: res.data.data._id,
              url: res.data.data.url,
            };
            // console.log(res.data.data);
            handleCompletionEvent();
            handleSnackbar(
              true,
              "success",
              "Created Event SuccessFully",
              dispatch
            );
            setAddingEvent?.(false);
            setIsAdding(false);
            navigate("/eventprofile/" + id);
            setMasjidUploadPhoto(undefined);
          }, 3000);
        })
        .catch((error) => {
          const snackbarFailureDetails = {
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.response.data
              ? error.response.data.message
              : "Adding Masjid Media Failed",
          };
          // setOpenBar(false);
          dispatch(ChangeSnackbar(snackbarFailureDetails));
        });
    }
  };

  const uploadHandlerEvent = (id: string) => {
    if (id) {
      const formData = new FormData();
      formData.append("image", EventUploadPhoto as File);

      API.post(`v1/media/${MazjidId}/upload/${id}`, formData)
        .then((res) => {
          let data = {
            _id: res.data.data._id,
            url: res.data.data.url,
          };
          handleSnackbar(
            true,
            "success",
            "Updated Event SuccessFully",
            dispatch
          );
          setEventPhotos([...EventPhotos, data]);
          setIsUpdating?.(false);
          setIsAdding(false);

          setMasjidUploadPhoto(undefined);
        })
        .catch((error) => {
          const snackbarFailureDetails = {
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: error.response.data
              ? error.response.data.message
              : "Adding Masjid Media Failed",
          };
          // setOpenBar(false);
          setIsAdding(false);
          setIsUpdating?.(false);
          dispatch(ChangeSnackbar(snackbarFailureDetails));
        });
    }
  };

  const handleAddNewEvent = () => {
    if (!NewEventNameRef.current?.value) {
      setEventNameError(true);
    } else if (NewEventNameRef.current?.value) {
      setEventNameError(false);
    }

    if (!NewEventDescriptionRef.current?.value) {
      setEventDescError(true);
    } else if (NewEventDescriptionRef.current?.value) {
      setEventDescError(false);
    }

    if (!NewEventAddressRef.current?.value) {
      setEventAddressError(true);
    } else if (NewEventAddressRef.current?.value) {
      setEventAddressError(false);
    }

    if (!LatitudeRef.current?.value) {
      setEventLatitudeError(true);
    } else if (LatitudeRef.current?.value) {
      setEventLatitudeError(false);
    }

    if (!LongitudeRef.current?.value) {
      setEventLongitudeError(true);
    } else if (LongitudeRef.current?.value) {
      setEventLongitudeError(false);
    }

    if (RecurrenceType === null || RecurrenceType === "") {
      setEventOcccurenceError(true);
    } else {
      setEventOcccurenceError(false);
    }

    let timings: any;
    let metaData: any;
    if (RecurrenceType === "None") {
      metaData = {
        startDate: moment(selectedStartDate).format("YYYY-MM-DD"),
        endDate: moment(selectedEndDate).format("YYYY-MM-DD"),
        recurrenceType: RecurrenceType,
      };
    } else if (RecurrenceType === "Daily") {
      if (DateValues.length > 0) {
        metaData = [
          {
            startDate: DateValues[0].format("YYYY-MM-DD"),
            endDate: DateValues[1].format("YYYY-MM-DD"),
            recurrenceType: RecurrenceType,
          },
        ];
      } else {
        setEventTimingEmpty(true);
      }
    } else {
      if (DateValue.length > 0) {
        let MultipleMetaData: any[] = [];
        DateValue.map((_: any, key: number) => {
          let meta = {
            startDate: DateValue[key].format("YYYY-MM-DD"),
            endDate: DateValue[key].format("YYYY-MM-DD"),
            recurrenceType: RecurrenceType,
          };

          MultipleMetaData.push(meta);
        });
        metaData = [...MultipleMetaData];
      } else {
        setEventTimingEmpty(true);
      }
    }

    if (RecurrenceType === "None") {
      timings = [
        {
          startTime: moment(selectedStartTime).unix(),
          endTime: moment(selectedEndTime).unix(),
        },
      ];
    } else if (RecurrenceType === "Daily") {
      if (DateValues?.length > 0) {
        timings = [
          {
            startTime: moment(selectedStartTime).unix(),
            endTime: moment(selectedEndTime).unix(),
          },
        ];
      } else {
        setEventTimingEmpty(true);
      }
    } else {
      if (DateValue.length > 0) {
        let MultipleTimings: any = [];
        DateValue.map((item: any, key: number) => {
          let time = {
            startDate: DateValue[key].format("MM/DD/YYYY"),
            startTime: moment(selectedStartTime).unix(),
            endTime: moment(selectedEndTime).unix(),
            endDate: DateValue[key].format("MM/DD/YYYY"),
          };

          MultipleTimings.push(time);
        });
        timings = [...MultipleTimings];
      } else {
        setEventTimingEmpty(true);
      }
    }

    if (
      NewEventNameRef.current?.value !== EventDetails?.eventName ||
      NewEventAddressRef.current?.value !== EventDetails?.address ||
      NewEventDescriptionRef.current?.value !== EventDetails?.description ||
      timings?.length > 0
    ) {
      let uploadData = {
        eventName: NewEventNameRef.current?.value ?? "",
        address: NewEventAddressRef.current?.value ?? "",
        mazjidName: AdminMasjidState?.masjidName,
        description: NewEventDescriptionRef.current?.value ?? "",
        location: {
          coordinates: AdminMasjidState?.location?.coordinates,
          type: "Point",
        },
        timings: timings,
        metaData: metaData,
      };
      EventTimingEmpty && setEventTimingEmpty(false);

      setIsAdding(true);
      if (ComponentPurpose === "Update") {
        const data = dispatch(
          UpdateEventById(uploadData, MazjidId, EventDetails?._id ?? "")
        );
        data.then(function (result: ResponseType) {
          if (result.message === "Event updated successfully") {
            if (EventUploadPhoto instanceof File) {
              uploadHandlerEvent(result.data._id);
              setEventDetails?.(result.data);
            } else {
              setIsAdding(false);
              setIsUpdating?.(false);
              setEventDetails?.(result.data);
            }
          } else {
            setIsAdding(false);
            setIsUpdating?.(false);
          }
        });
      } else {
        const data = dispatch(addNewEvent(uploadData, MazjidId));
        data.then(function (result: ResponseType) {
          if (result.status === 201) {
            // console.log(MasjidUploadPhoto)
            if (EventUploadPhoto instanceof File) {
              uploadHandler(result.data.data._id);
            } else {
              handleCompletionEvent();
              handleSnackbar(
                true,
                "success",
                "Created Event SuccessFully",
                dispatch
              );
              setAddingEvent?.(false);
              setIsAdding(false);
              navigate("/eventprofile/" + result?.data?.data?._id);
            }
          } else {
            setIsAdding(false);
          }
        });
      }
    } else {
      if (EventTimingEmpty) {
        handleSnackbar(true, "error", "Please Choose Dates", dispatch);
      } else {
        handleSnackbar(
          true,
          "error",
          "Please Enter All The  Details",
          dispatch
        );
      }
    }
  };

  const handleStartTimeChange = (time: MaterialUiPickersDate) => {
    setSelectedStartTime(time);
    setSelectedEndTime(time);
  };

  return (
    <>
      <div className="AddEventsFormContainer">
        <div className="CreateEvents">
          <span className="EventsData">
            {ComponentPurpose === "Update" ? "Update Events" : "Create Event"}
          </span>
          <MdCancel
            className="MasjidEventsCancelIconForEvents"
            onClick={(e) => {
              setAddingEvent?.(!AddingEvent);
            }}
          />
        </div>
        <div className="DetailsOfEventsContainer">
          <div className="AddEventForm">
            <TextField
              size="small"
              autoFocus
              margin="dense"
              autoComplete="Off"
              id="outlined-size-small"
              placeholder="Event Name"
              onChange={(e) => {
                if (EventNameError) {
                  if (!NewEventNameRef.current?.value) {
                    setEventNameError(true);
                  } else if (NewEventNameRef.current?.value) {
                    setEventNameError(false);
                  }
                }
              }}
              error={EventNameError}
              helperText={EventNameError ? "Manditory field" : ""}
              sx={{
                "& .MuiOutlinedInput-notchedOutline ": {
                  borderColor: "black",
                },
              }}
              type="text"
              fullWidth
              defaultValue={
                ComponentPurpose === "Update" ? EventDetails?.eventName : ""
              }
              inputRef={NewEventNameRef}
              variant="outlined"
            />
            <div className="DescEvents">
              <TextField
                id="outlined-required"
                variant="outlined"
                onChange={(e) => {
                  if (EventDescError) {
                    if (!NewEventDescriptionRef.current?.value) {
                      setEventDescError(true);
                    } else if (NewEventDescriptionRef.current?.value) {
                      setEventDescError(false);
                    }
                  }
                }}
                placeholder="Description"
                multiline
                rows={4}
                error={EventDescError}
                helperText={EventDescError ? "Manditory field" : ""}
                defaultValue={
                  ComponentPurpose === "Update" ? EventDetails?.description : ""
                }
                inputRef={NewEventDescriptionRef}
                type="text"
                autoComplete="Off"
                sx={{
                  "& .MuiFormControl-root": {
                    width: 100,
                  },
                  "& .MuiOutlinedInput-notchedOutline ": {
                    borderColor: "black",
                  },
                }}
              />
            </div>
            <TextField
              id="outlined-size-small"
              size="small"
              variant="outlined"
              autoComplete="Off"
              placeholder="Event Address"
              // sx={{
              //   "& .MuiOutlinedInput-notchedOutline ":{
              //     borderColor:"black"
              //   }
              // }}
              onChange={(e) => {
                if (EventAddressError) {
                  if (!NewEventAddressRef.current?.value) {
                    setEventAddressError(true);
                  } else if (NewEventAddressRef.current?.value) {
                    setEventAddressError(false);
                  }
                }
              }}
              error={EventAddressError}
              helperText={EventAddressError ? "Manditory field" : ""}
              inputRef={NewEventAddressRef}
              defaultValue={
                ComponentPurpose === "Update"
                  ? EventDetails?.address
                  : AdminMasjidState?.address
              }
              fullWidth
              type="text"
            />
            <div className="EventReccurence">
              <FormControl size="small">
                <InputLabel>Recurrence</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  error={EventOcccurenceError}
                  value={RecurrenceType}
                  defaultValue={RecurrenceType}
                  placeholder="Choose The Recurrence type"
                  onChange={(e) => handleRecurrenceChange(e.target.value)}
                >
                  <MenuItem value={"RandomDates"}>Choose Random Dates</MenuItem>
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"None"}>None</MenuItem>
                </Select>
                {EventOcccurenceError && (
                  <p style={{ color: "red" }}>Error Please Choose Recurrence</p>
                )}
              </FormControl>
            </div>
            {RecurrenceType === "RandomDates" && (
              <DatePicker
                // size="small"
                value={DateValue}
                onChange={setDateValue}
                // rows={4}
                placeholder="Pick the dates of  recurrence"
                style={{ width: "98%", height: "4vh", cursor: "pointer" }}
                minDate={new Date()}
                // fullWidth
                // autoComplete="Off"
                format="MM/DD/YYYY"
                multiple
                plugins={[<DatePanel markFocused />]}
              />
            )}

            {RecurrenceType === "Daily" && (
              <DatePicker
                // size="small"
                value={DateValues}
                onChange={setDateValues}
                // rows={4}
                range
                minDate={new Date()}
                placeholder="Select the range for recurrence"
                style={{
                  width: "98%",
                  height: "4vh",
                  marginTop: 1,
                  marginBottom: 1,
                  cursor: "pointer",
                }}
                // autoComplete="Off"
                format="MM/DD/YYYY"
                multiple
                plugins={[<DatePanel markFocused />]}
              />
            )}

            {RecurrenceType === "None" && ComponentPurpose !== "Update" && (
              <>
                <div className="DateContainer">
                  <SingleDatePicker
                    size="small"
                    disableToolbar
                    // inputvariant="outlined"
                    format="dd/MM/yyyy"
                    minDate={new Date()}
                    // sx={{ marginTop: 1, cursor: "pointer" }}
                    label="Event Start Date "
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                  />
                  <SingleDatePicker
                    size="small"
                    disableToolbar
                    // inputvariant="outlined"
                    format="dd/MM/yyyy"
                    minDate={selectedStartDate}
                    label="Event End Date "
                    value={selectedEndDate}
                    onChange={setSelectedEndDate}
                  />
                </div>
              </>
            )}
          </div>
          <div className="RightPhotoContainer">
            <div className="AddingPhoto">
              <>
                <FileUploadEvent
                  EventId={EventDetails?._id ?? ""}
                  MasjidId={MazjidId}
                  DraggedImage={DraggedImage}
                  // setDraggedImage={setDraggedImage}
                  eventPhotos={EventPhotos}
                  setEventsPhotos={setEventPhotos}
                  setEventUploadPhoto={setEventUploadPhoto}
                  setMasjidUploadPhoto={setMasjidUploadPhoto}
                />
              </>
            </div>
            <div className="DateTimeContainer">
              <SingleTimePicker
                size="small"
                autoOk
                inputVariant="outlined"
                label="Start time"
                // sx={{ marginBottom: 3, cursor: "pointer" }}
                value={selectedStartTime}
                onChange={handleStartTimeChange}
              />

              <SingleTimePicker
                size="small"
                autoOk
                label="End Time"
                inputVariant="outlined"
                // sx={{ marginBottom: 3 }}
                value={selectedEndTime}
                // minDate={selectedStartTime}
                onChange={(newValue) => {
                  setSelectedEndTime(newValue);
                }}
              />
            </div>
          </div>
        </div>
        <div className="ButtonContainerFormContainer">
          <button className="MasjidAddEventFormContainer">
            <span
              className="MasjidAddEventButtontitle"
              onClick={(e) => {
                handleAddNewEvent();
              }}
            >
              {IsAdding ? (
                <CircularProgress color="inherit" size="20px" />
              ) : ComponentPurpose === "Update" ? (
                "Update Event"
              ) : (
                "Preview Event"
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default EventPageFormComponent;
