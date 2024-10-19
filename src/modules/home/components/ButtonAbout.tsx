import { Button } from "@/components/ui/button";
import type { Lang } from "@/interfaces";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import { ChevronRightCircle } from "lucide-react";

export interface ButtonAboutProps {
  lang: Lang;
}

function ButtonAbout({ lang }: ButtonAboutProps) {
  return (
    <Link href={`/${lang}/about`} passHref prefetch className="w-full h-full">
      <Button
        className={cn(
          "text-white flex justify-center group/modal-btn",
          "mt-4 bg-blue-500 hover:bg-blue-600 hover:opacity-90 hover:scale-[98.5%] transition-all duration-500",
          "overflow-hidden hover:cursor-pointer !cursor-default"
        )}
      >
        <div
          className={cn(
            "flex justify-center items-center transition duration-500",
            "group-hover/modal-btn:cursor-pointer group-hover/modal-btn:translate-x-40"
          )}
        >
          <span className="text-center antialiased">Learn more</span>
          <ChevronRightCircle className="h-5 w-5 ml-2" />
        </div>
        <div
          className={cn(
            "-translate-x-40 opacity-0",
            "group-hover/modal-btn:opacity-100 group-hover/modal-btn:translate-x-0 group-hover/modal-btn:cursor-pointer",
            "flex items-center justify-center absolute inset-0",
            "transition duration-500 text-white z-20"
          )}
        >
          ✈️
        </div>
      </Button>
    </Link>
  );
}

export default memo(ButtonAbout);
