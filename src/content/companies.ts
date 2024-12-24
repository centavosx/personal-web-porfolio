// TODO: Create backend to dynamically add/view/remove content
import type { Content } from ".";

export const companies: Content[] = [
  {
    id: "1",
    title: "Trend Micro",
    description:
      "Trend Micro, a global cybersecurity leader, helps make the world safe for exchanging digital information. Fueled by decades of security expertise, global threat research, and continuous innovation, our cybersecurity platform protects 500,000+ organizations and 250+ million individuals across clouds, networks, devices, and endpoints.",
    icon: "/svg/company/trend-micro.svg",
    content: [
      {
        id: "roles-and-responsibilities",
        title: "Roles and Responsibilities",
        type: "section",
        data: [
          {
            type: "description",
            data: "I worked here as a software developer intern, contributing to the development of various internal and business applications, focusing on both web applications and automation flows. I worked on building applications to meet the needs of internal teams, making sure the solutions were efficient and easy to use.",
          },
          {
            type: "description",
            data: "Throughout the internship, I gained hands-on experience with a variety of new technologies, including React, Docker, Node.js, Azure, and more. I’m now applying these skills to different projects. Additionally, I was introduced to various security practices aimed at preventing cyber threats and participated in webinars, certifications, and workshops to further enhance my skills.",
          },
          {
            type: "description",
            data: "This role provided me with valuable exposure to industry practices and gave me a comprehensive understanding of the software development lifecycle.",
          },
        ],
      },
      {
        title: "Key Contributions",
        id: "key-contributions",
        type: "section",
        data: {
          type: "numeric",
          data: [
            {
              data: "Contributed to the development of a web application replacing the old meeting scheduler, significantly enhancing user experience.",
              type: "list-item",
            },
            {
              data: "Developed a seat planner system application, along with designing and integrating a custom cubicle layout, improving seat management efficiency.",
              type: "list-item",
            },
            {
              data: "Built an automation flow to scrape and process JobStreet applicants, achieving a 95%+ success rate in accepting or rejecting applicants.",
              type: "list-item",
            },
          ],
        },
      },
      {
        id: "technologies",
        title: "Technologies",
        type: "section",
        data: {
          type: "col",
          data: [
            {
              title: "Language",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/languages/javascript.svg",
                  size: "md",
                  href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                },
                {
                  type: "image",
                  data: "/svg/languages/sql.svg",
                  size: "md",
                },
              ],
            },
            {
              title: "Frontend",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/frameworks/react-native.svg",
                  size: "md",
                  href: "https://react.dev/",
                },
              ],
            },
            {
              title: "Backend",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/re/nodejs.svg",
                  size: "md",
                  href: "https://nodejs.org/en",
                },
              ],
            },
            {
              title: "DevOps / Cloud",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/cicd/gitlab.svg",
                  size: "md",
                  href: "https://about.gitlab.com/",
                },
                {
                  type: "image",
                  data: "/svg/cicd/docker.svg",
                  size: "md",
                  href: "https://www.docker.com/",
                },
                {
                  type: "image",
                  data: "/svg/cloud/azure.svg",
                  size: "md",
                  href: "https://azure.microsoft.com/en-us/products/devops",
                },
              ],
            },
            {
              title: "Documentation",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/documentation/postman.svg",
                  size: "md",
                  href: "https://www.postman.com/",
                },
              ],
            },
            {
              title: "Automation",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/automation/uipath.svg",
                  size: "md",
                  href: "https://www.uipath.com/",
                },
                {
                  type: "image",
                  data: "/svg/automation/powerautomate.svg",
                  size: "md",
                  href: "https://www.microsoft.com/en-us/power-platform/products/power-automate",
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "2",
    title: "ISBX",
    description: [
      "ISBX work with clients to strategize and build world-class applications for web and mobile. Their design and development teams function in unison to deliver world class results that customers love.",
      "Since 2003, the ISBX team has developed numerous websites and applications for clients large and small that include automotive, consumer packaged goods, action sports, and lifestyle markets. They stand by their work and can provide a long list of references from their trusted partners.",
    ],
    icon: "/svg/company/isbx.svg",
    content: [
      {
        id: "roles-and-responsibilities",
        title: "Roles and Responsibilites",
        type: "section",
        data: [
          {
            data: "I am currently working as a full-stack software developer at ISBX, where I have had the opportunity to contribute to variety of projects including, mobile-apps, frontend, and backend development. It is a valuable experience, as I’ve been exposed to different technologies and development techniques. One of the most challenging aspects was being deployed to a project that requires skills I never had, but through dedication, willingness, and communication, it helped me adapt and succeed.",
            type: "description",
          },
          {
            data: "Our goal is to deliver high quality products using the latest technologies while following an agile methodology. There are instances that we have to collaborate closely with the client’s development team to ensure seamless end-to-end integration and meet their specific needs. This approach not only strengthens our solutions but also helped the team to adapt and also apply new insights to future projects.",
            type: "description",
          },
        ],
      },
      {
        id: "key-contributions",
        title: "Key contributions",
        type: "section",
        data: [
          {
            type: "description",
            data: `As a software developer, I have collaborated with the software development, design, and QA teams to deliver features and resolve issues while applying Agile methodology, allowing me to contribute to more than 10 projects. I cannot provide the projects due to NDA (Non-disclosure agreement).`,
          },
          {
            type: "numeric",
            data: [
              {
                type: "list-item",
                data: "Contributed across mobile, web, and backend development to ensure seamless integration and feature delivery.",
              },
              {
                type: "list-item",
                data: "Designed and implemented API routes, wrote unit tests, and integrated multiple service providers.",
              },
              {
                type: "list-item",
                data: "Led the frontend development team to deliver features on time, ensuring high-quality code and consistent styling.",
              },
              {
                type: "list-item",
                data: "Optimized backend database queries, eliminating redundancies and reducing data processing time from an average of 10-12 seconds to between 300 milliseconds and 2 seconds.",
              },
              {
                type: "list-item",
                data: "Contributed to the development of a blockchain application by integrating multiple blockchain networks and service providers, optimizing cryptographic signature processes, and improving wallet import/creation speed by 4x of its initial speed.",
              },
              {
                type: "list-item",
                data: "Maintained and developed internal applications to improve user experience, optimizing page load time to near-instant with NextJS Incremental Static Generation (ISR), and implementing new features.",
              },
              {
                type: "list-item",
                data: "Managed web application builds and releases to development and staging environments through Azure DevOps.",
              },

              {
                type: "list-item",
                data: "Developed a UI applying different animations including parallax effects, enhancing user interaction and experience.",
              },
            ],
          },
        ],
      },
      {
        id: "technologies",
        title: "Technologies",
        type: "section",
        data: {
          type: "col",
          data: [
            {
              title: "Languages",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/languages/typescript.svg",
                  size: "md",
                  href: "https://www.typescriptlang.org/",
                },
                {
                  type: "image",
                  data: "/svg/languages/python.svg",
                  size: "md",
                  href: "https://www.python.org/",
                },
                {
                  type: "image",
                  data: "/svg/languages/sql.svg",
                  size: "md",
                },
              ],
            },
            {
              title: "Frameworks",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/frameworks/next.svg",
                  size: "md",
                  href: "https://nextjs.org/",
                },
                {
                  type: "image",
                  data: "/svg/frameworks/nestjs.svg",
                  size: "md",
                  href: "https://nestjs.com/",
                },
                {
                  type: "image",
                  data: "/svg/frameworks/react-native.svg",
                  size: "md",
                  href: "https://reactnative.dev/",
                },
                {
                  type: "image",
                  data: "/svg/frameworks/drf.svg",
                  size: "md",
                  href: "https://www.django-rest-framework.org/",
                },
                {
                  type: "image",
                  data: "/svg/frameworks/expo.svg",
                  size: "md",
                  href: "https://expo.dev/",
                },
              ],
            },
            {
              title: "DevOps / Cloud",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/cloud/atlassian.svg",
                  size: "md",
                  href: "https://www.atlassian.com/",
                },
                {
                  type: "image",
                  data: "/svg/cicd/bitbucket.svg",
                  size: "md",
                  href: "https://bitbucket.org/product/",
                },
                {
                  type: "image",
                  data: "/svg/cicd/docker.svg",
                  size: "md",
                  href: "https://www.docker.com/",
                },
                {
                  type: "image",
                  data: "/svg/cloud/azure.svg",
                  size: "md",
                  href: "https://azure.microsoft.com/en-us/products/devops",
                },
                {
                  type: "image",
                  data: "/svg/cloud/firebase.svg",
                  size: "md",
                  href: "https://firebase.google.com/",
                },
              ],
            },
            {
              title: "Styling",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/styling/sass.svg",
                  size: "md",
                  href: "https://sass-lang.com/",
                },
                {
                  type: "image",
                  data: "/svg/styling/mui.svg",
                  size: "md",
                  href: "https://mui.com/material-ui/",
                },
                {
                  type: "image",
                  data: "/svg/styling/styled-components.svg",
                  size: "md",
                  href: "https://styled-components.com/",
                },
                {
                  type: "image",
                  data: "/svg/styling/vanilla-extract.svg",
                  size: "md",
                  href: "https://vanilla-extract.style/",
                },
              ],
            },
            {
              title: "Documentation",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/documentation/postman.svg",
                  size: "md",
                  href: "https://www.postman.com/",
                },
                {
                  type: "image",
                  data: "/svg/documentation/swagger.svg",
                  size: "md",
                  href: "https://swagger.io/",
                },
              ],
            },
            {
              title: "Database",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/database/postgresql.svg",
                  size: "md",
                  href: "https://www.postgresql.org/",
                },
                {
                  type: "image",
                  data: "/svg/database/redis.svg",
                  size: "md",
                  href: "https://redis.io/",
                },
              ],
            },
            {
              title: "Testing",
              titleTextSize: "md",
              type: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/tests/jest.svg",
                  size: "md",
                  href: "https://jestjs.io/",
                },
              ],
            },
          ],
        },
      },
      {
        id: "web3",
        title: "Web3",
        type: "section",
        data: [
          {
            title: "Blockchain Networks",
            titleTextSize: "md",
            type: "row",
            data: [
              {
                type: "image",
                data: "/svg/web3/bitcoin.svg",
                size: "md",
                href: "https://bitcoin.org/en/",
              },
              {
                type: "image",
                data: "/svg/web3/doge.svg",
                size: "md",
                href: "https://dogecoin.com/",
              },
              {
                type: "image",
                data: "/svg/web3/litecoin.svg",
                size: "md",
                href: "https://litecoin.org/",
              },
              {
                type: "image",
                data: "/svg/web3/ethereum.svg",
                size: "md",
                href: "https://ethereum.org/en/",
              },
              {
                type: "image",
                data: "/svg/web3/polkadot.svg",
                size: "md",
                href: "https://polkadot.com/",
              },
              {
                type: "image",
                data: "/svg/web3/solana.svg",
                size: "md",
                href: "https://solana.com/",
              },
              {
                type: "image",
                data: "/svg/web3/cosmos.svg",
                size: "md",
                href: "https://cosmos.network/",
              },
              {
                type: "image",
                data: "/svg/web3/xrp.svg",
                size: "md",
                href: "https://xrpl.org/",
              },
            ],
          },
          {
            title: "Libraries",
            titleTextSize: "md",
            type: "row",
            data: [
              {
                type: "image",
                data: "/svg/web3/ethers.svg",
                size: "md",
                href: "https://docs.ethers.org/",
              },
              {
                type: "image",
                data: "/image/bitcoinjs.png",
                size: "md",
                href: "https://github.com/bitcoinjs/bitcoinjs-lib",
              },
              {
                type: "image",
                data: "/svg/web3/polkadotjs.svg",
                size: "md",
                href: "https://polkadot.js.org/docs/",
              },
              {
                type: "image",
                data: "/svg/web3/solana.svg",
                size: "md",
                href: "https://solana.com/docs/clients/javascript",
              },
              {
                type: "image",
                data: "/svg/web3/xrp.svg",
                size: "md",
                href: "https://js.xrpl.org/",
              },
              {
                type: "image",
                data: "/image/cosmjs.png",
                size: "md",
                href: "https://tutorials.cosmos.network/tutorials/7-cosmjs",
              },
              {
                type: "image",
                data: "/image/swapkit.jpg",
                size: "md",
                href: "https://swapkit.dev/",
              },
            ],
          },
          {
            title: "DeFi",
            titleTextSize: "md",
            type: "row",
            data: [
              {
                type: "image",
                data: "/svg/web3/thorswap.svg",
                size: "md",
                href: "https://www.thorswap.finance/",
              },
            ],
          },
        ],
      },
      // {
      //   title: "Internal Applications",
      //   type: "section",
      //   data: [
      //     {
      //       data: "I worked on several internal applicatins",
      //       type: "description",
      //     },
      //     {
      //       type: "numeric",
      //       data: [
      //         {
      //           title: "Company website",
      //           type: "list-item",
      //           textSize: "md",
      //           titleTextSize: "md",
      //           data: [
      //             {
      //               type: "list-item-content",
      //               data: [
      //                 {
      //                   type: "description",
      //                   data: "This is the current website they use to showcase their services.",
      //                 },
      //                 {
      //                   title: "Key Contributions",
      //                   type: "numeric",
      //                   titleTextSize: "sm",
      //                   data: [
      //                     {
      //                       type: "list-item",
      //                       data: "Improved user experience and optimized page load time to near-instant with NextJS Incremental Static Generation (ISR)",
      //                     },
      //                     {
      //                       type: "list-item",
      //                       data: "Contributed on implementing the new website design, and other features.",
      //                     },
      //                   ],
      //                 },
      //                 {
      //                   title: "Technologies Used",
      //                   type: "col",
      //                   titleTextSize: "sm",
      //                   data: {
      //                     type: "row",
      //                     data: [
      //                       {
      //                         type: "description",
      //                         data: "dwad",
      //                         textClassName: "font-bold",
      //                       },
      //                       {
      //                         type: "description",
      //                         textClassName: "font-bold",
      //                         data: "dwad",
      //                       },
      //                       {
      //                         type: "description",
      //                         textClassName: "font-bold",
      //                         data: "dwad",
      //                       },
      //                     ],
      //                   },
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];
