export interface CreateCommunityEventProps {
  title: string;
  description?: string;
  location: string;
  startTime: Date;
  endTime: Date | null;
  isPublic: boolean;
}
