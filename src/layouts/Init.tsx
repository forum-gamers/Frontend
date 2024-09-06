"use client";

import type { ChildrenProps } from "@/interfaces";
import type { UserAttributes } from "@/interfaces/model";
import useProfile from "@/modules/user/hooks/useProfile";
import Aos from "aos";
import { useEffect } from "react";

export interface InitPageProps extends ChildrenProps {
  user: UserAttributes | null;
}

export default function InitPage({ children, user }: InitPageProps) {
  const { setUser, resetUser } = useProfile();
  useEffect(() => {
    Aos.init({
      duration: 800,
      delay: 50,
    });
  }, []);

  useEffect(() => {
    resetUser();
    if (user) setUser(user);
  }, [user]);
  return children;
}
