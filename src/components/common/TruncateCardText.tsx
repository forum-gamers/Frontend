"use client";

import { useCallback, useState, type MouseEventHandler } from "react";
import { Button } from "../ui/button";

export interface TruncateCardTextProps {
  text: string;
  className?: string;
  max?: number;
  as?: "p" | "blockquote";
  hideBtn?: boolean;
  onClick?: MouseEventHandler;
}

export default function TruncateCardText({
  text,
  className,
  max = 60,
  hideBtn = false,
  as: As = "p",
  onClick,
}: TruncateCardTextProps) {
  const [truncate, setTruncate] = useState(text.length > max);

  const seeMoreAction: MouseEventHandler = useCallback(
    (e) => {
      if (typeof onClick === "function") onClick(e);
      setTruncate(false);
    },
    [text, max, onClick]
  );

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
