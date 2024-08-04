import type { HTMLAttributes } from "react";

export interface BreaklineProps extends HTMLAttributes<HTMLHRElement> {
  className?: string;
}

export default function Breakline({ className, ...rest }: BreaklineProps) {
  return (
    <hr
      className={`my-4 border-t border-gray-300 dark:border-neutral-700 ${className}`}
      data-testid="breakline"
      {...rest}
    />
  );
}
