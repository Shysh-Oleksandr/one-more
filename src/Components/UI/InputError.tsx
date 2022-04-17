import React from "react";

type Props = {
  labelName: string;
  errorType: any;
};

const InputError = ({ labelName, errorType }: Props) => {
  return (
    <div>
      {errorType === "required" ? (
        <span className="add-habit__error">{labelName} name is required.</span>
      ) : (
        errorType === "maxLength" && (
          <span className="add-habit__error">
            {labelName} name cannot be longer than 20 characters.
          </span>
        )
      )}
    </div>
  );
};

export default InputError;
