"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { memo } from "react";
import Link from "next/link";

function SignInBtn() {
  const { data: session, status } = useSession();

  if (status !== "loading" || session) return null;

  return (
    <Link href="/login" passHref prefetch>
      <Button variant="outline" type="button">
        Sign in
      </Button>
    </Link>
  );
}

export default memo(SignInBtn);
