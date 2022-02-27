import React from "react";
import { BsArrowLeft, BsFillTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../State";
import ThemeModeBtn from "./ThemeModeBtn";

type Props = {};

function HabitNavbar({}: Props) {
  const dispatch = useDispatch();

  const { setIsHabitOpened, setIsEditingHabit, setIsDeleteModalOpenedHabit } =
    bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);

  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  return (
    <div
      style={{
        backgroundColor:
          habitsState.theme === "light" ? currentHabit.color : "#101010",
      }}
      className="habit-navbar flex items-center justify-between x-padding py-4 text-white"
    >
      <div className="flex">
        <button
          className="text-4xl icon-btn"
          onClick={() => setIsHabitOpened(false)}
        >
          <BsArrowLeft />
        </button>
        <h2 className="md:text-2xl text-xl mr-2 md:ml-8 ml-4">
          {currentHabit.name}
        </h2>
      </div>
      <div className="flex">
        <ThemeModeBtn />

        <button
          className="md:text-2xl text-xl icon-btn"
          onClick={() => setIsEditingHabit(true)}
        >
          <MdEdit />
        </button>
        <button
          className="md:text-2xl text-xl icon-btn md:ml-6 ml-4"
          onClick={() => setIsDeleteModalOpenedHabit(true)}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}

export default HabitNavbar;
