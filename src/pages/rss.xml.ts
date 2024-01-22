import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import slugify from "@utils/slugify";
import { SITE } from "@config";

export async function GET(context) {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc || "description",
    site: SITE.website,
    items: sortedPosts.map(p => {
      const { data } = p;
      return {
        link: `posts/${slugify(data)}`,
        title: data.title,
        description: data.description || p.body.slice(0, 200) + "...",
        pubDate: new Date(data.date),
      };
    }),
  });
}
