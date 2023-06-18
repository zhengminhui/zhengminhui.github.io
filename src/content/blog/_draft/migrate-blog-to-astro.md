---
title: "Migrate blog from Hexo to Astro"
date: 2023-06-01 19:48:52
draft: true
tags:
  - tech
  - astro
  - blog
postSlug: migrate-blog-to-astro
---

Step:

1. install theme
2. zod schema
3. font npm
   1. https://github.com/lxgw/LxgwWenKai
   2. https://github.com/chawyehsu/lxgw-wenkai-webfont
4. favicon, about page
5. some ui tweet
6. vercel deploy

```js
 import vercel from "@astrojs/vercel/static";

output: "static",
adapter: vercel({
  analytics: true,
}),

```

Todo:

1. next/prev post
2. reading time
3. comment
4. share to tweeter
5. routing issue, add year; and cn/en url, which one?
6. translate?
7. google analytics
8. rss fix description
9. ipad logo wordbreak
10. chinese tags in breadcome encoded
11. localhost display draft

sanity cms integrate

import external data

![This is the cutest and loveliest cat I have ever met in my life. He is BU BU, a cat with 6 fingers, which is unusual, but in fact, smarter than any cat. He meows every time he sees me, and jumps to my bed and sits with me.](https://images.unsplash.com/photo-1519052537078-e6302a4968d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjAwOTd8MHwxfHNlYXJjaHwyfHxjYXR8ZW58MHwwfHx8MTY4NzAwMTUzM3ww&ixlib=rb-4.0.3&q=80&w=1080)
_Photo by [Michael Sum](https://unsplash.com/@michaelsum1228?utm_source=Obsidian%20Image%20Inserter%20Plugin&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=Obsidian%20Image%20Inserter%20Plugin&utm_medium=referral)_
