import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const TestPicker = () => {
  const [values, setValues] = useState<any>([]);
  const [showPicker, setShowPicker] = useState(false);
  return (
    <>
      <button onClick={() => setShowPicker(!showPicker)}>
        show datepicker
      </button>
      {showPicker ? (
        <DatePicker
          value={values}
          onChange={setValues}
          range
          minDate={new Date()}
          placeholder="Select the range for recurrence"
          style={{ width: "35vw", height: "3rem" }}
          // autoComplete="Off"
          format="MM/DD/YYYY"
          multiple
          plugins={[<DatePanel markFocused />]}
        />
      ) : null}
    </>
  );
};

export default TestPicker;
