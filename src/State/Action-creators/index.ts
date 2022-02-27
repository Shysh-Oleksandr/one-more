import { Dispatch } from "redux";
import { IHabit } from "../../Components/MainPage/Habit";
import { ActionType } from "../Action-types";
import { Action } from "../Actions";
import { HabitId } from "../Reducers/HabitReducer";

export const addingHabit = (habitToAdd: IHabit) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADDING,
      payload: habitToAdd,
    });
  };
};

export const removingHabit = (id: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVING,
      payload: id,
    });
  };
};

export const editingHabit = (habitToEdit: IHabit) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.EDITING,
      payload: habitToEdit,
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

export const setIsDeleteModalOpenedHabit = (statement: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_DELETE_MODAL_OPENED,
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

export const setIsHabitOpened = (statement: boolean, id: HabitId = null) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_HABIT_OPENED,
      payload: { statement, id },
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

export const changeTheme = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CHANGE_THEME,
    });
  };
};

export const resetState = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESET_STATE,
    });
  };
};
