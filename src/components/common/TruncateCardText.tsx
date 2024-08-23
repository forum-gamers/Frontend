"use client";

import { useCallback, useState } from "react";
import { Button } from "../ui/button";

export interface TruncateCardTextProps {
  text: string;
  className?: string;
  max?: number;
  as?: "p" | "blockquote";
  hideBtn?: boolean;
}

export default function TruncateCardText({
  text,
  className,
  max = 60,
  hideBtn = false,
  as: As = "p",
}: TruncateCardTextProps) {
  const [truncate, setTruncate] = useState(text.length > max);

  const seeMoreAction = useCallback(() => setTruncate(false), [text, max]);

  return (
    <>
      <As
        className={`${truncate ? "truncate" : ""} text-xs ${
          !!className && className
        }`}
      >
        {text}
      </As>
      {truncate && !hideBtn && (
        <Button
          variant="ghost"
          className="text-black p-0 h-4 dark:text-slate-100"
          onClick={seeMoreAction}
        >
          See more...
        </Button>
      )}
    </>
  );
}
