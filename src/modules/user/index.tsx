import { memo, Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ChildrenProps, CustomSession, Lang } from "@/interfaces";
import TruncateCardText from "@/components/common/TruncateCardText";
import BackBtn from "@/components/common/BackBtn";
import TabPost, { type Tab } from "./components/TabPost";
import FollowSection from "./components/FollowSection";
import FollowBtn from "@/components/common/FollowBtn";
import UpdateBio from "./components/UpdateBio";
import Init from "./components/Init";
import type { UserAttributes } from "@/interfaces/model";
import EditableProfileImage from "./components/EditableProfileImage";
import EditableCoverImage from "./components/EditableCoverImage";
import PriorityImage from "@/components/common/PriorityImage";
import { BACKDROP, GUEST } from "@/components/images";

export interface UserPageProps extends ChildrenProps {
  lang?: Lang;
  isFollower: boolean;
  tabs: Tab[];
  activeTab: string;
  session: CustomSession | null;
  user: UserAttributes;
}

function UserPage({
  lang = "id",
  tabs,
  children,
  session,
  activeTab,
  user,
  isFollower,
}: UserPageProps) {
  const { username, id, imageUrl, bio, backgroundImageUrl } = user;

  return (
    <>
      <Init target={user} session={session} />
      <BackBtn url="/" />
      <header className="w-full rounded-md bg-white dark:bg-dark-theme-500">
        <div className="w-full">
          {session?.user?.id !== id ? (
            <PriorityImage
              width={450}
              height={150}
              alt="banner"
              src={backgroundImageUrl || BACKDROP}
              className="w-full rounded-md"
            />
          ) : (
            <Suspense>
              <EditableCoverImage />
            </Suspense>
          )}
          <div className="flex justify-between items-center -mt-10 px-5">
            {session?.user?.id !== id ? (
              <figure className="rounded-full border-2 cursor-pointer border-white shadow-md dark:border-neutral-800 flex justify-center items-center">
                <PriorityImage
                  className="lg:hover:scale-105 rounded-full"
                  width={100}
                  height={100}
                  alt={`${username} image`}
                  src={imageUrl || GUEST}
                />
              </figure>
            ) : (
              <Suspense>
                <EditableProfileImage />
              </Suspense>
            )}
            {session?.user?.id !== id && (
              <Suspense>
                <FollowBtn
                  isFollowed={isFollower}
                  id={id}
                  className="ml-4 px-4 py-2"
                />
              </Suspense>
            )}
          </div>
        </div>
        <hgroup className="flex flex-col w-full px-4 text-neutral-900 dark:text-neutral-300 h-8">
          <div className="flex justify-between items-start w-full">
            <h2 className="px-8 text-center">{username}</h2>
            <Suspense>
              <FollowSection id={id} session={session} />
            </Suspense>
          </div>
        </hgroup>
      </header>
      <Card className="w-full bg-white dark:bg-dark-theme-500">
        {<CardHeader>{lang === "id" ? "Tentang" : "About"}</CardHeader>}
        <CardContent>
          {session?.user?.id !== id ? (
            <TruncateCardText
              text={bio || "Write a short bio about yourself"}
              className="antialiased"
              as="blockquote"
            />
          ) : (
            <UpdateBio bio={bio || "Write a short bio about yourself"} />
          )}
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
