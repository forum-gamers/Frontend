export interface SearchResultDto {
  source: "user" | "post" | "comment" | "reply";
  id: string;
  text: string;
  imageUrl?: string | null;
  searchedField: string;
  rank: number;
  similarityScore: number;
  context?: SearchResultContextDto | null;
}

export interface SearchResultContextDto {
  postId?: number;
}
