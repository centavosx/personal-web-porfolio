import Section from "@/components/Section";
import MutedIconLabel from "@/components/MutedIconLabel";
import Text from "@/components/Text";
import Supabase from "@/utils/supabase";
import { Technology } from "@/types/supabase";
import Image from "next/image";

type CoreTechDataType = {
  label: string;
  icon: string;
  animation: "wiggle-more" | "spin";
  data: Technology[];
};

const CORE_TECH_DATA: Record<string, Omit<CoreTechDataType, "data">> = {
  language: {
    label: "Language",
    icon: "/svg/languages/code.svg",
    animation: "wiggle-more",
  },
  frameworks: {
    label: "Framework",
    icon: "/svg/frameworks/cpu.svg",
    animation: "wiggle-more",
  },
  database: {
    label: "Database",
    icon: "/svg/database/database.svg",
    animation: "wiggle-more",
  },
};

const CoreTech = async () => {
  const keyIndexes: Record<string, number> = {};
  const coreTechs: CoreTechDataType[] = [];

  const technologies = await Supabase.getCoreTech();
  for (const tech of technologies) {
    const category = tech.category;
    const currentIndex: number =
      keyIndexes[tech.category as string] ?? coreTechs.length;
    if (!coreTechs[currentIndex]) {
      coreTechs[currentIndex] = { ...CORE_TECH_DATA[category], data: [] };
      keyIndexes[category] = currentIndex;
    }
    coreTechs[currentIndex].data.push(tech);
  }

  return (
    <Section id="tech" title="Core Technologies">
      <div className="flex flex-col gap-16">
        {coreTechs.map((tech, index) => (
          <div
            className="flex flex-col gap-10 group"
            key={`${tech.label}_${index}`}
          >
            <MutedIconLabel
              label={tech.label}
              containerProps={{
                className: "w-full md:max-w-[300px]",
              }}
              mutedIconUri={tech.icon}
              iconAlt={tech.label}
              hoverAnimation={tech.animation}
            />
            <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-12">
              {tech.data?.map((value, dataIndex) => (
                <div
                  key={`${value.id}_${dataIndex}`}
                  className="flex flex-row sm:flex-col items-center gap-4 group/icon"
                >
                  <div className="group-hover/icon:scale-125 transition-all">
                    <Image
                      src={value.icon_url}
                      height={50}
                      width={50}
                      alt={`${value.name} image`}
                    />
                  </div>
                  <Text
                    className="font-montserrat uppercase sm:font-light group-hover/icon:font-bold transition-all"
                    as="h1"
                    size="md"
                  >
                    {value.name}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default CoreTech;
