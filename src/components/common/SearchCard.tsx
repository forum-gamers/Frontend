"use client";

import { memo, type MouseEventHandler } from "react";
import { motion } from "./FramerMotion";
import type { SearchResultDto } from "@/interfaces/response";
import LazyLoadImg from "./LazyLoadImage";

export interface SearchCardProps {
  onClickHandler: MouseEventHandler;
  data: SearchResultDto;
  className?: string;
}

function SearchCard({ onClickHandler, data, className }: SearchCardProps) {
  return (
    <motion.button
      onClick={onClickHandler}
      layoutId={`card-${data.rank}-${data.id}`}
      className={className}
    >
      <div className="flex gap-4 flex-col md:flex-row">
        <motion.div layoutId={`image-${data.rank}-${data.id}`}>
          {!!data.imageUrl && (
            <LazyLoadImg
              width={100}
              height={100}
              src={data.imageUrl}
              alt={data.source}
              className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
            />
          )}
        </motion.div>
        <hgroup className="text-center md:text-left">
          <motion.h3
            layoutId={`title-${data.source}-${data.id}`}
            className="font-medium text-neutral-800 dark:text-neutral-200"
          >
            {data.source}
          </motion.h3>
          <motion.p
            layoutId={`description-${data.text}-${data.id}`}
            className="text-neutral-600 dark:text-neutral-400"
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
        </hgroup>
      </div>
    </motion.button>
  );
}

export default memo(SearchCard);
