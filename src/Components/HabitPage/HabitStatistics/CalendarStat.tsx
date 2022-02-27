import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreactors, State } from "../../../State";
import Calendar from "react-calendar";
import { getMaxDate } from "../../../Helpers/functions";
import { getMinDate } from "../../../Helpers/functions";
import { bindActionCreators } from "redux";

function CalendarStat() {
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
    <div className="calendar-stat stat pb-12 shadow-md x-padding">
      <h2 style={{ color: currentHabit.color }} className="stat-label">
        Calendar
      </h2>
      <Calendar
        className="shadow-lg"
        defaultActiveStartDate={getMaxDate()}
        maxDate={getMaxDate()}
        minDate={getMinDate(60)}
        defaultView="month"
        minDetail="year"
        showNeighboringMonth={false}
        onClickDay={(value, event) => markingHabit(value, currentHabit.id)}
        tileClassName={({ date }) => highlightDay(date)}
      />
    </div>
  );
}

export default CalendarStat;
