import { memo } from "react";

function LoaderSvg() {
  return (
    <svg
      className="absolute w-5 h-5 mr-3 -ml-1 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"
      ></path>
    </svg>
  );
}

export default memo(LoaderSvg);
