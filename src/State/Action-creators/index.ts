import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";

export const addingHabit = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING,
      payload: amount,
    });
  };
};

export const removingHabit = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVING,
      payload: amount,
    });
  };
};

export const editingHabit = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.EDITING,
      payload: amount,
    });
  };
};

export const markingHabit = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.MARKING,
      payload: amount,
    });
  };
};
