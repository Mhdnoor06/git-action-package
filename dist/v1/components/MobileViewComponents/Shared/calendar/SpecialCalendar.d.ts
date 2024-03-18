import React, { MouseEvent } from "react";
import { OnClickFunc, TileClassNameFunc, TileContentFunc, TileDisabledFunc } from "react-calendar";
import "./Calendar.css";
import { Value } from "react-multi-date-picker";
interface CustomCalenderProps {
    onDateChange: (value: Value, event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    value: Date;
    handleSingleDateClick: OnClickFunc;
    tileContent: TileContentFunc;
    tileDisabled: TileDisabledFunc;
    tileClassName: TileClassNameFunc;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
}
declare function SpecialCalendar({ onDateChange, value, setValue, tileContent, tileDisabled, tileClassName, handleSingleDateClick, }: CustomCalenderProps): JSX.Element;
export default SpecialCalendar;
//# sourceMappingURL=SpecialCalendar.d.ts.map