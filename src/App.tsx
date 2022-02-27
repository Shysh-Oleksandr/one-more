import React, { useEffect } from "react";
import "./App.css";
import Habits from "./Components/Habits";
import Navbar from "./Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { actionCreactors, State } from "./State";
import AddHabit from "./Components/AddHabit";
import HabitNavbar from "./Components/HabitNavbar";
import HabitStatistics from "./Components/HabitStatistics";
import DeleteModal from "./Components/DeleteModal";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/globalStyles";
import { darkTheme, lightTheme } from "./Styles/Themes";
import { bindActionCreators } from "redux";

function App() {
  const habitsState = useSelector((state: State) => state.habits);
  const dispatch = useDispatch();

  const { resetState } = bindActionCreators(actionCreactors, dispatch);
  useEffect(() => {
    resetState();
  }, []);

  if (habitsState.isHabitOpened) {
    return (
      <ThemeProvider
        theme={habitsState.theme === "light" ? lightTheme : darkTheme}
      >
        <>
          <GlobalStyles />

          <div className="App">
            <HabitNavbar />
            {habitsState.isEditingHabit && <AddHabit />}
            {habitsState.isDeleteModalOpened && <DeleteModal />}
            <HabitStatistics />
          </div>
        </>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      theme={habitsState.theme === "light" ? lightTheme : darkTheme}
    >
      <>
        <GlobalStyles />

        <div className="main">
          <Navbar />
          {habitsState.isAddingHabit && <AddHabit />}
          <Habits />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
