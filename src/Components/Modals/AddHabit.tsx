import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../State";
import { IHabit } from "../MainPage/Habit";
import "../../Styles/addHabit.css";
import { getEmptyHabit } from "../../Helpers/functions";
import { closeModal } from "./../../Helpers/functions";

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
    : {
        name: "",
        color: "#475569",
        markedDays: [],
        habitType: habitsState.currentAddingType,
        id: 0,
      };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    return closeModal(
      ref,
      habitsState.isAddingHabit || habitsState.isEditingHabit,
      () => {
        setIsAddingHabit(false);
        setIsEditingHabit(false);
      }
    );
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
      ? addingHabit(
          getEmptyHabit(
            habitName,
            habitColor,
            [],
            habitsState.habits.length,
            habitQuestion,
            habitsState.currentAddingType
          )
        )
      : editingHabit(
          getEmptyHabit(
            habitName,
            habitColor,
            currentHabit.markedDays,
            habitsState.habits.length,
            habitQuestion,
            habitsState.currentAddingType
          )
        );

    setIsAddingHabit(false);
    setIsEditingHabit(false);
  };

  return (
    <div className="absolute z-100 h-full w-full top-0 bg-opacity-60 bg-black flex justify-center items-center">
      <div className="add-habit" ref={ref}>
        <h2 className="add-habit-label lg:text-[1.7rem] text-[1.6rem] leading-10 text-center py-2 rounded-t-xl text-white">
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
              {...register("name", { required: true, maxLength: 20 })}
            />
          </div>
          {errors.name?.type === "required" ? (
            <span className="add-habit__error">Habit name is required.</span>
          ) : (
            errors.name?.type === "maxLength" && (
              <span className="add-habit__error">
                Habit name must be no longer than 20 characters
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
                habitsState.isEditingHabit ? currentHabit.color : "#2164a6"
              }
              className="add-habit__input"
              {...register("color")}
            />
          </div>

          <button
            className="submit-btn w-5/6 md:text-2xl text-xl flex justify-center mx-auto text-white shadow-lg leading-6 rounded-lg font-bold transition-opacity hover:opacity-80 mt-8 md:p-3 p-2"
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
