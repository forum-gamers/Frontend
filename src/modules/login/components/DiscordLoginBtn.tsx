import { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Discord from "@/components/svg/Discord";

export interface DiscordLoginBtnProps {
  text?: string;
}

function DiscordLoginBtn({
  text = "Login with Discord",
}: DiscordLoginBtnProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`https://discord.com/oauth2/authorize?client_id=${
              process.env.DISCORD_CLIENT_ID
            }&response_type=code&redirect_uri=${encodeURIComponent(
              `${process.env.DOMAIN}/discord/callback`
            )}&scope=identify+email+guilds+guilds.members.read+connections+role_connections.write`}
            className="inline-flex items-center justify-center w-8 h-8 cursor-pointer rounded-full bg-[#5865F2] hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2] transition-colors duration-200"
            aria-label="Login with Discord"
          >
            <Discord />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default memo(DiscordLoginBtn);
