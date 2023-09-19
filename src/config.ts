import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.zhengminhui.com/",
  author: "Minhui Zheng",
  desc: "I share my thoughts and I hope you enjoy my articles.",
  title: "Minhui's blog",
  ogImage: "og-image-logo.png",
  lightAndDarkMode: true,
  postPerPage: 20,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: false,
  width: 48,
  height: 48,
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
    name: "Twitter",
    href: "https://twitter.com/wanzaiwanger",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/wanzaiwanger/",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
];
