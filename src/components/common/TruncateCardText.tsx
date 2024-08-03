"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export interface TruncateCardTextProps {
  text: string;
  className?: string;
  max?: number;
}

export default function TruncateCardText({
  text,
  className,
  max = 60,
}: TruncateCardTextProps) {
  const [truncate, setTruncate] = useState(text.length > max);

  const seeMoreAction = () => setTruncate(false);

  return (
    <>
      <p
        className={`${truncate ? "truncate" : ""} text-xs ${
          !!className && className
        }`}
      >
        {text}
      </p>
      {truncate && (
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
