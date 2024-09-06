"use client";

import { ArrowLeftStartOnRectangleIcon } from "@/components/icons/HeroIconsSolid";
import useProfile from "@/modules/user/hooks/useProfile";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo, useCallback, type MouseEventHandler } from "react";

function LogoutBtn() {
  const { resetUser } = useProfile();
  const router = useRouter();
  const logout: MouseEventHandler = useCallback(
    async (e) => {
      await signOut();
      router.replace("/login");
      resetUser();
    },
    [router, signOut]
  );

  return (
    <button id="logout-btn" onClick={logout} className="cursor-pointer">
      <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
    </button>
  );
}

export default memo(LogoutBtn);
