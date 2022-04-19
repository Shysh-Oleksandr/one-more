import {
  ChartComponent,
  ColumnSeries,
  DateTime,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";
import React from "react";
import { useSelector } from "react-redux";
import { getData } from "../../../Data/data";
import { State } from "../../../State";
import { HabitTypes } from "../../MainPage/Habit";
type Props = {};

function HistoryStat({}: Props) {
  const habitsState = useSelector((state: State) => state.habits);
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  return (
    <div className="history-stat stat pb-12 shadow-lg x-padding">
      <h2 style={{ color: currentHabit.color }} className="stat-label">
        History
      </h2>
      <ChartComponent
        className="graphics !static"
        palettes={[currentHabit.color]}
        width="100%"
        primaryXAxis={{
          valueType: "DateTime",
          edgeLabelPlacement: "Shift",
        }}
        primaryYAxis={{
          interval:
            currentHabit.habitType !== HabitTypes.MEASURABLE ? 0 : undefined,
        }}
      >
        <Inject services={[ColumnSeries, DateTime]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={getData(habitsState)}
            xName="date"
            yName="value"
            type="Column"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default HistoryStat;
