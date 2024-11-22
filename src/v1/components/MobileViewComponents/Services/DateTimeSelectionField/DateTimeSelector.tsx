import React, { useState, useEffect, useCallback } from "react";
import DaySelection from "../../Events/Helpers/DaySelection/DaySelection";
import { FormControl, Typography } from "@mui/material";
import _ from "lodash";
import "./datetimeselector.css";

interface DateTimeSelectorProps {
  formData: any;
  handleChange: (metaData: any) => void;
  setValidationErrors: (errors: any) => void;
  showTiming?: boolean;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  formData,
  handleChange,
  setValidationErrors,
  showTiming,
}) => {
  const [dateType, setDateType] = useState("weekly");
  const [customDates, setCustomDates] = useState<any[]>(
    formData.metaData?.days || []
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(
    formData.metaData?.days || []
  );

  const stableHandleChange = useCallback(handleChange, [handleChange]);

  const handleDaySelection = (days: string[]) => {
    setSelectedDays(days);
    stableHandleChange({
      target: {
        name: "metaData",
        value: { type: "weekly", days },
      },
    });
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    stableHandleChange({
      target: {
        name: "timing",
        value: {
          ...formData.timing,
          [name]: value,
        },
      },
    });
  };

  // Use lodash debounce to limit how often setValidationErrors is called
  const debouncedSetValidationErrors = useCallback(
    _.debounce((errors: any) => {
      setValidationErrors((prevErrors: any) => ({
        ...prevErrors,
        ...errors,
      }));
    }, 300),
    [setValidationErrors]
  );

  useEffect(() => {
    const errors: any = {};

    // Debounced update to avoid continuous re-renders
    debouncedSetValidationErrors(errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedSetValidationErrors.cancel();
    };
  }, [
    dateType,
    selectedDays,
    customDates,
    formData,
    showTiming,
    debouncedSetValidationErrors,
  ]);

  return (
    <div className="form-group">
      <FormControl
        fullWidth
        sx={{
          width: "100%",
          borderRadius: "20px",
          marginBottom: "15px",
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
          sx={{ color: "#2e2e2e", marginBottom: "8px", fontSize: "14px" }}
        >
          Availability <span style={{ color: "red" }}>*</span>
        </Typography>
      </FormControl>

      <div className="form-group">
        <DaySelection
          setDays={handleDaySelection}
          currentDays={selectedDays}
          setRecurrenceType={() => {}}
        />
      </div>

      {showTiming && (
        <div className="timeGroup">
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.timing?.startTime || ""}
              onChange={handleTimeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.timing?.endTime || ""}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
