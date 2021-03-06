import React from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getMaxDate, getRandomNumber } from "../../Helpers/functions";
import { actionCreactors, State } from "../../State";
import { getMinDate } from "./../../Helpers/functions";

export enum HabitTypes {
  YES_OR_NO = "Yes / No",
  MEASURABLE = "Measurable",
  SELECTABLE = "Selectable",
}

export interface IMarkedDay {
  date: number;
  measurableValue?: number;
  selectableOption?: string;
  showOptions?: boolean;
}

export interface IHabit {
  name: string;
  color: string;
  markedDays: IMarkedDay[];
  habitType: HabitTypes;
  id: number;
  unit?: string;
  options?: string[];
  question?: string;
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
    let isMarked: boolean = !!currentHabit.markedDays.find(
      (markedDay) => markedDay.date === date.getTime()
    );

    switch (currentHabit.habitType) {
      case HabitTypes.YES_OR_NO:
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
                className={`mark h-7 w-7 text-gray-500 hover:text-gray-400 transition-colors 
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
      case HabitTypes.MEASURABLE:
        isMarked = !!currentHabit.markedDays.find(
          (markedDay) =>
            markedDay.date === date.getTime() && markedDay.measurableValue! > 0
        );

        return (
          <span>
            <input
              type="number"
              style={{
                color: isMarked ? currentHabit.color : "unset",
              }}
              className="habit-value bg-zinc-800 w-full rounded-sm transition-all focus:rounded-none text-center"
              min={0}
              step={0.1}
              onFocus={(e) => e.target.select()}
              onChange={(e) => changeMeasurableValue(e, date, currentHabit.id)}
              defaultValue={
                currentHabit.markedDays.find(
                  (day) => day.date === date.getTime()
                )?.measurableValue || 0
              }
              id={`${currentHabit.id}-${date.getTime()}`}
            />
            <label
              style={{ color: isMarked ? currentHabit.color : "unset" }}
              className="text-center break-words text-sm !leading-[0.2rem]"
              htmlFor={`${currentHabit.id}-${date.getTime()}`}
            >
              {currentHabit.unit?.substring(0, 4)}
            </label>
          </span>
        );

      case HabitTypes.SELECTABLE:
        isMarked = !!currentHabit.markedDays.find(
          (markedDay) =>
            markedDay.date === date.getTime() &&
            markedDay.selectableOption !== "none"
        );

        return (
          <select
            style={{
              color: isMarked ? currentHabit.color : "unset",
            }}
            onChange={(e) =>
              markingHabit(date, currentHabit.id, 0, e.target.value)
            }
            defaultValue={
              currentHabit.markedDays.find(
                (markedDay) => markedDay.date === date.getTime()
              )?.selectableOption || "none"
            }
            className="habit-value text-xs cursor-pointer !m-0 h-full py-2 text-left w-8 hover:text-[#aeadad] bg-zinc-800 transition-colors"
          >
            <option
              value="none"
              className="habit-value py-1 bg-zinc-800 text-lg"
            >
              none
            </option>
            {currentHabit.options?.map((option) => {
              return (
                <option
                  className="habit-value py-1 bg-zinc-800 text-lg"
                  key={`option-${option}-${currentHabit.id}`}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          </select>
        );
    }
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

  function markDay(date: Date, event: any) {
    if (!event.target.classList.contains("mark")) return;

    let habitId = event.target.closest(".habit").id;

    markingHabit(date, habitId);
  }

  return (
    <div className="flex justify-between items-center shadow-md x-padding">
      <h3
        onClick={() => setIsHabitOpened(true, habit.id)}
        className="cursor-pointer basis-1/3 flex-grow md:text-base text-lg flex-shrink-0 md:leading-10 text-left transition-all hover:opacity-70"
        style={{ color: habit.color }}
      >
        {habit.name}
      </h3>
      <div className="marks flex basis-2/3 flex-grow flex-shrink flex-nowrap">
        <Calendar
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
