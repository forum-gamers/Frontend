import AboutUsIlustrator from "@/components/svg/AboutUsIlustrator";
import { memo } from "react";
import AboutDescription from "./AboutDescription";
import { cn } from "@/lib/utils";
import { HeroHighlight } from "@/components/ui/hero-highlight";

function AboutSection() {
  return (
    <HeroHighlight
      as="section"
      id="gamer-hub-about-section"
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 w-full md:h-[65svh] p-2 mx-2 gap-6 mt-16 md:mt-32 ",
        "h-full w-4/5 mx-auto"
      )}
      containerClassName="h-[12rem] md:h-[30rem]"
      data-testid="about-section"
    >
      <AboutUsIlustrator
        width={500}
        height={300}
        opacity={0.85}
        className="hidden md:block"
      />
      <hgroup className="flex flex-col space-y-2">
        <AboutDescription
          title="About us"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos laborum, voluptate omnis, inventore iure repellendus atque asperiores ullam alias quaerat natus explicabo nemo voluptatum maiores eaque dolor! Rerum, quis eligendi?"
        />
      </hgroup>
    </HeroHighlight>
  );
}

export default memo(AboutSection);
