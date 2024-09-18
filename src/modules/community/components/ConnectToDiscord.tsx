import DiscordLoginBtn from "@/modules/login/components/DiscordLoginBtn";
import { memo } from "react";

function ConnectToDiscord() {
  return (
    <div className="flex flex-col justify-center items-center mt-8 space-y-4">
      <p className="text-neutral-900 dark:text-neutral-300">
        Connect to your Discord account to import a server.
      </p>
      <DiscordLoginBtn text="Connect to discord" />
    </div>
  );
}

export default memo(ConnectToDiscord);
