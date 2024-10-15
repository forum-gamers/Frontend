import { LOGO_BLUE } from "@/components/images";
import NavbarSearch from "@/components/ui/NavbarSearch";
import { searchHandler } from "@/action/search";
import { memo, Suspense } from "react";
import ProfileImage from "@/modules/user/components/ProfileImage";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import LazyLoadImg from "@/components/common/LazyLoadImage";
import Link from "next/link";
import LogoutBtn from "@/components/common/LogoutBtn";
import { cn } from "@/lib/utils";

function Navbar() {
  const placeholders = [
    "Search for friends",
    "Search for a post",
    "Search for a team",
    "Search for a chat",
  ];

  return (
    <header
      className={cn(
        "fixed z-10 w-full rounded-t-2xl rounded-b-sm",
        "p-5 shadow-sm dark:border-b dark:border-neutral-800 ",
        "bg-blue-500",
        "hover:shadow-xl hover:scale-[100.5%] duration-500 transition-all"
      )}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between gap-4 items-center">
        <div className="hidden lg:block lg:rounded-full lg:bg-slate-50 lg:dark:bg-[#202225]">
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
            wrapperClass="lg:hidden !rounded-full border-2 cursor-pointer border-white shadow-md dark:border-neutral-800 shadow-md"
            imageClass="lg:hover:scale-105 rounded-full mx-auto object-cover object-center !w-full !h-full"
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
