import { memo, Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ChildrenProps, Lang } from "@/interfaces";
import TruncateCardText from "@/components/common/TruncateCardText";
import BackBtn from "@/components/common/BackBtn";
import TabPost, { type Tab } from "./components/TabPost";
import FollowSection from "./components/FollowSection";
import Init from "./components/Init";
import type { UserAttributes } from "@/interfaces/model";
import PriorityImage from "@/components/common/PriorityImage";
import { BACKDROP, GUEST } from "@/components/images";
import FollowTargetBtn from "./components/FollowTargetBtn";

export interface UserPageProps extends ChildrenProps {
  lang?: Lang;
  tabs: Tab[];
  activeTab: string;
  user: UserAttributes;
}

function UserPage({
  lang = "id",
  tabs,
  children,
  activeTab,
  user,
}: UserPageProps) {
  const { username, id, imageUrl, bio, backgroundImageUrl } = user;

  return (
    <>
      <Init target={user} />
      <BackBtn url="/feed" />
      <header className="w-full rounded-md bg-white dark:bg-[#202225]">
        <div className="w-full">
          <PriorityImage
            width={450}
            height={150}
            alt="banner"
            src={backgroundImageUrl || BACKDROP}
            className="w-full rounded-md"
          />
          <div className="flex justify-between items-center -mt-10 px-5">
            <figure className="rounded-full overflow-hidden border-2 cursor-pointer border-white shadow-md dark:border-neutral-800 flex justify-center items-center">
              <PriorityImage
                className="lg:hover:scale-105 rounded-full mx-auto object-cover aspect-square"
                width={100}
                height={100}
                alt={`${username} image`}
                src={imageUrl || GUEST}
              />
            </figure>
            <Suspense>
              <FollowTargetBtn />
            </Suspense>
          </div>
        </div>
        <hgroup className="flex flex-col w-full px-4 text-neutral-900 dark:text-neutral-300 h-8">
          <div className="flex justify-between items-start w-full">
            <h2 className="px-2 text-center">{username}</h2>
            <Suspense>
              <FollowSection id={id} />
            </Suspense>
          </div>
        </hgroup>
      </header>
      <Card className="w-full bg-white dark:bg-[#202225]">
        {<CardHeader>{lang === "id" ? "Tentang" : "About"}</CardHeader>}
        <CardContent>
          <TruncateCardText
            text={bio || "Write a short bio about yourself"}
            className="antialiased"
            as="blockquote"
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

export default memo(UserPage);
