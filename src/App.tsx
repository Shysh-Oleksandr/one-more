import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCreactors, State } from "./State";
import AddHabit from "./Components/Modals/AddHabit";
import HabitNavbar from "./Components/HabitPage/HabitNavbar";
import HabitStatistics from "./Components/HabitPage/HabitStatistics/HabitStatistics";
import DeleteModal from "./Components/Modals/DeleteModal";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Styles/globalStyles";
import { darkTheme, lightTheme } from "./Styles/Themes";
import { bindActionCreators } from "redux";
import Navbar from "./Components/MainPage/Navbar";
import Habits from "./Components/MainPage/Habits";
import HabitTypeModal from "./Components/Modals/HabitTypeModal";

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
          {habitsState.isTypeModalOpened && <HabitTypeModal />}
          <Habits />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
