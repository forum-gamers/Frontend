import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import BackgroundImage from "./BackgroundImage";
import UsernameViewer from "./UsernameViewer";
import { memo } from "react";

function ProfileViewer() {
  return (
    <div className="relative hidden w-full flex-col items-center overflow-hidden pb-2 lg:flex">
      <BackgroundImage
        wrapperClass="h-24 w-full xl:w-[90%] overflow-hidden rounded-lg dark:brightness-50"
        imageClass="-ml-4 w-full scale-125"
        w={100}
        h={100}
      />
      <div className="absolute -right-1 xl:right-4 bottom-[55px] z-10 rounded-xl py-2 pr-2">
        <ThemeToggleBtn />
      </div>
      <Link prefetch passHref href={`/profile`} className="z-10">
        <ProfileImage
          h={80}
          w={80}
          imageClass="lg:hover:scale-105 rounded-full overflow-hidden object-center object-cover p-0"
          wrapperClass="-mt-11 rounded-full border-2 border-white shadow-md dark:border-neutral-800 flex justify-center items-center"
        />
        <hgroup className="mt-1 flex items-center gap-2 justify-center">
          <UsernameViewer className="whitespace-nowrap text-lg text-center font-medium lg:text-xl" />
        </hgroup>
      </Link>
    </div>
  );
}

export default memo(ProfileViewer);
