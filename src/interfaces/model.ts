export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  bio: string;
  imageUrl: string;
  imageId: string;
  backgroundImageUrl: string;
  backgroundImageId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
  followersCount: number;
  followingCount: number;
  isFollower: boolean;
}

export interface PostAttributes {
  id: number;
  text?: string;
  userId: string;
  allowComment: boolean;
  privacy: PostPrivacy;
  totalLike: number;
  communityId: number;
  createdAt: Date;
  updatedAt: Date;
  editedText: boolean;
  countComment: number;
  countShare: number;
  tags: string[];
}

export type AdminDivision =
  | "Director"
  | "Finance"
  | "IT"
  | "Third Party"
  | "Customer Service"
  | "Marketing";

export type AdminRole = "Supervisor" | "Manager" | "Staff";

export type FileType = "image" | "video";

export type PostPrivacy = "public" | "private" | "friend-only";

export type CommunityMemberRole = "admin" | "member" | "owner";

export type RoomChatType = "private" | "group";

export type RoomMemberType = "admin" | "member" | "owner";

export type ChatStatusType = "plain" | "updated" | "deleted";

export type ChatFileType = FileType | "audio" | "document";

export interface PostMediaResponse {
  url: string;
  fileId: string;
  type: "image" | "video";
}

export interface CommunityResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  imageId: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostResponse {
  id: number;
  userId: string;
  text: string;
  medias: PostMediaResponse[];
  allowComment: boolean;
  createdAt: string;
  updatedAt: string;
  privacy: string;
  countLike: number;
  countComment: number;
  countBookmark: number;
  editedText: boolean;
  countShare: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isShared: boolean;
  community?: CommunityResponse | null;
  username: string;
  userImageUrl?: string;
  userBio: string;
  communityId?: number | null;
  isFollowed: boolean;
  userBackgroundImageUrl?: string;
  userCreatedAt: Date | string;
}

export interface CommentResponse {
  id: number;
  userId: string;
  postId: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  imageUrl?: string;
  bio?: string;
  replies: ReplyResponse[];
  isFollowed: boolean;
  backgroundImageUrl?: string;
  userCreatedAt: Date | string;
}

export interface ReplyResponse {
  id: number;
  userId: string;
  postId: number;
  commentId: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  imageUrl?: string;
  bio?: string;
  isFollowed: boolean;
  backgroundImageUrl?: string;
  userCreatedAt: Date | string;
}

export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  bio: string;
  imageUrl: string;
  imageId: string;
  backgroundImageUrl: string;
  backgroundImageId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
}

export interface UserRecomendationAttributes {
  username: string;
  userImageUrl?: string;
  userBio: string;
  userId: string;
  followerStatus: "non-follower" | "follower";
  source: UserRecomendationSource;
  userBackgroundImageUrl?: string;
  userCreatedAt: Date | string;
}

export type UserRecomendationSource =
  | "non_followed"
  | "tag"
  | "community"
  | "group";

export interface FollowAttributes {
  id: number;
  followerId: string;
  followedId: string;
  createdAt: Date;
  updatedAt: Date;
  followed: UserFollowAttributes;
  follower: UserFollowAttributes;
  isFollowed?: boolean;
}

export interface UserFollowAttributes {
  id: string;
  username: string;
  imageUrl?: string;
  bio: string;
  backgroundUrl?: string;
  createdAt: Date | string;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: null | string;
  banner: null | string;
  owner: boolean;
  permissions: string;
  features: string[];
}

export interface CommunityAttributes {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  imageId?: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  isDiscordServer: boolean;
}
