import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { actionCreactors, State } from "../State";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";

function DeleteModal() {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const dispatch = useDispatch();
  const { setIsDeleteModalOpenedHabit, removingHabit } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const habitsState = useSelector((state: State) => state.habits);
  const currentHabit = habitsState.habits.find(
    (value) => value.id === habitsState.openedHabitId
  )!;

  useEffect(() => {
    document.documentElement.classList.add("stop-scrolling");

    const checkIfClickedOutside = (e: any) => {
      if (
        habitsState.isDeleteModalOpened &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsDeleteModalOpenedHabit(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.documentElement.classList.remove("stop-scrolling");
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [habitsState.isDeleteModalOpened]);

  return (
    <div className="absolute z-100 h-full w-full top-0 bg-opacity-60 bg-black flex justify-center items-center">
      <div
        className="basis-2/5 add-habit rounded-lg bg-white m-8 px-8 pt-8 pb-6 shadow-2xl shadow-slate-700 text-left"
        ref={ref}
      >
        <h3 className="font-bold mb-3 text-3xl">Delete the habit?</h3>
        <p className="text-xl">
          The habit will be removed forever. This action cannot be undone.
        </p>
        <div className="confirm-btns flex justify-end mt-5">
          <button
            onClick={() => setIsDeleteModalOpenedHabit(false)}
            className="confirm-btn"
          >
            No
          </button>
          <button
            onClick={() => removingHabit(currentHabit.id)}
            className="confirm-btn"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
