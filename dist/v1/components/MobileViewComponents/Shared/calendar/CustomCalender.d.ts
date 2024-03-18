import React from "react";
import { TileDisabledFunc } from "react-calendar";
import "./Calendar.css";
interface CustomCalenderProps {
    onDateSelect: (selectedDate: Date) => void;
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
    tileContent?: ({ date }: {
        date: any;
    }) => React.ReactNode;
    minDate?: Date;
    tileDisabled: TileDisabledFunc;
}
declare function CustomCalender({ onDateSelect, value, setValue, tileContent, minDate, tileDisabled, }: CustomCalenderProps): JSX.Element;
export default CustomCalender;
//# sourceMappingURL=CustomCalender.d.ts.map