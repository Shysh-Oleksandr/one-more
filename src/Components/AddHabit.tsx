import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../State";
import "../Styles/addHabit.css";
import { IHabit } from "./Habit";

function AddHabit() {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const dispatch = useDispatch();
  const { setIsAddingHabit, addingHabit, setIsEditingHabit, editingHabit } =
    bindActionCreators(actionCreactors, dispatch);
  const habitsState = useSelector((state: State) => state.habits);

  const currentHabit: IHabit = habitsState.isEditingHabit
    ? habitsState.habits.find(
        (value) => value.id === habitsState.openedHabitId
      )!
    : { name: "", color: "#475569", markedDays: [], id: 0 };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.documentElement.classList.add("stop-scrolling");

    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        (habitsState.isAddingHabit || habitsState.isEditingHabit) &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setIsAddingHabit(false);
        setIsEditingHabit(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.documentElement.classList.remove("stop-scrolling");
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [habitsState.isAddingHabit, habitsState.isEditingHabit]);

  const onSubmit = () => {
    let habitName = getValues("name");
    let habitColor = getValues("color");
    let habitQuestion = getValues("question");

    const isCurrentMonth =
      document
        .querySelector(
          ".habits__calendar .react-calendar__navigation__next-button"
        )
        ?.getAttribute("disabled") === null
        ? true
        : false;
    if (isCurrentMonth) {
      const nextBtn: any = document.querySelector(
        ".habits__calendar .react-calendar__navigation__next-button"
      );
      nextBtn!.click();
    }

    habitsState.isAddingHabit
      ? addingHabit({
          name: habitName,
          color: habitColor,
          markedDays: [],
          id: habitsState.habits.length,
          question: habitQuestion,
        })
      : editingHabit({
          name: habitName,
          color: habitColor,
          markedDays: currentHabit.markedDays,
          id: currentHabit.id,
          question: habitQuestion,
        });

    setIsAddingHabit(false);
    setIsEditingHabit(false);
  };

  return (
    <div className="absolute z-100 h-full w-full top-0 bg-opacity-60 bg-black flex justify-center items-center">
      <div
        className="add-habit basis-2/5 rounded-lg bg-white m-8 pb-8"
        ref={ref}
      >
        <h2 className="add-habit-label text-[1.7rem] leading-10 text-center py-2 rounded-t-lg text-white">
          {habitsState.isEditingHabit
            ? "Editing a habit"
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
              defaultValue={habitsState.isEditingHabit ? currentHabit.name : ""}
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
            <label className="add-habit__label" htmlFor="add-habit__name">
              Question:
            </label>
            <input
              id="add-habit__name"
              placeholder="Did I work out today?"
              type="text"
              defaultValue={
                habitsState.isEditingHabit ? currentHabit.question : ""
              }
              className="add-habit__input w-[65%]"
              {...register("question")}
            />
          </div>
          <div className="add-habit__block">
            <label className="add-habit__label" htmlFor="add-habit__date">
              Color:
            </label>
            <input
              id="add-habit__color"
              type="color"
              defaultValue={
                habitsState.isEditingHabit ? currentHabit.color : "#64b5f6"
              }
              className="add-habit__input"
              {...register("color")}
            />
          </div>

          <button
            className="submit-btn w-5/6 text-2xl flex justify-center mx-auto text-white shadow-lg leading-6 rounded-md font-bold transition-opacity hover:opacity-80 mt-8 p-3"
            type="submit"
          >
            {habitsState.isEditingHabit ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHabit;
