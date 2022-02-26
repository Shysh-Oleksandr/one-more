import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../State";
import { AiOutlinePlus } from "react-icons/ai";
import ThemeModeBtn from "./ThemeModeBtn";

function Navbar() {
  const dispatch = useDispatch();

  const { setIsAddingHabit, changeTheme } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  return (
    <div className="flex justify-between x-padding py-3 bg-gray-600 text-white">
      <h2 className="text-3xl font-bold">Habits</h2>
      <div className="navbar-btns flex">
        <ThemeModeBtn />
        <button
          className="text-2xl hover:text-gray-300 transition-colors"
          onClick={() => setIsAddingHabit(true)}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
