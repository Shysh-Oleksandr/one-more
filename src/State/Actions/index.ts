import { ActionType } from "../Action-types";
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

export type Action =
  | AddingAction
  | EditingAction
  | RemovingAction
  | MarkingAction
  | SetIsAddingAction;
