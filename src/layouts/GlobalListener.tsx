"use client";

import type { CustomSession } from "@/interfaces";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalListener() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleOffline = () => {
      router.replace("/offline");
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  useEffect(() => {
    const handleOnline = () => {
      if (pathname && pathname.includes("/offline")) router.back();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [router, pathname]);

  useEffect(() => {
    if (session && !(session as CustomSession)?.user?.isVerified)
      router.replace("/locked");
  }, [session, router]);

  useEffect(() => {
    if (
      session &&
      (session as CustomSession)?.user?.isVerified &&
      pathname?.includes("/locked")
    )
      router.back();
  }, [session, pathname, router]);

  return null;
}
