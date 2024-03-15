import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    // endOfNext60Days,
    // endOfNext30Days,
    differenceInCalendarDays,
  } from 'date-fns';
  
  const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    endOfNext60Days: startOfDay(addDays(new Date(), 60)),
    endOfNext30Days: startOfDay(addDays(new Date(), 30)),
  };
  
  
  const staticRangeHandler = {
    range(): { startDate: Date | number; endDate: Date | number } {
      return {
        startDate: 0,
        endDate: 0,
      };
    },
    isSelected(range:any) {
      const definedRange = this.range();
      return (
        isSameDay(range.startDate, definedRange.startDate) &&
        isSameDay(range.endDate, definedRange.endDate)
      );
    },
  };
  
   function createStaticRanges(ranges:any[]) {
    return ranges.map(range => ({ ...staticRangeHandler, ...range }));
  }
  
  export  const defaultStaticRanges = createStaticRanges([
    {
      label: 'Today',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'This Month',
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth,
      }),
    },
    {
      label: 'Next 30 Days',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfNext30Days,
      }),
    },
    {
      label: 'Next 60 Days',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfNext60Days,
      }),
    },

  ]);
  