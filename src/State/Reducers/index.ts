import { combineReducers } from "redux";
import habitReducer from "./HabitReducer";

const reducers = combineReducers({
  habit: habitReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
