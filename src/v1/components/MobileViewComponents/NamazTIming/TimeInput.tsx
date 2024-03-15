import React, { Dispatch, SetStateAction,} from "react";

type propsType = {
  label?: string;
  timingStatus?: string;
  timeSetter: Dispatch<SetStateAction<string>>;
  timingRef: string;
  redOnly?: boolean;
};
const TimeInput = ({
  label,
  timeSetter,
  timingRef,
  timingStatus,
}: propsType) => {
  const redOnly = timingStatus !== "manual" ? true : false;

  return (
    <>
      <label style={{ marginTop: "-4.5vh", color: "#9F9E9E" }}>
        {label} Timing
        <input
          type="time"
          // style={{ height: "13px" }}
          onChange={(e) => timeSetter(e.target.value)}
          value={timingRef}
          // ref={timingRef}
          readOnly={redOnly}
        />
      </label>
    </>
  );
};

export default TimeInput;
