"use client";

import type { ChildrenProps } from "@/interfaces";
import Aos from "aos";
import { useEffect } from "react";

export default function InitPage({ children }: ChildrenProps) {
  useEffect(() => {
    Aos.init({
      duration: 800,
      delay: 50,
    });
  }, []);
  return children;
}
