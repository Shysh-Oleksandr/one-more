import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { actionCreactors, State } from "../State";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import "../Styles/addHabit.css";

function AddHabit() {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const dispatch = useDispatch();

  const { setIsAddingHabit, addingHabit } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const habitsState = useSelector((state: State) => state.habits);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        habitsState.isAddingHabit &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsAddingHabit(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [habitsState.isAddingHabit]);

  const onSubmit = () => {
    let habitName = getValues("name");
    let habitColor = getValues("color");

    addingHabit({
      name: habitName,
      color: habitColor,
      markedDays: [],
      id: habitsState.habits[habitsState.habits.length - 1].id + 1,
    });

    setIsAddingHabit(false);
  };

  return (
    <div className="absolute z-100 h-full w-full top-0 bg-opacity-60 bg-black flex justify-center items-center">
      <div
        className="basis-2/5 rounded-lg bg-white m-8 pb-8 shadow-2xl shadow-slate-700"
        ref={ref}
      >
        <h2
          style={{ backgroundColor: getValues("color") }}
          className="bg-slate-700 text-[1.7rem] leading-10 py-2 rounded-t-lg text-white"
        >
          {habitsState.isEditingHabit
            ? "Editing the habit"
            : "Adding a new habit"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="add-habit__block">
            <label className="add-habit__label" htmlFor="add-habit__name">
              Name:
            </label>
            <input
              id="add-habit__name"
              placeholder="Work out"
              type="text"
              className="add-habit__input w-[65%]"
              {...register("name", { required: true, maxLength: 25 })}
            />
          </div>
          {errors.name?.type === "required" ? (
            <span className="add-habit__error">Habit name is required.</span>
          ) : (
            errors.name?.type === "maxLength" && (
              <span className="add-habit__error">
                Habit name must be no longer than 25 characters
              </span>
            )
          )}
          <div className="add-habit__block">
            <label className="add-habit__label" htmlFor="add-habit__date">
              Color:
            </label>
            <input
              id="add-habit__color"
              type="color"
              className="add-habit__input"
              {...register("color")}
            />
          </div>

          <button
            className="w-5/6 text-2xl text-white shadow-lg leading-6 bg-slate-600 hover:bg-slate-500 rounded-md border-white border-[1px] font-bold transition-all mt-8 p-3"
            type="submit"
          >
            {habitsState.isEditingHabit ? "Edit" : "Add"}
          </button>
          {habitsState.isEditingHabit && (
            <button
              type="button"
              className="add-habit__btn add-habit__btn--delete"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddHabit;
