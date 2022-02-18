import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";
import Habits from "./Components/Habits";
import { actionCreactors, State } from "./State";

function App() {
  const dispatch = useDispatch();

  const { addingHabit, removingHabit, editingHabit, markingHabit } =
    bindActionCreators(actionCreactors, dispatch);
  const habitState = useSelector((state: State) => state.habit);

  return (
    <div className="App">
      <Habits />
    </div>
  );
}

export default App;
