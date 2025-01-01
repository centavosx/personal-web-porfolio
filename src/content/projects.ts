import { Content } from ".";

export const projects: Content[] = [
  {
    id: "1",
    title: "Eats Online PH",
    description:
      "Eats Online PH is an e-commerce application developed to provide a platform for selling a variety of Filipino delicacies sourced from different regions of the Philippines. Originally launched during the pandemic as a small business to support local families. As demand grew, the business sought to expand its service area and reach a broader market. The solution was the development of a user-friendly application designed to showcase its products and facilitate a seamless online ordering experience for customers.",
    icon: "/project/eats-online/logo.png",
    content: [
      {
        id: "overview",
        title: "Overview",
        type: "section",
        data: [
          {
            type: "description",
            data: "During the COVID-19 pandemic, many food business in the Philippines experienced significant challenges, including financial difficulties, operational disruptions, and changes in consumer behavior. Starting March 2020, the national and local governments imposed an Enhanced Community Quarantine (ECQ), which effectively shut-down most food businesses, particularly those that relied on in-person dining. This caused widespread disruptions to supply chains. Reduced demands and more challenges made it difficult for products to circulate, impacting both production and distribution.",
          },
          {
            type: "description",
            data: "As many businesses struggled financially and being incapable to continue their operations, most industry faced a dramatic transformation, being forced to adapt to new normal. Online services surged, helping the Philippine economy remain resilient. The rise of e-commerce, food delivery platforms, and digital payment systems allowed businesses to stay connected with customers, and maintain operations.",
          },
          {
            type: "description",
            data: "As online services continued to rise, Eats Online aimed to adapt to the new normal by developing an application to better serve customers. This e-commerce platform was designed to provide food ordering services, enabling consumers to easily access and order from a variety of food options.",
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
            data: "This project aims to develop a Real-time Food E-Commerce Application for Eats Online PH, providing a seamless online ordering and selling system for customers.",
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
                  data: "To engage with customers, we build responsive web and mobile applications that offers a smooth ordering experience. These applications will allow users to browse products, place orders, and track deliveries and transactions.",
                },
              },
              {
                title: "Realtime Product updates",
                type: "list-item",
                titleTextSize: "md",
                data: {
                  type: "list-item-content",
                  data: "One common issue with many e-commerce web applications is that products are not updated in real time, leading to delayed notifications for customers when stock is low. This often results in customers placing orders for items that are out of stock. To address this, the application will provide a real-time product updates, ensuring that customers are always informed of the current availability of products. This is particularly useful during high-demand periods, helping to prevent order discrepancies and improve overall customer experience.",
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
                          gap: 36,
                        },
                      },
                      data: [
                        {
                          type: "description",
                          data: "We developed responsive mobile and web platforms designed to deliver a seamless user experience across all devices. The core features implemented include:",
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
                              titleTextSize: "md",
                              data: "This feature allows users to create a new account, log in to an existing account, or continue as a guest. It ensures the user’s identity is verified through email or phone number, providing a secure registration process. Additionally, this verification helps Eats Online track user activities and ensure interactions are with legitimate, verified users.",
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
                              titleTextSize: "md",
                              data: "There's also a mobile application for android or ios that have the same feature as the web application.",
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
              {
                title: "Consumer Applications (Mobile & Web)",
                titleTextSize: "md",
                type: "list-item",
                data: {
                  type: "list-item-content",
                  data: "One common issue with many e-commerce web applications is that products are not updated in real time, leading to delayed notifications for customers when stock is low. This often results in customers placing orders for items that are out of stock. To address this, the application will provide a real-time product updates, ensuring that customers are always informed of the current availability of products. This is particularly useful during high-demand periods, helping to prevent order discrepancies and improve overall customer experience.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
