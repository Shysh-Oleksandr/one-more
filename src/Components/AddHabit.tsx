import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { actionCreactors, State } from "../State";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

type Props = {};

function AddHabit({}: Props) {
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

    addingHabit({ name: habitName, color: habitColor });

    setIsAddingHabit(false);
  };

  return (
    <div className="add-habit__wrapper">
      <div className="add-habit" ref={ref}>
        <h2 className="add-habit__title">
          {habitsState.isEditingHabit
            ? "Editing the habit"
            : "Adding a new habit"}
        </h2>
        <form className="add-habit__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="add-habit__block">
            <label className="add-habit__label" htmlFor="add-habit__name">
              Name:
            </label>
            <input
              id="add-habit__name"
              placeholder="Work out"
              type="text"
              className="add-habit__input"
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
              Color
            </label>
            <input
              id="add-habit__color"
              type="color"
              className="add-habit__input"
              {...register("color")}
            />
          </div>

          <button className="add-habit__btn" type="submit">
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
