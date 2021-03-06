import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AiOutlinePlus } from "react-icons/ai";
import ThemeModeBtn from "./../Modals/ThemeModeBtn";
import { actionCreactors } from "../../State";

function Navbar() {
  const dispatch = useDispatch();

  const { setIsHabitTypeModalOpened } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  return (
    <div className="flex navbar justify-between x-padding py-4 bg-gray-600 text-white">
      <h2 className="md:text-3xl sm:text-2xl text-xl font-bold">Habits</h2>
      <div className="navbar-btns flex">
        <ThemeModeBtn />
        <button
          className="text-2xl hover:text-gray-300 transition-colors"
          onClick={() => setIsHabitTypeModalOpened(true)}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
