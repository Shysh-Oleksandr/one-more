import React from "react";
import { DAYS_TO_SHOW } from "./../Helpers/functions";

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

function Habit({ habit }: IProps) {
  return (
    <div className="flex justify-between items-center shadow-md px-32">
      <h3
        className="basis-1/3 flex-grow flex-shrink-0 text-left"
        style={{ color: habit.color }}
      >
        {habit.name}
      </h3>
      <div className="marks flex basis-2/3 p-3 flex-grow flex-shrink  flex-nowrap flex-row-reverse">
        {[...Array(DAYS_TO_SHOW)].map((e, i) => (
          <button className="w-[57px] inline-block px-5" key={i}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 hover:text-gray-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Habit;
