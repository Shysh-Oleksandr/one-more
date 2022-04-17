import { HabitTypes, IHabit } from "../../Components/MainPage/Habit";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export type HabitId = number | null;

export interface IHabits {
  habits: IHabit[];
  isAddingHabit: boolean;
  isEditingHabit: boolean;
  isTypeModalOpened: boolean;
  isHabitOpened: boolean;
  isDeleteModalOpened: boolean;
  openedHabitId: HabitId;
  currentAddingType: HabitTypes;
  theme: string;
}

const initialState: IHabits = {
  habits: [],
  isAddingHabit: false,
  isEditingHabit: false,
  isTypeModalOpened: false,
  isHabitOpened: false,
  isDeleteModalOpened: false,
  openedHabitId: null,
  currentAddingType: HabitTypes.YES_OR_NO,
  theme: "dark",
};

const habitReducer = (
  state: IHabits = initialState,
  action: Action
): IHabits => {
  switch (action.type) {
    case ActionType.RESET_STATE:
      return {
        ...state,
        isAddingHabit: false,
        isEditingHabit: false,
        isHabitOpened: false,
        isDeleteModalOpened: false,
        openedHabitId: null,
      };

    case ActionType.SET_IS_ADDING:
      return {
        ...state,
        isAddingHabit: action.payload.isAdding,
        currentAddingType: action.payload.habitType,
      };

    case ActionType.SET_IS_EDITING:
      return { ...state, isEditingHabit: action.payload };

    case ActionType.SET_IS_DELETE_MODAL_OPENED:
      return { ...state, isDeleteModalOpened: action.payload };

    case ActionType.SET_IS_HABIT_TYPE_MODAL_OPENED:
      return { ...state, isTypeModalOpened: action.payload };

    case ActionType.CHANGE_THEME:
      let newTheme = state.theme === "light" ? "dark" : "light";
      return { ...state, theme: newTheme };

    case ActionType.SET_IS_HABIT_OPENED:
      return {
        ...state,
        isHabitOpened: action.payload.statement,
        openedHabitId: action.payload.id!,
      };

    case ActionType.ADDING:
      return { ...state, habits: [...state.habits, action.payload] };

    case ActionType.REORDER:
      return { ...state, habits: action.payload };

    case ActionType.EDITING:
      var editedHabits: IHabit[] = state.habits.map((habit) => {
        if (habit.id == action.payload.id) {
          return action.payload;
        }
        return habit;
      });

      return { ...state, habits: editedHabits };

    case ActionType.REMOVING:
      const filteredHabits: IHabit[] = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
      return {
        ...state,
        habits: filteredHabits,
        isHabitOpened: false,
        openedHabitId: null,
        isDeleteModalOpened: false,
      };

    case ActionType.MARKING:
      let date = action.payload.date.getTime();
      const newHabits: IHabit[] = state.habits.map((habit) => {
        if (habit.id == action.payload.id) {
          let isMarked: boolean = state.habits
            .find((value) => value.id === habit.id)!
            .markedDays?.includes(date)!;

          // Removing the date from array.
          if (isMarked) {
            let newMarkedDays = habit.markedDays?.filter((day) => day !== date);
            return {
              ...habit,
              markedDays: newMarkedDays,
            };
          }
          // Adding the date to array.
          return {
            ...habit,
            markedDays: [...habit.markedDays!, date],
          };
        }
        return habit;
      });

      return { ...state, habits: newHabits };

    default:
      return state;
  }
};

export default habitReducer;
