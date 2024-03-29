import React from "react";
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
import Calendar, { TileDisabledFunc } from "react-calendar";
import "./Calendar.css";

type RangeType = "century" | "decade" | "year" | "month";

interface CustomCalenderProps {
  onDateSelect: (selectedDate: Date) => void;
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
  tileContent?: ({ date }: { date: any }) => React.ReactNode;
  minDate?: Date;
  tileDisabled: TileDisabledFunc;
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

function CustomCalender({
  onDateSelect,
  value,
  setValue,
  tileContent,
  minDate,
  tileDisabled,
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
    console.log("Action:", action);
    console.log("Next Active Start Date:", nextActiveStartDate);

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

  function handleDateSelect(date: Date) {
    setValue(date);
    // console.log(value);
    onDateSelect(date);
  }

  return (
    <Calendar
      {...handlersWithRefRenamed}
      activeStartDate={activeStartDate}
      onActiveStartDateChange={onActiveStartDateChange}
      onChange={handleDateSelect}
      value={value}
      view={view}
      onViewChange={onViewChange}
      tileContent={tileContent}
      tileDisabled={tileDisabled}
    />
  );
}

export default CustomCalender;
