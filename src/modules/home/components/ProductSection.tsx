import { Card } from "@/components/ui/card";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { cn } from "@/lib/utils";
import { memo } from "react";

function ProductSection() {
  const products = ["ok1", "ok2", "ok3"];

  return (
    <HeroHighlight
      data-testid="product-section"
      as="section"
      id="gamer-hub-product-section"
      className={cn(
        "hover:scale-[102.5%] transition-all duration-300 shadow-sm hover:shadow-lg rounded-md hover:rounded-xl",
        "h-[40rem] w-4/5 mx-auto mt-6 md:mt-12 p-2",
        "border dark:border-white border-gray-900 hover:border-blue-500",
        "space-y-6"
      )}
      containerClassName="h-[50rem]"
    >
      <hgroup className="flex flex-col items-center justify-center antialiased mt-1 md:mt-2 space-y-3 w-4/5 mx-auto">
        <h2
          className={cn(
            "text-5xl font-bold text-center bg-clip-text text-transparent",
            "bg-gradient-to-br from-blue-400 from-10% via-blue-500 via-70% to-blue-600 to-20%",
            "hover:cursor-pointer hover:opacity-95 hover:scale-105 hover:underline hover:underline-offset-4 transition-all duration-300",
            "shadow-sm hover:shadow-lg"
          )}
        >
          Our Products
        </h2>
        <h4
          className={cn(
            "text-2xl font-medium text-pretty text-center uppercase w-3/4",
            "hover:cursor-default hover:opacity-95 hover:scale-[102.5%] transition-all duration-300",
            "text-neutral-900 dark:text-neutral-300"
          )}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit
        </h4>
      </hgroup>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-8",
          "space-y-2 md:space-y-0 md:space-x-1",
          "mx-auto px-4 h-[70%] py-2 mt-4 md:mt-8",
          "group/product-card"
        )}
      >
        {products.map((product) => (
          <Card
            key={product}
            className={cn(
              "w-full h-full",
              "border hover:border-blue-500",
              "hover:opacity-95 hover:scale-105 hover:cursor-pointer transition-all duration-300",
              "group-hover/product-card:[&:not(:hover)]:opacity-30",
              "bg-white dark:bg-gray-900 dark:stroke-slate-950 stroke-gray-100",
              "shadow-lg hover:shadow-2xl shadow-gray-200 dark:shadow-slate-950"
            )}
            as="article"
          ></Card>
        ))}
      </div>
    </HeroHighlight>
  );
}

export default memo(ProductSection);
