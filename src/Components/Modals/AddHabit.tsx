import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getEmptyHabit, getRandomNumber } from "../../Helpers/functions";
import { actionCreactors, State } from "../../State";
import "../../Styles/addHabit.css";
import { HabitTypes, IHabit } from "../MainPage/Habit";
import InputBlock from "../UI/InputBlock";
import InputError from "../UI/InputError";
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
    setFocus,
    formState: { errors },
  } = useForm();

  const isSelectableType = currentHabit.habitType === HabitTypes.SELECTABLE;

  const [habitOptions, setHabitOptions] = useState<string[]>([
    habitsState.isEditingHabit && isSelectableType
      ? currentHabit.options![0]
      : "",
    habitsState.isEditingHabit && isSelectableType
      ? currentHabit.options![1]
      : "",
  ]);

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

    if (currentHabit.options) {
      setHabitOptions(currentHabit.options);
    }
  }, []);

  function chooseRightMonth() {
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
  }

  const onSubmit = () => {
    const habitName: string = getValues("name");
    const habitColor: string = getValues("color");
    const habitQuestion: string = getValues("question");
    const habitUnit: string = getValues("unit");
    const habitOptionsName: string[] =
      habitOptions &&
      habitOptions
        .map((option, index) => getValues(`option${index + 1}`))
        .filter((option) => option !== "");

    chooseRightMonth();

    habitsState.isAddingHabit
      ? addingHabit(
          getEmptyHabit(
            habitName,
            habitColor,
            [],
            getRandomNumber(),
            habitQuestion,
            habitsState.currentAddingType,
            habitUnit,
            habitOptionsName
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
            habitUnit,
            habitOptionsName
          )
        );

    setIsAddingHabit(false);
    setIsEditingHabit(false);
  };

  const addNewOption = () => {
    setHabitOptions((prevHabitOptions) => {
      return [...prevHabitOptions, ""];
    });
  };

  function showHabitOptions(
    habitOptions: string[],
    errors: { [x: string]: any }
  ) {
    return habitOptions.map((habitOption, index) => {
      return (
        <div key={`add-habit__option-${getRandomNumber()}`}>
          <InputBlock
            labelName={`Option ${index + 1}:`}
            placeholder="E.g. Running"
            defaultValue={
              habitsState.isEditingHabit ? currentHabit.options![index] : ""
            }
            inputClassName="w-[65%]"
            inputId={`add-habit__option-${index + 1}`}
            register={register}
            registerName={`option${index + 1}`}
            required={index === 0}
            maxLength={20}
          />
          {index === 0 && (
            <InputError
              errorType={errors.option1?.type}
              maxLength={20}
              labelName="Option"
            />
          )}
        </div>
      );
    });
  }

  return (
    <div className="absolute z-40 h-full w-full top-0 bg-opacity-60 bg-black flex justify-center items-center">
      <div className="add-habit" ref={ref}>
        <h2 className="add-habit-label lg:text-[1.7rem] text-[1.6rem] leading-10 text-center py-2 rounded-t-xl text-white">
          {habitsState.isEditingHabit
            ? "Editing a habit"
            : "Adding a new habit"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBlock
            placeholder="E.g. Workout"
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
            placeholder={
              currentHabit.habitType === HabitTypes.YES_OR_NO
                ? "E.g. Did I work out today?"
                : currentHabit.habitType === HabitTypes.MEASURABLE
                ? "E.g. How long did I work out?"
                : "E.g. What kind of workout did I do?"
            }
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
          {habitsState.currentAddingType === HabitTypes.SELECTABLE && (
            <div>
              {showHabitOptions(habitOptions, errors)}
              {habitOptions.length < 5 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={addNewOption}
                    className="add-option-btn inline-block mt-1 cursor-pointer text-2xl p-2 bg-[#101010] transition-opacity text-white hover:opacity-90 rounded-full"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              )}
            </div>
          )}

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
