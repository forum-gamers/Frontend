"use client";

import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import LoaderSvg from "../svg/Loader";
import { cn } from "@/lib/utils";

export interface SubmitBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export default function SubmitBtn({
  text,
  className,
  disabled,
  ...rest
}: SubmitBtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      disabled={pending || disabled}
      aria-disabled={pending}
      className={cn(
        "rounded-md",
        pending && "cursor-wait",
        disabled && "cursor-not-allowed opacity-40",
        className,
        "flex justify-center items-center"
      )}
    >
      {pending ? <LoaderSvg /> : text}
    </button>
  );
}
