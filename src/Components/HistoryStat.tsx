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
type Props = {};

function HistoryStat({}: Props) {
  const habitsState = useSelector((state: State) => state.habits);
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  return (
    <ChartComponent
      className="graphics mt-4 -z-10"
      palettes={[currentHabit.color]}
      width={(window.innerWidth * 0.8).toString() + "px"}
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
  );
}

export default HistoryStat;
