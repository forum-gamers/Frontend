"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import type { ServerAction } from "@/interfaces";
import useDebounce from "@/hooks/useDebounce";
import type { SearchResultDto } from "@/interfaces/response";
import SkeletonCard from "../common/SkeletonCard";
import Image from "next/image";
import { ScrollArea } from "./scroll-area";

export interface PlaceholdersAndVanishInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholders: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAction: ServerAction<SearchResultDto[]>;
}

export default function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onAction,
  ...rest
}: PlaceholdersAndVanishInputProps) {
  const [loading, startTransition] = useTransition();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [results, setResults] = useState<SearchResultDto[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimation = () => {
    if (!intervalRef?.current)
      intervalRef.current = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 2000) as NodeJS.Timeout;
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") startAnimation();
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(
    new URLSearchParams(window.location.search).get("q") || ""
  );
  const [animating, setAnimating] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

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

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <form
        className={cn(
          "w-full relative bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
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
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
            }
          }}
          ref={inputRef}
          value={value}
          type="text"
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
            animating && "text-transparent dark:text-transparent"
          )}
        />

        <button
          disabled={!value}
          type="submit"
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
              <motion.p
                initial={{
                  y: 5,
                  opacity: 0,
                }}
                key={`current-placeholder-${currentPlaceholder}`}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -15,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "linear",
                }}
                className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
      <div className="absolute top-full left-0 w-full mt-4 bg-white dark:bg-zinc-800 shadow-lg rounded-xl">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : !!results.length && (
              <ScrollArea className="h-64 overflow-y-scroll !z-[999]">
                {!results.length ? (
                  <div>OK</div>
                ) : (
                  results.map((el, index) => (
                    <motion.div
                      layoutId={`card-${el.rank}-${el.id}`}
                      className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                      key={el.id}
                    >
                      <div className="flex gap-4 flex-col md:flex-row">
                        <motion.div layoutId={`image-${el.rank}-${el.id}`}>
                          {!!el.imageUrl && (
                            <Image
                              width={100}
                              height={100}
                              src={el.imageUrl}
                              alt={el.source}
                              className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                            />
                          )}
                        </motion.div>
                        <hgroup className="text-center md:text-left">
                          <motion.h3
                            layoutId={`title-${el.source}-${el.id}`}
                            className="font-medium text-neutral-800 dark:text-neutral-200"
                          >
                            {el.source}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${el.text}-${el.id}`}
                            className="text-neutral-600 dark:text-neutral-400"
                            dangerouslySetInnerHTML={{ __html: el.text }}
                          />
                        </hgroup>
                      </div>
                    </motion.div>
                  ))
                )}
              </ScrollArea>
            )}
      </div>
    </div>
  );
}
