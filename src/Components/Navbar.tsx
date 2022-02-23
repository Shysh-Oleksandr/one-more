import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../State";
import { AiOutlinePlus } from "react-icons/ai";

function Navbar() {
  const dispatch = useDispatch();

  const { setIsAddingHabit } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div className="flex justify-between px-32 py-2 bg-gray-600 text-white">
      <h2 className="text-3xl font-bold">Habits</h2>
      <button
        className="text-2xl hover:text-gray-300 transition-colors"
        onClick={() => setIsAddingHabit(true)}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
}

export default Navbar;
