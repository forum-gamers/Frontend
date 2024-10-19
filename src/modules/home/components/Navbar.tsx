import PriorityImage from "@/components/common/PriorityImage";
import SignInBtn from "@/components/common/SignInBtn";
import ThemeToggleBtn from "@/components/common/ThemeToggleBtn";
import { LOGO_BLUE } from "@/components/images";
import type { ChildrenProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo, type ReactNode } from "react";

export interface NavbarProps extends ChildrenProps {
  btnComponent: ReactNode;
  links: { name: string; href: string }[];
}

function Navbar({ btnComponent, children, links }: NavbarProps) {
  return (
    <>
      <header
        id="gamer-hub-navbar"
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 top-8 sticky z-50",
          "bg-blue-500",
          "shadow-md hover:shadow-xl hover:scale-[100.5%] duration-500 transition-all rounded-md hover:rounded-lg"
        )}
        data-testid="navbar"
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <figure className="flex-shrink-0">
              <PriorityImage
                height={50}
                width={50}
                className="lg:hover:scale-105 cursor-pointer transition-all duration-100 hover:animate-pulse bg-white rounded-full dark:bg-gray-900"
                alt="logo"
                src={LOGO_BLUE}
              />
            </figure>
            <div className="hidden md:block">
              <nav className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-primary-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="md:flex justify-between">
            <ThemeToggleBtn />
            <SignInBtn />
          </div>
          {btnComponent}
        </div>
        {children}
      </header>
    </>
  );
}

export default memo(Navbar);
