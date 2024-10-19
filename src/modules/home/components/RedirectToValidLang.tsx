"use client";

import { LANGS } from "@/constants/global";
import useInIndonesia from "@/hooks/useInIndonesia";
import type { Lang } from "@/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectValidLang() {
  const params = useParams<Record<string, Lang>>();
  const { replace } = useRouter();
  const [pending, isIn] = useInIndonesia();

  useEffect(() => {
    if (!params || pending) return;

    if (!params.lang || !((params.lang as Lang) in LANGS))
      isIn ? replace("/id") : replace("/en");
  }, [params, replace, pending]);

  return null;
}
