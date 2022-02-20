import React from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../State";
import "../Styles/calendar.css";
import { v4 as uuidv4 } from "uuid";

import { getMinDate, getMaxDate, getDayName } from "./../Helpers/functions";
import Habit, { IHabit } from "./Habit";

function Habits() {
  const dispatch = useDispatch();

  const { addingHabit, removingHabit, editingHabit, markingHabit } =
    bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);

  return (
    <div className="">
      <div>
        <Calendar
          maxDate={getMaxDate()}
          minDate={getMinDate()}
          minDetail="month"
          defaultView="month"
          formatDay={(locale, date) => getDayName(date, locale)}
        />
      </div>
      <div className="">
        {habitsState.habits.map((habit: IHabit, index: number) => {
          return (
            <div key={uuidv4()}>
              <Habit habit={habit} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Habits;
