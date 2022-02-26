import {
  AxesDirective,
  AxisDirective,
  BarSeries,
  ColumnDirective,
  ChartComponent,
  ColumnSeries,
  DateTime,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../State";
import { getData } from "./../Data/data";
type Props = {};

function HistoryStat({}: Props) {
  const habitsState = useSelector((state: State) => state.habits);
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  return (
    <div className="history-stat pb-12 shadow-lg x-padding">
      <h2 style={{ color: currentHabit.color }} className="stat-label">
        History
      </h2>
      <ChartComponent
        className="graphics -z-10"
        palettes={[currentHabit.color]}
        width="90%"
        primaryXAxis={{
          valueType: "DateTime",
          edgeLabelPlacement: "Shift",
        }}
        primaryYAxis={{ interval: 0 }}
      >
        <Inject services={[ColumnSeries, DateTime]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={getData(habitsState)}
            xName="date"
            yName="value"
            // marker={{ visible: true }}
            type="Column"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default HistoryStat;
