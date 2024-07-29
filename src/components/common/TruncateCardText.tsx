"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export interface TruncateCardTextProps {
  text: string;
  className?: string;
}

export default function TruncateCardText({
  text,
  className,
}: TruncateCardTextProps) {
  const [truncate, setTruncate] = useState(false);

  useEffect(() => {
    if (text.length > 60) setTruncate(true);
  }, [text]);

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
