import { memo, type SVGProps } from "react";

function NoData(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
      <circle cx="12" cy="12" r="3" strokeWidth={0.5} />
      <line x1="12" y1="9" x2="12" y2="15" strokeWidth={0.5} />
      <line x1="9" y1="12" x2="15" y2="12" strokeWidth={0.5} />
    </svg>
  );
}

export default memo(NoData);
