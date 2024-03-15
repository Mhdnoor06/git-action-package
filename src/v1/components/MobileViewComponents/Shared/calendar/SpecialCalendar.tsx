import React, { MouseEvent } from "react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  getMonthStart,
  getPreviousCenturyStart,
  getPreviousDecadeStart,
  getPreviousYearStart,
  getPreviousMonthStart,
  getNextCenturyStart,
  getNextDecadeStart,
  getNextYearStart,
  getNextMonthStart,
} from "@wojtekmaj/date-utils";
import Calendar, {
  OnClickFunc,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
} from "react-calendar";
import "./Calendar.css";
import { Value } from "react-multi-date-picker";

type RangeType = "century" | "decade" | "year" | "month";
// tileContent={tileContent}
//         tileDisabled={tileDisabled}
//         tileClassName={tileClassName}
interface CustomCalenderProps {
  onDateChange: (
    value: Value,
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  value: Date;
  handleSingleDateClick: OnClickFunc;
  tileContent: TileContentFunc;
  tileDisabled: TileDisabledFunc;
  tileClassName: TileClassNameFunc;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
}

function getBeginPrevious(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case "century":
      return getPreviousCenturyStart(date);
    case "decade":
      return getPreviousDecadeStart(date);
    case "year":
      return getPreviousYearStart(date);
    case "month":
      return getPreviousMonthStart(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

function getBeginNext(rangeType: RangeType, date: Date): Date {
  switch (rangeType) {
    case "century":
      return getNextCenturyStart(date);
    case "decade":
      return getNextDecadeStart(date);
    case "year":
      return getNextYearStart(date);
    case "month":
      return getNextMonthStart(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

const defaultValue = new Date();

function SpecialCalendar({
  onDateChange,
  value,
  setValue,
  tileContent,
  tileDisabled,
  tileClassName,
  handleSingleDateClick,
}: CustomCalenderProps) {
  const [activeStartDate, setActiveStartDate] = useState<Date>(
    getMonthStart(defaultValue)
  );
  // const [value, setValue] = useState<Date>(defaultValue);
  const [view, setView] = useState<RangeType>("month");

  function onActiveStartDateChange({
    action,
    activeStartDate: nextActiveStartDate,
  }: {
    action: string;
    activeStartDate: Date;
  }) {
    setActiveStartDate(nextActiveStartDate);
  }
  const handlers = useSwipeable({
    onSwiped: ({ dir }: { dir: string }) => {
      switch (dir) {
        case "Left":
          setActiveStartDate(getBeginNext(view, activeStartDate));
          return;
        case "Right":
          setActiveStartDate(getBeginPrevious(view, activeStartDate));
          return;
        default:
          return;
      }
    },
  });

  const { ref, ...handlersWithoutRef } = handlers;
  const handlersWithRefRenamed = {
    ...handlersWithoutRef,
    inputRef: ref,
  };

  function onViewChange(newView: { view: RangeType }) {
    setView(newView.view);
  }

  return (
    <div>
      <Calendar
        {...handlersWithRefRenamed}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={onActiveStartDateChange}
        onChange={onDateChange}
        value={value}
        onClickDay={handleSingleDateClick}
        view={view}
        selectRange={true}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        onViewChange={onViewChange}
      />
    </div>
  );
}

export default SpecialCalendar;
