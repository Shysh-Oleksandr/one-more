import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { actionCreactors, State } from "../../State";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import { closeModal } from "./../../Helpers/functions";
import { habitTypes } from "../../Data/data";

function HabitTypeModal() {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const dispatch = useDispatch();
  const { setIsHabitTypeModalOpened, setIsAddingHabit } = bindActionCreators(
    actionCreactors,
    dispatch
  );
  const habitsState = useSelector((state: State) => state.habits);

  useEffect(() => {
    return closeModal(ref, habitsState.isTypeModalOpened, () => {
      setIsHabitTypeModalOpened(false);
    });
  }, [habitsState.isTypeModalOpened]);

  return (
    <div className="absolute z-20 h-full w-full top-0 bg-opacity-60 bg-black flex justify-center items-center">
      <div
        ref={ref}
        className="flex flex-col justify-center items-center overflow-y-auto max-h-[95vh]"
      >
        {habitTypes.map((habitType) => {
          return (
            <div
              key={habitType.habitTypeName}
              onClick={() => {
                setIsAddingHabit(true, habitType.habitTypeName);
                setIsHabitTypeModalOpened(false);
              }}
              className="habit-type md:px-8 px-6 md:pt-8 pt-2 text-left cursor-pointer add-habit w-[85%] !my-3 md:!pb-8 !pb-4 transition-colors"
            >
              <h3 className="font-bold md:mb-3 mb-1 md:text-3xl sm:text-2xl text-xl">
                {habitType.habitTypeName}
              </h3>
              <p className="md:text-xl sm:text-lg text-base">
                {habitType.habitTypeDescription}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitTypeModal;
