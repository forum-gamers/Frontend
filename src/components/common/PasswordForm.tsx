"use client";

import { memo, useState, type ChangeEventHandler } from "react";
import { Label } from "../ui/label";
import PasswordToggleBtn from "./PasswordToogleBtn";
import AnimateInput from "./AnimateInput";

export interface PasswordInputProps {
  required?: boolean;
  label: string;
  id: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: string;
  title?: string;
  pattern: string;
  className?: string;
  placeHolder?: string;
  labelClass?: string;
}

function PasswordInput({
  required = false,
  id,
  label,
  onChangeHandler,
  name,
  value,
  pattern,
  title,
  className,
  placeHolder = "password",
  labelClass = "",
}: PasswordInputProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const visibleChange = () => setVisible(!visible);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        htmlFor={id}
        className={`block ${
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        } ${labelClass}`}
      >
        {label}
      </Label>
      <div className="relative">
        <AnimateInput
          pattern={pattern}
          title={title}
          id={id}
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChangeHandler}
          required={required}
          placeholder={placeHolder}
          className={className}
          autoComplete="new-password"
        />
        <PasswordToggleBtn onClick={visibleChange} open={visible} />
      </div>
    </div>
  );
}

export default memo(PasswordInput);
