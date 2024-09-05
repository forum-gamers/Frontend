import PriorityImage from "@/components/common/PriorityImage";
import { memo, Suspense } from "react";
import { GUEST, BACKDROP } from "@/components/images";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ChildrenProps, CustomSession, Lang } from "@/interfaces";
import TruncateCardText from "@/components/common/TruncateCardText";
import BackBtn from "@/components/common/BackBtn";
import TabPost, { type Tab } from "./components/TabPost";
import FollowSection from "./components/FollowSection";
import FollowBtn from "@/components/common/FollowBtn";
import UpdateBio from "./components/UpdateBio";

export interface UserPageProps extends ChildrenProps {
  username: string;
  imageUrl?: string;
  backgroundUrl?: string;
  lang?: Lang;
  bio?: string;
  tabs: Tab[];
  activeTab: string;
  followersCount: number;
  followingCount: number;
  session: CustomSession | null;
  id: string;
  isFollower: boolean;
}

function UserPage({
  username,
  imageUrl,
  backgroundUrl,
  lang = "id",
  bio,
  tabs,
  children,
  activeTab,
  followersCount = 0,
  followingCount = 0,
  session,
  id,
  isFollower,
}: UserPageProps) {
  return (
    <>
      <BackBtn url="/" />
      <header className="w-full rounded-md bg-white dark:bg-dark-theme-500">
        <div className="w-full">
          <PriorityImage
            width={450}
            height={150}
            alt="banner"
            src={backgroundUrl || BACKDROP}
            className="w-full rounded-md"
          />
          <div className="flex justify-between items-center -mt-10 px-5">
            <PriorityImage
              className="rounded-full"
              width={100}
              height={100}
              alt="profile-photo"
              src={imageUrl || GUEST}
            />
            {session?.user?.id !== id && (
              <FollowBtn
                isFollowed={isFollower}
                id={id}
                className="ml-4 px-4 py-2"
              />
            )}
          </div>
        </div>
        <hgroup className="flex flex-col w-full px-4 text-neutral-900 dark:text-neutral-300 h-8">
          <div className="flex justify-between items-start w-full">
            <h2 className="px-8">{username}</h2>
            <Suspense>
              <FollowSection
                id={id}
                followersCount={followersCount}
                followingCount={followingCount}
                session={session}
              />
            </Suspense>
          </div>
        </hgroup>
      </header>
      <Card className="w-full bg-white dark:bg-dark-theme-500">
        {!!bio && (
          <CardHeader>{lang === "id" ? "Tentang" : "About"}</CardHeader>
        )}
        <CardContent>
          {!!bio &&
            (session?.user?.id !== id ? (
              <TruncateCardText
                text={bio}
                className="antialiased"
                as="blockquote"
              />
            ) : (
              <UpdateBio bio={bio} />
            ))}
        </CardContent>
      </Card>
      <Card
        className="w-full bg-light-theme-100 dark:bg-dark-theme-300 !border-none"
        id="post-section"
      >
        <TabPost tabs={tabs} activeTab={activeTab} />
        <div className="flex flex-col gap-2 p-2">{children}</div>
      </Card>
    </>
  );
}

export default memo(UserPage);
