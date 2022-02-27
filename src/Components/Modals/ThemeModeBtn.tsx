import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../State";
import { useSelector } from "react-redux";

function ThemeModeBtn() {
  const dispatch = useDispatch();

  const { changeTheme } = bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);
  return (
    <button className="md:mr-8 mr-4">
      <input
        onChange={() => changeTheme()}
        type="checkbox"
        className="theme-mode-checkbox"
        defaultChecked={habitsState.theme === "dark"}
        id="chk"
      />
      <label htmlFor="chk" className="theme-mode-btn">
        <i>
          <FaMoon color="#f1c40f" />
        </i>
        <i>
          <FaSun color="#f1c40f" />
        </i>
        <div
          className={`ball ${habitsState.theme === "dark" ? "dark" : ""}`}
        ></div>
      </label>
    </button>
  );
}

export default ThemeModeBtn;
