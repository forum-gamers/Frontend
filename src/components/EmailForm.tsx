"use client";

import { type ChangeEventHandler, memo } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export interface EmailFormProps {
  id: string;
  label: string;
  name: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  value: string;
  labelClass?: string;
  className?: string;
  required?: boolean;
}

function EmailForm({
  id,
  labelClass,
  label,
  onChangeHandler,
  value,
  name,
  className,
  required = false,
}: EmailFormProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        htmlFor={id}
        className={`block ${labelClass} ${
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        }`}
      >
        {label}
      </Label>
      <Input
        type="email"
        name={name}
        id={id}
        value={value}
        required={required}
        onChange={onChangeHandler}
        className={className}
        placeholder="name@example.com"
        pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
      />
    </div>
  );
}

export default memo(EmailForm);
