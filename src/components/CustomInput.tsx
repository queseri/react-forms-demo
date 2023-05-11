import React from "react";
import { useController } from "react-hook-form";

type FormValues = {
  name: string;
};

type CustomInputProps = {
  name: string;
  control: any;
  rules?: any;
  labelText: string;
  type: string;
};

const CustomInput = ({ name, control, rules, labelText , type}: CustomInputProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default CustomInput;
