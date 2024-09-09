"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type MouseEventHandler,
} from "react";
import { cn } from "@/lib/utils";
import type { ServerAction } from "@/interfaces";
import useDebounce from "@/hooks/useDebounce";
import type { SearchResultDto } from "@/interfaces/response";
import SkeletonCard from "../common/SkeletonCard";
import { ScrollArea } from "./scroll-area";
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import NoData from "../common/NoData";
import SearchCard from "../common/SearchCard";
import usePlaceHolder from "@/hooks/usePlaceholder";
import useCanvaAnimation from "@/hooks/useCanvaAnimation";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import AnimateParagraph from "../common/AnimateParagraph";
import useProfile from "@/modules/user/hooks/useProfile";

export interface PlaceholdersAndVanishInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholders: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAction: ServerAction<SearchResultDto[]>;
  className?: string;
}

export default function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onAction,
  className,
  ...rest
}: PlaceholdersAndVanishInputProps) {
  const { me } = useProfile();
  const params = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname() as string;
  const [loading, startTransition] = useTransition();
  const [results, setResults] = useState<SearchResultDto[]>([]);
  const currentPlaceholder = usePlaceHolder(placeholders);

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 300);
  const { canvasRef, vanishAndSubmit, animating } = useCanvaAnimation(
    value,
    inputRef
  );

  useEffect(() => {
    startTransition(async () => {
      if (debouncedValue) {
        new URLSearchParams(window.location.search).set("q", debouncedValue);
        const formData = new FormData();
        formData.append("q", debouncedValue);

        vanishAndSubmit();
        const { data } = await onAction(formData);
        if (data) setResults(data);
      }
    });
  }, [debouncedValue]);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const param = new URLSearchParams(params as ReadonlyURLSearchParams);
    if (e.target.value) param.set("q", e.target.value);

    if (!animating) setValue(e.target.value);

    replace(`${pathname}?${params?.toString()}`);
  };

  const handleButtonClick: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setValue("");
    setResults([]);
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`w-full max-w-xl mx-auto relative dark:border-dark-theme-200 ${className}`}
    >
      <form
        className={cn(
          "w-full relative bg-white dark:bg-dark-theme-300 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
          value && "bg-gray-50"
        )}
      >
        <canvas
          className={cn(
            "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
            !animating ? "opacity-0" : "opacity-100"
          )}
          ref={canvasRef}
        />
        <input
          {...rest}
          onChange={onChangeHandler}
          ref={inputRef}
          value={value}
          defaultValue={params?.get("q")?.toString()}
          type="text"
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
            animating && "text-transparent dark:text-transparent"
          )}
          disabled={!me?.isVerified}
        />

        <button
          onClick={handleButtonClick}
          disabled={!value}
          type="button"
          className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300 h-4 w-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
              d="M5 12l14 0"
              initial={{
                strokeDasharray: "50%",
                strokeDashoffset: "50%",
              }}
              animate={{
                strokeDashoffset: value ? 0 : "50%",
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
            />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </motion.svg>
        </button>

        <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
          <AnimatePresence mode="wait">
            {!value && (
              <AnimateParagraph
                className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
                paragraph={placeholders[currentPlaceholder]}
              />
            )}
          </AnimatePresence>
        </div>
      </form>
      <SearchResult
        debouncedValue={debouncedValue}
        loading={loading}
        results={results}
        handleButtonClick={handleButtonClick}
        push={push}
      />
    </div>
  );
}

export interface SearchResultProps {
  debouncedValue: string;
  loading: boolean;
  results: SearchResultDto[];
  push: (navigate: string, opts?: NavigateOptions) => void;
  handleButtonClick: MouseEventHandler;
}

const SearchResult = ({
  debouncedValue,
  loading,
  results,
  push,
  handleButtonClick,
}: SearchResultProps) => {
  const [pending, startTransition] = useTransition();

  const handleCardClick = useCallback(
    (data: SearchResultDto): MouseEventHandler =>
      (e) => {
        e.preventDefault();
        startTransition(() => {
          switch (data.source) {
            case "post":
              push(`/comment/${data.id}`);
              handleButtonClick(e);
              break;
            case "comment":
            case "reply":
              if (!data?.context?.postId) return;

              push(`/comment/${data?.context?.postId}`);
              handleButtonClick(e);
              break;
            case "user":
              push(`/profile/${data.id}`);
              handleButtonClick(e);
              break;
            default:
              return;
          }
        });
      },
    [push, handleButtonClick]
  );

  if (!debouncedValue) return null;

  if (loading || pending)
    return (
      <div className="absolute top-full left-0 w-full mt-4 space-y-2 !bg-transparent mx-auto z-20 rounded-xl">
        <div className="space-y-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="absolute top-full left-0 w-full mt-4 space-y-2 !bg-transparent mx-auto z-20 rounded-xl">
      {!!results.length ? (
        <ScrollArea className="h-64 overflow-y-scroll !z-[999] py-4">
          {results.map((el) => (
            <SearchCard
              data={el}
              onClickHandler={handleCardClick(el)}
              className="p-4 min-w-full flex z-50 border hover:scale-105 my-4 flex-col md:flex-row justify-between items-center rounded-xl cursor-pointer bg-white dark:bg-black"
              key={el.id}
            />
          ))}
        </ScrollArea>
      ) : (
        <NoData
          title="No results found"
          description="Try searching for something else"
          onClick={handleButtonClick}
          wrapperClass="p-4 min-w-full flex z-50 border h-64 justify-center items-center bg-white dark:bg-zinc-800"
        />
      )}
    </div>
  );
};
