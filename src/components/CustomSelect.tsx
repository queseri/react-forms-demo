import React from "react";
import { useController, Control } from "react-hook-form";

type FormValues = {
  name: string;
  paymentTerms: string;
};

type CustomSelectProps = {
  name: string;
  control: any;
  rules?: any;
  options: { value: number; label: string }[];
 
};

const CustomSelect = ({ name, control, rules, options }: CustomSelectProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div>
      <label htmlFor={name}>Payment Terms</label>
      <select
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default CustomSelect;