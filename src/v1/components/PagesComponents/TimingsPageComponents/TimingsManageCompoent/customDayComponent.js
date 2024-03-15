import { format, isWeekend } from "date-fns";
const today = new Date();


export default function customDayContent(day) {
    let extraDot = null;
    if (today.getMonth() + 1 === day.getMonth() + 1) {
      
    } else if (day.getMonth() + 1 === 1) {
      // if( SecondMonthSelectedDays?.includes(day.getDate())){
      //   extraDot = (
      //     <div
      //     style={{
      //       height: "5px",
      //       width: "5px",
      //       borderRadius: "100%",
      //       background: "green",
      //       position: "absolute",
      //       top: 1,
      //       right: 1,
      //     }}
      //     />
      //     )
      // }
      // if( SecondMonthIncompleteDays?.includes(day.getDate())){
      //   extraDot = (
      //     <div
      //       style={{
      //         height: "5px",
      //         width: "5px",
      //         borderRadius: "100%",
      //         background: "orange",
      //         position: "absolute",
      //         top: 1,
      //         right: 1,
      //       }}
      //     />
      //   )
      // }
    }
    return (
      <div>
        {extraDot}
        <span>{format(day, "d")}</span>
      </div>
    );
  }
  