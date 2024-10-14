"use client";

import AnimateInput from "@/components/common/AnimateInput";
import { Search, X } from "lucide-react";
import {
  memo,
  useCallback,
  useRef,
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { getCommunities } from "../action";
import useCommunity from "../hooks/useCommunity";
import { cn } from "@/lib/utils";

function CommunitySearch() {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const { resetDatas, setDatas } = useCommunity();

  const handler = useDebouncedCallback(async (term: string) => {
    const { data = [] } = await getCommunities({
      page: 1,
      limit: 10,
      q: term,
    });
    resetDatas();
    setDatas(data || []);
    if (ref.current) ref.current.click();
  }, 500);

  const resetParams: MouseEventHandler = useCallback(async (e) => {
    setValue("");
    const { data = [] } = await getCommunities({
      page: 1,
      limit: 10,
    });

    resetDatas();
    setDatas(data || []);
    if (ref.current) ref.current.click();
  }, []);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setValue(e.target.value);
      handler(e.target.value);
    },
    [handler]
  );

  return (
    <div className="relative xl:w-[60%] w-[55%]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <AnimateInput
        ref={ref}
        type="text"
        placeholder="Search communities..."
        onChange={onChangeHandler}
        className="pl-10 pr-4 py-2 w-64"
        value={value}
      />
      {!!value && (
        <X
          onClick={resetParams}
          className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400",
            "transition-all duration-300"
          )}
        />
      )}
    </div>
  );
}

export default memo(CommunitySearch);
