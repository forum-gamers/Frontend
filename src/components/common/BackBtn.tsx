"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftCircleIcon } from "../icons/HeroIconsOutline";
import { memo, useCallback } from "react";

export interface BackBtnProps {
  url?: string;
}

const BackButtonChildComponent = () => {
  return (
    <>
      <ArrowLeftCircleIcon data-testid="back-icon" />
      <span>Back</span>
    </>
  );
};

function BackBtn({ url }: BackBtnProps) {
  const router = useRouter();

  const handleOnClick = useCallback(
    () => (url ? router.push(url) : router.back()),
    [url, router]
  );

  return (
    <div className="w-fit">
      {url ? (
        <Link data-testid="back-button-url" href={url} passHref>
          <div className="flex gap-2 w-max hover:gap-3 items-center pb-5 transition-all duration-300 font-medium text-neutral-600 dark:text-neutral-400 cursor-pointer">
            <BackButtonChildComponent />
          </div>
        </Link>
      ) : (
        <div
          data-testid="back-button"
          className="flex gap-2 w-max hover:gap-3 items-center pb-5 transition-all duration-300 font-medium text-neutral-600 dark:text-neutral-400 cursor-pointer"
          onClick={handleOnClick}
        >
          <BackButtonChildComponent />
        </div>
      )}
    </div>
  );
}

export default memo(BackBtn);
