import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import styles from "./ClockInput.module.css"; // Import the CSS module
import clock from "../../../../photos/Newuiphotos/OtherSalah/clock.svg";

interface ClockTimeInputProps {
  setTime: Dispatch<SetStateAction<string>>;
  tim: string;
  label: string;
  id?: string;
  minTime?: Dayjs | null;
  className?: string;
}

const ClockInput: React.FC<ClockTimeInputProps> = ({
  setTime,
  tim,
  label,
  id,
  minTime,
  className,
}) => {
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(
    tim ? dayjs(tim, "HH:mm") : null
  );
  const [isOpen, setIsOpen] = React.useState(false); // Add this line
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelectedTime(tim ? dayjs(tim, "HH:mm") : null);
  }, [tim]);

  const handleTimeChange = (newTime: Dayjs | null) => {
    const formattedTime = newTime ? newTime.format("HH:mm") : "";
    setTime(formattedTime);
    setSelectedTime(newTime);
  };

  const handleIconClick = () => {
    console.log("clicked");
    setIsOpen(true); // Set open state to true when icon is clicked
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className={`${styles.clock} ${
          className?.includes("fullWidth") ? styles.fullWidth : ""
        }`}
      >
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <div className={`${styles.inputWrapper} ${className}`}>
          <TimePicker
            open={isOpen}
            onClose={() => setIsOpen(false)}
            value={selectedTime}
            onChange={handleTimeChange}
            minTime={minTime || undefined}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            slotProps={{
              textField: {
                id: id,
                inputRef: inputRef,
                InputProps: {
                  endAdornment: (
                    <div className={styles.icon} onClick={handleIconClick}>
                      <img
                        src={clock}
                        alt="clock icon"
                        style={{ cursor: "pointer", pointerEvents: "auto" }} // Ensure icon is clickable
                      />
                    </div>
                  ),
                },
                placeholder: "hh:mm a",
                InputLabelProps: {
                  shrink: true,
                },
              },
            }}
            desktopModeMediaQuery="@media (max-width: 10000px)"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                border: "none",
                padding: "0px",
                borderRadius: "20px",
                "&.Mui-focused": {
                  borderRadius: "20px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #1d785a",
                    borderColor: "#1d785a",
                  },
                },
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              },
              "& .MuiInputBase-input": {
                borderColor: "#838383",
                borderRadius: "20px",
                textAlign: "left",
                fontSize: { xs: "0.75rem", sm: "0.9rem" },
                padding: "8px 12px",
              },
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ClockInput;
