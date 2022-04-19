import React from "react";

type Props = {
  labelName: string;
  errorType: any;
  maxLength?: number;
};

const InputError = ({ labelName, errorType, maxLength }: Props) => {
  return (
    <div>
      {errorType === "required" ? (
        <span className="add-habit__error">{labelName} name is required.</span>
      ) : (
        errorType === "maxLength" && (
          <span className="add-habit__error">
            {labelName} name cannot be longer than {maxLength} characters.
          </span>
        )
      )}
    </div>
  );
};

export default InputError;
