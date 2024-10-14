import ProfilePic, {
  type ProfilePicProps,
} from "@/components/common/ProfilePic";
import { format } from "date-fns";
import { memo } from "react";

export interface EventCardProps extends ProfilePicProps {
  eventDate: Date | string;
  title: string;
}

function EventCard({ eventDate, title, ...rest }: EventCardProps) {
  return (
    <article className="flex items-start space-x-4">
      <ProfilePic {...rest} />
      <hgroup className="antialiased">
        <p className="font-medium">{title}</p>
        <p className="text-gray-600">{format(new Date(eventDate), "PP")}</p>
      </hgroup>
    </article>
  );
}

export default memo(EventCard);
