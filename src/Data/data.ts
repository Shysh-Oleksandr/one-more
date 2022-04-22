import { HabitTypes, IHabit } from "../Components/MainPage/Habit";
import { IHabits } from "../State/Reducers/HabitReducer";
import {
  countInArray,
  DAYS_TO_SHOW,
  getDaysArray,
  getRandomNumber,
} from "./../Helpers/functions";

type data =
  | {
      date: Date;
      value: number;
    }[]
  | {
      category: string;
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

  const allMarkedDays = dates
    .map((date) => {
      date.setHours(0, 0, 0, 0);
      return currentHabit.markedDays?.find((markedDay) => {
        return markedDay.date === date.getTime();
      })?.selectableOption;
    })
    .filter((markedDay) => markedDay);

  const data =
    currentHabit.habitType === HabitTypes.SELECTABLE
      ? currentHabit.options?.map((option) => {
          return {
            category: option,
            value: countInArray(allMarkedDays, option),
          };
        })
      : dates.map((date) => {
          date.setHours(0, 0, 0, 0);
          let measurableValue = 0;
          let isMarked: boolean = !!currentHabit.markedDays?.find(
            (markedDay) => {
              measurableValue = markedDay.measurableValue!;
              return markedDay.date === date.getTime();
            }
          );
          return {
            date: date,
            value: isMarked
              ? currentHabit.habitType === HabitTypes.MEASURABLE
                ? measurableValue
                : 1
              : 0,
          };
        });

  return data!;
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

export const initialHabits: IHabit[] = [
  {
    name: "Waking up early",
    color: "rgb(188, 180, 49)",
    markedDays: [],
    habitType: HabitTypes.YES_OR_NO,
    id: getRandomNumber(),
    question: "Did I wake up early today?",
  },
  {
    name: "Meditation",
    color: "rgb(34, 145, 62)",
    markedDays: [],
    habitType: HabitTypes.MEASURABLE,
    unit: "min",
    id: getRandomNumber(),
    question: "How long did I meditate today?",
  },
  {
    name: "Workout",
    color: "rgb(173, 33, 33)",
    markedDays: [],
    habitType: HabitTypes.SELECTABLE,
    options: ["Calisthenics", "Running", "Cycling"],
    id: getRandomNumber(),
    question: "What kind of workout did I do today?",
  },
];
