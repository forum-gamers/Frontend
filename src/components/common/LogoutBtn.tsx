"use client";

import { ArrowDownLeftFromSquareIcon } from "lucide-react";
import useProfile from "@/modules/user/hooks/useProfile";
import { googleLogout } from "@react-oauth/google";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo, useCallback, type MouseEventHandler } from "react";
import useBookmark from "@/modules/bookmark/hooks/useBookmark";
import useComment from "@/modules/comment/hooks/useComment";
import usePost from "@/modules/feed/hooks/usePost";

function LogoutBtn() {
  const { resetUser } = useProfile();
  const router = useRouter();
  const { resetDatas: resetPost } = usePost();
  const { resetData: resetComment } = useComment();
  const { resetDatas: resetBookmark } = useBookmark();

  const logout: MouseEventHandler = useCallback(
    async (e) => {
      await signOut();
      googleLogout();
      router.replace("/login");
      [resetBookmark, resetComment, resetPost, resetUser].forEach((fn) => fn());
    },
    [router, signOut]
  );

  return (
    <button
      id="logout-btn"
      onClick={logout}
      className="cursor-pointer hover:opacity-80"
    >
      <ArrowDownLeftFromSquareIcon className="w-6 h-6 hover:scale-90 duration-300 transition-all hover:opacity-80" />
    </button>
  );
}

export default memo(LogoutBtn);
