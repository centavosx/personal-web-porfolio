// Converts the old nested content JSON into the sections format and writes the
// result as SQL. Read only: run the generated file to apply it. It's gitignored
// because this repo is public and the file is generated from live data.
//
//   node --env-file=.env scripts/convert-content.mjs
//
// Locally it is applied automatically. In production, run it in the SQL editor
// after 20261105000002_sections_and_ordering.sql.
import { writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const OUTPUT = "supabase/migrations/20261105000003_content_conversion.sql";

const INTRO =
  "I'm a software developer from the Philippines, building web, mobile and backend products that solve real-world problems.";

const TECH_NAMES = {
  automation: { powerautomate: "Power Automate", uipath: "UiPath" },
  cicd: { bitbucket: "Bitbucket", docker: "Docker", gitlab: "GitLab" },
  cloud: { atlassian: "Atlassian", azure: "Azure", firebase: "Firebase" },
  database: { mysql: "MySQL", postgresql: "PostgreSQL", redis: "Redis" },
  design: { figma: "Figma", photoshop: "Photoshop" },
  documentation: { postman: "Postman", swagger: "Swagger" },
  forms: { zod: "Zod" },
  frameworks: {
    drf: "Django REST", expo: "Expo", express: "Express", hardhat: "Hardhat",
    hono: "Hono", nestjs: "NestJS", next: "Next.js", "react-native": "React",
  },
  languages: {
    css: "CSS", html: "HTML", javascript: "JavaScript", python: "Python",
    solidity: "Solidity", sql: "SQL", typescript: "TypeScript",
  },
  re: { deno: "Deno", nodejs: "Node.js" },
  services: { mapbox: "Mapbox", supabase: "Supabase" },
  state: { redux: "Redux" },
  styling: {
    mui: "MUI", sass: "Sass", "styled-components": "styled-components",
    "vanilla-extract": "vanilla-extract",
  },
  tests: { jest: "Jest" },
  utils: { "day-js": "Day.js" },
  web3: {
    bitcoin: "Bitcoin", cosmos: "Cosmos", doge: "Dogecoin", ethereum: "Ethereum",
    ethers: "ethers.js", litecoin: "Litecoin", polkadot: "Polkadot",
    polkadotjs: "polkadot.js", solana: "Solana", thorswap: "THORSwap", xrp: "XRP",
  },
};

const IMAGE_NAMES = {
  bitcoinjs: "BitcoinJS", cosmjs: "CosmJS", "react-query": "TanStack Query", swapkit: "SwapKit",
};

const techName = (path) => {
  const parts = path.replace(/^\//, "").split("/");
  const file = parts.at(-1).replace(/\.[a-z]+$/, "");
  const known = parts[0] === "svg" ? TECH_NAMES[parts[1]]?.[file] : IMAGE_NAMES[file];
  if (!known) console.warn(`  No name for ${path}, using "${file}"`);
  return known ?? file;
};

const asArray = (data) => (Array.isArray(data) ? data : data && typeof data === "object" ? [data] : []);

const isTechIcon = (node) => node.type === "image" && typeof node.data === "string" && /^\/(svg|image)\//.test(node.data);

const isStackGroup = (node) =>
  node.type === "flex" && !!node.title && Array.isArray(node.data) && node.data.length > 0 && node.data.every(isTechIcon);

const listToMarkdown = (node) => {
  const marker = node.type === "numeric" ? "1." : "-";
  return asArray(node.data)
    .map((item) => {
      const text =
        typeof item.data === "string"
          ? item.data
          : asArray(item.data)
              .map((child) => (typeof child.data === "string" ? child.data : ""))
              .filter(Boolean)
              .join(" ");
      return `${marker} ${item.title ? `**${item.title}:** ` : ""}${text}`.trim();
    })
    .join("\n");
};

const mediaIn = (node) => {
  if (node.type === "image") return [node];
  if (node.type === "image-stack") return asArray(node.data);
  return typeof node.data === "string" ? [] : asArray(node.data).flatMap(mediaIn);
};

const captionsIn = (node) => {
  if (typeof node.data === "string") return node.type === "image" ? [] : [node];
  if (node.type === "image-stack") return [];
  return asArray(node.data).flatMap(captionsIn);
};

const orientationIn = (node) => {
  if (node.orientation) return node.orientation;
  if (typeof node.data === "string") return undefined;
  for (const child of asArray(node.data)) {
    const found = orientationIn(child);
    if (found) return found;
  }
  return undefined;
};

const collect = (node, section) => {
  if (typeof node.data === "string" && node.type === "description") {
    section.paragraphs.push(node.data);
    return;
  }
  if (node.type === "bullet" || node.type === "numeric") {
    if (mediaIn(node).length === 0) {
      section.paragraphs.push(listToMarkdown(node));
      return;
    }
    // List items holding images can't stay in a text list, so their text and
    // images are collected in order, and plain items stay as list lines.
    for (const item of asArray(node.data)) {
      if (mediaIn(item).length === 0) {
        section.paragraphs.push(listToMarkdown({ ...node, data: [item] }));
        continue;
      }
      if (item.title) section.paragraphs.push(`**${item.title}**`);
      asArray(item.data).forEach((child) => collect(child, section));
    }
    return;
  }
  if (isStackGroup(node)) {
    section.stack.push({
      group: node.title,
      items: node.data.map((item) => ({
        name: techName(item.data),
        icon: item.data,
        ...(item.href ? { href: item.href } : {}),
      })),
    });
    return;
  }
  if (node.type === "image" || node.type === "image-stack") {
    section.gallery.push({ images: mediaIn(node).map((i) => i.data), orientation: orientationIn(node) ?? "landscape" });
    return;
  }

  // A block with its own text and images becomes one captioned gallery item.
  const media = mediaIn(node);
  const captions = captionsIn(node);
  if (media.length > 0 && captions.length === 1) {
    section.gallery.push({
      ...(captions[0].title ? { title: captions[0].title } : {}),
      body: captions[0].data,
      images: media.map((i) => i.data),
      orientation: orientationIn(node) ?? "landscape",
    });
    return;
  }
  if (typeof node.data === "string") {
    section.paragraphs.push(node.title ? `**${node.title}:** ${node.data}` : node.data);
    return;
  }
  asArray(node.data).forEach((child) => collect(child, section));
};

const convert = (content) =>
  asArray(content).map((node) => {
    const section = { paragraphs: [], gallery: [], stack: [] };
    if (node.type === "section") asArray(node.data).forEach((child) => collect(child, section));
    else collect(node, section);
    return {
      title: node.title ?? "",
      ...(section.paragraphs.length ? { body: section.paragraphs.join("\n\n") } : {}),
      ...(section.gallery.length ? { gallery: section.gallery } : {}),
      ...(section.stack.length ? { stack: section.stack } : {}),
    };
  });

const stringLeaves = (node, key) => {
  if (Array.isArray(node)) return node.flatMap((n) => stringLeaves(n, key));
  if (!node || typeof node !== "object") return [];
  return typeof node.data === "string" ? [node] : stringLeaves(node.data, key);
};

const { SUPABASE_URL, SUPABASE_ANON_KEY, ABOUT_ID } = process.env;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !ABOUT_ID) {
  throw new Error("Run with --env-file=.env so the live Supabase values are set");
}

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const { data: rows, error } = await client.from("content").select("id, name, type, date, content, created_at").eq("about_id", ABOUT_ID);
if (error) throw new Error(error.message);

const quote = (value, tag) => {
  if (value.includes(`$${tag}$`)) throw new Error("Data contains the quote tag");
  return `$${tag}$${value}$${tag}$`;
};

const statements = [`update public.about set short_description = ${quote(INTRO, "text")} where id = '${ABOUT_ID}';`];

const experiences = rows
  .filter((r) => r.type === "work-experience")
  .sort((a, b) => /current|present/i.test(b.date ?? "") - /current|present/i.test(a.date ?? "") || (b.created_at > a.created_at ? 1 : -1));

for (const row of rows) {
  const sections = convert(row.content);
  const leaves = stringLeaves(row.content);
  const newJson = JSON.stringify(sections);
  const lostText = leaves.filter((l) => l.type !== "image" && !newJson.includes(JSON.stringify(l.data).slice(1, -1)));
  const lostImages = leaves.filter((l) => l.type === "image" && !newJson.includes(`"${l.data}"`));
  console.log(`${row.name}: ${sections.length} sections, ${leaves.length} source items, lost text ${lostText.length}, lost images ${lostImages.length}`);
  lostText.forEach((l) => console.warn(`  LOST TEXT: ${l.data.slice(0, 80)}`));
  lostImages.forEach((l) => console.warn(`  LOST IMAGE: ${l.data}`));

  const order = row.type === "work-experience" ? `, sort_order = ${experiences.indexOf(row) + 1}` : "";
  statements.push(`update public.content set sections = ${quote(newJson, "json")}::jsonb${order} where id = '${row.id}';`);
}

writeFileSync(OUTPUT, `-- Generated by scripts/convert-content.mjs\n\n${statements.join("\n\n")}\n`);
console.log(`Wrote ${OUTPUT}`);
