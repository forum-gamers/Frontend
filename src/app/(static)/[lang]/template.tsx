"use client";

import { LANGS } from "@/constants/global";
import useInIndonesia from "@/hooks/useInIndonesia";
import type { ChildrenProps, Lang } from "@/interfaces";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: ChildrenProps) {
  const router = useRouter();
  const [pending, isInIndonesia] = useInIndonesia();
  const pathname = usePathname() as string;
  const params = useParams() as Record<string, string>;

  useEffect(() => {
    if (LANGS.includes(params?.lang as Lang) || pending) return;

    const splitted = pathname.split("/");
    splitted[1] = isInIndonesia ? "id" : "en";

    router.replace(splitted.join("/"));
  }, [params, router, pathname, pending]);

  return children;
}
