import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { blogSchema } from "./content/_schemas";

const blog = defineCollection({
  loader: glob({
    pattern: "{[0-9][0-9][0-9][0-9],leetcode,logs}/**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: blogSchema,
});

export const collections = { blog };
