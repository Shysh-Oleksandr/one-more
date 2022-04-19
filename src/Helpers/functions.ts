import { HabitTypes, IHabit, IMarkedDay } from "../Components/MainPage/Habit";

export const DAYS_TO_SHOW: number = 14;

export function getDayName(dateStr: Date, locale: string) {
  return `${dateStr.toLocaleDateString(locale, {
    weekday: "short",
  })} \n ${dateStr.getDate()}`;
}

export function getMinDate(daysBefore: number = DAYS_TO_SHOW): Date {
  const currentDate = new Date();
  var minDate = new Date(currentDate.getTime());
  minDate.setDate(currentDate.getDate() - daysBefore + 1);
  return minDate;
}

export function getMaxDate(): Date {
  const currentDate = new Date();
  var maxDate = new Date(currentDate.getTime());
  maxDate.setDate(currentDate.getDate());
  return maxDate;
}

export function getDaysArray(s: Date, e: Date): Date[] {
  for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    a.push(new Date(d));
  }
  return a;
}

export function getEmptyHabit(
  habitName: string,
  habitColor: string,
  markedDays: IMarkedDay[] = [],
  habitId: number,
  habitQuestion: string,
  habitType: HabitTypes,
  habitUnit: string | undefined = undefined
): IHabit {
  return {
    name: habitName,
    color: habitColor,
    markedDays: markedDays,
    id: habitId,
    question: habitQuestion,
    habitType: habitType,
    unit: habitUnit,
  };
}

export function closeModal(
  ref: React.MutableRefObject<HTMLDivElement>,
  statement: boolean,
  onClose: () => void
) {
  document.documentElement.classList.add("stop-scrolling");

  const checkIfClickedOutside = (e: any) => {
    if (statement && ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };

  document.addEventListener("mousedown", checkIfClickedOutside);

  return () => {
    // Cleanup the event listenerj
    document.documentElement.classList.remove("stop-scrolling");
    document.removeEventListener("mousedown", checkIfClickedOutside);
  };
}

export function getRandomNumber(n: number = 10000000000) {
  return Math.floor(Math.random() * n) + 1;
}
