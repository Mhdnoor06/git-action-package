import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import MaterialTable, { Column } from "@material-table/core";
import "./ManageTimingsMaterialTable.css";
import moment from "moment";
// import { TextField, Input } from "@material-ui/core";
import { TimeColumns } from "./TimeColumns";
import { useDispatch, useSelector } from "react-redux";
// import { addNewTimings } from "../../../../../redux/actions/TimingsActions/AddingNewTimings";
import { handleSnackbar } from "../../../../../helpers/SnackbarHelper/SnackbarHelper";
// import { updateRandomTiming } from "../../../../../redux/actions/TimingsActions/UpdatingRandomDaysTimings";
// import { AddingNamazRandomTimings } from "../../../../../redux/actions/TimingsActions/AddingNamazRandomTimings";
// import { deleteRandomDayTiming } from "../../../../../redux/actions/TimingsActions/DeletingRandomTimings";
// import { UpdateBulkTiming } from "../../../../../redux/actions/TimingsActions/UpdatingBulkTimings";
// import { deleteAllTiming } from "../../../../../redux/actions/TimingsActions/DeleteAllTimings";
// import { useStyles } from "@material-ui/pickers/views/Month/MonthView";
// import { FetchingTimingsById } from "../../../../../redux/actions/TimingsActions/FetchingTimingsById";
import { FetchingTimingsByDateRange } from "../../../../../redux/actions/TimingsActions/FetchingTimingsByDateRangeAction";
import ModalComponent from "../../../../HelperComponents/ModalComponent/ModalComponent";
import { addTiming } from "../../../../../redux/actions/TimingsActions/AddTiming";
import { addTimingByRange } from "../../../../../redux/actions/TimingsActions/AddingTimingsByRange";
import { UpdateTimingsByDateRange } from "../../../../../redux/actions/TimingsActions/UpdateTimingsByDateRange";
import { UpdateAllTimingsOfSingleDay } from "../../../../../redux/actions/TimingsActions/UpdateAllTimingsOfSingleDay";
import { DeletingTimingsByDateRange } from "../../../../../redux/actions/TimingsActions/DeleteTimingsByRange";
import { DeletingAllTimingsByDateRange } from "../../../../../redux/actions/TimingsActions/DeletingAllTimingsByRange";
import {
  useAppSelector,
  useAppThunkDispatch,
} from "../../../../../redux/hooks";
import {
  NamajTiming,
  NamazTimings,
  PrayerTimings,
  ResponseType,
  Timing,
} from "../../../../../redux/Types";

// import { Delete } from '@material-ui/icons';

type propsType = {
  CurrentSelectedDayTimings: NamajTiming<number>[];
  APITimings: any;
  ThreeMonthTimings: PrayerTimings<number>[];
  startDate: Date;
  RangeHasTimings: boolean;
  endDate: Date;
  setCurrentSelectedDayTimings: Dispatch<SetStateAction<NamajTiming<number>[]>>;
  handleSettingUpCalendar: () => void;
  setThreeMonthTimings: Dispatch<SetStateAction<PrayerTimings<number>[]>>;
};
const ManageTimingsMaterialTable = ({
  CurrentSelectedDayTimings,
  APITimings,
  ThreeMonthTimings,
  startDate,
  RangeHasTimings,
  endDate,
  setCurrentSelectedDayTimings,
  handleSettingUpCalendar,
  setThreeMonthTimings,
}: propsType) => {
  type BulkDataType = {
    StartDate: string;
    EndDate: string;
    UploadDataCollected: any[];
  };
  type BulkSingleType = {
    formData: any;
    masjidId: string;
    timingId: string;
  };
  const [CheckForWrongAction, setCheckForWrongAction] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  let AdminMasjidState = useAppSelector((state) => state.AdminMasjid);
  const dispatch = useAppThunkDispatch();
  // const admin = JSON.parse(localStorage.getItem("admin"));
  const startMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endNextMonth = moment().add(1, "M").endOf("month").format("YYYY-MM-DD");
  const [IsDeleting, setIsDeleting] = useState(false);

  const [UpdatingTimings, setUpdatingTimings] = useState(false);
  const [BulkUpdatingModal, setBulkUpdatingModal] = useState(false);
  const [BulkUpdateData, setBulkUpdateData] = useState<BulkDataType>();

  const [UpdatingBulkSingle, setUpdatingBulkSingle] = useState(false);
  const [UpdateBulkSingleModal, setUpdateBulkSingleModal] = useState(false);
  const [UpdateBulkSingleData, setUpdateBulkSingleData] =
    useState<BulkSingleType>();

  const [AddingBulkSingle, setAddingBulkSingle] = useState(false);
  const [AddBulkSingleModal, setAddBulkSingleModal] = useState(false);
  const [AddBulkSingleData, setAddBulkSingleData] =
    useState<NamazTimings<string>>();

  const [AddingTimings, setAddingTimings] = useState(false);
  const [BulkAddingModal, setBulkAddingModal] = useState(false);
  const [BulkAddData, setBulkAddData] = useState<BulkDataType>();

  const [AddingNamaz, setAddingNamaz] = useState(false);
  const [AddingNamazModal, setAddingNamazModal] = useState(false);

  const [AddingNamazData, setAddingNamazData] = useState<any>([]);

  const [UpdatingNamaz, setUpdatingNamaz] = useState(false);
  const [UpdatingNamazModal, setUpdatingNamazModal] = useState(false);
  const [UpdatingNamazData, setUpdatingNamazData] = useState<any>([]);

  const [DeletingTimings, setDeletingTimings] = useState(false);
  const [DeletingTimingsModal, setDeletingTimingsModal] = useState(false);
  const [DeletingTimingsData, setDeletingTimingsData] = useState([]);

  const Mazjid = useAppSelector((state) => state.admin);
  let MazjidId = Mazjid.masjids[0];
  let selectedStartDateOfRange = moment(startDate);
  let selectedEndDateofRange = moment(endDate);
  const [DisableEditing, setDisableEditing] = useState(true);
  const [disabledRows, setDisabledRows] = useState(new Set());

  // Add row id to disabledRows set
  const handleDisableRow = (id: string) => {
    setDisabledRows((prevRows) => new Set([...prevRows, id]));
  };

  // Remove row id from disabledRows set
  const handleEnableRow = (id: string) => {
    setDisabledRows(
      (prevRows) => new Set([...prevRows].filter((rowId) => rowId !== id))
    );
  };

  // Check if row id is in disabledRows set
  const isRowDisabled = (id: string) => disabledRows.has(id);

  useEffect(() => {
    let currentDateFormat =
      moment(startDate).format("YYYY-MM-DD") + "T00:00:00.000Z";

    let timingDate = ThreeMonthTimings.filter(
      (item) => item.date === currentDateFormat
    );

    if (timingDate.length > 0) {
      setCurrentSelectedDayTimings(timingDate[0]?.timings);
    } else {
      setCurrentSelectedDayTimings(APITimings);
    }

    let selectedStartDate = moment(startDate);
    let selectedEndDate = moment(endDate);

    if (selectedStartDate.isSame(selectedEndDate)) {
      DisableEditing && setDisableEditing(false);
    } else {
      !DisableEditing && setDisableEditing(true);
    }
  }, [startDate, endDate, ThreeMonthTimings]);

  const getTimingsByRange = () => {
    const res = dispatch(
      FetchingTimingsByDateRange(startMonth, endNextMonth, MazjidId)
    );
    res.then((result) => {
      if (result.status === 200) {
        setThreeMonthTimings(result.data.data);
        handleSettingUpCalendar();
      }
    });
  };

  const handleAddingNewTimingsIntoCurrentTimings = (
    insertData: PrayerTimings<number>[] | any
  ) => {
    if (insertData.length > 1) {
      for (let i = 0; i < insertData.length; i++) {
        ThreeMonthTimings.push(insertData[i]);
      }
    } else {
      ThreeMonthTimings.push(insertData);
    }
    setCurrentSelectedDayTimings(insertData.timings);
    handleSettingUpCalendar();
    // handleSettingUpCalendar(ThreeMonthTimings);
  };

  const timings = ThreeMonthTimings.filter(
    (item) =>
      item.date === moment(startDate).format("YYYY-MM-DD") + "T00:00:00.000Z"
  );

  // handling addingtion into  current timings
  const handleAdditionNetworkCall = (
    UploadData: NamazTimings<number>[] | any
  ) => {
    setAddingBulkSingle(true);
    const res = dispatch(addTiming(UploadData, MazjidId));
    res.then((result) => {
      if (result.message === "Success") {
        setAddingBulkSingle(false);
        setAddBulkSingleModal(false);
        handleAddingNewTimingsIntoCurrentTimings(result.data);
        if (UploadData.length > 0) {
          setCurrentSelectedDayTimings(UploadData[0].timings);
        } else {
          setCurrentSelectedDayTimings(UploadData.timings);
        }

        handleSnackbar(true, "success", "SucessFully Added Timings", dispatch);
      } else {
        setAddBulkSingleModal(false);
        setAddingBulkSingle(false);
        handleSnackbar(
          true,
          "error",
          "Failed to add Timings" + result.message,
          dispatch
        );
      }
    });
  };

  // handling addingtion into  multiple Days timings
  const handleAdditionRangeNetworkCall = (
    startDate: string,
    endDate: string,
    UploadData: any[]
  ) => {
    setAddingTimings(true);
    const res = dispatch(
      addTimingByRange(startDate, endDate, UploadData, MazjidId)
    );
    res.then((result: ResponseType) => {
      if (result.message === "Timings added") {
        setCurrentSelectedDayTimings(UploadData);
        getTimingsByRange();
        setAddingTimings(false);

        setBulkAddingModal(false);
        handleSnackbar(true, "success", "SucessFully Added Timings", dispatch);
      } else {
        setAddingTimings(false);

        setBulkAddingModal(false);
        handleSnackbar(
          true,
          "error",
          "Failed to add Timings" + result.message,
          dispatch
        );
      }
    });
  };

  const handleUpdateRandomNetworkCall = (
    startDate: string,
    endDate: string,
    UploadData: any[]
  ) => {
    setUpdatingTimings(true);
    setAddingNamaz(true);
    setUpdatingNamaz(true);

    const res = dispatch(
      UpdateTimingsByDateRange(startDate, endDate, UploadData, MazjidId)
    );
    res.then((result) => {
      if (result.message === "Timings updated") {
        setCurrentSelectedDayTimings(UploadData);
        getTimingsByRange();
        setAddingNamaz(false);
        setAddingNamazModal(false);
        setUpdatingNamaz(false);
        setUpdatingTimings(false);
        setUpdatingNamazModal(false);
        handleSnackbar(
          true,
          "success",
          "SucessFully Updated Timings",
          dispatch
        );
      } else {
        setUpdatingTimings(false);
        setAddingNamaz(false);
        setUpdatingNamazModal(false);
        setUpdatingNamaz(false);
        setAddingNamazModal(false);
        handleSnackbar(
          true,
          "error",
          "Failed to Update Timings" + result.message,
          dispatch
        );
      }
    });
  };

  // has updated in current timings function
  const handleUpdationBulkNetworkCall = (
    UploadData: any,
    masjidId: string,
    timingId: string
  ) => {
    setUpdatingNamaz(true);
    let formData = { ...UploadData };
    setUpdatingBulkSingle(true);
    const res = dispatch(
      UpdateAllTimingsOfSingleDay(formData, masjidId, timingId)
    );
    res.then((result: ResponseType) => {
      if (result.message === "Data updated") {
        setUpdatingBulkSingle(false);
        getTimingsByRange();
        setCurrentSelectedDayTimings(UploadData.timings);
        setUpdateBulkSingleModal(false);
        setUpdatingNamaz(false);
        setAddingNamazModal(false);
        setUpdatingNamazModal(false);

        setCurrentSelectedDayTimings(result.data.timings);
        handleSnackbar(
          true,
          "success",
          "SucessFully Updated Timings",
          dispatch
        );
      } else {
        setUpdatingNamazModal(false);
        setAddingNamazModal(false);
        setUpdatingBulkSingle(false);
        setUpdatingNamaz(false);
        setUpdateBulkSingleModal(false);
        handleSnackbar(
          true,
          "error",
          `Failed To Edit The Timings:${result.message}`,
          dispatch
        );
      }
    });
  };

  const handleDeletionRangeCall = (UploadData: NamajTiming<number>) => {
    let start = moment(startDate).format("YYYY-MM-DD");
    let end = moment(endDate).format("YYYY-MM-DD");

    setIsDeleting(true);
    const res = dispatch(
      DeletingTimingsByDateRange(start, end, MazjidId, UploadData.namazName)
    );
    res.then((result: ResponseType) => {
      if (result.message === "Timings deleted") {
        getTimingsByRange();
        setCurrentSelectedDayTimings([]);
        setIsDeleting(false);
        handleSnackbar(true, "success", "SucessFully Delete Timings", dispatch);
      } else {
        setIsDeleting(false);
        handleSnackbar(
          true,
          "error",
          "Failed to Delete Timings" + result.message,
          dispatch
        );
      }
    });
  };

  const handleDeleteAllByRange = () => {
    let start = moment(startDate).format("YYYY-MM-DD");
    let end = moment(endDate).format("YYYY-MM-DD");
    setDeletingTimings(true);

    setIsDeleting(true);
    const res = dispatch(DeletingAllTimingsByDateRange(start, end, MazjidId));
    res.then((result: ResponseType) => {
      if (result.message === "Timings deleted") {
        getTimingsByRange();
        setCurrentSelectedDayTimings([]);
        setIsDeleting(false);
        setDeletingTimings(false);
        setDeleteData(false);
        setDeletingTimingsModal(false);
        handleSnackbar(true, "success", "SucessFully Delete Timings", dispatch);
      } else {
        setIsDeleting(false);
        setDeletingTimings(false);
        setDeleteData(false);
        setDeletingTimingsModal(false);
        handleSnackbar(
          true,
          "error",
          "Failed to Delete Timings" + result.message,
          dispatch
        );
      }
    });
  };

  const MasjidTimingType = (namazName: string) => {
    if (namazName === "Fajr") {
      return 1;
    } else if (namazName === "Dhur") {
      return 2;
    } else if (namazName === "Asar") {
      return 3;
    } else if (namazName === "Maghrib") {
      return 4;
    } else if (namazName === "Isha") {
      return 5;
    } else {
      return 0;
    }
  };

  const handleOnBulkUpdateSingleDate = (
    changes: any,
    // selectedStartDate,
    selectedEndDate: any
  ) => {
    const timings = ThreeMonthTimings.filter(
      (item) =>
        item.date ===
        moment(selectedEndDate).format("YYYY-MM-DD") + "T00:00:00.000Z"
    );

    if (timings.length > 0) {
      // timings already exists so updating
      let timingArray: NamajTiming<number>[] = [];
      if (Object.keys(changes).length > 0) {
        Object.keys(changes).forEach((k, i) => {
          let uploadData: any;
          let newData = changes[k].newData;

          if (typeof newData.azaanTime === "string") {
            newData = {
              namazName: newData.namazName,
              azaanTime: moment(newData.azaanTime, ["HH:mm"]).format(
                "YYYY-MM-DD  hh:mm a"
              ),
              jamaatTime: newData.jamaatTime,
            };
          }
          if (typeof newData.jamaatTime === "string") {
            newData = {
              namazName: newData.namazName,
              azaanTime: newData.azaanTime,
              jamaatTime: moment(newData.jamaatTime, ["HH:mm"]).format(
                "YYYY-MM-DD  hh:mm a"
              ),
            };
          }

          if (typeof newData.azaanTime === "string") {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: moment(newData.azaanTime).unix(),
              jamaatTime: newData.jamaatTime,
            };
          }
          if (typeof newData.jamaatTime === "string") {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: newData.azaanTime,
              jamaatTime: moment(newData.jamaatTime).unix(),
            };
          }
          if (
            typeof newData.azaanTime === "string" &&
            typeof newData.jamaatTime === "string"
          ) {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: moment(newData.azaanTime).unix(),
              jamaatTime: moment(newData.jamaatTime).unix(),
            };
          }
          timingArray.push({ ...uploadData });
        });
        let OriginalTimings = timings[0].timings;

        const notInTimingArray = OriginalTimings.filter((obj1: any) => {
          const existsInTimingArray = timingArray.some(
            (obj2) => obj1.namazName === obj2.namazName
          );
          return !existsInTimingArray;
        });

        let tobeSorted = [...timingArray, ...notInTimingArray];

        const sortedArray = tobeSorted.sort((a: any, b: any) => {
          return a.type - b.type;
        });

        let formData = {
          timings: sortedArray,
        };

        let data = {
          formData,
          masjidId: MazjidId,
          timingId: timings[0]._id,
        };
        setUpdateBulkSingleModal(true);
        setUpdateBulkSingleData(data);
      } else {
        handleSnackbar(true, "warning", `No Changes detected`, dispatch);
      }
      return true;
    } else {
      // No timings available
      let timingArray: NamazTimings<number>[] = [];
      if (Object.keys(changes).length > 0) {
        Object.keys(changes).forEach((k, i) => {
          let uploadData: any;
          let newData = changes[k].newData;
          if (typeof newData.azaanTime === "string") {
            newData = {
              namazName: newData.namazName,
              azaanTime: moment(newData.azaanTime, ["HH:mm"]).format(
                "YYYY-MM-DD  hh:mm a"
              ),
              jamaatTime: newData.jamaatTime,
            };
          }
          if (typeof newData.jamaatTime === "string") {
            newData = {
              namazName: newData.namazName,
              azaanTime: newData.azaanTime,
              jamaatTime: moment(newData.jamaatTime, ["HH:mm"]).format(
                "YYYY-MM-DD  hh:mm a"
              ),
            };
          }
          if (typeof newData.azaanTime === "string") {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: moment(newData.azaanTime).unix(),
              jamaatTime: newData.jamaatTime,
            };
          }
          if (typeof newData.jamaatTime === "string") {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: newData.azaanTime,
              jamaatTime: moment(newData.jamaatTime).unix(),
            };
          }
          if (
            typeof newData.azaanTime === "string" &&
            typeof newData.jamaatTime === "string"
          ) {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: moment(newData.azaanTime).unix(),
              jamaatTime: moment(newData.jamaatTime).unix(),
            };
          }
          timingArray.push({ ...uploadData });
        });

        let initialState;
        let data;
        if (timingArray.length >= 5) {
          initialState = {
            date: moment(startDate).format("YYYY-MM-DD"),
            timings: [...timingArray],
          };

          data = {
            date: moment(startDate).format("YYYY-MM-DD"),
            timings: [...timingArray],
          };
        } else {
          const notInTimingArray = APITimings.filter(
            (obj1: NamajTiming<number>) => {
              const existsInTimingArray = timingArray.some(
                (obj2: any) => obj1.namazName === obj2.namazName
              );
              return !existsInTimingArray;
            }
          );

          let tobeSorted = [...timingArray, ...notInTimingArray];

          const sortedArray = tobeSorted.sort((a, b) => {
            return a.type - b.type;
          });

          data = {
            date: moment(startDate).format("YYYY-MM-DD"),
            timings: [...sortedArray],
          };
        }
        setAddBulkSingleModal(true);
        setAddBulkSingleData(data);
        // handleAdditionNetworkCall(initialState);
      } else {
        const initialState = {
          date: moment(startDate).format("YYYY-MM-DD"),
          timings: [...APITimings],
        };

        // initialState?.timings = [...APITimings];

        let data = {
          date: moment(startDate).format("YYYY-MM-DD"),
          timings: [...APITimings],
        };

        setAddBulkSingleModal(true);
        setAddBulkSingleData(data);
        // handleAdditionNetworkCall(initialState);
      }
      return true;
    }
  };

  const deleteDataPopup = () => {
    setDeleteData(true);
  };

  const handleBulkUpdateSingle = () => {
    if (UpdateBulkSingleData?.masjidId && UpdateBulkSingleData?.timingId) {
      handleUpdationBulkNetworkCall(
        UpdateBulkSingleData?.formData,
        UpdateBulkSingleData.masjidId,
        UpdateBulkSingleData.timingId
      );
    }
  };

  const handleCancelBulkUpdateSingle = () => {
    setUpdateBulkSingleModal(false);
  };

  const handleBulkAddSingle = () => {
    handleAdditionNetworkCall(AddBulkSingleData);
  };

  const handleCancelBulkAddSingle = () => {
    setAddBulkSingleModal(false);
  };

  const handleOnBulkUpdateMultipleDate = (
    changes: any,
    selectedStartDate: moment.Moment,
    selectedEndDate: moment.Moment
  ) => {
    let StartDate = moment(selectedStartDate).format("YYYY-MM-DD");
    let EndDate = moment(selectedEndDate).format("YYYY-MM-DD");
    let Updation = false;
    let Addition = false;
    let UploadDataCollected = [];
    let timingArray: any[] = [];
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;

    for (let i = 0; i < difference; i++) {
      let date = moment(selectedStartDate).add("days", i);
      const timings = ThreeMonthTimings.filter(
        (item) =>
          item.date === moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z"
      );

      if (timings.length > 0) {
        if (!Updation) {
          Updation = true;
        }
      } else {
        if (!Addition) {
          Addition = true;
        }
      }
    }
    if (
      (RangeHasTimings && Updation && !Addition) ||
      (!RangeHasTimings && Addition && !Updation)
    ) {
      if (Object.keys(changes).length > 0) {
        Object.keys(changes).forEach((k, i) => {
          let uploadData = {};
          let newData = changes[k].newData;
          if (typeof newData.azaanTime === "string") {
            newData = {
              namazName: newData.namazName,
              azaanTime: moment(newData.azaanTime, ["HH:mm"]).format(
                "YYYY-MM-DD  hh:mm a"
              ),
              jamaatTime: newData.jamaatTime,
            };
          }
          if (typeof newData.jamaatTime === "string") {
            newData = {
              namazName: newData.namazName,
              azaanTime: newData.azaanTime,
              jamaatTime: moment(newData.jamaatTime, ["HH:mm"]).format(
                "YYYY-MM-DD  hh:mm a"
              ),
            };
          }
          if (typeof newData.azaanTime === "string") {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: moment(newData.azaanTime).unix(),
              jamaatTime: newData.jamaatTime,
            };
          }
          if (typeof newData.jamaatTime === "string") {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: newData.azaanTime,
              jamaatTime: moment(newData.jamaatTime).unix(),
            };
          }
          if (
            typeof newData.azaanTime === "string" &&
            typeof newData.jamaatTime === "string"
          ) {
            uploadData = {
              namazName: newData.namazName,
              type: MasjidTimingType(newData.namazName),
              azaanTime: moment(newData.azaanTime).unix(),
              jamaatTime: moment(newData.jamaatTime).unix(),
            };
          }

          timingArray.push({ ...uploadData });
        });
        let initialState ;

        if (timingArray.length >= 5) {
          initialState = {
            timings: [...timingArray],
          };
        } else {
          const notInTimingArray = APITimings.filter(
            (obj1: NamajTiming<number>) => {
              const existsInTimingArray = timingArray.some(
                (obj2) => obj1.namazName === obj2.namazName
              );
              return !existsInTimingArray;
            }
          );

          let tobeSorted = [...timingArray, ...notInTimingArray];

          const sortedArray = tobeSorted.sort((a, b) => {
            return a.type - b.type;
          });

          initialState = {
            timings: [...sortedArray],
          };
        }
        UploadDataCollected.push(initialState?.timings);
      } else {
        // if no changes
        const initialState = {
          timings: [...APITimings],
        };
        UploadDataCollected.push(initialState.timings);
      }

      let data = {
        StartDate,
        EndDate,
        UploadDataCollected,
      };
      if (Updation) {
        if (Object.keys(changes).length > 0) {
          setBulkUpdatingModal(true);
          setBulkUpdateData(data);
        } else {
          handleSnackbar(true, "warning", "No Changes Detected", dispatch);
        }
        return true;
      } else {
        setBulkAddingModal(true);
        setBulkAddData(data);
        return true;
      }
    } else {
      setUpdatingTimings(false);
      setAddingTimings(false);

      handleSnackbar(
        true,
        "warning",
        "Please Select Proper Range Before Updating, If You Are Updating Select Days Which Has Timings If You Are Adding Select Days Which Don't Have Timing",
        dispatch
      );
      return true;
    }
  };

  const handleBulkUpdate = () => {
    if (BulkUpdateData?.StartDate)
      handleUpdateRandomNetworkCall(
        BulkUpdateData.StartDate,
        BulkUpdateData.EndDate,
        BulkUpdateData.UploadDataCollected[0]
      );
    setBulkUpdatingModal(false);
  };

  const handleCancelBulkUpdate = () => {
    setBulkUpdatingModal(false);
  };

  const handleBulkAdd = () => {
    handleAdditionRangeNetworkCall(
      BulkAddData?.StartDate ?? "",
      BulkAddData?.EndDate ?? "",
      BulkAddData?.UploadDataCollected[0]
    );
  };

  const handleCancelBulkAdd = () => {
    setBulkAddingModal(false);
  };

  const handleOnRowAddSingleDate = (newData:any, selectedEndDate:moment.Moment) => {
    let editedData: any;
    let UploadData = [];

    const timings = ThreeMonthTimings.filter(
      (item) =>
        item.date ===
        moment(selectedEndDate).format("YYYY-MM-DD") + "T00:00:00.000Z"
    );

    if (timings[0]?.timings?.length > 4) {
      if (typeof newData.azaanTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: moment(newData.azaanTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
        };
      }
      if (typeof newData.azaanTime === "string") {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }
      if (
        typeof newData.azaanTime === "string" &&
        typeof newData.jamaatTime === "string"
      ) {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }

      let sortedArray = [];

      if (editedData.type === 0) {
        let OriginalTimings = [...timings[0].timings];

        sortedArray = OriginalTimings.sort((a:any, b:any) => {
          return a.type - b.type;
        });

        sortedArray.push(editedData);
      } else {
        let OriginalTimings = [...timings[0].timings];

        OriginalTimings.push(editedData);

        sortedArray = OriginalTimings.filter((item) => item.type !== 0) // remove items with value 0
          .sort((a:any, b:any) => {
            if (a.type !== 0 && b.type !== 0) {
              // check if neither value is 0
              return a.type - b.type; // sort normally
            } else if (a.type !== 0) {
              // otherwise prioritize non-zero value
              return -1;
            } else {
              return 1;
            }
          });
      }
      let formData = {
        timings: sortedArray,
      };

      if (Object.keys(editedData).length > 3) {
        let data = {
          formData,
          masjidId: MazjidId,
          timingId: timings[0]._id,
        };

        setAddingNamazModal(true);
        setAddingNamazData(data);
        // handleAddNewNamazRangeCall(UploadData, masjidId);
      } else {
        handleSnackbar(
          true,
          "warning",
          `Please Add Proper Data and Try Again`,
          dispatch
        );
      }
    } else {
      handleSnackbar(
        true,
        "warning",
        `Please select Day Which Has 5 timings Already, Please try Bulk Addition to Add 5 timings.`,
        dispatch
      );
    }
    return true;
  };

  const handleOnRowAddMultipleDate = (
    newData:any,
    selectedEndDate:moment.Moment,
    selectedStartDate:moment.Moment
  ) => {
    let UploadData = [];
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;
    let Ids = [];
    let ReadyToUpload = false;
    let editedData = {};

    for (let i = 0; i < difference; i++) {
      let date = moment(selectedStartDate).add("days", i);
      const timings = ThreeMonthTimings.filter(
        (item) =>
          item.date === moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z"
      );
      if (timings.length > 0) {
        Ids.push(timings[0]._id);
      }
    }

    if (timings.length > 0) {
      if (typeof newData.azaanTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: moment(newData.azaanTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
        };
      }
      if (typeof newData.azaanTime === "string") {
        editedData = {
          namazName: newData.namazName,
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        editedData = {
          namazName: newData.namazName,
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }
      if (
        typeof newData.azaanTime === "string" &&
        typeof newData.jamaatTime === "string"
      ) {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }

      ReadyToUpload = true;
    } else {
      handleSnackbar(
        true,
        "warning",
        `Please select Day Which Has 5 timings Already, Please try Bulk Addition to Add 5 timings.`,
        dispatch
      );
      return true;
    }

    if (ReadyToUpload) {
      if (Object.keys(editedData).length > 3) {
        let data = {
          data: [editedData],
          MazjidId,
        };

        setAddingNamazModal(true);
        setAddingNamazData(data);
        // handleAddNewNamazRangeCall(UploadData, masjidId);
      } else {
        handleSnackbar(
          true,
          "warning",
          `Please Add Proper Data and Try Again`,
          dispatch
        );
      }
    }
    return true;
  };

  const handleNamazAdd = () => {
    let selectedStartDate = moment(startDate);
    let selectedEndDate = moment(endDate);
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;

    if (difference > 1) {
      let StartDate = moment(selectedStartDate).format("YYYY-MM-DD");
      let EndDate = moment(selectedEndDate).format("YYYY-MM-DD");

      handleUpdateRandomNetworkCall(StartDate, EndDate, AddingNamazData.data);
    } else {
      handleUpdationBulkNetworkCall(
        AddingNamazData.formData,
        AddingNamazData.masjidId,
        AddingNamazData.timingId
      );
    }
  };

  const handleCancelNamazAdd = () => {
    setAddingNamazModal(false);
  };

  const handleOnRowUpdateSingleDate = (
    newData: any,
    selectedEndDate: any
  ) => {
    let editedData: NamajTiming<number> = {
      namazName: "",
      type: 0,
      azaanTime: 0,
      jamaatTime: 0,
    };
    let UploadData = [];
    const timings = ThreeMonthTimings.filter(
      (item) =>
        item.date ===
        moment(selectedEndDate).format("YYYY-MM-DD") + "T00:00:00.000Z"
    );

    if (timings.length > 0) {
      if (typeof newData.azaanTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: moment(newData.azaanTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
        };
      }

      if (typeof newData.azaanTime === "string") {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }
      if (
        typeof newData.azaanTime === "string" &&
        typeof newData.jamaatTime === "string"
      ) {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }

      let OriginalTimings = [...timings[0].timings];

      OriginalTimings.forEach((obj:any, index) => {
        if (obj.namazName === editedData?.namazName) {
          OriginalTimings[index] = editedData;
        }
      });

      let formData = {
        timings: OriginalTimings,
      };

      let data = {
        formData,
        timingId: timings[0]?._id,
        MazjidId,
      };

      setUpdatingNamazModal(true);
      setUpdatingNamazData(data);
      // handleAddNewNamazRangeCall(UploadData, masjidId);
    } else {
      handleSnackbar(
        true,
        "warning",
        `Please Select Day Which Has Timings`,
        dispatch
      );
    }
    return true;
  };

  const handleNamazUpdate = () => {
    let selectedStartDate = moment(startDate);
    let selectedEndDate = moment(endDate);
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;

    if (difference > 1) {
      let StartDate = moment(selectedStartDate).format("YYYY-MM-DD");
      let EndDate = moment(selectedEndDate).format("YYYY-MM-DD");
      handleUpdateRandomNetworkCall(StartDate, EndDate, UpdatingNamazData.data);
    } else {
      handleUpdationBulkNetworkCall(
        UpdatingNamazData.formData,
        UpdatingNamazData.masjidId,
        UpdatingNamazData.timingId
      );
    }
  };

  const handleCancelNamazUpdate = () => {
    setUpdatingNamazModal(false);
  };

  const handleOnRowUpdateMultipleDate = (
    newData:any,
    selectedEndDate:moment.Moment,
    selectedStartDate:moment.Moment
  ) => {
    let UploadData = [];
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;
    let Ids = [];
    let ReadyToUpload = false;
    let editedData = {};

    for (let i = 0; i < difference; i++) {
      let date = moment(selectedStartDate).add("days", i);
      const timings = ThreeMonthTimings.filter(
        (item) =>
          item.date === moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z"
      );
      if (timings.length > 0) {
        Ids.push(timings[0]._id);
      }
    }

    if (timings.length > 0) {
      if (typeof newData.azaanTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: moment(newData.azaanTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        newData = {
          namazName: newData.namazName,
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime, ["HH:mm"]).format(
            "YYYY-MM-DD  hh:mm a"
          ),
        };
      }

      if (typeof newData.azaanTime === "string") {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: newData.jamaatTime,
        };
      }
      if (typeof newData.jamaatTime === "string") {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: newData.azaanTime,
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }
      if (
        typeof newData.azaanTime === "string" &&
        typeof newData.jamaatTime === "string"
      ) {
        editedData = {
          namazName: newData.namazName,
          type: MasjidTimingType(newData.namazName),
          azaanTime: moment(newData.azaanTime).unix(),
          jamaatTime: moment(newData.jamaatTime).unix(),
        };
      }

      ReadyToUpload = true;
    } else {
      handleSnackbar(
        true,
        "warning",
        `Please Select Range Of Days Which Already Has Timings`,
        dispatch
      );
      return true;
    }

    if (ReadyToUpload) {
      if (Object.keys(editedData).length > 3) {
        let data = {
          data: [editedData],
          MazjidId,
        };

        setUpdatingNamazModal(true);
        setUpdatingNamazData(data);
        // handleAddNewNamazRangeCall(UploadData, masjidId);
      } else {
        handleSnackbar(
          true,
          "warning",
          `Please Add Proper Data and Try Again`,
          dispatch
        );
      }
    }
    return true;
  };

  const handleOnRowDeleteSingleDate = (oldData: any, selectedEndDate: any) => {
    let UploadData = {};
    const timings = ThreeMonthTimings.filter(
      (item) =>
        item.date ===
        moment(selectedEndDate).format("YYYY-MM-DD") + "T00:00:00.000Z"
    );
    if (timings.length > 0) {
      UploadData = {
        ids: [timings[0]._id],
        timings: [{ namazName: oldData.namazName }],
      };
      let OriginalTimings = timings[0].timings;

      let FilteredTimings = OriginalTimings.filter((item: any) => {
        return item.namazName !== oldData.namazName;
      });

      let formData = {
        timings: FilteredTimings,
      };

      let data = {
        formData,
        timingId: timings[0]?._id,
        MazjidId,
      };

      handleUpdationBulkNetworkCall(
        data.formData,
        data.MazjidId,
        data.timingId
      );
    } else {
      handleSnackbar(
        true,
        "warning",
        `Please select Day which has timings`,
        dispatch
      );
      return true;
    }
    return true;
  };

  const handleOnRowDeleteMultipleDate = (
    oldData: any,
    selectedStartDate: any,
    selectedEndDate: any
  ) => {
    let UpdatedData = {};
    let difference = selectedEndDate.diff(selectedStartDate, "days") + 1;
    let Ids = [];

    for (let i = 0; i < difference; i++) {
      let date = moment(selectedStartDate).add("days", i);

      const timings = ThreeMonthTimings.filter(
        (item) =>
          item.date === moment(date).format("YYYY-MM-DD") + "T00:00:00.000Z"
      );

      if (timings.length > 0) {
        if (timings[0].timings.length > 0) {
          Ids.push(timings[0]?._id);
        } else {
          handleSnackbar(
            true,
            "warning",
            `Please select Day which has timings`,
            dispatch
          );
        }
      }
    }
    handleDeletionRangeCall(oldData);
    return true;
  };

  const handleDeleteAllTimings = () => {
    handleDeleteAllByRange();
  };

  const handleCancelDeleteAllTimings = () => {
    setDeletingTimingsModal(false);
  };

  return (
    <>
      <div className="ManageTimingsMaterialMainContainer">
        {/* <div className="MazjidTimingsLeftTableContainer">Data</div> */}
        <div className="TimingsPlusButton">
          <ModalComponent
            OpenOn={BulkUpdatingModal}
            Message={`Are you sure you want to Update the Timings From ${moment(
              BulkUpdateData?.StartDate
            ).format("MMM/DD/YYYY")} to ${moment(
              BulkUpdateData?.EndDate
            ).format("MMM/DD/YYYY")} ?`}
            OnAcceptedByUser={handleBulkUpdate}
            OnDeclinedByuser={handleCancelBulkUpdate}
            Loading={UpdatingTimings}
          />
          <ModalComponent
            OpenOn={BulkAddingModal}
            Message={`Are you sure you want to Add the Timings From ${moment(
              BulkAddData?.StartDate
            ).format("MMM/DD/YYYY")} to ${moment(BulkAddData?.EndDate).format(
              "MMM/DD/YYYY"
            )} ?`}
            OnAcceptedByUser={handleBulkAdd}
            OnDeclinedByuser={handleCancelBulkAdd}
            Loading={AddingTimings}
          />
          <ModalComponent
            OpenOn={UpdateBulkSingleModal}
            Message={`Are you sure you want to Update the Timings  on ${selectedStartDateOfRange.format(
              "MMM/DD/YYYY"
            )} ?`}
            OnAcceptedByUser={handleBulkUpdateSingle}
            OnDeclinedByuser={handleCancelBulkUpdateSingle}
            Loading={UpdatingBulkSingle}
          />
          <ModalComponent
            OpenOn={AddBulkSingleModal}
            Message={`Are you sure you want to Add the Timings on ${selectedStartDateOfRange.format(
              "MMM/DD/YYYY"
            )}?`}
            OnAcceptedByUser={handleBulkAddSingle}
            OnDeclinedByuser={handleCancelBulkAddSingle}
            Loading={AddingBulkSingle}
          />
          <ModalComponent
            OpenOn={AddingNamazModal}
            Message={
              selectedStartDateOfRange.isSame(selectedEndDateofRange)
                ? `Are you sure you want to Add the Namaz at date ${selectedStartDateOfRange.format(
                    "MMM/DD/YYYY"
                  )}?`
                : `Are you sure you want to Add the Namaz from  ${selectedStartDateOfRange.format(
                    "MMM/DD/YYYY"
                  )} to ${selectedEndDateofRange.format("MMM/DD/YYYY")} ?`
            }
            OnAcceptedByUser={handleNamazAdd}
            OnDeclinedByuser={handleCancelNamazAdd}
            Loading={AddingNamaz}
          />
          <ModalComponent
            OpenOn={UpdatingNamazModal}
            Message={
              selectedStartDateOfRange.isSame(selectedEndDateofRange)
                ? `Are you sure you want to Update Namaz at date ${selectedStartDateOfRange.format(
                    "MMM/DD/YYYY"
                  )}?`
                : `Are you sure you want to Update  Namaz from  ${selectedStartDateOfRange.format(
                    "MMM/DD/YYYY"
                  )} to ${selectedEndDateofRange.format("MMM/DD/YYYY")} ?`
            }
            OnAcceptedByUser={handleNamazUpdate}
            OnDeclinedByuser={handleCancelNamazUpdate}
            Loading={UpdatingNamaz}
          />
          <ModalComponent
            OpenOn={DeletingTimingsModal}
            Message={`Are you sure you want to Delete Timings from  ${selectedStartDateOfRange.format(
              "MMM/DD/YYYY"
            )} to ${selectedEndDateofRange.format("MMM/DD/YYYY")} ?`}
            OnAcceptedByUser={handleDeleteAllTimings}
            OnDeclinedByuser={handleCancelDeleteAllTimings}
            Loading={UpdatingNamaz}
          />

          <div className="ManageTimingsMaterialTableContainer">
            {DisableEditing ? (
              <MaterialTable
                columns={TimeColumns}
                title={"Timings Table With Prefilled Times"}
                data={CurrentSelectedDayTimings}
                editable={{
                  // onRowUpdate: null,
                  // onRowDelete: null,
                  isEditable: (rowData: any) => {
                    return rowData.type === 0;
                  },
                  isDeletable: (rowData:any) => {
                    return rowData.type === 0;
                  },
                  onRowUpdate: (newData, oldData) => {
                    return new Promise<void>((resolve, reject) => {
                      let selectedStartDate = moment(startDate);
                      let selectedEndDate = moment(endDate);

                      if (selectedStartDate.isSame(selectedEndDate)) {
                        if (
                          handleOnRowUpdateSingleDate(newData, selectedEndDate)
                        ) {
                          resolve();
                        }
                      } else {
                        if (
                          handleOnRowUpdateMultipleDate(
                            newData,
                            selectedEndDate,
                            selectedStartDate
                          )
                        ) {
                          resolve();
                        }
                        resolve();
                      }
                    });
                  },
                  onRowUpdateCancelled: (rowData) => {
                    return new Promise((resolve, reject) => {
                      // Must return a Promise
                    });
                  },
                  onRowDelete: (oldData) => {
                    return new Promise<void>((resolve, reject) => {
                      let selectedStartDate = moment(startDate);
                      let selectedEndDate = moment(endDate);

                      if (selectedStartDate.isSame(selectedEndDate)) {
                        if (
                          handleOnRowDeleteSingleDate(oldData, selectedEndDate)
                        ) {
                          resolve();
                        }
                      } else {
                        if (
                          handleOnRowDeleteMultipleDate(
                            oldData,
                            selectedStartDate,
                            selectedEndDate
                          )
                        ) {
                          resolve();
                        }
                      }
                    });
                  },
                  // onBulkUpdate: null,
                  onRowAdd: (newData) => {
                    return new Promise<void>((resolve, reject) => {
                      let selectedStartDate = moment(startDate);
                      let selectedEndDate = moment(endDate);
                      if (selectedStartDate.isSame(selectedEndDate)) {
                        if (
                          handleOnRowAddSingleDate(newData, selectedEndDate)
                        ) {
                          resolve();
                        }
                      } else {
                        if (
                          handleOnRowAddMultipleDate(
                            newData,
                            selectedEndDate,
                            selectedStartDate
                          )
                        ) {
                          resolve();
                        }
                      }
                    });
                  },
                  onRowAddCancelled: (rowData) => {
                    return new Promise((resolve, reject) => {
                      // Must return a Promise
                    });
                  },
                }}
                options={{
                  // exportButton: false,
                  search: false,
                  paging: false,
                  actionsColumnIndex: -1,
                }}
              />
            ) : (
              <MaterialTable
                columns={TimeColumns}
                title={"Timings Table With Prefilled Times"}
                data={CurrentSelectedDayTimings}
                editable={{
                  onBulkUpdate: (changes) => {
                    return new Promise<void>((resolve, reject) => {
                      let selectedStartDate = moment(startDate);
                      let selectedEndDate = moment(endDate);

                      // For Single Days Bulk Updation
                      if (selectedStartDate.isSame(selectedEndDate)) {
                        if (
                          handleOnBulkUpdateSingleDate(
                            changes,
                            // selectedStartDate,
                            selectedEndDate
                          )
                        ) {
                          resolve();
                        }
                      } else {
                        // For Multiple Days Bulk Updation
                        if (
                          handleOnBulkUpdateMultipleDate(
                            changes,
                            selectedStartDate,
                            selectedEndDate
                          )
                        ) {
                          resolve();
                        }
                      }
                    });
                  },
                  onRowAdd: (newData) => {
                    return new Promise<void>((resolve, reject) => {
                      let selectedStartDate = moment(startDate);
                      let selectedEndDate = moment(endDate);
                      if (selectedStartDate.isSame(selectedEndDate)) {
                        if (
                          handleOnRowAddSingleDate(newData, selectedEndDate)
                        ) {
                          resolve();
                        }
                      } else {
                        if (
                          handleOnRowAddMultipleDate(
                            newData,
                            selectedEndDate,
                            selectedStartDate
                          )
                        ) {
                          resolve();
                        }
                      }
                    });
                  },
                  onRowAddCancelled: (rowData) => {
                    return new Promise<void>((resolve, reject) => {
                      // Must return a Promise
                    });
                  },
                  onRowUpdate: (newData, oldData) => {
                    return new Promise<void>((resolve, reject) => {
                      let selectedStartDate = moment(startDate);
                      let selectedEndDate = moment(endDate);

                      if (selectedStartDate.isSame(selectedEndDate)) {
                        if (
                          handleOnRowUpdateSingleDate(newData, selectedEndDate)
                        ) {
                          resolve();
                        }
                      } else {
                        if (
                          handleOnRowUpdateMultipleDate(
                            newData,
                            selectedEndDate,
                            selectedStartDate
                          )
                        ) {
                          resolve();
                        }
                        resolve();
                      }
                    });
                  },
                  onRowUpdateCancelled: (rowData) => {
                    return new Promise((resolve, reject) => {
                      // Must return a Promise
                    });
                  },
                  onRowDelete: (oldData) => {
                    return new Promise<void>((resolve, reject) => {
                      let selectedStartDate = moment(startDate);
                      let selectedEndDate = moment(endDate);

                      if (selectedStartDate.isSame(selectedEndDate)) {
                        if (
                          handleOnRowDeleteSingleDate(oldData, selectedEndDate)
                        ) {
                          resolve();
                        }
                      } else {
                        if (
                          handleOnRowDeleteMultipleDate(
                            oldData,
                            selectedStartDate,
                            selectedEndDate
                          )
                        ) {
                          resolve();
                        }
                      }
                    });
                  },
                }}
                options={{
                  // exportButton: false,
                  search: false,
                  paging: false,
                  actionsColumnIndex: -1,
                }}
              />
            )}
          </div>
          <div className="BottomButtonContainer">
            <button
              className="DeleteAllTimingsButton"
              onClick={deleteDataPopup}
            >
              Delete All Timings
            </button>
          </div>
        </div>
      </div>
      {deleteData ? (
        <div className="PopUpFullData">
          <div className="BorderForPage">
            <div className="PopUpBackground">
              <div className="PopupContent">Do you really want to Delete ?</div>
              <div className="PopupButtonAlign">
                <button
                  className="PopupCancel"
                  onClick={() => setDeleteData(false)}
                >
                  No
                </button>
                <button className="SaveData" onClick={handleDeleteAllByRange}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ManageTimingsMaterialTable;
