"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useState,
  type InputHTMLAttributes,
} from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "./input";

const AnimatedInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...rest }, ref) => {
  const radius = 100;
  const [visible, setVisible] = useState<boolean>(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: any) => {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  const triggers = useMemo(
    () => ({
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      onMouseMove: handleMouseMove,
    }),
    [handleMouseMove]
  );

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
      }}
      {...triggers}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <Input
        {...rest}
        type={type}
        className={cn(
          "file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600",
          "focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]",
          "group-hover/input:shadow-none transition duration-400",
          "flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent",
          className
        )}
        ref={ref}
      />
    </motion.div>
  );
});

AnimatedInput.displayName = "AnimatedInput";

export default memo(AnimatedInput);
