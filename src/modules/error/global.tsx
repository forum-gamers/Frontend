"use client";

import Container from "@/components/common/Container";
import Root from "@/layouts/Root";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConnectionError from "./connection";

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset, error }: GlobalErrorProps) {
  const CONNECTION_ERROR = ["connection", "econnrefused"];
  if (
    CONNECTION_ERROR.includes(error.name.toLowerCase()) ||
    CONNECTION_ERROR.includes(error.message.toLowerCase())
  )
    return <ConnectionError reset={reset} />;

  return (
    <Root>
      <Container
        as="section"
        className="flex items-center justify-center min-h-screen"
      >
        <hgroup className="w-full max-w-md p-6 text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-destructive" />
          <h1 className="text-3xl font-bold mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-xl mb-4">
            We apologize for the inconvenience. An unexpected error has
            occurred.
          </p>
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
        </hgroup>
      </Container>
    </Root>
  );
}
