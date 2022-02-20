import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { IHabit } from "./../../Components/Habit";

interface IHabits {
  habits: IHabit[];
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
};

const habitReducer = (
  state: IHabits = initialState,
  action: Action
): IHabits => {
  switch (action.type) {
    // case ActionType.ADDING:
    //   return state + action.payload;

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
