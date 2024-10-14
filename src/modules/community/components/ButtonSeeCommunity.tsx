"use client";

import { memo, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ButtonSeeCommunityProps {
  id: number;
}

function ButtonSeeCommunity({ id }: ButtonSeeCommunityProps) {
  const [hover, setHover] = useState<boolean>(false);

  const trigger = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return (
    <Button
      {...trigger}
      asChild
      className={cn(
        "bg-blue-500 hover:bg-blue-600",
        "transition-all duration-300 hover:opacity-75 hover:scale-[98.5%]",
        "text-neutral-900 dark:text-neutral-300",
        "w-full"
      )}
    >
      <Link prefetch href={`/community/${id}`}>
        <span className={cn(hover && "opacity-75 scale-[102%]")}>
          See Community
        </span>
        <ArrowRight
          size={16}
          className={cn(
            hover && "translate-x-6 transition-transform duration-300",
            "ml-2"
          )}
        />
      </Link>
    </Button>
  );
}

export default memo(ButtonSeeCommunity);
