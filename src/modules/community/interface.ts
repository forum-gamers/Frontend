import type { CommunityAttributes } from "@/interfaces/model";

export interface ImportedDiscordServerResponse {
  community: CommunityAttributes;
  refreshedToken: boolean;
  token: string | null;
}
