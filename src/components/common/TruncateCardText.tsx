"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function TruncateCardText({ text }: { text: string }) {
  const [truncate, setTruncate] = useState(false);

  useEffect(() => {
    if (text.length > 60) setTruncate(true);
  }, [text]);

  const seeMoreAction = () => setTruncate(false);
  return (
    <>
      <p className={`${truncate ? "truncate" : ""} text-xs`}>{text}</p>
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
