import { formatDistanceToNow } from "date-fns";
import { memo, useMemo } from "react";

export interface TimestampProps {
  timestamp: string | Date;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

function Timestamp({ timestamp, className, as: Tag = "p" }: TimestampProps) {
  const time = useMemo(
    () => formatDistanceToNow(new Date(timestamp), { addSuffix: true }),
    [timestamp]
  );

  return (
    <Tag className={className} data-test-id="timestamp">
      {time}
    </Tag>
  );
}

export default memo(Timestamp);
