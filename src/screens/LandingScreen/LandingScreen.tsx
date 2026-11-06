import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Content } from "@/types/supabase";
import Supabase from "@/utils/supabase";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Technologies from "./components/Technologies";

export const LandingScreen = async () => {
  const [contents, services, technologies, about, links] = await Promise.all([
    Supabase.getContents(),
    Supabase.getServices(),
    Supabase.getCoreTech(),
    Supabase.getAbout(),
    Supabase.getLinks(),
  ]);

  const experiences: Content[] = [];
  const projects: Content[] = [];

  contents.forEach((value) => {
    (value.type === "work-experience" ? experiences : projects).push(value);
  });

  return (
    <>
      <SiteHeader />
      <main>
        <Hero intro={about.short_description} links={links} projects={projects} />
        <Projects data={projects} />
        <Services data={services} />
        <Experience data={experiences} />
        <Technologies data={technologies} />
      </main>
      <SiteFooter />
    </>
  );
};
