import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreactors, State } from "../../../State";
import Calendar from "react-calendar";
import { getMaxDate } from "../../../Helpers/functions";
import { getMinDate } from "../../../Helpers/functions";
import { bindActionCreators } from "redux";
import { HabitTypes } from "../../MainPage/Habit";

function CalendarStat() {
  const dispatch = useDispatch();

  const { markingHabit } = bindActionCreators(actionCreactors, dispatch);

  const habitsState = useSelector((state: State) => state.habits);
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  function highlightDay(date: Date): string {
    let isMarked: boolean = !!currentHabit.markedDays?.find(
      (markedDay) => markedDay.date === date.getTime()
    );

    return isMarked ? "react-calendar__tile--marked" : "";
  }

  function changeMeasurableValue(
    e: React.ChangeEvent<HTMLInputElement>,
    date: Date,
    habitId: number
  ) {
    e.target.value = parseFloat(e.target.value).toString();
    if (e.target.value === "") e.target.value = "0";
    markingHabit(date, habitId, parseFloat(e.target.value));
  }

  function formatCalendarTile(date: Date) {
    const currentMarkedDay = currentHabit.markedDays?.find(
      (markedDay) => markedDay.date === date.getTime()
    );
    if (currentHabit.habitType === HabitTypes.YES_OR_NO)
      return <span>{date.getDate()}</span>;

    return (
      <div>
        <input
          type="checkbox"
          className="calendar-tile-checkbox"
          id={`${date.getTime()}-calendar-tile`}
        />
        <label
          htmlFor={`${date.getTime()}-calendar-tile`}
          className="py-10 cursor-pointer"
        >
          <span className="calendar-tile-day w-full h-full cursor-pointer">
            {date.getDate()}
            {!!currentMarkedDay && (
              <div className="absolute bottom-0 right-0 bg-slate-800 px-[3px] py-[1px] rounded-tl-lg text-xs">
                {currentMarkedDay?.measurableValue}
              </div>
            )}
          </span>

          <span className="calendar-tile-measurable-value">
            <input
              type="number"
              className="bg-zinc-700 w-full rounded-sm transition-all focus:rounded-none text-center"
              min={0}
              step={0.1}
              onFocus={(e) => e.target.select()}
              onChange={(e) => changeMeasurableValue(e, date, currentHabit.id)}
              defaultValue={
                currentHabit.markedDays.find(
                  (day) => day.date === date.getTime()
                )?.measurableValue || 0
              }
            />
            <label className="text-center break-words text-sm !leading-[0.2rem]">
              {currentHabit.unit?.substring(0, 4)}
            </label>
          </span>
        </label>
      </div>
    );
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
        onClickDay={(value, event) => {
          currentHabit.habitType === HabitTypes.YES_OR_NO &&
            markingHabit(value, currentHabit.id);
        }}
        tileClassName={({ date }) => highlightDay(date)}
        formatDay={(locale: string, date: Date) => formatCalendarTile(date)}
      />
    </div>
  );
}

export default CalendarStat;
