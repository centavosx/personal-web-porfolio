import Navigation from "@/components/Navigation";

import Footer from "@/components/Footer";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import CoreTech from "./components/CoreTech";
import Projects from "./components/Projects";
import WorkExperience from "./components/WorkExperience";
import { Content } from "@/types/supabase";
import Supabase from "@/utils/supabase";

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

export const LandingScreen = async () => {
  const data = await Supabase.getContents();
  const { data: aboutData } = Supabase.handleError(
    await Supabase.about
      .select("short_description, link(*), address(*)")
      .single(),
    "About should be available"
  );

  const workExperiences: Content[] = [];
  const projects: Content[] = [];

  data.forEach((value) => {
    if (value.type === "work-experience") {
      workExperiences.push(value);
      return;
    }
    projects.push(value);
  });

  return (
    <>
      <Navigation links={links} />
      <Hero links={aboutData.link} />
      <AboutMe shortDescription={aboutData.short_description} />
      <WorkExperience data={workExperiences} />
      <CoreTech />
      <Projects data={projects} />
      <Footer />
    </>
  );
};
