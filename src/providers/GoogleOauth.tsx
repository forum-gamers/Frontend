"use client";

import type { ChildrenProps } from "@/interfaces";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleOauth({ children }: ChildrenProps) {
  const clientId =
    "155500293076-0pv6kbhp2sg85fhfnrq8pjihsrtlqcnj.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
