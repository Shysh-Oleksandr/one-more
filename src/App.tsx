import React from "react";
import "./App.css";
import Habits from "./Components/Habits";
import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";
import { State } from "./State";
import AddHabit from "./Components/AddHabit";

function App() {
  const habitsState = useSelector((state: State) => state.habits);

  return (
    <div className="App">
      <Navbar />
      {habitsState.isAddingHabit && <AddHabit />}
      <Habits />
    </div>
  );
}

export default App;
