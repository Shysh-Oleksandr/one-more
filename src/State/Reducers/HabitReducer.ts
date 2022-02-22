import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { IHabit } from "./../../Components/Habit";

interface IHabits {
  habits: IHabit[];
  isAddingHabit: boolean;
  isEditingHabit: boolean;
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
};

const habitReducer = (
  state: IHabits = initialState,
  action: Action
): IHabits => {
  switch (action.type) {
    case ActionType.SET_IS_ADDING:
      return { ...state, isAddingHabit: action.payload };

    case ActionType.ADDING:
      return { ...state, habits: [...state.habits, action.payload] };

    // case ActionType.REMOVING:
    //   return state - action.payload;

    // case ActionType.EDITING:
    //   return state * action.payload;

    case ActionType.MARKING:
      let date = action.payload.date.getTime();
      let newHabits: IHabit[] = state.habits.map((habit) => {
        if (habit.id == action.payload.id) {
          let isMarked: boolean =
            state.habits[habit.id].markedDays?.includes(date)!;

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
