"use client";

import PriorityImage from "@/components/common/PriorityImage";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import { BACKDROP, GUEST } from "@/components/images";
import useProfile from "@/modules/user/hooks/useProfile";
import Link from "next/link";

export default function ProfileViewer() {
  const { me } = useProfile();

  return (
    <div className="relative hidden w-full flex-col items-center overflow-hidden pb-2 lg:flex">
      <figure className="h-24 w-full overflow-hidden rounded-lg dark:brightness-50">
        <PriorityImage
          width={100}
          height={100}
          className="-ml-4 w-full scale-125"
          alt="backdrop"
          src={me?.backgroundImageUrl || BACKDROP}
        />
      </figure>
      <div className="absolute -right-1 bottom-[55px] z-10 rounded-xl py-2 pr-2">
        <ThemeToggleBtn />
      </div>
      <Link prefetch passHref href={`/profile`} className="z-10">
        <figure className="-mt-11 rounded-full border-2 border-white shadow-md dark:border-neutral-800">
          <PriorityImage
            height={80}
            width={80}
            className="lg:hover:scale-105 rounded-full"
            alt="profile"
            src={me?.imageUrl || GUEST}
          />
        </figure>
        <hgroup className="mt-1 flex items-center gap-2">
          <h2 className="flex-grow whitespace-nowrap text-lg font-medium lg:text-xl">
            {me?.username}
          </h2>
        </hgroup>
      </Link>
    </div>
  );
}
