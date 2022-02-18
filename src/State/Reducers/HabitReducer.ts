import { ActionType } from "../Action-types";
import { Action } from "../Actions";

const initialState = 0;

const habitReducer = (state: number = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ADDING:
      return state + action.payload;

    case ActionType.REMOVING:
      return state - action.payload;

    case ActionType.EDITING:
      return state * action.payload;

    case ActionType.MARKING:
      return state + action.payload;

    default:
      return state;
  }
};

export default habitReducer;
