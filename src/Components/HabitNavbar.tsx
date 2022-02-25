import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../State";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

type Props = {};

function HabitNavbar({}: Props) {
  const dispatch = useDispatch();

  const { setIsHabitOpened, setIsEditingHabit, removingHabit } =
    bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);

  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  return (
    <div
      style={{ backgroundColor: currentHabit.color }}
      className="flex items-center justify-between x-padding py-3 text-white"
    >
      <div className="flex">
        <button
          className="text-4xl icon-btn"
          onClick={() => setIsHabitOpened(false)}
        >
          <BsArrowLeft />
        </button>
        <h2 className="text-2xl ml-8">{currentHabit.name}</h2>
      </div>
      <div className="flex">
        <button
          className="text-2xl icon-btn"
          onClick={() => setIsEditingHabit(true)}
        >
          <MdEdit />
        </button>
        <button
          className="text-2xl icon-btn ml-6"
          onClick={() => removingHabit(currentHabit.id)}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}

export default HabitNavbar;
