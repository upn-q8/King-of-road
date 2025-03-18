import React, { ChangeEvent } from "react";

const Select = ({
  className,
  onChange,
  text,
  value,
  options,
  required,
  name,
  placeholder,
}) => {
  return (
    <div className="relative">
      <p className="mb-1">{text}</p>
      <select
        value={value}
        onChange={onChange}
        className={"h-full p-2 " + className}
        required={required}
        name={name}
      >
        <option className="text-gray-300" hidden>
          {value ?? placeholder ?? "Choose"}
        </option>
        {options?.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
