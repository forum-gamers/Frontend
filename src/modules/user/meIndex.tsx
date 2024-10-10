"use client";

import { memo, Suspense, useEffect } from "react";
import BackBtn from "@/components/common/BackBtn";
import EditableCoverImage from "./components/EditableCoverImage";
import EditableProfileImage from "./components/EditableProfileImage";
import useProfile from "./hooks/useProfile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FollowSection from "./components/FollowSection";
import type { ChildrenProps, Lang } from "@/interfaces";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Tab } from "./components/TabPost";
import TabPost from "./components/TabPost";
import UpdateBio from "./components/UpdateBio";
import { cn } from "@/lib/utils";

export interface MeIndexProps extends ChildrenProps {
  tabs: Tab[];
  activeTab: string;
  lang: Lang;
}

function MeIndex({ tabs, activeTab, children, lang }: MeIndexProps) {
  const { me } = useProfile();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!me || !session) return router.replace("/login");
  }, [me, status, router, session]);

  return (
    <>
      <BackBtn url="/feed" />
      <header className="w-full rounded-md bg-white dark:bg-[#202225]">
        <div className="w-full">
          <Suspense>
            <EditableCoverImage />
          </Suspense>
          <div className="flex justify-between items-center -mt-10 px-5">
            <Suspense>
              <EditableProfileImage />
            </Suspense>
          </div>
        </div>
        <hgroup className="flex flex-col w-full px-4 text-neutral-900 dark:text-neutral-300 h-8">
          <div className="flex justify-between items-start w-full">
            <h2 className="px-2 text-center">{me?.username}</h2>
            <Suspense>
              <FollowSection
                className={cn(!me && "animate-pulse duration-100 opacity-75")}
                id={me?.id as string}
              />
            </Suspense>
          </div>
        </hgroup>
      </header>
      <Card className="w-full bg-white dark:bg-[#202225]">
        {<CardHeader>{lang === "id" ? "Tentang" : "About"}</CardHeader>}
        <CardContent>
          <UpdateBio
            className={cn(!me && "animate-pulse duration-100 opacity-75")}
            bio={me?.bio || "Write a short bio about yourself"}
          />
        </CardContent>
      </Card>
      <Card
        className="w-full !border-none bg-gray-100 dark:bg-[#36393f] !shadow-none"
        id="post-section"
      >
        <TabPost tabs={tabs} activeTab={activeTab} />
        <div className="flex flex-col gap-2 p-2">{children}</div>
      </Card>
    </>
  );
}

export default memo(MeIndex);
