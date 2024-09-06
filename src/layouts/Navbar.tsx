import { LOGO_BLUE } from "@/components/images";
import NavbarSearch from "@/components/ui/NavbarSearch";
import { searchHandler } from "@/action/search";
import { memo, Suspense } from "react";
import ProfileImage from "@/modules/user/components/ProfileImage";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import LazyLoadImg from "@/components/common/LazyLoadImage";
import Link from "next/link";
import LogoutBtn from "@/components/common/LogoutBtn";

function Navbar() {
  const placeholders = [
    "Search for friends",
    "Search for a post",
    "Search for a team",
    "Search for a chat",
  ];

  return (
    <header className="fixed z-10 w-full bg-light-theme-100 bg-gradient-to-tr dark:bg-gradient-to-tr from-light-theme-100 to-light-theme-200 dark:bg-dark-theme-300 dark:from-dark-theme-300 dark:to-dark-theme-500 p-5 shadow-sm dark:border-b dark:border-neutral-800">
      <div className="w-full max-w-7xl mx-auto flex justify-between gap-4 items-center">
        <div className="hidden lg:block">
          <LazyLoadImg
            height={50}
            width={50}
            className="lg:hover:scale-105 cursor-pointer transition-all duration-100 hover:animate-pulse"
            alt="logo"
            src={LOGO_BLUE}
          />
        </div>
        <Link href="/profile" prefetch passHref>
          <ProfileImage
            wrapperClass="lg:hidden rounded-full border-2 cursor-pointer border-white shadow-md dark:border-neutral-800 flex justify-center items-center"
            imageClass="lg:hover:scale-105 rounded-full"
            h={50}
            w={50}
          />
        </Link>
        <Suspense>
          <NavbarSearch onAction={searchHandler} placeholders={placeholders} />
        </Suspense>
        <div className="block lg:hidden">
          <Suspense>
            <ThemeToggleBtn />
          </Suspense>
        </div>
        <LogoutBtn />
      </div>
    </header>
  );
}

export default memo(Navbar);
