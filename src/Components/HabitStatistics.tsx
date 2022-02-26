import React from "react";
import "../Styles/statistics.css";
import HistoryStat from "./HistoryStat";
import CalendarStat from "./CalendarStat";

function HabitStatistics() {
  return (
    <div className="habit__stat x-padding">
      <CalendarStat />
      <HistoryStat />
    </div>
  );
}

export default HabitStatistics;
