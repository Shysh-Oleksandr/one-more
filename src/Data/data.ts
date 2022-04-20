import { HabitTypes } from "../Components/MainPage/Habit";
import { IHabits } from "../State/Reducers/HabitReducer";
import { DAYS_TO_SHOW, getDaysArray } from "./../Helpers/functions";

type data = {
  date: Date;
  value: number;
}[];

export function getData(habitsState: IHabits): data {
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  const currentDate = new Date();

  if (currentHabit.markedDays.length === 0) return [];

  var minDate = new Date(
    currentHabit.markedDays.sort((a, b) => {
      return a.date > b.date ? 1 : -1;
    })[0].date
  );
  var checkedMinDate = new Date(currentDate.getTime());
  checkedMinDate.setDate(currentDate.getDate() - DAYS_TO_SHOW + 1);

  if (checkedMinDate.getTime() < minDate.getTime()) {
    minDate = checkedMinDate;
  }

  const dates = getDaysArray(minDate, currentDate);

  const data = dates.map((date) => {
    date.setHours(0, 0, 0, 0);
    let measurableValue = 0;
    let isMarked: boolean = !!currentHabit.markedDays?.find((markedDay) => {
      measurableValue = markedDay.measurableValue;
      return markedDay.date === date.getTime();
    });
    return {
      date: date,
      value: isMarked
        ? currentHabit.habitType === HabitTypes.MEASURABLE
          ? measurableValue
          : 1
        : 0,
    };
  });

  return data;
}

export const habitTypes = [
  {
    habitTypeName: HabitTypes.YES_OR_NO,
    habitTypeDescription:
      "E.g. Did I wake up early today? Did I workout? Did I eat healthy food?",
  },
  {
    habitTypeName: HabitTypes.MEASURABLE,
    habitTypeDescription:
      "E.g. How many kilometers did I run? How long did I workout? How many vegetables did I eat?",
  },
  {
    habitTypeName: HabitTypes.SELECTABLE,
    habitTypeDescription:
      "E.g. What kind of workout did I do? Which piece did I practice? Which language did I learn?",
  },
];
