import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../State";
import "../../../Styles/statistics.css";
import CalendarStat from "./CalendarStat";
import HistoryStat from "./HistoryStat";

function HabitStatistics() {
  const habitsState = useSelector((state: State) => state.habits);

  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  return (
    <div className="habit__stat">
      {currentHabit.question && (
        <h3
          style={{ color: currentHabit.color }}
          className="habit-question bg-slate-200 text-xl py-3 x-padding shadow-md"
        >
          {currentHabit.question}
        </h3>
      )}
      <CalendarStat />
      <HistoryStat />
    </div>
  );
}

export default HabitStatistics;
