"use client"
import { Eye, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const Input = ({
  className,
  classNameInput,
  iconClassName,
  onChange,
  onKeyDown,
  type,
  name,
  icon,
  value,
  disabled,
  width,
  id,
  placeholder,
  min,
  required,
  max,
  title,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <div>
        <p className="mb-0.5 ">{title}</p>
        <p className={`relative ` + width}>
          {/* {type == "password" && (
            <span
              onClick={() => setOpen(!open)}
              className="absolute top-1.5 text-[gray] right-2.5"
            >
              {open ? (
                <EyeOffIcon className="inline-block cursor-pointer" />
              ) : (
                <Eye className="inline-block cursor-pointer" />
              )}
            </span>
          )} */}
          {icon && (
            <span className={`${iconClassName}`}>
              {icon}
            </span>
          )}
        </p>
        <div className="max-sm:flex gap-1 items-center">
          <input
            value={value}
            disabled={disabled}
            type={
              type == "password" ? (open ? "text" : "password") : type || "text"
            }
            id={id}
            className={
              "h-full min-w-[80px]  p-2 border  " +
              classNameInput
            }
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoComplete={"new-password"}
            aria-autocomplete="none"
            data-lpignore="true"
            autoCorrect="off"
            spellCheck="false"
            required={required}
            max={max}
            min={min}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
