import { memo } from "react";
import NoData from "../svg/NoData";

function NoDataState() {
  return (
    <div className="text-center space-y-6">
      <div className="w-48 h-48 mx-auto">
        <NoData className="w-full h-full text-gray-300" />
      </div>
      <hgroup className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          No data available
        </h2>
      </hgroup>
    </div>
  );
}

export default memo(NoDataState);
