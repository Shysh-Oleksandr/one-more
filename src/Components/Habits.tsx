import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { v4 as uuidv4 } from "uuid";
import { GrNext, GrPrevious } from "react-icons/gr";
import { actionCreactors, State } from "../State";
import "../Styles/calendar.css";
import { getDayName, getMaxDate, getMinDate } from "./../Helpers/functions";
import Habit, { IHabit } from "./Habit";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function changeMonth() {
  document
    .querySelectorAll(
      ".marks .react-calendar__navigation__arrow:not([disabled])"
    )
    .forEach((el: any) => {
      el.click();
    });
}

function Habits() {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const dispatch = useDispatch();

  const { reorderHabit } = bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);
  const [habits, setHabits] = useState(habitsState.habits);

  useEffect(() => {
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

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(habitsState.habits);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log(items);
    reorderHabit(items);
    // setHabits(items);
  }
  return (
    <>
      <div className="habits__calendar">
        <Calendar
          defaultActiveStartDate={getMaxDate()}
          maxDate={getMaxDate()}
          minDate={getMinDate()}
          minDetail="month"
          defaultView="month"
          inputRef={ref}
          prevLabel={<GrNext />}
          nextLabel={<GrPrevious />}
          showNeighboringMonth={false}
          onActiveStartDateChange={() => changeMonth()}
          formatDay={(locale: string, date: Date) => getDayName(date, locale)}
        />
      </div>
      <div className="habits__list">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="habits">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {habitsState.habits.map((habit: IHabit) => {
                  return (
                    <Draggable
                      key={habit.id}
                      draggableId={habit.id.toString()}
                      index={habit.id}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="habit"
                          id={habit.id.toString()}
                        >
                          <Habit habit={habit} />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default Habits;
