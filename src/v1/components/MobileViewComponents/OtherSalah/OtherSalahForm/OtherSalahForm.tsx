import React, { useState, useEffect } from "react";
import calender from "../../../../photos/Newuiphotos/OtherSalah/cal.svg";
import cross from "../../../../photos/Newuiphotos/OtherSalah/remove.svg";
import CustomCalender from "../../Shared/calendar/CustomCalender";
import styles from "./OtherSalahForm.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClockInput from "../helperComponent/ClockInput";
import btnImg from "../../../../photos/clockIcon.png";
import {
  useCreateSpecialTimes,
  useUpdateSpecialTimes,
} from "../../../../graphql-api-calls/OtherSalah/mutation";
import {
  LocationBasedToday,
  UTCTimeConverter,
  UtcDateConverter,
} from "../../../../helpers/HelperFunction";

import moment from "moment";
import { useAppSelector } from "../../../../redux/hooks";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Backdrop, CircularProgress } from "@mui/material";
import OtherSalahCard from "../OtherSalahCard/OtherSalahCard";
import {
  EidSalah,
  fetchEidDates,
  parseTimings,
} from "../helperFunctions/helperFunc";

export interface Timing {
  startDate: Date | null;
  endDate: Date | null;
  azanTime: string;
  iqamaTime: string;
  isStartDateInvalid?: boolean;
  isEndDateInvalid?: boolean;
  isIqamaTimeInvalid?: boolean;
}

export interface OtherSalahFormProps {
  selectedSalah: string;
  consumerMasjidId: string;
  setShowSelectSalah: (value: boolean) => void;
  setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  initialTimings?: {
    startDate: string;
    endDate: string;
    azanTime: string;
    iqamaTime: string;
  }[];
  selectedSalahId?: string;
  addedPrayers?: Set<string>;
}

const getFirstAvailablePrayerNumber = (
  baseName: string,
  addedPrayers: Set<string>
) => {
  let number = 1;
  while (addedPrayers.has(number === 1 ? baseName : `${baseName} ${number}`)) {
    number++;
  }
  return number;
};

const OtherSalahForm: React.FC<OtherSalahFormProps> = ({
  selectedSalah,
  consumerMasjidId,
  setShowSelectSalah,
  setRefetchTrigger,
  initialTimings = [],
  selectedSalahId,
  addedPrayers,
}) => {
  const [prayerNumber, setPrayerNumber] = useState(1);
  const [timings, setTimings] = useState<Timing[]>(
    initialTimings.length > 0
      ? parseTimings(initialTimings)
      : [
          {
            startDate: null,
            endDate: null,
            azanTime: "",
            iqamaTime: "",
            isStartDateInvalid: false,
            isEndDateInvalid: false,
            isIqamaTimeInvalid: false,
          },
        ]
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [activeTimingIndex, setActiveTimingIndex] = useState<number | null>(
    null
  );
  const { createTimes, isLoading, error } = useCreateSpecialTimes();
  const {
    updateTimes,
    loading: isUpdating,
    error: updateError,
  } = useUpdateSpecialTimes();
  const [tZone, setTZone] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [eidSelections, setEidSelections] = useState<boolean[]>(() => {
    if (initialTimings.length > 0) {
      return initialTimings.map(() => true); // Set all to true if initial timings are present
    }
    return [true, false, false, false]; // Default state
  });

  const AdminMasjid = useAppSelector((state) => state.AdminMasjid);

  useEffect(() => {
    if (consumerMasjidId && AdminMasjid) {
      setTZone(AdminMasjid.location.timezone);
    }
  }, []);

  useEffect(() => {
    // Update the prayerNumber if `selectedSalah` or `addedPrayers` changes
    const baseName = selectedSalah.split(" ")[0];
    setPrayerNumber(
      getFirstAvailablePrayerNumber(baseName, addedPrayers || new Set())
    );
  }, [selectedSalah, addedPrayers]);

  useEffect(() => {
    if (initialTimings.length > 0) {
      setTimings(parseTimings(initialTimings));

      if (selectedSalah.toLowerCase().startsWith("eid")) {
        setEidSelections(initialTimings.map(() => true));
      } else {
        selectedSalah.split(" ")[1] === undefined
          ? setPrayerNumber(1)
          : setPrayerNumber(parseInt(selectedSalah.split(" ")[1]));
      }
    }
  }, [initialTimings]);

  const EidSalahValues = [EidSalah.EidUlFitr, EidSalah.EidUlDuha];

  useEffect(() => {
    if (EidSalahValues.includes(selectedSalah as EidSalah)) {
      fetchEidDates().then((eidDates: any) => {
        if (eidDates && !initialTimings.length) {
          const { eidFitrDate, eidAdhaDate } = eidDates;
          const selectedDate =
            selectedSalah === "Eid Ul-Fitr" ? eidFitrDate : eidAdhaDate;

          const startDate = dayjs(selectedDate).subtract(4, "day").toDate();
          const endDate = dayjs(selectedDate).add(2, "day").toDate();

          const newTimings = eidSelections
            .map((selected) => {
              if (selected) {
                return {
                  startDate: startDate,
                  endDate: endDate,
                  azanTime: "",
                  iqamaTime: "",
                  isStartDateInvalid: false,
                  isEndDateInvalid: false,
                  isIqamaTimeInvalid: false,
                } as Timing;
              }
              return null;
            })
            .filter((timing): timing is Timing => timing !== null);

          setTimings(newTimings);
        }
      });
    }
  }, [selectedSalah]);

  const handleEidCheckboxChange = (index: number) => {
    const updatedSelections = [...eidSelections];

    if (index === 0) return; // First checkbox cannot be unchecked

    if (updatedSelections[index]) {
      // Uncheck current and subsequent checkboxes
      for (let i = index; i < updatedSelections.length; i++) {
        updatedSelections[i] = false;
      }
    } else {
      // Check current checkbox
      updatedSelections[index] = true;
    }

    setEidSelections(updatedSelections);

    // Get the current date from first timing
    // const currentDate = timings[0]?.startDate;
    const startDate = timings[0]?.startDate;
    const endDate = timings[0]?.endDate;

    // Create new timings array with the same date for all selected prayers
    const newTimings = updatedSelections
      .map((selected, i) => {
        if (selected) {
          return (
            timings[i] ||
            ({
              startDate: startDate,
              endDate: endDate,
              azanTime: "",
              iqamaTime: "",
              isStartDateInvalid: false,
              isEndDateInvalid: false,
              isIqamaTimeInvalid: false,
            } as Timing)
          );
        }
        return null;
      })
      .filter((timing): timing is Timing => timing !== null);

    setTimings(newTimings);
  };

  const validateAzaanJamaatTimes = (azaan: string, jamaat: string) => {
    if (azaan && jamaat) {
      const azaanTime = new Date(`1970-01-01T${azaan}:00Z`).getTime();
      const jamaatTime = new Date(`1970-01-01T${jamaat}:00Z`).getTime();

      if (azaanTime > jamaatTime) {
        console.error("Azaan timing cannot be later than Jamaat timing");
        return false;
      }
    }
    return true;
  };

  const validateFields = () => {
    let isValid = true;
    const updatedTimings = [...timings];
    let errorMessages: string[] = [];

    updatedTimings.forEach((timing, index) => {
      if (!timing.startDate) {
        isValid = false;
        errorMessages.push(`Start date ${index + 1}`);
        timing.isStartDateInvalid = true;
      } else {
        timing.isStartDateInvalid = false;
      }

      if (!timing.endDate) {
        isValid = false;
        errorMessages.push(`End date ${index + 1}`);
        timing.isEndDateInvalid = true;
      } else {
        timing.isEndDateInvalid = false;
      }

      if (!timing.iqamaTime) {
        isValid = false;
        errorMessages.push(`Iqama time ${index + 1}`);
        timing.isIqamaTimeInvalid = true;
      } else {
        timing.isIqamaTimeInvalid = false;
      }
    });

    setTimings(updatedTimings);

    if (!isValid) {
      const consolidatedMessage = `Please fill in the following fields: ${errorMessages.join(
        ", "
      )}`;
      toast.error(consolidatedMessage);
    }

    return isValid;
  };

  const handleAddTiming = () => {
    if (timings.length < 4) {
      setTimings([
        ...timings,
        {
          startDate: null,
          endDate: null,
          azanTime: "",
          iqamaTime: "",
          isStartDateInvalid: false,
          isEndDateInvalid: false,
          isIqamaTimeInvalid: false,
        },
      ]);
    }
  };

  const handleRemoveTiming = (index: number) => {
    setTimings(timings.filter((_, i) => i !== index));
  };

  const handleDateClick = (index: number, isStart: boolean) => {
    setActiveTimingIndex(index);
    setIsSelectingStart(isStart);
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (selectedDate: Date) => {
    if (activeTimingIndex === null) return;
    const updatedTimings = [...timings];

    if (isSelectingStart) {
      updatedTimings[activeTimingIndex].startDate = selectedDate;
      updatedTimings[activeTimingIndex].isStartDateInvalid = false;
      if (
        updatedTimings[activeTimingIndex].endDate &&
        updatedTimings[activeTimingIndex].endDate < selectedDate
      ) {
        updatedTimings[activeTimingIndex].endDate = selectedDate;
        updatedTimings[activeTimingIndex].isEndDateInvalid = false;
      }
    } else {
      updatedTimings[activeTimingIndex].endDate = selectedDate;
      updatedTimings[activeTimingIndex].isEndDateInvalid = false;
      if (
        updatedTimings[activeTimingIndex].startDate &&
        updatedTimings[activeTimingIndex].startDate > selectedDate
      ) {
        updatedTimings[activeTimingIndex].startDate = selectedDate;
        updatedTimings[activeTimingIndex].isStartDateInvalid = false;
      }
    }

    setTimings(updatedTimings);
    setIsCalendarOpen(false);
  };

  const handleChange = (
    index: number,
    field: keyof Timing,
    value: string | Date
  ) => {
    const updatedTimings = [...timings];
    updatedTimings[index][field] = value as never;

    if (field === "startDate" && value) {
      updatedTimings[index].isStartDateInvalid = false;
    }
    if (field === "endDate" && value) {
      updatedTimings[index].isEndDateInvalid = false;
    }
    if (field === "iqamaTime" && value) {
      updatedTimings[index].isIqamaTimeInvalid = false;
    }
    setTimings(updatedTimings);
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      setShowConfirmation(true);
    }
  };

  const confirmSubmit = async () => {
    const nameToSend =
      prayerNumber > 1
        ? selectedSalahId
          ? `${selectedSalah.split(" ")[0]} ${prayerNumber}`
          : `${selectedSalah} ${prayerNumber}`
        : selectedSalah;

    const input = {
      masjid: consumerMasjidId,
      name: nameToSend,
      timings: timings.map((timing) => ({
        startDate: timing.startDate
          ? UtcDateConverter(
              moment(timing.startDate).format("YYYY-MM-DD"),
              tZone
            )
          : null,
        endDate: timing.endDate
          ? UtcDateConverter(moment(timing.endDate).format("YYYY-MM-DD"), tZone)
          : null,
        azaanTime: timing.azanTime
          ? UTCTimeConverter(
              timing.azanTime,
              moment(timing.startDate).format("DD-MM-YYYY"),
              tZone
            )
          : null,
        jamaatTime: UTCTimeConverter(
          timing.iqamaTime,
          moment(timing.startDate).format("DD-MM-YYYY"),
          tZone
        ),
      })),
    };

    if (!validateAzaanJamaatTimes(timings[0].azanTime, timings[0].iqamaTime)) {
      return;
    }

    try {
      if (selectedSalahId) {
        // Update existing Salah
        const result = await updateTimes(selectedSalahId, input);
        console.log("Updated Special Times:", result);
        toast.success(`${selectedSalah} updated successfully`);
      } else {
        // Create new Salah
        const result = await createTimes(input);
        console.log("Created Special Times:", result);
        toast.success(`${selectedSalah} added successfully`);
      }
      setShowSelectSalah(false);
      setRefetchTrigger((prev: boolean) => !prev);
    } catch (err) {
      console.error("Error creating/updating special times:", err);
      toast.error("Error creating/updating special times");
    }
  };

  const formattedTimings = timings.map((timing) => ({
    startDate: timing.startDate
      ? moment(timing.startDate).format("DD-MM-YYYY")
      : null,
    endDate: timing.endDate
      ? moment(timing.endDate).format("DD-MM-YYYY")
      : null,
    azanTime: timing.azanTime
      ? moment.tz(timing.azanTime, "HH:mm", tZone).format("hh:mm A")
      : "",
    iqamaTime: timing.iqamaTime
      ? moment.tz(timing.iqamaTime, "HH:mm", tZone).format("hh:mm A")
      : "",
  }));

  return (
    <div className={styles.formCard}>
      <h2 className={styles.formTitle}>
        {selectedSalahId
          ? `${selectedSalah.split(" ")[0]} ${prayerNumber}`
          : selectedSalah}
      </h2>

      {EidSalahValues.includes(selectedSalah as EidSalah) ? (
        <div className={styles.checkboxGroup}>
          {[1, 2, 3, 4].map((num) => (
            <label
              key={num}
              className={styles.checkboxLabel}
              style={
                num > 1 && !eidSelections[num - 2]
                  ? { color: "grey" }
                  : undefined
              }
            >
              <input
                type="checkbox"
                checked={eidSelections[num - 1]}
                onChange={() => handleEidCheckboxChange(num - 1)}
                className={styles.checkboxInput}
                disabled={num > 1 && !eidSelections[num - 2]}
              />
              <span className={styles.customCheckbox}></span>
              {`${num}${["st", "nd", "rd", "th"][num - 1]}`}
            </label>
          ))}
        </div>
      ) : (
        <div className={styles.radioGroup}>
          {[1, 2, 3, 4].map((num, index) => {
            // Construct the prayer name, handling the suffix for each one
            const prayerName =
              num === 1
                ? selectedSalah.split(" ")[0]
                : `${selectedSalah.split(" ")[0]} ${num}`;

            const isDisabled = addedPrayers?.has(prayerName) || selectedSalahId;

            return (
              <label
                key={num}
                className={styles.radioLabel}
                style={isDisabled ? { color: "#b1b1b1" } : undefined}
              >
                <input
                  type="radio"
                  name="jummah"
                  value={num}
                  checked={prayerNumber === num}
                  onChange={() => setPrayerNumber(num)}
                  className={styles.radioInput}
                  disabled={isDisabled} // Disable if this prayer is already added or if selectedSalahId is available
                />
                <span className={styles.customRadio}></span>
                {`${num}${["st", "nd", "rd", "th"][index]}`}
              </label>
            );
          })}
        </div>
      )}

      {!EidSalahValues.includes(selectedSalah as EidSalah) && (
        <h3 className={styles.subTitle}>
          {selectedSalah.split(" ")[0]} {prayerNumber}
          {["st", "nd", "rd", "th"][prayerNumber - 1]}
        </h3>
      )}

      {/* Dynamic timing inputs */}
      {timings.map((timing, index) => (
        <div key={index} className={styles.timingGroup}>
          {!EidSalahValues.includes(selectedSalah as EidSalah) && (
            <div className={styles.selectDates}>
              <div>Select Dates</div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTiming(index)}
                  className={styles.removeButton}
                >
                  <img src={cross} alt="cross" className={styles.crossIcon} />
                </button>
              )}
            </div>
          )}
          {EidSalahValues.includes(selectedSalah as EidSalah) && (
            <h3 className={styles.subTitle}>
              {selectedSalah} {index + 1}
              {["st", "nd", "rd", "th"][index]}
            </h3>
          )}

          {!EidSalahValues.includes(selectedSalah as EidSalah) && (
            <div className={styles.dateInputs}>
              <div
                className={`${styles.dateInput} ${
                  timing.isStartDateInvalid ? styles.errorBorder : ""
                }`}
                onClick={() => handleDateClick(index, true)}
              >
                <span className={styles.dateText}>
                  {timing.startDate
                    ? moment(timing.startDate).format("DD-MM-YYYY")
                    : "DD-MM-YYYY"}
                </span>
                <span>
                  <img src={calender} alt="calendar" className={styles.icon} />
                </span>
              </div>
              <span className={styles.toText}>To</span>
              <div
                className={`${styles.dateInput} ${
                  timing.isEndDateInvalid ? styles.errorBorder : ""
                }`}
                onClick={() => handleDateClick(index, false)}
              >
                <span className={styles.dateText}>
                  {timing.endDate
                    ? moment(timing.endDate).format("DD-MM-YYYY")
                    : "DD-MM-YYYY"}
                </span>
                <span>
                  <img src={calender} alt="calendar" className={styles.icon} />
                </span>
              </div>
            </div>
          )}

          <div className={styles.timeInputs}>
            <div
              className={`${styles.azanIqamaBox} ${
                selectedSalah.toLowerCase().startsWith("taraweeh") ||
                selectedSalah.toLowerCase().startsWith("qayam") ||
                selectedSalah.toLowerCase().startsWith("eid")
                  ? styles.fullWidth
                  : ""
              }`}
            >
              {!(
                selectedSalah.toLowerCase().startsWith("taraweeh") ||
                selectedSalah.toLowerCase().startsWith("qayam") ||
                selectedSalah.toLowerCase().startsWith("eid")
              ) && (
                <ClockInput
                  label={"Azaan Time (Optional)"}
                  id={"azan"}
                  tim={timing.azanTime}
                  setTime={(time: any) => {
                    handleChange(index, "azanTime", time);
                  }}
                />
              )}
              <ClockInput
                label={"Iqama Time"}
                id={"iqama"}
                tim={timing.iqamaTime}
                setTime={(time: any) => {
                  handleChange(index, "iqamaTime", time);
                }}
                minTime={
                  timing.azanTime ? dayjs(timing.azanTime, "HH:mm") : null
                }
                className={`${
                  timing.isIqamaTimeInvalid ? styles.errorBorder : ""
                } ${
                  selectedSalah.toLowerCase().startsWith("taraweeh") ||
                  selectedSalah.toLowerCase().startsWith("qayam") ||
                  selectedSalah.toLowerCase().startsWith("eid")
                    ? styles.fullWidth
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
      ))}

      {!EidSalahValues.includes(selectedSalah as EidSalah) &&
        timings.length < 4 && (
          <button
            type="button"
            onClick={handleAddTiming}
            className={styles.addMoreButton}
          >
            <AddCircleIcon style={{ fontSize: "1rem" }} />
            <span>Add More Timings</span>
          </button>
        )}

      <button
        type="button"
        onClick={handleSubmit}
        className={styles.submitButton}
        disabled={isLoading || isUpdating}
      >
        <img src={btnImg} alt="cross" className={styles.crossIcon} />
        {isLoading || isUpdating
          ? "Submitting..."
          : selectedSalahId
          ? selectedSalah.toLowerCase().startsWith("eid")
            ? `Update Eid Salah`
            : `Update ${selectedSalah.split(" ")[0]} ${prayerNumber}`
          : `Add ${selectedSalah}`}
      </button>

      {error && <p className={styles.errorText}>Error: {error.message}</p>}
      {updateError && (
        <p className={styles.errorText}>Error: {updateError.message}</p>
      )}

      {showConfirmation && (
        <Backdrop open={showConfirmation}>
          <OtherSalahCard
            title={
              selectedSalahId
                ? `${selectedSalah.split(" ")[0]} ${prayerNumber}`
                : selectedSalah
            }
            icon={<span>🕒</span>}
            timings={formattedTimings}
            onEdit={() => setShowConfirmation(false)}
            onDelete={() => setShowConfirmation(false)}
          >
            <div className={styles.confirmationMessage}>
              <p className={styles.confirmationText}>
                `Are you sure you want to{" "}
                {selectedSalahId
                  ? selectedSalah.toLowerCase().startsWith("eid")
                    ? `Update Eid Salah`
                    : `Update ${selectedSalah.split(" ")[0]} ${prayerNumber}`
                  : `Add ${selectedSalah}`}{" "}
                timings?
              </p>
              <div className={styles.confirmationButtons}>
                <button
                  onClick={() => setShowConfirmation(false)}
                  disabled={isLoading || isUpdating}
                  style={
                    isLoading || isUpdating
                      ? {
                          backgroundColor: "grey",
                        }
                      : undefined
                  }
                >
                  No
                </button>
                <button onClick={confirmSubmit}>
                  {isLoading || isUpdating ? (
                    <CircularProgress color="inherit" size={15} />
                  ) : (
                    "Yes"
                  )}
                </button>
              </div>
            </div>
          </OtherSalahCard>
        </Backdrop>
      )}

      {loading && (
        <Backdrop open={true} style={{ zIndex: 999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {isCalendarOpen && (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isCalendarOpen}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsCalendarOpen(false);
              }
            }}
          >
            <div className={styles.calendarPopup}>
              <CustomCalender
                onDateSelect={handleDateSelect}
                minDate={
                  isSelectingStart
                    ? activeTimingIndex! > 0 &&
                      timings[activeTimingIndex! - 1].endDate
                      ? dayjs(timings[activeTimingIndex! - 1].endDate)
                          .add(1, "day")
                          .toDate()
                      : LocationBasedToday(tZone)
                    : timings[activeTimingIndex!]?.startDate ||
                      LocationBasedToday(tZone)
                }
                value={
                  isSelectingStart
                    ? timings[activeTimingIndex!]?.startDate || new Date()
                    : timings[activeTimingIndex!]?.endDate || new Date()
                }
                setValue={
                  isSelectingStart
                    ? (date) => handleDateSelect(date)
                    : (date) => handleDateSelect(date)
                }
                tileDisabled={() => false}
              />
            </div>
          </Backdrop>
        </>
      )}
    </div>
  );
};

export default OtherSalahForm;
