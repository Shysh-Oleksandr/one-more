import { Dispatch } from "redux";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { HabitId } from "../Reducers/HabitReducer";
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

export const markingHabit = (date: Date, id: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.MARKING,
      payload: { date, id },
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

export const setIsEditingHabit = (statement: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_EDITING,
      payload: statement,
    });
  };
};

export const setIsHabitOpened = (statement: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_HABIT_OPENED,
      payload: statement,
    });
  };
};

export const setOpenedHabitId = (id: HabitId) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_OPENED_HABIT_ID,
      payload: id,
    });
  };
};

export const reorderHabit = (habits: IHabit[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REORDER,
      payload: habits,
    });
  };
};
