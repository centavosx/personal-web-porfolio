import CodeIcon from "../../../public/svg/languages/code.svg";
import HtmlIcon from "../../../public/svg/languages/html.svg";
import CssIcon from "../../../public/svg/languages/css.svg";
import TypescriptIcon from "../../../public/svg/languages/typescript.svg";
import JavascriptIcon from "../../../public/svg/languages/javascript.svg";
import SqlIcon from "../../../public/svg/languages/sql.svg";
import SolidityIcon from "../../../public/svg/languages/solidity.svg";
import PythonIcon from "../../../public/svg/languages/python.svg";

import CpuIcon from "../../../public/svg/frameworks/cpu.svg";
import NextIcon from "../../../public/svg/frameworks/next.svg";
import NestIcon from "../../../public/svg/frameworks/nestjs.svg";
import ReactNativeIcon from "../../../public/svg/frameworks/react-native.svg";
import HardHatIcon from "../../../public/svg/frameworks/hardhat.svg";
import DrfIcon from "../../../public/svg/frameworks/drf.svg";

import DatabaseIcon from "../../../public/svg/database/database.svg";
import PostgresIcon from "../../../public/svg/database/postgresql.svg";
import MySqlIcon from "../../../public/svg/database/mysql.svg";

import Section from "@/components/Section";
import MutedIconLabel from "@/components/MutedIconLabel";
import Text from "@/components/Text";

const CORE_TECH = [
  {
    title: "Language",
    icon: <CodeIcon height={50} width={50} />,
    animation: "wiggle-more" as const,
    data: [
      {
        icon: <HtmlIcon height={50} width={50} />,
        text: "HTML",
      },
      {
        icon: <CssIcon height={50} width={50} />,
        text: "CSS",
      },
      {
        icon: <JavascriptIcon height={50} width={50} />,
        text: "Javascript",
      },
      {
        icon: <TypescriptIcon height={50} width={50} />,
        text: "Typescript",
      },
      {
        icon: <PythonIcon height={50} width={50} />,
        text: "Python",
      },
      {
        icon: <SqlIcon height={50} width={50} />,
        text: "SQL",
      },
      {
        icon: <SolidityIcon height={50} width={50} />,
        text: "Solidity",
      },
    ],
  },
  {
    title: "Framework",
    icon: <CpuIcon height={50} width={50} />,
    data: [
      { icon: <NextIcon height={50} width={50} />, text: "NextJs" },
      { icon: <NestIcon height={50} width={50} />, text: "NestJs" },
      {
        icon: <ReactNativeIcon height={50} width={50} />,
        text: "React native",
      },
      { icon: <HardHatIcon height={50} width={50} />, text: "Hardhat" },
      { icon: <DrfIcon height={50} width={50} />, text: "DJANGO REST" },
    ],
  },
  {
    title: "Database",
    icon: <DatabaseIcon height={50} width={50} />,
    animation: "wiggle-more" as const,
    data: [
      { icon: <PostgresIcon height={50} width={50} />, text: "PostgreSQL" },
      { icon: <MySqlIcon height={50} width={50} />, text: "MySQL" },
    ],
  },
];

const CoreTech = () => {
  return (
    <Section id="tech" title="Core Technologies">
      <div className="flex flex-col gap-16">
        {CORE_TECH.map((tech, index) => (
          <div
            className="flex flex-col gap-10 group"
            key={`${tech.title}_${index}`}
          >
            <MutedIconLabel
              label={tech.title}
              containerProps={{
                className: "w-full md:max-w-[300px]",
              }}
              mutedIcon={tech.icon}
              hoverAnimation={tech.animation}
            />
            <div className="flex flex-col sm:flex-row flex-1 flex-wrap gap-12">
              {tech.data.map((value, dataIndex) => (
                <div
                  key={`${value.text}_${dataIndex}`}
                  className="flex flex-row sm:flex-col items-center gap-4 group/icon"
                >
                  <div className="group-hover/icon:scale-125 transition-all">
                    {value.icon}
                  </div>
                  <Text
                    className="font-montserrat uppercase sm:font-light group-hover/icon:font-bold transition-all"
                    as="h1"
                    size="md"
                  >
                    {value.text}
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
