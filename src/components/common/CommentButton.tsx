import Link from "next/link";
import { memo } from "react";
import { ChatBubbleLeftIcon } from "../icons/HeroIconsSolid";
import { motion } from "./FramerMotion";
import { Button } from "../ui/button";

export interface CommentButtonProps {
  postId: number;
  countComment: number;
  className?: string;
}

function CommentButton({
  postId,
  countComment,
  className,
}: CommentButtonProps) {
  return (
    <Button className={className} variant="ghost">
      <ChatBubbleLeftIcon className="h-6 w-6" />
      <Link prefetch href={`/comment/${postId}`}>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {countComment}
        </motion.span>
      </Link>
    </Button>
  );
}

export default memo(CommentButton);
