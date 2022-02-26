import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreactors, State } from "../State";
import "../Styles/statistics.css";
import HistoryStat from "./HistoryStat";
import Calendar from "react-calendar";
import { getMaxDate } from "../Helpers/functions";
import { getMinDate } from "./../Helpers/functions";
// import "react-calendar/dist/Calendar.css";
import { bindActionCreators } from "redux";

function HabitStatistics() {
  const dispatch = useDispatch();

  const { markingHabit } = bindActionCreators(actionCreactors, dispatch);

  const habitsState = useSelector((state: State) => state.habits);
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  function highlightDay(date: Date): string {
    let isMarked: boolean = currentHabit.markedDays?.includes(date.getTime())!;

    return isMarked ? "react-calendar__tile--marked" : "";
  }

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--habit-color",
      currentHabit.color
    );
  }, [currentHabit]);

  return (
    <div className="habit__stat">
      <Calendar
        className="mt-8 mx-auto"
        defaultActiveStartDate={getMaxDate()}
        maxDate={getMaxDate()}
        minDate={getMinDate(60)}
        defaultView="month"
        minDetail="year"
        showNeighboringMonth={false}
        onClickDay={(value, event) => markingHabit(value, currentHabit.id)}
        tileClassName={({ date }) => highlightDay(date)}
      />
      <HistoryStat />
    </div>
  );
}

export default HabitStatistics;
