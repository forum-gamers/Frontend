import PriorityImage from "@/components/common/PriorityImage";
import { LOGO_BLUE } from "@/components/images";
import NavbarSearch from "@/components/ui/NavbarSearch";
import { ChatBubbleLeftEllipsisIcon } from "@/components/icons/HeroIconsSolid";
import { searchHandler } from "@/action/search";
import { Suspense } from "react";
import ProfileImage from "@/modules/user/components/ProfileImage";

export default function Navbar() {
  const placeholders = [
    "Search for friends",
    "Search for a post",
    "Search for a team",
    "Search for a chat",
  ];

  return (
    <header className="fixed z-10 w-full bg-blue-300 dark:bg-blue-900 p-5 shadow-sm dark:border-b dark:border-neutral-800">
      <div className="w-full max-w-7xl mx-auto flex justify-between gap-4 items-center">
        <figure className="hidden md:block">
          <PriorityImage
            height={50}
            width={50}
            className="lg:hover:scale-105"
            alt="logo"
            src={LOGO_BLUE}
          />
        </figure>
        <ProfileImage
          wrapperClass="md:hidden rounded-full border-2 border-white shadow-md dark:border-neutral-800"
          imageClass="lg:hover:scale-105 rounded-full"
          h={50}
          w={50}
        />
        <Suspense>
          <NavbarSearch onAction={searchHandler} placeholders={placeholders} />
        </Suspense>
        <ChatBubbleLeftEllipsisIcon className="md:hidden h-12 w-12" />

        <ul className="hidden md:flex gap-8 w-full justify-around">
          <li>Home</li>
          <li>My network</li>
          <li>Notifications</li>
          <li>Me</li>
        </ul>
      </div>
    </header>
  );
}
