import { combineReducers } from "redux";
import habitReducer from "./HabitReducer";

const reducers = combineReducers({
  habits: habitReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
