import PriorityImage from "@/components/common/PriorityImage";
import { LOGO_BLUE } from "@/components/images";
import NavbarSearch from "@/components/ui/NavbarSearch";
import { searchHandler } from "@/action/search";
import { memo, Suspense } from "react";
import ProfileImage from "@/modules/user/components/ProfileImage";

function Navbar() {
  const placeholders = [
    "Search for friends",
    "Search for a post",
    "Search for a team",
    "Search for a chat",
  ];

  return (
    <header className="fixed z-10 w-full bg-blue-300 dark:bg-blue-900 p-5 shadow-sm dark:border-b dark:border-neutral-800">
      <div className="w-full max-w-7xl mx-auto flex justify-between gap-4 items-center">
        <div className="hidden lg:block">
          <PriorityImage
            height={50}
            width={50}
            className="lg:hover:scale-105"
            alt="logo"
            src={LOGO_BLUE}
          />
        </div>
        <ProfileImage
          wrapperClass="lg:hidden rounded-full border-2 border-white shadow-md dark:border-neutral-800"
          imageClass="lg:hover:scale-105 rounded-full"
          h={50}
          w={50}
        />
        <Suspense>
          <NavbarSearch onAction={searchHandler} placeholders={placeholders} />
        </Suspense>
        {/* <ChatBubbleLeftEllipsisIcon className="md:hidden h-12 w-12" /> */}
      </div>
    </header>
  );
}

export default memo(Navbar);
