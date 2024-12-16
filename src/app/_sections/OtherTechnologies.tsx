import HtmlIcon from "../../../public/svg/languages/html.svg";
import CssIcon from "../../../public/svg/languages/css.svg";
import TypescriptIcon from "../../../public/svg/languages/typescript.svg";
import JavascriptIcon from "../../../public/svg/languages/javascript.svg";
import SqlIcon from "../../../public/svg/languages/sql.svg";
import SolidityIcon from "../../../public/svg/languages/solidity.svg";
import PythonIcon from "../../../public/svg/languages/python.svg";

import NextIcon from "../../../public/svg/frameworks/next.svg";
import NestIcon from "../../../public/svg/frameworks/nestjs.svg";
import ReactNativeIcon from "../../../public/svg/frameworks/react-native.svg";
import HardHatIcon from "../../../public/svg/frameworks/hardhat.svg";
import DrfIcon from "../../../public/svg/frameworks/drf.svg";

import PostgresIcon from "../../../public/svg/database/postgresql.svg";
import MySqlIcon from "../../../public/svg/database/mysql.svg";

import Section from "@/components/Section";
import Text from "@/components/Text";

const CORE_TECH = [
  {
    icon: <HtmlIcon height={25} width={25} />,
    text: "HTML",
  },
  {
    icon: <CssIcon height={25} width={25} />,
    text: "CSS",
  },
  {
    icon: <JavascriptIcon height={25} width={25} />,
    text: "Javascript",
  },
  {
    icon: <TypescriptIcon height={25} width={25} />,
    text: "Typescript",
  },
  {
    icon: <PythonIcon height={25} width={25} />,
    text: "Python",
  },
  {
    icon: <SqlIcon height={25} width={25} />,
    text: "SQL",
  },
  {
    icon: <SolidityIcon height={25} width={25} />,
    text: "Solidity",
  },
  { icon: <NextIcon height={25} width={25} />, text: "NextJs" },
  { icon: <NestIcon height={25} width={25} />, text: "NestJs" },
  {
    icon: <ReactNativeIcon height={25} width={25} />,
    text: "React native",
  },
  { icon: <HardHatIcon height={25} width={25} />, text: "Hardhat" },
  { icon: <DrfIcon height={25} width={25} />, text: "DJANGO REST" },
  { icon: <PostgresIcon height={25} width={25} />, text: "PostgreSQL" },
  { icon: <MySqlIcon height={25} width={25} />, text: "MySQL" },
];

const OtherTechnologies = () => {
  return (
    <Section title="Non-core Technologies">
      <div className="flex flex-row gap-16 flex-wrap">
        {CORE_TECH.map((tech, index) => (
          <div
            key={`${tech.text}_${index}`}
            className="flex flex-row sm:flex-col items-center gap-4 group/icon"
          >
            <div>{tech.icon}</div>
            <Text
              className="font-montserrat text-sm uppercase sm:font-light"
              as="h1"
            >
              {tech.text}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default OtherTechnologies;
