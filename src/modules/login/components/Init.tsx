"use client";

import useUnauthenticatedOnly from "@/hooks/useUnauthenticatedOnly";

export default function Init() {
  useUnauthenticatedOnly();

  return null;
}
