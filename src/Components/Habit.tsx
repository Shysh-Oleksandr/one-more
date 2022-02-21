import React from "react";
import {
  DAYS_TO_SHOW,
  getDayName,
  getMaxDate,
  getMinDate,
} from "./../Helpers/functions";
import Calendar from "react-calendar";

export interface IHabit {
  name: string;
  color: string;
  markedDays?: {
    date: Date;
    isMarked: boolean;
  };
}

type IProps = {
  habit: IHabit;
};

function formatToMarkIcon() {
  return (
    <span className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mark h-6 w-6 text-gray-400 hover:text-gray-500 transition-colors"
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

function markDay(value: Date, event: any) {
  if (!event.target.classList.contains("mark")) {
    console.log(event.target.onclick);

    return;
  }
  if (event.target.classList.contains("marked")) {
    event.target.classList.remove("marked");
  } else {
    event.target.classList.add("marked");
  }
  console.dir(event.target);
}

function Habit({ habit }: IProps) {
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
          // showNeighboringMonth={false}
          showNavigation={false}
          formatDay={formatToMarkIcon}
        />
      </div>
    </div>
  );
}

export default Habit;
