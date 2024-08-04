import Link from "next/link";
import { memo } from "react";
import { ChatBubbleLeftIcon } from "../../../components/icons/HeroIconsSolid";
import { motion } from "../../../components/common/FramerMotion";
import { Button } from "../../../components/ui/button";

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
    <Link prefetch href={`/comment/${postId}`}>
      <Button className={className} variant="ghost">
        <ChatBubbleLeftIcon className="h-6 w-6" />
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {countComment}
        </motion.span>
      </Button>
    </Link>
  );
}

export default memo(CommentButton);
