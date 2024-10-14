"use client";

import { memo, type MouseEventHandler } from "react";
import { SearchIcon } from "lucide-react";

export interface NoDataProps {
  wrapperClass?: string;
  title?: string;
  description?: string;
  onClick: MouseEventHandler;
}

function NoData({ wrapperClass, title, description, onClick }: NoDataProps) {
  return (
    <div className={wrapperClass}>
      <div className="flex flex-col w-full max-w-sm px-4 mx-auto">
        <SearchIcon className="w-12 h-12 mx-auto" />
        <hgroup className="flex flex-col mx-auto text-center">
          {!!title && (
            <h2 className="mt-3 text-lg text-gray-800 dark:text-white">
              {title}
            </h2>
          )}
          {!!description && (
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </hgroup>
        <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
          <button
            type="button"
            onClick={onClick}
            className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-red-500 hover:bg-red-700 border rounded-lg sm:w-auto dark:text-gray-200 dark:border-gray-700"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(NoData);
