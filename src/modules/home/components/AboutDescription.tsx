"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { memo } from "react";

export interface AboutDescriptionProps {
  title: string;
  description: string;
}

function AboutDescription({ title, description }: AboutDescriptionProps) {
  return (
    <>
      <motion.h2
        className={cn(
          "font-bold leading-relaxed lg:leading-snug",
          "text-2xl px-4 md:text-4xl lg:text-5xl max-w-4xl",
          "text-right text-pretty",
          "flex md:justify-end w-full antialiased capitalize",
          "bg-gradient-to-br from-blue-400 from-10% via-blue-500 via-70% to-blue-600 to-20% bg-clip-text text-transparent"
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
        {title}
      </motion.h2>
      <motion.p
        className={cn(
          "text-neutral-900 dark:text-neutral-300 cursor-default indent-8 capitalize",
          "md:text-right text-pretty text-sm md:text-base md:text-wrap"
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
    </>
  );
}

export default memo(AboutDescription);
