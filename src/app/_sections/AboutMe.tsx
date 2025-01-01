import CICDIcon from "../../../public/svg/cicd.svg";
import DevelopmentIcon from "../../../public/svg/development.svg";
import DBDesignIcon from "../../../public/svg/db-design.svg";
import MaintenanceIcon from "../../../public/svg/maintenance.svg";
import SecurityIcon from "../../../public/svg/security.svg";
import BlockchainIcon from "../../../public/svg/blockchain.svg";
import Section from "@/components/Section";
import MutedIconLabel from "@/components/MutedIconLabel";

const WhatICanOffer = [
  {
    label: "Development",
    icon: <DevelopmentIcon height={50} width={50} />,
    description:
      "I provide end-to-end software development services, specializing in building scalable, efficient, and user-friendly web and mobile applications. I use the latest technologies and frameworks to bring ideas to life working across the full stack development.",
    animation: "wiggle-more" as const,
  },
  {
    label: "Security",
    icon: <SecurityIcon height={50} width={50} />,
    description:
      "Security is a top priority in every project I undertake. I implement best security practices to protect web and mobile applications, infrastructure, and databases from cyber threats.",
    animation: "wiggle-more" as const,
  },
  {
    label: "Maintenance",
    icon: <MaintenanceIcon height={50} width={50} />,
    description:
      "I maintain web and mobile applications to ensure they run smoothly, securely, and stay up-to-date. This includes fixing bugs, optimizing code for enhanced performance, scalability, and efficiency, and ensuring that all libraries and dependencies are at the latest version.",
  },
  {
    label: "Database",
    icon: <DBDesignIcon height={50} width={50} />,
    description:
      "I design and implement scalable, efficient, and well-structured database schemas. I also create database queries for backend integration, ensuring smooth data flow across web, mobile, and other systems.",
  },
  {
    label: "CICD",
    icon: <CICDIcon height={50} width={50} />,
    description:
      "Continuous Integration/Continuous Deployment (CI/CD) helps automate testing, building, and deploying code, speeding up releases and improving software quality. I create tests and set up automated pipelines to ensure consistent delivery, reduce manual errors, and increase deployment speed.",
  },
  {
    label: "Web3",
    icon: <BlockchainIcon height={50} width={50} />,
    description:
      "I develop decentralized applications (dApps), creating secure and efficient Ethereum smart contracts, and integrating blockchain technologies into applications. It is to leverage blockchain, enhance security, and create scalable, decentralized solutions that align with the future of the web.",
  },
];

const AboutMe = () => {
  return (
    <>
      <Section
        id="about"
        title="About Me"
        description="As a software developer, I don't just build applications. I focus on identifying software and real world problems, creating effective solutions, and delivering results that have a lasting impact. I am committed to continuous learning, exploring new challenges, and constantly seeking innovative ways to improve both code and user experience."
        moreButton={{ href: "/about" }}
      />
      <Section title="What I offer?">
        <div className="flex flex-row gap-8 xl:gap-24 relative justify-around flex-wrap">
          {WhatICanOffer.map((value, index) => (
            <MutedIconLabel
              key={`${value.label}_${index}`}
              label={value.label}
              containerProps={{
                className: "w-full md:max-w-[300px]",
              }}
              mutedIcon={value.icon}
              description={value.description}
              hoverAnimation={value.animation}
            />
          ))}
        </div>
      </Section>
    </>
  );
};

export default AboutMe;
