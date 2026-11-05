import TechBadge from "@/components/TechBadge";
import { Technology } from "@/types/supabase";
import SectionHeading from "./SectionHeading";

const categoryLabels: Partial<Record<Technology["category"], string>> = {
  language: "Languages",
  frameworks: "Frameworks",
  database: "Databases",
  automation: "Automation",
  cicd: "CI/CD",
  cloud: "Cloud",
  design: "Design",
  documentation: "Documentation",
  re: "Runtimes",
  state: "State",
  styling: "Styling",
  tests: "Testing",
  web3: "Web3",
};

export type TechnologiesProps = {
  data: Technology[];
};

const Technologies = ({ data }: TechnologiesProps) => {
  const groups = new Map<Technology["category"], Technology[]>();
  data.forEach((tech) => groups.set(tech.category, [...(groups.get(tech.category) ?? []), tech]));

  return (
    <section id="technologies" className="scroll-mt-14 bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6">
        <SectionHeading title="Technologies" description="The tools I reach for most." />
        <dl className="flex flex-col gap-6">
          {[...groups].map(([category, items]) => (
            <div key={category} className="grid gap-3 sm:grid-cols-[10rem_1fr]">
              <dt className="pt-1 text-sm font-medium">{categoryLabels[category] ?? category}</dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((tech) => (
                  <TechBadge key={tech.id} name={tech.name} icon={tech.icon_url} href={tech.link} />
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Technologies;
