"use client";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { WifiOff, RefreshCw } from "lucide-react";

export interface ConnectionErrorProps {
  reset: () => void;
}

export default function ConnectionError({
  reset,
}: Partial<ConnectionErrorProps>) {
  return (
    <Container className="flex items-center justify-center">
      <Card className="w-full max-w-md bg-white dark:bg-[#202225]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Connection Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <WifiOff className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg mb-4">
            Oops! It looks like we&apos;re having trouble connecting to the
            server.
          </p>
          <p className="text-muted-foreground">
            Please check your internet connection and try again.
          </p>
        </CardContent>
        {reset && typeof `reset` === "function" && (
          <CardFooter className="flex justify-center">
            <Button onClick={() => reset()} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Connection
            </Button>
          </CardFooter>
        )}
      </Card>
    </Container>
  );
}
