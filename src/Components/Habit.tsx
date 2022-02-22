import React from "react";
import {
  DAYS_TO_SHOW,
  getDayName,
  getMaxDate,
  getMinDate,
} from "./../Helpers/functions";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import { actionCreactors, State } from "../State";

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

  const { addingHabit, removingHabit, editingHabit, markingHabit } =
    bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);

  function formatToMarkIcon(date: Date) {
    let isMarked: boolean = habitsState.habits[habit.id].markedDays?.includes(
      date.getTime()
    )!;

    return (
      <span className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`mark h-6 w-6 text-gray-400 hover:text-gray-500 transition-colors ${
            isMarked ? "marked" : ""
          }`}
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
      </span>
    );
  }

  function markDay(date: Date, event: any) {
    console.log(event.target);

    if (!event.target.classList.contains("mark")) {
      return;
    }

    let isMarked: boolean;
    if (event.target.classList.contains("marked")) {
      isMarked = false;
    } else {
      isMarked = true;
    }
    let habitId = event.target.closest(".habit").id;
    markingHabit(date, habitId);
  }
  console.log("re");

  return (
    <div className="flex justify-between items-center shadow-md px-32">
      <h3
        className="basis-1/3 flex-grow flex-shrink-0 text-left"
        style={{ color: habit.color }}
      >
        {habit.name}
      </h3>
      <div className="marks flex basis-2/3 flex-grow flex-shrink flex-nowrap">
        <Calendar
          maxDate={getMaxDate()}
          onClickDay={(value, event) => markDay(value, event)}
          minDate={getMinDate()}
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
