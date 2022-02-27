import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./Themes";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    background: ${({ theme }) => theme.body};
  }
  .habit, .stat {
    background: ${({ theme }) => theme.habit};
  }
  .mark {
    color: ${({ theme }) => theme.markColor};
  }
  .mark:hover {
    color: ${({ theme }) => theme.markColorHover};
  }
  .main .habits__calendar .react-calendar {
    background: ${({ theme }) => theme.calendarBg};
  }
  .main .react-calendar__tile, .react-calendar__navigation__label__labelText {
    color: ${({ theme }) => theme.calendarTile} !important;
  }
  .main .navbar, .habit-navbar {
    background: ${({ theme }) => theme.navbarBg};
  }
  .theme-mode-btn {
    background: ${({ theme }) => theme.themeModeBtnBg};
  }
  .add-habit {
    background: ${({ theme }) => theme.addHabitBg};
    color: ${({ theme }) => theme.addHabitText};

  }
  .add-habit__label, .add-habit__input {
    color: ${({ theme }) => theme.addHabitText};
  }
  .habit-question {
    background: ${({ theme }) => theme.questionBg};
  }
  .add-habit-label, .submit-btn {
    background: ${({ theme }) => theme.addHabitBtnBg};
  }
  .confirm-btn:hover {
    background: ${({ theme }) => theme.confirmButtonBg};
  }
  `;
