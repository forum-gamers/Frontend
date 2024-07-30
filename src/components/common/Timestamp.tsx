import { formatDistanceToNow } from "date-fns";

export interface TimestampProps {
  timestamp: string | Date;
  className?: string;
}

export default function Timestamp({ timestamp, className }: TimestampProps) {
  return (
    <p className={className} data-test-id="timestamp">
      {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
    </p>
  );
}
