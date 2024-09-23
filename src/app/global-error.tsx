"use client";

import GlobalError from "@/modules/error/global";

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ reset, error }: GlobalErrorProps) {
  return <GlobalError reset={reset} error={error} />;
}
