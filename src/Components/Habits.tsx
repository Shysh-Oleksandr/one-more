import React, { useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { v4 as uuidv4 } from "uuid";
import { GrNext, GrPrevious } from "react-icons/gr";
import { actionCreactors, State } from "../State";
import "../Styles/calendar.css";
import { getDayName, getMaxDate, getMinDate } from "./../Helpers/functions";
import Habit, { IHabit } from "./Habit";

function Habits() {
  const dispatch = useDispatch();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { addingHabit, removingHabit, editingHabit, markingHabit } =
    bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);

  function changeMonth() {
    document
      .querySelectorAll(
        ".marks .react-calendar__navigation__arrow:not([disabled])"
      )
      .forEach((el: any) => {
        el.click();
      });
  }

  useEffect(() => {
    // console.log(ref);

    const prevBtn = document.querySelector(
      ".habits__calendar .react-calendar__navigation__prev-button"
    );
    const nextBtn = document.querySelector(
      ".habits__calendar .react-calendar__navigation__next-button"
    );
    const cont = document.querySelector(
      ".habits__calendar .react-calendar__viewContainer"
    );

    cont?.append(prevBtn!);
    cont?.prepend(nextBtn!);
  }, []);

  return (
    <div className="">
      <div className="habits__calendar">
        <Calendar
          maxDate={getMaxDate()}
          minDate={getMinDate()}
          minDetail="month"
          inputRef={ref}
          defaultView="month"
          prevLabel={<GrNext />}
          nextLabel={<GrPrevious />}
          showNeighboringMonth={false}
          onActiveStartDateChange={() => changeMonth()}
          formatDay={(locale: string, date: Date) => getDayName(date, locale)}
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
