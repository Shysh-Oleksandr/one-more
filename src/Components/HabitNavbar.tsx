import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../State";
import { useSelector } from "react-redux";

type Props = {};

function HabitNavbar({}: Props) {
  const dispatch = useDispatch();

  const { setIsHabitOpened } = bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);

  return <div>HabitNavbar</div>;
}

export default HabitNavbar;
