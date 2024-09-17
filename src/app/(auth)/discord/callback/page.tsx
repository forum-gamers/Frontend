"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { discordCallback } from "../action";
import { swalError } from "@/lib/swal";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page() {
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countDown, setCountDown] = useState<number>(10);
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (!searchParams) return router.replace("/");
    const code = searchParams?.get("code") as string;
    if (!code) return router.replace("/");

    startTransition(async () => {
      const { data, error } = await discordCallback(code);
      if (error && !data) {
        swalError(error || "unexpected error");
        return;
      }

      await signIn("credentials", { access_token: data, redirect: false });
      router.replace("/");
    });
  }, [searchParams, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowBtn(true);
          router.replace("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Redirecting in...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            {countDown > 0
              ? `You will be redirected to the dashboard in ${countDown} seconds.`
              : "Redirecting you to the dashboard..."}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${Math.max((countDown / 10) * 100, 0)}%` }}
            ></div>
          </div>
        </CardContent>
        {showBtn && (
          <CardFooter className="flex justify-center">
            <Button
              disabled={pending}
              className={cn(pending && "cursor-wait")}
              onClick={() => router.replace("/")}
            >
              Click here to redirect manually
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
