import { ActionType } from "../Action-types";
import { HabitId } from "../Reducers/HabitReducer";
import { IHabit } from "./../../Components/Habit";

interface AddingAction {
  type: ActionType.ADDING;
  payload: IHabit;
}

interface EditingAction {
  type: ActionType.EDITING;
  payload: IHabit;
}

interface RemovingAction {
  type: ActionType.REMOVING;
  payload: number;
}

interface MarkingAction {
  type: ActionType.MARKING;
  payload: { date: Date; id: number };
}

interface SetIsAddingAction {
  type: ActionType.SET_IS_ADDING;
  payload: boolean;
}

interface SetIsEditingAction {
  type: ActionType.SET_IS_EDITING;
  payload: boolean;
}

interface SetIsDeleteModalOpenedAction {
  type: ActionType.SET_IS_DELETE_MODAL_OPENED;
  payload: boolean;
}

interface SetIsHabitOpenedAction {
  type: ActionType.SET_IS_HABIT_OPENED;
  payload: { statement: boolean; id?: HabitId };
}

interface ReorderAction {
  type: ActionType.REORDER;
  payload: IHabit[];
}

interface ChangeThemeAction {
  type: ActionType.CHANGE_THEME;
}

export type Action =
  | AddingAction
  | EditingAction
  | RemovingAction
  | MarkingAction
  | ReorderAction
  | SetIsEditingAction
  | SetIsDeleteModalOpenedAction
  | SetIsHabitOpenedAction
  | ChangeThemeAction
  | SetIsAddingAction;
