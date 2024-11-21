import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://zhengminhui.github.io",
  author: "Minhui Zheng",
  desc: "I share my thoughts and I hope you enjoy my articles.",
  title: "Minhui's blog",
  ogImage: "og-image-logo.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  base: "/zhengminhui.github.io",
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/zhengminhui",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/minhuizh/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "X",
    href: "https://twitter.com/wanzaiwanger",
    linkTitle: `${SITE.title} on X`,
    active: false,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/wanzaiwanger/",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
];
