import Container from "@/components/common/Container";
import HomeHeroHighlight from "./components/HomeHeroHighlight";
import GamingIlustrator from "@/components/svg/GamingIlustrator";
import type { Lang } from "@/interfaces";
import ButtonAbout from "./components/ButtonAbout";
import ProductSection from "./components/ProductSection";
import AboutSection from "./components/AboutSection";
import NavbarWrapper from "./components/NavbarWrapper";

export interface HomePageProps {
  lang: Lang;
}

export default function HomePage({ lang }: HomePageProps) {
  return (
    <Container as="div" className="space-y-4">
      <NavbarWrapper />
      <HomeHeroHighlight
        btnElement={<ButtonAbout lang={lang} />}
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        highlightText="TEST test etes"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero unde sunt inventore ut officiis sint rem id temporibus eos quo, eius dolorem? Sit ab voluptas facilis, accusantium non fuga quas?"
      >
        <div className="md:flex justify-center items-center hidden cursor-default">
          <GamingIlustrator
            width={600}
            height={400}
            opacity={0.85}
            cursor="default"
            className="cursor-default"
          />
        </div>
      </HomeHeroHighlight>
      <ProductSection />
      <AboutSection />
    </Container>
  );
}
