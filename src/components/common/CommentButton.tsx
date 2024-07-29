import Link from "next/link";
import { memo } from "react";
import { ChatBubbleLeftIcon } from "../icons/HeroIconsSolid";
import { motion } from "./FramerMotion";

export interface CommentButtonProps {
  postId: number;
}

function CommentButton({ postId }: CommentButtonProps) {
  return (
    <Link
      prefetch
      href={`/comment/${postId}`}
      className="hover:bg-slate-200 gap-1 inline-block"
    >
      <ChatBubbleLeftIcon className="h-6 w-6" />
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Comment
      </motion.span>
    </Link>
  );
}

export default memo(CommentButton);
