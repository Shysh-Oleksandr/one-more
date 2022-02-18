import React from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import "../Styles/calendar.css";
import { getDayName } from "./../Helpers/functions";

type Props = {};

function Habits({}: Props) {
  const currentDate = new Date();

  var minDate = new Date(currentDate.getTime());
  minDate.setDate(currentDate.getDate() - 39);

  var maxDate = new Date(currentDate.getTime());
  maxDate.setDate(currentDate.getDate() - 17);

  return (
    <div className="">
      <Calendar
        maxDate={maxDate}
        minDate={minDate}
        minDetail="month"
        defaultView="month"
        formatDay={(locale, date) => getDayName(date, locale)}
      />
    </div>
  );
}

export default Habits;
