// TODO: Create backend to dynamically add/view/remove content

type ContentType = "description" | "image" | "section";
export type ContentData = {
  title?: string;
  type: ContentType;
  data: string | ContentData[] | ContentData;
};
type Content = {
  id: string;
  title: string;
  description: string | string[];
  icon: string;
  content?: ContentData | ContentData[];
};
export const companies: Content[] = [
  {
    id: "1",
    title: "Trend Micro",
    description:
      "Trend Micro, a global cybersecurity leader, helps make the world safe for exchanging digital information. Fueled by decades of security expertise, global threat research, and continuous innovation, our cybersecurity platform protects 500,000+ organizations and 250+ million individuals across clouds, networks, devices, and endpoints.",
    icon: "/svg/company/trend-micro.svg",
  },
  {
    id: "2",
    title: "ISBX",
    description: [
      "ISBX work with clients to strategize and build world-class applications for web and mobile. Their design and development teams function in unison to deliver world class results that customers love.",
      "Since 2003, the ISBX team has developed numerous websites and applications for clients large and small that include automotive, consumer packaged goods, action sports, and lifestyle markets. They stand by their work and can provide a long list of references from their trusted partners.",
    ],
    icon: "/svg/company/isbx.svg",
    content: {
      title: "Roles and Responsibilites",
      type: "section",
      data: [
        {
          data: "I am currently working as a full-stack software developer at ISBX, where I have had the opportunity to contribute to variety of projects including, mobile-apps, frontend, and backend development. It is a valuable experience, as I’ve been exposed to different technologies and development techniques. One of the most challenging aspects was being deployed to a project that requires skills I never had, but through dedication, willingness, and communication, it helped me adapt and succeed.",
          type: "description",
        },
        {
          data: "ISBX is a company that build software solutions for its clients. Our goal is to deliver high quality products using the latest technologies while following an agile methodology. There are instances that we have to collaborate closely with the client’s development team to ensure seamless end-to-end integration and meet their specific needs. This approach not only strengthens our solutions but also helped the team to adapt and also apply new insights to future projects.",
          type: "description",
        },
        { data: "dawdaw", type: "section" },
      ],
    },
  },
];
