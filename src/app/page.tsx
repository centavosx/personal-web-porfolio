import Navigation from "@/components/Navigation";

import Hero from "./_sections/Hero";
import AboutMe from "./_sections/AboutMe";
import CoreTech from "./_sections/CoreTech";
import Projects from "./_sections/Projects";
import Companies from "./_sections/Companies";
import Footer from "./_sections/Footer";

const links = [
  {
    text: "About Me",
    href: "#about",
  },
  {
    text: "Work Experience",
    href: "#work-experience",
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
      <Projects />
      <Footer />
    </>
  );
}
