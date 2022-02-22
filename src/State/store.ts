import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers/index";

const persistedState = localStorage.getItem("habits")
  ? JSON.parse(localStorage.getItem("habits")!)
  : {};

export const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  localStorage.setItem("habits", JSON.stringify(store.getState()));
});
