import { ActionType } from "../Action-types";
import { HabitId } from "../Reducers/HabitReducer";
import { IHabit } from "./../../Components/Habit";

interface AddingAction {
  type: ActionType.ADDING;
  payload: IHabit;
}

interface EditingAction {
  type: ActionType.EDITING;
  payload?: number;
}

interface RemovingAction {
  type: ActionType.REMOVING;
  payload?: number;
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

interface SetIsHabitOpenedAction {
  type: ActionType.SET_IS_HABIT_OPENED;
  payload: boolean;
}

interface SetOpenedHabitIdAction {
  type: ActionType.SET_OPENED_HABIT_ID;
  payload: HabitId;
}

interface ReorderAction {
  type: ActionType.REORDER;
  payload: IHabit[];
}

export type Action =
  | AddingAction
  | EditingAction
  | RemovingAction
  | MarkingAction
  | ReorderAction
  | SetIsEditingAction
  | SetIsHabitOpenedAction
  | SetOpenedHabitIdAction
  | SetIsAddingAction;
