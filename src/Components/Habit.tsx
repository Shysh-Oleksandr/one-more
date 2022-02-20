import React from "react";

export interface IHabit {
  name: string;
  color: string;
  markedDays?: {
    date: Date;
    isMarked: boolean;
  };
}

type IProps = {
  habit: IHabit;
};

function Habit({ habit }: IProps) {
  return <div style={{ color: habit.color }}>{habit.name}</div>;
}

export default Habit;
