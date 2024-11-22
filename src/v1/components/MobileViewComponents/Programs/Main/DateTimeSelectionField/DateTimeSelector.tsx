import React, { useState, useEffect, useCallback } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  OutlinedInput,
} from "@mui/material";
import _ from "lodash";
import "./datetimeselector.css";
import DaySelection from "../../../Events/Helpers/DaySelection/DaySelection";

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

  useEffect(() => {
    stableHandleChange({
      target: {
        name: "metaData",
        value: {
          type: "weekly",
          days: [],
        },
      },
    });
  }, []);

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
        <Select
          id="dateType"
          name="dateType"
          value={dateType}
          onChange={handleTypeChange}
          input={<OutlinedInput />}
          displayEmpty
          sx={{
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
            <em>Select Date</em>
          </MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
      </FormControl>

      <div className="form-group">
        <DaySelection
          setDays={handleDaySelection}
          currentDays={selectedDays}
          setRecurrenceType={() => {}}
        />
      </div>

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
    </div>
  );
};

export default DateTimeSelector;
