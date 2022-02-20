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
      markedDays: {
        date: new Date(),
        isMarked: false,
      },
    },
    {
      name: "Working out",
      color: "#242",
      markedDays: {
        date: new Date(),
        isMarked: true,
      },
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

    // case ActionType.MARKING:
    //   return state + action.payload;

    default:
      return state;
  }
};

export default habitReducer;
