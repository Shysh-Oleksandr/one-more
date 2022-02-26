import React from "react";
import "./App.css";
import Habits from "./Components/Habits";
import Navbar from "./Components/Navbar";
import { useSelector } from "react-redux";
import { State } from "./State";
import AddHabit from "./Components/AddHabit";
import HabitNavbar from "./Components/HabitNavbar";
import HabitStatistics from "./Components/HabitStatistics";

function App() {
  const habitsState = useSelector((state: State) => state.habits);

  if (habitsState.isHabitOpened) {
    return (
      <div className="App">
        <HabitNavbar />
        {habitsState.isEditingHabit && <AddHabit />}
        <HabitStatistics />
      </div>
    );
  }

  return (
    <div className="main">
      <Navbar />
      {habitsState.isAddingHabit && <AddHabit />}
      <Habits />
    </div>
  );
}

export default App;
