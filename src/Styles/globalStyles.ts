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
  .main .habits__calendar {
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
  .habit__stat .react-calendar {
    background: ${({ theme }) => theme.addHabitBg};
  }
  .habit__stat .react-calendar__tile {
    border-color: ${({ theme }) => theme.addHabitBg};
  }
  .habit__stat .react-calendar__tile:enabled {
    background: ${({ theme }) => theme.calendarStatTileBg};
    color: ${({ theme }) => theme.calendarStatTileColor};
  }
  .habit__stat .react-calendar__month-view__weekdays__weekday {
    color: ${({ theme }) => theme.calendarStatTileColor};
  }
  .habit__stat .react-calendar__navigation button:enabled {
    background: ${({ theme }) => theme.calendarStatTileBg};
    color: ${({ theme }) => theme.calendarStatTileDisabledBtn};
  }
  .habit__stat .react-calendar__tile:enabled:hover,
  .habit__stat .react-calendar__navigation button:enabled:hover {
    background: ${({ theme }) => theme.calendarStatTileBgHover};
  }

  .habit__stat .react-calendar__navigation button:disabled {
    background: ${({ theme }) => theme.calendarStatTileDisabledBtnBg};
    color: ${({ theme }) => theme.calendarStatTileDisabledBtn};
  }

  .theme-mode-btn .ball {
    background: ${({ theme }) => theme.themeModeBallBg};
  }

  .habit-type:hover {
    background: ${({ theme }) => theme.habitTypeBg};
  }

  #chart_57723_1_ChartBorder {
    fill: ${({ theme }) => theme.chartFillBg};
  }
  @media screen and (min-width: 767.98px) {
    /* Track */
    .main .habits__calendar::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.scrollBarTrackBg};
    }

    /* Handle */
    .main .habits__calendar::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.scrollBarThumbBg};
    }
  }

  `;
