import React, { MouseEvent, useEffect, useRef } from "react";
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
import { LocationBasedToday } from "../../../../helpers/HelperFunction";

type RangeType = "century" | "decade" | "year" | "month";

interface CustomCalenderProps {
  tZone: string;
  onDateChange: (
    value: Value,
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  value: Date | null; // Allow null value
  handleSingleDateClick: OnClickFunc;
  tileContent: TileContentFunc;
  tileDisabled: TileDisabledFunc;
  tileClassName: TileClassNameFunc;
  setValue: React.Dispatch<React.SetStateAction<Date | null>>;
  minDate: Date;
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

function SpecialCalendar({
  tZone,
  onDateChange,
  value,
  setValue,
  tileContent,
  tileDisabled,
  tileClassName,
  handleSingleDateClick,
  minDate,
}: CustomCalenderProps) {
  const defaultValue = LocationBasedToday(tZone);

  // Handle null value by providing a default
  const initialStartDate = value
    ? getMonthStart(value)
    : getMonthStart(defaultValue);
  const [activeStartDate, setActiveStartDate] =
    useState<Date>(initialStartDate);
  const [view, setView] = useState<RangeType>("month");

  // Ref to track if the activeStartDate is being set programmatically
  const isProgrammaticUpdate = useRef(false);

  useEffect(() => {
    if (value && !isProgrammaticUpdate.current) {
      const selectedMonthStart = getMonthStart(value);
      if (selectedMonthStart.getTime() !== activeStartDate.getTime()) {
        setActiveStartDate(selectedMonthStart);
      }
    }
    // Reset the flag after sync
    isProgrammaticUpdate.current = false;
  }, [value, activeStartDate]);

  function onActiveStartDateChange({
    action,
    activeStartDate: nextActiveStartDate,
  }: {
    action: string;
    activeStartDate: Date;
  }) {
    // Set the flag to true before updating state
    isProgrammaticUpdate.current = true;
    setActiveStartDate(nextActiveStartDate);
  }

  const handlers = useSwipeable({
    onSwiped: ({ dir }: { dir: string }) => {
      isProgrammaticUpdate.current = true;
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
        onChange={handleSingleDateClick}
        value={value || defaultValue} // Provide a fallback value
        view={view}
        tileContent={tileContent}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        onViewChange={onViewChange}
        minDate={minDate}
      />
    </div>
  );
}

export default SpecialCalendar;
