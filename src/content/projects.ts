import { Content } from ".";

export const projects: Content[] = [
  {
    id: "1",
    title: "Eats Online PH",
    date: "2021 - 2022",
    description:
      "Eats Online PH is an e-commerce application developed to provide a platform for selling a variety of Filipino delicacies sourced from different regions of the Philippines. Originally launched during the pandemic as a small business to support local families. As demand grew, the business sought to expand its service area and reach a broader market. The solution was the development of a user-friendly application designed to showcase its products and facilitate a seamless online ordering experience for consumers.",
    icon: "/project/eats-online/logo.png",
    status: "completed",
    content: [
      {
        id: "overview",
        title: "Overview",
        type: "section",
        data: [
          {
            type: "description",
            data: "This was a special project at TIPQC (Technological Institute of the Philippines in Quezon City), where our team of five members, including myself as the lead developer, was selected to work on it. The project began in the second quarter of 2021 and was completed in 2022, also serving as our capstone project.",
          },
          {
            type: "description",
            data: "As the lead software developer, I collaborated with the team to design and develop the entire application architecture, including the frontend, backend, mobile app, and database. I was also responsible for managing the development process, ensuring that the team was implementing features correctly, that functionality was working as intended, and that the user interfaces were responsive across various devices. We adopted the Agile methodology, breaking the project into smaller tasks and organizing them into “sprints” of one to two weeks to ensure fast and consistent progress.",
          },
          {
            type: "description",
            data: "The first two months were particularly challenging, as our team decided to work with new and unfamiliar technologies to push ourselves. This was our first real-world project involving direct client interaction. As a result, there were instances where our designs did not meet the client’s expectations, requiring us to revise and rework certain features. However, as the project progressed, we became more comfortable with the Agile process, which enabled us to plan more effectively and deliver higher-quality work. This helped us work efficiently and meet the client’s expectations more consistently.",
          },
        ],
      },
      {
        id: "background",
        title: "Background",
        type: "section",
        data: [
          {
            type: "description",
            data: "During the COVID-19 pandemic, many food business in the Philippines experienced significant challenges, including financial difficulties, operational disruptions, and changes in consumer behavior. Starting March 2020, the national and local governments imposed an Enhanced Community Quarantine (ECQ), which effectively shut-down most food businesses, particularly those that relied on in-person dining. This caused widespread disruptions to supply chains. Reduced demands and more challenges made it difficult for products to circulate, impacting both production and distribution.",
          },
          {
            type: "description",
            data: "As many businesses struggled financially and being incapable to continue their operations, most industry faced a dramatic transformation, being forced to adapt to new normal. Online services surged, helping the Philippine economy remain resilient. The rise of e-commerce, food delivery platforms, and digital payment systems allowed businesses to stay connected with consumers, and maintain operations.",
          },
          {
            type: "description",
            data: "As online services continued to rise, Eats Online aimed to adapt to the new normal by developing an application to better serve consumers. This e-commerce platform was designed to provide food ordering services, enabling consumers to easily access and order from a variety of food options.",
          },
        ],
      },
      {
        id: "objective",
        title: "Objective",
        type: "section",
        data: [
          {
            type: "description",
            data: "This project aims to develop a real-time food e-commerce application for Eats Online PH, providing a seamless online ordering and selling system for consumers.",
          },
          {
            type: "description",
            data: "These are the primary objectives:",
          },
          {
            type: "bullet",
            gap: 4,
            data: [
              {
                title: "Consumer Applications (Web & Mobile)",
                type: "list-item",
                titleTextSize: "md",
                data: {
                  type: "list-item-content",
                  data: "To engage with consumers, we build responsive web and mobile applications that offers a smooth ordering experience. These applications will allow users to browse products, place orders, and track deliveries and transactions.",
                },
              },
              {
                title: "Realtime Product updates",
                type: "list-item",
                titleTextSize: "md",
                data: {
                  type: "list-item-content",
                  data: "One common issue with many e-commerce web applications is that products are not updated in real time, leading to delayed notifications for consumers when stock is low. This often results in consumers placing orders for items that are out of stock. To address this, the application will provide a real-time product updates, ensuring that consumers are always informed of the current availability of products. This is particularly useful during high-demand periods, helping to prevent order discrepancies and improve overall customer experience.",
                },
              },
              {
                title: "Content Management System",
                type: "list-item",
                titleTextSize: "md",
                data: {
                  type: "list-item-content",
                  data: "To manage the content of the consumer web application, we develop an admin portal for eats online admins. This portal will enable product and user account management, transaction tracking, user activity monitoring, and analytics.",
                },
              },
              {
                title: "Encrypted Data Transmission",
                type: "list-item",
                titleTextSize: "md",
                data: {
                  type: "list-item-content",
                  data: "In addition to using SSL/TLS protocols, we ensure data is securely transmitted between the client and server through encryption. This protects sensitive customer information from unauthorized access, even in the event of attacks such as Man-in-the-Middle (MITM).",
                },
              },
            ],
          },
        ],
      },
      {
        type: "section",
        title: "Results",
        id: "results",
        data: [
          {
            type: "description",
            data: "The e-commerce application was successfully developed, addressing key challenges and meeting the primary objectives, while prioritizing performance, user experience, security, and functionality.",
          },
          {
            type: "description",
            data: "Below are the outcomes:",
          },
          {
            type: "bullet",
            gap: 24,
            data: [
              {
                title: "Consumer Applications (Mobile & Web)",
                titleTextSize: "md",
                type: "list-item",
                data: [
                  {
                    type: "list-item-content",
                    data: {
                      type: "flex",
                      direction: "column",
                      gap: 12,
                      breakpoints: {
                        xl: {
                          gap: 24,
                        },
                      },
                      data: [
                        {
                          type: "description",
                          data: "We developed responsive mobile and web platforms designed to deliver a seamless user experience across all devices.",
                        },
                        {
                          type: "description",
                          data: "The core features implemented include:",
                        },
                        {
                          type: "flex",
                          direction: "column",
                          gap: 20,
                          breakpoints: {
                            xl: {
                              direction: "row",
                              gap: 48,
                            },
                          },
                          data: [
                            {
                              type: "flex",
                              direction: "column",
                              title: "Authentication",
                              selfAlign: "center",
                              titleTextSize: "md",
                              data: "This feature allows users to create or log in an account, or continue as a guest. It ensures the user's identity is verified through email or phone number, providing a secure registration process. Additionally, this verification helps Eats Online track user activities and ensure interactions are with legitimate, verified users.",
                            },
                            {
                              type: "image-stack",
                              size: "xs",
                              justify: "center",
                              data: [
                                {
                                  data: "/project/eats-online/login.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/register.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/login-signup.jpg",
                                  type: "image",
                                },
                              ],
                              orientation: "landscape",
                            },
                          ],
                        },
                        {
                          type: "flex",
                          direction: "column-reversed",
                          gap: 20,
                          breakpoints: {
                            xl: {
                              direction: "row",
                              gap: 48,
                            },
                          },
                          data: [
                            {
                              type: "image-stack",
                              size: "xs",
                              justify: "center",
                              selfAlign: "center",
                              data: [
                                {
                                  data: "/project/eats-online/featured.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/products.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/single-product.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/recommended-products.jpg",
                                  type: "image",
                                },
                              ],
                              orientation: "landscape",
                            },
                            {
                              type: "flex",
                              direction: "column",
                              title: "Products",
                              titleTextSize: "md",
                              selfAlign: "center",
                              data: "This feature provide a comprehensive list of products and categories that are updated on realtime, allowing users to browse through different options.  Users can also filter and search for products, helping them quickly find exactly what they need. Additionally, it showcases the top six featured products, selected based on the highest number of sales, and display recommended items when viewing a single product.",
                            },
                          ],
                        },
                        {
                          type: "flex",
                          direction: "column",
                          gap: 20,
                          breakpoints: {
                            xl: {
                              direction: "row",
                              gap: 48,
                            },
                          },
                          data: [
                            {
                              type: "flex",
                              direction: "column",
                              title: "Cart & Checkout",
                              selfAlign: "center",
                              titleTextSize: "md",
                              data: "This feature allows users to manage their selected products, making it easy to add, remove, or modify items in the cart. Users can also proceed to the checkout, where they can choose their delivery method, payment option, and generate a transaction receipt.",
                            },
                            {
                              type: "image-stack",
                              size: "xs",
                              justify: "center",
                              data: [
                                {
                                  data: "/project/eats-online/cart-1.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/cart-2.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/cart-3.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/cart-4.jpg",
                                  type: "image",
                                },
                              ],
                              orientation: "landscape",
                            },
                          ],
                        },
                        {
                          type: "flex",
                          direction: "column-reversed",
                          gap: 20,
                          breakpoints: {
                            xl: {
                              direction: "row",
                              gap: 48,
                            },
                          },
                          data: [
                            {
                              type: "image-stack",
                              size: "xs",
                              justify: "center",
                              data: [
                                {
                                  data: "/project/eats-online/mobile_app-1.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/mobile_app-2.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/mobile_app-3.jpg",
                                  type: "image",
                                },
                                {
                                  data: "/project/eats-online/mobile_app-4.jpg",
                                  type: "image",
                                },
                              ],
                              orientation: "portrait",
                            },
                            {
                              type: "flex",
                              direction: "column",
                              title: "Mobile Application",
                              selfAlign: "center",
                              titleTextSize: "md",
                              data: "In addition to the web application, we developed a mobile application for both Android and iOS, offering the same features and functionality. The mobile app provides a seamless user experience with responsive design, ensuring that users can access the same services on their smartphones or tablets.",
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
              {
                title: "Admin Portal",
                titleTextSize: "md",
                type: "list-item",
                data: {
                  type: "list-item-content",
                  data: {
                    type: "flex",
                    direction: "column",
                    gap: 12,
                    breakpoints: {
                      xl: {
                        gap: 24,
                      },
                    },
                    data: [
                      {
                        type: "description",
                        data: "In addition to the consumer application, we developed an admin web application that allows for easy management of content on the consumer side. Admins can track user activities, accept or reject orders, and analyze key metrics such as top buyers and best-selling products. The admin portal also allows data to be exported to csv for creating a backup or offline copy.",
                      },
                      {
                        type: "description",
                        data: "The key features are:",
                      },
                      {
                        type: "flex",
                        direction: "column",
                        gap: 20,
                        breakpoints: {
                          xl: {
                            direction: "row",
                            gap: 48,
                          },
                        },
                        data: [
                          {
                            type: "flex",
                            direction: "column",
                            title: "Analytics",
                            titleTextSize: "md",
                            data: "This feature enables admins to track and analyze data related to their products or users. It provides insights into key metrics, such as top users, sales performance, and critical products. Additionally, it offers sales visualization through bar graphs.",
                          },
                          {
                            type: "image-stack",
                            size: "xs",
                            justify: "center",
                            data: [
                              {
                                data: "/project/eats-online/analytics-1.jpg",
                                type: "image",
                              },
                              {
                                data: "/project/eats-online/analytics-2.jpg",
                                type: "image",
                              },
                            ],
                            orientation: "landscape",
                          },
                        ],
                      },
                      {
                        type: "flex",
                        direction: "column-reversed",
                        gap: 20,
                        breakpoints: {
                          xl: {
                            direction: "row",
                            gap: 48,
                          },
                        },
                        data: [
                          {
                            type: "image-stack",
                            size: "xs",
                            justify: "center",
                            selfAlign: "center",
                            data: [
                              {
                                data: "/project/eats-online/inventories-1.jpg",
                                type: "image",
                              },
                              {
                                data: "/project/eats-online/inventories-2.jpg",
                                type: "image",
                              },
                              {
                                data: "/project/eats-online/users.jpg",
                                type: "image",
                              },
                            ],
                            orientation: "landscape",
                          },
                          {
                            type: "flex",
                            direction: "column",
                            title: "User and Inventory Management",
                            titleTextSize: "md",
                            selfAlign: "center",
                            data: "This feature allows admins to efficiently manage user accounts and product inventory. Admins can add, remove, or update user accounts, as well as track user activity. For inventory management, the system enables monitoring of stock levels, product categorization, restocking, and adding product suppliers to ensure seamless operations.",
                          },
                        ],
                      },
                      {
                        type: "flex",
                        direction: "column",
                        gap: 20,
                        breakpoints: {
                          xl: {
                            direction: "row",
                            gap: 48,
                          },
                        },
                        data: [
                          {
                            type: "flex",
                            direction: "column",
                            title: "Transactions",
                            titleTextSize: "md",
                            data: "This feature allows admins to manage and track all transaction activities from consumers. It provides detailed records of each transaction, including payment methods, amounts, and status.",
                          },
                          {
                            type: "image-stack",
                            size: "xs",
                            justify: "center",
                            data: [
                              {
                                data: "/project/eats-online/transactions-1.jpg",
                                type: "image",
                              },
                              {
                                data: "/project/eats-online/transactions-2.jpg",
                                type: "image",
                              },
                            ],
                            orientation: "landscape",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              {
                title: "Security",
                titleTextSize: "md",
                type: "list-item",
                data: {
                  type: "list-item-content",
                  data: "This application ensures the protection of both admins and consumers during client-server communication. We use AES encryption, along with SSL/TLS protocols, to secure data during transmission. AES encryption ensures that data is independently encrypted within our application, making it visible only within the application and safeguarding it from potential Man-in-the-Middle (MITM) attacks. Additionally, user passwords are securely hashed using the SHA-256 algorithm before being stored in the database for authentication, ensuring that actual passwords are never stored or displayed.",
                },
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
          type: "flex",
          direction: "column",
          data: [
            {
              title: "Language",
              titleTextSize: "md",
              type: "flex",
              direction: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/languages/javascript.svg",
                  size: "md",
                  href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                },
              ],
            },
            {
              title: "Frontend",
              titleTextSize: "md",
              type: "flex",
              direction: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/frameworks/react-native.svg",
                  size: "md",
                  href: "https://react.dev/",
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
              title: "Backend",
              titleTextSize: "md",
              type: "flex",
              direction: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/re/nodejs.svg",
                  size: "md",
                  href: "https://nodejs.org/en",
                },
                {
                  type: "image",
                  data: "/svg/frameworks/express.svg",
                  size: "md",
                  href: "https://expressjs.com/",
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
              title: "Design & Graphics",
              titleTextSize: "md",
              type: "flex",
              direction: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/design/figma.svg",
                  size: "md",
                  href: "https://www.figma.com/",
                },
                {
                  type: "image",
                  data: "/svg/design/photoshop.svg",
                  size: "md",
                  href: "https://www.adobe.com/ph_en/products/photoshop.html",
                },
              ],
            },
            {
              title: "Documentation",
              titleTextSize: "md",
              type: "flex",
              direction: "row",
              data: [
                {
                  type: "image",
                  data: "/svg/documentation/postman.svg",
                  size: "md",
                  href: "https://www.postman.com/",
                },
              ],
            },
          ],
        },
      },
    ],
  },
];
