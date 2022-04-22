import { HabitTypes, IHabit } from "../../Components/MainPage/Habit";
import { ActionType } from "../Action-types";
import { HabitId } from "../Reducers/HabitReducer";

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
  payload: {
    date: Date;
    id: number;
    measurableValue: number;
    selectedOption: string;
  };
}

interface SetIsAddingAction {
  type: ActionType.SET_IS_ADDING;
  payload: { isAdding: boolean; habitType: HabitTypes };
}

interface SetIsEditingAction {
  type: ActionType.SET_IS_EDITING;
  payload: { isEditing: boolean; habitType: HabitTypes };
}

interface SetIsDeleteModalOpenedAction {
  type: ActionType.SET_IS_DELETE_MODAL_OPENED;
  payload: boolean;
}

interface SetIsHabitTypeModalOpenedAction {
  type: ActionType.SET_IS_HABIT_TYPE_MODAL_OPENED;
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

interface ResetStateAction {
  type: ActionType.RESET_STATE;
}

export type Action =
  | AddingAction
  | EditingAction
  | RemovingAction
  | MarkingAction
  | ReorderAction
  | SetIsEditingAction
  | SetIsHabitTypeModalOpenedAction
  | SetIsDeleteModalOpenedAction
  | SetIsHabitOpenedAction
  | ChangeThemeAction
  | ResetStateAction
  | SetIsAddingAction;
