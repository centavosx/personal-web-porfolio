import Navigation from "@/components/Navigation";

import Hero from "./_sections/Hero";
import AboutMe from "./_sections/AboutMe";
import CoreTech from "./_sections/CoreTech";
import Projects from "./_sections/Projects";
import Companies from "./_sections/Companies";
import OtherTechnologies from "./_sections/OtherTechnologies";
import Footer from "./_sections/Footer";

const links = [
  {
    text: "About Me",
    href: "#about",
  },
  {
    text: "Technologies",
    href: "#tech",
  },
  {
    text: "Projects",
    href: "#projects",
  },
];

export default function Home() {
  return (
    <>
      <Navigation links={links} />
      <Hero />
      <AboutMe />
      <Companies />
      <CoreTech />
      <OtherTechnologies />
      <Projects />
      <Footer />
    </>
  );
}
