import React from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../State";
import { getMaxDate, getMinDate } from "./../Helpers/functions";

export interface IHabit {
  name: string;
  color: string;
  markedDays: number[];
  id: number;
}

type IProps = {
  habit: IHabit;
};

function Habit({ habit }: IProps) {
  const dispatch = useDispatch();

  const { markingHabit, setIsHabitOpened } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const habitsState = useSelector((state: State) => state.habits);

  function formatToMarkIcon(date: Date) {
    const currentHabit: IHabit = habitsState.habits.find(
      (value) => value.id === habit.id
    )!;
    let isMarked: boolean = currentHabit.markedDays?.includes(date.getTime())!;

    return (
      <span className="cursor-pointer">
        {isMarked ? (
          <svg
            style={{ color: currentHabit.color }}
            xmlns="http://www.w3.org/2000/svg"
            className={`mark h-7 w-7 hover:opacity-60  transition-opacity marked`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`mark h-7 w-7 text-gray-400 hover:text-gray-500 transition-colors 
            `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              className=" pointer-events-none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </span>
    );
  }

  function markDay(date: Date, event: any) {
    if (!event.target.classList.contains("mark")) return;

    let habitId = event.target.closest(".habit").id;

    markingHabit(date, habitId);
  }

  function openHabitStat() {
    setIsHabitOpened(true, habit.id);
  }

  return (
    <div className="flex justify-between items-center shadow-md x-padding">
      <h3
        onClick={openHabitStat}
        className="cursor-pointer basis-1/3 flex-grow text-base flex-shrink-0 text-left"
        style={{ color: habit.color }}
      >
        {habit.name}
      </h3>
      <div className="marks flex basis-2/3 flex-grow flex-shrink flex-nowrap">
        <Calendar
          // activeStartDate={getMaxDate()}
          maxDate={getMaxDate()}
          minDate={getMinDate()}
          onClickDay={(value, event) => markDay(value, event)}
          minDetail="month"
          defaultView="month"
          showNeighboringMonth={false}
          formatDay={(locale: string, date: Date) => formatToMarkIcon(date)}
        />
      </div>
    </div>
  );
}

export default Habit;
