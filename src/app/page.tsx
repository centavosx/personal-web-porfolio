import Navigation from "@/components/Navigation";

import Hero from "./_sections/Hero";
import AboutMe from "./_sections/AboutMe";
import CoreTech from "./_sections/CoreTech";
import Projects from "./_sections/Projects";
import WorkExperience from "./_sections/WorkExperience";
import Footer from "./_sections/Footer";
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

const Home = async () => {
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

export default Home;
