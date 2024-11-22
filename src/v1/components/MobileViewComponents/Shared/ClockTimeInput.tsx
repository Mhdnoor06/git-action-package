import React, { Dispatch, SetStateAction, useEffect } from "react";
// import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";

interface ClockTimeInputProps {
  setTime: Dispatch<SetStateAction<string>>;
  tim: string;
  label: string;
  id?: string;
}

const ClockTimeInput: React.FC<ClockTimeInputProps> = ({
  setTime,
  tim,
  label,
  id
}) => {
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(
    tim ? dayjs(tim, "HH:mm") : null
  );

  // Effect to update state when `tim` prop changes
  useEffect(() => {
    setSelectedTime(tim ? dayjs(tim, "HH:mm") : null);
  }, [tim]); // Depend on `tim` to re-run the effect

  const handleTimeChange = (newTime: Dayjs | null) => {
    const formattedTime = newTime ? newTime.format("HH:mm") : "";
    setTime(formattedTime);
    setSelectedTime(newTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="clock" data-testid="clock">
        <label htmlFor={id}>{label}</label>
        <MobileTimePicker
          slotProps={{
            textField: {
              id: id
            }
          }}
          openTo="hours"
          className="clock-input"
          value={selectedTime}
          onChange={handleTimeChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "0px",
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default ClockTimeInput;
