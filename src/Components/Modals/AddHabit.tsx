import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreactors, State } from "../../State";
import { HabitTypes, IHabit } from "../MainPage/Habit";
import "../../Styles/addHabit.css";
import { getEmptyHabit, getRandomNumber } from "../../Helpers/functions";
import { closeModal } from "./../../Helpers/functions";
import InputBlock from "../UI/InputBlock";
import InputError from "../UI/InputError";

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
    setFocus,
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

  useEffect(() => {
    setFocus("name");
  }, []);

  const onSubmit = () => {
    let habitName = getValues("name");
    let habitColor = getValues("color");
    let habitQuestion = getValues("question");
    let habitUnit = getValues("unit");

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
            getRandomNumber(),
            habitQuestion,
            habitsState.currentAddingType,
            habitUnit
          )
        )
      : editingHabit(
          getEmptyHabit(
            habitName,
            habitColor,
            currentHabit.markedDays,
            currentHabit.id,
            habitQuestion,
            habitsState.currentAddingType,
            habitUnit
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
          <InputBlock
            placeholder="E.g. Work out"
            labelName="Name:"
            defaultValue={habitsState.isEditingHabit ? currentHabit.name : ""}
            inputClassName="w-[65%]"
            inputId="add-habit__name"
            register={register}
            registerName="name"
            required={true}
            maxLength={20}
          />
          <InputError
            errorType={errors.name?.type}
            labelName="Habit"
            maxLength={20}
          />
          <InputBlock
            labelName="Question:"
            placeholder="E.g. Did I work out today?"
            defaultValue={
              habitsState.isEditingHabit ? currentHabit.question! : ""
            }
            inputClassName="w-[65%]"
            inputId="add-habit__question"
            register={register}
            registerName="question"
            required={false}
          />
          {habitsState.currentAddingType === HabitTypes.MEASURABLE && (
            <>
              <InputBlock
                labelName="Unit:"
                placeholder="E.g. min"
                defaultValue={
                  habitsState.isEditingHabit ? currentHabit.unit! : ""
                }
                inputClassName="w-[65%]"
                inputId="add-habit__unit"
                register={register}
                registerName="unit"
                required={true}
                maxLength={8}
              />
              <InputError
                errorType={errors.unit?.type}
                maxLength={8}
                labelName="Unit"
              />
            </>
          )}
          <InputBlock
            labelName="Color:"
            defaultValue={
              habitsState.isEditingHabit ? currentHabit.color : "#2164a6"
            }
            inputId="add-habit__color"
            register={register}
            registerName="color"
            required={false}
            inputType="color"
          />

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
