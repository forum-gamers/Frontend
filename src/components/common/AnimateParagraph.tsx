import { memo } from "react";
import { motion } from "./FramerMotion";

export interface AnimateParagraphProps {
  paragraph: string;
  className?: string;
}

function AnimateParagraph({ paragraph, className }: AnimateParagraphProps) {
  return (
    <motion.p
      initial={{
        y: 5,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: -15,
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
        ease: "linear",
      }}
      className={className}
    >
      {paragraph}
    </motion.p>
  );
}

export default memo(AnimateParagraph);
