export const DAYS_TO_SHOW: number = 14;

export function getDayName(dateStr: Date, locale: string) {
  return `${dateStr.toLocaleDateString(locale, {
    weekday: "short",
  })} \n ${dateStr.getDate()}`;
}

export function getMinDate(): Date {
  const currentDate = new Date();
  var minDate = new Date(currentDate.getTime());
  minDate.setDate(currentDate.getDate() - DAYS_TO_SHOW + 1);
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
