"use client";

import PasswordEye, { type PasswordEyeProps } from "../svg/PasswordEye";

export interface PasswordToggleBtnProps extends PasswordEyeProps {
  onClick: () => void;
}

export default function PasswordToggleBtn({
  onClick,
  h,
  w,
  open,
}: PasswordToggleBtnProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      data-hs-toggle-password='{
            "target": "#hs-toggle-password"
          }'
      className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
    >
      <PasswordEye h={h} w={w} open={open} />
    </button>
  );
}
