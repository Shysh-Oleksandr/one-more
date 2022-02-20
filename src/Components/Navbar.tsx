import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors } from "../State";

type Props = {};

function Navbar({}: Props) {
  const dispatch = useDispatch();

  const { setIsAddingHabit } = bindActionCreators(actionCreactors, dispatch);
  return (
    <div className="flex justify-between px-8 py-2 bg-gray-600 text-white">
      <h2 className="text-3xl font-bold">Habits</h2>
      <button onClick={() => setIsAddingHabit(true)}>Add</button>
    </div>
  );
}

export default Navbar;
