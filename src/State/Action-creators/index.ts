import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { IHabit } from "./../../Components/Habit";

export const addingHabit = (habitToAdd: IHabit) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING,
      payload: habitToAdd,
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

export const setIsAddingHabit = (statement: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_ADDING,
      payload: statement,
    });
  };
};