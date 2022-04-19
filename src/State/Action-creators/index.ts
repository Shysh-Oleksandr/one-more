import { Dispatch } from "redux";
import { HabitTypes, IHabit } from "../../Components/MainPage/Habit";
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

export const markingHabit = (
  date: Date,
  id: number,
  measurableValue: number = 0
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.MARKING,
      payload: { date, id, measurableValue },
    });
  };
};

export const setIsAddingHabit = (
  statement: boolean,
  habitType: HabitTypes = HabitTypes.YES_OR_NO
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_ADDING,
      payload: { isAdding: statement, habitType: habitType },
    });
  };
};

export const setIsDeleteModalOpened = (statement: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_DELETE_MODAL_OPENED,
      payload: statement,
    });
  };
};

export const setIsHabitTypeModalOpened = (statement: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_HABIT_TYPE_MODAL_OPENED,
      payload: statement,
    });
  };
};

export const setIsEditingHabit = (
  statement: boolean,
  habitType: HabitTypes = HabitTypes.YES_OR_NO
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_IS_EDITING,
      payload: { isEditing: statement, habitType: habitType },
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
