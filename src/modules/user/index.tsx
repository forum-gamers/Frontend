import PriorityImage from "@/components/common/PriorityImage";
import { memo } from "react";
import { GUEST, BACKDROP } from "@/components/images";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ChildrenProps, Lang } from "@/interfaces";
import TruncateCardText from "@/components/common/TruncateCardText";
import BackBtn from "@/components/common/BackBtn";
import TabPost, { type Tab } from "./components/TabPost";

export interface UserPageProps extends ChildrenProps {
  username: string;
  id: string;
  imageUrl?: string;
  backgroundUrl?: string;
  lang?: Lang;
  bio?: string;
  tabs: Tab[];
  activeTab: string;
}

function UserPage({
  username,
  id,
  imageUrl,
  backgroundUrl,
  lang = "id",
  bio,
  tabs,
  children,
  activeTab,
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
          <PriorityImage
            className="rounded-full -mt-10 ml-5"
            width={100}
            height={100}
            alt="profile-photo"
            src={imageUrl || GUEST}
          />
        </div>
        <hgroup className="flex flex-col w-full p-4">
          <p>{username}</p>
          {/* <p>TODO (TITLE)</p> */}
        </hgroup>
      </header>
      <Card className="w-full bg-white dark:bg-dark-theme-500">
        {!!bio && (
          <CardHeader>{lang === "id" ? "Tentang" : "About"}</CardHeader>
        )}
        <CardContent>
          {!!bio && (
            <TruncateCardText
              text={bio}
              className="antialiased"
              as="blockquote"
            />
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
