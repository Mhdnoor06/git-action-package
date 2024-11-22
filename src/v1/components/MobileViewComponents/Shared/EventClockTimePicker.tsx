import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface EventClockTimePickerProps {
  tim: string;
  label: string;
  id?: string;
  formDataSetter?: (val: string, val2: string) => void;
  error?: string | null;
  pickerOpen: boolean;
  setPickerOpen: Dispatch<SetStateAction<boolean>>;
}

const EventClockTimePicker: React.FC<EventClockTimePickerProps> = ({
  tim,
  label,
  id,
  formDataSetter,
  error,
  pickerOpen,
  setPickerOpen,
}) => {
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(
    tim ? dayjs(tim, "HH:mm") : null
  );
  const [open, setOpen] = useState<boolean>(false);

  // Effect to update state when `tim` prop changes
  useEffect(() => {
    setSelectedTime(tim ? dayjs(tim, "HH:mm") : null);
  }, [tim]);

  useEffect(() => {
    setOpen(pickerOpen);
  }, [pickerOpen]);

  const handleTimeChange = (newTime: Dayjs | null) => {
    setOpen(!open);
    const formattedTime = newTime ? newTime.format("HH:mm") : "";
    if (id) {
      formDataSetter?.(id, formattedTime);
    }
    setSelectedTime(newTime);
  };
  const pickerStyle = `
.event-container .clock${id} input[type="text"] {
  border: 1px solid red !important;

}
`;
  const handlePickerOpener = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.target instanceof HTMLButtonElement) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  console.log(tim);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <style>{error ? pickerStyle : null}</style>
      <div className={"clock" + id + " " + "clock"}>
        <label htmlFor={id}>{label}</label>
        <div
          data-testid={"time-picker-" + id}
          onClick={(e) => handlePickerOpener(e)}
        >
          <MobileTimePicker
            open={open}
            openTo="hours"
            className="clock-input"
            value={selectedTime}
            onChange={handleTimeChange}
            onClose={() => setPickerOpen(false)}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "0px",
              },
            }}
            slotProps={{
              textField: {
                name: id,
                id: id,
              },
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

EventClockTimePicker.defaultProps = {
  formDataSetter: undefined,
  error: null,
};

export default EventClockTimePicker;
