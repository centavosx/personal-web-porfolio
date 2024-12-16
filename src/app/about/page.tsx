import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import Footer from "../_sections/Footer";

const links = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Early Life",
    href: "#early-life",
    hidden: true,
  },
  {
    text: "Mission and Vision",
    href: "#mission-and-vision",
    hidden: true,
  },
];

const aboutMeData = {
  main: {
    data: "I’m a software developer from Philippines specializing in web/mobile and backend development. I constantly find myself questioning how things function. While I can theorize about them, I know I can’t truly understand them unless I experience them myself. This curiosity had led me to who I am right now.",
  },
  earlyLife: {
    data: [
      "When I was a child, I used to play video games. I admit that I played most of the time and even became addicted at one point. Despite that, I believe it played a key role in my life. I didn’t realize it at the time, but it was preparing me to become who I am today. I learned to take steps, conceptualize, think critically, break down problems, and be more precise and persistent. Over time, my curiosity about how video games work grew, and I learned that software runs through code.",
      "I pursued Bachelor of Science in Information Technology at Technological Institute of the Philippines in Quezon City (TIPQC) to deepen my knowledge about softwares. I began by learning about the basic programming concepts using C++, which gave me a solid understanding of core principles. This allowed me to quickly adapt to different new languages and solve problems across different platforms.",
      "Learning new languages helped me realize that each one serves a specific purpose. For example, Java for android development, Swift for iOS development, Javascript for both web, mobile, and backend development, and Python for the backend development and machine learning. I also learned that the choice of programming language depends on factors like the size of its community and its efficiency in solving specific problems, as languages are designed to work best in certain contexts.",
      "I realized that software isn’t just about functionality, it also needs to be visually appealing and interactive. I learned key design principles such as consistency and simplicity, ensuring that user interfaces are intuitive, easy to navigate, responsive to different screen sizes and devices, and accessible to all users.",
      "Database is crucial for building scalable and efficient applications, I also learned about creating schemas, queries, and a well indexed table capable of handling large datasets. This knowledge is critical for developing scalable and high-performing applications, as data management is at the core of most software.",
      "Networking also plays a vital role, understanding network protocols, API design, and how data is transmitted over the internet helps me develop applications that are both responsive and secure. I’ve worked with RESTful APIs and other communication protocols to enable seamless interaction between different software systems.",
      "Security is the another critical area, as we must to protect our systems from being compromised or taken down, and safeguard sensitive data in our databases. By understanding common threats such as XSS attacks, DDOS, brute force password attacks, SQL injection, and other software vulnerabilities, I have gained both theoretical and practical knowledge of these threats. This understanding has allowed me to continuously apply best practices to prevent cyber threats in applications.",
      "By understanding key areas like programming languages, UI/UX, databases, networks, and security, I am able to build capable applications, whether for web, desktop, or mobile. I also participated in various projects to improve my skills, collaborating with other students not only to enhance my programming skills but also to strengthen my collaboration skills. I believe that effective collaboration is one of the most important aspects of software development, ensuring that everyone stays on the right track. I also engaged with platforms focused on programming challenges, such as CodeWars, to improve my logical thinking and continue refining my ability to write clean, efficient, and performant code.",
    ],
  },
  missionAndVision: {
    data: [
      "As a software developer, I don't just build applications. I focus on identifying software and real world problems, creating effective solutions, and delivering results that have a lasting impact. I am committed to continuous learning, exploring new challenges, and constantly seeking innovative ways to improve both code and user experience.",
      "I plan to dive deeper into areas like AI, Cybersecurity, or computer engineering. My goal is to work in different fields, collaborating with professionals from different areas, combining our expertise to create innovative solutions that can have a positive impact on the world.",
    ],
  },
};

const About = () => {
  return (
    <>
      <Navigation pageUrl="/about" links={links} />
      <Section
        containerProps={{
          className: "dark overflow-hidden pt-56 md",
        }}
        className="overflow-hidden self-center justify-end transition-all"
        isDark
        isTransparentBg
      >
        <Text as="h1" className="font-raleway font-bold" size="xxl">
          About me
        </Text>
      </Section>
      <Section
        description={aboutMeData.main.data}
        moreButton={{
          hidden: true,
        }}
        className="pt-20 pb-10 px-10"
        withPadding={false}
      />
      <Section
        id="early-life"
        title="Early Life"
        className="p-10"
        withPadding={false}
      >
        {aboutMeData.earlyLife.data.map((value, index) => (
          <Text key={`earlyLife_${index}`} className="font-light">
            {value}
          </Text>
        ))}
      </Section>
      <Section
        id="mission-and-vision"
        title="Mission and Vision"
        className="pt-10 pb-20 px-10"
        withPadding={false}
      >
        {aboutMeData.missionAndVision.data.map((value, index) => (
          <Text key={`missionAndVision_${index}`} className="font-light">
            {value}
          </Text>
        ))}
      </Section>
      <Footer isDark />
    </>
  );
};

export default About;
