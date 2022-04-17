import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  labelName: string;
  defaultValue: string;
  inputClassName?: string;
  inputId: string;
  registerName: string;
  required: boolean;
  maxLength?: number;
  inputType?: string;
};

const InputBlock = ({
  placeholder,
  labelName,
  defaultValue,
  inputClassName,
  inputId,
  register,
  registerName,
  required,
  maxLength,
  inputType,
}: Props) => {
  return (
    <div className="add-habit__block">
      <label className="add-habit__label" htmlFor={inputId}>
        {labelName}
      </label>
      <input
        id={inputId}
        placeholder={placeholder}
        type={inputType}
        defaultValue={defaultValue}
        className={`add-habit__input ${inputClassName}`}
        {...register(registerName, {
          required: required,
          maxLength: maxLength,
        })}
      />
    </div>
  );
};

export default InputBlock;
