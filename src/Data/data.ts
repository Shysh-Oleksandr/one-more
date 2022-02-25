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
  var minDate = new Date(currentHabit.markedDays.sort()[0]);
  var checkedMinDate = new Date(currentDate.getTime());
  checkedMinDate.setDate(currentDate.getDate() - DAYS_TO_SHOW + 1);

  if (checkedMinDate.getTime() < minDate.getTime()) {
    minDate = checkedMinDate;
  }

  const dates = getDaysArray(minDate, currentDate);

  const data = dates.map((date) => {
    date.setHours(0, 0, 0, 0);
    let dateSeconds = date.getTime();
    let isMarked: boolean = currentHabit.markedDays?.includes(dateSeconds)!;
    return {
      date: date,
      value: isMarked ? 1 : 0,
    };
  });

  return data;
}
