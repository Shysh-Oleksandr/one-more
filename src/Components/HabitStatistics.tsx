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
import { State } from "../State";
import { getData } from "./../Data/data";

function HabitStatistics() {
  const habitsState = useSelector((state: State) => state.habits);
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  return (
    <ChartComponent
      width="800"
      primaryXAxis={{
        valueType: "DateTime",
        edgeLabelPlacement: "Shift",
      }}
    >
      <Inject services={[ColumnSeries, DateTime]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={getData(habitsState)}
          xName="date"
          yName="value"
          marker={{ visible: true }}
          type="Column"
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default HabitStatistics;
