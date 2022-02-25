import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { IHabit } from "./../../Components/Habit";

export type HabitId = number | null;

export interface IHabits {
  habits: IHabit[];
  isAddingHabit: boolean;
  isEditingHabit: boolean;
  isHabitOpened: boolean;
  openedHabitId: HabitId;
}

const initialState: IHabits = {
  habits: [
    {
      name: "Early waking up",
      color: "#842ef2",
      markedDays: [],
      id: 0,
    },
    {
      name: "Working out",
      color: "#242",
      markedDays: [],
      id: 1,
    },
  ],
  isAddingHabit: false,
  isEditingHabit: false,
  isHabitOpened: false,
  openedHabitId: null,
};

const habitReducer = (
  state: IHabits = initialState,
  action: Action
): IHabits => {
  switch (action.type) {
    case ActionType.SET_IS_ADDING:
      return { ...state, isAddingHabit: action.payload };

    case ActionType.SET_IS_EDITING:
      return { ...state, isEditingHabit: action.payload };

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
      };

    case ActionType.MARKING:
      console.log(action.payload.date);
      let date = action.payload.date.getTime();
      console.log(date);
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
