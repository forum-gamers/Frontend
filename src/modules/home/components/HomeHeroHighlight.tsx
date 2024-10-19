"use client";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ChildrenProps } from "@/interfaces";

export interface HomeHeroHighlightProps extends ChildrenProps {
  text: string;
  highlightText: string;
  description: string;
  btnElement: ReactNode;
}

function HomeHeroHighlight({
  children,
  text,
  highlightText,
  description,
  btnElement,
}: HomeHeroHighlightProps) {
  return (
    <HeroHighlight
      data-testid="hero-section"
      id="gamer-hub-hero-section"
      as="section"
      className="w-full grid grid-cols-1 md:grid-cols-10 md:h-[65svh] p-2 mx-2"
      containerClassName="h-[25rem]"
    >
      <hgroup className="gap-6 md:col-span-4 mt-12 space-y-6">
        <motion.h1
          className={cn(
            "font-bold text-neutral-900 dark:text-neutral-300 leading-relaxed lg:leading-snug",
            "text-2xl px-4 md:text-4xl lg:text-5xl max-w-4xl",
            "text-left mx-auto text-pretty indent-2"
          )}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          {text}
          <br />
          <Highlight
            className={cn(
              "capitalize transition-transform duration-700",
              "text-center text-balance mt-1 underline underline-offset-4",
              "cursor-default"
            )}
          >
            {highlightText}
          </Highlight>
        </motion.h1>
        <motion.p
          className={cn(
            "text-neutral-900 dark:text-neutral-300 cursor-default indent-8 capitalize",
            "text-left text-pretty text-sm md:text-base"
          )}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          {description}
        </motion.p>
        {btnElement}
      </hgroup>
      <div className="md:col-span-6 pt-0">{children}</div>
    </HeroHighlight>
  );
}

export default memo(HomeHeroHighlight);
