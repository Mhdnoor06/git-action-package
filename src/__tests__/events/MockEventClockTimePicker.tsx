// MockEventClockTimePicker.js
import React from 'react';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface MockEventClockTimePickerProps {
  tim: string;
  label: string;
  id?: string;
  formDataSetter?: (val: string, val2: string) => void;
  error?: string | null;
  pickerOpen: boolean;
  setPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockEventClockTimePicker: React.FC<MockEventClockTimePickerProps> = ({
  tim,
  label,
  id,
  formDataSetter,
  error,
  pickerOpen,
  setPickerOpen,
}) => {
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(
    tim ? dayjs(tim, "HH:mm A") : null
  );

  const handleTimeChange = (event) => {
    const value = event.target.value.trim();
  
    // Check if the input is blank, if so, set to null and return
    if (value === '') {
      setSelectedTime(null);
      if (id) {
        formDataSetter?.(id, '');
      }
      return;
    }
  
    // Check if the input is in the correct format "HH:mm A"
    const timeFormat = /^(\d{1,2}):(\d{2}) (AM|PM)$/i;
    if (!timeFormat.test(value)) {
      return;
    }
  
    const [time, period] = value.split(' ');
    const [hours, minutes] = time.split(':');
    let newTime = dayjs().set('minute', parseInt(minutes));
  
    if (period.toUpperCase() === 'PM' && parseInt(hours) !== 12) {
      newTime = newTime.set('hour', parseInt(hours) + 12);
    } else if (period.toUpperCase() === 'AM' && parseInt(hours) === 12) {
      newTime = newTime.set('hour', 0);
    } else {
      newTime = newTime.set('hour', parseInt(hours));
    }
  
    setSelectedTime(newTime);
    const formattedTime = newTime.format("HH:mm");
    if (id) {
      formDataSetter?.(id, formattedTime);
    }
  };
  
  

  return (
    <div className={"clock" + id + " " + "clock"}>
      <label htmlFor={id}>{label}</label>
      <TextField
        id={id}
        value={selectedTime ? selectedTime.format("hh:mm A") : ''}
        onChange={handleTimeChange}
        inputProps={{ 'data-testid': id }}
      />
    </div>
  );
};

export default MockEventClockTimePicker;
