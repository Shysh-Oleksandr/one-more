export function getDayName(dateStr: Date, locale: string) {
  return `${dateStr.toLocaleDateString(locale, {
    weekday: "short",
  })} \n ${dateStr.getDate()}`;
}
