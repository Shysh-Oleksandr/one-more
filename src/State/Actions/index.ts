import { ActionType } from "../Action-types";

interface AddingAction {
  type: ActionType.ADDING;
  payload: number;
}

interface EditingAction {
  type: ActionType.EDITING;
  payload: number;
}

interface RemovingAction {
  type: ActionType.REMOVING;
  payload: number;
}

interface MarkingAction {
  type: ActionType.MARKING;
  payload: number;
}

export type Action =
  | AddingAction
  | EditingAction
  | RemovingAction
  | MarkingAction;
