import { HabitTypes, IHabit } from "../../Components/MainPage/Habit";
import { initialHabits } from "../../Data/data";
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
  habits: initialHabits,
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
      return {
        ...state,
        isEditingHabit: action.payload.isEditing,
        currentAddingType: action.payload.habitType,
      };

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
        const isYesOrNoType = habit.habitType === HabitTypes.YES_OR_NO;
        const isMeasurableType = habit.habitType === HabitTypes.MEASURABLE;
        const isSelectableType = habit.habitType === HabitTypes.SELECTABLE;
        if (habit.id == action.payload.id) {
          const currentMarkedDay = habit.markedDays.find(
            (markedDay) => markedDay.date === date
          );

          if (isYesOrNoType) {
            let isMarked: boolean = !!currentMarkedDay;

            // Removing the date from array.
            if (isMarked) {
              let newMarkedDays = habit.markedDays?.filter(
                (day) => day.date !== date
              );
              return {
                ...habit,
                markedDays: newMarkedDays,
              };
            }
          }
          if (isMeasurableType || isSelectableType) {
            // If measurable value is 0, remove the date from array.
            if (
              (action.payload.measurableValue === 0 && isMeasurableType) ||
              (action.payload.selectedOption === "none" && isSelectableType)
            ) {
              let newMarkedDays = habit.markedDays?.filter(
                (day) => day.date !== date
              );
              return {
                ...habit,
                markedDays: newMarkedDays,
              };
            }
            // Else if date is in the array, change the measurable value.
            else if (currentMarkedDay) {
              let newMarkedDays = habit.markedDays.map((markedDay) => {
                if (markedDay.date === date) {
                  return {
                    date: date,
                    measurableValue: action.payload.measurableValue,
                    selectableOption: action.payload.selectedOption,
                  };
                }
                return markedDay;
              });
              return {
                ...habit,
                markedDays: newMarkedDays,
              };
            }
          }
          // Adding the date to array.
          return {
            ...habit,
            markedDays: [
              ...habit.markedDays!,
              {
                date: date,
                measurableValue: action.payload.measurableValue,
                selectableOption: action.payload.selectedOption,
              },
            ],
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
